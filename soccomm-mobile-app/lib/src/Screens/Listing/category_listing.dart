import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hexcolor/hexcolor.dart';

class CategoryListing extends StatefulWidget {
  static var routerName = "/CategoryListing";

  const CategoryListing({Key? key}) : super(key: key);

  @override
  _CategoryListingState createState() => _CategoryListingState();
}

class _CategoryListingState extends State<CategoryListing> {
  final List<String> mainCategoriesData = [];
  var subCategoriesData = [];
  var selectedCard;
  List<Widget> textWidgetList = <Widget>[];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          child: Query(
              options: QueryOptions(
                document: gql("""
         query {
          findByLevel(level:1){
            id
            name
            child{
              id
              name
              parentId
              child{
                id
                name
                parentId
              }
            }
          }
        }
          """),
              ),
              builder: (QueryResult result, {fetchMore, refetch}) {
                if (result.hasException) {
                  return Text(result.exception.toString());
                }
                if (result.isLoading) {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                }
                final List listData = result.data!['findByLevel'];

                final mapList = listData.map((items) => {
                      mainCategoriesData.add(items["name"]),
                      subCategoriesData.add(items["child"]),
                    });
                print("database$mapList");
                print(mainCategoriesData);
                var mainCategory = mainCategoriesData.toSet().toList();

                return GridView.builder(
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 4.0,
                        mainAxisSpacing: 4.0),
                    itemCount: mainCategory.length,
                    itemBuilder: (context, index) {
                      print("mainCategoriesData");
                      print(mainCategory[index]);

                      return SizedBox(
                          child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(children: <Widget>[
                                Padding(
                                  padding: const EdgeInsets.all(15),
                                  child: SizedBox(
                                    width: 150,
                                    height: 150,
                                    child: Card(
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(15.0),
                                      ),
                                      color: HexColor("#A96BFF"),
                                      child: InkWell(
                                          splashColor:
                                              Colors.black.withAlpha(30),
                                          onTap: () {
                                            print('Goods Card tapped.$index');
                                            setState(() {
                                              // ontap of each card, set the defined int to the grid view index
                                              selectedCard = index;
                                              // print( "selectedCard$selectedCard");
                                            });
                                            print("selectedCard$selectedCard");
                                          },
                                          child: Center(
                                            child: Padding(
                                              padding: const EdgeInsets.all(10),
                                              child: Text(
                                                "${mainCategory[index]}",
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 20,
                                                  fontWeight: FontWeight.w500,
                                                ),
                                              ),
                                            ),
                                          )),
                                    ),
                                  ),
                                ),
                              ])));
                    });
              })),
    );
  }
}
