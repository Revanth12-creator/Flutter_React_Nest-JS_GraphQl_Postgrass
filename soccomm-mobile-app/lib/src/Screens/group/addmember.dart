import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/main.dart';
import 'package:new_project/src/Screens/homepage.dart';
import 'package:new_project/src/graphql_config.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

var userId;
var auth;

checkPrefsForUser() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  var sharedToken = _prefs.getString('token');
  var sharedId = _prefs.getString('userId');
  userId = sharedId;
  auth = sharedToken;
}

class AddMember extends StatefulWidget {
  static var routerName = '/addmember';
  final List<Map<String, dynamic>> membersList;
  const AddMember({required this.membersList, Key? key}) : super(key: key);

  @override
  State<AddMember> createState() => _AddMemberState();
}

class _AddMemberState extends State<AddMember> {
  TextEditingController name = TextEditingController();
  TextEditingController type = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  MyApp configuration = MyApp();
  String? dropdownValue = 'Public';
  bool isLoading = false;
  var dropdownValues = ['Public', "Private"];
  var _selectedValue;

  var tarr = [];
  @override
  void initState() {
    super.initState();
    checkPrefsForUser();
  }

  var _locations = ['Public', 'Private']; // Option 1
  String _selectedLocation = 'Please choose a Type'; // Option 1
  @override
  Widget build(BuildContext context) {
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("gettinguserID: $userDetails");
    var phonenumber = Provider.of<LoginNotifire>(context, listen: false).phone;
    print("gettig phone:$phonenumber");

    // phonenumber.forEach((x) => (x));

    for (var i = 0; i < phonenumber.length; i++) {
      // print(phonenumber[i]);
      var arr = phonenumber[i].toString();
      print('qqqq $arr');
    }
    var userToken = Provider.of<LoginNotifire>(context, listen: false).token;
    print('123423 $userToken');

    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.purple.shade400,
          title: const Text("Create Group"),
        ),
        body: Center(
          child: Container(
            height: 300.0,
            decoration: BoxDecoration(
                color: HexColor("#A96BFF"),
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(30.0),
                    topRight: Radius.circular(30.0),
                    bottomLeft: Radius.circular(30.0),
                    bottomRight: Radius.circular(30.0))),
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  Form(
                    key: _formKey,
                    child: Container(
                      child: SingleChildScrollView(
                        child: ConstrainedBox(
                          constraints: BoxConstraints(
                            maxWidth: MediaQuery.of(context).size.width,
                          ),
                          child: Stack(
                            children: <Widget>[
                              for (var i = 0; i < phonenumber.length; i++)
                                Query(
                                    options: QueryOptions(
                                      document: gql("""
                             query phonenumber(\$phone:String!){
                               phonenumber(phone:\$phone){
                               userId
                              }
                            }
                              """),
                                      variables: {'phone': phonenumber[i]},
                                    ),
                                    builder: (QueryResult result,
                                        {fetchMore, refetch}) {
                                      if (result.hasException) {
                                        return Text(
                                            result.exception.toString());
                                      }
                                      if (result.isLoading) {
                                        return const Center(
                                          child: CircularProgressIndicator(),
                                        );
                                      }
                                      final listuser =
                                          result.data!['phonenumber'];

                                      final coid = (result.data!['phonenumber']
                                          ['userId']);
                                      tarr.add(result.data!['phonenumber']
                                          ['userId']);
                                      var tmpArr = tarr.toSet();

                                      print(listuser);
                                      print(tarr.toSet().toList());

                                      Provider.of<LoginNotifire>(context,
                                              listen: false)
                                          .phonecontactId(
                                              tarr.toSet().toList());
                                      const Divider(
                                        height: 190,
                                      );
                                      return Container(
                                          padding: const EdgeInsets.all(12),
                                          child: TextField(
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.w500,
                                            ),
                                            maxLength: 40,
                                            controller: name,
                                            decoration: const InputDecoration(
                                                suffixIcon: Icon(
                                                  Icons.person,
                                                  color: Colors.white,
                                                ),
                                                labelText: "name",
                                                labelStyle: TextStyle(
                                                  color: Colors.white,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                                errorStyle: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 16,
                                                ),
                                                errorBorder: OutlineInputBorder(
                                                    borderSide: BorderSide(
                                                  color: Colors.white,
                                                )),
                                                border: OutlineInputBorder(),
                                                enabledBorder:
                                                    OutlineInputBorder(
                                                        borderSide: BorderSide(
                                                            color: Colors.white,
                                                            width: 3.0))),
                                          ));
                                    }),
                              const Divider(
                                height: 190,
                              ),
                              Center(
                                child: Container(
                                  padding: EdgeInsets.only(top: 90.0),
                                  child: DropdownButton<String>(
                                    iconEnabledColor: Colors.white,

                                    borderRadius:
                                        BorderRadius.all(Radius.circular(5.0)),
                                    value: _selectedValue,
                                    iconSize: 30,

                                    // icon: (null),

                                    hint: const Center(
                                        child: Text('Select Type',
                                            style: TextStyle(
                                                color: Colors.white,
                                                fontWeight: FontWeight.bold,
                                                fontSize: 30,
                                                letterSpacing: 10))),

                                    icon: Icon(Icons.arrow_drop_down_circle),

                                    onChanged: (newValue) {
                                      setState(() {
                                        _selectedValue = newValue!;
                                      });
                                      print("_selectedValue$_selectedValue");
                                    },
                                    items: dropdownValues.toSet().map((item) {
                                          return new DropdownMenuItem(
                                            child: new Text(item.toString()),
                                            value: item.toString(),
                                          );
                                        })?.toList() ??
                                        [],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Mutation(
                    options: MutationOptions(
                        document: gql("""
            mutation createGroup(\$name: String!, \$type: String! , \$createruserId:String!){
              createGroup(createGroupInput:{
              name: \$name
              type: \$type
              createruserId: \$createruserId
              }){
                name
              }
            }
            """),
                        onCompleted: (dynamic resultData) {
                          Navigator.pushNamed(context, Homepage.routerName);
                        }),
                    builder: (runMutation, result) {
                      if (result!.hasException) {
                        return Text(result.exception.toString());
                      }

                      if (result.isLoading) {
                        return const Center(
                          child: CircularProgressIndicator(),
                        );
                      }
                      return ElevatedButton(
                        child: const Text("Create",
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            )),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            runMutation({
                              'name': name.text,
                              'type': _selectedValue,
                              'createruserId': userDetails,
                            });
                          }
                        },
                        style: ElevatedButton.styleFrom(
                          primary: Colors.white,
                          padding: const EdgeInsets.only(
                              top: 15, bottom: 15, left: 60, right: 60),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ));
  }
}
