const LCD = require('../index.js');

const lcd = new LCD();

let value = 0;
let params = {
  text: 'Temp:',
  unit: 'C'
};

setInterval(() => {
  params.value = value;
  // const stringCount = (`   ${value.toString()}`).slice(-3);
  // lcd.message(`Hola, estoy\ncontando: ${stringCount}`);
  lcd.displaySensor(params);
  value += 10;
}, 1000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
