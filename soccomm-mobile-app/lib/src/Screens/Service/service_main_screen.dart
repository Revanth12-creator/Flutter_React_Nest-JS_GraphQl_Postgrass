import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Profile/components/image_upload.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/Screens/Service/Service%20lists/service_list.dart';
import 'package:new_project/src/Screens/group/creategroup.dart';
import 'package:new_project/src/Screens/group/groupmember.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:flutter_countdown_timer/flutter_countdown_timer.dart';
import '../drawer.dart';
import '../homepage.dart';

import 'groupimage/imageupload.dart';

class ServiceMainScreen extends StatefulWidget {
  static var routerName = "/servicemainscreen";

  const ServiceMainScreen({Key? key}) : super(key: key);

  @override
  State<ServiceMainScreen> createState() => _ServiceMainScreenState();
}

/// This is the private State class that goes with ServiceMainScreen.
class _ServiceMainScreenState extends State<ServiceMainScreen> {
  bool isValue = true;
  var selectedCategoryId = "0";
  var parentID = "0";
  bool iseEndData = false;

  var rating = 3.0;
  int _selectedIndex = 0;

  final List<String> mainCategoriesData = [];
  List mainCategory = [];

  final List<dynamic> parentData = [];
  final List<dynamic> parentIdData = [];

  bool _canShowButton = true;
  dynamic parentUpId = "0";

  var bredCrumValueBefore = "";
  var bredCrumName = "";

  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static final List<Widget> _widgetOptions = <Widget>[
    ServiceProductList(),
    ServiceProductList(),
    ServiceProductList(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void hideWidget() {
    setState(() {
      _canShowButton = !_canShowButton;
    });
  }

  int endTime = DateTime.now().millisecondsSinceEpoch + 3000 * 30;

  @override
  Widget build(BuildContext context) {
    // var phonenumber = Provider.of<LoginNotifire>(context, listen: false).phone;
    // print("gettig phone:$phonenumber");
    final data = ModalRoute.of(context)?.settings.arguments as Map;
    var grpname = Provider.of<LoginNotifire>(context, listen: false).groupname;
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("join:$userDetails");

    var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("grpid:$groupId");
    print("join: $grpname");
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.purple.shade400,
          title: Text(grpname),
          // automaticallyImplyLeading: false,

          actions: <Widget>[
            Mutation(
                options: MutationOptions(
                  document: gql("""
mutation createGroupUser(\$groupId: String!, \$userId: String!,\$isAdmin:Boolean!,\$isActive:Boolean!){
  createGroupUser(createGroupUserInput:{
  groupId: \$groupId
  userId: \$userId
  isAdmin:\$isAdmin
  isActive:\$isActive
  }){
    id
  }
}
"""),
                  onCompleted: (dynamic resultData) {
                    var postIdData = resultData?['createGroupUser'];
                    Navigator.pushNamed(context, Homepage.routerName);

                    print("second$postIdData");
                  },
                ),
                builder: (runMutation, result) {
                  if (result!.hasException) {
                    return Text(result.exception.toString());
                  }

                  if (result.isLoading) {
                    return Center(
                      child: const CircularProgressIndicator(),
                    );
                  }

                  return !_canShowButton
                      ? const SizedBox.shrink()
                      : ElevatedButton(
                          onPressed: () {
                            runMutation({
                              'groupId': groupId,
                              'userId': userDetails,
                              'isAdmin': false,
                              'isActive': true,
                            });
                            print("adddone");
                            hideWidget();
                          },
                          style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.purple.shade400)),
                          // child: const Text("JOIN"));
                          // child: const Text("JOIN")
                          child: const Icon(
                            Icons.call_merge_rounded,
                            size: 30,
                          ),
                        );
                }),
            InkWell(
              onTap: () =>
                  {Navigator.pushNamed(context, GroupImage.routerName)},
              child: Container(
                margin: EdgeInsets.only(right: 5),
                child: const CircleAvatar(
                  backgroundImage: ExactAssetImage('assets/images/group.jpg'),
                ),
              ),
            ),
          ],
        ),
        body: Column(
          children: [
            // DelayedDisplay(
            //   delay: Duration(seconds: 10),
            //   child: _displayBrudCrum(),
            // ),
            // _displayBrudCrum(),
            CountdownTimer(
                endTime: endTime,
                widgetBuilder: (_, time) {
                  print("after 5 sec");
                  return parentData.length == 0 || parentData.length == ""
                      ? Text("")
                      : Container(
                          margin: EdgeInsets.only(right: 200),
                          child: FlatButton(
                            onPressed: () => {
                              setState(() {
                                isValue = true;
                              }),
                            },
                            color: Colors.white38,
                            // padding: EdgeInsets.all(10.0),
                            child: Row(
                              // Replace with a Row for horizontal icon + text
                              children: <Widget>[
                                Icon(Icons.arrow_back_ios_new_rounded),
                                Text(bredCrumName,
                                    style: TextStyle(fontSize: 17))
                              ],
                            ),
                          ),
                        );
                }),

            Expanded(
              child: SizedBox(
                height: 200.0,
                child: Container(
                    child: Query(
                        options: QueryOptions(
                          document: gql("""
                query findByParentId(\$parentid:String!){
                findByParentId(parentid:\$parentid){                 
                  name
                  id
                  isEnd
                  parent{
                    parentId
                    name
                  } 
                }
                          }
                  """),
                          variables: {
                            'parentid': isValue == true
                                ? parentUpId
                                : selectedCategoryId
                          },
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
                          final List listData = result.data!['findByParentId'];
                          print("parentUpIdBefore${parentUpId}");
                          var obj = ":";
                          mainCategory.clear();
                          mainCategoriesData.clear();
                          parentData.clear();
                          // parentIdData.clear();
                          final mapList = listData.map((items) => {
                                mainCategoriesData
                                    .add(items["name"] + obj + items['id']),
                                iseEndData = items['isEnd'],
                                print(items['parent']),
                                if (items['parent'] != null)
                                  {parentData.add(items['parent'])}
                              });
                          print("database$mapList");
                          print("parentData$parentData");
                          print("parentLength${parentData.length}");

                          var mapParentData = parentData.length > 1
                              ? parentData.map((val) => {
                                    parentIdData.add(val['parentId']),
                                    parentUpId = val['parentId'],
                                    bredCrumName = val['name'],
                                    print("valData${val['parentId']}"),
                                    print("bredCrumName${val['name']}"),
                                  })
                              : "empty";
                          print("mapParentData$mapParentData");
                          print("parentIdData${parentIdData}");
                          print("parentUpId${parentUpId}");
                          print("bredCrumName${bredCrumName}");

                          selectedCategoryId = "";

                          // print("ff${mainCategoriesData.last}");
                          // print("iseEndData$iseEndData");
                          mainCategory = mainCategoriesData.toSet().toList();

                          return GridView.builder(
                              gridDelegate:
                                  SliverGridDelegateWithFixedCrossAxisCount(
                                      crossAxisCount: 2,
                                      crossAxisSpacing: 4.0,
                                      mainAxisSpacing: 4.0),
                              itemCount: mainCategory.length,
                              itemBuilder: (context, index) {
                                // print("mainCategoriesData");
                                // print(mainCategory[index]);

                                return SizedBox(
                                    child: SingleChildScrollView(
                                        scrollDirection: Axis.horizontal,
                                        child: Row(children: <Widget>[
                                          Padding(
                                            padding: const EdgeInsets.all(15),
                                            child: SizedBox(
                                              width: 150,
                                              height: 150,
                                              child: Card(
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          15.0),
                                                ),
                                                color: HexColor("#A96BFF"),
                                                child: InkWell(
                                                    splashColor: Colors.black
                                                        .withAlpha(30),
                                                    onTap: () {
                                                      print(
                                                          'Goods Card tapped.$index');
                                                      setState(() {
                                                        isValue = false;
                                                        // ontap of each card, set the defined int to the grid view index
                                                        selectedCategoryId =
                                                            mainCategory[index]
                                                                .toString()
                                                                .split(':')[1];
                                                        bredCrumValueBefore =
                                                            mainCategory[index]
                                                                .toString()
                                                                .split(':')[0];
                                                        // print( "selectedCategoryId$selectedCategoryId");
                                                      });

                                                      print(
                                                          "selectedCategoryId$selectedCategoryId");
                                                      print(
                                                          "selectedCardValue${mainCategory[index].toString().split(':')[0]}");

                                                      if (iseEndData == true) {
                                                        Provider.of<LoginNotifire>(
                                                                context,
                                                                listen: false)
                                                            .getSubCategId(
                                                                mainCategory[
                                                                        index]
                                                                    .toString()
                                                                    .split(
                                                                        ':')[1]);
                                                        Provider.of<LoginNotifire>(
                                                                context,
                                                                listen: false)
                                                            .getCategoryName(
                                                                mainCategory[
                                                                        index]
                                                                    .toString()
                                                                    .split(
                                                                        ':')[0]);
                                                        Navigator.pushNamed(
                                                            context,
                                                            ServiceProductList
                                                                .routerName);
                                                      }
                                                    },
                                                    child: Center(
                                                      child: Padding(
                                                        padding:
                                                            const EdgeInsets
                                                                .all(10),
                                                        child: Text(
                                                          "${mainCategory[index].toString().split(':')[0]}",
                                                          style:
                                                              const TextStyle(
                                                            color: Colors.white,
                                                            fontSize: 20,
                                                            fontWeight:
                                                                FontWeight.w500,
                                                          ),
                                                        ),
                                                      ),
                                                    )),
                                              ),
                                            ),
                                          ),
                                        ])));
                              });
                        })),
              ),
            ),
          ],
        ),
        drawer: const AppDrawer());
  }
}
