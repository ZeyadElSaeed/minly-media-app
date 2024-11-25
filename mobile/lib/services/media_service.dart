import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/config/custom_exception.dart';
import 'package:mobile/config/config.dart';
import 'package:mobile/services/api_service.dart';

class MediaService {
  final ApiService apiService = ApiService(baseUrl: AppConfig.baseUrl);

  MediaService();

  Future<List> getAllMedia() async {
    try {
      final response = await apiService.get('/media');
      final List<dynamic> dataList = jsonDecode(response.body);
      return dataList;
    } catch (e) {
      throw CustomException(e.toString());
    }
  }

  Future<Uint8List> getMediaContent(int mediaId) async {
    try {
      final response = await apiService.get('/media/$mediaId');
      return response.bodyBytes;
    } catch (e) {
      throw Exception('error in getting media content: $e');
    }
  }

  Future<String> likeMedia(int mediaId) async {
    try {
      await apiService.get('/media/$mediaId/like');
      return 'You liked the content';
    } catch (error) {
      throw CustomException(error.toString());
    }
  }

  Future<String> unlikeMedia(int mediaId) async {
    try {
      await apiService.get('/media/$mediaId/unlike');
      return 'You unliked the content';
    } catch (error) {
      throw throw CustomException(error.toString());
    }
  }

  Future<String> delete(int mediaId) async {
    try {
      await apiService.delete('/media/$mediaId');
      return 'You have deleted the media content with id: $mediaId';
    } catch (error) {
      throw throw CustomException(error.toString());
    }
  }

  Future<String> edit(int mediaId, String newTitle) async {
    try {
      await apiService.patch(
        '/media/$mediaId',
        {
          'title': newTitle,
        },
      );
      return 'You have edited the media title with id: $mediaId';
    } catch (error) {
      throw throw CustomException(error.toString());
    }
  }

  Future<void> upload(String title, String mimeType, XFile file) async {
    try {
      File newFile = File(file.path);
      apiService.postFile('/media', title, mimeType, newFile);
    } catch (e) {
      throw CustomException(e.toString());
    }
  }
}
