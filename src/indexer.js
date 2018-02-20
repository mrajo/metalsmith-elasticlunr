'use strict'

const debug = require('debug')('metalsmith-elasticlunr')
const createDoc = require('./liblunr').createDoc

// creates indexer function for async interator with bindings for index and options
const getIndexer = (options, index) => {
  return (file, path, done) => {
    if (file[options.indexingKey]) {
      index.addDoc(createDoc(file, options, path))
      debug(`indexing ${path}`)
      done()
    } else {
      debug(`skipped ${path}`)
      done()
    }
  }
}

module.exports = getIndexer
