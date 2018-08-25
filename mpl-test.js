const MPL = require('./mpl');

(function() {
  const mpl = new MPL(2, 2);

  mpl.add('test1', 0, 0, 0, 0, 4, 4);
  mpl.add('test1', 0, 0, 0, 1, 4, 4);
  mpl.add('test1', 0, 0, 1, 0, 4, 4);
  mpl.add('test1', 0, 0, 1, 1, 4, 4);


  console.log(mpl.toString('test1'));
})();

(function() {
  const mpl = new MPL(2, 2);

  mpl.add('test1', 1, 0, 2, 0, 4, 4);
  mpl.add('test1', 1, 0, 3, 0, 4, 4);
  mpl.add('test1', 1, 0, 2, 1, 4, 4);
  mpl.add('test1', 1, 0, 3, 1, 4, 4);


  console.log(mpl.toString('test1'));
})();

(function() {
  const mpl = new MPL(2, 2);

  mpl.add('test1', 0, 1, 0, 2, 4, 4);
  mpl.add('test1', 0, 1, 1, 2, 4, 4);
  mpl.add('test1', 0, 1, 0, 3, 4, 4);
  mpl.add('test1', 0, 1, 1, 3, 4, 4);


  console.log(mpl.toString('test1'));
})();

(function() {
  const mpl = new MPL(2, 2);

  mpl.add('test1', 1, 1, 2, 2, 4, 4);
  mpl.add('test1', 1, 1, 3, 2, 4, 4);
  mpl.add('test1', 1, 1, 2, 3, 4, 4);
  mpl.add('test1', 1, 1, 3, 3, 4, 4);


  console.log(mpl.toString('test1'));
})();