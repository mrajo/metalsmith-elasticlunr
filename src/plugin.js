'use strict'

const eachOf = require('async').eachOf
const elasticlunr = require('elasticlunr')
const debug = require('debug')('metalsmith-elasticlunr')

const plugin = params => {
  const mergeOptions = user_opts => {
    const defaults = {
      indexingKey: 'index',
      ref: 'path',
      fields: [ 'title', 'contents' ],
      destFile: 'index.json',
      bootstrap: null,
      preprocess: null
    }

    return Object.assign(defaults, user_opts)
  }

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

  const indexFile = (file, path, done) => {
    if (file[options.indexingKey]) {
      const doc = {}

      if (options.ref === 'path') {
        doc[options.ref] = path
      } else {
        doc[options.ref] = file[options.ref]
      }

      options.fields.forEach(field => {
        let val = file[field].toString()

        if (field === 'contents' && typeof options.preprocess === 'function') {
          val = options.preprocess.call(this, file[field].toString())
        }

        doc[field] = val
      })

      index.addDoc(doc)

      debug(`indexing ${path}`)
      done()
    } else {
      debug(`skipped ${path}`)
      done()
    }
  }

  const options = mergeOptions(params)
  const index = initializeIndex(options)

  return (files, metalsmith, done) => {
    eachOf(files, indexFile, err => {
      if (err) console.error(err)
      files[options.destFile] = {
        contents: new Buffer(JSON.stringify(index.toJSON()))
      }
      debug('elasticlunr indexing completed')
      done()
    })
  }
}

module.exports = plugin