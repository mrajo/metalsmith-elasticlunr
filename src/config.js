'use strict'

const defaults = {
  indexingKey: 'index',
  ref: 'path',
  fields: [ 'title', 'contents' ],
  destFile: 'index.json',
  bootstrap: null,
  preprocess: null
}

// preprocess should be an array of functions
// if a function is passed in, convert it to an array of 1 function
const initializePreprocess = options => {
  if (typeof options.preprocess === 'function') {
    const pipeline = []
    pipeline.push(options.preprocess)
    options.preprocess = pipeline
  }
  return options
}

const setConfig = user_options => {
  const options = Object.assign({}, defaults, user_options)
  return initializePreprocess(options)
}

module.exports = setConfig
