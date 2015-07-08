window.Promise = window.Promise || require('es6-promise').Promise;
var scrolltop = require('scrolltop');
var rafScroll = require('raf-scroll');

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

var d = window.d = document.querySelector('.description');
var s = window.s = document.querySelector.bind(document);
var h = window.h = s('hgroup.main');
var nav = s('nav');

d.className += ' hidden';
nav.className += ' hidden';

// window.addEventListener('scroll', showDescription);

// function showDescription(ev) {
//   if (document.body.scrollTop >= h.offsetTop) {
//     this.removeEventListener('scroll', showDescription);
//     d.className = d.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
//     nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
//   }
// }

// function removeClass(el, className) {
//   var re = new RegExp('/(?:^|\\s)' + className + '(?!\\S)', 'g');
//   el.className = el.className.replace(re , '');
// }

var offset = h.offsetTop;

function update() {
  var scr = scrolltop();
  h.style.top = (offset - (scr*0.3)) + 'px';

  if (scr > 100) {
    nav.className = nav.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
    d.className = d.className.replace(/(?:^|\s)hidden(?!\S)/g , '');
  }
}

rafScroll.init();
rafScroll.add(update);
