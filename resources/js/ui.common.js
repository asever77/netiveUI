; (function (win, doc, undefined) {

  'use strict';

  netive.common = {
    antiCache() {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      const jsLinks = document.querySelectorAll('script');
      const now = new Date();

      let timestamp = now.getFullYear().toString();
      timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString();
      timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString();
      timestamp += now.getHours().toString();
      timestamp += now.getMinutes().toString();
      timestamp += now.getMilliseconds().toString();

      for (let i = 0; i < cssLinks.length; i++) {
        cssLinks[i].href = cssLinks[i].getAttribute('href') + '?ver=' + timestamp;
      }

      for (let i = 0; i < jsLinks.length; i++) {
        jsLinks[i].src = jsLinks[i].getAttribute('src') + '?ver=' + timestamp;
      }
    },
    meunMap: {
      introduction: { link: '../html/convention/introduction.html' },
      typography: { link: '../html/convention/typography.html' },
      color: { link: '../html/convention/color.html' },
      naming: { link: '../html/convention/naming.html' },
      units: { link: '../html/convention/units.html' },
      gap: { link: '../html/convention/gap.html' },
      
      icon: { link: '../html/contents/icon.html' },
      bulletList: { link: '../html/contents/bulletList.html' },
      table: { link: '../html/contents/table.html' },
      inputFormat: { link: '../html/contents/inputFormat.html' },

      //FORM
      formLayout: { link: '../html/components/formLayout.html' },
      input: { link: '../html/components/input.html' },


      inputPlaceholder: { link: '../html/components/inputPlaceholder.html' },
      accordion: { link: '../html/components/accordion.html' },
      brickList: { link: '../html/components/brickList.html' },
      draggable: { link: '../html/components/draggable.html' },
      dropdown: { link: '../html/components/dropdown.html' },
      floating: { link: '../html/components/floating.html' },
      floatingRange: { link: '../html/components/floatingRange.html' },
      modal: { link: '../html/components/modal.html' },
      scrollBar: { link: '../html/components/scrollBar.html' },
      parallax: { link: '../html/components/parallax.html' },
      popupBook: { link: '../html/components/popupBook.html' },
      loading: { link: '../html/components/loading.html' },
      tab: { link: '../html/components/tab.html' },
      tableCaption: { link: '../html/components/tableCaption.html' },
      tableCellFix: { link: '../html/components/tableCellFix.html' },
      tableScroll: { link: '../html/components/tableScroll.html' },
      print: { link: '../html/components/print.html' },
      popup: { link: '../html/components/popup.html' },
      tooltip: { link: '../html/components/tooltip.html' },
      datePicker: { link: '../html/components/datePicker.html' },
     
      select: { link: '../html/components/select.html' },
      selection: { link: '../html/components/selection.html' },
      toast: { link: '../html/components/toast.html' },
     
      scrollMove: { link: '../html/components/scrollMove.html' },
      countNumber: { link: '../html/components/countNumber.html' },
      layout: { link: '../html/contents/layout.html' },
      button: { link: '../html/contents/button.html' },
      jsonCodingList: { link: '../html/components/jsonCodingList.html' },
      fileUpload: { link: '../html/components/fileUpload.html' },
      range: { link: '../html/components/range.html' },
      slide: { link: '../html/components/slide.html' },
      slot: { link: '../html/components/slot.html' },
      issue: { link: '../html/memory/issue.html' },
      time: { link: '../html/components/time.html' },
    },
    init() {
      let fristHref = '../html/convention/introduction.html';

      netive.common.antiCache();

      if (!!netive.para.get('page')) {
        fristHref = netive.common.meunMap[netive.para.get('page')].link;
      }

      netive.ajax.init({
        area: document.querySelector('.base-skip'),
        url: '../html/inc/skip.html',
        page: true
      });
      netive.ajax.init({
        area: document.querySelector('.base-header'),
        url: '../html/inc/header.html',
        page: true,
        callback: netive.common.header
      });
      netive.ajax.init({
        area: document.querySelector('.base-footer'),
        url: '../html/inc/footer.html',
        page: true
      });
      netive.ajax.init({
        area: document.querySelector('.base-main'),
        url: fristHref,
        page: true,
        effect: true,
        callback: function () {
          netive.common.pageInit(fristHref);
          netive.common.settingAside();
        }
      });

      // console.log('------------------------------------------------------')
      netive.form.init();
    },
    gridSwitch () {
      const el_grid = document.querySelector('.base-grid');

      el_grid.classList.toggle('on');
    },
    header () {
      // console.log('header load');
      netive.scrollBar.init();

      setTimeout(() => {
        netive.accordion.init({ 
        	id: 'exeLNB', 
        	current: 'all', 
        	autoclose: false
        });
        netive.common.menuAjax();

        doc.querySelector('.ui-nav').addEventListener('click', netive.common.toggleNav);
        document.querySelector('.fab-mode').addEventListener('click', netive.common.toggleMode);
      }, 1);

    },
    toggleMode: function () {
      document.querySelector('html').classList.toggle('dark');
    },
    toggleNav: function () {
      doc.querySelector('body').classList.toggle('nav-open');
    },
    settingAside: function () {
      const el_aside = doc.querySelector('.base-aside');
      const el_main = doc.querySelector('.base-main');
      const el_h2s = el_main.querySelectorAll('.h-2');

      let asideUl = '<ul>';

      if (!!el_aside.querySelector('ul')) {
        el_aside.querySelector('ul').remove();
      }

      asideUl += '<li><a href="#">Top</a></li>';
      let i = 0;

      for (let i = 0, len = el_h2s.length; i < len; i++) {
        const that = el_h2s[i];

        that.setAttribute('id', 'pageTit' + i);
        asideUl += '<li><a href="#pageTit' + i + '">' + that.textContent + '</a></li>';

        i = i + 1;
      }

      asideUl += '</ul>';
      el_aside.insertAdjacentHTML('beforeend', asideUl);
      //el_aside.style.display = 'block';
    },
    pageInit: function (v) {
      let jsName = null;

      if (!!doc.querySelector('#uiJsName')) {
        jsName = doc.querySelector('#uiJsName').value;
        (!!netive.page[jsName]) && netive.page[jsName]();
      }

      if (typeof (history.pushState) == 'function') {
        let renewURL = location.href;

        renewURL = renewURL.replace(/\&page=([0-9]+)/ig, '');
        renewURL = renewURL.split('../');
        renewURL = renewURL[0];
        renewURL = renewURL + v;

        let paraUrl = v.split('.html');
        // console.log(paraUrl);
        paraUrl = paraUrl[0].split('/');
        // console.log(paraUrl);
        paraUrl = paraUrl[paraUrl.length - 1];
        // console.log(paraUrl);

        const indexUrl = '../html/index.html?page=' + paraUrl;

        history.pushState(false, 'loading', indexUrl);
        document.querySelector('body').dataset.page = paraUrl;
      }
      if (document.currentScript === undefined) {
        // IE 에서만 돌아갈 내용
      } else {
        // IE 가 아닐 때 돌아갈 내용
        //hljs.configure({tabReplace: " "});
        //hljs.initHighlighting();
      }


      //hljs.initHighlighting();
      //hljs.highlightAll();


      // console.log(v.split('.html'), !!doc.querySelector('#uiPageJS'));
      // if (!doc.querySelector('#uiPageJS')) {
      // 	  var del = doc.querySelector('#uiPageJS');
      // 	 del.parentNode.removeChild(del);
      // }

      // var jsSrc = v.split('.html'),
      // 	 jsSrc = jsSrc[0] + '.js',
      // 	 script = document.createElement('script'),
      // 	 element = document.getElementsByTagName('body')[0]; 

      // script.src = jsSrc; 
      // script.id = 'uiPageJS'
      // script.async = true; 
      // script.defer = true; 
      // (typeof element === 'undefined' ? document.getElementsByTagName('html')[0] : element).appendChild(script);
      

    },

    menuAjax: function () {
      const dep2btns = doc.querySelectorAll('.dep2-btn');
      const act = (e) => {
        console.log(e);
        const el = e.currentTarget;
        const elHref = el.getAttribute('data-href');
        const pagename = el.getAttribute('data-href');
        const el_body = doc.querySelector('body');
        console.log(pagename);
        // !!el_body.classList.contains('nav-open') && netive.common.toggleNav();

        netive.ajax.init({
          area: document.querySelector('.base-main'),
          url: netive.common.meunMap[pagename].link,
          page: true,
          effect: 'page-change',
          callback: () => {
            netive.scroll.move({
              top: 0,
              focus: document.querySelector('.base-main h1')
            });
           
            //delete netive.scrollbar;
            netive.common.pageInit(netive.common.meunMap[pagename].link);
            // netive.common.settingAside();
          }
        });
      }

      for (let that of dep2btns) {
        that.addEventListener('click', act);
      }
    },
    footer: function () {
      console.log('footer load');
    }
  };

  //modal

  //page 
  netive.page = {}

  //callback
  netive.callback = {
    modal: function (modalId) {
      switch (modalId) {
        case 'modalID':
          break;
      }
    }
  }
})(window, document);
