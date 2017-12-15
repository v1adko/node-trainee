import request from 'request';
import hash from 'object-hash';
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
        logger.info("Data of ATM's Privatbank were received.");
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

      this.DAO.create(atm);
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
      )}] from ${atmsData.length} new ATM's.`
    );

    await this.updatePartOfAtmsDataInDB(atmsData.slice(number, number + STEP));
    if (atmsData.length > number + STEP) {
      await this.distributedAdditionInDB(atmsData, number + STEP);
    }
  }

  addHashInData = atmsData =>
    atmsData.map(item => ({ ...item, hash: hash(item) }));

  filterAtmsDataByHash = (atmsData) => {
    const mapOfAtms = {};
    atmsData.forEach((data) => {
      mapOfAtms[data.hash] = data;
    });
    return Object.keys(mapOfAtms).map(key => mapOfAtms[key]);
  };

  getAtmsHashes = async () =>
    this.DAO.Model.find({})
      .select({ hash: 1 })
      .lean();

  getOnlyNewData = (atmsHashes, atmsData) => {
    const mapOfAtmsHashes = {};
    atmsHashes.forEach((atm) => {
      mapOfAtmsHashes[atm.hash] = atm;
    });

    const newAtms = atmsData.filter(atmData => !mapOfAtmsHashes[atmData.hash]);
    return newAtms;
  };

  removeOldAtmData = async (atmsHashes, atmsData) => {
    const mapOfAtmsData = {};
    atmsData.forEach((atmData) => {
      mapOfAtmsData[atmData.hash] = atmData;
    });

    const oldAtmsHashes = atmsHashes.filter(
      atmHash => !mapOfAtmsData[atmHash.hash]
    );

    const forDeleting = [];
    oldAtmsHashes.forEach(oldAtm => forDeleting.push(this.DAO.delete(oldAtm)));

    await Promise.all(forDeleting);
    return oldAtmsHashes;
  };

  async updateAtmsDataInDB() {
    const atmsData = await this.getAllAtmsFromPrivatbankApi();

    const hasedAtmsData = this.addHashInData(atmsData);
    const atmsHashes = await this.getAtmsHashes();
    const filteredAtmsData = this.filterAtmsDataByHash(hasedAtmsData);
    const newData = await this.getOnlyNewData(atmsHashes, filteredAtmsData);

    await this.distributedAdditionInDB(newData, 0);
    await this.removeOldAtmData(atmsHashes, filteredAtmsData);

    logger.info("All ATM's were added.");
  }
}

const service = new PrivatbankAtmService(ALL_ATM_URL, atmDao);

export default service;
