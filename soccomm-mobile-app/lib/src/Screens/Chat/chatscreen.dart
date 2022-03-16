import 'package:flutter/material.dart';

class ChatScreen extends StatefulWidget {
  static var routerName = '/chatscreen';

  ChatScreen({Key? key}) : super(key: key);

  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  @override
  Widget build(BuildContext context) {
  return Scaffold(
      appBar: AppBar(),
      drawer: Drawer(),
    );
  }
}