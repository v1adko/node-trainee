import { CronJob } from 'cron';
import logger from '../../lib/logger';

const TIME_ZONE = 'Europe/Kiev';

class CronService {
  constructor(timeZone) {
    this.timeZone = timeZone;
  }
  async addJob(timeConfig, doJob) {
    const job = new CronJob({
      cronTime: timeConfig,
      async onTick() {
        try {
          await doJob();
        } catch (error) {
          logger.error(`Can't do job (${doJob.name}) at the appointed time`);
          logger.error(error);
        }
      },
      start: true,
      timeZone: this.timeZone
    });
    return job;
  }
}

export default new CronService(TIME_ZONE);
