nodebin = node_modules/.bin/

node_modules: package.json
	@yarn

test: node_modules
	@$(nodebin)tap --jobs=10 --reporter=specy test/test*.js

travis_test: node_modules
	@$(nodebin)tap --jobs=10 --reporter=terse --coverage-report=lcov test/test*.js

.PHONY: test
