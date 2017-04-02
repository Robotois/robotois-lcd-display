const LCD = require('../index');

const lcd = new LCD();

lcd.setText('Hola mundo!!');

console.log('El mensaje se mostrará por 5 segundos!!');

setTimeout(() => {
  lcd.release();
  console.log('Bye!!');
}, 5000);
