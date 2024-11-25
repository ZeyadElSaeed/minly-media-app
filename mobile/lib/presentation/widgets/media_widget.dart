import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:mobile/config/utils.dart';
import 'package:mobile/presentation/widgets/edit_modal_widget.dart';
import 'package:mobile/presentation/widgets/video_player.dart';
import 'package:mobile/services/media_service.dart';
// import 'package:path_provider/path_provider.dart';

class MediaWidget extends StatefulWidget {
  final Map<String, dynamic> media;
  final bool isProfile;

  const MediaWidget({
    super.key,
    required this.media,
    required this.isProfile,
  });

  @override
  // ignore: library_private_types_in_public_api
  _MediaWidgetState createState() => _MediaWidgetState();
}

class _MediaWidgetState extends State<MediaWidget> {
  final MediaService mediaService = MediaService();
  final TextEditingController titleController = TextEditingController();
  int likes = 0;
  String title = '';
  bool isLoading = true;
  bool isDeleted = false;
  String message = '';
  Uint8List mediaContent = Uint8List(0);

  @override
  void initState() {
    super.initState();
    titleController.text = widget.media['title'];
    _fetchMediaContent();
  }

  @override
  void setState(fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  @override
  void dispose() {
    titleController.dispose();
    super.dispose();
  }

  Future<void> _fetchMediaContent() async {
    final mediaId = widget.media['id'];
    mediaService.getMediaContent(mediaId).then((data) {
      setState(() {
        mediaContent = data;
        likes = widget.media['likes'].length;
        title = widget.media['title'];
        isLoading = false;
      });
    }).catchError((error) {
      setState(() {
        message = 'Error: $error';
        isLoading = false;
      });
    });
  }

  void mySnackBar(String message, Color color) {
    Utils.mySnackBar(context, message, color);
  }

  void handleLike() {
    final mediaId = widget.media['id'];
    mediaService.likeMedia(mediaId).then((value) {
      mySnackBar(value, Colors.green);
      setState(() {
        likes += 1;
      });
    }).catchError((error) {
      mySnackBar(error.toString(), Colors.red);
    });
  }

  void handleUnLike() {
    final mediaId = widget.media['id'];
    mediaService.unlikeMedia(mediaId).then((value) {
      mySnackBar(value, Colors.green);
      setState(() {
        likes -= 1;
      });
    }).catchError((error) {
      mySnackBar(error.toString(), Colors.red);
    });
  }

  void handleDelete() {
    final mediaId = widget.media['id'];
    mediaService.delete(mediaId).then((value) {
      mySnackBar(value, Colors.grey);
      setState(() {
        isDeleted = true;
      });
    }).catchError((error) {
      mySnackBar(error.toString(), Colors.red);
    });
  }

  void handleEdit() {
    final mediaId = widget.media['id'];
    final newTitle = titleController.text.trim();
    mediaService.edit(mediaId, newTitle).then((value) {
      mySnackBar(value, Colors.green);
      setState(() {
        title = newTitle;
      });
      titleController.text = newTitle;
    }).catchError((error) {
      mySnackBar(error.toString(), Colors.red);
    });
  }

  void showEditModal(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return CustomModal(
            onClose: () => Navigator.of(context).pop(),
            child: Center(
              child: Column(
                children: [
                  const Text(
                    "Edit Media Title!",
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    width: 200,
                    margin: const EdgeInsets.all(20),
                    child: TextField(
                      controller: titleController,
                      decoration: const InputDecoration(labelText: "Title"),
                      keyboardType: TextInputType.text,
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      handleEdit();
                      Navigator.of(context).pop();
                    },
                    child: const Text("Save"),
                  ),
                ],
              ),
            ));
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Padding(
        padding: EdgeInsets.all(8.0),
        child: Center(child: CircularProgressIndicator()),
      );
    }

    return Visibility(
        visible: !isDeleted,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Card(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  margin: const EdgeInsets.all(10),
                  child: Text(title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      )),
                ),
                if (widget.media['type'] == 'image') ...[
                  Center(
                    child: Image.memory(mediaContent),
                  ),
                ] else ...[
                  Center(
                      child: VideoPlayerWidget(
                    mediaName: widget.media['url'],
                    mediaData: mediaContent,
                  )),
                ],
                Container(
                  margin: const EdgeInsets.only(left: 15, top: 8, bottom: 8),
                  child: Text('Total likes: $likes'),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    ElevatedButton(
                      onPressed: handleLike,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                      ),
                      child: const Text(
                        'Like',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    ElevatedButton(
                      onPressed: handleUnLike,
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.grey),
                      child: const Text('Unlike',
                          style: TextStyle(color: Colors.white)),
                    ),
                    if (widget.isProfile)
                      ElevatedButton(
                        onPressed: handleDelete,
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.red),
                        child: const Text('Delete',
                            style: TextStyle(color: Colors.white)),
                      ),
                    if (widget.isProfile)
                      ElevatedButton(
                        onPressed: () {
                          showEditModal(context);
                        },
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.orange),
                        child: const Text('Edit',
                            style: TextStyle(color: Colors.white)),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
              ],
            ),
          ),
        ));
  }
}
