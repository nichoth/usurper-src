var ghpages = require('gh-pages');
var path = require('path');
ghpages.publish(path.join(__dirname, '../public'), {
  repo: 'https://github.com/nichoth/usurper.git'
}, function() {
  console.log("published");
});
