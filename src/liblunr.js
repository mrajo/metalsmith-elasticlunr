'use strict'

const elasticlunr = require('elasticlunr')

const createIndex = options => {
  // this refers to the index object
  return elasticlunr(function () {
    this.setRef(options.ref)

    options.fields.forEach(field => {
      this.addField(field)
    })

    if (options.bootstrap != null) {
      options.bootstrap.call(this)
    }
  })
}

// initialize lunr document with ref set
const createDoc = (file, options, path) => {
  const doc = {}

  if (options.ref === 'path') {
    doc[options.ref] = path
  } else {
    doc[options.ref] = file[options.ref]
  }

  return fillDoc(file, options, doc)
}

// copies fields from file object and applies preprocess functions on content
const fillDoc = (file, options, doc) => {
  options.fields.forEach(field => {
    let val = file[field].toString()

    if (field === 'contents' && typeof options.preprocess === 'function') {
      val = options.preprocess.call(this, file[field].toString())
    }

    doc[field] = val
  })

  return doc
}

module.exports = {
  createIndex: createIndex,
  createDoc: createDoc
}
