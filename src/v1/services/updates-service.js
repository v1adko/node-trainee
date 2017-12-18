import cronService from '../services/cron-service';
import updateAtmService from '../atm/atm-update-service';

cronService.addJob(
  '00 00 02 * * 0-6',
  updateAtmService.updateAtmsDataInDB.bind(updateAtmService)
);
