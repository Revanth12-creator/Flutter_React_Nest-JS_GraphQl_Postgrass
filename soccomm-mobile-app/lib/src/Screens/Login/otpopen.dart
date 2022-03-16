import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/Login/otp.dart';
import 'package:new_project/src/Screens/Login/otpclose.dart';
import 'package:new_project/src/Screens/Login/restapi.dart';
import 'package:url_launcher/url_launcher.dart';

class OtpOpen extends StatefulWidget {
  static const routerName = "/otpopen";

  @override
  _OtpOpenState createState() => _OtpOpenState();
}

class _OtpOpenState extends State<OtpOpen> {
  final _text = TextEditingController();
 
  bool _validate = false;
  TextEditingController phoneController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  late String otp;
  String text = "";


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: Text('Soccomm'),
      ),
      body: Form(
        key: _formKey,
        child: Column(
          children: <Widget>[
            Image.asset(
              'assets/images/logo.png',
              height: 250,
            ),
            const SizedBox(
              height: 20,
            ),
            const Text(
              'OTP',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
            ),
       
            TextFormField(
                          keyboardType: TextInputType.emailAddress,
                          controller: phoneController,
                          textInputAction: TextInputAction.next,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter mobile number';
                            }
                            return null;
                          },
                          decoration: const InputDecoration(
                             
                              border: OutlineInputBorder(),
                            
                              labelText: 'Mobile Number +91',
                              hintText: 'Enter Mobile Number',
                              suffixIcon: Icon(Icons.phone)),
                        ),
            const SizedBox(
              height: 8,
            ),
         
            ElevatedButton(
             
              child: Text('Verify'),
              onPressed: () async {
                if(_formKey.currentState!.validate()){
                var otp;
                otp = ApiService.addOtp(phoneController.text);
                print(phoneController.text);
                print(otp);
                await 
                // Navigator.pushNamed(context, OtpClose.routerName);
                Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => OtpClose(),
                  // Pass the arguments as part of the RouteSettings. The
                  // DetailScreen reads the arguments from these settings.
                  settings: RouteSettings(
                    arguments: phoneController.text,
                  ),
                ),
              );
                }
                
              },
            ),
            const SizedBox(
              height: 90,
            ),
            Text(text),
          ],
        ),
      ),
    );
  }
}
