const LCD = require('../index.js');

const lcd = new LCD();

lcd.message('Renglon 1', 1);
lcd.message('Renglon 2', 2);

console.log('El mensaje se mostrará por 5 segundos!!');
setTimeout(() => {
  lcd.release();
  console.log('Bye!!');
}, 5000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
