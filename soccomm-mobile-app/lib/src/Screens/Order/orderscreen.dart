import 'package:flutter/material.dart';

class OrderScreen extends StatefulWidget {
  static var routerName = '/orderscreen';

  OrderScreen({Key? key}) : super(key: key);

  @override
  _OrderScreenState createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen> {
  @override
  Widget build(BuildContext context) {
  return Scaffold(
      appBar: AppBar(),
      drawer: Drawer(),
    );
  }
}