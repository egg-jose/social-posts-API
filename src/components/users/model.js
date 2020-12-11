export default class User {
  constructor(name, email, password, admin = false) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.admin = admin;
  }
}
