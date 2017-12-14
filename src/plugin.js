'use strict'

const eachOf = require('async').eachOf
const debug = require('debug')('metalsmith-elasticlunr')
const setConfig = require('./config')
const createIndex = require('./liblunr').createIndex
const indexer = require('./indexer')

const plugin = params => {
  const options = setConfig(params)
  const index = createIndex(options)

  return (files, metalsmith, done) => {
    const indexFile = indexer(options, index)

    eachOf(files, indexFile, err => {
      if (err) throw err
      files[options.destFile] = {
        contents: new Buffer(JSON.stringify(index.toJSON()))
      }
      debug('elasticlunr indexing completed')
      done()
    })
  }
}

module.exports = plugin
