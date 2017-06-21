{
  "targets": [
    {
      "target_name": "LCDModule",
      "sources": [ "src/wrapper/LCDModule.cpp","src/wrapper/LCDWrapper.cpp",
      "src/LCDModule.cpp",
      "src/libraries/robotois-MCP23008/MCP23008.cpp",
      "src/libraries/robotois-timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
