export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.id = id;
  }

  static signUp(name, email, password, type) {
    const newUser = new UserModel(name, email, password, type);
    newUser.id = users.length + 1;
    const result = users.push(newUser);
    return result;
  }

  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }

  static getAllUsers() {
    return users;
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
