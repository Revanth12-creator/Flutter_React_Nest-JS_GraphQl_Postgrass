import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/group/app-contact.class.dart';

class ContactsList extends StatefulWidget {
  List<AppContact> contacts = [];

  Function() reloadContacts;
  ContactsList({Key? key, required this.contacts, required this.reloadContacts})
      : super(key: key);

  @override
  State<ContactsList> createState() => _ContactsListState();
}

class _ContactsListState extends State<ContactsList> {
  bool isChecked = false;
  List<bool> value = [];

  Widget buildCheckbox() => Checkbox(
    onChanged: (bool? value) {  },
     value: null,
        
      );
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView.builder(
        shrinkWrap: true,
        itemCount: widget.contacts.length,
        itemBuilder: (context, index) {
          AppContact contact = widget.contacts[index];
          var listc = contact.info.phones.elementAt(0).value;

          // return Container(
          //   decoration: BoxDecoration(border: Border.all(color: Colors.teal)),
          //   margin: const EdgeInsets.only(top: 20.0),
          //   child: CheckboxListTile(
          //     title: Text(contact.info.displayName),
          //     subtitle: Text(contact.info.phones.isNotEmpty
          //         ? contact.info.phones.elementAt(0).value
          //         : ''),
          //     secondary: const CircleAvatar(
          //       backgroundImage: NetworkImage(
          //           'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvm23oH1Te7VMVabnGjl2BbwdM_M_iIiwPQ&usqp=CAU'),
          //     ),
          //     value: isChecked,
          //     onChanged: (bool? value) {
          //       setState(() {
          //         isChecked = value!;
          //       });
          //     },
          //   ),
          // );

          return ListTile(
            onTap: () {},
            title: Text(contact.info.displayName),
            subtitle: Text(contact.info.phones.isNotEmpty
                ? contact.info.phones.elementAt(0).value
                : ''),
            leading: const CircleAvatar(
              backgroundImage: NetworkImage(
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvm23oH1Te7VMVabnGjl2BbwdM_M_iIiwPQ&usqp=CAU'),
            ),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[buildCheckbox()],
            ),
          );
        },
      ),
    );
  }
}
