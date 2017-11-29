class TestUserFields {
  constructor(route) {
    this.postfix = route.split('/').join('');
    this.username = `testUsername${this.postfix}`;
    this.password = `testPassword${this.postfix}`;
    this.wrongPassword = `wrongTestPassword${this.postfix}`;
    this.newUsername = `testNewUsername${this.postfix}`;
    this.newPassword = `newTestPassword${this.postfix}`;
    this.invalidToken = `invalidToken${this.postfix}`;
    this.invalidUserId = `invalidUserId${this.postfix}`;
  }
}

export default TestUserFields;
