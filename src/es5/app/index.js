"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _carousel = _interopRequireDefault(require("../common/carousel"));

var _mask = _interopRequireDefault(require("../common/mask"));

var _api = require("../common/api");

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template.js"));

window.onload = function () {
  var mask = new _mask.default();
  (0, _api.getCarousel)().then(function (res) {
    var carousel = new _carousel.default({
      autoPlay: false,
      parent: 'carousel-container',
      images: res
    });
  });
  (0, _api.getProductionList)().then(function (res) {
    var html = (0, _template.default)('production-list', {
      data: res
    });
    document.querySelector('.production-list').innerHTML = html;
    var images = document.querySelectorAll('.lazy-load-img'),
        len = images.length;
    (0, _tools.imageLazyLoad)(images);

    window.onscroll = function () {
      if (images[len - 1].getAttribute('data-is-load') === 'false') {
        (0, _tools.imageLazyLoad)(images);
      }
    };
  });
};