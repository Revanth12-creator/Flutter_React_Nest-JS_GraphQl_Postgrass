// import 'package:carousel_slider/carousel_slider.dart';
// import 'package:flutter/material.dart';

// class serviceCarousel extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return ListView(
//       children: [
//         CarouselSlider(
//           items: [
//             //1st Image of Slider
//             Container(
//               margin: const EdgeInsets.all(6.0),
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.circular(8.0),
//                 image: const DecorationImage(
//                   image: NetworkImage(
//                       "https://cdn.pixabay.com/photo/2017/12/13/00/23/christmas-3015776_960_720.jpg"),
//                   fit: BoxFit.cover,
//                 ),
//               ),
//             ),

//             //2nd Image of Slider
//             Container(
//               margin: const EdgeInsets.all(6.0),
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.circular(8.0),
//                 image: const DecorationImage(
//                   image: NetworkImage(
//                       "https://cdn.pixabay.com/photo/2017/12/03/18/04/christmas-balls-2995437_960_720.jpg"),
//                   fit: BoxFit.cover,
//                 ),
//               ),
//             ),

//             //3rd Image of Slider
//             Container(
//               margin: const EdgeInsets.all(6.0),
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.circular(8.0),
//                 image: const DecorationImage(
//                   image: NetworkImage(
//                       "https://cdn.pixabay.com/photo/2019/12/19/10/55/christmas-market-4705877_960_720.jpg"),
//                   fit: BoxFit.cover,
//                 ),
//               ),
//             ),

//             //4th Image of Slider
//             Container(
//               margin: const EdgeInsets.all(6.0),
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.circular(8.0),
//                 image: const DecorationImage(
//                   image: NetworkImage(
//                       "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg"),
//                   fit: BoxFit.cover,
//                 ),
//               ),
//             ),

//             //5th Image of Slider
//             Container(
//               margin: const EdgeInsets.all(6.0),
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.circular(8.0),
//                 image: const DecorationImage(
//                   image: NetworkImage(
//                       "http://www.goodmorningimagesdownload.com/wp-content/uploads/2020/06/Alone-Boys-Girls-Images-6.jpg"),
//                   fit: BoxFit.cover,
//                 ),
//               ),
//             ),
//           ],

//           //Slider Container properties
//           options: CarouselOptions(
//             height: 230.0,
//             enlargeCenterPage: true,
//             autoPlay: false,
//             aspectRatio: 16 / 9,
//             autoPlayCurve: Curves.fastOutSlowIn,
//             enableInfiniteScroll: false,
//             autoPlayAnimationDuration: const Duration(milliseconds: 800),
//             viewportFraction: 0.8,
//           ),
//         ),
//       ],
//     );
//   }
// }

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class serviceCarousel extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return serviceCarouselState();
  }
}

class serviceCarouselState extends State<serviceCarousel> {
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
    return Scaffold(
      body: Center(
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
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
              margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 2.0),
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
    );
  }
}

class MyImageView extends StatelessWidget {
  String imgPath;

  MyImageView(this.imgPath);

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
