"use strict";

const tap = require("tap");
const Metalsmith = require("metalsmith");
const plugin = require("../src/plugin");
const elasticlunr = require("elasticlunr");
const assert = require("./libassert");

tap.test("Test destFile option", t => {
  var src = "test/fixtures/destFile";

  Metalsmith(src)
    .use(
      plugin({
        destFile: "foo.json"
      })
    )
    .build(assert.indexCreated(t, src, "foo"));
});
