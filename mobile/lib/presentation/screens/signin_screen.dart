import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/services/auth_service.dart';

class SignInScreen extends StatefulWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final AuthService authRepository = AuthService();

  bool isLoading = false;
  String message = '';

  void handleLogin() async {
    setState(() {
      isLoading = true;
      message = '';
    });

    try {
      final response = await authRepository.signIn(
        emailController.text.trim(),
        passwordController.text.trim(),
      );

      if (response.containsKey('accessToken')) {
        final jwtToken = response['accessToken'];

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('jwtToken', jwtToken);

        setState(() {
          message = 'Login successful';
        });

        Navigator.pushReplacementNamed(context, '/home');
      } else {
        throw Exception('Unexpected response structure');
      }
    } catch (e) {
      setState(() {
        message = e.toString();
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Sign In")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: emailController,
              decoration: const InputDecoration(labelText: "Email"),
              keyboardType: TextInputType.emailAddress,
            ),
            TextField(
              controller: passwordController,
              decoration: const InputDecoration(labelText: "Password"),
              obscureText: true,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: isLoading ? null : handleLogin,
              child: isLoading
                  ? const CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation(Colors.white),
                    )
                  : const Text("Login"),
            ),
            if (message.isNotEmpty) ...[
              const SizedBox(height: 16),
              Text(message, style: const TextStyle(color: Colors.red)),
            ],
            TextButton(
              onPressed: () {
                Navigator.pushNamed(context, '/signup');
              },
              child: const Text("Don't have an account? Sign Up"),
            ),
          ],
        ),
      ),
    );
  }
}
