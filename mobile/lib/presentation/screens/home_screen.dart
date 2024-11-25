import 'package:flutter/material.dart';
import 'package:mobile/presentation/widgets/drawer.dart';
import 'package:mobile/presentation/widgets/media_scroll.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Center(child: Text('Media Gallery'))),
      drawer: const CustomDrawer(),
      body: const MediaScroll(isProfile: false),
    );
  }
}
