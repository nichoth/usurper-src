var hyperstream = require('hyperstream');
var fs = require('fs');
var path = require('path');
var tmplPath = path.resolve('../templates');

var contactStream = hyperstream({
  '#content': fs.createReadStream(
    path.join(__dirname, '../templates/contact.html')
  )
});

// write contact page
fs.createReadStream(path.join(tmplPath, 'index.html'))
  .pipe(contactStream)
  .pipe(fs.createWriteStream('../public/contact/contact.html'))
;

// write main index
fs.createReadStream(path.join(tmplPath, 'index.html'))
  .pipe(fs.createWriteStream('../public/index.html'))
;

// write contact partial
fs.createReadStream(path.join(tmplPath, 'contact.html'))
  .pipe(fs.createWriteStream('../public/api/contact.html'))
;
