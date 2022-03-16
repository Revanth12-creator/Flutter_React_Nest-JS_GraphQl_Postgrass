import 'package:contacts_service/contacts_service.dart';
import 'package:flutter/material.dart';

class AppContact {
  final Color color;
  final Contact info;
  bool select = false;

  AppContact({
    Key? key,
    required this.color,
    required this.info,
    this.select = false,
  });
}
