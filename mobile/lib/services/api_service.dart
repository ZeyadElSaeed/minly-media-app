import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:mobile/config/custom_exception.dart';
import 'package:retry/retry.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  final String baseUrl;

  ApiService({required this.baseUrl});

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwtToken');
  }

  dynamic throwException(http.Response response) {
    String errorMessage = jsonDecode(response.body)['message'].toString();
    String? errorType = jsonDecode(response.body)['error'];
    throw CustomException(
        '${errorType != null ? '$errorType: ' : ''}$errorMessage');
  }

  // GET request
  Future<http.Response> get(String endpoint) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final token = await getToken();
      const r = RetryOptions(maxAttempts: 4);
      final response = await r.retry(
        () => http.get(
          url,
          headers: {
            HttpHeaders.contentTypeHeader: 'application/json',
            if (token != null) HttpHeaders.authorizationHeader: 'Bearer $token'
          },
        ),
        // Retry on SocketException or TimeoutException
        retryIf: (e) => e is SocketException || e is TimeoutException,
      );

      if (response.statusCode == 200) {
        return response;
      } else {
        return throwException(response);
      }
    } catch (e) {
      throw CustomException(e.toString());
    }
  }

  // POST request
  Future<http.Response> post(String endpoint, Map<String, dynamic> body) async {
    final url = Uri.parse('$baseUrl$endpoint');

    try {
      final token = await getToken();
      final response = await http.post(
        url,
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
          if (token != null) HttpHeaders.authorizationHeader: 'Bearer $token'
        },
        body: jsonEncode(body),
      );
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response;
      } else {
        return throwException(response);
      }
    } catch (e) {
      throw CustomException(e.toString());
    }
  }

  // DELETE request
  Future<http.Response> delete(String endpoint) async {
    final url = Uri.parse('$baseUrl$endpoint');

    try {
      final token = await getToken();
      final response = await http.delete(
        url,
        headers: {
          HttpHeaders.contentTypeHeader: 'application/json',
          if (token != null) HttpHeaders.authorizationHeader: 'Bearer $token'
        },
      );

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response;
      } else {
        return throwException(response);
      }
    } catch (e) {
      throw CustomException(e.toString());
    }
  }

  // PATCH request
  Future<http.Response> patch(
      String endpoint, Map<String, dynamic> body) async {
    final url = Uri.parse('$baseUrl$endpoint');

    try {
      final token = await getToken();
      final response = await http.patch(url,
          headers: {
            if (token != null) HttpHeaders.authorizationHeader: 'Bearer $token'
          },
          body: body);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response;
      } else {
        String errorMessage = jsonDecode(response.body)['message'];
        String errorType = jsonDecode(response.body)['error'];
        throw CustomException('$errorType: $errorMessage');
      }
    } catch (e) {
      throw CustomException(e.toString());
    }
  }

  Future<void> postFile(
      String endpoint, String title, String mediaType, File file) async {
    try {
      final url = Uri.parse('$baseUrl$endpoint');
      final token = await getToken();
      final request = http.MultipartRequest('POST', url)
        ..headers['Authorization'] = 'Bearer $token';

      request.fields['title'] = title;

      final multipartFile = http.MultipartFile.fromBytes(
          'file', await file.readAsBytes(),
          filename: file.path.split('/').last,
          contentType: MediaType.parse(mediaType));

      request.files.add(multipartFile);

      // Send request
      final response = await request.send();
      if (!(response.statusCode >= 200 && response.statusCode < 300)) {
        throw CustomException(
            'Failed to upload file. Status Code: ${response.statusCode}');
      }
    } catch (e) {
      throw CustomException(e.toString());
    }
  }
}
