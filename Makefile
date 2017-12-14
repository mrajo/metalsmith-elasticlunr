nodebin = node_modules/.bin/

node_modules: package.json
	@yarn

test: node_modules
	@$(nodebin)tape test/test*.js | $(nodebin)tap-spec

coverage:
	@$(nodebin)nyc tape test/test*.js
	@$(nodebin)nyc report --reporter=lcov

.PHONY: test coverage
