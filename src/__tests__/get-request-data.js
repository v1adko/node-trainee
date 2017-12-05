import getRequestData from '../lib/routes/get-request-data';

const testBodyField = 'testBodyField';
const testParamsField = 'testParamsField';
const testQueryField = 'testQodyField';

describe('Test getRequestData', () => {
  it('should destruct and return all data of request', () => {
    const request = {
      body: { testBodyField },
      params: { testParamsField },
      query: { testQueryField }
    };
    const {
      testBodyField: bodyField,
      testParamsField: paramsField,
      testQueryField: queryField
    } = getRequestData(request);

    expect(bodyField).toBe(testBodyField);
    expect(paramsField).toBe(testParamsField);
    expect(queryField).toBe(testQueryField);
  });

  it('should return empty object if request does not include request data', () => {
    const request = {};
    const requestData = getRequestData(request);
    expect(requestData).toEqual({});
  });
});
