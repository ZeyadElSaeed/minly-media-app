import 'package:flutter/foundation.dart';

class AppConfig {
  static const String baseUrl =
      kIsWeb ? "http://localhost:4000" : "http://10.0.2.2:4000";
}
