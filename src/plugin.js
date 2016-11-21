'use strict'

const each = require('async').each
const elasticlunr = require('elasticlunr')
const debug = require('debug')('metalsmith-elasticlunr')

const plugin = (params) => {
  const defaults = {
    indexingKey: 'index',
    ref: 'path',
    fields: [ 'title', 'contents' ],
    destFile: 'index.json',
    bootstrap: null,
    preprocess: null
  }
  const options = Object.assign(defaults, params)

  return function (files, metalsmith, done) {
    const index = elasticlunr(function () {
      this.setRef(options.ref)

      options.fields.forEach((field) => {
        this.addField(field)
      })

      if (options.bootstrap != null) {
        options.bootstrap.call(this)
      }
    })

    const indexFile = (file, done) => {
      if (files[file][options.indexingKey]) {
        const doc = {}

        if (options.ref === 'path') {
          doc[options.ref] = file
        } else {
          doc[options.ref] = files[file][options.ref]
        }

        options.fields.forEach((field) => {
          let val = files[file][field].toString()

          if (field === 'contents' && typeof options.preprocess === 'function') {
            val = options.preprocess.call(this, files[file][field].toString())
          }

          doc[field] = val
        })

        index.addDoc(doc)

        debug(`indexing ${file}`)
        done()
      } else {
        debug(`skipped ${file}`)
        done()
      }
    }

    each(Object.keys(files), indexFile, (err) => {
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