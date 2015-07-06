window.Promise = window.Promise || require('es6-promise').Promise;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('registration successful ',registration);
      return registration;
    })
    .catch(function(err) {
      console.log(err);
    })
  ;
}
