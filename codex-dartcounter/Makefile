SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help

PORT ?= 8081
PLANTUML ?= plantuml
PAGES_BRANCH ?= gh-pages

.PHONY: help test test-watch serve check uml adr-list deploy-ghpages clean

help:
	@echo "Available targets:"
	@echo "  make test        - Run domain tests"
	@echo "  make test-watch  - Run tests in watch mode"
	@echo "  make serve       - Serve SPA locally (PORT=$(PORT))"
	@echo "  make check       - Run required quality checks"
	@echo "  make uml         - Render UML diagrams with PlantUML"
	@echo "  make adr-list    - List ADR documents"
	@echo "  make deploy-ghpages - Deploy this SPA to $(PAGES_BRANCH) branch"
	@echo "  make clean       - Remove local gh-pages worktree"

test:
	node --test tests/domain.test.mjs

test-watch:
	node --test --watch tests/domain.test.mjs

serve:
	python3 -m http.server $(PORT)

check: test

uml:
	$(PLANTUML) -tpng docs/uml/*.puml

adr-list:
	@ls -1 adr/*.md | sed 's#^#- #'

deploy-ghpages:
	@git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not a git repo"; exit 1; }
	@git remote get-url origin >/dev/null 2>&1 || { echo "No 'origin' remote set"; exit 1; }
	rm -rf .gh-pages
	git worktree add -B $(PAGES_BRANCH) .gh-pages
	rsync -av --delete \
		--exclude '.git' --exclude '.gh-pages' \
		./ .gh-pages/
	touch .gh-pages/.nojekyll
	cp -f .gh-pages/index.html .gh-pages/404.html
	cd .gh-pages && git add . && (git commit -m "Deploy dartcounter SPA" || true) && git push -u origin $(PAGES_BRANCH)
	git worktree remove .gh-pages

clean:
	rm -rf .gh-pages
