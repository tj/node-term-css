
var css = require('..')
  , fs = require('fs')
  , read = fs.readFileSync
  , style = read('examples/report.css', 'utf8');

var stats = {
  title: 'stats',
  users: 150000,
  visits: 5000000,
  uptime: '50 days',
  labels: {
    user: 'users',
    visits: 'visits',
    uptime: 'uptime'
  }
}

var str = '\
  {title}:\n\
    {label labels.user}: {users}\n\
    {label labels.visits}: {visits}\n\
    {label labels.uptime}: {uptime}\n\
'

var fn = css.compile(str, style);

console.log();
console.log(fn(stats));
console.log();
