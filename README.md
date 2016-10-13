# rows-diff
Compares two sets of rows, usually coming from a database, and returns the difference.


//
// If one of those arrays are empty, it is set to undefined
// If all arrays are empty, the result of the function will be undefined


# Usage
```javascript

var rowsDiff = require('rows-diff').rowsDiff;

var old_rows = [
  { id: 1, name: 'Jack Brower' },
  { id: 2, name: 'John Lock' },
];

var new_rows = [
  { id: 1, name: 'Jack Bower' },
  { id: 3, name: 'Scooby Doo' },
];

var diff = rowsDiff(old_rows, new_rows, 'id');
```

# rowsDiff(old_rows, new_rows, [keyfield])

Compares two sets of rows, usually coming from a database, and returns the difference.

## parameters
old_rows: array of objects

new_rows: array of objects

keyfield: string, name of the field that uniquely identifies each row. Must be present in every row. Default: `_id`

## returns

If both sets of rows are equal, returns `undefined`

Otherwise it returns an object with the following fields

added: array of rows that are in `new_rows`, but not in `old_rows`
changed: array of rows from `new_rows` existed in `old_rows` but have changed
deleted: array if the key's from the rows from `old_rows` that don't exist in `new_rows`

If any of those array's is empty, it is set to `undefined`
