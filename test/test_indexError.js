"use strict";

const tap = require("tap");
const Metalsmith = require("metalsmith");
const plugin = require("../src/plugin");

tap.test("Test error during indexing", t => {
  var src = "test/fixtures/error";

  // use a preprocesser to throw an error during indexing
  Metalsmith(src)
    .use(
      plugin({
        preprocess: content => {
          throw new Error("test error");
        },
        silent: true
      })
    )
    .build(err => {
      t.ok(err, "Should have thrown an error");
      t.equal(err.message, "test error", "Correct error thrown");
      t.end();
    });
});
