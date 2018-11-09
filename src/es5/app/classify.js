"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

(0, _api.getProductClassify)().then(function (res) {
  var html = (0, _template.default)('classify-view', {
    data: res
  });
  document.querySelector('.classify-container').innerHTML = html;
});

window.onhashchange = function () {
  console.log();
  var newActive = document.querySelector('#classify-' + window.location.hash.substring(1)),
      oldEle = document.querySelector('.sec-active');
  oldEle !== null && (oldEle.className = 'sec-classify-item');
  newActive.className = 'sec-classify-item sec-active';
};