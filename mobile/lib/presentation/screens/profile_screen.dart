import 'package:flutter/material.dart';
import 'package:mobile/config/utils.dart';
import 'package:mobile/presentation/widgets/drawer.dart';
import 'package:mobile/presentation/widgets/media_widget.dart';

import 'package:mobile/services/user_service.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final UserService userService = UserService();
  late String name;
  late String email;
  List mediaList = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchUserData();
    fetchUserMedia();
  }

  // Fetch user data from the API
  void fetchUserData() async {
    userService.getUser().then((data) {
      setState(() {
        name = data['name'];
        email = data['email'];
        isLoading = false;
      });
    }).catchError((error) {
      Utils.mySnackBar(context, error.toString(), Colors.red);
      setState(() {
        isLoading = false;
      });
    });
  }

  // Fetch user media data from the API
  void fetchUserMedia() {
    userService.getUserMedia().then((data) {
      setState(() {
        mediaList = data;
        isLoading = false;
      });
    }).catchError((error) {
      Utils.mySnackBar(context, error.toString(), Colors.red);
      setState(() {
        isLoading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      drawer: const CustomDrawer(),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Center(
              child: Column(
              children: [
                const CircleAvatar(
                  radius: 40,
                  backgroundColor: Colors.black,
                  child: Icon(Icons.face_sharp, size: 60, color: Colors.white),
                ),
                const SizedBox(height: 5),
                Text(
                  name,
                  style: const TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 5),
                Text(
                  email,
                  style: const TextStyle(fontSize: 16, color: Colors.grey),
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.70,
                  child: mediaList.isEmpty
                      ? const Center(
                          child: Text("No Shared Media for the user"),
                        )
                      : ListView.builder(
                          itemCount: mediaList.length,
                          itemBuilder: (context, index) {
                            return MediaWidget(
                              media: mediaList[index],
                              isProfile: true,
                            );
                          },
                        ),
                )
              ],
            )),
    );
  }
}
