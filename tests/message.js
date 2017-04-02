const LCD = require('../index.js');

const lcd = new LCD();

let count = 0;

setInterval(() => {
  const stringCount = (`   ${count.toString()}`).slice(-3);
  lcd.message(`Hola, estoy\ncontando: ${stringCount}`);
  count += 10;
}, 500);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
