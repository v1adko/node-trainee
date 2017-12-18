import { compose } from 'ramda';
import doRequest from 'request';
import HTTP_STATUS_CODE from 'http-status-codes';
import permissions from '../../../constants/permissions';
import permissionValidation from '../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import getNearestSchema from './schema-validation';

const permissionRules = {
  getNearestATM: permissions.USER
};

const validationRules = {
  getNearestATM: getNearestSchema
};

class NotificationController {
  async getNearestATM(request, response) {
    console.log(request.data);

    const { latitude, longitude } = request.data;

    const promise = new Promise((resolve, reject) => {
      doRequest.get(
        `http://localhost:8080/v1/atms/nearest?latitude=${latitude}&longitude=${longitude}`,
        { form: { latitude, longitude } },
        (error, responce, body) => {
          if (error) {
            reject(error);
          }
          const result = JSON.parse(body);
          resolve(result);
        }
      );
    });

    console.log(this);

    const atms = await promise;

    console.log(atms);
    response.status(HTTP_STATUS_CODE.OK).json(atms);
  }
}

const EnhancedNotificationController = compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(NotificationController);

export default new EnhancedNotificationController();
