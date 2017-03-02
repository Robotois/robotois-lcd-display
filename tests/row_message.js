var _lcd = require('../index.js'),
  lcd = new _lcd();

    lcd.row_1_msg("Renglon 1");
    lcd.row_2_msg("Renglon 2");

setInterval(()=>{
  true;
},2000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
