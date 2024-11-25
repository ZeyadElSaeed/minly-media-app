import 'package:equatable/equatable.dart';
import 'package:mobile/entities/media.dart';
import 'package:mobile/entities/user.dart';

class Like extends Equatable {
  final int id;
  final User user;
  final Media media;
  final DateTime createdAt;

  const Like({
    required this.id,
    required this.user,
    required this.media,
    required this.createdAt,
  });

  factory Like.fromJson(Map<String, dynamic> json) {
    return Like(
      id: json['id'],
      user: User.fromJson(json['user']),
      media: Media.fromJson(json['media']),
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'user': user.toJson(),
        'media': media.toJson(),
        'createdAt': createdAt.toIso8601String(),
      };

  @override
  List<Object?> get props => [id, user, media, createdAt];
}
