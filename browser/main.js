/**
 * todo:
 *   * use `fetch` to get contact.html partial from an api endpoint
 *   * create static server
 *       - need to generate public/contact/index.html and public/index.html
 *         from templates index.html & partial/contact.html
 */

window.Promise = window.Promise || require('es6-promise').Promise;
require('whatwg-fetch');
// require('register');
var scrolltop = require('scrolltop');
var rafScroll = require('raf-scroll');
var fs = require('fs');
var contactTmpl = fs.readFileSync(__dirname + '/partial/contact.html', 'utf8');
var domify = require('domify');

// elmts
var contactEl;
var descEl = d = window.d = document.querySelector('.description');
var s = window.s = document.querySelector.bind(document);
var h = window.h = s('hgroup.main');
var c = s('#content');
var nav = s('nav');

fetch('/api/contact/').then(function(resp) {
  return resp.text();
}).then(function(html) {
  console.log(html);
  contactEl = domify(html);
});

var show = require('single-page')(function(href) {
  console.log('in show: ', arguments);
  if (href.indexOf('contact') >= 0) {
    rafScroll.remove();
    nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
    document.body.className += ' page-contact';
    document.title = 'Usurper Handpoke • Contact';
    c.innerHTML = '';
    c.appendChild(contactEl);
  }
  else if (href === '/') {
    h.style.top = (h.offsetTop - (scrolltop()*0.3)) + 'px';
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
