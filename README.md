# MoonLite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further command line help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Style/Coding Guidelines

* Indent using 2 spaces.
* Use boostrap 4 conventions where possible. If bootstrap has it defined, do not redefine the style.
  - For example: if you see something that needs to be centered use `mx-auto` or `text-center` from bootstrap rather than defining a SaSS class that has `margin: 0 auto;` or `text-align: center;`
* **DO NOT** use the [Bootstrap components](https://getbootstrap.com/docs/4.0/components). These components are JavaScript based components that we are not using. Please use [ng-boostrap](https://ng-bootstrap.github.io/#/home) components instead.
* **NOTE:** Do not copy the SCSS logic directly from Zeplin. It is bloated and does not conform to our application.
* You can check out a simple example of how to implement our SaSS Mixins and Variables in the `app.component.scss` along with how to use the Proxima Nova font that is listed in the SaSS fonts file.
* Please take advantage of an editor that will use the provided tslint.json
* We have specific lint rules configured. Please run `npm run lint` before submitting your code and ensure all lint violations are fixed before committing.
* Create content with a focus on iPad constraints.
  * Use Chrome mobile device set to iPad, if possible ([developers.google.com](https://developers.google.com/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports))
* Always use `ViewEncapsulation.None` in the `@component` options.
* Define all colors with a SASS variable in the `_variables.scss` file.
* `font-weight` should not be used. Use `font-family` to select the appropriate font variation.
* All images, icons and their directories should have lowercase names and use a snake-case or kebab-case naming convention i.e. `motives_triangle@1px.png` or `motives-triangle@1px.png`
* Only include images used by your code.
* Add `trackBy` for `ngFor` loops. Here's an example `trackBy` function:
  ```
  public trackStringItem(index: any, item: string): string {
    return item ? item : index;
  }
  ```
* Do not use class names as a way to describe the visual appearance of the element(s) they apply to. Class names should have semantic meaning i.e. if this is a member filter label please use `member-filter-label` and allow the stylesheet to handle compositing the visual styles as appropriate.
* Keep all styles local to the component directory. Do not modify global styles.


## Localization (l10n)

To directly replace element content with translated static content:
```html
<div class="hello-message" l10nTranslate>common_hello_message</div>
```

When you need to do something to the string like interpolate a value (translated
content that includes the username or validation messages that include dynamic
values like min/max lengths), just translate the value in the component
typescript using TranslationService
```json
common_hello_user = "Hello, %{user}. Welcome to your dashboard."
```
```javascript
  private translateHelloTemplate() {
    const exampleUser = 'Random User';
    this.translatedHello = this.appService.replaceTranslationTemplate(
      this.translationService.translate('common_hello_user'),
      { user: exampleUser }
    );
  }
```
then use string interpolation as you would any other dynamic content.
```html
<div class="hello-message">{{ translatedHello }}</div>
```

Sometimes translated content will need values replaced _and_ contain html, which
would be escaped in the previous example.  Let's code as if the previous example
wrapped the `%{user}` value in a span to change the color of the text.
```json
common_hello_user = "Hello, <span class=\"color blue\">%{user}</span>. Welcome to your dashboard."
```
In this case, you can do the interpolation and translation in the component
typescript and then render it in the page by binding it to the innerHtml
attribute of the containing element to avoid escaping the html:
```html
<div class="hello-message" [innerHtml]="translatedHello"></div>
```

*app/pages/example/example.component.ts*
```javascript
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { template, templateSettings } from 'lodash';

@Component({
  selector: 'app-example-component',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./example.component.scss'],
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit, OnDestroy {
  @Language() lang: string;
  public translatedHello: string = '';

  constructor(
    public translationService: TranslationService
  ) { }

  public ngOnInit() {
    console.log('Initializing the example component');

    this.translateHelloTemplate();
  }

  public ngOnDestroy() {
    console.log('Destroying the example component');
  }

  public translateHelloTemplate(): void {
    const user = { fullName: 'Random User' }
    this.translatedHello = this.replaceTranslationTemplate(
      // common_hello_user = "Hello, %{user}. Welcome to your dashboard."
      this.translationService.translate('common_hello_user'),
      { user: user.fullName }
    );
  }

  public replaceTranslationTemplate(translatedText: string, replacementObject: any): string {
    templateSettings.interpolate = /%{([\s\S]+?)}/g;
    const compiled = template(translatedText);
    return compiled(replacementObject);
  }
}
```
