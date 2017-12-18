import { compose } from 'ramda';
import HTTP_STATUS_CODE from 'http-status-codes';
import atmDao from '../atm-dao';
import permissions from '../../../constants/permissions';
import permissionValidation from '../../../lib/decorators/permission-validation-decorator';
import requestValidator from '../../../lib/decorators/request-validation-decorator';
import getNearestSchema from './schema-validation';

const permissionRules = {
  getNearest: permissions.USER
};

const validationRules = {
  getNearest: getNearestSchema
};

class AtmController {
  constructor(DAO) {
    this.DAO = DAO;
  }

  distance = (latitude1, longitude1, latitude2, longitude2) =>
    Math.sqrt((latitude1 - latitude2) ** 2 + (longitude1 - longitude2) ** 2);

  getMinimalDistance = (latitude, longitude, atm1, atm2) => {
    const distanceToFistAtm = this.distance(
      latitude,
      longitude,
      atm1.latitude,
      atm1.longitude
    );
    const distanceToSecondAtm = this.distance(
      latitude,
      longitude,
      atm2.latitude,
      atm2.longitude
    );
    return distanceToFistAtm - distanceToSecondAtm;
  };

  async getNearestAtmsToPoint(latitude, longitude, step) {
    const atms = await this.DAO.findInArea(latitude, longitude, step);
    if (!atms.length) {
      return this.getNearestAtmsToPoint(latitude, longitude, step * 1.5);
    }
    const nearestsAtms = atms
      .sort((atm1, atm2) =>
        this.getMinimalDistance(latitude, longitude, atm1, atm2)
      )
      .slice(0, 4);
    return nearestsAtms;
  }

  async getNearest(request, response) {
    const { latitude, longitude } = request.data;

    const step = 0.1;
    const atms = await this.getNearestAtmsToPoint(latitude, longitude, step);

    response.status(HTTP_STATUS_CODE.OK).json(atms);
  }
}

const EnhancedAtmController = compose(
  permissionValidation(permissionRules),
  requestValidator(validationRules)
)(AtmController);

export default new EnhancedAtmController(atmDao);
