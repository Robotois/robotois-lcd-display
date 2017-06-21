const LcdModule = require('bindings')('LCDModule');
/**
 * Creates an instance of LCDModule.
 * @param {int} add The second argument.
 * @returns {LCDModule} the LCDModule object
 */
function LCDModule(add = 0) {
  const self = this;
  this.lcd = new LcdModule(add);
  this.backlightState = true;
  this.sensorText = '';

  process.on('SIGINT', () => {
    self.release();
  });

  process.on('SIGTERM', () => {
    self.release();
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

LCDModule.prototype.setBacklight = function setBacklight(state) {
  this.lcd.setBacklight(state);
  this.backlightState = state;
};

LCDModule.prototype.backlightToggle = function backlightToggle() {
  if (this.backlightState) {
    this.setBacklight(false);
  } else {
    this.setBacklight(true);
  }
};

LCDModule.prototype.blinkBacklight = function blinkBacklight(blinkEnable) {
  if (blinkEnable) {
    if (!this.blinkInterval) {
      this.blinkInterval = setInterval(() => {
        this.backlightToggle();
      }, 500);
    }
  } else {
    this.setBacklight(true);
    clearInterval(this.blinkInterval);
  }
};

LCDModule.prototype.setText = function setText(msg) {
  this.reset();
  this.message(msg);
};

LCDModule.prototype.reset = function reset() {
  this.clear();
};

LCDModule.prototype.release = function release() {
  this.blinkBacklight(false);
  this.lcd.release();
};

/*
Specialized functions
 */

LCDModule.prototype.displaySensor = function displaySensor(params) {
  // const length = params.text.length() + params.value.length() + params.unit.length() + 1;
  const dispString = `${params.text} ${params.value}${params.unit}`;
  // console.log((`${dispString}                `));
  if (dispString.length <= 16) {
    this.message((`${dispString}                `).substr(0, 15));
  } else {
    this.message((`${params.text}                `).substr(0, 15), 1);
    this.message((`${params.value}${params.unit}                `).substr(0, 15), 2);
  }
};

module.exports = LCDModule;
