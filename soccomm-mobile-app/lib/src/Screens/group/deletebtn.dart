import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/homepage.dart';

class DeleteBtn extends StatefulWidget {
  static var routerName = '/deletebtn';
  const DeleteBtn({Key? key}) : super(key: key);

  @override
  _DeleteBtnState createState() => _DeleteBtnState();
}

class _DeleteBtnState extends State<DeleteBtn> {
  @override
  Widget build(BuildContext context) {
    return Mutation(
      options: MutationOptions(document: gql("""
mutation deleteGroupUser(\$groupId: String!, \$userId: String!){
  deleteGroupUser(deleteGroupUser:{
  groupId: \$groupId
  userId: \$userId

  }){
    id
  }
}
""")),
      builder: (RunMutation runMutation, QueryResult) {
        runMutation({
          'groupId': "650b8bd2-605b-48bb-aadb-d68d241baf04",
          'userId': "7a879993-759f-4fae-93e4-425013b4d1df",
        });
        print("deletedone");
        Navigator.pushNamed(context, Homepage.routerName);
        throw ("err");
      },
    );
  }
}
