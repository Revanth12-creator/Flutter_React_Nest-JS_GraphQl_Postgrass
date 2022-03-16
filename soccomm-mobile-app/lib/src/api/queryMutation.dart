// ignore_for_file: file_names

class QueryMutation {
  String addPerson(String email, String password) {
    return """
      mutation{
          addPerson(email: "$email", password: "$password"){
            email,
            password
          }
      }
    """;
  }
}
