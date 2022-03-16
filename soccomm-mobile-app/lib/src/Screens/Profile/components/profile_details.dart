import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/Screens/Profile/profile_screen.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileDetails extends StatefulWidget {
  static const routerName = '/profileDetails';

  const ProfileDetails({Key? key}) : super(key: key);

  @override
  _ProfileDetailsState createState() => _ProfileDetailsState();
}

class _ProfileDetailsState extends State<ProfileDetails> {
  var profileUserId;
  var profileImages = [];

  @override
  Widget build(BuildContext context) {
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("ff:$userDetails");

    return Container(
        padding: const EdgeInsets.all(2),
        child: Query(
            options: QueryOptions(
              document: gql("""
 query user(\$id:String!){
  user(id:\$id){
    email
    username
    avatar
    role
    upload{
      path
    }
  }
}
  """),
              variables: {'id': userDetails},
            ),
            builder: (QueryResult result, {fetchMore, refetch}) {
              if (result.hasException) {
                return Text(result.exception.toString());
              }
              if (result.isLoading) {
                return Center(
                  child: CircularProgressIndicator(),
                );
              }
              final emailData = result.data!['user']['email'];
              final nameData = result.data!['user']['username'];
              final prifilePic = result.data!['user']['avatar'];
              List imagepic = result.data!['user']['upload'];
              print("database");
              print(emailData);
              print(nameData);
              print(prifilePic);
              print("image${imagepic.length}");
              var mapImages = imagepic.length >= 1
                  ? imagepic.map((data) => {
                        profileImages.add(data['path']),
                      })
                  : "empty";
              print("mapImages$mapImages");
              print("profileImages$profileImages");
              var profilePhoto = profileImages.toSet().toList();
              // print("profilePhoto${profilePhoto.last}");

              Provider.of<LoginNotifire>(context, listen: false)
                  .getUpdatedEmail(emailData);
              Provider.of<LoginNotifire>(context, listen: false)
                  .getUpdatedNam(nameData);
              Provider.of<LoginNotifire>(context, listen: false)
                  .getUpdateImage(prifilePic);

              return SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    SizedBox(
                      height: 140,
                      width: 140,
                      child: Stack(
                        fit: StackFit.expand,
                        clipBehavior: Clip.none,
                        children: [
                          Container(
                            width: 200,
                            margin: const EdgeInsets.all(10),
                            child: ClipRRect(
                                borderRadius: BorderRadius.circular(90),
                                // child: prifilePic == null
                                //     ? Image.asset("assets/images/default.jpg")
                                //     : Image.file(File(prifilePic))

                                child: profileImages.length < 1
                                    ? Image.asset("assets/images/default.jpg")
                                    : Image.file(File(profileImages.last))),
                          ),
                        ],
                      ),
                    ),

                    // CircleAvatar(
                    //   radius: 80.0,
                    //   backgroundImage: AssetImage(profilePhoto
                    //       .last), // <---- HERE I receive the ERROR!!
                    // ),
                    // CircleAvatar(
                    //   radius: 80.0,
                    //   backgroundImage: NetworkImage(profilePhoto
                    //       .last), // <---- HERE I receive the ERROR!!
                    // ),
                    // Image.network(profilePhoto.last),
                    // Image.asset(profilePhoto.last),
                    // Image.file(File(profilePhoto.last)),

                    const Padding(
                      padding: EdgeInsets.only(top: 50),
                    ),
                    ListTile(
                      leading: const Text(
                        "Username :",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 23,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      title: Text(nameData,
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 23,
                              fontWeight: FontWeight.w800)),
                    ),
                    ListTile(
                        leading: const Text("Email :",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 23,
                                fontWeight: FontWeight.w800)),
                        title: Text(emailData,
                            style: const TextStyle(
                                color: Colors.white,
                                fontSize: 23,
                                fontWeight: FontWeight.w800))),
                  ],
                ),
              );
            }));
  }
}
