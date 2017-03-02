const LCD = require('../index.js');

const lcd = new LCD();

lcd.message('Renglon 1', 1);
lcd.message('Renglon 2', 2);

setInterval(() => {}, 2000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
