enum MediaType {
  image,
  video,
}

// Helper to parse MediaType from JSON
MediaType mediaTypeFromJson(String type) {
  switch (type) {
    case 'image':
      return MediaType.image;
    case 'video':
      return MediaType.video;
    default:
      throw Exception("Unknown MediaType: $type");
  }
}

// Helper to convert MediaType to JSON
String mediaTypeToJson(MediaType type) {
  return type.toString().split('.').last;
}
