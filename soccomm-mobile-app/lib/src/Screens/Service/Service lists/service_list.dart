import 'dart:math';

import 'package:favorite_button/favorite_button.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/Screens/Service/Service%20lists/post_edit.dart';
import 'package:new_project/src/Screens/Service/groupimage/imageupload.dart';
import 'package:new_project/src/Screens/Service/service_details.dart';
import 'package:new_project/src/Screens/group/groupmember.dart';
import 'package:new_project/src/Screens/products/components/posting/posting_screen.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:smooth_star_rating/smooth_star_rating.dart';

import '../../drawer.dart';
import '../../homepage.dart';

class ServiceProductList extends StatefulWidget {
  static var routerName = "/serviceproductlist";

  ServiceProductList({Key? key}) : super(key: key);

  @override
  State<ServiceProductList> createState() => _ServiceProductListState();
}

class _ServiceProductListState extends State<ServiceProductList> {
  var rating = 0.0;
  // var postData = [];
  bool _canShowButton = true;
  int _selectedIndex = 0;
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

  Future<void> _showMyDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
            title: Text(''),
            content: Text('Are you sure you want to post'),
            actions: <Widget>[
              Column(
                children: [
                  Row(
                    children: [
                      TextButton(
                        child: Text('No'),
                        onPressed: () {
                          print('Cancel');
                          Navigator.of(context).pop();
                        },
                      ),
                      TextButton(
                        child: Text('Yes'),
                        onPressed: () {
                          print("ok");
                        },
                      ),
                    ],
                  ),
                ],
              )
            ]);
      },
    );
  }

  Future<void> _showEditDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
            title: Text(''),
            content: Text('Are you sure you want to edit'),
            actions: <Widget>[
              Column(
                children: [
                  Row(
                    children: [
                      TextButton(
                        child: Text('No'),
                        onPressed: () {
                          print('Cancel');
                          Navigator.of(context).pop();
                        },
                      ),
                      TextButton(
                        child: Text('Yes'),
                        onPressed: () {
                          print("ok");
                          Navigator.pushNamed(context, PostEdit.routerName);
                        },
                      ),
                    ],
                  ),
                ],
              )
            ]);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    var categoryId =
        Provider.of<LoginNotifire>(context, listen: false).subCategId;
    print("categoryId:$categoryId");
    print("hello:$categoryId");

    final data = ModalRoute.of(context)?.settings.arguments as Map;
    var grpname = Provider.of<LoginNotifire>(context, listen: false).groupname;
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("join:$userDetails");
    var cId = Provider.of<LoginNotifire>(context, listen: false).contactId;
    print("cccccid:$cId");

    var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("grpid:$groupId");
    print("join: $grpname");

    // var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    // print("groupId$groupId");

    var categoryname =
        Provider.of<LoginNotifire>(context, listen: false).categoryName;
    print("categoryname :$categoryname");
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.purple.shade400,
          title: Text(grpname),
          // automaticallyImplyLeading: false,
          actions: <Widget>[
            Container(
                margin: EdgeInsets.only(top: 20, right: 20),
                child: Text(categoryname, style: TextStyle(fontSize: 18))),
//             Mutation(
//                 options: MutationOptions(
//                   document: gql("""
// mutation createGroupUser(\$groupId: String!, \$userId: String!,\$isAdmin:Boolean!,\$isActive:Boolean!){
//   createGroupUser(createGroupUserInput:{
//   groupId: \$groupId
//   userId: \$userId
//   isAdmin:\$isAdmin
//   isActive:\$isActive
//   }){
//     id
//   }
// }
// """),
//                   onCompleted: (dynamic resultData) {
//                     var postIdData = resultData?['createGroupUser'];
//                     Navigator.pushNamed(context, Homepage.routerName);

//                     print("second$postIdData");
//                   },
//                 ),
//                 builder: (runMutation, result) {
//                   if (result!.hasException) {
//                     return Text(result.exception.toString());
//                   }

//                   if (result.isLoading) {
//                     return Center(
//                       child: const CircularProgressIndicator(),
//                     );
//                   }

//                   return !_canShowButton
//                       ? const SizedBox.shrink()
//                       : ElevatedButton(
//                           onPressed: () {
//                             runMutation({
//                               'groupId': groupId,
//                               'userId': userDetails,
//                               'isAdmin': false,
//                               'isActive': true,
//                             });
//                             print("adddone");
//                             hideWidget();
//                           },
//                           style: ButtonStyle(
//                               backgroundColor: MaterialStateProperty.all<Color>(
//                                   Colors.purple.shade400)),
//                           // child: const Text("JOIN"));
//                           // child: const Text("JOIN")
//                           child: const Icon(
//                             Icons.call_merge_rounded,
//                             size: 30,
//                           ),
//                         );
//                 }),

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
                    Navigator.pushNamed(context, GroupMembers.routerName);

                    ElevatedButton(
                      child: const Icon(
                        Icons.people_alt_rounded,
                        size: 30,
                      ),
                      onPressed: () {
                        Navigator.pushNamed(context, GroupMembers.routerName);
                      },
                      style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                              Colors.purple.shade400)),
                    );
                    print("second$postIdData");
                  },
                ),
                builder: (runMutation, result) {
                  if (result!.hasException) {
                    return Text(result.exception.toString());
                  }

                  if (result.isLoading) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }
                  for (var i = 0; i < cId.length; i++) {
                    return ElevatedButton(
                      onPressed: () {
                        runMutation({
                          'groupId': groupId,
                          'userId': cId[i],
                          'isAdmin': false,
                          'isActive': true,
                        });
                        print("createeegrouppp");
                      },
                      style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                              Colors.purple.shade400)),
                      // child: const Text("JOIN"));
                      // child: const Text("JOIN")
                      child: const Icon(
                        Icons.people_alt_rounded,
                        size: 30,
                      ),
                    );
                  }
                  return Text('');
                }),

            // ElevatedButton(
            //   child: const Text("JOIN"),
            //   onPressed: () {
            //     Navigator.pushNamed(context, GroupMembers.routerName);
            //   },
            // ),
            // ElevatedButton(
            //   child: const Icon(
            //     Icons.people_alt_rounded,
            //     size: 30,
            //   ),
            //   onPressed: () {
            //     Navigator.pushNamed(context, GroupMembers.routerName);
            //   },
            //   style: ButtonStyle(
            //       backgroundColor:
            //           MaterialStateProperty.all<Color>(Colors.purple.shade400)),
            // ),
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
        body: WillPopScope(
          onWillPop: () async => false,
          child: Query(
              options: QueryOptions(
                document: gql("""
        
            query groupcategoryposts(\$categoryId:String!, \$groupId:String!){
              groupcategoryposts(gcPost:{
              categoryId:\$categoryId
              groupId:\$groupId
              }){
               postTitle
               id
              postupload{
              path
              }
              postattribute{
          attribute{
            name
          }
            attributeValue
              }
              user{
          username
          id
       
              }
              }
            }
        
            """),
                variables: {'categoryId': categoryId, 'groupId': groupId},
              ),
              builder: (QueryResult result, {fetchMore, refetch}) {
                if (result.hasException) {
                  return Text(result.exception.toString());
                }
                if (result.isLoading) {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                }
                final postListData = result.data?['groupcategoryposts'];

                // print("postlist$postListData");
                // return Text("getting data");

                return SizedBox(
                  // height: 380,
                  child: ListView.builder(
                      itemCount: postListData.length,
                      itemBuilder: (_, index) {
                        var post = postListData[index];
                        // var postId = post['id'];
                        // print("postId$postId");
                        // var postAttributeData =
                        //     post['postattribute'][3]['attributeValue'];
                        // print("postAttribute$postAttributeData");

                        // var postTitle = post['postTitle'];
                        // print("posttitle $postTitle");
                        var postid = post['id'];
                        // print("postid $postid");
                        var postUserId = post['user']['id'];
                        print("postuserid $postUserId");
                        return SizedBox(
                          child: SingleChildScrollView(
                            child: Column(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: Container(
                                    height: 360.0,
                                    decoration: BoxDecoration(
                                        color: HexColor("#212f45"),
                                        borderRadius: const BorderRadius.only(
                                            bottomLeft: Radius.circular(10.0),
                                            bottomRight: Radius.circular(10.0),
                                            topLeft: Radius.circular(10.0),
                                            topRight: Radius.circular(10.0))),
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.start,
                                      children: <Widget>[
                                        Padding(
                                          padding: const EdgeInsets.all(20),
                                          child: InkWell(
                                            onTap: () {
                                              var postId = post['id'];
                                              print("postid$postId");
                                              Provider.of<LoginNotifire>(
                                                      context,
                                                      listen: false)
                                                  .getPostId(postId);

                                              Navigator.pushNamed(context,
                                                  serviceDetails.routerName);
                                            },
                                            child: Container(
                                                height: 120.0,
                                                width: 310.0,
                                                decoration: const BoxDecoration(
                                                    color: Colors.white,
                                                    borderRadius:
                                                        BorderRadius.all(
                                                            Radius.circular(
                                                                20.0))),
                                                child: Padding(
                                                  padding:
                                                      const EdgeInsets.all(5.0),
                                                  child: ClipRRect(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            20),
                                                    child: Image.network(
                                                      "http://www.goodmorningimagesdownload.com/wp-content/uploads/2020/06/Alone-Boys-Girls-Images-6.jpg",
                                                      height: 100,
                                                      width: 250,
                                                    ),
                                                  ),
                                                )),
                                          ),
                                        ),
                                        Row(
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  left: 200),
                                              child: SmoothStarRating(
                                                rating: rating,
                                                isReadOnly: false,
                                                size: 25,
                                                filledIconData: Icons.star,
                                                halfFilledIconData:
                                                    Icons.star_half,
                                                defaultIconData:
                                                    Icons.star_border,
                                                starCount: 5,
                                                allowHalfRating: true,
                                                spacing: 2.0,
                                                color: Colors.orange,
                                                onRated: (value) {
                                                  print(
                                                      "rating value -> $value");
                                                  // print("rating value dd -> ${value.truncate()}");
                                                },
                                              ),
                                            ),
                                            const SizedBox(),
                                          ],
                                        ),
                                        Row(
                                          children: [
                                            SizedBox(),
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  bottom: 5, top: 5, left: 25),
                                              child: Text(
                                                post['postTitle'],
                                                style: const TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 20,
                                                  // decoration: TextDecoration.none,
                                                  // fontWeight: FontWeight.w500
                                                ),
                                                textAlign: TextAlign.left,
                                              ),
                                            ),
                                          ],
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: 10.5,
                                              top: 10.5,
                                              left: 25,
                                              right: 25),
                                          child: Text(
                                            post['postattribute'][3]
                                                ['attributeValue'],
                                            style: const TextStyle(
                                                color: Colors.white,
                                                fontSize: 15,
                                                decoration: TextDecoration.none,
                                                fontWeight: FontWeight.w500),
                                            textAlign: TextAlign.left,
                                          ),
                                        ),
                                        Row(
                                          children: <Widget>[
                                            Container(
                                              margin: const EdgeInsets.only(
                                                left: 20.0,
                                              ),
                                              child: Padding(
                                                padding: EdgeInsets.all(5.0),
                                                child: Text(
                                                  post['user']['username'],
                                                  style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 20),
                                                ),
                                              ),
                                            ),
                                            // Container(
                                            //   padding: const EdgeInsets.all(5.0),
                                            //   child: FavoriteButton(
                                            //     valueChanged: (_isFavorite) {
                                            //       print('Is Favorite $_isFavorite)');
                                            //     },
                                            //     iconSize: 40,
                                            //   ),
                                            //   margin:
                                            //       const EdgeInsets.only(left: 110),
                                            // )
                                          ],
                                        ),
                                        SizedBox(
                                          child: Container(
                                            margin: const EdgeInsets.only(
                                              left: 280.0,
                                            ),
                                            child: Mutation(
                                                options: MutationOptions(
                                                  document: gql("""
                                              mutation RemovePost(\$removePostId: String!) {
                                                 removePost(id: \$removePostId) {
                                                __typename
                                               }
                                                }
                                              """),
                                                  onCompleted:
                                                      (dynamic resultData) {
                                                    Navigator.pushNamed(
                                                        context,
                                                        ServiceProductList
                                                            .routerName);

                                                    print("data fetched");
                                                  },
                                                ),
                                                builder: (runMutation, resul) {
                                                  if (result.hasException) {
                                                    return Text(result.exception
                                                        .toString());
                                                  }

                                                  if (result.isLoading) {
                                                    return Center(
                                                      child:
                                                          const CircularProgressIndicator(),
                                                    );
                                                  }

                                                  return userId == postUserId
                                                      ? Container(
                                                          child: Row(
                                                            children: <Widget>[
                                                              // InkWell(
                                                              //   child:
                                                              //       const Icon(
                                                              //     Icons
                                                              //         .edit_outlined,
                                                              //     color: Colors
                                                              //         .white,
                                                              //     size: 25,
                                                              //   ),
                                                              //   onTap: () {
                                                              //     print(
                                                              //         "post edit");
                                                              //     _showEditDialog();
                                                              //   },
                                                              // ),
                                                              // SizedBox(
                                                              //   width: 10,
                                                              // ),
                                                              InkWell(
                                                                  child:
                                                                      const Icon(
                                                                    Icons
                                                                        .delete,
                                                                    color: Colors
                                                                        .red,
                                                                    size: 25,
                                                                  ),
                                                                  onTap: () {
                                                                    runMutation({
                                                                      'removePostId':
                                                                          postid
                                                                    });
                                                                    print(
                                                                        "post deleted");
                                                                  }),
                                                              //
                                                            ],
                                                          ),
                                                        )
                                                      : const Text("");
                                                }),
                                            // child: InkWell(
                                            //   child: const Icon(
                                            //     Icons.delete,
                                            //     color: Colors.white,
                                            //     size: 25,
                                            //   ),
                                            //   onTap: () {
                                            //     print("delete clicked");
                                            //     Future<void>
                                            //         _showMyDialog() async {
                                            //       return showDialog<void>(
                                            //         context: context,
                                            //         barrierDismissible:
                                            //             false, // user must tap button!
                                            //         builder:
                                            //             (BuildContext context) {
                                            //           return AlertDialog(
                                            //               title: Text(''),
                                            //               content: Text(
                                            //                   'Are you sure you want to post'),
                                            //               actions: <Widget>[
                                            //                 Column(
                                            //                   children: [
                                            //                     Row(
                                            //                       children: [
                                            //                         TextButton(
                                            //                           child: Text(
                                            //                               'No'),
                                            //                           onPressed:
                                            //                               () {
                                            //                             print(
                                            //                                 'Cancel');
                                            //                             Navigator.of(context)
                                            //                                 .pop();
                                            //                           },
                                            //                         ),
                                            //                         TextButton(
                                            //                           child: Text(
                                            //                               'Yes'),
                                            //                           onPressed:
                                            //                               () {
                                            //                             print(
                                            //                                 "ok");
                                            //                             Navigator.pushNamed(
                                            //                                 context,
                                            //                                 PostigScreen.routerName);
                                            //                           },
                                            //                         ),
                                            //                       ],
                                            //                     ),
                                            //                   ],
                                            //                 )
                                            //               ]);
                                            //         },
                                            //       );
                                            //     }
                                            // },
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        );
                      }),
                );
              }),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            // _showMyDialog();
            Navigator.pushNamed(context, PostigScreen.routerName);
          },
          child: Transform.rotate(
              angle: -45 * pi / 180, child: const Icon(Icons.send_sharp)),
          backgroundColor: Colors.purple.shade600,
          // child: Text('Join'),
        ),
        drawer: const AppDrawer());
  }
}
