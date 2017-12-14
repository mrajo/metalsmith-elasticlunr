# metalsmith-elasticlunr [![Build Status](https://travis-ci.org/mrajo/metalsmith-elasticlunr.svg)](https://travis-ci.org/mrajo/metalsmith-elasticlunr) [![Maintainability](https://api.codeclimate.com/v1/badges/8eafbfb9d2bd05190c92/maintainability)](https://codeclimate.com/github/mrajo/metalsmith-elasticlunr/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8eafbfb9d2bd05190c92/test_coverage)](https://codeclimate.com/github/mrajo/metalsmith-elasticlunr/test_coverage)

> A Metalsmith plugin for creating an elasticlunr.js search index

This plugin creates an [elasticlunr.js](http://elasticlunr.com) index JSON file
based on Metalsmith metadata.

## Install

```
npm install github:mrajo/metalsmith-elasticlunr
```

## Usage

```javascript
var Metalsmith = require('metalsmith');
var lunr = require('metalsmith-elasticlunr');

Metalsmith(__dirname)
    .use(lunr({
      // config
    }))
    .build();
```

The plugin accepts a configuration object as its only argument. These are the
available options.

### indexingKey
Type: `string`
Default: `index`

This is the name of the key in YAML front-matter to set whether the file will be
added to the index if it has a truthy value.

### ref
Type: `string`
Default: `path`

This sets the unique key in the index. By default, the key is the file path.

### fields
Type: `Array`
Default: `[ 'title', 'contents' ]`

This defines the fields in the search index per document. These fields must be
keys on the Metalsmith file object.

### destFile
Type: `string`
Default: `index.json`

The path the resulting index will be written.

### bootstrap
Type: `Function`
Default: `null`

This function will run when initializing the elasticlunr instance. This allows
configuring the index beyond `ref` and `fields`, such as pipeline functions.

## License

MIT © [Anthony Castle](http://github.com/mrajo)
