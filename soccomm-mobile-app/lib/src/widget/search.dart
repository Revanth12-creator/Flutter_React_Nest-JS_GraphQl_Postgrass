import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/Profile/profile_screen.dart';
import 'package:new_project/src/Screens/group/Adduser.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:new_project/src/widget/grouplist.dart';
import 'package:provider/provider.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  var searchByGroupName = """
 query searchByGroupName{
     searchByGroupName(serach:"fl"){
    name
    id
  }
}
  """;
  // data

  // building the search page widget
  @override
  Widget build(BuildContext context) {
    var filter = myController.text;
    print(filter);

    void onSubmitdata() {}

    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: Colors.purple.shade400,
        title: const Text('Search',
            style: TextStyle(
                fontSize: 27.0,
                fontWeight: FontWeight.bold,
                color: Colors.white)),
      ),
      body: Column(
        children: [
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 15.0, vertical: 10.0),
            color: Colors.grey[700],
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: myController,
                    style: TextStyle(
                      color: Colors.white,
                    ),
                    decoration: InputDecoration(
                        hintText: "Search groups...",
                        hintStyle: TextStyle(
                          color: Colors.white38,
                          fontSize: 16,
                        ),
                        border: InputBorder.none),
                  ),
                ),
                GestureDetector(
                    onTap: () {
                      var filter = myController.text;

                      print(filter);
                      Provider.of<LoginNotifire>(context, listen: false)
                          .filterData(filter);

                      Navigator.pushNamed(context, Searchd.routerName);
                    },
                    child: Container(
                        height: 40,
                        width: 40,
                        decoration: BoxDecoration(
                            color: Colors.blueAccent,
                            borderRadius: BorderRadius.circular(40)),
                        child: Icon(Icons.search, color: Colors.white)))
              ],
            ),
          ),
        ],
      ),
    );
  }
}
