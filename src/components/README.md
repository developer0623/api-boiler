Moon-Lite Components

Installation
============
```
npm install moon-lite-0.0.0.tgz --save
```

How to use
==========

1) In your `angular-cli.json` file, please add below code:

```angular-cli.json
"assets": [
  { "glob": "**/*", "input": "../node_modules/moon-lite/assets", "output": "./assets" },
  "assets",
  "favicon.ico"
]

"styles": [
  "styles.css",
  "../node_modules/moon-lite/assets/moon-lite-components/styles/styles.scss"
]
```

If there is a `styles.scss`, please add below code there:
```styles.scss
@import '../node_modules/bootstrap/scss/bootstrap';
```

If there is a `styles.css`, please add below code in the `head` tag of `index.html`:
```index.html
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">
```

2) In your app module, import the NgModule for each component you want to use:

```typescript
import { HeaderModule, FacilitatorOverviewModule } from 'moon-lite';

@NgModule({
  imports: [
    HeaderModule,
    FacilitatorOverviewModule
  ]
})
export class AppModule {}
```

