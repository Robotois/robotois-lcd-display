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
  this.prevMessage = '';
  this.blinkInterval = false;

  process.on('SIGINT', () => {
    self.release();
  });

  process.on('SIGTERM', () => {
    self.release();
  });
}

const buildMessage = (currentMessage, prevMessage) => {
  /*
  Fill with empty spaces to clear prev message completely, thi is performed so it won't
  be necessary to RESET the LCD display entirely each time there is a new message, because in that
  case it will be produced a little flash.
   */
  if (prevMessage.length > currentMessage.length) {
    return currentMessage.concat(' '.repeat(prevMessage.length - currentMessage.length));
  }
  return currentMessage;
};

LCDModule.prototype.publishNow = function publishNow() {
  this.mqttClient.publish(this.myTopic, this.prevMessage);
};

LCDModule.prototype.setMqttClient = function setMqttClient(mqttConfig) {
  this.mqttClient = mqttConfig.mqttClient;
  this.myTopic = `displays/lcd${mqttConfig.instance}`;
};

LCDModule.prototype.message = function message(msg) {
  if (this.prevMessage !== msg) {
    this.lcd.home();
    this.lcd.message(buildMessage(msg, this.prevMessage));
    if (this.mqttClient) {
      this.mqttClient.publish(this.myTopic, msg);
    }
    this.prevMessage = msg;
  }
};

LCDModule.prototype.setCursor = function setCursor(row, col) {
  this.lcd.setCursor(row, col);
};

LCDModule.prototype.clear = function clear() {
  this.lcd.clear();
  this.prevMessage = '';
};

LCDModule.prototype.home = function home() {
  this.lcd.home();
};

LCDModule.prototype.setBacklight = function setBacklight(state) {
  this.lcd.setBacklight(state);
  this.backlightState = state;
  clearInterval(this.blinkInterval);
  this.blinkInterval = false;
};

LCDModule.prototype.backlightToggle = function backlightToggle() {
  if (this.backlightState) {
    this.setBacklight(false);
  } else {
    this.setBacklight(true);
  }
};

LCDModule.prototype.blink = function blink(blinkEnable) {
  if (blinkEnable) {
    if (!this.blinkInterval) {
      this.blinkInterval = setInterval(() => {
        this.backlightToggle();
      }, 500);
    }
  } else {
    this.setBacklight(true);
    clearInterval(this.blinkInterval);
    this.blinkInterval = false;
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
  this.blink(false);
  this.lcd.release();
};

/*
Specialized functions
 */

LCDModule.prototype.displaySensor = function displaySensor(text, value, unit) {
  const dispString = `${text} ${value}${unit || ''}`;
  this.message(dispString);
};

module.exports = LCDModule;
