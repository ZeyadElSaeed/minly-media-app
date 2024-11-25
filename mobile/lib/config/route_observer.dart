import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppRouteObserver extends RouteObserver<PageRoute<dynamic>> {
  Future<bool> isTokenValid() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('jwtToken');
    if (token == null || token.isEmpty) {
      return false;
    }
    return true;
  }

  void _checkToken(BuildContext context) async {
    bool isValid = await isTokenValid();
    if (!isValid) {
      Navigator.pushReplacementNamed(context, '/signin');
    }
  }

  @override
  void didPush(Route route, Route? previousRoute) {
    super.didPush(route, previousRoute);
    String routeName = route.settings.name ?? '';
    if (routeName != '/signin' && routeName != '/signup') {
      _checkToken(route.navigator!.context);
    }
  }
}

final AppRouteObserver routeObserver = AppRouteObserver();
