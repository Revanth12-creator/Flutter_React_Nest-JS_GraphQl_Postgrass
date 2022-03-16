import 'package:flutter/material.dart';

class MyCart extends StatefulWidget {
  static var routerName='/mycart';

  MyCart({Key? key}) : super(key: key);

  @override
  _MyCartState createState() => _MyCartState();
}

class _MyCartState extends State<MyCart> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      drawer: Drawer(),
    );
  }
}