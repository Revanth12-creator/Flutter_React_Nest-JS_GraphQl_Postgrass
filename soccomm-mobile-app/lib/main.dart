// @dart=2.9

import 'package:flutter/material.dart';
import 'package:new_project/src/graphql_config.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'src/app.dart';
import 'src/settings/settings_controller.dart';
import 'src/settings/settings_service.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/routes.dart';
import 'package:splashscreen/splashscreen.dart';

// import 'sample_feature/sample_item_details_view.dart';
// import 'sample_feature/sample_item_list_view.dart';
// import 'settings/settings_controller.dart';

Future upDateSharedPreferences(String token, String userId) async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  await _prefs.setString('token', token);
  await _prefs.setString('userId', userId);

//   SharedPreferences _prefs = await SharedPreferences.getInstance();
  var _sharedToken = _prefs.getString('token');
  var _sharedId = _prefs.getString('userId');
  // print(_sharedId);
  // print(_sharedToken);
}

checkPrefsForUser() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  var _sharedToken = _prefs.getString('token');
  var _sharedId = _prefs.getString('userId');
  // print(_sharedId);
  // print(_sharedToken);
  userId = _sharedId;
  auth = _sharedToken;
}

var userId;
var auth;

void main() async {
  void initState() {
    checkPrefsForUser();
  }

  // Set up the SettingsController, which will glue user settings to multiple
  // Flutter Widgets.
  final settingsController = SettingsController(SettingsService());

  // Load the user's preferred theme while the splash screen is displayed.
  // This prevents a sudden theme change when the app is first displayed.
  await settingsController.loadSettings();

  // Run the app and pass in the SettingsController. The app listens to the
  // SettingsController for changes, then passes it further down to the
  // SettingsView.
  // final HttpLink httpLink = HttpLink(
  //   'http://localhost:5000/graphql',
  // );
  final HttpLink httpLink = HttpLink('http://10.0.2.2:5000/graphql');

  final AuthLink authLink = AuthLink(
    getToken: () async => 'Bearer $auth',
    // OR
    // getToken: () => 'Bearer <YOUR_PERSONAL_ACCESS_TOKEN>',
  );

  final Link link = authLink.concat(httpLink);
  ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      link: link,
      cache: GraphQLCache(store: InMemoryStore()),
      // The default store is the InMemoryStore, which does NOT persist to disk
    ),
  );
  var app = GraphQLProvider(
    client: client,
    child: MyApp(),
  );
  // var app = GraphQLProvider(
  //   client: GraphqlConfig().client,
  //   child: MyApp(
  //     settingsController: settingsController,
  //   ),
  // );

  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider.value(value: LoginNotifire()),
    ],
    child: app,
  ));
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // const MyApp({
  //   Key? key,

  // }) : super(key: key);

  // final SettingsController settingsController;
  void initState() {
    // upDateSharedPreferences(token, userId);
    checkPrefsForUser();
  }

  @override
  Widget build(BuildContext context) {
    // Glue the SettingsController to the MaterialApp.
    //
    // The AnimatedBuilder Widget listens to the SettingsController for changes.
    // Whenever the user updates their settings, the MaterialApp is rebuilt.
    // return AnimatedBuilder(
    //   // animation: settingsController,
    //   builder: (BuildContext context, Widget child) {
    //     return MaterialApp(
    //       debugShowCheckedModeBanner: false,
    //       home: loginScreen(),
    //           //  duration: 3000,
    //           // splash: Image.asset('assets/images/logo.png'),
    //           // nextScreen: loginScreen(),
    //           // splashTransition: SplashTransition.fadeTransition,
    //           // backgroundColor: Colors.white),
    //       routes: routes,
    //     );
    //   },
    // );
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      // home: loginScreen(),
      home: SplashScreen(
        seconds: 15,
        navigateAfterSeconds: loginScreen(),
        title: new Text(
          'soccomm',
          style: new TextStyle(
              height: 2,
              fontWeight: FontWeight.bold,
              fontSize: 30.0,
              color: Colors.white),
        ),
        image: new Image.asset('assets/images/logo_image.png'),
        photoSize: 150.0,
        backgroundColor: Colors.blue,
        styleTextUnderTheLoader: new TextStyle(),
        loadingText: Text("Loading",
            style: new TextStyle(fontWeight: FontWeight.bold, fontSize: 15.0)),
        loaderColor: Colors.white,
      ),
      //  AnimatedSplashScreen(
      //     //  duration: 3000,
      //     splash: Image.asset(
      //       'assets/images/logo_image.png',
      //       height: 1900,
      //       width: 1000,
      //     ),

      //     nextScreen: loginScreen(),
      //     splashTransition: SplashTransition.fadeTransition,
      //     backgroundColor: Colors.white),
      routes: routes,
    );
  }
}
