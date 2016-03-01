var ghpages = require('gh-pages');
var path = require('path');
var args = process.argv.slice(2);
var repo = args[0] || 'https://github.com/nichoth/usurper.git';

ghpages.publish(path.join(__dirname, '../public'), {
  repo: repo
}, function(err) {
  if (err) return console.log(err);
  console.log("published");
});
