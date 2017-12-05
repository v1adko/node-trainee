import getRequestData from '../lib/routes/get-request-data';

const testBodyField = 'testBodyField';
const testParamsField = 'testParamsField';
const testQueryField = 'testQodyField';
const accessToken = 'testAccessToken';

describe('Test getRequestData', () => {
  it('should destruct and return all data of request', () => {
    const request = {
      body: { testBodyField },
      params: { testParamsField },
      query: { testQueryField },
      headers: { access_token: accessToken }
    };
    const {
      testBodyField: bodyField,
      testParamsField: paramsField,
      testQueryField: queryField,
      accessToken: token
    } = getRequestData(request);

    expect(bodyField).toBe(testBodyField);
    expect(paramsField).toBe(testParamsField);
    expect(queryField).toBe(testQueryField);
    expect(token).toBe(accessToken);
  });

  it('should return empty object if request does not include request data', () => {
    const request = {};
    const requestData = getRequestData(request);
    expect(requestData).toEqual({});
  });

  it('should return empty object if request does not include request data', () => {
    const request = { headers: {} };
    const requestData = getRequestData(request);
    expect(requestData).toEqual({});
  });
});
