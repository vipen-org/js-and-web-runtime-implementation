#!/bin/bash -euf

./node_modules/.bin/rollup -c cfg/bundle.rollup.mjs
./node_modules/.bin/rollup -c cfg/node.rollup.mjs
