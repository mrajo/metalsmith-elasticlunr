"use strict";

const tap = require("tap");
const Metalsmith = require("metalsmith");
const plugin = require("../src/plugin");
const elasticlunr = require("elasticlunr");
const assert = require("./libassert");

tap.test("Test fields option", t => {
  var src = "test/fixtures/fields";

  Metalsmith(src)
    .use(
      plugin({
        ref: "title",
        fields: ["title"],
        silent: true
      })
    )
    .build(assert.indexCreated(t, src));
});

tap.test("Test index contents", t => {
  const data = require("./fixtures/fields/build/index.json");
  const index = elasticlunr.Index.load(data);
  t.deepEqual(
    index.documentStore.docs,
    { One: { title: "One" } },
    "index only has title fields"
  );
  t.end();
});
