"use strict";

const tap = require("tap");
const Metalsmith = require("metalsmith");
const plugin = require("../src/plugin");
const elasticlunr = require("elasticlunr");
const assert = require("./libassert");

tap.test("Test ref option", t => {
  var src = "test/fixtures/ref";

  Metalsmith(src)
    .use(
      plugin({
        ref: "title",
        silent: true
      })
    )
    .build(assert.indexCreated(t, src));
});

tap.test("Test index contents", t => {
  const data = require("./fixtures/ref/build/index.json");
  const index = elasticlunr.Index.load(data);
  t.equal(
    Object.keys(index.documentStore.docs).length,
    4,
    "index has 4 documents"
  );
  t.deepEqual(
    Object.keys(index.documentStore.docs).sort(),
    ["Four", "One", "Three", "Two"],
    "index ID by title"
  );
  t.end();
});
