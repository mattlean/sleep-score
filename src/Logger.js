/**
 * Simulate the Logger.info function on Apps Script:
 * https://developers.google.com/apps-script/reference/base/logger
 */
class MockLogger {
  static info(arg) {
    console.log(arg);
  }
}

global.Logger = MockLogger;
