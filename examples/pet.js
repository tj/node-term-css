
var css = require('..')
  , fs = require('fs')
  , read = fs.readFileSync
  , style = read('examples/pet.css', 'utf8');

var tobi = {
  name: 'tobi',
  species: 'ferret',
  age: 2
};

var loki = {
  name: 'loki',
  species: 'ferret',
  age: 1
};

var fn = css.compile('  {name} is a {species}, he is {age} years old', style);

console.log();
console.log(fn(tobi));
console.log(fn(loki));

var fn = css.compile('  {name} is a {species}, he is {age} years old');
console.log(fn(tobi));
console.log(fn(loki));

console.log();
