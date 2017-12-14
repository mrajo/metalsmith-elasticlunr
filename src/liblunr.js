'use strict'

const elasticlunr = require('elasticlunr')

const initializeIndex = options => {
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
const initializeDoc = (file, options, path) => {
  const doc = {}

  if (options.ref === 'path') {
    doc[options.ref] = path
  } else {
    doc[options.ref] = file[options.ref]
  }

  return doc
}

module.exports = {
  initializeIndex: initializeIndex,
  initializeDoc: initializeDoc
}
