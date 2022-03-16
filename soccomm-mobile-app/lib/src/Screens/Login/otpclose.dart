import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/Login/registration.dart';
import 'package:new_project/src/Screens/Login/restapi.dart';
import 'package:new_project/src/Screens/homepage.dart';

class OtpClose extends StatefulWidget {
  static const routerName = "/otpclose";

  @override
  _OtpCloseState createState() => _OtpCloseState();
}

class _OtpCloseState extends State<OtpClose> {
  late String otp;
  Future<Album>? _otpverify;
  final _formKey = GlobalKey<FormState>();
  TextEditingController verifyController = TextEditingController();

  String text = "";

  void _setText() {
    setState(() {
      text = otp;
    });
  }

  @override
  Widget build(BuildContext context) {
    final verifynumber = ModalRoute.of(context)!.settings.arguments;
    print(verifynumber);

    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: Text('Soccomm'),
      ),
      body: Form(
        key: _formKey,
        child: Column(
          children: [
            Image.asset(
              'assets/images/logo.png',
              height: 250,
            ),
            const SizedBox(
              height: 20,
            ),
            const Text(
              'VERIFY',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
            ),
            TextFormField(
              keyboardType: TextInputType.emailAddress,
              controller: verifyController,
              textInputAction: TextInputAction.next,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter the verification code';
                }
                return null;
              },
              decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Verification Code',
                  hintText: 'Enter the verification code',
                  suffixIcon: Icon(Icons.verified)),
            ),
            const SizedBox(
              height: 8,
            ),
            ElevatedButton(
                child: Text('Submit'),
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    // var otpverify;
                    setState(() {
                      _otpverify = ApiService.verifyOtp(
                          verifynumber, verifyController.text);
                    });
                    (_otpverify == null)
                        ? Text("otpverify")
                        : buildFutureBuilder();

                    // if (otpverify == 201) {
                    //   print(otpverify.body);
                    // } else {
                    //   print("api called failed");
                    // }

                    print(verifyController.text);
                    print("Login successfull");
                    // await Navigator.pushNamed(context, Homepage.routerName);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('otp verified Success'),
                      ),
                    );
                  }
                }),
            Container(
              child: (_otpverify == null)
                  ? Text("otpverify")
                  : buildFutureBuilder(),
            ),
            Container(
              child: (_otpverify == null) ? Text("otpverify") : Text("Done"),
            )
          ],
        ),
      ),
    );
  }

  FutureBuilder<Album> buildFutureBuilder() {
    return FutureBuilder<Album>(
      future: _otpverify,
      builder: (context, snapshot) {
        print("start");
        if (snapshot.hasData) {
          print("middle");
          print(snapshot.data!.token);

          return Text(snapshot.data!.token);
        } else if (snapshot.hasError) {
          return Text('${snapshot.error}');
        }
        print("End");
        return const CircularProgressIndicator();
      },
    );
  }
}
