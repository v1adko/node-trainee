import request from 'request';
import Atm from './atm-model';
import atmDao from './atm-dao';
import logger from '../../lib/logger';

const ALL_ATM_URL =
  ' https://api.privatbank.ua/p24api/infrastructure?json&atm&address=&city=';

class PrivatbankAtmService {
  constructor(url, DAO) {
    this.url = url;
    this.DAO = DAO;
  }

  async getAllAtmsFromPrivatbankApi() {
    logger.info('Do request to Privatbank for ATMs data.');
    const promise = new Promise((resolve, reject) => {
      request.get(this.url, (error, responce, body) => {
        if (error) {
          reject(error);
        }
        const result = JSON.parse(body).devices;
        logger.info('Data of ATMs Privatbank were received.');
        resolve(result);
      });
    });
    return promise;
  }

  async updatePartOfAtmsDataInDB(partOfAtmsData) {
    const promises = [];
    partOfAtmsData.forEach((atmData) => {
      const atm = new Atm();
      atm.setData(atmData);
      promises.push(this.DAO.create(atm));
    });
    await Promise.all(promises);
  }

  async distributedAdditionInDB(atmsData, number) {
    const STEP = 1000;
    logger.info(
      `Do update ATM [${number};${Math.min(
        number + STEP,
        atmsData.length
      )}] from ${atmsData.length} ATMs`
    );

    await this.updatePartOfAtmsDataInDB(atmsData.slice(number, number + STEP));
    if (atmsData.length > number + STEP) {
      await this.distributedAdditionInDB(atmsData, number + STEP);
    }
  }

  async updateAtmsDataInDB() {
    const atmsData = await this.getAllAtmsFromPrivatbankApi();
    await this.DAO.deleteAll(); // TODO: Do behavior without dropping db on few seconds
    await this.distributedAdditionInDB(atmsData, 0);
  }
}

const service = new PrivatbankAtmService(ALL_ATM_URL, atmDao);

export default service;
