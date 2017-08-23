// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var today = new Date();
var timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm-' + today.getSeconds() + 's';
var titleReport = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
var reporter = new HtmlScreenshotReporter({
  userCss: '../../my-report-styles.css',
  dest: './e2e/report',
  // dest: './e2e/Screenshots' + timeStamp,
  filename: 'index.html',
  preserveDirectory: true,
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: false,
  displayStacktrace: false,
  reportTitle: "Report " + titleReport,
  reportFailedUrl: true,

});


const argv = require('yargs').argv;

const config = {
  allScriptsTimeout: 11000,

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

  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },

  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    if (!argv.bdd) {
      jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
      jasmine.getEnv().addReporter(reporter);
    }
  },

};

if (argv.bdd) {
  config.useAllAngular2AppRoots= true;
  config.framework = 'custom';
  // path relative to the current config file
  config.frameworkPath = require.resolve('protractor-cucumber-framework');
  config.specs = ['./e2e/features/**/*.feature'];
  config.cucumberOpts = {
    require: ["./e2e/features/step_definitions/*.steps.ts"],
    tags: false,
    profile: false,
    'no-source': true
  }
} else {
  config.framework = 'jasmine';
  config.specs = ['./e2e/**/*.e2e-spec.ts'];
  config.jasmineNodeOpts = {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  };
}

exports.config = config;

