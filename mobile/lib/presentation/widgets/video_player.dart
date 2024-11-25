import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:mobile/config/web_specific.dart';
import 'package:mobile/config/platform_specific.dart';

class VideoPlayerWidget extends StatefulWidget {
  final String mediaName;
  final Uint8List mediaData;
  const VideoPlayerWidget(
      {super.key, required this.mediaName, required this.mediaData});

  @override
  // ignore: library_private_types_in_public_api
  _VideoPlayerWidgetState createState() => _VideoPlayerWidgetState();
}

class _VideoPlayerWidgetState extends State<VideoPlayerWidget> {
  late VideoPlayerController _controller;
  late String _videoUrl;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    createVideoFileForMobile(widget.mediaData, widget.mediaName).then((file) {
      _controller = VideoPlayerController.file(file)
        ..initialize().then((_) {
          // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
          setState(() {
            isLoading = false;
          });
        });
    }).catchError((error) {
      print("error while playing video: $error");
    });
  }

  void initializeVideoPlayer() async {
    if (kIsWeb) {
      _videoUrl = createVideoUrlForWeb(widget.mediaData);
      _controller = VideoPlayerController.networkUrl(Uri.parse(_videoUrl))
        ..initialize().then((_) {
          // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
          setState(() {});
        });
    } else {
      createVideoFileForMobile(widget.mediaData, widget.mediaName).then((file) {
        _controller = VideoPlayerController.file(file)
          ..initialize().then((_) {
            // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
            setState(() {});
          });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Padding(
        padding: EdgeInsets.all(8.0),
        child: Center(child: CircularProgressIndicator()),
      );
    }

    return Container(
        width: 400,
        height: 300,
        child: Scaffold(
          body: Center(
            child: _controller.value.isInitialized
                ? AspectRatio(
                    aspectRatio: _controller.value.aspectRatio,
                    child: VideoPlayer(_controller),
                  )
                : Container(),
          ),
          floatingActionButton: Center(
            child: FloatingActionButton(
              onPressed: () {
                setState(() {
                  _controller.value.isPlaying
                      ? _controller.pause()
                      : _controller.play();
                });
              },
              child: Icon(
                _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
              ),
            ),
          ),
        ));
  }

  @override
  void setState(fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    if (kIsWeb) {
      revokeVideoUrlForWeb(_videoUrl);
    }
    super.dispose();
  }
}
