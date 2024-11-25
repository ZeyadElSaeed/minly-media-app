import 'dart:convert';

import 'package:mobile/config/config.dart';
import 'package:mobile/config/custom_exception.dart';
import 'package:mobile/services/api_service.dart';

class UserService {
  final ApiService apiService = ApiService(baseUrl: AppConfig.baseUrl);
  UserService();

  Future<dynamic> getUser() async {
    try {
      final response = await apiService.get(
        '/users',
      );
      return jsonDecode(response.body);
    } catch (e) {
      throw CustomException(e.toString());
    }
  }

  Future<dynamic> getUserMedia() async {
    try {
      final response = await apiService.get(
        '/users/media',
      );
      return jsonDecode(response.body);
    } catch (e) {
      throw CustomException(e.toString());
    }
  }
}
