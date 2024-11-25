import 'package:flutter/material.dart';
import 'package:mobile/presentation/widgets/media_widget.dart';
import 'package:mobile/services/media_service.dart';

class MediaScroll extends StatefulWidget {
  final bool isProfile;
  const MediaScroll({super.key, required this.isProfile});

  @override
  // ignore: library_private_types_in_public_api
  _MediaScrollState createState() => _MediaScrollState();
}

class _MediaScrollState extends State<MediaScroll> {
  final MediaService mediaService = MediaService();
  bool isLoading = true;
  String message = '';
  List mediaList = [];

  @override
  void initState() {
    super.initState();
    _fetchMedia();
  }

  @override
  void setState(fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  void _fetchMedia() {
    mediaService.getAllMedia().then(
      (value) {
        setState(() {
          mediaList = value;
          isLoading = false;
        });
      },
    ).catchError((e) {
      setState(() {
        message = e.toString();
        isLoading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      body: mediaList.isEmpty
          ? Center(child: Text(message))
          : ListView.builder(
              itemCount: mediaList.length,
              itemBuilder: (context, index) {
                return MediaWidget(
                  media: mediaList[index],
                  isProfile: widget.isProfile,
                );
              },
            ),
    );
  }
}
