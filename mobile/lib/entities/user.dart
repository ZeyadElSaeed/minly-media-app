import 'package:equatable/equatable.dart';
import 'package:mobile/entities/like.dart';
import 'package:mobile/entities/media.dart';

class User extends Equatable {
  final int id;
  final String name;
  final String email;
  final String password;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<Media> media;
  final List<Like> likes;

  const User({
    required this.id,
    required this.name,
    required this.email,
    required this.password,
    required this.createdAt,
    required this.updatedAt,
    required this.media,
    required this.likes,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      password: json['password'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      media: (json['media'] as List<dynamic>)
          .map((e) => Media.fromJson(e))
          .toList(),
      likes: (json['likes'] as List<dynamic>)
          .map((e) => Like.fromJson(e))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'password': password,
        'createdAt': createdAt.toIso8601String(),
        'updatedAt': updatedAt.toIso8601String(),
        'media': media.map((media) => media.toJson()).toList(),
        'likes': likes.map((like) => like.toJson()).toList(),
      };

  @override
  List<Object?> get props =>
      [id, name, email, password, createdAt, updatedAt, media, likes];
}
