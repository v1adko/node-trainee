class UserService {
  constructor(user) {
    this.user = user;
  }

  getSafeUser() {
    const safeUser = {
      _id: this.user._id,
      username: this.user.username
    };
    return safeUser;
  }

  setFields(userFields) {
    const { username, password } = userFields;
    if (username) {
      this.user.username = username;
    }
    if (password) {
      this.user.password.set(password);
    }
  }
}

module.exports = UserService;
