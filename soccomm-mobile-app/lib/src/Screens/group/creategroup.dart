import 'dart:async';
import 'package:flutter/material.dart';
import 'package:contacts_service/contacts_service.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/group/addmember.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:simple_permissions/simple_permissions.dart';

class CreateGroup extends StatefulWidget {
  static const routerName = "/creategroup";
  const CreateGroup({Key? key}) : super(key: key);

  final String reloadLabel = 'Reload!';
  final String fireLabel = 'Fire in the hole!';
  final Color floatingButtonColor = Colors.red;
  final IconData reloadIcon = Icons.refresh;
  final IconData fireIcon = Icons.filter_center_focus;

  @override
  _CreateGroupState createState() => _CreateGroupState(
        floatingButtonLabel: fireLabel,
        icon: this.fireIcon,
        floatingButtonColor: floatingButtonColor,
      );
}

class _CreateGroupState extends State<CreateGroup> {
  List<Contact> _contacts = [];
  List<CustomContact> _uiCustomContacts = [];
  List<CustomContact> _allContacts = [];
  bool _isLoading = false;
  bool _isSelectedContactsView = false;
  String floatingButtonLabel;
  Color floatingButtonColor;
  IconData icon;

  _CreateGroupState({
    required this.floatingButtonLabel,
    required this.icon,
    required this.floatingButtonColor,
  });

  var tmpArray = [];

  @override
  void initState() {
    super.initState();
    getContactsPermission().then((granted) {
      if (granted != null) {
        refreshContacts();
      } else {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Oops!'),
            content: const Text(
                'Looks like permission to read contacts is not granted.'),
            actions: <Widget>[
              FlatButton(
                child: const Text('OK'),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    Provider.of<LoginNotifire>(context, listen: false).getPhoneId(tmpArray);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade400,
        title: const Text('Add User'),
      ),
      body: !_isLoading
          ? Container(
              child: ListView.builder(
                itemCount: _uiCustomContacts.length,
                itemBuilder: (BuildContext context, int index) {
                  CustomContact _contact = _uiCustomContacts[index];
                  var _phonesList = _contact.contact.phones.toList();

                  // var num = c.contact.displayName[index];

                  return _buildListTile(_contact, _phonesList);
                },
              ),
            )
          : const Center(
              child: CircularProgressIndicator(),
            ),
      floatingActionButton: FloatingActionButton(
          backgroundColor: const Color(0xFF128C7E),
          onPressed: () async {
            print('clickkk');
            await Navigator.of(context).pushNamed(AddMember.routerName);
          },
          child: const Icon(Icons.arrow_forward)),
    );
  }

  ListTile _buildListTile(CustomContact c, List<Item> list) {
    return ListTile(
      leading: (c.contact.avatar != null)
          ? const CircleAvatar(
              backgroundImage: NetworkImage(
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvm23oH1Te7VMVabnGjl2BbwdM_M_iIiwPQ&usqp=CAU'))
          : CircleAvatar(
              child: Text(
                  (c.contact.displayName[0] +
                      c.contact.displayName[1].toUpperCase()),
                  style: const TextStyle(color: Colors.white)),
            ),
      title: Text(c.contact.displayName ?? ""),
      subtitle: list.isNotEmpty && list[0].value != null
          ? Text(list[0].value)
          : const Text(''),
      trailing: Checkbox(
          activeColor: Colors.green,
          value: c.isChecked,
          onChanged: (bool? value) {
            setState(() {
              c.isChecked = value!;

              if (c.isChecked == true) {
                print(list[0].value);
                tmpArray.add(list[0].value);
                print(tmpArray);
              } else {
                tmpArray.clear();
              }
            });

            print(value);
          }),
    );
  }

  refreshContacts() async {
    setState(() {
      _isLoading = true;
    });
    var contacts = await ContactsService.getContacts();
    _populateContacts(contacts);
  }

  void _populateContacts(Iterable<Contact> contacts) {
    _contacts = contacts.where((item) => item.displayName != null).toList();
    _contacts.sort((a, b) => a.displayName.compareTo(b.displayName));
    _allContacts =
        _contacts.map((contact) => CustomContact(contact: contact)).toList();
    setState(() {
      _uiCustomContacts = _allContacts;
      _isLoading = false;
    });
  }

  Future<PermissionStatus> getContactsPermission() =>
      SimplePermissions.requestPermission(Permission.ReadContacts);
}

class CustomContact {
  final Contact contact;
  bool isChecked;

  CustomContact({
    required this.contact,
    this.isChecked = false,
  });
}
