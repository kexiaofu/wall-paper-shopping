(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],2:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],3:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Pagination =
/*#__PURE__*/
function () {
  function Pagination(options) {
    (0, _classCallCheck2.default)(this, Pagination);
    this.ul = null;
    this.prevPage = null;
    this.nextPage = null;
    this.lis = [];
    this.options = Object.assign({}, {
      currentPage: 1,
      totalPages: 1,
      toPage: this.toPage
    }, options);
    this.init(options);
  }

  (0, _createClass2.default)(Pagination, [{
    key: "init",
    value: function init(options) {
      var _this = this;

      var ele = document.querySelector('.pagination');

      if (ele !== null) {
        options.parent.removeChild(ele);
      }

      ele = document.createElement('div');
      ele.className = 'pagination';
      var ul = document.createElement('ul');
      var prevPage = document.createElement('li'),
          nextPage = document.createElement('li');
      prevPage.className = 'prev-page';
      prevPage.innerHTML = '上一页';
      nextPage.className = 'next-page';
      nextPage.innerHTML = '下一页';
      ul.appendChild(prevPage);
      this.prevPage = prevPage;
      prevPage.style.visibility = 'hidden';
      prevPage.addEventListener('click', function () {
        if (_this.options.currentPage > 1) {
          options.toPage(_this.options.currentPage - 1);

          _this.setCurrentPage(_this.options.currentPage - 1);
        }
      });

      for (var i = 1; i <= options.totalPages; i++) {
        var li = document.createElement('li');

        if (i === options.currentPage) {
          li.className = 'current-page';
        }

        li.innerHTML = i;
        ul.appendChild(li);
        li.setAttribute('data-op-index', i);
        this.lis.push(li);
      }

      ul.appendChild(nextPage);
      this.nextPage = nextPage;
      options.totalPages < 2 && (nextPage.style.visibility = 'hidden');
      nextPage.addEventListener('click', function () {
        if (_this.options.currentPage < options.totalPages) {
          options.toPage(_this.options.currentPage + 1);

          _this.setCurrentPage(_this.options.currentPage + 1);
        }
      });
      ele.appendChild(ul);
      this.ul = ul;
      ul.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'li' && e.target.className === '') {
          var index = e.target.getAttribute('data-op-index');
          _this.options.currentPage !== index && (options.toPage(index), _this.setCurrentPage(index));
        }
      });
      options.parent.appendChild(ele);
    }
  }, {
    key: "setCurrentPage",
    value: function setCurrentPage(index) {
      index -= 0;
      this.ul.querySelector('.current-page').className = '';
      this.lis[index - 1].className = 'current-page';
      this.options.currentPage = index;

      if (index === 1) {
        this.prevPage.style.visibility = 'hidden';
      } else {
        this.prevPage.style.visibility = 'visible';
      }

      if (index === this.options.totalPages) {
        this.nextPage.style.visibility = 'hidden';
      } else {
        this.nextPage.style.visibility = 'visible';
      }
    }
  }, {
    key: "toPage",
    value: function toPage(index) {
      console.log("\u7B2C".concat(index, "\u9875"));
    }
  }]);
  return Pagination;
}();

exports.default = Pagination;
;
},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}]},{},[4]);
