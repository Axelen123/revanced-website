#!/bin/bash

set -e

docs_git_repo="${REVANCED_DOCS_REPO:-https://github.com/revanced/revanced-documentation.git}"
export REVANCED_DOCS_FOLDER="_docs_src"

git clone "$docs_git_repo" "$REVANCED_DOCS_FOLDER"

# Do this because the docs repo doesn't have any actual docs right now
cd "$REVANCED_DOCS_FOLDER"
cp README.md index.md
cd ..

npm run build
