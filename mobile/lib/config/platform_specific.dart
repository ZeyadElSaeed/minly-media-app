import 'dart:io';
import 'dart:typed_data';
import 'package:path_provider/path_provider.dart';

Future<File> createVideoFileForMobile(
    Uint8List videoBytes, String videoName) async {
  final tempDir = await getTemporaryDirectory();
  final videoDir = Directory('${tempDir.path}/videos');
  if (!await videoDir.exists()) {
    await videoDir.create(recursive: true);
  }
  final tempFile = File('${videoDir.path}/$videoName');
  if (await tempFile.exists()) {
    await tempFile.delete();
  }
  await tempFile.writeAsBytes(videoBytes);
  print("File exists at: ${tempFile.path}");
  return tempFile;
}

void checkFileIntegrity(File file) {
  if (file.existsSync()) {
    print("File exists at: ${file.path}");
    print("File size: ${file.lengthSync()} bytes");

    // Check if the file can be opened
    try {
      final fileContent = file.readAsBytesSync();
      print("First few bytes: ${fileContent.take(20)}");
    } catch (e) {
      print("Error reading the file: $e");
    }
  } else {
    print("File not found!");
  }
}

void checkVideoBytes(Uint8List videoBytes) {
  if (videoBytes.isEmpty) {
    print("Error: Video bytes are empty!");
  } else {
    print("Video bytes size: ${videoBytes.length} bytes");
    // Optionally print the first few bytes to verify the content
    print("First few bytes: ${videoBytes.take(20)}");
  }
}
