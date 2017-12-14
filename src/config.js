'use strict'

const defaults = {
  indexingKey: 'index',
  ref: 'path',
  fields: [ 'title', 'contents' ],
  destFile: 'index.json',
  bootstrap: null,
  preprocess: null
}

const setConfig = user_opts => {
  return Object.assign({}, defaults, user_opts)
}

module.exports = setConfig
