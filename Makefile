nodebin = node_modules/.bin/

node_modules: package.json
	@yarn

test: node_modules
	@$(nodebin)tap --cov --reporter=spec --jobs=10 test/test*.js

.PHONY: test
