var cdn = document.createElement('script');  
cdn.setAttribute('src','https://cinetpay.com/cdn/seamless_sdk/latest/cinetpay.prod.min.js');
document.head.appendChild(cdn);
module.exports = require('./lib/cinetpay');
