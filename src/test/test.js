#!/usr/bin/env node --use_strict

import rowsDiff from '../..';

var old_rows = [
  { id: 1, name: 'Jack Brower' },
  { id: 2, name: 'John Lock' },
];

var new_rows = [
  { id: 1, name: 'Jack Bower' },
  { id: 3, name: 'Scooby-Doo' },
];

var diff = rowsDiff(old_rows, new_rows, 'id');

console.log(diff);
