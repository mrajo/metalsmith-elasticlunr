'use strict'

const debug = require('debug')('metalsmith-elasticlunr')
const myLunr = require('./liblunr')

// applies preprocess functions to document
const applyPreprocessers = (file, options, doc) => {
  options.fields.forEach(field => {
    let val = file[field].toString()

    if (field === 'contents' && typeof options.preprocess === 'function') {
      val = options.preprocess.call(this, file[field].toString())
    }

    doc[field] = val
  })

  return doc
}

// creates indexer function for async interator with bindings for index and options
const indexerFn = (options, index) => {
  return (file, path, done) => {
    if (file[options.indexingKey]) {
      let doc = myLunr.initializeDoc(file, options, path)
      doc = applyPreprocessers(file, options, doc)
      index.addDoc(doc)
      debug(`indexing ${path}`)
      done()
    } else {
      debug(`skipped ${path}`)
      done()
    }
  }
}

module.exports = indexerFn
