#include <cstdio>
#include <bcm2835.h>

#include "./libraries/robotois-timer/AccurateTiming.h"
#include "./LCDModule.h"

void i2c_init();
void i2c_end();

int main(int argc, char const *argv[]) {
  i2c_init();
  LCDModule *lcd = new LCDModule();
  uint16_t counter = 0;
  while (true) {
    lcd->home();
    lcd->message("Counting: " + std::to_string(counter));
    counter += 10;
    mDelay(1000);
  }
  i2c_end();
  return 0;
}

void i2c_init() {
  uint16_t clkDiv = BCM2835_I2C_CLOCK_DIVIDER_626;

  if(!bcm2835_init()){
    printf("BCM2835 Error!!!\n");
  }

  bcm2835_i2c_begin();

  bcm2835_i2c_setClockDivider(clkDiv);
}

void i2c_end() {
  bcm2835_i2c_end();
  bcm2835_close();
}
