import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Order/mycart.dart';
import 'package:new_project/src/Screens/Order/orderscreen.dart';
import 'package:new_project/src/Screens/Service/servicelist_carosel.dart';
import 'package:new_project/src/Screens/drawer.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:smooth_star_rating/smooth_star_rating.dart';

var rating = 3.0;

class serviceDetails extends StatefulWidget {
  static var routerName = "/servicedetails";

  const serviceDetails({Key? key}) : super(key: key);

  @override
  _serviceDetailsState createState() => _serviceDetailsState();
}

class _serviceDetailsState extends State<serviceDetails> {
  int currentPos = 0;
  List<String> listPaths = [
    "http://www.goodmorningimagesdownload.com/wp-content/uploads/2020/06/Alone-Boys-Girls-Images-6.jpg",
    "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg",
    "https://cdn.pixabay.com/photo/2019/12/19/10/55/christmas-market-4705877_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/12/03/18/04/christmas-balls-2995437_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/12/13/00/23/christmas-3015776_960_720.jpg",
  ];
  @override
  Widget build(BuildContext context) {
    var postDetails = Provider.of<LoginNotifire>(context, listen: false).postId;
    print("ff$postDetails");
    return Query(
      options: QueryOptions(
        document: gql("""
query post(\$id:String!){
  post(id:\$id){
    postTitle
    rating{
      rating
      feedback
    }
    postupload{
      filename
    }
    postattribute{
      attribute{
        name
      }
      attributeValue
    }
    user{
      username
      id
    }
  }
}
"""),
        variables: {'id': postDetails},
      ),
      builder: (QueryResult result, {fetchMore, refetch}) {
        if (result.hasException) {
          return Text(result.exception.toString());
        }
        if (result.isLoading) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
       

        final postDetails = result.data?['post'];

        // print("postDetail$postDetails");

        var postTitle = postDetails['postTitle'];
        var attributeValue = postDetails['postattribute'][0]['attributeValue'];
        // var postupload = postDetails['postupload'][0]['filename'];
        var attributeValue1 = postDetails['postattribute'][1]['attributeValue'];
        var attributeValue2 = postDetails['postattribute'][2]['attributeValue'];
        var attributeValue3 = postDetails['postattribute'][3]['attributeValue'];
        // var rating = postDetails['rating'][0];
        var attributeName =
            postDetails['postattribute'][0]['attribute']['name'];
        var attributeName1 =
            postDetails['postattribute'][1]['attribute']['name'];
        var attributeName2 =
            postDetails['postattribute'][2]['attribute']['name'];
        var attributeName3 =
            postDetails['postattribute'][3]['attribute']['name'];
        print("attributename $attributeName1");
        print("postDetails $postDetails");
        postDetails['postattribute'].forEach((item) => {
              print(item),
              if (item['attribute']['name'] == "description" ||
                  item['attribute']['name'] == "roomscount" ||
                  item['attribute']['name'] == "size" ||
                  item['attribute']['name'] == "role" ||
                  item['attribute']['name'] == "intrest-amount"
                  
                   
                )
                {
                  attributeValue1 = item['attributeValue'],
                  attributeName1 = item['attribute']['name']
                }
              // else (item['attribute']['name'] == "description")
              else if (item['attribute']['name'] == "location" ||
                  item['attribute']['name'] == "author" ||
                  item['attribute']['name'] == "quantity" ||
                  // item['attribute']['name'] == "model" ||
                  item['attribute']['name'] == "brand" ||
                  item['attribute']['name'] == "type" ||
                  item['attribute']['name'] == "salary" ||
                  item['attribute']['name'] == "duration" ||
                  item['attribute']['name'] == "name" ||
                  item['attribute']['name'] == "Ram"
                  
                 
                 
                
                  )
                {
                  attributeValue2 = item['attributeValue'],
                  attributeName2 = item['attribute']['name']
                }
              else if (item['attribute']['name'] == "experience" ||
                  item['attribute']['name'] == "price" ||
                  item['attribute']['name'] == "time" ||
                  item['attribute']['name'] == "timing" ||
                  item['attribute']['name'] == "amount" 
                 
                  
                  
                  
                  )
                {
                  attributeValue3 = item['attributeValue'],
                  attributeName3 = item['attribute']['name']
                }
               

              // {attributeValue3 = item['attributeValue']}});
            });

        //      postDetails['postattribute'].forEach((item) => {
        // print(item),
        // else (item['attribute']['name'] == "description")
        //   {attributeValue3 = item['attributeValue']}});

        // postDetails.forEach((item) => {print(item)});

        //    if(attributename ==){

        //    }

        // print("postTitle$postTitle");
        // print(rating);
        // print(time);
        // print(place);
        // print(description);
        // return const Text("getting data");
        return Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.purple.shade400,
              title: const Text("ProductDetails"),
              actions:[
                // IconButton(
                //   icon: Icon(Icons.shopping_cart),
                
                //   onPressed: (){
                //     Navigator.pushNamed(
                //                               context, MyCart.routerName);
                //   },
                // ),
              ]
            ),
            body: SafeArea(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        height: 280,
                        child: Center(
                            child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                              CarouselSlider.builder(
                                itemCount: listPaths.length,
                                options: CarouselOptions(
                                    height: 230.0,
                                    enlargeCenterPage: true,
                                    autoPlay: false,
                                    aspectRatio: 16 / 8,
                                    autoPlayCurve: Curves.fastOutSlowIn,
                                    enableInfiniteScroll: false,
                                    // autoPlayAnimationDuration: const Duration(milliseconds: 800),
                                    viewportFraction: 0.8,
                                    onPageChanged: (index, reason) {
                                      setState(() {
                                        currentPos = index;
                                      });
                                    }),
                                // 08061606161
                                itemBuilder: (context, int index, _) {
                                  return MyImageView(listPaths[index]);
                                },
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: listPaths.map((url) {
                                  int index = listPaths.indexOf(url);
                                  return Container(
                                    width: 8.0,
                                    height: 8.0,
                                    margin: EdgeInsets.symmetric(
                                        vertical: 10.0, horizontal: 2.0),
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: currentPos == index
                                          ? Color.fromRGBO(0, 0, 0, 0.9)
                                          : Color.fromRGBO(0, 0, 0, 0.4),
                                    ),
                                  );
                                }).toList(),
                              ),
                            ])),
                      ),
                    ),
                    SizedBox(
                      child: Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Container(
                          height: 380.0,
                          decoration: BoxDecoration(
                              color: HexColor("#A96BFF"),
                              borderRadius: const BorderRadius.only(
                                  bottomLeft: Radius.circular(40.0),
                                  bottomRight: Radius.circular(40.0),
                                  topLeft: Radius.circular(40.0),
                                  topRight: Radius.circular(40.0))),
                          child: Column(
                            children: <Widget>[
                              Padding(
                                padding: const EdgeInsets.only(
                                    bottom: 5, top: 15, left: 5, right: 5),
                                child: Text(
                                  "$postTitle",
                                  style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 25,
                                      decoration: TextDecoration.none),
                                  textAlign: TextAlign.right,
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(
                                    bottom: 5, top: 5, left: 35, right: 20),
                                child:
                                    // if(){

                                    // }

                                    Text(
                                  " $attributeName3:- $attributeValue3",
                                  // "description",
                                  style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15,
                                      decoration: TextDecoration.none,
                                      fontWeight: FontWeight.w500),
                                  textAlign: TextAlign.left,
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(5.0),
                                child: Text(
                                  " $attributeName1:- $attributeValue1",
                                  // "description",
                                  style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15,
                                      decoration: TextDecoration.none,
                                      fontWeight: FontWeight.w500),
                                  textAlign: TextAlign.left,
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(5),
                                child: Text(
                                  " $attributeName2:- $attributeValue2",
                                  // "description",
                                  style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15,
                                      decoration: TextDecoration.none,
                                      fontWeight: FontWeight.w500),
                                  textAlign: TextAlign.left,
                                ),
                              ),
                              const Padding(padding: EdgeInsets.all(5)),
                              SmoothStarRating(
                                rating: rating,
                                isReadOnly: false,
                                size: 25,
                                filledIconData: Icons.star,
                                halfFilledIconData: Icons.star_half,
                                defaultIconData: Icons.star_border,
                                starCount: 5,
                                allowHalfRating: true,
                                spacing: 2.0,
                                color: Colors.orange,
                                onRated: (value) {
                                  print("rating value -> $value");

                                  // print("rating value dd -> ${value.truncate()}");
                                },
                              ),
                              Column(
                                children: <Widget>[
                                  // FlatButton(
                                  //   // splashColor: Colors.red,
                                  //   color: Colors.white,
                                  //   // textColor: Colors.white,
                                  //   child: Text('ADD TO CART',
                                  //       style: TextStyle(fontSize: 20.0)),
                                  //   onPressed: () {
                                    
                                  //   },
                                  // ),
                                  //  Container(
                                  //     margin: const EdgeInsets.only(
                                  //       left: 15.0,
                                  //     ),
                                  //     child: Padding(
                                  //       padding: EdgeInsets.all(5.0),
                                  //       child: Text(
                                  //         "$attributeValue3",
                                  //         // "price",
                                  //         style: const TextStyle(
                                  //             color: Colors.white,
                                  //             fontSize: 25),
                                  //       ),
                                  //     ),
                                  //   )

                                  // Container(
                                  // margin: const EdgeInsets.only(
                                  //   left: 120.0,
                                  // ),
                                  // child:
                                  // Padding(
                                  //   padding: const EdgeInsets.all(5.0),
                                  //   child: TextButton(
                                  //     child: const Text(
                                  //       "Add To Cart",
                                  //       style: TextStyle(
                                  //           color: Colors.white,
                                  //           fontSize: 23),
                                  //     ),
                                  //     onPressed: () {

                                  //     },
                                  //   ),
                                  // ),

                                  // ),
                                  // Container(
                                  //   padding: const EdgeInsets.all(5.0),
                                  //   child: IconButton(
                                  //     icon: const Icon(
                                  //       Icons.message_rounded,
                                  //     ),
                                  //     iconSize: 30,
                                  //     color: Colors.white,
                                  //     splashColor: Colors.red,
                                  //     onPressed: () {},
                                  //   ),
                                  //   margin: const EdgeInsets.only(left: 110),
                                  // )
                                ],
                              ),
                              Padding(
                                padding: const EdgeInsets.all(20.0),
                                child: Row(
                                  children: <Widget>[
                                    // Container(
                                    //   margin: const EdgeInsets.only(
                                    //     left: 15.0,
                                    //   ),
                                    //   child: Padding(
                                    //     padding: EdgeInsets.all(5.0),
                                    //     child: Text(
                                    //       "$attributeValue3",
                                    //       // "price",
                                    //       style: const TextStyle(
                                    //           color: Colors.white,
                                    //           fontSize: 25),
                                    //     ),
                                    //   ),
                                    // ),
                                    Container(
                                      padding: const EdgeInsets.all(5.0),
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(
                                          primary: Colors.white, // background
                                          onPrimary: Colors.black,
                                          minimumSize: const Size(100, 50),
                                          // foreground
                                        ),
                                        child: const Text(
                                          'BUY',
                                          style: TextStyle(fontSize: 20),
                                        ),
                                        onPressed: () {
                                          Navigator.pushNamed(
                                              context, OrderScreen.routerName);
                                        },
                                      ),
                                      margin: const EdgeInsets.only(left: 20),
                                    ),
                                    Container(
                                      padding: const EdgeInsets.all(5.0),
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(
                                          primary: Colors.white, // background
                                          onPrimary: Colors.black,
                                          minimumSize: const Size(100, 50),
                                          // foreground
                                        ),
                                        child: const Text(
                                          'CHAT',
                                          style: TextStyle(fontSize: 20),
                                        ),
                                        onPressed: () {
                                          print('You tapped on FlatButton');
                                        },
                                      ),
                                      margin: const EdgeInsets.only(left: 70),
                                    )
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            drawer: const AppDrawer());
      },
    );
  }
}

class MyImageView extends StatelessWidget {
  String imgPath;

  MyImageView(this.imgPath, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(6.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        image: DecorationImage(
          image: NetworkImage(imgPath),
          fit: BoxFit.fill,
        ),
      ),
    );
  }
}
