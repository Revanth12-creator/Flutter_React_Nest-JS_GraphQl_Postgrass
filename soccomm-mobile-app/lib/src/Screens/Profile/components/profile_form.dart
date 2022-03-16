import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:new_project/src/Screens/Profile/components/image_upload.dart';
import 'package:new_project/src/Screens/Profile/components/profile_details.dart';
import 'package:new_project/src/Screens/Profile/profile_screen.dart';
import 'package:new_project/src/graphql_config.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';

import '../../drawer.dart';

class ProfileForm extends StatefulWidget {
  static const routerName = '/updateform';

  const ProfileForm({Key? key}) : super(key: key);

  @override
  _ProfileFormState createState() => _ProfileFormState();
}

class _ProfileFormState extends State<ProfileForm> {
  TextEditingController usernameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    var usernameData =
        Provider.of<LoginNotifire>(context, listen: false).updatedName;
    print("usernameData$usernameData");
    var emailDetails =
        Provider.of<LoginNotifire>(context, listen: false).updatedEmai;
    print("emailDetails$emailDetails");

    final usernameController = TextEditingController(text: usernameData);
    final emailController = TextEditingController(text: emailDetails);

    return Scaffold(
        appBar: AppBar(
          title: Text("Edit Profile"),
        ),
        body: Form(
          key: _formKey,
          child: AlertDialog(
            content: Container(
              child: SingleChildScrollView(
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    maxWidth: MediaQuery.of(context).size.width,
                  ),
                  child: Stack(
                    children: <Widget>[
                      Container(
                        height: 110,
                        width: 110,
                        margin: const EdgeInsets.only(left: 60,),
                        child: const ImageUpload(),
                      ),
                      Container(
                        padding: EdgeInsets.only(top: 150.0),
                        child: TextFormField(
                          maxLength: 40,
                          controller: usernameController,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter username';
                            }
                            return null;
                          },
                          decoration: InputDecoration(
                            icon: Icon(Icons.person),
                            labelText: "Username",
                          ),
                        ),
                      ),
                      Divider(
                        height: 250,
                        color: Colors.black,
                      ),
                      Container(
                        padding: EdgeInsets.only(top: 210.0),
                        child: TextFormField(
                          maxLength: 40,
                          controller: emailController,
                          validator: (val) => val!.isEmpty || !val.contains("@")
                              ? "enter a valid eamil"
                              : null,
                          decoration: InputDecoration(
                            icon: Icon(Icons.email),
                            labelText: "Email",
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            actions: <Widget>[
              Mutation(
                options: MutationOptions(
                    document: gql("""
        mutation updateUser(\$id:String!,\$email: String!, \$username:String!){
          updateUser(
            updateUserInput:{
            id:\$id
            email: \$email
            username: \$username
          }
          ){
            __typename
            
          }
        }
        """),
                    onCompleted: (dynamic resultData) {
                      Navigator.pushNamed(context, Profile.routerName);
                    }),
                builder: (runMutation, result) {
                  if (result!.hasException) {
                    return Text(result.exception.toString());
                  }

                  if (result.isLoading) {
                    return Center(
                      child: const CircularProgressIndicator(),
                    );
                  }
                  return ElevatedButton(
                      onPressed: () {
                        print(usernameController.text);
                        print(emailController.text);
                        if (_formKey.currentState!.validate()) {
                          runMutation({
                            'id': userDetails,
                            'email': emailController.text,
                            'username': usernameController.text,
                          });
                        }
                      },
                      child: const Text("Save"));
                },
              ),
            ],
          ),
        ),
         drawer: const AppDrawer());
  }
}
