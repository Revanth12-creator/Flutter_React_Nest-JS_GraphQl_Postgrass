import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Listing/category_listing.dart';
import 'package:new_project/src/Screens/Posting/listing.dart';
import 'package:new_project/src/Screens/Service/Service%20lists/service_list.dart';
import 'package:new_project/src/Screens/Service/service_main_screen.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';

class Grouplist extends StatefulWidget {
  final String value;
  Grouplist({Key? key, required this.value}) : super(key: key);

  static const routerName = "/grouplist";

  @override
  _GrouplistState createState() => _GrouplistState();
}

class _GrouplistState extends State<Grouplist> {
  var tmpArray = [];

  @override
  Widget build(BuildContext context) {
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("ff:$userDetails");
    return Query(
        options: QueryOptions(
          document: gql("""
 query allgroupUserByUserId(\$userId:String!){
   allgroupUserByUserId(userId:\$userId){
   id
  group{
    name 
    id   
    type
  }
  }
}
  """),
          variables: {'userId': userDetails},
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
          final listuser = result.data!['allgroupUserByUserId'];
          // final groupid = result.data!['allgroup']['id'];
          // Provider.of<LoginNotifire>(context, listen: false)
          //     .getGroupuserId(groupid);

          // print('grpppp  $groupid');

          print('gettinggg $listuser');

          // return BackButtonIcon();
          return Padding(
            padding: const EdgeInsets.all(12.0),
            child: Container(
              decoration: BoxDecoration(
                  color: HexColor("#A96BFF"),
                  borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(40.0),
                      topRight: Radius.circular(40.0),
                      bottomLeft: Radius.circular(40.0),
                      bottomRight: Radius.circular(40.0))),
              child: ListView.builder(
                itemCount: listuser.length,
                itemBuilder: (context, index) {
                  final todo = listuser[index];
                  return Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Container(
                      decoration: BoxDecoration(
                          color: HexColor("#ffffff"),
                          borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(10.0),
                              topRight: Radius.circular(10.0),
                              bottomLeft: Radius.circular(10.0),
                              bottomRight: Radius.circular(10.0))),
                      child: ListTile(
                        leading: const CircleAvatar(
                          backgroundImage: AssetImage(
                            "assets/images/group.jpg",
                          ),
                          radius: 22.0,
                        ),
                        // trailing: todo['id'],
                        // key: todo['id'],

                        title: Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: Text(
                            todo['group']['name'],
                            style: TextStyle(
                              fontWeight: FontWeight.w700,
                              color: HexColor("#A96BFF"),
                              fontSize: 23,
                            ),
                          ),
                        ),
                        subtitle: Text(todo['group']['type']),
                        onTap: () {
                          var grupid = todo['group']['id'];
                          var grupname = todo['group']['name'];
                          print('geetinggid $grupid');
                          print('geetingname $grupname');
                          Provider.of<LoginNotifire>(context, listen: false)
                              .getGrupId(grupid);
                          Provider.of<LoginNotifire>(context, listen: false)
                              .gname(grupname);
                          // Navigator.pushNamed(context, Products.routerName);
                          // Navigator.pushNamed(context, ProductList.routerName);
                          // Navigator.pushNamed(
                          //     context,Listing.routerName);
                          Navigator.pushNamed(
                              context, ServiceMainScreen.routerName);
                          // Navigator.pushNamed(context, CategoryListing.routerName);
                          // Navigator.pushNamed(
                          //     context, ServiceProductList.routerName);
                        },
                      ),
                    ),
                  );
                },
              ),
            ),
          );
        });
  }
}
