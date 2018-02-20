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

    let docCount = 0
    Object.keys(files).forEach(file => {
      if (files[file][options.indexingKey]) {
        docCount++
      }
    })

    eachOf(files, indexFile, err => {
      if (err) throw err
      files[options.destFile] = {
        contents: new Buffer(JSON.stringify(index.toJSON()))
      }

      console.log(`elasticlunr indexing completed with ${docCount} documents.`)
      done()
    })
  }
}

module.exports = plugin
