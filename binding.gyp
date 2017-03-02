{
  "targets": [
    {
      "target_name": "LCDModule",
      "sources": [ "LCDModule.cpp","LCDWrapper.cpp",
      "src/Modules/LCD/LCDModule.cpp",
      "src/Libraries/MCP23008/MCP23008.cpp",
      "src/Libraries/Timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
