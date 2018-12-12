"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _pagination = _interopRequireDefault(require("../common/pagination"));

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template.js"));

var pages = null,
    tagId = null,
    searchWord = null,
    groupId = null,
    tagList = [];

var toPage = function toPage(index) {
  getData({
    pageIndex: index,
    groupId: groupId,
    tagId: tagId,
    name: searchWord
  });
};

var getData = function getData(obj) {
  (0, _api.getAllProductList)(obj).then(function (res) {
    var html = (0, _template.default)('production-list', {
      data: res.data
    });
    document.querySelector('.production-list').innerHTML = html;
    var images = document.querySelectorAll('.lazy-load-img'),
        len = images.length;
    (0, _tools.imageLazyLoad)(images);

    if (pages === null) {
      pages = new _pagination.default({
        parent: document.querySelector('.product-list'),
        totalPages: res.totalPageCount,
        currentPage: res.currentPageIndex,
        toPage: toPage
      });
    } else {
      pages.init({
        parent: document.querySelector('.product-list'),
        totalPages: res.totalPageCount,
        currentPage: res.currentPageIndex,
        toPage: toPage
      });
    }

    window.onscroll = function () {
      if (images[len - 1].getAttribute('data-is-load') === 'false') {
        (0, _tools.imageLazyLoad)(images);
      }
    };
  });
};

window.onload = function () {
  var search = (0, _tools.getParameter)('search');
  (0, _api.getTags)().then(function (res) {
    console.log(res);
    tagList = res;
    var tags = (0, _template.default)('tags-container', {
      data: res.slice(0, 11),
      more2less: false
    });
    document.querySelector('.tags-container').innerHTML = tags;
  });

  if (search !== null) {
    searchWord = decodeURIComponent(search);
    getData({
      tags: tagId,
      name: searchWord
    });
  } else {
    var hash = document.location.hash;
    hash !== '' && (groupId = hash.substring(1));
    getData({
      groupId: groupId,
      tags: tagId,
      name: searchWord
    });
  }
};

window.addEventListener("hashchange", function () {
  groupId = document.location.hash.substring(1);
  getData({
    groupId: groupId,
    tags: tagId,
    name: searchWord
  });
});

window.pickThisTag = function (ele) {
  var prevTag = document.querySelector('.tag-content >.active');
  prevTag.className = '';
  ele.className = 'active';

  if (ele.getAttribute('data-op-id') !== 'all') {
    tagId = ele.getAttribute('data-op-id');
    getData({
      groupId: groupId,
      tagId: tagId,
      name: searchWord
    });
  } else {
    tagId = null;
    getData({
      groupId: groupId,
      tagId: tagId,
      name: searchWord
    });
  }
};

window.moreTags = function (ele) {
  console.log(ele, ele.className, ele.className.indexOf('less-tags')); //ele.className = ele.className === 'more-tags'?ele.className = 'more-tags less-tags':ele.className = 'more-tags';

  var tags = [];

  if (ele.getAttribute('data-op-bool') === 'false') {
    tags = (0, _template.default)('tags-container', {
      data: tagList,
      more2less: true
    });
  } else {
    tags = (0, _template.default)('tags-container', {
      data: tagList.slice(0, 11),
      more2less: false
    });
  }

  document.querySelector('.tags-container').innerHTML = tags;
};