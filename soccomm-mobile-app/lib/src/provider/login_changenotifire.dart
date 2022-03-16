import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginNotifire extends ChangeNotifier {
  String _userId = "";
  String _image = "";
  String _email = "";
  String _name = "";
  String _token = "";
  String _memberuserid = "";
  String _groupuserid = "";
  dynamic _phone = [];
  String _parentId = "";
  String _levelId = "";
  String _grupid = "";
  String _filter = "";
  String _profilemember = "";
  String _groupname = "";
  String _numberid = "";
  String _subCategId = "";
  String _updatedEmai = "";
  String _updatedName = "";
  String _updatedImage = "";
  String _categoryName = "";
  String _postId = "";
  var _groupPost = [];

 bool _isEndValue = false;


  dynamic _contactId = [];


  get contactId => _contactId;
  get categoryName => _categoryName;
  get userId => _userId;
  get token => _token;
  get memberuserid => _memberuserid;
  get groupuserid => _groupuserid;
  get parentId => _parentId;
  get levelId => _levelId;

  get email => _email;
  get name => _name;
  get updatedEmai => _updatedEmai;
  get updatedName => _updatedName;
  get grupid => _grupid;
  get filter => _filter;
  get profilemember => _profilemember;
  get groupname => _groupname;
  get numberid => _numberid;
  get subCategId => _subCategId;
  get phone => _phone;

  get updatedImage => _updatedImage;
  get postId => _postId;
  get groupPost => _groupPost;
  get isEndValue => _isEndValue;

void isEndValueData(bool isEndValue) {
    _isEndValue = isEndValue;
    notifyListeners();
  }

  void updateUserId(String userId) {
    _userId = userId;
    notifyListeners();
  }

  void phonecontactId(dynamic contactId) {
    _contactId = contactId;
    notifyListeners();
  }

  void getCategoryName(String categoryName) {
    _categoryName = categoryName;
    notifyListeners();
  }

  void getUpdateImage(String updatedImage) {
    _updatedImage = updatedImage;
    notifyListeners();
  }

  void getToken(String token) {
    _token = token;
    notifyListeners();
  }

  void getEmail(String email) {
    _email = email;
    notifyListeners();
  }

  void getNam(String name) {
    _name = name;
    notifyListeners();
  }

  void getUpdatedEmail(String updatedEmai) {
    _updatedEmai = updatedEmai;
    notifyListeners();
  }

  void getUpdatedNam(String updatedName) {
    _updatedName = updatedName;
    notifyListeners();
  }

  void getMembersuserId(String memberuserid) {
    _memberuserid = memberuserid;
    notifyListeners();
  }

  void getGroupuserId(String groupuserid) {
    _groupuserid = groupuserid;
    notifyListeners();
  }

  void getParentId(String parentId) {
    _parentId = parentId;
    notifyListeners();
  }

  void getLevel(String levelId) {
    _levelId = levelId;
    notifyListeners();
  }

  void getGrupId(String grupid) {
    _grupid = grupid;
    notifyListeners();
  }

  void filterData(String filter) {
    _filter = filter;
    notifyListeners();
  }

  void profileuser(String profilemember) {
    _profilemember = profilemember;
    notifyListeners();
  }

  void gname(String groupname) {
    _groupname = groupname;
    notifyListeners();
  }

  void getSubCategId(String subCategId) {
    _subCategId = subCategId;
    notifyListeners();
  }

  void getnumberId(String numberid) {
    _numberid = numberid;
    notifyListeners();
  }

  void getPhoneId(dynamic phone) {
    _phone = phone;
    print('pnumget $phone');
    print('____-pnumget $_phone');
    notifyListeners();
  }

  void getPostId(String postId) {
    _postId = postId;
    notifyListeners();
  }

  void getGroupPost(dynamic groupPost) {
    _groupPost = groupPost;
    notifyListeners();
  }
}
