import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/routes.dart';

// import 'sample_feature/sample_item_details_view.dart';
// import 'sample_feature/sample_item_list_view.dart';
import 'settings/settings_controller.dart';
// import 'settings/settings_view.dart';

/// The Widget that configures your application.
class MyApp extends StatelessWidget {
  const MyApp({
    Key? key,
    required this.settingsController,
  }) : super(key: key);

  final SettingsController settingsController;

  @override
  Widget build(BuildContext context) {
    // Glue the SettingsController to the MaterialApp.
    //
    // The AnimatedBuilder Widget listens to the SettingsController for changes.
    // Whenever the user updates their settings, the MaterialApp is rebuilt.
    return AnimatedBuilder(
      animation: settingsController,
      builder: (BuildContext context, Widget? child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          home: AnimatedSplashScreen(
              //  duration: 3000,
              splash: Image.asset('assets/images/logo.png'),
              nextScreen: loginScreen(),
              splashTransition: SplashTransition.fadeTransition,
              backgroundColor: Colors.white),
          routes: routes,
        );
      },
    );
  }
}
