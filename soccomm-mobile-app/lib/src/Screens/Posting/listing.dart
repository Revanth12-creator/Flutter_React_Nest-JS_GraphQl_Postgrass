// import 'package:favorite_button/favorite_button.dart';
// import 'package:flutter/material.dart';
// import 'package:graphql_flutter/graphql_flutter.dart';
// import 'package:hexcolor/hexcolor.dart';
// import 'package:new_project/src/Screens/Service/service_details.dart';
// import 'package:new_project/src/provider/login_changenotifire.dart';
// import 'package:provider/provider.dart';
// import 'package:smooth_star_rating/smooth_star_rating.dart';



// class Listing extends StatefulWidget {
//   // static var routerName;
//   static var routerName = "/listing";

//   Listing({Key? key}) : super(key: key);

//   @override
//   State<Listing> createState() => _ListingState();
// }

// class _ListingState extends State<Listing> {
//   var rating = 0.0;
//   // var postData = [];

//   @override
//   Widget build(BuildContext context) {
//     var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
//     print("groupId$groupId");
//     return Query(
//         options: QueryOptions(
//           document: gql("""
// query groupposts(\$groupId: String!){
//   groupposts(groupId:\$groupId){
//     postTitle
//     id
//     postupload{
//       path
//     }
//     postattribute{
//       attribute{
//         id
//         name
//       }
//    	  attributeValue
//     }
//     user{
//       username
//     }
//   }
// }
// """),
//         variables:{'groupId':groupId},
//         ),
//         builder: (QueryResult result, {fetchMore, refetch}) {
//           if (result.hasException) {
//             return Text(result.exception.toString());
//           }
//           if (result.isLoading) {
//             return const Center(
//               child: CircularProgressIndicator(),
//             );
//           }
//           final postListData = result.data?['groupposts'];

//           // print("postlist$postListData");
//           // return Text("getting data");

//           return SizedBox(
//             height: 380,
//             child: ListView.builder(
//                 itemCount: postListData.length,
//                 itemBuilder: (_, index) {
//                   var post = postListData[index];
//                   // var postId = post['id'];
//                   // print("postId$postId");
//                   // var postAttributeData =
//                   //     post['postattribute'][3]['attributeValue'];
//                   // print("postAttribute$postAttributeData");

//                   var postTitle = post['postTitle'];
//                   print("posttitle $postTitle");
//                   var postid = post['id'];
//                   print("postid $postid");
//                   return SizedBox(
//                     child: SingleChildScrollView(
//                       child: Column(
//                         children: [
//                           Padding(
//                             padding: const EdgeInsets.all(15.0),
//                             child: Container(
//                               height: 360.0,
//                               decoration: BoxDecoration(
//                                   color: HexColor("#212f45"),
//                                   borderRadius: const BorderRadius.only(
//                                       bottomLeft: Radius.circular(10.0),
//                                       bottomRight: Radius.circular(10.0),
//                                       topLeft: Radius.circular(10.0),
//                                       topRight: Radius.circular(10.0))),
//                               child: Column(
//                                 children: <Widget>[
//                                   Padding(
//                                     padding: const EdgeInsets.all(20),
//                                     child: InkWell(
//                                       onTap: () {
//                                         var postId = post['id'];
//                                         print("postid$postId");
//                                         Provider.of<LoginNotifire>(context,
//                                                 listen: false)
//                                             .getPostId(postId);

//                                         Navigator.pushNamed(
//                                             context, serviceDetails.routerName);
//                                       },
//                                       child: Container(
//                                           height: 120.0,
//                                           width: 310.0,
//                                           decoration: const BoxDecoration(
//                                               color: Colors.white,
//                                               borderRadius: BorderRadius.all(Radius.circular(20.0))),
                                                  
//                                           child: Padding(
//                                             padding: const EdgeInsets.all(5.0),
//                                             child: ClipRRect(
//                                               borderRadius:
//                                                   BorderRadius.circular(20),
//                                               child: Image.network(
//                                                 "http://www.goodmorningimagesdownload.com/wp-content/uploads/2020/06/Alone-Boys-Girls-Images-6.jpg",
//                                                 height: 100,
//                                                 width: 250,
//                                               ),
//                                             ),
//                                           )),
//                                     ),
//                                   ),
//                                   Row(
//                                     children: [
//                                       Padding(
//                                         padding:
//                                             const EdgeInsets.only(left: 200),
//                                         child: SmoothStarRating(
//                                           rating: rating,
//                                           isReadOnly: false,
//                                           size: 25,
//                                           filledIconData: Icons.star,
//                                           halfFilledIconData: Icons.star_half,
//                                           defaultIconData: Icons.star_border,
//                                           starCount: 5,
//                                           allowHalfRating: true,
//                                           spacing: 2.0,
//                                           color: Colors.orange,
//                                           onRated: (value) {
//                                             print("rating value -> $value");
//                                             // print("rating value dd -> ${value.truncate()}");
//                                           },
//                                         ),
//                                       ),
//                                       const SizedBox(),
//                                     ],
//                                   ),
//                                   Row(
//                                     children: [
//                                       SizedBox(),
//                                       Padding(
//                                         padding: const EdgeInsets.only(
//                                             bottom: 5, top: 5, left: 25),
//                                         child: Text(
//                                           post['postTitle'],
//                                           style: const TextStyle(
//                                             color: Colors.white,
//                                             fontSize: 20,
//                                             // decoration: TextDecoration.none,
//                                             // fontWeight: FontWeight.w500
//                                           ),
//                                           textAlign: TextAlign.left,
//                                         ),
//                                       ),
//                                     ],
//                                   ),
//                                   Padding(
//                                     padding: const EdgeInsets.only(
//                                         bottom: 10.5,
//                                         top: 10.5,
//                                         left: 25,
//                                         right: 25),
//                                     child: Text(
//                                       post['postattribute'][3]
//                                           ['attributeValue'],
//                                       style: const TextStyle(
//                                           color: Colors.white,
//                                           fontSize: 15,
//                                           decoration: TextDecoration.none,
//                                           fontWeight: FontWeight.w500),
//                                       textAlign: TextAlign.left,
//                                     ),
//                                   ),
//                                   Row(
//                                     children: <Widget>[
//                                       Container(
//                                         margin: const EdgeInsets.only(
//                                           left: 20.0,
//                                         ),
//                                         child: Padding(
//                                           padding: EdgeInsets.all(5.0),
//                                           child: Text(
//                                             post['user']['username'],
//                                             style: const TextStyle(
//                                                 color: Colors.white,
//                                                 fontSize: 20),
//                                           ),
//                                         ),
//                                       ),
//                                       // Container(
//                                       //   padding: const EdgeInsets.all(5.0),
//                                       //   child: FavoriteButton(
//                                       //     valueChanged: (_isFavorite) {
//                                       //       print('Is Favorite $_isFavorite)');
//                                       //     },
//                                       //     iconSize: 40,
//                                       //   ),
//                                       //   margin:
//                                       //       const EdgeInsets.only(left: 110),
//                                       // )
//                                     ],
//                                   ),
//                                 ],
//                               ),
//                             ),
//                           )
//                         ],
//                       ),
//                     ),
//                   );
//                 }),
//           );
//         });
//   }
// }
