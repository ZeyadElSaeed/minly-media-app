import 'package:equatable/equatable.dart';
import 'package:mobile/entities/like.dart';
import 'package:mobile/entities/media_type.dart';
import 'package:mobile/entities/user.dart';

class Media extends Equatable {
  final int id;
  final MediaType type;
  final String title;
  final String url;
  final DateTime createdAt;
  final DateTime updatedAt;
  final User user;
  final List<Like> likes;

  const Media({
    required this.id,
    required this.type,
    required this.title,
    required this.url,
    required this.createdAt,
    required this.updatedAt,
    required this.user,
    required this.likes,
  });

  factory Media.fromJson(dynamic json) {
    return Media(
      id: json['id'],
      type: mediaTypeFromJson(json['type']),
      title: json['title'],
      url: json['url'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      user: User.fromJson(json['user']),
      likes: (json['likes'] as List<dynamic>)
          .map((e) => Like.fromJson(e))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'type': mediaTypeToJson(type),
        'title': title,
        'url': url,
        'createdAt': createdAt.toIso8601String(),
        'updatedAt': updatedAt.toIso8601String(),
        'user': user.toJson(),
        'likes': likes.map((like) => like.toJson()).toList(),
      };

  @override
  List<Object?> get props =>
      [id, type, title, url, createdAt, updatedAt, user, likes];
}
