window.Promise = window.Promise || require('es6-promise').Promise;
require('whatwg-fetch');
// require('./register.js');
var scrolltop = require('scrolltop');
var rafScroll = require('raf-scroll');
var domify = require('domify');

// elmts
var descEl = d = window.d = document.querySelector('.description');
var s = window.s = document.querySelector.bind(document);
var h = window.h = s('hgroup.main');
var c = s('#content');
var nav = s('nav');
var contactEl = s('.contact-info');


fetch('/api/contact/').then(function(resp) {
  return resp.text();
}).then(function(html) {
  console.log(html);
  contactEl = domify(html);
});

var show = require('single-page')(function(href) {
  console.log('in show: ', arguments);
  document.body.className = document.body.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
  if (href.indexOf('contact') >= 0) {
    rafScroll.remove();
    nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
    document.body.className += ' page-contact';
    document.title = 'Usurper Handpoke • Contact';
    c.innerHTML = '';
    c.appendChild(contactEl);
  }
  else if (href === '/') {
    scrollThing();
    document.body.className =
      document.body.className.replace(/(?:^|\s)page-contact(?!\S)/g , '');
    console.log("bla");
    document.title = 'Usurper Handpoke';
    c.innerHTML = '';
    c.appendChild(descEl);
  }
});
require('catch-links')(document.querySelector('nav'), show);


var offset = h.offsetTop;
var oldScr = scrolltop();

function scrollThing() {
  rafScroll.init();
  rafScroll.add(update);
}

function update(oldScr) {
  var scr = scrolltop();
  if (oldScr === scr) return;
  oldScr = scr;
  h.style.top = (offset - (scr*0.3)) + 'px';

  if (scr > 100) {
    nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
  }
}
scrollThing();
