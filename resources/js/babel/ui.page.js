"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

;

(function (win, doc, undefined) {
  console.log('page.js');
  'use strict';

  console.log('page ready after');
  netive.common.init();

  netive.page.pageInputPlaceholder = function () {};

  netive.page.pageInnerLabel = function () {
    netive.form.init();
    netive.select.init();
    netive.form.init();
  };

  netive.page.pageColor = function () {};

  netive.page.pageUnits = function () {};

  netive.page.pagePlaceholder = function () {};

  netive.page.pageNaming = function () {};

  netive.page.pageMargin = function () {};

  netive.page.pageIntroduction = function () {};

  netive.page.pageDevice = function () {};

  netive.page.pageTypography = function () {};

  netive.page.pageLayout = function () {};

  netive.page.pageLoading = function () {
    netive.loading.show();
    netive.loading.show();
    netive.loading.hide();
    netive.loading.show();
    netive.loading.hide();
  };

  netive.page.pageButton = function () {};

  netive.page.pageBulletList = function () {};

  netive.page.pagePrint = function () {//≠
  };

  netive.page.pageTableCaption = function () {
    netive.table.caption();
  };

  netive.page.pageTableCellFix = function () {
    netive.table.fixTd();
  };

  netive.page.pageTableScroll = function () {
    netive.table.scroll({
      callback: function callback() {
        netive.scrollBar();
        netive.scrollBar({
          selector: doc.querySelector('.ui-scrollbar[data-scroll-id="tblScrollTest1"]')
        });
        var wrap = doc.querySelector('.ui-scrollbar[data-scroll-id="tblScrollTest1"]').closest('.ui-tablescroll');
        wrap.querySelector('.ui-tablescroll-clone').classList.add('aa');
      }
    });
  };

  netive.page.pageBrickList = function () {//≠
  };

  netive.page.pageModal = function () {
    var test = doc.querySelector('.test-modal');
    var btns = test.querySelectorAll('.btn-base');

    var _iterator = _createForOfIteratorHelper(btns),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var that = _step.value;
        that.addEventListener('click', modalShow);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    function modalShow() {
      var btn = this;
      netive.modal.show({
        id: btn.getAttribute('modal-id'),
        ps: btn.getAttribute('modal-ps') === undefined ? 'center' : btn.getAttribute('modal-ps'),
        src: btn.getAttribute('modal-src') === undefined ? false : btn.getAttribute('modal-src'),
        full: btn.getAttribute('modal-mobilefull') === undefined ? false : btn.getAttribute('modal-mobilefull') === 'true' && true,
        width: btn.getAttribute('modal-width') === undefined ? false : btn.getAttribute('modal-width'),
        height: btn.getAttribute('modal-height') === undefined ? false : btn.getAttribute('modal-height'),
        innerScroll: btn.getAttribute('modal-scroll') === undefined ? false : btn.getAttribute('modal-scroll') === 'true' && true,
        callbackClose: function callbackClose(v) {
          console.log('close callback', v);
        },
        callback: function callback(v) {
          // netive.scrollBar({
          //     selector: doc.querySelector('#' + btn.getAttribute('modal-id') + ' .ui-scrollbar')
          // });
          // netive.scrollBar.init({
          //     selector: doc.querySelector('#' + btn.getAttribute('modal-id') + ' .ui-scrollbar')
          // })
          console.log('callback', v);
        }
      });
    }
  };

  netive.page.pageFileUpload = function () {
    netive.form.fileUpload();
    netive.form.fileUpload();
    netive.form.fileUpload();
    netive.form.fileUpload();
  };

  netive.page.pageIssue = function () {
    var srchCode = doc.querySelector('#uiIssueSearch');
    var srchBtn = doc.querySelector('#uiIssueSearchBtn');
    srchBtn.addEventListener('click', srchAct);
    srchCode.addEventListener('keyup', function () {
      if (win.event.keyCode === 13) {
        srchAct();
      }
    });

    function srchAct() {
      var k = srchCode.value;
      var el = doc.querySelector('.bul-hyphen');
      var el_tag = el.querySelectorAll('.list-memory-tag');
      var el_tr = el.querySelectorAll(':scope > div');

      var _iterator2 = _createForOfIteratorHelper(el_tr),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var that = _step2.value;
          that.classList.add('srch-hidden');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(el_tag),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _that = _step3.value;
          var text = _that.textContent;

          var el_tr2 = _that.closest('.srch-hidden');

          console.log(text.indexOf(k), text, k);

          if (text.indexOf(k) >= 0) {
            console.log(1111);
            el_tr2.classList.remove('srch-hidden');
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } // if ($('#uiIssueSearch').val() !== '') {
    //     var temp = $('.bul-hyphen > div *:contains('+ $('#uiIssueSearch').val() +')');
    //     $('.bul-hyphen > div').addClass('disabled').hide();
    //     $(temp).closest('.bul-hyphen > div').removeClass('disabled').show();
    // }
    // $.expr[":"].contains = $.expr.createPseudo(function(arg){
    //     return function(elem) {
    //         return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    //     }
    // });
    // $('#uiIssueSearchBtn').on('click', function(){
    //     searchAct();
    // });
    // $('#uiIssueSearch').on('keydown', function(e){
    //     if (e.keyCode === netive.state.keys.enter) {
    //         searchAct();
    //     }
    // });
    // function searchAct(){
    //     var k = $('#uiIssueSearch').val(),
    //         temp = $('.bul-hyphen > div *:contains('+ k +')');
    //     $('.bul-hyphen > div').addClass('disabled').hide();
    //     $(temp).closest('.bul-hyphen > div').removeClass('disabled').show();
    // }

  };

  netive.page.pageSlot = function () {//≠
  };

  netive.page.pageTooltip = function () {
    netive.tooltip.init();
  };

  netive.page.pageToast = function () {
    console.log('toast start');
  };

  netive.page.pageRange = function () {
    netive.rangeSlider.init({
      id: 'range1'
    });
    netive.rangeSlider.init({
      id: 'range2'
    });
    netive.rangeSlider.init({
      id: 'range3'
    });
    netive.rangeSlider.init({
      id: 'range4'
    });
  };

  netive.page.pageSlide = function () {//≠
  };

  netive.page.pageSelect = function () {
    netive.select.init();
    netive.select.init();
    netive.select.init();
    netive.select.init({
      id: 'forSelLocal',
      current: 0,
      callback: function callback(v) {
        console.log(v);
      }
    });
    var opttxt = 5;
    doc.querySelector('#changeOption').addEventListener('click', function () {
      doc.querySelector('#uiSel2').insertAdjacentHTML('beforeend', '<option value="' + opttxt + '">' + opttxt + '</option>');
      opttxt = opttxt + 1;
      netive.select.init({
        id: 'uiSel2'
      });
    });
  };

  netive.page.pageScrollMove = function () {
    netive.scroll.init();
    netive.scroll.init();

    netive.callback.testscroll = function () {
      console.log('callback - test scroll');
    };

    if (!netive.callback.testscroll) {
      netive.callback.testscroll = function () {
        console.log('callback - test scroll2');
      };
    } else {
      console.log('ı callback');
    }
  };

  netive.page.pageParallax = function () {
    netive.scroll.parallax({
      callback: function callback(v) {
        console.log(v);
      }
    });

    netive.callback.parallax01 = function (opt) {
      var el = opt.el;
      var n = opt.n;
      el.style.opacity = n;
      el.style.transform = 'translate(' + (100 - n * 100).toFixed(2) + '% ,0)';
    };

    netive.callback.parallax02 = function (opt) {
      var el = opt.el;
      var n = opt.n;
      el.style.opacity = n;
      el.style.transform = 'translate(' + (100 - n * 100).toFixed(2) * -1 + '% ,0)';
    };

    netive.callback.parallax03 = function (opt) {
      var el = opt.el;
      var n = opt.n;
      el.style.opacity = n;
    };

    netive.callback.parallax04 = function (opt) {
      var el = opt.el;
      var n = opt.n;
      el.style.opacity = n;
      el.style.transform = 'translate(' + (100 - n * 100).toFixed(2) + '% ,0)';
    };

    netive.callback.parallax05 = function (opt) {
      var el = opt.el;
      var n = opt.n;
      el.style.opacity = n;
    };

    netive.callback.parallax06 = function (opt) {
      var el = opt.el;
      var n = opt.n;
      el.style.opacity = n;
    };
  };

  netive.page.pagePopupBook = function () {//netive.uiPopupBook();
  };

  netive.page.pageScrollBar = function () {
    // netive.scrollBar.init({
    //     infiniteCallback: function(){
    //         console.log('infiniteCallback')
    //     }
    // });
    netive.scrollBar();
  };

  netive.page.pageJsonCodingList = function () {
    netive.project.list({
      id: 'projectList',
      url: '/netiveUI/resources/data/codinglist.json',
      type: 'text'
    });
  };

  netive.page.pagePopup = function () {
    var popupA = doc.querySelector('#uiPopupA');
    var popupB = doc.querySelector('#uiPopupB');
    popupA.addEventListener('click', function (e) {
      e.preventDefault();
      netive.popup.open({
        link: this.href,
        width: 200
      });
    });
    popupB.addEventListener('click', function (e) {
      e.preventDefault();
      netive.popup.open({
        link: this.href,
        name: 'list'
      });
    });
  };

  netive.page.pageInputFormat = function () {};

  netive.page.pageInputClear = function () {
    netive.form.init();
  };

  netive.page.pageFloatingRange = function () {
    netive.floating.range();
  };

  netive.page.pageFloating = function () {
    netive.floating.init();
  };

  netive.page.pageCountNumber = function () {// netive.count.step({ id:'exeCount1', value: 12345.678 });
    // netive.count.slot({ id:'exeCount2', value: 12345.678 });
  };

  netive.page.pageDropdown = function () {
    var dropchange = doc.querySelector('.drop-ps-change');
    dropchange.addEventListener('change', function () {
      var wrap = this.closest('.box-guide');
      var drop = wrap.querySelector('.ui-drop');
      drop.dataset.ps = this.value;
    });
    netive.dropdown.init({
      id: 'uiDrop1',
      ps: 'BL',
      src: '/netiveUI/html/components/dropdown_ajax.html',
      dropExpanded: true,
      callback: function callback() {
        netive.tab.init({
          id: 'exeTab1',
          current: 0
        });
        netive.dropdown.init({
          id: 'uiDrop5',
          ps: 'RB',
          src: '/netiveUI/html/components/dropdown_ajax2.html'
        });
      }
    });
  };

  netive.page.pageTab = function () {
    netive.tab.init({
      id: 'exeTab1',
      current: 0,
      effect: 'eff-fade',
      callback: tabCallback
    });

    function tabCallback(v) {
      if (v.current === 0) {
        netive.tab.init({
          id: 'exeTab4',
          current: 5,
          onePanel: true,
          callback: tabCallback2
        });
      }
    }

    function tabCallback2(v) {
      var tab = doc.querySelector('#' + v.id);
      var btns = tab.querySelectorAll('.ui-tab-btn');
      var tit = tab.querySelector('.ui-tab-tit');
      tit.textContent = btns[v.current].textContent;
      console.log(v);
    }
  };

  netive.page.pageTable = function () {
    netive.table.caption();
  };

  netive.page.pageDraggable = function () {
    netive.draggable.init({
      id: 'drag1'
    });
    netive.draggable.init({
      id: 'drag2'
    });
    netive.draggable.init({
      id: 'drag3'
    });
    netive.draggable.init({
      id: 'drag4'
    });
    netive.draggable.init({
      id: 'drag5',
      line: true
    });
  };

  netive.page.pageAccordion = function () {
    console.log('page.js-acco');
    netive.accordion.init({
      id: 'exeAcco1',
      current: [0],
      autoclose: false,
      callback: function callback(v) {
        console.log(v);
      }
    });
    var add_html = '';
    add_html += '<div class="ui-acco-wrap">';
    add_html += '<dt class="ui-acco-tit">';
    add_html += '<button type="button" class="ui-acco-btn">[î ] DT∏tÄ?</button>';
    add_html += '</dt>';
    add_html += '<dd class="ui-acco-pnl">';
    add_html += '<div class="ui-acco-pnl-wrap">';
    add_html += '<p>(accordion, ≈|¥: <a href="#">Akkodeon</a>, ë§¥: <a href="#">accordÈon</a>, t»¨D¥: <a href="#">fisarmonica</a>, 8T¥:êç)@ åµ¸ ¨‹  Ï∞ ¡êX E0\, E0Y¡<\î ¨‹ $tX |Ö<\ ÑX‰.</p>';
    add_html += '</div>';
    add_html += '</dd>';
    add_html += '</div>';
    var add = doc.querySelector('#uiAccoAdd');
    add.addEventListener('click', function () {
      var exe = doc.querySelector('#exeAcco1');
      exe.insertAdjacentHTML('beforeend', add_html);
      netive.accordion.init({
        id: 'exeAcco1',
        add: true,
        callback: function callback() {
          console.log('callback');
        }
      });
    });
  };

  netive.page.pageDatePicker = function () {};

  netive.page.capture = function () {//≠
  };

  netive.page.countNumber = function () {
    netive.count.step({
      id: 'exeCount1',
      value: 504025
    });
    netive.uiCountSlide({
      id: 'exeCount2',
      value: 5040.25
    });
  };

  netive.page.fileupload = function () {
    netive.uiFileUpload();
  };
})(window, document);