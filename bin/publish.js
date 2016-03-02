var ghpages = require('gh-pages');
var path = require('path');
var args = process.argv.slice(2);
var baseUrl = 'https://github.com/nichoth/usurper';
var staging = args[0] === '--staging';
var repo = staging ? baseUrl+'-staging.git' : baseUrl+'.git';

ghpages.publish(path.join(__dirname, '../public'), {
  repo: repo,
  src: '**/*.*'
}, function(err) {
  if (err) return console.log(err);
  console.log("published");
});
