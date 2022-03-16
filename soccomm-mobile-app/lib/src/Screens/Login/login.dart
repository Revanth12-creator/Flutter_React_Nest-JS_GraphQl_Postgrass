import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/Login/otpopen.dart';
import 'package:new_project/src/Screens/Login/registration.dart';
import 'package:new_project/src/Screens/homepage.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:hexcolor/hexcolor.dart';

const login = """
mutation login(\$email: String!, \$password: String!){
  login(
    login:{
    email: \$email
    password: \$password
  }
  ){
    token
    userId
    username
    email
  }
}
""";

Future upDateSharedPreferences(String token, String userId) async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  await _prefs.setString('token', token);
  await _prefs.setString('userId', userId);

//   SharedPreferences _prefs = await SharedPreferences.getInstance();
  var _sharedToken = _prefs.getString('token');
  var _sharedId = _prefs.getString('userId');
  print(_sharedId);
  print(_sharedToken);
}

checkPrefsForUser() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  var _sharedToken = _prefs.getString('token');
  var _sharedId = _prefs.getString('userId');
  print(_sharedId);
  print(_sharedToken);
  userId = _sharedId;
  auth = _sharedToken;
}

var userId;
var auth;

class loginScreen extends StatefulWidget {
  static const routeName = "/loginScreen";

  @override
  _loginScreenState createState() => _loginScreenState();
}

class _loginScreenState extends State<loginScreen> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  var erroMessages = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      // appBar: AppBar(
      //   backgroundColor: Colors.white,
      //   // title: const Text('Soccomm'),
      // ),
      body: WillPopScope(
        onWillPop: () async => false,
        child: Mutation(
          // ignore: deprecated_member_use
          options: MutationOptions(
            document: gql(login),
            onCompleted: (dynamic resultData) {
              var response = resultData?['login'];
              var userId = resultData?['login']['userId'];
              var token = resultData?['login']['token'];
              var username = resultData?['login']['username'];
              var email = resultData?['login']['email'];
              print("responnse$response");
              print(userId);
              print(token);
              print("username$username");
              print("email$email");
              Provider.of<LoginNotifire>(context, listen: false)
                  .updateUserId(userId);
              Provider.of<LoginNotifire>(context, listen: false)
                  .getToken(token);
              Provider.of<LoginNotifire>(context, listen: false)
                  .getNam(username);
              Provider.of<LoginNotifire>(context, listen: false)
                  .getEmail(email);

              upDateSharedPreferences(token, userId);
              checkPrefsForUser();
              print(resultData?['login']['token']);
              Navigator.pushNamed(context, Homepage.routerName);
            },
          ),
          builder: (runMutation, result) {
            try {
              print("result${result!.exception!.graphqlErrors[0].message}");
               erroMessages = result.exception!.graphqlErrors[0].message;
              print("erroMessages$erroMessages");
            } catch (err) {
              print("err${err}");
            }

            if (result!.hasException) {
              return Text(result.exception.toString());
            }

            if (result.isLoading) {
              return Center(
                child: const CircularProgressIndicator(),
              );
            }
            // return Material(
            //     child: Column(
            //   children: [
            //     Image.asset(
            //       'assets/images/logo_image.png',
            //       // height: 250,
            //       fit: BoxFit.cover,
            //     ),
            //     Container(
            //       decoration: BoxDecoration(
            //         color:Colors.deepPurple
            //       ),
            //       child: Column(

            //       ),
            //     )
            //   ],
            // ),
            // );

            return SingleChildScrollView(
              child: Form(
                  // padding: const EdgeInsets.all(15),
                  key: _formKey,
                  child: Column(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.all(30.0),
                        child: Image.asset(
                          'assets/images/logo_image.png',
                          height: 210,
                          fit: BoxFit.cover,
                        ),
                      ),
                      const SizedBox(
                        height: 7,
                      ),
                      Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Container(
                            height: 445.0,
                            decoration: BoxDecoration(
                                color: HexColor("#A96BFF"),
                                borderRadius: const BorderRadius.only(
                                    topLeft: Radius.circular(40.0),
                                    topRight: Radius.circular(40.0),
                                    bottomLeft: Radius.circular(40.0),
                                    bottomRight: Radius.circular(40.0))),
                            child: Column(
                              children: [
                                const Padding(
                                  padding: EdgeInsets.all(14.0),
                                  child: Text(
                                    'Welcome To SocommApp',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 25,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(12),
                                  child: TextFormField(
                                    keyboardType: TextInputType.emailAddress,
                                    controller: emailController,
                                    textInputAction: TextInputAction.next,
                                    validator: (value) {
                                      if (value == null || value.isEmpty) {
                                        return 'Please enter email';
                                      }
                                      if (!RegExp(
                                              "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]")
                                          .hasMatch(value)) {
                                        return 'Please a valid Email';
                                      } 
                                      return null;
                                    },
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w500,
                                    ),
                                    decoration: const InputDecoration(
                                      border: OutlineInputBorder(),
                                      enabledBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                              color: Colors.white, width: 2.0)),
                                      labelText: 'Email',
                                      labelStyle: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      hintText: 'Enter Email',
                                      suffixIcon: Icon(
                                        Icons.email,
                                        color: Colors.white,
                                      ),
                                      errorStyle: TextStyle(
                                        color: Colors.white,
                                        fontSize: 16,
                                      ),
                                      errorBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                        color: Colors.white,
                                      )),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(12),
                                  child: TextFormField(
                                    obscureText: true,
                                    keyboardType: TextInputType.text,
                                    controller: passwordController,
                                    validator: (value) {
                                      if (value!.isEmpty) {
                                        return ("Please enter a password");
                                      }
                                    },
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w500,
                                    ),
                                    decoration: const InputDecoration(
                                        
                                        border: OutlineInputBorder(),
                                        enabledBorder: OutlineInputBorder(
                                            borderSide: BorderSide(
                                                color: Colors.white,
                                                width: 2.0)),
                                        errorBorder: OutlineInputBorder(
                                            borderSide: BorderSide(
                                          color: Colors.white,
                                        )),
                                        labelText: 'Password',
                                        labelStyle: TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        hintText: 'Enter Password',
                                        suffixIcon: Icon(
                                          Icons.password,
                                          color: Colors.white,
                                        ),
                                        errorStyle: TextStyle(
                                            color: Colors.white, fontSize: 16)),
                                  ),
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    primary: Colors.white,
                                    padding: const EdgeInsets.only(
                                        top: 15,
                                        bottom: 15,
                                        left: 60,
                                        right: 60),
                                  ),
                                  onPressed: () {
                                    if (_formKey.currentState!.validate()) {
                                      runMutation({
                                        'email': emailController.text,
                                        'password': passwordController.text,
                                      });
                                    }
                                  },
                                  child: const Text("Log In",
                                      style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                      )),
                                ),
                                const SizedBox(
                                  height: 20,
                                ),
                                const Text(
                                  'New User?',
                                  style: TextStyle(
                                    color: Colors.white70,
                                    fontSize: 18,
                                  ),
                                ),
                                FlatButton(
                                  onPressed: () {
                                    Navigator.pushNamed(
                                        context, registrationScreen.routeName);
                                  },
                                  child: const Text(
                                    'Create account',
                                    style: TextStyle(
                                        color: Colors.white, fontSize: 20),
                                  ),
                                ),
                                // FlatButton(
                                //     onPressed: () {
                                //       Navigator.pushNamed(
                                //           context, OtpOpen.routerName);
                                //     },
                                //     child: const Text(
                                //       'Login with OTP',
                                //       style: TextStyle(
                                //           color: Colors.blue, fontSize: 15),
                                //     )
                                //   )
                              ],
                            )),
                      ),
                    ],
                  )),
            );
          },
        ),
      ),
    );
  }
}
