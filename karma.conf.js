// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    crossOriginAttribute: false,
    files: [
      'https://www.amcharts.com/lib/3/amcharts.js',
      'https://www.amcharts.com/lib/3/pie.js',
      'https://www.amcharts.com/lib/3/serial.js',
      'https://www.amcharts.com/lib/3/themes/light.js',
      'https://www.amcharts.com/lib/3/themes/none.js',
      "node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    webpack: { node: { fs: 'empty' } },
    captureTimeout: 120000,
    browserDisconnectTolerance: 3, 
    browserDisconnectTimeout : 120000,
    browserNoActivityTimeout : 120000
  });
};
