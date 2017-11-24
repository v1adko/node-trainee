import { startApp } from './startApp';

startApp().catch((err) => {
  console.log(err);
  process.kill(1);
});
