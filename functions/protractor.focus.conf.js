// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// const { SpecReporter } = require('jasmine-spec-reporter');
// const BeautifulReporter = require('protractor-beautiful-reporter')

exports.config = {
  allScriptsTimeout: 11000,
  // specs: [
  //   './e2e/**/*.e2e-spec.ts'
  // ],
  capabilities: {
    'browserName': 'chrome',
    'loggingPrefs': {
      'driver': 'WARNING',
      'server': 'WARNING',
      'browser': 'INFO'
    },
    metadata: {
      browser: {
        name: 'chrome',
      },
      device: 'MacBook Pro',
      platform: {
        name: 'OSX',
        version: '10.11.6'
      }
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  // framework: 'jasmine',
  // jasmineNodeOpts: {
  //   showColors: true,
  //   defaultTimeoutInterval: 30000,
  //   print: function () { }
  // },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: [
    'e2e/cucumber/features/*.feature'
  ],

  cucumberOpts: {
    require: [
      'e2e/cucumber/steps/*.ts'
    ],
    format: 'json:../e2e-report/results.json',
    strict: true,
    tags: ['@focus'],
  },

  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        automaticallyGenerateReport: true,
        openReportInBrowser: true,
        removeOriginalJsonReportFile: true,
        removeExistingJsonReportFile: true,
      }
    },
  ],

  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    browser.waitForAngularEnabled(false);
    // jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    // jasmine.getEnv().addReporter(new BeautifulReporter({
    //   baseDirectory: '../e2e-report',
    // }).getJasmine2Reporter());
  }
};
