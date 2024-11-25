import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mime/mime.dart';
import 'package:mobile/config/utils.dart';
import 'package:mobile/presentation/widgets/edit_modal_widget.dart';

// import 'package:mime_type/mime_type.dart';
import 'package:mobile/services/media_service.dart';

class UploadMediaPage extends StatefulWidget {
  const UploadMediaPage({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _UploadMediaPageState createState() => _UploadMediaPageState();
}

class _UploadMediaPageState extends State<UploadMediaPage> {
  final ImagePicker _picker = ImagePicker();
  final MediaService mediaService = MediaService();
  final TextEditingController _titleController = TextEditingController();
  XFile? xFile;
  String? mediaType;

  Future<void> _pickMedia() async {
    final XFile? pickedFile = await _picker.pickMedia();
    if (pickedFile != null) {
      setState(() {
        xFile = pickedFile;
        mediaType = lookupMimeType(pickedFile.path);
        print('$mediaType');
      });
    }
  }

  Future<void> _uploadMedia() async {
    if (xFile == null || _titleController.text.isEmpty) {
      Utils.mySnackBar(
          context, 'Provide Title and Media to Upload!', Colors.orange);
      return;
    }
    if (mediaType == null) {
      print('$mediaType');
      Utils.mySnackBar(
          context, 'Cant determine the type of the media!', Colors.orange);
      return;
    }
    String title = _titleController.text;
    mediaService.upload(title, mediaType!, xFile!).then((value) {
      Utils.mySnackBar(context, 'Media uploaded successfully!', Colors.green);
    }).catchError((error) {
      Utils.mySnackBar(context, error.toString(), Colors.red);
    });
  }

  @override
  Widget build(BuildContext context) {
    return CustomModal(
        onClose: () => Navigator.of(context).pop(),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              TextField(
                controller: _titleController,
                decoration: const InputDecoration(labelText: 'Title'),
              ),
              const SizedBox(height: 10),
              ElevatedButton(
                onPressed: _pickMedia,
                child: const Text('Pick Image/Video'),
              ),
              const SizedBox(height: 10),
              xFile != null
                  ? Text('Selected file: ${xFile!.name}')
                  : const Text('No file selected'),
              // const SizedBox(height: 100),
              Container(
                margin: const EdgeInsets.only(top: 150),
                child: ElevatedButton(
                  onPressed: _uploadMedia,
                  child: const Text('Upload Media'),
                ),
              ),
            ],
          ),
        ));
    // return ;
  }
}
