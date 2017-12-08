import mongoose from 'mongoose';
import BaseDao from '../../lib/base-dao-mongoose';
import db from '../../db';

const testString = 'test string';
const newTestString = 'new test string';

const TestSchema = new mongoose.Schema({
  testField: {
    type: String,
    unique: true,
    required: true
  }
});

const TestModel = mongoose.model('TestSchema', TestSchema);

const dao = new BaseDao(TestModel);

const createTestInstance = (testField) => {
  const model = new TestModel();
  model.testField = testField;
  return model;
};

const clean = async () => {
  await TestModel.remove();
};

const SETUP_USER_COUNT = 5;

const doSetup = async () => {
  await clean();
  const promises = [];
  for (let i = 0; i < SETUP_USER_COUNT; i += 1) {
    const instance = createTestInstance(`item number ${i}`);
    promises[i] = dao.create(instance);
  }
  await Promise.all(promises);
};

beforeAll(db.connect);
afterAll(db.closeConnection);

describe('Test base dao for mongoose', async () => {
  beforeEach(doSetup);
  afterEach(clean);

  it('shold add test object to database', async () => {
    const testObject = new TestModel();
    testObject.testField = testString;
    const { testField } = await dao.create(testObject);

    expect(testField).toEqual(testObject.testField);
  });

  it('shold not add test object to database, because type of object does not match with model', async () => {
    const testObject = {};
    testObject.testField = testString;
    expect(dao.create(testObject)).rejects.toMatchSnapshot();
  });

  it.skip('shold not add test object with same unique fields', async () => {
    // TODO: Fix it. Should throw exaption.
    const firstTestObject = createTestInstance(testString);
    const secondTestObject = createTestInstance(testString);
    await dao.create(firstTestObject);
    await dao.create(secondTestObject);
  });

  it('shold get all objects from db', async () => {
    const items = await dao.getAll();
    expect(items.length).toBe(SETUP_USER_COUNT);
  });

  it('shold get item by id', async () => {
    const testObject = createTestInstance(testString);
    await dao.create(testObject);
    const item = await dao.getById(testObject.id);

    expect(item.id).toBe(testObject.id);
    expect(item.testField).toBe(testObject.testField);
  });

  it('shold not get item by id, because item was remove', async () => {
    const testObject = createTestInstance(testString);
    await dao.create(testObject);
    await dao.deleteById(testObject.id);

    expect(dao.getById(testObject.id)).rejects.toMatchSnapshot();
  });

  it('shold get some item by get', async () => {
    const testObject = createTestInstance(testString);
    await dao.create(testObject);
    const { testField } = testObject;
    const [item] = await dao.get({ testField });

    expect(item.id).toBe(testObject.id);
    expect(item.testField).toBe(testObject.testField);
  });

  it('shold get one item by getOne', async () => {
    const testObject = createTestInstance(testString);
    await dao.create(testObject);
    const { testField } = testObject;
    const item = await dao.getOne({ testField });

    expect(item.id).toBe(testObject.id);
    expect(item.testField).toBe(testObject.testField);
  });

  it('shold update item by id', async () => {
    const testObject = createTestInstance(testString);
    await dao.create(testObject);
    await dao.updateById(testObject.id, { testField: newTestString });
    const item = await dao.getById(testObject.id);

    expect(item.id).toBe(testObject.id);
    expect(item.testField).toBe(newTestString);
  });

  it('shold update item by id', async () => {
    const testObject = createTestInstance(testString);
    await dao.create(testObject);
    const { result: { ok, n } } = await dao.deleteById(testObject.id);

    expect(ok).toBe(1);
    expect(n).toBe(1);
  });
});
