CC=g++

COMPILE_FLAGS = -g -std=c++11 -Wall -c
LINKER_FLAGS = -g
LIBS = -l bcm2835 -l rt

OBJECTS = \
	test.o \
	MCP23008.o \
	LCDModule.o \
	AccurateTiming.o

#OBJECTS = $(subst .cpp,.o,$(SOURCES))

all: ads.o lcd.o timer.o main.o
	$(CC) $(LINKER_FLAGS) -o runner $(OBJECTS) $(LIBS)

main.o: test.cpp
	$(CC) $(COMPILE_FLAGS) test.cpp
ads.o: libraries/robotois-MCP23008/MCP23008.cpp libraries/robotois-MCP23008/MCP23008.h
	$(CC) $(COMPILE_FLAGS) libraries/robotois-MCP23008/MCP23008.cpp
timer.o: libraries/robotois-timer/AccurateTiming.cpp libraries/robotois-timer/AccurateTiming.h
	$(CC) $(COMPILE_FLAGS) libraries/robotois-timer/AccurateTiming.cpp
lcd.o: LCDModule.cpp LCDModule.h
	$(CC) $(COMPILE_FLAGS) LCDModule.cpp

clean:
	$(RM) $(OBJECTS) runner
