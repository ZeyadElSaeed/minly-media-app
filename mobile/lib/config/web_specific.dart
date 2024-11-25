// web_specific.dart
import 'dart:typed_data';
// import 'dart:html' as html;
import "package:universal_html/html.dart" as html;

String createVideoUrlForWeb(Uint8List videoBytes) {
  final blob = html.Blob([videoBytes]);
  final videoUrl = html.Url.createObjectUrlFromBlob(blob);
  return videoUrl;
}

void revokeVideoUrlForWeb(String videoUrl) {
  html.Url.revokeObjectUrl(videoUrl);
}
