import equal from 'deep-equal';

function rowsDiff(old_rows, new_rows, keyfield = '_id') {
  // Check parameters

  if(!Array.isArray(old_rows)) throw TypeError('old_rows must be an array');
  if(!Array.isArray(new_rows)) throw TypeError('new_rows must be an array');

  if(typeof keyfield !== 'string' || keyfield.length === 0)
    throw TypeError('keyfield myst be a non-empty string');

  // Create mappings

  var old_map = {};

  old_rows.forEach(old_row => {
    if(!(keyfield in old_row)) throw new Error('All rows in old_rows must contain keyfield');
    old_map[old_row[keyfield]] = old_row;
  });

  var new_ids = {};

  new_rows.forEach(new_row => {
    if(!(keyfield in new_row)) throw new Error('All rows in new_rows must contain keyfield');
    new_ids[new_row[keyfield]] = true;
  });

  // Create diffs

  var added = new_rows.filter(new_row => ! (new_row[keyfield] in old_map));

  var removed = old_rows.filter(old_row => ! (old_row[keyfield] in new_ids))
    .map(row => row[keyfield]);

  var changed = new_rows.filter(new_row => (new_row[keyfield] in old_map) && !equal(new_row, old_map[new_row[keyfield]]));

  // Return diff

  if(added.length || removed.length || changed.length) {
    return {
      added: added.length !== 0 ? added : null,
      removed: removed.length !== 0 ? removed : null,
      changed: changed.length !== 0 ? changed: null,
    };
  }
}

export default rowsDiff;
export { rowsDiff };
