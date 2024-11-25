import 'package:flutter/material.dart';
import 'package:mobile/presentation/widgets/upload_media.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'drawer_item.dart';

class CustomDrawer extends StatelessWidget {
  const CustomDrawer({super.key});

  Future<void> logout(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwtToken'); // Remove JWT token
    Navigator.pushReplacementNamed(context, '/signin');
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const SizedBox(height: 50),
          DrawerItem(
              icon: Icons.home,
              title: 'Home',
              onTap: () => Navigator.pushNamed(context, '/home')),
          DrawerItem(
              icon: Icons.person,
              title: 'Profile',
              onTap: () => Navigator.pushNamed(context, '/profile')),
          DrawerItem(
              icon: Icons.upload,
              title: 'Upload Media Content',
              onTap: () {
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return const UploadMediaPage();
                    });
              }),
          DrawerItem(
              icon: Icons.exit_to_app,
              title: 'Logout',
              onTap: () => logout(context)),
        ],
      ),
    );
  }
}
