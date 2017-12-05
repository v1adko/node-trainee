import db from '../db';

describe('Test db set connection', () => {
  it('should create db connection', () => {
    const connection = db.connect();

    expect(connection).not.toBeUndefined();

    db.closeConnection();
  });

  it('should not create db connection because it already exist, and should return exist db connection', () => {
    const connection = db.connect();

    const secondConnection = db.connect();

    expect(connection).toEqual(secondConnection);

    db.closeConnection();
  });

  it('should close db connection', () => {
    db.connect();
    db.closeConnection();

    expect(db.getConnection).toThrowErrorMatchingSnapshot();
  });

  it("should not close db connection because it doesn't exist", () => {
    expect(db.closeConnection).toThrowErrorMatchingSnapshot();
  });

  it('should get db connection', () => {
    const cretedConnection = db.connect();

    const gettedConnection = db.getConnection();

    expect(cretedConnection).toEqual(gettedConnection);

    db.closeConnection();
  });

  it('should reopen db connection', () => {
    db.connect();

    db.tryReopen();
  });
});
