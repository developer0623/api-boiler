#!/usr/bin/env node

var fs = require('fs');
var Mustache = require('mustache');

var locales = [
  'en',
];

/**
 * Updates the component library's locale JSON with the shared locale JSON
 * of the parent project.
 * 
 * NOTE: This has been implemented as a workaround for not being able to
 * dynamically load the shared locale JSON file in the component library's
 * `locale-<locale>.ts` file. This seems to be a limitation of `ng-packagr` and
 * could be resolved in future releases, or by someone smarter than me ;)
 * 
 * @param {string} locale - A two-character locale string (e.g. 'en').
 */
var updateComponentLibLocaleJSON = function (locale) {
  locale = locale.toLowerCase().trim();
  
  // Location of the component locale definition file for this locale (required by `ng-packagr`).
  var componentLibLocaleJSONPath = './src/components/locale-' + locale + '.ts';
  
  // Location of the generic locale definition file Mustache template.
  var componentLocaleJSONTemplatePath = './src/components/locale.ts.mustache';
  
  // Location of the shared locale JSON file for this locale.
  var sharedLocaleJSONPath = './src/assets/locale-' + locale + '.json';

  // Read the shared JSON for this locale, render the Mustache template with
  // that JSON and save the output to the component lib's locale JSON file for
  // this locale.
  var sharedLocaleJSON = fs.readFileSync(sharedLocaleJSONPath).toString();
  var componentLocaleJSONTemplate = fs.readFileSync(componentLocaleJSONTemplatePath).toString();
  var updatedComponentLocaleJSON =
    Mustache.render(componentLocaleJSONTemplate, { localeJSON: sharedLocaleJSON });
  fs.writeFileSync(componentLibLocaleJSONPath, updatedComponentLocaleJSON);
};

for (var i = 0; i < locales.length; i++) {
  updateComponentLibLocaleJSON(locales[i]);
}
