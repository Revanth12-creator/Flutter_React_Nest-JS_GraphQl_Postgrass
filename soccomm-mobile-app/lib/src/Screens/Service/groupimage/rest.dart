import 'dart:convert';

import 'package:http/http.dart' as http;

class URLS {
  static const String BASE_URL = 'http://localhost:5008/media/group';
}

class ApiService {
  static Future<String> addimage(body, String uploadUrl) async {
    final response = await http.post(
        Uri.parse('http://localhost:5008/media/group'),
        body: {"phonenumber": body});
    if (response.statusCode == 200) {
      return response.body;
    } else {
      return "mobile no not exist";
    }
  }
}

class Album {
  final String groupId;

  Album({required this.groupId});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      groupId: json['c0b37d1b-321a-46e7-a130-65a125addfc5'],
    );
  }
}
