var register = require('sw-register');

register('/sw.js').then(console.log.bind(console));
