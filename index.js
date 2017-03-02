const LcdModule = require('bindings')('LCDModule');
/**
 * Creates an instance of LCDModule.
 * @param {int} add The second argument.
 * @returns {LCDModule} the LCDModule object
 */
function LCDModule(add = 0) {
  const self = this;
  this.lcd = new LcdModule(add);

  process.on('SIGINT', () => {
    self.lcd.release();
  });

  process.on('SIGTERM', () => {
    self.lcd.release();
  });
}

LCDModule.prototype.message = function message(msg, row) {
  if (row === 2 || row === 1) {
    this.lcd.setCursor(row, 1);
  } else {
    this.lcd.home();
  }
  this.lcd.message(msg);
};

LCDModule.prototype.setCursor = function setCursor(row, col) {
  this.lcd.setCursor(row, col);
};

LCDModule.prototype.clear = function clear() {
  this.lcd.clear();
};

LCDModule.prototype.home = function home() {
  this.lcd.home();
};
LCDModule.prototype.bklBlink = function bklBlink() {
  this.lcd.bklBlink();
};

LCDModule.prototype.blink = function blink() {
  const interval = setInterval(() => {
    this.lcd.bklBlink();
  }, 300);

  setTimeout(() => {
    clearInterval(interval);
  }, 2000);
};

LCDModule.prototype.setText = function setText(msg) {
  this.reset();
  this.message(msg);
};

LCDModule.prototype.reset = function reset() {
  this.clear();
};

LCDModule.prototype.release = function release() {
  this.lcd.release();
};

module.exports = LCDModule;
