import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:http/http.dart';
import 'package:new_project/src/Screens/group/deletebtn.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

import '../drawer.dart';

class GroupMembers extends StatefulWidget {
  static const routerName = "/groupmember";
  const GroupMembers({Key? key}) : super(key: key);

  @override
  _GroupMembersState createState() => _GroupMembersState();
}

class _GroupMembersState extends State<GroupMembers> {
  final List<String> gropUe = [];
  List gropUsers = [];
  var gpUser = [];
  var username = '';

  var groupMpaUsersData = [];

  @override
  Widget build(BuildContext context) {
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).name;
    print("gettinguserID: $userDetails");
    var profileuse =
        Provider.of<LoginNotifire>(context, listen: false).profilemember;
    var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("grpidinmemberpage:$groupId");
    print("gettingprofile $profileuse");
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.purple.shade400,
          title: const Text('Group User'),
        ),
        body: Query(
            options: QueryOptions(
              document: gql("""
 query group(\$id:String!){
  group(id:\$id){
    groupusers{
      user{
        username
        id
      }
    }
  }
}
  """),
              variables: {'id': groupId},
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
              // final listuser = result.data!['group']['groupusers'];
              // final groupid = result.data!['allgroup']['id'];
              // Provider.of<LoginNotifire>(context, listen: false)
              //     .getGroupuserId(groupid);
              // print('grpppp  $groupid');

              final List listuser = result.data!['group']['groupusers'];
              var mapListUer = listuser.map((items) => {
                    gpUser.add(items['user']),
                  });
              print(mapListUer);
              print('gpuserrr $gpUser');
              var mapgroupListU = gpUser.map((items) => {
                    groupMpaUsersData.add(items['username']),
                  });
              print(mapgroupListU);
              print('groupudata $groupMpaUsersData');

              print('gettinggg $listuser');

              var guser = groupMpaUsersData.map((val) => {
                    username = val,
                    if (val == userDetails)
                      {gropUe.add("you")}
                    else
                      {gropUe.add(val)},
                  });
              print(gropUe.toSet().toList());

              var ure = gropUe.toSet().toList();

              print('guserrr $guser');
              // return BackButtonIcon();
              return ListView.builder(
                itemCount: ure.length,
                itemBuilder: (context, int index) {
                  // var gu = gropUe.map((gropUe) => gropUe.length);
                  // var gue = (gropUe.map((gu) => gu.toString()));
                  // print(gropUe.take(index).toList());
                  // print(gue.toSet());
                  // print(gropUe[index]);
                  print('guser $guser');

                  return ListTile(
                    leading: const CircleAvatar(
                      backgroundImage: NetworkImage(
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvm23oH1Te7VMVabnGjl2BbwdM_M_iIiwPQ&usqp=CAU'),
                    ),
                    // trailing: todo['id'],
                    // key: todo['id'],

                    title: Text(
                      ure[index],
                      style: const TextStyle(fontWeight: FontWeight.w700),
                    ),
                    // subtitle: Text(todo['type']),
                    onTap: () {
                      // var deleteid = (todo['user']['id']);
                      // print("btnclick $deleteid");
                      // Navigator.pushNamed(context, DeleteBtn.routerName);
                    },
                    // trailing: const Icon(Icons.delete),
                  );
                },
              );
            }),

//       bottomNavigationBar: Mutation(
//         options: MutationOptions(document: gql("""
// mutation deleteGroupUser(\$groupId: String!, \$userId: String!){
//   deleteGroupUser(deleteGroupUser:{
//   groupId: \$groupId
//   userId: \$userId

//   }){
//     id
//   }
// }
// """)),
//         builder: (RunMutation runMutation, QueryResult) {
//           return ElevatedButton(
//               onPressed: () {
//                 runMutation({
//                   'groupId': "650b8bd2-605b-48bb-aadb-d68d241baf04",
//                   'userId': "98f2f199-b3b1-4590-8681-5b2e830f3a8c",
//                 });
//                 print("deletedone");
//               },
//               child: const Text("deleteuser"));
//         },
//       ),
        drawer: const AppDrawer());
  }
}
