import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Profile/components/profile_details.dart';
import 'package:new_project/src/Screens/Profile/components/profile_form.dart';

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        padding: const EdgeInsets.symmetric(vertical: 70, horizontal: 20),
        child: Container(
          height: 520.0,
          decoration: BoxDecoration(
              color: HexColor("#A96BFF"),
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(40.0),
                  topRight: Radius.circular(40.0),
                  bottomLeft: Radius.circular(40.0),
                  bottomRight: Radius.circular(40.0))),
          child: Padding(
            padding: const EdgeInsets.all(18.0),
            child: Column(
              children: <Widget>[
                // const ProfilePic(),
                const ProfileDetails(),
                const Padding(padding: EdgeInsets.only(top: 50.0)),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: Colors.white,
                    padding: const EdgeInsets.only(
                        top: 15, bottom: 15, left: 60, right: 60),
                  ),
                  child: const Text("Update Profile",
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 25,
                          fontWeight: FontWeight.w600)),
                  onPressed: () {
                    // ignore: avoid_print
                    print(" Button Clicked");
                    Navigator.pushNamed(context, ProfileForm.routerName);
                  },
                )
              ],
            ),
          ),
        ));
  }
}
