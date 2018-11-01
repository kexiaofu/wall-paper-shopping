"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParameter = exports.imageLazyLoad = void 0;

var imageLazyLoad = function imageLazyLoad(ele) {
  var clientHeight = document.documentElement.clientHeight,
      scrollTop = document.documentElement.scrollTop,
      l = ele.length;

  for (var i = 0; i < l; i++) {
    if (ele[i].offsetTop < clientHeight + scrollTop && ele[i].getAttribute('data-is-load') !== 'true') {
      ele[i].setAttribute('data-is-load', 'true');
      ele[i].src = ele[i].getAttribute('data-origin-src'); //console.log(ele[i].getAttribute('data-origin-src'))
    }
  }
};

exports.imageLazyLoad = imageLazyLoad;

var getParameter = function getParameter(sProp) {
  var re = new RegExp(sProp + "=([^\&]*)", "i");
  var a = re.exec(document.location.search);
  if (a == null) return null;
  return a[1];
};

exports.getParameter = getParameter;