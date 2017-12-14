'use strict'

const path = require('path')
const fs = require('fs-extra')
const buffer_equal = require('buffer-equal')
const utf8 = require('is-utf8')
const readdir = require('fs-readdir-recursive')

// @t tape test object
// @src Metalsmith source folder
// assertions return a function to be used in Metalsmith.build() callback
module.exports = {
  indexCreated: (t, src, outFile = 'index') => {
    return err => {
      if (err) t.fail(`Metalsmith build failed: ${err.toString()}`)
      t.ok(fs.existsSync(path.join(src, 'build', `${outFile}.json`)), 'index created')
      t.end()
    }
  }
}
