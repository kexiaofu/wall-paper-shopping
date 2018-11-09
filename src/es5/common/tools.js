"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = exports.getParameter = exports.imageLazyLoad = void 0;

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

var format = function format(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,
    //月份
    "d+": date.getDate(),
    //日
    "h+": date.getHours(),
    //小时
    "m+": date.getMinutes(),
    //分
    "s+": date.getSeconds(),
    //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),
    //季度
    "S": date.getMilliseconds() //毫秒

  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

  return fmt;
};

exports.format = format;