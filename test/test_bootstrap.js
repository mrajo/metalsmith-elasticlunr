'use strict'

const test = require('tape')
const Metalsmith = require('metalsmith')
const plugin = require('../src/plugin')
const elasticlunr = require('elasticlunr')
const assert = require('./libassert')

test('Test bootstrap option', (t) => {
  var src = 'test/fixtures/bootstrap'

  Metalsmith(src)
    .use(plugin({
      bootstrap: function () {
        const dummyPipelineFn = (token) => token
        elasticlunr.Pipeline.registerFunction(dummyPipelineFn, 'dummy')
        this.pipeline.after(elasticlunr.trimmer, elasticlunr.Pipeline.getRegisteredFunction('dummy'))
      },
    }))
    .build(assert.dirsEqual(t, src, 'index created'))
})

test('Test index contents', (t) => {
  const data = require('./fixtures/bootstrap/build/index.json')
  const index = elasticlunr.Index.load(data)
  t.deepEqual(index.pipeline.toJSON(), [ 'trimmer', 'dummy', 'stopWordFilter', 'stemmer' ], 'pipeline modified')
  t.end()
})