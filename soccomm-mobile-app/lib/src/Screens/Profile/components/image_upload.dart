import 'dart:io';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:image_picker/image_picker.dart';
import 'package:new_project/src/Screens/Profile/profile_screen.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

class ImageUpload extends StatefulWidget {
  const ImageUpload({Key? key}) : super(key: key);

  @override
  _ImageUploadState createState() => _ImageUploadState();
}

class _ImageUploadState extends State<ImageUpload> {
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

  _onImageButton(dynamic userId, dynamic imageFilePath) async {
    var postUri = Uri.parse(
        "http://10.0.2.2:5008/media/upload-profile-image-to-local/$userId");

    http.MultipartRequest request = new http.MultipartRequest("POST", postUri);

    http.MultipartFile multipartFile =
        await http.MultipartFile.fromPath('imagefile', imageFilePath);
    // request.fields['userId'] = userId;

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
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("userDetails ${userDetails}");
    var imageData =
        Provider.of<LoginNotifire>(context, listen: false).updatedImage;

    print("imageData:$imageData");
    final Text? retrieveError = _getRetrieveErrorWidget();
    if (retrieveError != null) {
      return retrieveError;
    }
    if (_imageFileList != null) {
      return Semantics(
          child: ListView.builder(
            key: UniqueKey(),
            itemBuilder: (context, index) {
              // Why network for web?
              // See https://pub.dev/packages/image_picker#getting-ready-for-the-web-platform
              return Column(
                children: [
                  // Semantics(
                  //   label: 'image_picker_example_picked_image',
                  //   child: kIsWeb
                  //       ? Image.network(_imageFileList![index].path)
                  //       : Image.file(File(_imageFileList![index].path)),
                  // ),
                  Container(
                    height: 70,
                    child: kIsWeb
                        ? Image.network(_imageFileList![index].path)
                        : Image.file(
                            File(_imageFileList![index].path),
                            height: 100,
                            width: 100,
                          ),
                  ),
                  SizedBox(
                    height: 5,
                  ),
//                   Mutation(
//                     options: MutationOptions(
//                         document: gql("""
// mutation updateUser(\$id:String!,\$avatar: String!){
//   updateUser(
//     updateUserInput:{
//     id:\$id
//     avatar: \$avatar
//   }
//   ){
//     __typename

//   }
// }
// """),
//                         onCompleted: (dynamic resultData) {
//                           Navigator.pushNamed(context, Profile.routerName);
//                         }),
//                     builder: (runMutation, result) {
//                       if (result!.hasException) {
//                         return Text(result.exception.toString());
//                       }

//                       if (result.isLoading) {
//                         return Center(
//                           child: const CircularProgressIndicator(),
//                         );
//                       }
//                       return ElevatedButton(
//                           onPressed: () {
//                             runMutation({
//                               'id': userDetails,
//                               'avatar': _imageFileList![index].path
//                             });
//                           },
//                           child: const Text("update"));
//                     },
//                   ),

                  ElevatedButton(
                      onPressed: () {
                        _onImageButton(
                            userDetails, _imageFileList![index].path);
                        Navigator.pushNamed(context, Profile.routerName);
                      },
                      child: const Text("update")),
                ],
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
      return ClipRRect(
        borderRadius: BorderRadius.circular(90),
        child: Container(
            height: 110,
            width: 110,
            margin: const EdgeInsets.only(right: 10, bottom: 30),
            child: imageData == null
                ? Image.asset("assets/images/default.jpg")
                : Image.file(File(imageData))),
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: !kIsWeb && defaultTargetPlatform == TargetPlatform.android
            ? FutureBuilder<void>(
                future: retrieveLostData(),
                builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
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
                        return const Text('You have not yet picked an image.',
                            textAlign: TextAlign.center);
                      }
                  }
                },
              )
            : _handlePreview(),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          // Semantics(
          //   label: 'image_picker_example_from_gallery',
          //   child: FloatingActionButton(
          //     onPressed: () {
          //       _onImageButtonPressed(ImageSource.gallery, context: context);
          //     },
          //     heroTag: 'image0',
          //     tooltip: 'Pick Image from gallery',
          //     child: const Icon(Icons.photo),
          //   ),
          // ),
          Padding(
            padding: const EdgeInsets.only(top: 50.0, left: 80),
            child: FloatingActionButton(
              onPressed: () {
                _onImageButtonPressed(
                  ImageSource.gallery,
                  context: context,
                  isMultiImage: true,
                );
              },
              heroTag: 'image1',
              tooltip: 'Pick Multiple Image from gallery',
              child: const Icon(Icons.photo_library),
            ),
          ),
        ],
      ),
    );
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
