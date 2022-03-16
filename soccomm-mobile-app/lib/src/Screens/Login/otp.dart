import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/homepage.dart';
import 'package:pin_entry_text_field/pin_entry_text_field.dart';

class OtpVerify extends StatefulWidget {
  static const routerName = "/otp";
  @override
  _OtpVerifyState createState() => _OtpVerifyState();
}

class _OtpVerifyState extends State<OtpVerify> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Soccomm'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              const SizedBox(
                height: 28.0,
              ),
              Image.asset('assets/images/logo.png'),
              const SizedBox(
                height: 25.0,
              ),
              const Text(
                'VERIFICATION',
                style: TextStyle(fontSize: 35, fontWeight: FontWeight.bold),
              ),
              const SizedBox(
                height: 25.0,
              ),
              const Text(
                  'Please enter the 4 digit verification code sent to your mobile',
                  style: TextStyle(fontSize: 14)),
              const SizedBox(
                height: 25.0,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: PinEntryTextField(
                  showFieldAsBox: true,
                  onSubmit: (String pin) {
                    showDialog(
                        context: context,
                        builder: (context) {
                          return AlertDialog(
                            title: Text("Pin"),
                            content: Text('Pin entered is $pin'),
                          );
                        }); //end showDialog()
                  }, // end onSubmit
                ), // end PinEntryTextField()
              ), // end Padding()
              const SizedBox(
                height: 28.0,
              ),
              FlatButton(
                child: const Text(
                  'VERIFY',
                  style: TextStyle(fontSize: 20.0),
                ),
                color: Colors.blueAccent,
                textColor: Colors.white,
                onPressed: () {
                  print("Button Clicked");
                  Navigator.pushNamed(context, Homepage.routerName);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
