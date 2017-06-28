const rowsDiff = require('..').default;

console.log(rowsDiff);

var old_rows = [
  { id: 1, name: 'Jack Brower' },
  { id: 2, name: 'John Lock' },
];

var new_rows = [
  { id: 1, name: 'Jack Bower' },
  { id: 3, name: 'Scooby-Doo' },
];

describe("rowsDiff", function() {
  it("Test diff", function() {
    var diff = rowsDiff(old_rows, new_rows, 'id');

    expect(diff).toEqual({ 
      added: [ { id: 3, name: 'Scooby-Doo' } ],
      removed: [ 2 ],
      changed: [ { id: 1, name: 'Jack Bower' } ],
    });
  });
});
