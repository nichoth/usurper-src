var hyperstream = require('hyperstream');
var fs = require('fs');
var path = require('path');
var tmplPath = path.resolve(__dirname, '../templates');
var rootPath = path.resolve(__dirname, '..');

var contactStream = hyperstream({
  '#content': fs.createReadStream( path.join(tmplPath, 'contact.html') )
});

// write contact page
fs.createReadStream(path.join(tmplPath, 'index.html'))
  .pipe(contactStream)
  .pipe(fs.createWriteStream(path.join(rootPath, 'public/contact/index.html')))
;

// write main index
fs.createReadStream(path.join(tmplPath, 'index.html'))
  .pipe(fs.createWriteStream(rootPath + '/public/index.html'))
;

// write contact partial
fs.createReadStream(path.join(tmplPath, 'contact.html'))
  .pipe(fs.createWriteStream(rootPath+ '/public/api/contact/index.html'))
;
