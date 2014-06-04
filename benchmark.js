
var css = require('./')
  , fs = require('fs')
  , read = fs.readFileSync
  , str = read('examples/pet.css', 'utf8');

var n = 5000
   ,ops = 200
   ,t = []
   ,results = [];

while (n--) {
  css.compile('{name} is a {species}, he is {age} years old',str);
  if (n % ops === 0) {
    t = process.hrtime(t);
    var ms = t[1] / 1000 / 1000;
    var persec = (ops * (1000 / ms) | 0);
    results.push(persec);
    process.stdout.write('\r  [' + persec + ' ops/s] [' + n + ']');
    t = process.hrtime();
  }
}

function sum(arr) {
  return arr.reduce(function(sum, n){
    return sum + n;
  });
}

function mean(arr) {
  return sum(arr) / arr.length | 0;
}

console.log();
console.log('   avg: %d ops/s', mean(results));
console.log('  size: %d kb', (str.length / 1024).toFixed(2));