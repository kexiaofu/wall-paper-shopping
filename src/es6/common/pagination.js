export default class Pagination {
  constructor(options) {
    this.ul = null;
    this.prevPage = null;
    this.nextPage = null;
    this.lis = [];
    this.options = Object.assign({},{
      currentPage:1,
      totalPages:1,
      toPage:this.toPage
    }, options);

    this.init(options);
  }

  init(options) {

    let ele = document.querySelector('.pagination');

    if (ele !== null) {
      options.parent.removeChild(ele);
    }

    ele = document.createElement('div');
    ele.className = 'pagination';

    let ul = document.createElement('ul');

    let prevPage = document.createElement('li'),
      nextPage = document.createElement('li');

    prevPage.className = 'prev-page';
    prevPage.innerHTML = '上一页';
    nextPage.className = 'next-page';
    nextPage.innerHTML = '下一页';

    ul.appendChild(prevPage);

    this.prevPage = prevPage;

    prevPage.style.visibility = 'hidden';

    prevPage.addEventListener('click', () => {
      if (this.options.currentPage > 1) {
        options.toPage(this.options.currentPage - 1);
        this.setCurrentPage(this.options.currentPage - 1)
      }
    });

    for (let i = 1; i <= options.totalPages; i++) {
      let li = document.createElement('li');
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

    nextPage.addEventListener('click', () => {
      if (this.options.currentPage < options.totalPages) {
        options.toPage(this.options.currentPage + 1);
        this.setCurrentPage(this.options.currentPage + 1)
      }

    });

    ele.appendChild(ul);

    this.ul = ul;

    ul.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li' && e.target.className === '') {
        let index = e.target.getAttribute('data-op-index');
        this.options.currentPage !== index && (options.toPage(index),this.setCurrentPage(index));

      }
    });

    options.parent.appendChild(ele);

  }

  setCurrentPage(index) {

    index -= 0;

    this.ul.querySelector('.current-page').className = '';

    this.lis[index-1].className = 'current-page';

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

  toPage(index) {
    console.log(`第${index}页`);
  }

};