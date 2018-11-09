import { getAllProductList, getTags } from '../common/api';

import Pagination from '../common/pagination';

import { imageLazyLoad, getParameter } from '../common/tools';

import template from '../common/template.js';

let pages = null,
    tagId = null,
    searchWord = null,
    groupId = null,
    tagList = [];

let toPage = (index) =>{
  getData({pageIndex:index,groupId:groupId,tags:tagId,name:searchWord});

};


let getData = (obj) =>{
  getAllProductList(obj).then(res=>{
    let html = template('production-list', {data:res.products});
    document.querySelector('.production-list').innerHTML = html;

    let images = document.querySelectorAll('.lazy-load-img'),
      len = images.length;

    imageLazyLoad(images);

    if(pages === null) {
      pages = new Pagination({
        parent:document.querySelector('.product-list'),
        totalPages:res.totalPageCount,
        currentPage:res.currentPageIndex,
        toPage:toPage
      });
    } else {
      pages.init({
        parent:document.querySelector('.product-list'),
        totalPages:res.totalPageCount,
        currentPage:res.currentPageIndex,
        toPage:toPage
      })
    }

    window.onscroll = () =>{
      if(images[len-1].getAttribute('data-is-load') === 'false') {
        imageLazyLoad(images);
      }
    }
  })
};

window.onload = () => {
  let search = getParameter('search');

  getTags().then(res=>{
    console.log(res);
    tagList = res;
    let tags = template('tags-container',{data:res.slice(0,11),more2less:false});
    document.querySelector('.tags-container').innerHTML = tags;
  });

  if(search !== null) {
    searchWord = decodeURIComponent(search)
    getData({tags:tagId,name:searchWord})

  } else {
    let hash  = document.location.hash;
    hash !== ''&& (groupId = hash.substring(1));
    getData({groupId:groupId,tags:tagId,name:searchWord})
  }
};

window.addEventListener("hashchange",()=>{
  groupId = document.location.hash.substring(1);
  getData({groupId:groupId,tags:tagId,name:searchWord})
});

window.pickThisTag = (ele) =>{

  let prevTag = document.querySelector('.tag-content >.active');

  prevTag.className = '';

  ele.className = 'active';

  if(ele.getAttribute('data-op-id') !== 'all') {
    tagId = ele.getAttribute('data-op-id');
    getData({groupId:groupId,tags:tagId,name:searchWord})

  } else {
    tagId = null;
    getData({groupId:groupId,tags:tagId,name:searchWord});
  }
};

window.moreTags = (ele) => {
  console.log(ele,ele.className,ele.className.indexOf('less-tags'));
  //ele.className = ele.className === 'more-tags'?ele.className = 'more-tags less-tags':ele.className = 'more-tags';
  let tags = [];
  if(ele.getAttribute('data-op-bool') === 'false') {
    tags = template('tags-container',{data:tagList,more2less:true});
  } else {
    tags = template('tags-container',{data:tagList.slice(0,11),more2less:false});
  }
  document.querySelector('.tags-container').innerHTML = tags;

};