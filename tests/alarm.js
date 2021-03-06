const LCD = require('../index.js');

const lcd = new LCD();

lcd.message('Hola mundo!!');

lcd.blink(true);

// setInterval(() => {
//   lcd.backlightToggle();
// }, 500);

// console.log();
setTimeout(() => {
  lcd.blink(false);
}, 5000);

setTimeout(() => {
  lcd.release();
}, 10000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
