# rows-diff
Compares two sets of rows, usually coming from a database, and returns the difference.

# Usage
```javascript
import rowsDiff from 'rows-diff';

var old_rows = [
  { id: 1, name: 'Jack Brower' },
  { id: 2, name: 'John Lock' },
];

var new_rows = [
  { id: 1, name: 'Jack Bower' },
  { id: 3, name: 'Scooby-Doo' },
];

var diff = rowsDiff(old_rows, new_rows, 'id');

/*
diff = {
  added: [ { id: 3, name: 'Scooby-Doo' } ],
  removed: [ 2 ],
  changed: [ { id: 1, name: 'Jack Bower' } ]
}
*/
```

# let diff = rowsDiff(old_rows, new_rows, [options])

Compares two sets of rows, usually coming from a database, and returns the difference.

Every row must have a field that uniquely identifies the row. This is used to
properly determine which rows were added, changed or deleted. By default this field
is `_id`. You can specify a different `keyfield` with `options`.

Rows that exist in both sets (with equal `keyfield`) are compared using `deep-equal`. You can specify a different
`equalFunc` with `options`. For instance, if every row contains a hash of its contents, `equalFunc` could look like this:

```javascript
function equalHash(old_row, new_row) { return old_row.hash === new_row.hash }
```

## parameters
`old_rows`: array of objects.

`new_rows`: array of objects.

`options`: Either an Object or a String (optional). See below for the possible fields. If `options` is a string, it represents the `keyfield` below.

`options.keyfield`: String. The field to use as a unique key (default: `_id`). Must be present in every row.

`options.equalFunc`: function(old_row, new_row). An optional function to compare two rows (default: `deep-equal`).

## returns

If both sets of rows are equal, returns `undefined`

Otherwise it returns an object with the following fields:

`added`: array of rows that are in `new_rows`, but not in `old_rows`
`changed`: array of rows from `new_rows` existed in `old_rows` but have changed
`deleted`: array if the key's from the rows from `old_rows` that don't exist in `new_rows`

If any of those array's is empty, it is set to `undefined`.
