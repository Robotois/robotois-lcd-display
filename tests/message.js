const LCD = require('../index.js');

const lcd = new LCD();
let count = 0;

setInterval(() => {
    // lcd.message("Hola, estoy\ncontando: " + count);
  lcd.message(`Hola, estoy contando: ${count}`);
  count += 1;
}, 2000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
