import 'dart:developer';

import 'package:flutter/widgets.dart';
import 'package:new_project/src/Screens/Listing/category_listing.dart';
import 'package:new_project/src/Screens/Login/login.dart';
// import 'package:new_project/src/Screens/Login/otp.dart';
import 'package:new_project/src/Screens/Login/otpclose.dart';
import 'package:new_project/src/Screens/Login/otpopen.dart';
import 'package:new_project/src/Screens/Login/registration.dart';
import 'package:new_project/src/Screens/Order/mycart.dart';
import 'package:new_project/src/Screens/Posting/listing.dart';
import 'package:new_project/src/Screens/Profile/components/profile_form.dart';
import 'package:new_project/src/Screens/Profile/profile_screen.dart';

import 'package:new_project/src/Screens/Service/Service%20lists/service_list.dart';
import 'package:new_project/src/Screens/Service/service_details.dart';
import 'package:new_project/src/Screens/Service/service_main_screen.dart';
import 'package:new_project/src/Screens/group/Adduser.dart';
import 'package:new_project/src/Screens/group/addmember.dart';
import 'package:new_project/src/Screens/group/contacts-list.dart';
import 'package:new_project/src/Screens/group/creategroup.dart';
import 'package:new_project/src/Screens/group/groupmember.dart';
import 'package:new_project/src/Screens/homepage.dart';

import 'package:new_project/src/graphql_config.dart';
import 'package:universal_html/js.dart';

import 'Screens/Service/Service lists/post_edit.dart';
import 'Screens/Chat/chatscreen.dart';
import 'Screens/Order/orderscreen.dart';
import 'Screens/Service/groupimage/imageupload.dart';
import 'Screens/group/deletebtn.dart';
import 'Screens/products/components/posting/posting_screen.dart';

// We use name route
// All our routes will be available here
final Map<String, WidgetBuilder> routes = {
  ProfileForm.routerName: (context) => ProfileForm(),
  Searchd.routerName: (context) => const Searchd(),
  GroupMembers.routerName: (contex) => const GroupMembers(),
  Profile.routerName: (context) => const Profile(),
  loginScreen.routeName: (context) => loginScreen(),
  registrationScreen.routeName: (context) => registrationScreen(),
  // OtpVerify.routerName: (context) => OtpVerify(),

  OtpClose.routerName: (context) => OtpClose(),
  OtpOpen.routerName: (context) => OtpOpen(),
  Homepage.routerName: (context) => const Homepage(
        value: '',
      ),

  CategoryListing.routerName: (context) => const CategoryListing(),
  // VehiclePosting.routerName:(context) => const VehiclePosting(),
  ServiceProductList.routerName: (context) => ServiceProductList(),

  CreateGroup.routerName: (contex) => CreateGroup(),
  AddMember.routerName: (context) => const AddMember(
        membersList: [],
      ),


  PostigScreen.routerName: (context) => const PostigScreen(),
  PostEdit.routerName: (context) => const PostEdit(),

  // ServiceMainScreen.routerName: (context) => const ServiceMainScreen(),

  serviceDetails.routerName: (context) => const serviceDetails(),
  GroupImage.routerName: (contex) => const GroupImage(),
  ServiceMainScreen.routerName: (context) => const ServiceMainScreen(),
  serviceDetails.routerName: (context) => const serviceDetails(),
  // Listing.routerName:(context) =>  Listing(),
  OrderScreen.routerName:(context) => OrderScreen(),
  ChatScreen.routerName:(context)=>ChatScreen(),
  MyCart.routerName:(context)=>MyCart(),
  CategoryListing.routerName: (context) => CategoryListing(),
};
