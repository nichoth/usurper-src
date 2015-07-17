// window.Promise = window.Promise || require('es6-promise').Promise;
// require('whatwg-fetch');
// require('./register.js');
var scrolltop = require('scrolltop');
var rafScroll = require('raf-scroll');
// var domify = require('domify');

// elmts
var descEl = d = window.d = document.querySelector('.description');
var s = window.s = document.querySelector.bind(document);
var h = window.h = s('hgroup.main');
var c = s('#content');
var nav = s('nav');
var contactEl = s('.contact-info');

// fetch('/api/contact/').then(function(resp) {
//   return resp.text();
// }).then(function(html) {
//   contactEl = domify(html);
// });

// var show = require('single-page')(function(href) {
//   console.log('in show: ', arguments);
//   document.body.className = document.body.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
//   if (href.indexOf('contact') >= 0) {
//     rafScroll.remove();
//     nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
//     document.body.className += ' page-contact';
//     document.title = 'Usurper Handpoke • Contact';
//     c.innerHTML = '';
//     c.appendChild(contactEl);
//   }
//   else if (href === '/') {
//     setup();
//     scrollThing();
//     document.body.className =
//       document.body.className.replace(/(?:^|\s)page-contact(?!\S)/g , '');
//     document.title = 'Usurper Handpoke';
//     c.innerHTML = '';
//     c.appendChild(descEl);
//   }
// });
// require('catch-links')(document.querySelector('nav'), show);


var offset = h.offsetTop;
var oldScr = scrolltop();

function pxToVh(px) {
  return px / (window.innerHeight / 100);
}
window.ptv = pxToVh;

function noScroll() {
  rafScroll.remove();
  document.body.className += ' no-scroll';
}

function scrolledToBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

function changeToFullPage() {
  if ( scrolledToBottom() ) {
    // get description dist from top
    d.style.top = pxToVh(d.getBoundingClientRect().top) + 'vh';
    noScroll();
  }
}

function scrollThing() {
  rafScroll.init();
  rafScroll.add(update);
  rafScroll.add(changeToFullPage);
}

(function setup() {
  h.style.top = (h.offsetTop - (scrolltop()*0.3)) + 'px';
  if (scrolltop() > 100) {
    nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
  }
  scrollThing();
})();

function update() {
  var scr = scrolltop();
  if (oldScr === scr) return;
  oldScr = scr;
  h.style.top = (offset - (scr*0.3)) + 'px';

  if (scr > 100) {
    nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
  }
}
