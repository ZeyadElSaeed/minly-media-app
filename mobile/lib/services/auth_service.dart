import 'dart:convert';

import 'package:mobile/config/config.dart';
import 'package:mobile/config/custom_exception.dart';
import 'package:mobile/services/api_service.dart';

class AuthService {
  final ApiService apiService = ApiService(baseUrl: AppConfig.baseUrl);
  AuthService();

  Future<String> signUp(String name, String email, String password) async {
    try {
      final response = await apiService.post(
        '/users',
        {
          'name': name,
          'email': email,
          'password': password,
        },
      );
      return 'Sign-up successful';
    } catch (e) {
      throw CustomException(e.toString());
    }
  }

  Future<Map<String, dynamic>> signIn(String email, String password) async {
    try {
      final response = await apiService.post(
        '/auth/login',
        {
          'email': email,
          'password': password,
        },
      );
      return jsonDecode(response.body);
    } catch (e) {
      throw CustomException('Login failed: $e');
    }
  }
}
