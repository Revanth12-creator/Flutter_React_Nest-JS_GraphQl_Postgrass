import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Profile/components/body.dart';

import '../drawer.dart';

class Profile extends StatelessWidget {
  static const routerName = "/profile";

  const Profile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text(
            "Profile",
            style: 
            TextStyle(color: HexColor("#A96BFF"),fontWeight: FontWeight.bold),
          ),
          backgroundColor: Colors.transparent,
          elevation: 0,
          iconTheme: IconThemeData(color: HexColor("#A96BFF"))
          ),
      body: const Body(),
       drawer: const AppDrawer()
    );
  }
}
