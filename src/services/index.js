import runCronUpdatesService from '../v1/services/updates-service';

function applyServices() {
  runCronUpdatesService();
}

export default applyServices;
