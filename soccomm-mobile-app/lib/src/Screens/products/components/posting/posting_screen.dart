// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/Service/Service%20lists/service_list.dart';
import 'package:new_project/src/Screens/Service/service_main_screen.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import '../../../drawer.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';

class PostigScreen extends StatefulWidget {
  static const routerName = '/postingscreen';
  const PostigScreen({Key? key}) : super(key: key);

  @override
  _PostigScreenState createState() => _PostigScreenState();
}

class _PostigScreenState extends State<PostigScreen> {
  bool valuefirst = false;
  final _formKey = GlobalKey<FormState>();
  final List<String> allAttributes = [];
  final List<String> allAttributesIDdata = [];
  TextEditingController postTitleControler = TextEditingController();

  String first = '';
  String attriData = "";

  List<Map<String, dynamic>> _values = [];

  //image upload start//
  var postId = "";
  var productImage = "";
  List<XFile>? _imageFileList;

  set _imageFile(XFile? value) {
    _imageFileList = value == null ? null : [value];
  }

  dynamic _pickImageError;
  String? _retrieveDataError;

  final ImagePicker _picker = ImagePicker();
  final TextEditingController maxWidthController = TextEditingController();
  final TextEditingController maxHeightController = TextEditingController();
  final TextEditingController qualityController = TextEditingController();

  _onImageButton(dynamic postId, dynamic imageFilePath) async {
    print("imageFilePath${imageFilePath}");
    print("postId${postId}");

    var postUri = Uri.parse("http://10.0.2.2:5008/media/postupload");

    http.MultipartRequest request = new http.MultipartRequest("POST", postUri);

    http.MultipartFile multipartFile =
        await http.MultipartFile.fromPath('docfile', imageFilePath);
    request.fields['postId'] = postId;

    request.files.add(multipartFile);

    http.StreamedResponse response = await request.send();

    print(response.statusCode);
    print(response.toString());
  }

  void _onImageButtonPressed(ImageSource source,
      {BuildContext? context, bool isMultiImage = false}) async {
    if (isMultiImage) {
      await _displayPickImageDialog(context!,
          (double? maxWidth, double? maxHeight, int? quality) async {
        try {
          final pickedFileList = await _picker.pickMultiImage(
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            imageQuality: quality,
          );
          setState(() {
            _imageFileList = pickedFileList;
          });
        } catch (e) {
          setState(() {
            _pickImageError = e;
          });
        }
      });
    } else {
      await _displayPickImageDialog(context!,
          (double? maxWidth, double? maxHeight, int? quality) async {
        try {
          final pickedFile = await _picker.pickImage(
            source: source,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            imageQuality: quality,
          );
          setState(() {
            _imageFile = pickedFile;
          });
        } catch (e) {
          setState(() {
            _pickImageError = e;
          });
        }
      });
    }
  }

  Widget _previewImages() {
    var gropId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("gropId ${gropId}");
    final Text? retrieveError = _getRetrieveErrorWidget();
    if (retrieveError != null) {
      return retrieveError;
    }
    if (_imageFileList != null) {
      print("_imageFileList$_imageFileList");
      return Semantics(
          child: ListView.builder(
            key: UniqueKey(),
            itemBuilder: (context, index) {
              print("_imageFile${_imageFileList![index].path}");
              print("productImagebefore$productImage");

              // productImage.add(_imageFileList![index].path);
              productImage = _imageFileList![index].path;

              print("productImageafter$productImage");

              return Container(
                margin: EdgeInsets.only(left: 30),
                child: Text(
                  "Image picked ",
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.white),
                ),
              );
            },
            itemCount: _imageFileList!.length,
          ),
          label: 'image_picker_example_picked_images');
    } else if (_pickImageError != null) {
      return Text(
        'Pick image error: $_pickImageError',
        textAlign: TextAlign.center,
      );
    } else {
      return ElevatedButton(
        onPressed: () {
          _onImageButtonPressed(
            ImageSource.gallery,
            context: context,
            isMultiImage: true,
          );
          print('done');
        },
        child: const Icon(Icons.photo_library),
      );
    }
  }

  Widget _handlePreview() {
    return _previewImages();
  }

  Future<void> retrieveLostData() async {
    final LostDataResponse response = await _picker.retrieveLostData();
    if (response.isEmpty) {
      return;
    }
    if (response.file != null) {
      setState(() {
        _imageFile = response.file;
        _imageFileList = response.files;
      });
    } else {
      _retrieveDataError = response.exception!.code;
    }
  }

  //image upload end//

  _onUpdate(int index, String val) async {
    // setState(() {
    //   attriData = val;
    // });
    int foundKey = -1;
    for (var map in _values) {
      if (map.containsKey("id")) {
        if (map["id"] == index) {
          foundKey = index;
          break;
        }
      }
    }
    if (-1 != foundKey) {
      _values.removeWhere((map) {
        return map["id"] == foundKey;
      });
    }
    Map<String, dynamic> json = {
      "id": index,
      "attributeValue": val,
    };
    _values.add(json);
  }

  test() {
    print("test");
  }

  attrbutePost() {
    print("attrbutePost");
    return AlertDialog(
      content: Text("Ready to post"),
      actions: <Widget>[
        Mutation(
            options: MutationOptions(
              document: gql("""
    mutation createPostAttribute(\$data: [CreatePostAttributeInput!]!){
      createPostAttribute(createPostAttributeInput:\$data){
      id
      }
    }
    """),
              onCompleted: (dynamic resultData) {
                var postIdData = resultData?['createPostAttribute']['id'];

                print("second$postIdData");
              },
            ),
            builder: (runMutation, result) {
              if (result!.hasException) {
                return Text(result.exception.toString());
              }

              if (result.isLoading) {
                return Center(
                  child: const CircularProgressIndicator(),
                );
              }
              print("beforeloding");

              print("afterloding");
              return AlertDialog(
                actions: <Widget>[
                  FlatButton(
                    child: Text('Ok'),
                    onPressed: () {
                      runMutation({'data': _values});
                      print("ok");
                      Navigator.of(context).pop();
                    },
                  ),
                ],
              );
            })
      ],
    );
  }

  Future<void> _showMyDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(''),
          content: Text('Are you sure you want to continue'),
          actions: <Widget>[
            Mutation(
                options: MutationOptions(
                  document: gql("""
    mutation createPostAttribute(\$data: [CreatePostAttributeInput!]!){
      createPostAttribute(createPostAttributeInput:\$data){
      id
      }
    }
    """),
                  onCompleted: (dynamic resultData) {
                    var postIdData = resultData?['createPostAttribute']['id'];

                    print("second$postIdData");
                  },
                ),
                builder: (runMutation, result) {
                  if (result!.hasException) {
                    return Text(result.exception.toString());
                  }

                  if (result.isLoading) {
                    return Center(
                      child: const CircularProgressIndicator(),
                    );
                  }
                  print("beforeloding");

                  print("afterloding");
                  return Column(
                    children: [
                      Row(
                        children: [
                          TextButton(
                            child: Text('No'),
                            onPressed: () {
                              print('Cancel');
                              Navigator.of(context).pop();
                            },
                          ),
                          TextButton(
                            child: Text('Yes'),
                            onPressed: () {
                              runMutation({'data': _values});
                              print("ok");
                              _onImageButton(postId, productImage);
                              Navigator.pushNamed(
                                  context, ServiceProductList.routerName);
                            },
                          ),
                        ],
                      ),
                    ],
                  );
                })
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    var categoryIdData =
        Provider.of<LoginNotifire>(context, listen: false).subCategId;
    print("pp$categoryIdData");

    var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("grpid:$groupId");

    var categoryName =
        Provider.of<LoginNotifire>(context, listen: false).categoryName;

    print("categoryName:$categoryName");
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: Text(categoryName),
          backgroundColor: Colors.transparent,
        ),
        body: Form(
          key: _formKey,
          child: Container(
            decoration: BoxDecoration(
              color: Colors.deepPurple[600],
            ),
            child: Column(
              children: [
                SizedBox(
                  height: 1,
                ),
                Padding(
                  padding: const EdgeInsets.all(30),
                  child: TextFormField(
                    validator: (value) => value!.isEmpty ? 'Required' : null,
                    controller: postTitleControler,
                    keyboardType: TextInputType.name,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      fillColor: Colors.white,
                      filled: true,
                      hintText: 'Post Title',
                    ),
                  ),
                ),
                Row(
                  children: <Widget>[
                    SizedBox(
                      width: 10,
                      // height: 5,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20),
                      child: Text(
                        'Looking For',
                        style: TextStyle(
                          fontSize: 17.0,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    Checkbox(
                      checkColor: Colors.white,
                      activeColor: Colors.green,
                      value: this.valuefirst,
                      onChanged: (value) {
                        print("value$value");
                        setState(() {
                          this.valuefirst = value!;
                        });
                        print("value2$value");
                      },
                    ),
                  ],
                ),
               
                Expanded(
                  child: Center(
                    child: !kIsWeb &&
                            defaultTargetPlatform == TargetPlatform.android
                        ? FutureBuilder<void>(
                            future: retrieveLostData(),
                            builder: (BuildContext context,
                                AsyncSnapshot<void> snapshot) {
                              switch (snapshot.connectionState) {
                                case ConnectionState.none:
                                case ConnectionState.waiting:
                                  return const Text(
                                    'You have not yet picked an image.',
                                    textAlign: TextAlign.center,
                                  );
                                case ConnectionState.done:
                                  return _handlePreview();
                                default:
                                  if (snapshot.hasError) {
                                    return Text(
                                      'Pick image/video error: ${snapshot.error}}',
                                      textAlign: TextAlign.center,
                                    );
                                  } else {
                                    return const Text(
                                        'You have not yet picked an image.',
                                        textAlign: TextAlign.center);
                                  }
                              }
                            },
                          )
                        : _handlePreview(),
                  ),
                ),

                Padding(
                  padding: const EdgeInsets.all(15),
                  child: Expanded(
                    child: SizedBox(
                      height: 250,
                      child: Query(
                          options: QueryOptions(document: gql("""
                             query category(\$id:String!){
                             category(id:\$id){
                              attribute{
                               name
                               id
                              }
                             }
                            }
                              """), variables: {'id': categoryIdData}),
                          builder: (QueryResult result, {fetchMore, refetch}) {
                            if (result.hasException) {
                              return Text(result.exception.toString());
                            }
                            if (result.isLoading) {
                              return Center(
                                child: CircularProgressIndicator(),
                              );
                            }
                            final List listData =
                                result.data!['category']['attribute'];
                            print("data$listData");

                            final mapList = listData.map((items) => {
                                  print(items['name']),
                                  allAttributes.add(items['name']),
                                  allAttributesIDdata.add(items['id']),
                                });

                            print("maped$allAttributes");
                            print("database$mapList");
                            print("allAttributesIDdata$allAttributesIDdata");
                            return ListView.builder(
                              itemCount: allAttributes.toSet().length,
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(15),
                                  child: TextFormField(
                                    validator: (value) =>
                                        value!.isEmpty ? 'Required' : null,
                                    onChanged: (value) {
                                      _onUpdate(index, value);
                                    },
                                    keyboardType: TextInputType.name,
                                    decoration: InputDecoration(
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      fillColor: Colors.white,
                                      filled: true,
                                      hintText: "${allAttributes[index]}",
                                    ),
                                  ),
                                );
                              },
                            );
                          }),
                    ),
                  ),
                ),
                Mutation(
                    // ignore: deprecated_member_use
                    options: MutationOptions(
                      document: gql("""
mutation createPost(\$categoryId: String!, \$description: String!, \$groupId: String!,\$type: String!,\$postTitle: String!,\$isBuy:Boolean!){
  createPost(
    createPostInput:{
    categoryId: \$categoryId
    description: \$description
    groupId: \$groupId
    type: \$type
    postTitle: \$postTitle
    isBuy:\$isBuy
  }
  ){
    id
    postTitle
  }
}
"""),
                      onCompleted: (dynamic resultData) async {
                        var postIdData = resultData?['createPost']['id'];
                        print("postIdData$postIdData");
                        postId = postIdData;
                        print("postID$postId");
                        _showMyDialog();
                        final mapedValues = allAttributesIDdata
                            .asMap()
                            .forEach((index, val) => {
                                  // _postingAttriData(postIdData, val),
                                  print("index$index"),
                                  print(val),
                                  if (index < _values.length)
                                    {
                                      _values[index].addAll({
                                        "attributeId": val,
                                        'postId': postIdData
                                      }),
                                      _values[index].remove('id'),
                                    },
                                });
                        print("ff$_values");
                      },
                    ),
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
                        onPressed: () async {
                          if (_formKey.currentState!.validate()) {
                            await runMutation({
                              'categoryId': categoryIdData,
                              'description': "",
                              'groupId': groupId,
                              'type': "public",
                              'postTitle': postTitleControler.text,
                              'isBuy': valuefirst,
                            });
                            // await attrbutePost();
                            // await test();
                            // _showMyDialog();
                          }
                        },
                        child: const Text("Post"),
                      );
                    }),
                Text(
                  first,
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.white),
                )
              ],
            ),
          ),
        ),
        drawer: const AppDrawer());
  }

  Text? _getRetrieveErrorWidget() {
    if (_retrieveDataError != null) {
      final Text result = Text(_retrieveDataError!);
      _retrieveDataError = null;
      return result;
    }
    return null;
  }

  Future<void> _displayPickImageDialog(BuildContext context, onPick) async {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Please Choose Image'),
            actions: <Widget>[
              TextButton(
                child: const Text('CANCEL'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              TextButton(
                  child: const Text('PICK'),
                  onPressed: () {
                    double? width = maxWidthController.text.isNotEmpty
                        ? double.parse(maxWidthController.text)
                        : null;
                    double? height = maxHeightController.text.isNotEmpty
                        ? double.parse(maxHeightController.text)
                        : null;
                    int? quality = qualityController.text.isNotEmpty
                        ? int.parse(qualityController.text)
                        : null;
                    onPick(width, height, quality);
                    Navigator.of(context).pop();
                  }),
            ],
          );
        });
  }
}
