function getSafeUser() {
  const safeUser = {
    _id: this._id,
    username: this.username
  };
  return safeUser;
}

function setFields(user) {
  const { username, password } = user;
  if (username) {
    this.username = username;
  }
  if (password) {
    this.setPassword(password);
  }
}

module.exports = {
  getSafeUser,
  setFields
};
