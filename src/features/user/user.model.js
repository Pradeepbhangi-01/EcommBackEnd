export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }
}

var users = [
  {
    id: "1",
    name: "Seller user",
    email: "pp@gmail.com",
    password: "12345",
    type: "seller",
  },
];
