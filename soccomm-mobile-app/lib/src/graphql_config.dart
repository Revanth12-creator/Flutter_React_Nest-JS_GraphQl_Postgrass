// import 'package:flutter/material.dart';
// import 'package:graphql_flutter/graphql_flutter.dart';
// import 'package:new_project/src/provider/login_changenotifire.dart';
// import 'package:provider/provider.dart';
// import 'package:shared_preferences/shared_preferences.dart';

// var userToken = "";

// var userId;

// var auth;

// checkPrefsForUser() async {
//   SharedPreferences _prefs = await SharedPreferences.getInstance();
//   var _sharedToken = _prefs.getString('token');
//   var _sharedId = _prefs.getString('userId');
//   print(_sharedId);
//   print(_sharedToken);
//   userId = _sharedId;
//   auth = _sharedToken;
// }

// // useEffect() {
// //   SharedPreferences();
// // }

// class GraphqlConfig extends StatelessWidget {
//   static var routerName = '/graphqlcon';
//   static HttpLink httpLink = HttpLink('http://localhost:5000/graphql');
//   // static HttpLink httpLink = HttpLink('http://10.0.2.2:5000/graphql');

//   static AuthLink authLink = AuthLink(
//     getToken: () =>
//         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNha2UiLCJzdWIiOiIyNWY1ZWFiZC0xOTYwLTQ1MWEtYTgyYi1kYTMwZDI4MTVhYjkiLCJlbWFpbCI6IlNha2VAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzY0NDMxNjMsImV4cCI6MTYzNjQ3OTE2M30.AullnFFdHtvdwctOtwRuSnWW7ObJUrrRe8Uzxb-VC1I',
//   );

//   static Link link = authLink.concat(httpLink);

//   ValueNotifier<GraphQLClient> client = ValueNotifier(
//     GraphQLClient(
//       link: link,
//       cache: GraphQLCache(
//         store: InMemoryStore(),
//       ),
//     ),
//   );
//   GraphQLClient clientToQuery() {
//     return GraphQLClient(
//       cache: GraphQLCache(
//         store: InMemoryStore(),
//       ),
//       link: httpLink,
//     );
//   }

//   GraphqlConfig({Key? key}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     var userToken = Provider.of<LoginNotifire>(context, listen: false).token;
//     print('123423 $userToken');
//     return const Text('Hello');
//   }
// }
