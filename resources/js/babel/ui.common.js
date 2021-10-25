"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

;

(function (win, doc, undefined) {
  'use strict';

  netive.common = {
    init: function init() {
      var fristHref = '/netiveUI/html/start/introduction.html';

      if (!!netive.para.get('page')) {
        switch (netive.para.get('page')) {
          case 'introduction':
            fristHref = '/netiveUI/html/start/introduction.html';
            break;

          case 'typography':
            fristHref = '/netiveUI/html/start/typography.html';
            break;

          case 'color':
            fristHref = '/netiveUI/html/start/color.html';
            break;

          case 'device':
            fristHref = '/netiveUI/html/start/device.html';
            break;

          case 'margin':
            fristHref = '/netiveUI/html/start/margin.html';
            break;

          case 'naming':
            fristHref = '/netiveUI/html/start/naming.html';
            break;

          case 'placeholder':
            fristHref = '/netiveUI/html/start/placeholder.html';
            break;

          case 'units':
            fristHref = '/netiveUI/html/start/units.html';
            break;

          case 'bulletList':
            fristHref = '/netiveUI/html/contents/bulletList.html';
            break;

          case 'table':
            fristHref = '/netiveUI/html/contents/table.html';
            break;

          case 'inputFormat':
            fristHref = '/netiveUI/html/contents/inputFormat.html';
            break;

          case 'inputPlaceholder':
            fristHref = '/netiveUI/html/components/inputPlaceholder.html';
            break;

          case 'accordion':
            fristHref = '/netiveUI/html/components/accordion.html';
            break;

          case 'brickList':
            fristHref = '/netiveUI/html/components/brickList.html';
            break;

          case 'draggable':
            console.log('draggable');
            fristHref = '/netiveUI/html/components/draggable.html';
            break;

          case 'dropdown':
            fristHref = '/netiveUI/html/components/dropdown.html';
            break;

          case 'floating':
            fristHref = '/netiveUI/html/components/floating.html';
            break;

          case 'floatingRange':
            fristHref = '/netiveUI/html/components/floatingRange.html';
            break;

          case 'modal':
            fristHref = '/netiveUI/html/components/modal.html';
            break;

          case 'scrollBar':
            fristHref = '/netiveUI/html/components/scrollBar.html';
            break;

          case 'parallax':
            fristHref = '/netiveUI/html/components/parallax.html';
            break;

          case 'popupBook':
            fristHref = '/netiveUI/html/components/popupBook.html';
            break;

          case 'loading':
            fristHref = '/netiveUI/html/components/loading.html';
            break;

          case 'tab':
            fristHref = '/netiveUI/html/components/tab.html';
            break;

          case 'tableCaption':
            fristHref = '/netiveUI/html/components/tableCaption.html';
            break;

          case 'tableCellFix':
            fristHref = '/netiveUI/html/components/tableCellFix.html';
            break;

          case 'tableScroll':
            fristHref = '/netiveUI/html/components/tableScroll.html';
            break;

          case 'print':
            fristHref = '/netiveUI/html/components/print.html';
            break;

          case 'popup':
            fristHref = '/netiveUI/html/components/popup.html';
            break;

          case 'tooltip':
            fristHref = '/netiveUI/html/components/tooltip.html';
            break;

          case 'datePicker':
            fristHref = '/netiveUI/html/components/datePicker.html';
            break;

          case 'inputClear':
            fristHref = '/netiveUI/html/components/inputClear.html';
            break;

          case 'select':
            fristHref = '/netiveUI/html/components/select.html';
            break;

          case 'toast':
            fristHref = '/netiveUI/html/components/toast.html';
            break;

          case 'innerLabel':
            fristHref = '/netiveUI/html/components/innerLabel.html';
            break;

          case 'scrollMove':
            fristHref = '/netiveUI/html/components/scrollMove.html';
            break;

          case 'countNumber':
            fristHref = '/netiveUI/html/components/countNumber.html';
            break;

          case 'layout':
            fristHref = '/netiveUI/html/contents/layout.html';
            break;

          case 'button':
            fristHref = '/netiveUI/html/contents/button.html';
            break;

          case 'jsonCodingList':
            fristHref = '/netiveUI/html/components/jsonCodingList.html';
            break;

          case 'fileUpload':
            fristHref = '/netiveUI/html/components/fileUpload.html';
            break;

          case 'range':
            fristHref = '/netiveUI/html/components/range.html';
            break;

          case 'slide':
            fristHref = '/netiveUI/html/components/slide.html';
            break;

          case 'slot':
            fristHref = '/netiveUI/html/components/slot.html';
            break;

          case 'issue':
            fristHref = '/netiveUI/html/memory/issue.html';
            break;
        }
      }

      netive.ajax.init({
        area: document.querySelector('.base-skip'),
        url: '/netiveUI/html/inc/skip.html',
        page: true
      });
      netive.ajax.init({
        area: document.querySelector('.base-header'),
        url: '/netiveUI/html/inc/header.html',
        page: true,
        callback: netive.common.header
      });
      netive.ajax.init({
        area: document.querySelector('.base-footer'),
        url: '/netiveUI/html/inc/footer.html',
        page: true
      });
      netive.ajax.init({
        area: document.querySelector('.base-main'),
        url: fristHref,
        page: true,
        effect: true,
        callback: function callback() {
          netive.common.pageInit(fristHref);
          netive.common.settingAside();
        }
      });
      console.log('------------------------------------------------------');
      netive.table.caption();
      netive.form.init();
    },
    gridSwitch: function gridSwitch() {
      var el_grid = document.querySelector('.base-grid');
      el_grid.classList.toggle('on');
    },
    header: function header() {
      console.log('header load');
      netive.scrollBar();
      setTimeout(function () {
        netive.accordion.init({
          id: 'exeLNB',
          current: 'all',
          autoclose: false
        });
        netive.common.menuAjax();
        doc.querySelector('.ui-nav').addEventListener('click', netive.common.toggleNav);
        document.querySelector('.btn-mode').addEventListener('click', netive.common.toggleMode);
      }, 0);
    },
    toggleMode: function toggleMode() {
      document.querySelector('html').classList.toggle('dark-mode');
    },
    toggleNav: function toggleNav() {
      doc.querySelector('body').classList.toggle('nav-open');
    },
    settingAside: function settingAside() {
      var el_aside = doc.querySelector('.base-aside');
      var el_main = doc.querySelector('.base-main');
      var el_h2s = el_main.querySelectorAll('.h-2');
      var asideUl = '<ul>';

      if (!!el_aside.querySelector('ul')) {
        el_aside.querySelector('ul').remove();
      }

      asideUl += '<li><a href="#">Top</a></li>';
      var i = 0;

      var _iterator = _createForOfIteratorHelper(el_h2s),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el_h2 = _step.value;
          el_h2.setAttribute('id', 'pageTit' + i);
          asideUl += '<li><a href="#pageTit' + i + '">' + el_h2.textContent + '</a></li>';
          i = i + 1;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      asideUl += '</ul>';
      el_aside.insertAdjacentHTML('beforeend', asideUl); //el_aside.style.display = 'block';
    },
    pageInit: function pageInit(v) {
      var jsName = null;

      if (!!doc.querySelector('#uiJsName')) {
        jsName = doc.querySelector('#uiJsName').value;
        console.log(netive.page,jsName);
        netive.page[jsName]();
      }

      if (typeof history.pushState == 'function') {
        var renewURL = location.href;
        renewURL = renewURL.replace(/\&page=([0-9]+)/ig, '');
        renewURL = renewURL.split('/netiveUI/');
        renewURL = renewURL[0];
        renewURL = renewURL + v;
        var paraUrl = v.split('.');
        paraUrl = paraUrl[0].split('/');
        paraUrl = paraUrl[paraUrl.length - 1];
        var indexUrl = '/netiveUI/html/index.html?page=' + paraUrl;
        history.pushState(false, 'loading', indexUrl);
      }

      if (document.currentScript === undefined) {// IE 에서만 돌아갈 내용
      } else {// IE 가 아닐 때 돌아갈 내용
          //hljs.configure({tabReplace: " "});
          //hljs.initHighlighting();
        } //hljs.initHighlighting();
      //hljs.highlightAll();
      // console.log(v.split('.html'), !!doc.querySelector('#uiPageJS'));
      // if (!doc.querySelector('#uiPageJS')) {
      //	  var del = doc.querySelector('#uiPageJS');
      //	 del.parentNode.removeChild(del);
      // }
      // var jsSrc = v.split('.html'),
      //	 jsSrc = jsSrc[0] + '.js',
      //	 script = document.createElement('script'),
      //	 element = document.getElementsByTagName('body')[0]; 
      // script.src = jsSrc; 
      // script.id = 'uiPageJS'
      // script.async = true; 
      // script.defer = true; 
      // (typeof element === 'undefined' ? document.getElementsByTagName('html')[0] : element).appendChild(script);

    },
    menuAjax: function menuAjax() {
      var dep2btns = doc.querySelectorAll('.dep-2-btn');

      var _iterator2 = _createForOfIteratorHelper(dep2btns),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var that = _step2.value;
          that.addEventListener('click', act);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      function act(e) {
        var el = this;
        var elHref = el.getAttribute('data-href');
        var el_body = doc.querySelector('body');
        !!el_body.classList.contains('nav-open') && netive.common.toggleNav();
        netive.ajax.init({
          area: document.querySelector('.base-main'),
          url: elHref,
          page: true,
          effect: 'page-change',
          callback: function callback() {
            netive.scroll.move({
              value: 0,
              speed: 0,
              focus: doc.querySelector('.base-main h1')
            }); //delete netive.scrollbar;

            netive.common.pageInit(elHref);
            netive.common.settingAside(); // document.addEventListener('DOMContentLoaded', (event) => {
            // 	document.querySelectorAll('pre code').forEach((el) => {
            // 		alert(1);
            // 	  hljs.highlightElement(el);
            // 	});
            //   });
          }
        });
      }
    },
    footer: function footer() {
      console.log('footer load');
    }
  }; //modal
  //page 

  netive.page = {}; //callback

  netive.callback = {
    modal: function modal(modalId) {
      switch (modalId) {
        case 'modalID':
          break;
      }
    }
  };
})(window, document);