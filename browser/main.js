window.Promise = window.Promise || require('es6-promise').Promise;
var scrolltop = require('scrolltop');
var rafScroll = require('raf-scroll');
var fs = require('fs');
var contactTmpl = fs.readFileSync(__dirname + '/partial/contact.html', 'utf8');
var domify = require('domify');

var contactEl = domify(contactTmpl);
var descEl = d = window.d = document.querySelector('.description');
var s = window.s = document.querySelector.bind(document);
var h = window.h = s('hgroup.main');
var c = s('#content');
var nav = s('nav');
nav.className += ' hidden';

var show = require('single-page')(function(href) {
  console.log('in show: ', arguments);
  if (href === '/contact') {
    rafScroll.remove();
    document.body.className += ' page-contact';
    document.title = 'Usurper Handpoke • Contact';
    c.innerHTML = '';
    c.appendChild(contactEl);
  }
  else if (href === '/') {
    document.body.className =
      document.body.className.replace(/(?:^|\s)page-contact(?!\S)/g , '');
      document.title = 'Usurper Handpoke';
      c.innerHTML = '';
      c.appendChild(descEl);
  }
});
require('catch-links')(document.querySelector('nav'), show);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//     .then(function(registration) {
//       console.log('registration successful ',registration);
//       return registration;
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
//   ;
// }

// d.className += ' hidden';

function updatePage(data) {
  document.title = data.title || '';
  document.body.className = data.bodyClass;
  s('#content').replaceChild(data.content);
}

var offset = h.offsetTop;
var oldScr = scrolltop();

function update(oldScr) {
  var scr = scrolltop();
  if (oldScr === scr) return;
  oldScr = scr;
  h.style.top = (offset - (scr*0.3)) + 'px';

  if (scr > 100) {
    nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
  }
}

rafScroll.init();
rafScroll.add(update);
