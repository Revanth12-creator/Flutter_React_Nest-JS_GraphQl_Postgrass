import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/Service/service_main_screen.dart';
import 'package:new_project/src/Screens/homepage.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

class Searchd extends StatefulWidget {
  static const routerName = "/searchd";
  const Searchd({Key? key}) : super(key: key);

  @override
  _SearchdState createState() => _SearchdState();
}

class _SearchdState extends State<Searchd> {
  @override
  Widget build(BuildContext context) {
    var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("grpid:$groupId");
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("join:$userDetails");
    var filterdata = Provider.of<LoginNotifire>(context, listen: false).filter;
    print("ff:$filterdata");
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade400,
        title: const Text('soccomm'),
      ),
      body: Query(
          options: QueryOptions(
            document: gql("""
     query searchByGroupName(\$filters:String!){
       searchByGroupName(serach:\$filters){
      name
      id
      }
    }
      """),
            variables: {'filters': filterdata},
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
            final listuser = result.data!['searchByGroupName'];
            // final groupid = result.data!['allgroup']['id'];
            // Provider.of<LoginNotifire>(context, listen: false)
            //     .getGroupuserId(groupid);

            // print('grpppp  $groupid');

            print('gettinggg $listuser');

            return ListView.builder(
              itemCount: listuser.length,
              itemBuilder: (context, index) {
                final todo = listuser[index];
                return ListTile(
                  leading: const CircleAvatar(
                    backgroundImage: AssetImage(
                      "assets/images/bike.jpg",
                    ),
                  ),

                  title: Text(
                    todo['name'],
                    style: TextStyle(fontWeight: FontWeight.w700),
                  ),
                  // subtitle: Text(todo['type']),

                  onTap: () {
                    var grupid = todo['id'];
                    var grupname = todo['name'];
                    print('geetinggid $grupid');
                    Provider.of<LoginNotifire>(context, listen: false)
                        .gname(grupname);
                    Provider.of<LoginNotifire>(context, listen: false)
                        .getGrupId(grupid);
                    Navigator.pushNamed(context, ServiceMainScreen.routerName);
                  },
                );
              },
            );
          }),
    );
  }
}
