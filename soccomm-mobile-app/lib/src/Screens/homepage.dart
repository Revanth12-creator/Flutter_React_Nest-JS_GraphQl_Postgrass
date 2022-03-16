import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/drawer.dart';
import 'package:new_project/src/Screens/group/Adduser.dart';
import 'package:new_project/src/Screens/group/addmember.dart';
import 'package:new_project/src/Screens/group/creategroup.dart';
import 'package:new_project/src/widget/grouplist.dart';
import 'package:new_project/src/widget/search.dart';

import 'group/contacts-list.dart';

class Homepage extends StatefulWidget {
  static var routerName = '/home';

  const Homepage({Key? key, required String value}) : super(key: key);

  @override
  _HomepageState createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('soccomm',
              style: TextStyle(
                  color: HexColor("#A96BFF"),
                  fontWeight: FontWeight.bold,
                  fontSize: 25)),
          backgroundColor: Colors.transparent,
          elevation: 0,
          iconTheme: IconThemeData(color: HexColor("#A96BFF")),
          actions: [
            IconButton(
                onPressed: () => {
                      Navigator.of(context).push(
                          MaterialPageRoute(builder: (context) => SearchPage()))
                    },
                icon: const Icon(Icons.search_sharp)),
            // IconButton(
            //   onPressed: () => {},
            //   icon: const Icon(Icons.notifications),
            // ),
          ],
        ),
        body: WillPopScope(
          onWillPop: () async => false,
          child: Grouplist(
            value: '',
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
            onPressed: () {
              Navigator.pushNamed(context, CreateGroup.routerName);
            },
            icon: Icon(
              Icons.add,
              color: HexColor("#A96BFF"),
              size: 30.0,
            ),
            label: Text('Create Group')
            // backgroundColor: HexColor("#ffffff"),
            // elevation: 0.0,
            ),
        drawer: const AppDrawer());
  }
}

class SliverDelegate extends SliverPersistentHeaderDelegate {
  Widget child;

  SliverDelegate({required this.child});

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return child;
  }

  @override
  double get maxExtent => 60;

  @override
  double get minExtent => 60;

  @override
  bool shouldRebuild(SliverDelegate oldDelegate) {
    return oldDelegate.maxExtent != 60 ||
        oldDelegate.minExtent != 60 ||
        child != oldDelegate.child;
  }
}
