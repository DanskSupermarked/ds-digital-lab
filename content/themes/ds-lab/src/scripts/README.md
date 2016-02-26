# Writing javascript code

Javascript is written in EcmaScript 6 and we are including [polyfill.io service](https://cdn.polyfill.io/v1/docs/)
to polyfill all modern functions.

ES6 code is translated into ES5 using [babeljs](https://babeljs.io/).

Read more about the javascript setup on [documentation site](https://documentation.dansksupermarked.dk/umbraco/code/style/frontend/javascript/).

## Use dependencies

A lot of common Dansk Supermarked javascript code have been placed as NPM packages in our private NPM registry.

Install these using npm and import them like:

```bash
npm install ds-api --save
```

```js
import dsApi from 'ds-api';

dsApi.get('stores');
```
