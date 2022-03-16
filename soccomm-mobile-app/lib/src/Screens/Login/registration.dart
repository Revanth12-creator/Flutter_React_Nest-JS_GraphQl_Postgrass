import 'package:flutter/material.dart';

import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/Screens/homepage.dart';

const createUser = """
mutation createUser(\$email: String!, \$password: String!, \$username: String!){
  createUser(
    createUserInput:{
    email: \$email
    password: \$password
    username: \$username
  }
  ){
    email
    username
    id
  }
}
""";

// mutation{
//   createUser(createUserInput:{
//     email:"mohan2@gmail.com"
//     password:"12345"
//     username:"mohan"
//     role:"user"
//   }){
//     id
//     username

//   }
// }

class registrationScreen extends StatefulWidget {
  static const routeName = "/registrationScreen";

  @override
  _registrationScreenState createState() => _registrationScreenState();
}

class _registrationScreenState extends State<registrationScreen> {
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  TextEditingController _usernameController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Colors.white,
        // appBar: AppBar(
        //   title: const Text('Soccomm'),
        // ),
        body: SingleChildScrollView(
          child: Form(
              key: _formKey,
              child: Column(
                children: <Widget>[
                  // Image.asset(
                  //   'assets/images/logo_image.png',
                  //   height: 320,
                  // ),
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
                  // const Text(
                  //   'Welcome to SocommApp',
                  //   style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                  // ),
                  Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Container(
                      height: 485.0,
                      decoration: BoxDecoration(
                          color: HexColor("#A96BFF"),
                          borderRadius: const BorderRadius.only(
                              topLeft: Radius.circular(40.0),
                              topRight: Radius.circular(40.0),
                              bottomLeft: Radius.circular(40.0),
                              bottomRight: Radius.circular(40.0))),
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Column(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(12),
                              child: TextFormField(
                                keyboardType: TextInputType.emailAddress,
                                controller: _emailController,
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
                                          color: Colors.white, width: 3.0)),
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
                                controller: _passwordController,
                                validator: (value) {
                                  if (value!.isEmpty) {
                                    return ("Please enter a password");
                                  } 
                                  // else if (value.length <= 5) {
                                  //   return ("Password must be greater than 5 letters");
                                  // }
                                  // else if (value.length > 5) {
                                  //   return ("Password must be less than 5 letters");
                                  // }
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
                            Padding(
                              padding: const EdgeInsets.all(12),
                              child: TextFormField(
                                // obscureText: true,
                                keyboardType: TextInputType.text,
                                controller: _usernameController,

                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter username';
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
                                    labelText: 'Username',
                                    labelStyle: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                    hintText: 'Enter Username',
                                    suffixIcon: Icon(Icons.person)),
                              ),
                            ),
                            Mutation(
                              options: MutationOptions(
                                document: gql(createUser),
                              ),
                              builder: (runMutation, result) {
                                return ElevatedButton(
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
                                          'email': _emailController.text,
                                          'password': _passwordController.text,
                                          'username': _usernameController.text,
                                        });
                                        // If the form is valid, display a snackbar. In the real world,
                                        // you'd often call a server or save the information in a database.
                                        ScaffoldMessenger.of(context)
                                            .showSnackBar(
                                          const SnackBar(backgroundColor:Color(0xFF7E57C2),
                                            content:
                                                Text('Registration Success', style:TextStyle(fontSize: 16, fontWeight:FontWeight.bold)),
                                          ),
                                        );
                                        print(_usernameController.text);
                                        print(_emailController.text);
                                        print(_passwordController.text);
                                        print(_usernameController.text);

                                        Navigator.pushNamed(
                                            context, loginScreen.routeName);
                                      }
                                    },
                                    child: const Text("SignUp",
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                        )));
                              },
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            const Text(
                              'Already have an account?',
                              style:
                                  TextStyle(color: Colors.white, fontSize: 16),
                            ),
                            FlatButton(
                              onPressed: () {
                                Navigator.pushNamed(
                                    context, loginScreen.routeName);
                              },
                              child: const Text(
                                'Sign in',
                                style: TextStyle(
                                    color: Colors.white, fontSize: 18),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),

                  // Padding(
                  //   padding: const EdgeInsets.all(15),
                  //   child: TextFormField(
                  //     // obscureText: true,
                  //     keyboardType: TextInputType.text,
                  //     controller: _roleController,
                  //     textInputAction: TextInputAction.done,
                  //     validator: (value) {
                  //       if (value == null || value.isEmpty) {
                  //         return 'Please enter role';
                  //       }
                  //       return null;
                  //     },
                  //     decoration: const InputDecoration(
                  //         border: OutlineInputBorder(),
                  //         labelText: 'Role',
                  //         hintText: 'Enter Role',
                  //         suffixIcon: Icon(Icons.work_rounded)),
                  //   ),
                  // ),
                ],
              )),
        ));
  }
}

// import 'package:flutter/material.dart';

// import 'package:graphql_flutter/graphql_flutter.dart';
// import 'package:new_project/src/Screens/Login/login.dart';
// import 'package:new_project/src/Screens/homepage.dart';

// const createUser = """
// mutation createUser(\$email: String!, \$password: String!, \$username: String!, \$role: String!, ){
//   createUser(
//     createUserInput:{
//     email: \$email
//     password: \$password
//     username: \$username
//     role: \$role
//   }
//   ){
//     email
//     username
//     id
//   }
// }
// """;

// // mutation{
// //   createUser(createUserInput:{
// //     email:"mohan2@gmail.com"
// //     password:"12345"
// //     username:"mohan"
// //     role:"user"
// //   }){
// //     id
// //     username

// //   }
// // }

// class registrationScreen extends StatefulWidget {
//   static const routeName = "/registrationScreen";

//   @override
//   _registrationScreenState createState() => _registrationScreenState();
// }

// class _registrationScreenState extends State<registrationScreen> {
//   // final _formKey = GlobalKey<FormState>();

//   // String? validatePassword(String value) {
//   //   if (value.isEmpty) {
//   //     return "* Required";
//   //   } else if (value.length < 6) {
//   //     return "Password should be atleast 6 characters";
//   //   } else if (value.length > 15) {
//   //     return "Password should not be greater than 15 characters";
//   //   } else
//   //     return null;
//   // }

//   TextEditingController _emailController = TextEditingController();
//   TextEditingController _passwordController = TextEditingController();
//   TextEditingController _usernameController = TextEditingController();
//   TextEditingController _roleController = TextEditingController();
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//         resizeToAvoidBottomInset: false,
//         appBar: AppBar(
//           title: const Text('Soccomm'),
//         ),
//         body: SingleChildScrollView(
//           child: Padding(
//               padding: const EdgeInsets.all(15),
//               child: Column(
//                 children: <Widget>[
//                   Image.asset(
//                     'assets/images/logo.png',
//                     height: 150,
//                   ),
//                   SizedBox(
//                     height: 20,
//                   ),
//                   Text(
//                     'Create account',
//                     style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
//                   ),
//                   Padding(
//                     padding: const EdgeInsets.all(15),
//                     child: TextFormField(
//                       keyboardType: TextInputType.emailAddress,
//                       controller: _emailController,
//                       textInputAction: TextInputAction.next,
//                       // validator: (text) {
//                       //   if (text == null || text.isEmpty) {
//                       //     Text('Text is empty');
//                       //   }
//                       //   return null;
//                       // },

//                       decoration: const InputDecoration(
//                           border: OutlineInputBorder(),
//                           labelText: 'Email',
//                           hintText: 'Enter Email',
//                           suffixIcon: Icon(Icons.email_rounded)),
//                     ),
//                   ),
//                   Padding(
//                     padding: const EdgeInsets.all(15),
//                     child: TextFormField(
//                       obscureText: true,
//                       keyboardType: TextInputType.text,
//                       controller: _passwordController,
//                       textInputAction: TextInputAction.next,
//                       // validator: (text) {
//                       //   if (text == null || text.isEmpty) {
//                       //     Text('Text is empty');
//                       //   }
//                       //   return null;
//                       // },
//                       decoration: const InputDecoration(
//                           border: OutlineInputBorder(),
//                           labelText: 'Password',
//                           hintText: 'Enter Password',
//                           suffixIcon: Icon(Icons.password_rounded)),
//                     ),
//                   ),
//                   Padding(
//                     padding: const EdgeInsets.all(15),
//                     child: TextFormField(
//                       // obscureText: true,
//                       keyboardType: TextInputType.text,
//                       controller: _usernameController,
//                       textInputAction: TextInputAction.next,
//                       // validator: (text) {
//                       //   if (text == null || text.isEmpty) {
//                       //     Text('Text is empty');
//                       //   }
//                       //   return null;
//                       // },
//                       decoration: const InputDecoration(
//                           border: OutlineInputBorder(),
//                           labelText: 'Username',
//                           hintText: 'Enter Username',
//                           suffixIcon: Icon(Icons.person)),
//                     ),
//                   ),
//                   Padding(
//                     padding: const EdgeInsets.all(15),
//                     child: TextFormField(
//                       // obscureText: true,
//                       keyboardType: TextInputType.text,
//                       controller: _roleController,
//                       textInputAction: TextInputAction.done,
//                       // validator: (text) {
//                       //   if (text == null || text.isEmpty) {
//                       //     Text('Text is empty');
//                       //   }
//                       //   return null;
//                       // },
//                       decoration: const InputDecoration(
//                           border: OutlineInputBorder(),
//                           labelText: 'Role',
//                           hintText: 'Enter Role',
//                           suffixIcon: Icon(Icons.work_rounded)),
//                     ),
//                   ),
//                   // FlatButton(
//                   //   onPressed: () {
//                   //     //TODO FORGOT PASSWORD SCREEN GOES HERE
//                   //   },
//                   //   child: const Text(
//                   //     'Forgot Password?',
//                   //     style: TextStyle(color: Colors.blue, fontSize: 15),
//                   //   ),
//                   // ),
//                   Mutation(
//                     options: MutationOptions(
//                       document: gql(createUser),
//                     ),
//                     builder: (runMutation, result) {
//                       return ElevatedButton(
//                           onPressed: () {
//                             print(_usernameController.text);
//                             print(_emailController.text);
//                             print(_passwordController.text);
//                             runMutation({
//                               'email': _emailController.text,
//                               'password': _passwordController.text,
//                               'username': _usernameController.text,
//                               'role': _roleController.text,
//                             });
//                             // if (_formKey.currentState!.validate()) {
//                             //   // Navigator.pushNamed(context, Homepage.routerName);
//                             //   print('text not be null');
//                             // }
//                             Navigator.pushNamed(context, loginScreen.routeName);
//                           },
//                           child: const Text("SignUp"));
//                     },
//                   ),
//                   const SizedBox(
//                     height: 10,
//                   ),
//                   const Text('Already have an account?'),
//                   FlatButton(
//                     onPressed: () {
//                       Navigator.pushNamed(context, loginScreen.routeName);
//                     },
//                     child: const Text(
//                       'Sing in',
//                       style: TextStyle(color: Colors.blue, fontSize: 15),
//                     ),
//                   ),
//                 ],
//               )),
//         ));
//   }
// }
