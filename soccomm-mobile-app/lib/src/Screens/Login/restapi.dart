import 'dart:convert';

import 'package:http/http.dart' as http;

class URLS {
  static const String BASE_URL = 'http://localhost:5001/sms';
}

class ApiService {
  static Future<List<dynamic>?> getOtp() async {
    final response = await http.get(Uri.parse('https://localhost:5001/sms'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      return null;
    }
  }

  static Future<String> addOtp(body) async {
    final response = await http.post(Uri.parse('http://172.30.144.1:5001/sms'),
        body: {"phonenumber": body});
    if (response.statusCode == 200) {
      return response.body;
    } else {
      return "mobile no not exist";
    }
  }

  static Future<String> upimage(imagefile, groupId) async {
    print('gettingimage $imagefile');
    final response = await http.post(
        Uri.parse('http://localhost:5008/media/group'),
        body: {"imagefile": imagefile, "groupId": groupId});
    print(response);
    if (response.statusCode == 200) {
      return response.body;
    } else {
      return "mobile no not exist";
    }
  }

  // static Future<Album> uplodimage(imagefile, groupId) async {
  //   var verify = json.encode(
  //       {"imagefile": imagefile.toString(), "groupId": groupId.toString()});
  //   final response = await http.post(
  //       Uri.parse('http://localhost:5008/media/group'),
  //       body: {"imagefile": imagefile, "groupId": groupId});
  //   print('res $response');
  //   if (response.statusCode == 200) {
  //     print('resgetinggg $response');
  //     return Album.fromJson(jsonDecode(response.body));
  //   } else {
  //     throw Exception('Failed to verify otp.');
  //   }
  // }

  static Future<Album> verifyOtp(phonenumber, otp) async {
    var verify = json
        .encode({"phonenumber": phonenumber.toString(), "otp": otp.toString()});
    final response = await http.post(
        Uri.parse('http://172.30.144.1:5001/sms/check'),
        body: {"phonenumber": phonenumber, "otp": otp});
    if (response.statusCode == 200) {
      print(response);
      return Album.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to verify otp.');
    }
  }
}

class Album {
  final String userId;
  final String token;

  Album({required this.userId, required this.token});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      userId: json['userId'],
      token: json['token'],
    );
  }
}
