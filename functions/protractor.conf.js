// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const BeautifulReporter = require('protractor-beautiful-reporter')

// var today = new Date();
// var timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm-' + today.getSeconds() + 's';
// var titleReport = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
// var reporter = new HtmlScreenshotReporter({
//   userCss: '../../functions/e2e/my-report-styles.css',
//   dest: '../e2e-report',
//   // dest: './e2e/Screenshots' + timeStamp,
//   filename: 'index.html',
//   preserveDirectory: true,
//   reportOnlyFailedSpecs: false,
//   captureOnlyFailedSpecs: false,
//   displayStacktrace: false,
//   reportTitle: "Report " + titleReport,
//   reportFailedUrl: true,

// });

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'loggingPrefs': {
      'driver': 'WARNING',
      'server': 'WARNING',
      'browser': 'INFO'
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },

  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(new BeautifulReporter({
      baseDirectory: '../e2e-report',
    }).getJasmine2Reporter());
  }
};
