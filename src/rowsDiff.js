import equal from 'deep-equal';

function rowsDiff(old_rows, new_rows, options = {}) {
  // Check parameters

  if(!Array.isArray(old_rows)) throw TypeError('old_rows must be an array');
  if(!Array.isArray(new_rows)) throw TypeError('new_rows must be an array');

  // Get keyfield

  let keyfield = '_id';

  if(typeof options === 'string') {
    keyfield = options;
  }
  else if(typeof options === 'object' && options.keyfield) {
    keyfield = options.keyfield;
  }

  if(typeof keyfield !== 'string' || keyfield.length === 0)
    throw TypeError('keyfield must be a non-empty string');

  // Get equalFunc

  let equalFunc = equal;

  if(typeof options === 'object' && options.equalFunc) {
    equalFunc = options.equalFunc;
  }

  if(typeof equalFunc !== 'function')
    throw TypeError('equalFunc must be a function');

  // Create mappings

  var old_map = {};

  old_rows.forEach(old_row => {
    if(!(keyfield in old_row)) throw new Error('All rows in old_rows must contain keyfield');
    // NOTE possibly test for uniqueness
    old_map[old_row[keyfield]] = old_row;
  });

  var new_ids = {};

  new_rows.forEach(new_row => {
    if(!(keyfield in new_row)) throw new Error('All rows in new_rows must contain keyfield');
    // NOTE possibly test for uniqueness
    new_ids[new_row[keyfield]] = true;
  });

  // Create diffs

  var added = new_rows.filter(new_row => ! (new_row[keyfield] in old_map));

  var removed = old_rows.filter(old_row => ! (old_row[keyfield] in new_ids))
    .map(row => row[keyfield]);

  var changed = new_rows.filter(new_row => (new_row[keyfield] in old_map) && !equalFunc(new_row, old_map[new_row[keyfield]]));

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
