'use strict'; //Polyfill

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
    }

    function F() {}

    F.prototype = o;
    return new F();
  };
}

if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }

    return -1;
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;

    if (this === null) {
      throw new TypeError('error');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== "function") {
      throw new TypeError('error');
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    k = 0;

    while (k < len) {
      var kValue;

      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }

      k++;
    }
  };
}

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Object.keys) {
  Object.keys = function () {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{
      toDtring: null
    }.propertyIsEnumerable('toString'),
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'varructor'],
        dontEnumsLength = dontEnums.length;
    return function (obj) {
      if (_typeof(obj) !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non=object');
      }

      var result = [],
          prop,
          i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }

      return result;
    };
  }();
} //utils module


;

(function (win, doc, undefined) {
  'use strict';

  var global = 'netive';
  win[global] = {};
  var Global = win[global];
  var UA = navigator.userAgent.toLowerCase();
  var deviceSize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
  var deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10']; //const filter = "win16|win32|win64|mac|macintel";
  //requestAnimationFrame

  win.requestAFrame = function () {
    return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || //if all else fails, use setTimeout
    function (callback) {
      return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
    };
  }();

  win.cancelAFrame = function () {
    return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || function (id) {
      win.clearTimeout(id);
    };
  }(); //components state 


  Global.callback = {};
  Global.state = {
    device: {
      info: function () {
        for (var i = 0, _len = deviceInfo.length; i < _len; i++) {
          if (UA.match(deviceInfo[i]) !== null) {
            return deviceInfo[i];
          }
        }
      }(),
      width: window.innerWidth,
      height: window.innerHeight,
      breakpoint: null,
      colClass: null,
      ios: /ip(ad|hone|od)/i.test(UA),
      android: /android/i.test(UA),
      app: UA.indexOf('appname') > -1 ? true : false,
      touch: null,
      mobile: null,
      os: navigator.appVersion.match(/(mac|win|linux)/i)
    },
    browser: {
      ie: UA.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
      local: /^http:\/\//.test(location.href),
      firefox: /firefox/i.test(UA),
      webkit: /applewebkit/i.test(UA),
      chrome: /chrome/i.test(UA),
      opera: /opera/i.test(UA),
      safari: /applewebkit/i.test(UA) && !/chrome/i.test(UA),
      size: null
    },
    keys: {
      tab: 9,
      enter: 13,
      alt: 18,
      esc: 27,
      space: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40
    },
    scroll: {
      y: 0,
      direction: 'down'
    },
    pageName: function pageName() {
      var page = document.URL.substring(document.URL.lastIndexOf("/") + 1);
      var pagename = page.split('?');
      return pagename[0];
    },
    breakPoint: [600, 905],
    effect: {
      //http://cubic-bezier.com - css easing effect
      linear: '0.250, 0.250, 0.750, 0.750',
      ease: '0.250, 0.100, 0.250, 1.000',
      easeIn: '0.420, 0.000, 1.000, 1.000',
      easeOut: '0.000, 0.000, 0.580, 1.000',
      easeInOut: '0.420, 0.000, 0.580, 1.000',
      easeInQuad: '0.550, 0.085, 0.680, 0.530',
      easeInCubic: '0.550, 0.055, 0.675, 0.190',
      easeInQuart: '0.895, 0.030, 0.685, 0.220',
      easeInQuint: '0.755, 0.050, 0.855, 0.060',
      easeInSine: '0.470, 0.000, 0.745, 0.715',
      easeInExpo: '0.950, 0.050, 0.795, 0.035',
      easeInCirc: '0.600, 0.040, 0.980, 0.335',
      easeInBack: '0.600, -0.280, 0.735, 0.045',
      easeOutQuad: '0.250, 0.460, 0.450, 0.940',
      easeOutCubic: '0.215, 0.610, 0.355, 1.000',
      easeOutQuart: '0.165, 0.840, 0.440, 1.000',
      easeOutQuint: '0.230, 1.000, 0.320, 1.000',
      easeOutSine: '0.390, 0.575, 0.565, 1.000',
      easeOutExpo: '0.190, 1.000, 0.220, 1.000',
      easeOutCirc: '0.075, 0.820, 0.165, 1.000',
      easeOutBack: '0.175, 0.885, 0.320, 1.275',
      easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
      easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
      easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
      easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
      easeInOutSine: '0.445, 0.050, 0.550, 0.950',
      easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
      easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
      easeInOutBack: '0.680, -0.550, 0.265, 1.550'
    }
  };
  Global.parts = {
    //resize state
    resizeState: function resizeState() {
      var timerWin;

      var act = function act() {
        var browser = Global.state.browser;
        var device = Global.state.device;
        device.width = window.innerWidth;
        device.height = window.innerHeight;
        device.touch = device.ios || device.android || doc.ontouchstart !== undefined && doc.ontouchstart !== null;
        device.mobile = device.touch && (device.ios || device.android);
        device.os = device.os ? device.os[0] : '';
        device.os = device.os.toLowerCase();
        device.breakpoint = device.width >= deviceSize[5] ? true : false;
        device.colClass = device.width >= deviceSize[5] ? 'col-12' : device.width > deviceSize[8] ? 'col-8' : 'col-4';

        if (browser.ie) {
          browser.ie = browser.ie = parseInt(browser.ie[1] || browser.ie[2]);
          11 > browser.ie ? support.pointerevents = false : '';
          9 > browser.ie ? support.svgimage = false : '';
        } else {
          browser.ie = false;
        }

        var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
        var clsMobileSystem = device.ios ? "ios" : device.android ? "android" : 'etc';
        var clsMobile = device.mobile ? device.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
        var el_html = doc.querySelector('html');
        el_html.classList.remove('col-12', 'col-8', 'col-4');
        el_html.classList.add(device.colClass, clsBrowser, clsMobileSystem, clsMobile);
        var w = window.innerWidth;
        clearTimeout(timerWin);
        timerWin = setTimeout(function () {
          el_html.classList.remove('size-tablet');
          el_html.classList.remove('size-desktop');
          el_html.classList.remove('size-mobile');
          el_html.classList.remove('size-desktop');

          if (w < Global.state.breakPoint[0]) {
            Global.state.browser.size = 'mobile';
            el_html.classList.add('size-mobile');
          } else if (w < Global.state.breakPoint[1]) {
            Global.state.browser.size = 'tablet';
            el_html.classList.add('size-tablet');
          } else {
            Global.state.browser.sizee = 'desktop';
            el_html.classList.add('size-desktop');
          }
        }, 200);
      };

      win.addEventListener('resize', act);
      act();
    },

    /**
    * append html : 지정된 영역 안에 마지막에 요소 추가하기
    * @param {object} el target element
    * @param {string} str 지정된 영역에 들어갈 값
    * @param {string} htmltag HTML tag element
    */
    appendHtml: function appendHtml(el, str, htmltag) {
      var _htmltag = !!htmltag ? htmltag : 'div';

      var div = doc.createElement(_htmltag);
      div.innerHTML = str;

      while (div.children.length > 0) {
        el.appendChild(div.children[0]);
      }
    },

    /**
    * delete parent tag : 지정된 요소의 부모태그 삭제
    * @param {object} child target element
    */
    deleteParent: function deleteParent(child) {
      var parent = child.parentNode;
      parent.parentNode.removeChild(parent);
    },

    /**
    * wrap tag : 지정된 요소의 tag 감싸기
    * @param {object} child target element
    */
    wrapTag: function wrapTag(front, selector, back) {
      var org_html = selector.innerHTML;
      var new_html = front + org_html + back;
      selector.innerHTML = '';
      selector.insertAdjacentHTML('beforeend', new_html);
    },
    //숫자 세자리수마다 ',' 붙이기
    comma: function comma(n) {
      var parts = n.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    },
    //숫자 한자리수 일때 0 앞에 붙이기
    add0: function add0(x) {
      return Number(x) < 10 ? '0' + x : x;
    },
    //주소의 파라미터 값 가져오기
    para: function para(paraname) {
      var tempUrl = win.location.search.substring(1);
      var tempArray = tempUrl.split('&');
      var tempArray_len = tempArray.length;
      var keyValue;

      for (var i = 0, len = tempArray_len; i < len; i++) {
        keyValue = tempArray[i].split('=');

        if (keyValue[0] === paraname) {
          return keyValue[1];
        }
      }
    },
    //기본 선택자 설정
    selectorType: function selectorType(v) {
      var base = document.querySelector('body');

      if (v !== null) {
        if (typeof v === 'string') {
          base = document.querySelector(v);
        } else {
          base = v;
        }
      }

      return base;
    },
    RAF: function RAF(start, end, startTime, duration) {
      var _start = start;
      var _end = end;

      var _duration = duration ? duration : 300;

      var unit = (_end - _start) / _duration;
      var endTime = startTime + _duration;
      var now = new Date().getTime();
      var passed = now - startTime;

      if (now <= endTime) {
        Global.parts.RAF.time = _start + unit * passed;
        requestAnimationFrame(scrollTo);
      } else {
        !!callback && callback();
        console.log('End off.');
      }
    },
    getIndex: function getIndex(ele) {
      var _i = 0;

      while ((ele = ele.previousSibling) != null) {
        _i++;
      }

      return _i;
    },
    toggleSlide: function toggleSlide(opt) {
      var el = opt.el;
      var state = opt.state;
      var n;

      if (state === 'toggle') {
        0 === el.offsetHeight ? show() : hide();
      } else {
        state === 'show' ? show() : hide();
      }

      function show() {
        el.setAttribute('aria-hidden', false);
        el.style.height = "auto";
        n = el.offsetHeight;
        el.style.height = 0;
        void el.offsetHeight;
        el.style.height = "".concat(n, "px");
      }

      function hide() {
        el.setAttribute('aria-hidden', true);
        el.style.height = 0;
      }
    }
  };
  Global.parts.resizeState();
  Global.option = {
    join: function join(org, add) {
      console.log(org, add);
      var object1 = {};
      Object.defineProperties(object1, org, add);
      console.log(object1);
    }
  };
  Global.loading = {
    timerShow: {},
    timerHide: {},
    options: {
      selector: null,
      message: null,
      styleClass: 'orbit' //time

    },
    show: function show(option) {
      var opt = Object.assign({}, this.options, option); //Global.option.join(this.options, option);

      var selector = opt.selector,
          styleClass = opt.styleClass,
          message = opt.message;
      console.log(selector, styleClass, message);
      var el = selector !== null ? selector : doc.querySelector('body');
      var el_loadingHides = doc.querySelectorAll('.ui-loading:not(.visible)');

      var _iterator = _createForOfIteratorHelper(el_loadingHides),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var that = _step.value;
          that.remove();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var htmlLoading = '';
      selector === null ? htmlLoading += '<div class="ui-loading ' + styleClass + '">' : htmlLoading += '<div class="ui-loading type-area ' + styleClass + '">';
      htmlLoading += '<div class="ui-loading-wrap">';
      message !== null ? htmlLoading += '<strong class="ui-loading-message"><span>' + message + '</span></strong>' : htmlLoading += '';
      htmlLoading += '</div>';
      htmlLoading += '</div>';
      clearTimeout(this.timerShow);
      clearTimeout(this.timerHide);
      this.timerShow = setTimeout(showLoading, 300);

      function showLoading() {
        !el.querySelector('.ui-loading') && el.insertAdjacentHTML('beforeend', htmlLoading);
        htmlLoading = null;
        var el_loadings = doc.querySelectorAll('.ui-loading');

        var _iterator2 = _createForOfIteratorHelper(el_loadings),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var that = _step2.value;
            that.classList.add('visible');
            that.classList.remove('close');
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    },
    hide: function hide() {
      clearTimeout(this.timerShow);
      this.timerHide = setTimeout(function () {
        var el_loadings = doc.querySelectorAll('.ui-loading');

        var _iterator3 = _createForOfIteratorHelper(el_loadings),
            _step3;

        try {
          var _loop = function _loop() {
            var that = _step3.value;
            that.classList.add('close');
            setTimeout(function () {
              that.classList.remove('visible');
              that.remove();
            }, 300);
          };

          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }, 300);
    }
  };
  Global.ajax = {
    options: {
      page: true,
      add: false,
      prepend: false,
      effect: false,
      loading: false,
      callback: false,
      errorCallback: false,
      type: 'GET',
      cache: false,
      async: true,
      contType: 'application/x-www-form-urlencoded',
      dataType: 'html'
    },
    init: function init(option) {
      if (option === undefined) {
        return false;
      }

      var xhr = new XMLHttpRequest();
      var opt = Object.assign({}, this.options, option);
      var area = opt.area,
          loading = opt.loading,
          effect = opt.effect,
          type = opt.type,
          url = opt.url,
          page = opt.page,
          add = opt.add,
          prepend = opt.prepend,
          mimeType = opt.mimeType,
          contType = opt.contType;
      var callback = opt.callback || false;
      var errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;
      loading && Global.loading.show();

      if (!!effect && !!document.querySelector(effect)) {
        area.classList.remove(effect + ' action');
        area.classList.add(effect);
      }

      xhr.open(type, url);
      xhr.setRequestHeader(mimeType, contType);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
          return;
        }

        if (xhr.status === 200) {
          loading && Global.loading.hide();

          if (page) {
            if (add) {
              prepend ? area.insertAdjacentHTML('afterbegin', xhr.responseText) : area.insertAdjacentHTML('beforeend', xhr.responseText);
            } else {
              area.innerHTML = xhr.responseText;
            }

            callback && callback();
            effect && area.classList.add('action');
          } else {
            callback && callback(xhr.responseText);
          }
        } else {
          loading && Global.loading.hide();
          errorCallback ? errorCallback() : '';
        }
      };
    }
  };
  /**
   * intersection observer
   */
  // Global.io = new IntersectionObserver(function (entries) {
  // 	entries.forEach(function (entry) {
  // 		if (entry.intersectionRatio > 0) {
  // 			entry.target.classList.add('tada');
  // 		} else {
  // 			entry.target.classList.remove('tada');
  // 		}
  // 	});
  // });

  Global.scroll = {
    options: {
      selector: document.querySelector('html, body'),
      focus: false,
      top: 0,
      left: 0,
      add: 0,
      align: 'default',
      effect: 'smooth',
      //'auto'
      callback: false
    },
    init: function init() {
      var el_areas = document.querySelectorAll('.ui-scrollmove-btn[data-area]');

      var _iterator4 = _createForOfIteratorHelper(el_areas),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var el_this = _step4.value;
          el_this.removeEventListener('click', this.act);
          el_this.addEventListener('click', this.act);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    },
    act: function act(e) {
      var that = e.currentTarget;
      var area = that.dataset.area;
      var name = that.dataset.name;
      var add = that.dataset.add === undefined ? 0 : that.dataset.add;
      var align = that.dataset.align === undefined ? 'default' : that.dataset.align;
      var callback = that.dataset.callback === undefined ? false : that.dataset.callback;
      var el_area = doc.querySelector('.ui-scrollmove[data-area="' + area + '"]');
      var el_item = el_area.querySelector('.ui-scrollmove-item[data-name="' + name + '"]');
      var top = el_area.getBoundingClientRect().top - el_item.getBoundingClientRect().top - el_area.scrollTop;
      var left = el_area.getBoundingClientRect().left - el_item.getBoundingClientRect().left - el_area.scrollLeft;

      if (align === 'center') {
        top = top - el_item.offsetHeight / 2;
        left = left - el_item.offsetWidth / 2;
      }

      Global.scroll.move({
        top: top,
        left: left,
        add: add,
        selector: el_area,
        align: align,
        focus: el_item,
        callback: callback
      });
    },
    move: function move(option) {
      var opt = Object.assign({}, this.options, option);
      var top = opt.top,
          left = opt.left,
          callback = opt.callback,
          align = opt.align,
          add = opt.add,
          focus = opt.focus,
          effect = opt.effect;
      var selector = opt.selector; //jquery selector인 경우 변환
      // if (!!selector[0]) {
      // 	selector = selector[0];
      // }

      console.log(selector);

      switch (align) {
        case 'default':
          selector.scrollTo({
            top: Math.abs(top) + add,
            left: Math.abs(left) + add,
            behavior: effect
          });
          break;

        case 'center':
          selector.scrollTo({
            top: Math.abs(top) - selector.offsetHeight / 2 + add,
            left: Math.abs(left) - selector.offsetWidth / 2 + add,
            behavior: effect
          });
          break;
      }

      this.checkEnd({
        selector: selector,
        nowTop: selector.scrollTop,
        nowLeft: selector.scrollLeft,
        align: align,
        callback: callback,
        focus: focus
      });
    },
    checkEndTimer: {},
    checkEnd: function checkEnd(opt) {
      var el_selector = opt.selector;
      var align = opt.align,
          focus = opt.focus,
          callback = opt.callback;
      var nowTop = opt.nowTop;
      var nowLeft = opt.nowLeft;
      Global.scroll.checkEndTimer = setTimeout(function () {
        //스크롤 현재 진행 여부 판단
        if (nowTop === el_selector.scrollTop && nowLeft === el_selector.scrollLeft) {
          clearTimeout(Global.scroll.checkEndTimer); //포커스가 위치할 엘리먼트를 지정하였다면 실행

          if (!!focus) {
            focus.setAttribute('tabindex', 0);
            focus.focus();
          } //스크롤 이동후 콜백함수 실행


          if (!!callback) {
            if (typeof callback === 'string') {
              Global.callback[callback]();
            } else {
              callback();
            }
          }
        } else {
          nowTop = el_selector.scrollTop;
          nowLeft = el_selector.scrollLeft;
          Global.scroll.checkEnd({
            selector: el_selector,
            nowTop: nowTop,
            nowLeft: nowLeft,
            align: align,
            callback: callback,
            focus: focus
          });
        }
      }, 100);
    },
    optionsParllax: {
      selector: null,
      area: null
    },
    parallax: function parallax(option) {
      var _opt$area, _opt$selector;

      var opt = Object.assign({}, this.optionsParllax, option);
      var el_area = (_opt$area = opt.area) !== null && _opt$area !== void 0 ? _opt$area : window;
      var el_parallax = (_opt$selector = opt.selector) !== null && _opt$selector !== void 0 ? _opt$selector : doc.querySelector('.ui-parallax');
      var el_wraps = el_parallax.querySelectorAll(':scope > .ui-parallax-wrap');
      act();
      el_area.addEventListener('scroll', act);

      function act() {
        var isWin = el_area === window;
        var areaH = isWin ? window.innerHeight : el_area.offsetHeight;
        var areaT = isWin ? Math.floor(window.scrollY) : Math.floor(el_area.scrollTop);
        var baseT = Math.floor(el_wraps[0].getBoundingClientRect().top);

        var _iterator5 = _createForOfIteratorHelper(el_wraps),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var el_wrap = _step5.value;
            var el_items = el_wrap.querySelectorAll('.ui-parallax-item');
            var attrStart = el_wrap.dataset.start === undefined ? 0 : el_wrap.dataset.start;
            var attrEnd = el_wrap.dataset.end === undefined ? 0 : el_wrap.dataset.end;
            var h = Math.floor(el_wrap.offsetHeight);
            var start = Math.floor(el_wrap.getBoundingClientRect().top);
            var end = h + start;
            var s = areaH * Number(attrStart) / 100;
            var e = areaH * Number(attrEnd) / 100;

            if (opt.area !== 'window') {
              start = start + areaT - (baseT + areaT);
              end = end + areaT - (baseT + areaT);
            }

            areaT >= start - s ? el_wrap.classList.add('parallax-s') : el_wrap.classList.remove('parallax-s');
            areaT >= end - e ? el_wrap.classList.add('parallax-e') : el_wrap.classList.remove('parallax-e');

            var _iterator6 = _createForOfIteratorHelper(el_items),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var el_item = _step6.value;
                var n = ((areaT - (start - s)) * 0.003).toFixed(2);
                var callbackname = el_item.dataset.act; //n = n < 0 ? 0 : n > 1 ? 1 : n;

                if (!!Global.callback[callbackname]) {
                  Global.callback[callbackname]({
                    el: el_item,
                    n: n
                  });
                }

                el_item.setAttribute('data-parallax', n);
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }
  };
  Global.para = {
    get: function get(paraname) {
      var _tempUrl = win.location.search.substring(1);

      var _tempArray = _tempUrl.split('&');

      var _keyValue;

      for (var i = 0, _len2 = _tempArray.length; i < _len2; i++) {
        _keyValue = _tempArray[i].split('=');

        if (_keyValue[0] === paraname) {
          return _keyValue[1];
        }
      }
    }
  };
  Global.focus = {
    options: {
      callback: false
    },
    loop: function loop(option) {
      if (option === undefined) {
        return false;
      }

      var opt = Object.assign({}, Global.focus.options, option);
      var el = opt.selector;
      var callback = opt.callback; // var $focusItem = $base.find('input, h1, h2, h3, a, button, label, textarea, select').eq(0);
      // $focusItem.attr('tabindex', 0).focus();

      if (!el.querySelector('[class*="ui-focusloop-"]')) {
        el.insertAdjacentHTML('afterbegin', '<div tabindex="0" class="ui-focusloop-start"><span>시작지점입니다.</span></div>');
        el.insertAdjacentHTML('beforeend', '<div tabindex="0" class="ui-focusloop-end"><span>마지막지점입니다.</span></div>');
      }

      var el_start = el.querySelector('.ui-focusloop-start');
      var el_end = el.querySelector('.ui-focusloop-end');
      el_start.addEventListener('keydown', keyStart);
      el_end.addEventListener('keydown', keyEnd);

      function keyStart(e) {
        if (e.shiftKey && e.keyCode == 9) {
          e.preventDefault();
          el_end.focus(); // !!callback && callback();
        }
      }

      function keyEnd(e) {
        if (!e.shiftKey && e.keyCode == 9) {
          e.preventDefault();
          el_start.focus(); // !!callback && callback();
        }
      }
    }
  };

  var ScrollBar = /*#__PURE__*/function () {
    //객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화
    function ScrollBar(idName) {
      _classCallCheck(this, ScrollBar);

      this.id = idName;

      this.callback = function () {
        console.log("".concat(idName, " \uCEE4\uC2A4\uD140 \uC2A4\uD06C\uB864 \uC900\uBE44\uC644\uB8CC"));
      };

      this.infiniteCallback = false;
    } //메서드 사이엔 쉼표가 없습니다.


    _createClass(ScrollBar, [{
      key: "init",
      value: function init(option) {
        var opt = Object.assign({}, this, option);
        var id = opt.id;
        var callback = opt.callback;
        var infiniteCallback = opt.infiniteCallback;
        var el_scrollbar = doc.querySelector('[data-scroll-id="' + id + '"]');
        var timer;
        var prevHeightPercent = 0;
        var scrollDirection = 'keep'; //+reset

        if (el_scrollbar.dataset.ready === 'yes') {
          return false;
        }

        el_scrollbar.classList.remove('ready');
        el_scrollbar.dataset.ready = 'no';
        el_scrollbar.dataset.direction = scrollDirection;
        var wrapW = el_scrollbar.offsetWidth;
        var wrapH = el_scrollbar.offsetHeight;
        Global.parts.wrapTag('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap">', el_scrollbar, '</div></div>'); //++make

        var el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
        var el_itemWrap = el_item.querySelector('.ui-scrollbar-wrap');
        var _display = window.getComputedStyle(el_scrollbar).display;
        var _padding = window.getComputedStyle(el_scrollbar).padding;
        el_itemWrap.style.display = _display;
        el_itemWrap.style.padding = _padding;

        if (_display === 'inline-block') {
          el_itemWrap.style.display = 'block';
        }

        el_itemWrap.style.width = '100%';
        el_item.style.width = '100%';
        el_scrollbar.style.overflow = 'hidden';
        var itemW = el_item.scrollWidth;
        var itemH = el_item.scrollHeight;
        el_scrollbar.dataset.itemH = itemH;
        el_scrollbar.dataset.itemW = itemW;
        el_scrollbar.dataset.wrapH = wrapH;
        el_scrollbar.dataset.wrapW = wrapW;

        if (el_scrollbar.dataset.ready === 'no') {
          el_scrollbar.dataset.ready = 'yes';
          el_scrollbar.classList.add('ready');
          el_item.setAttribute('tabindex', 0);
          el_scrollbar.style.height = wrapH + 'px';
          var html_barwrap = doc.createElement('div');
          var html_barwrapX = doc.createElement('div');
          var html_button = doc.createElement('button');
          var html_buttonX = doc.createElement('button');
          html_barwrap.classList.add('ui-scrollbar-barwrap');
          html_barwrap.classList.add('type-y');
          html_barwrapX.classList.add('ui-scrollbar-barwrap');
          html_barwrapX.classList.add('type-x');
          html_button.classList.add('ui-scrollbar-bar');
          html_button.setAttribute('type', 'button');
          html_button.setAttribute('aria-hidden', true);
          html_button.setAttribute('aria-label', 'vertical scroll button');
          html_button.setAttribute('tabindex', '-1');
          html_button.dataset.scrollxy = 'y';
          html_buttonX.classList.add('ui-scrollbar-bar');
          html_buttonX.setAttribute('type', 'button');
          html_buttonX.setAttribute('aria-hidden', true);
          html_buttonX.setAttribute('aria-label', 'vertical scroll button');
          html_buttonX.setAttribute('tabindex', '-1');
          html_buttonX.dataset.scrollxy = 'x';
          html_barwrap.append(html_button);
          html_barwrapX.append(html_buttonX);
          el_scrollbar.prepend(html_barwrap);
          el_scrollbar.prepend(html_barwrapX);
          wrapH < itemH ? el_scrollbar.classList.add('view-y') : el_scrollbar.classList.remove('view-y');
          wrapW < itemW ? el_scrollbar.classList.add('view-x') : el_scrollbar.classList.remove('view-x');
          var barH = Math.floor(wrapH / (itemH / 100));
          var barW = Math.floor(wrapW / (itemW / 100));
          var el_barY = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
          var el_barX = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
          console.log(el_scrollbar);
          el_barY.style.height = barH + '%';
          el_barX.style.height = barW + '%';
          el_barY.dataset.height = barH;
          el_barX.dataset.height = barW;
          el_scrollbar.classList.add('view-scrollbar');
          !!callback && callback();
          scrollEvent(false, el_item);
          scrollbarUpdate(el_scrollbar, wrapH, wrapW, itemH, itemW);
          eventFn(el_scrollbar);
        }

        function scrollbarUpdate(el_scrollbar, wrapH, wrapW, itemH, itemW) {
          var _el_scrollbar = el_scrollbar;

          var el_item = _el_scrollbar.querySelector('.ui-scrollbar-item');

          if (!el_item) {
            return false;
          }

          var nWrapH = _el_scrollbar.offsetHeight;
          var nWrapW = _el_scrollbar.offsetWidth;
          var nItemH = el_item.scrollHeight;
          var nItemW = el_item.scrollWidth;
          var changeH = itemH !== nItemH || wrapH !== nWrapH;
          var changeW = itemW !== nItemW || wrapW !== nWrapW; //resizing

          if (changeH || changeW) {
            var _barH = Math.floor(nWrapH / (nItemH / 100));

            var _barW = Math.floor(nWrapW / (nItemW / 100));

            var _el_barY = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');

            var _el_barX = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

            if (changeH) {
              _el_barY.style.height = _barH + '%';
              _el_barY.dataset.height = _barH;
            }

            if (changeW) {
              _el_barX.style.width = _barW + '%';
              _el_barX.dataset.width = _barW;
            }

            nWrapH < nItemH ? _el_scrollbar.classList.add('view-y') : _el_scrollbar.classList.remove('view-y');
            nWrapW < nItemW ? _el_scrollbar.classList.add('view-x') : _el_scrollbar.classList.remove('view-x');
            el_scrollbar.dataset.itemH = nItemH;
            el_scrollbar.dataset.itemW = nItemW;
            el_scrollbar.dataset.wrapH = nWrapH;
            el_scrollbar.dataset.wrapW = nWrapW;
          }

          setTimeout(function () {
            scrollbarUpdate(el_scrollbar, nWrapH, nWrapW, nItemH, nItemW);
          }, 300);
        }

        function eventFn(v) {
          var _el_scrollbar = el_scrollbar;

          var el_item = _el_scrollbar.querySelector('.ui-scrollbar-item');

          var el_bar = _el_scrollbar.querySelectorAll('.ui-scrollbar-bar');

          el_item.addEventListener('scroll', scrollEvent);

          var _iterator7 = _createForOfIteratorHelper(el_bar),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var bar = _step7.value;
              bar.addEventListener('mousedown', dragMoveAct);
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }

        function scrollEvent(event, el_item) {
          var _el_item = !!event ? event.target : el_item;

          var el_scrollbar = _el_item.closest('.ui-scrollbar');

          var itemH = Number(el_scrollbar.dataset.itemH);
          var itemW = Number(el_scrollbar.dataset.itemW);
          var wrapH = Number(el_scrollbar.dataset.wrapH);
          var wrapW = Number(el_scrollbar.dataset.wrapW); //el_scrollbar.dataset 값이 없을 경우 4개의 값중 하나라도 없으면 중단

          if (wrapW === undefined) {
            return false;
          }

          var el_barY = el_scrollbar.querySelector('.type-y .ui-scrollbar-bar');
          var el_barX = el_scrollbar.querySelector('.type-x .ui-scrollbar-bar');
          var scrT = _el_item.scrollTop;
          var scrL = _el_item.scrollLeft;
          var barH = Number(el_barY.dataset.height);
          var barW = Number(el_barX.dataset.width);
          var hPer = Math.round(scrT / (itemH - wrapH) * 100);
          var wPer = Math.round(scrL / (itemW - wrapW) * 100);

          var _hPer = barH / 100 * hPer;

          var _wPer = barW / 100 * wPer;

          el_barY.style.top = hPer - _hPer + '%';
          el_barX.style.left = wPer - _wPer + '%';

          if (prevHeightPercent < scrT) {
            scrollDirection = 'down';
          } else if (prevHeightPercent > scrT) {
            scrollDirection = 'up';
          } else {
            scrollDirection = 'keep';
          }

          el_scrollbar.dataset.direction = scrollDirection;
          prevHeightPercent = scrT;

          if (hPer === 100 && scrollDirection === 'down') {
            clearTimeout(timer);
            timer = setTimeout(function () {
              !!infiniteCallback && infiniteCallback();
            }, 200);
          }
        }

        function dragMoveAct(event) {
          var body = doc.querySelector('body');
          var el_bar = event.target;
          var el_scrollbar = el_bar.closest('.ui-scrollbar');
          var el_barWrap = el_bar.closest('.ui-scrollbar-barwrap');
          var el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
          var itemH = Number(el_scrollbar.dataset.itemH);
          var itemW = Number(el_scrollbar.dataset.itemW);
          var el_barWrapRect = el_barWrap.getBoundingClientRect();
          var off_t = el_barWrapRect.top + doc.documentElement.scrollTop;
          var off_l = el_barWrapRect.left + doc.documentElement.scrollLeft;
          var w_h = el_barWrapRect.height;
          var w_w = el_barWrapRect.width;
          var barH = el_bar.getAttribute('data-height');
          var barW = el_bar.getAttribute('data-width');
          var isXY = el_bar.getAttribute('data-scrollxy');
          body.classList.add('scrollbar-move');
          doc.addEventListener('mousemove', mousemoveAct);
          doc.addEventListener('mouseup', mouseupAct);

          function mousemoveAct(event) {
            var y_m;
            var x_m;

            if (event.touches === undefined) {
              if (event.pageY !== undefined) {
                y_m = event.pageY;
              } else if (event.pageY === undefined) {
                y_m = event.clientY;
              }

              if (event.pageX !== undefined) {
                x_m = event.pageX;
              } else if (event.pageX === undefined) {
                x_m = event.clientX;
              }
            }

            var yR = y_m - off_t;
            var xR = x_m - off_l;
            yR = yR < 0 ? 0 : yR;
            yR = yR > w_h ? w_h : yR;
            xR = xR < 0 ? 0 : xR;
            xR = xR > w_w ? w_w : xR;
            var yRPer = yR / w_h * 100;
            var xRPer = xR / w_w * 100;
            var nPerY = (yRPer - barH / 100 * yRPer).toFixed(2);
            var nPerX = (xRPer - barW / 100 * xRPer).toFixed(2);

            if (isXY === 'y') {
              el_bar.style.top = nPerY + '%';
              el_item.scrollTop = itemH * nPerY / 100;
            } else {
              el_bar.style.left = nPerX + '%';
              el_item.scrollLeft = itemW * nPerX / 100;
            }
          }

          function mouseupAct() {
            body.classList.remove('scrollbar-move');
            doc.removeEventListener('mousemove', mousemoveAct);
            doc.removeEventListener('mouseup', mouseupAct);
          }
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var el_scrollbar = doc.querySelector('[data-scroll-id="' + this.id + '"]');
        var el_barwrap = el_scrollbar.querySelectorAll('.ui-scrollbar-barwrap');
        var el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
        var el_wrap = el_item.querySelector('.ui-scrollbar-wrap');
        var wrapHtml = el_wrap.innerHTML;
        el_scrollbar.dataset.ready = 'no';
        el_scrollbar.classList.remove('ready');
        el_scrollbar.classList.remove('view-y');
        el_scrollbar.classList.remove('view-x');
        el_scrollbar.classList.remove('view-scrollbar');
        el_scrollbar.style.overflow = 'auto'; //el_scrollbar.removeAttribute('style');

        el_barwrap.forEach(function (userItem) {
          el_scrollbar.removeChild(userItem);
        });
        el_scrollbar.removeChild(el_item);
        el_scrollbar.innerHTML = wrapHtml;
      }
    }, {
      key: "reset",
      value: function reset(opt) {
        console.log(this);
        Global.uiScrollBar[this.id].destroy();
        Global.uiScrollBar[this.id].init({
          infiniteCallback: opt.infiniteCallback
        });
      }
    }]);

    return ScrollBar;
  }(); //uiScrollBar 실행함수 생성


  Global.scrollBar = function (opt) {
    var scrollBar = doc.querySelectorAll('.ui-scrollbar');

    if (opt !== undefined && opt.selector !== undefined) {
      scrollBar = opt.selector;
    }

    if (sessionStorage.getItem('scrollbarID') === null) {
      sessionStorage.setItem('scrollbarID', 0);
    }

    if (scrollBar.length === undefined) {
      var scrollId = scrollBar.getAttribute('data-scroll-id');

      if (!scrollId) {
        var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));
        idN = idN + 1;
        sessionStorage.setItem('scrollbarID', idN);
        scrollId = 'item' + idN;
        scrollBar.dataset.scrollId = scrollId;
      }

      Global.scrollBar[scrollId] = new ScrollBar(scrollId);
      setTimeout(function () {
        Global.scrollBar[scrollId].init();
      }, 0);
    } else {
      var _iterator8 = _createForOfIteratorHelper(scrollBar),
          _step8;

      try {
        var _loop2 = function _loop2() {
          var that = _step8.value;
          var scrollId = that.getAttribute('data-scroll-id');

          if (that.dataset.ready !== 'yes') {
            if (!scrollId) {
              var _idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

              _idN = _idN + 1;
              sessionStorage.setItem('scrollbarID', _idN);
              scrollId = 'item' + _idN;
              that.dataset.scrollId = scrollId;
            }

            Global.scrollBar[scrollId] = new ScrollBar(scrollId);
            setTimeout(function () {
              Global.scrollBar[scrollId].init();
            }, 0);
          }
        };

        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  };

  Global.popup = {
    options: {
      name: 'new popup',
      width: 790,
      height: 620,
      align: 'center',
      top: 0,
      left: 0,
      toolbar: 'no',
      location: 'no',
      menubar: 'no',
      status: 'no',
      resizable: 'no',
      scrollbars: 'yes'
    },
    open: function open(option) {
      var opt = Object.assign({}, this.options, option);
      var name = opt.name,
          width = opt.width,
          height = opt.height,
          align = opt.align,
          toolbar = opt.toolbar,
          location = opt.location,
          menubar = opt.menubar,
          status = opt.status,
          resizable = opt.resizable,
          scrollbars = opt.scrollbars,
          link = opt.link;
      var top = opt.top,
          left = opt.left;

      if (align === 'center') {
        left = win.innerWidth / 2 - width / 2;
        top = win.innerHeight / 2 - height / 2;
      }

      var specs = 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top + ', toolbar=' + toolbar + ', location=' + location + ', resizable=' + resizable + ', status=' + status + ', menubar=' + menubar + ', scrollbars=' + scrollbars;
      win.open(link, name, specs);
    }
  };
  Global.cookie = {
    set: function set(opt) {
      var name = opt.name,
          value = opt.value,
          term = opt.term,
          path = opt.path,
          domain = opt.domain;
      var cookieset = name + '=' + value + ';';
      var expdate;

      if (term) {
        expdate = new Date();
        expdate.setTime(expdate.getTime() + term * 1000 * 60 * 60 * 24); // term 1 is a day

        cookieset += 'expires=' + expdate.toGMTString() + ';';
      }

      path ? cookieset += 'path=' + path + ';' : '';
      domain ? cookieset += 'domain=' + domain + ';' : '';
      document.cookie = cookieset;
    },
    get: function get(name) {
      var match = (document.cookie || ' ').match(new RegExp(name + ' *= *([^;]+)'));
      return match ? match[1] : null;
    },
    del: function del(name) {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + -1);
      this.set({
        name: name,
        term: '-1'
      });
    }
  };
  Global.table = {
    sort: function sort(opt) {
      var table = doc.querySelector('#' + opt.id);
      var switchcount = 0;
      var switching = true;
      var dir = "asc";
      var rows, o, x, y, shouldSwitch;

      while (switching) {
        switching = false;
        rows = table.getElementsByTagName('TR');
      }

      console.log(rows.length);

      for (o = 1; o < rows.length - 1; o++) {
        shouldSwitch = false;
        x = rows[o].getElementsByTagName('TD')[opt.n];
        y = rows[o + 1].getElementsByTagName('TD')[opt.n];
        console.log(opt.n);

        if (dir === 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[o].parentNode.insertBefore(rows[o + 1], rows[o]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    },
    caption: function caption() {
      var el_captions = doc.querySelectorAll('.ui-caption');

      var _iterator9 = _createForOfIteratorHelper(el_captions),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var that = _step9.value;
          that.textContent = '';
          var el_table = that.closest('table');
          var ths = el_table.querySelectorAll('th');
          var captionTxt = '';

          var _iterator10 = _createForOfIteratorHelper(ths),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var _that = _step10.value;
              var txt = _that.textContent;
              captionTxt !== '' ? captionTxt += ', ' + txt : captionTxt += txt;
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }

          that.textContent = captionTxt + ' 정보입니다.';
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    },
    scrollOption: {
      callback: false
    },
    scroll: function scroll(option) {
      var opt = Object.assign({}, this.scrollOption, option);
      var callback = opt.callback;
      var el_wraps = doc.querySelectorAll('.ui-tablescroll');

      var _iterator11 = _createForOfIteratorHelper(el_wraps),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var that = _step11.value;
          var el_tblWrap = that.querySelector('.ui-tablescroll-wrap');
          var el_tbl = el_tblWrap.querySelector('table');
          var cloneTable = el_tbl.cloneNode(true);

          if (!el_tbl.querySelector('.ui-tablescroll-clone')) {
            that.prepend(cloneTable);
            var clone_tbl = that.querySelector(':scope > table:first-child');
            var clone_ths = clone_tbl.querySelectorAll('th');
            var clone_caption = clone_tbl.querySelector('caption');
            var clone_tbodys = clone_tbl.querySelectorAll('tbody');
            clone_caption.remove();

            var _iterator12 = _createForOfIteratorHelper(clone_tbodys),
                _step12;

            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var _that2 = _step12.value;

                _that2.remove();
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }

            clone_tbl.classList.add('ui-tablescroll-clone');
            clone_tbl.setAttribute('aria-hidden', true);

            var _iterator13 = _createForOfIteratorHelper(clone_ths),
                _step13;

            try {
              for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                var _that3 = _step13.value;

                _that3.setAttribute('aria-hidden', true);
              }
            } catch (err) {
              _iterator13.e(err);
            } finally {
              _iterator13.f();
            }
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      !!callback && callback();
    },
    fixTd: function fixTd() {
      var el_tbls = doc.querySelectorAll('.ui-fixtd');

      var _iterator14 = _createForOfIteratorHelper(el_tbls),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var that = _step14.value;
          var el_tblCols = that.querySelectorAll('col');
          var el_tblTrs = that.querySelectorAll('tr');
          var fix_n = Number(that.dataset.fix);
          var view_n = Number(that.dataset.view);
          var col_len = el_tblCols.length;
          var fix_sum = col_len - fix_n;
          var _len3 = el_tblTrs.length;
          var tit = [];
          that.setAttribute('data-current', 1);
          that.setAttribute('data-total', col_len);

          for (var i = 0; i < _len3; i++) {
            for (var j = 0; j < fix_sum; j++) {
              var tr = el_tblTrs[i];
              var thead = tr.closest('thead');
              var tds = tr.querySelectorAll(':scope > *');
              var td = tds[j + fix_sum - 1];
              var jj = j + 1;
              el_tblCols[j + fix_sum - 1].classList.add('ui-fixtd-n' + jj);
              td.classList.add('ui-fixtd-n' + jj);
              td.dataset.n = j;

              if (!!thead) {
                tit.push(td.textContent);
                td.insertAdjacentHTML('beforeend', '<button type="button" class="ui-fixtd-btn prev" data-btn="prev" data-idx="' + jj + '"><span class="a11y-hidden">previous</span></button>');
                td.insertAdjacentHTML('afterbegin', '<button type="button" class="ui-fixtd-btn next" data-btn="next" data-idx="' + jj + '"><span class="a11y-hidden">next</span></button>');
              }
            }
          }

          var el_btns = that.querySelectorAll('.ui-fixtd-btn');

          var _iterator15 = _createForOfIteratorHelper(el_btns),
              _step15;

          try {
            for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
              var _that4 = _step15.value;

              _that4.addEventListener('click', act);
            }
          } catch (err) {
            _iterator15.e(err);
          } finally {
            _iterator15.f();
          }
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }

      function act(e) {
        var btn = e.currentTarget;
        var el_table = btn.closest('.ui-fixtd');
        var this_sum = Number(el_table.dataset.total - el_table.dataset.fix);
        var n = Number(el_table.dataset.current);
        btn.dataset.btn === 'next' ? el_table.dataset.current = n + 1 > this_sum ? n = 1 : n + 1 : el_table.dataset.current = n - 1 <= 0 ? n = this_sum : n - 1;
      }
    }
  };
  Global.form = {
    init: function init(opt) {
      var el_inps = doc.querySelectorAll('.inp-base');

      var _iterator16 = _createForOfIteratorHelper(el_inps),
          _step16;

      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var that = _step16.value;
          var el_wrap = that.parentNode;
          var el_form = that.closest('[class*="ui-form"]');
          var unit = that.dataset.unit;
          var prefix = that.dataset.prefix;
          var el_label = el_form.querySelector('.form-item-label');
          var el_unit = el_wrap.querySelector('.unit');
          var el_prefix = el_wrap.querySelector('.prefix');
          var space = 0;
          that.removeAttribute('style');
          el_unit && el_unit.remove();
          el_prefix && el_prefix.remove();
          var pdr = parseFloat(doc.defaultView.getComputedStyle(that).getPropertyValue('padding-right'));
          var pdl = parseFloat(doc.defaultView.getComputedStyle(that).getPropertyValue('padding-left'));

          if (unit !== undefined) {
            el_wrap.insertAdjacentHTML('beforeend', '<div class="unit">' + unit + '</div>');
            el_unit = el_wrap.querySelector('.unit');
            space = Math.floor(el_unit.offsetWidth) + pdr / 2;
          }

          that.style.paddingRight = Number(space + pdr);
          ;
          that.dataset.pdr = space + pdr;
          that.setAttribute('pdr', space + pdr);
          space = 0;

          if (prefix !== undefined) {
            el_wrap.insertAdjacentHTML('afterbegin', '<div class="prefix">' + prefix + '</div>');
            el_prefix = el_wrap.querySelector('.prefix');
            space = Math.floor(el_prefix.offsetWidth) + pdl;
            that.style.paddingLeft = space + pdl + 'px';
            that.dataset.pdl = space + pdl;
            el_label.style.marginLeft = space + 'px';
          }

          this.isValue(that, false);
          that.style.paddingLeft = space + pdl;
          that.dataset.pdl = space + pdl;
          var select_btns = doc.querySelectorAll('.ui-select-btn');
          var datepicker_btns = doc.querySelectorAll('.ui-datepicker-btn');

          var _iterator17 = _createForOfIteratorHelper(select_btns),
              _step17;

          try {
            for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
              var btn = _step17.value;
              btn.removeEventListener('click', this.actValue);
              btn.addEventListener('click', this.actValue);
            }
          } catch (err) {
            _iterator17.e(err);
          } finally {
            _iterator17.f();
          }

          var _iterator18 = _createForOfIteratorHelper(datepicker_btns),
              _step18;

          try {
            for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
              var _btn2 = _step18.value;

              _btn2.removeEventListener('click', this.actValue);

              _btn2.addEventListener('click', this.actValue);

              _btn2.addEventListener('click', this.actDaterpicker);
            }
          } catch (err) {
            _iterator18.e(err);
          } finally {
            _iterator18.f();
          }

          that.removeEventListener('keyup', this.actValue);
          that.removeEventListener('focus', this.actValue);
          that.removeEventListener('blur', this.actUnValue);
          that.addEventListener('keyup', this.actValue);
          that.addEventListener('focus', this.actValue);
          that.addEventListener('blur', this.actUnValue);
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
    },
    actDaterpicker: function actDaterpicker(e) {
      e.preventDefault();
      var that = e.currentTarget;
      var el_datepicker = that.closest('.ui-datepicker');
      var el_inp = el_datepicker.querySelector('.inp-base');
      Global.sheets.bottom({
        id: el_inp.id,
        callback: function callback() {
          Global.datepicker.init({
            id: el_inp.id,
            date: el_inp.value,
            min: el_inp.min,
            max: el_inp.max,
            title: el_inp.title,
            period: el_inp.dataset.period,
            callback: function callback() {
              console.log('callback init');
            }
          });
        }
      });
    },
    actValue: function actValue(e) {
      var that = e.currentTarget;
      Global.form.isValue(that, true);
    },
    actUnValue: function actUnValue(e) {
      var inp = e.currentTarget;
      var wrap = inp.parentNode;
      var el_clear = wrap.querySelector('.ui-clear');
      var pdr = Number(inp.dataset.pdr);
      Global.form.isValue(inp, false);
      setTimeout(function () {
        inp.style.paddingRight = pdr + 'px';
        el_clear && el_clear.remove();
      }, 100);
    },
    isValue: function isValue(inp, value) {
      var el_inp = inp;
      var el_wrap = el_inp.parentNode;
      var el_inner = el_inp.closest('.ui-form-inner'); //const el_inp = el_wrap.querySelector('.inp-base');

      var el_clear = el_wrap.querySelector('.ui-clear');
      var pdr = Number(el_inp.dataset.pdr);

      if (!!el_inner) {
        if (value) {
          el_inner.classList.add('is-value');
        } else {
          !!el_inp.value ? el_inner.classList.add('is-value') : el_inner.classList.remove('is-value');
        }
      }

      if (el_inp.readonly || el_inp.disabled || el_inp.type === 'date') {
        return false;
      }

      if (el_inp.value === undefined || el_inp.value === '') {
        el_inp.style.paddingRight = pdr + 'px';
        el_clear = el_wrap.querySelector('.ui-clear');
        !!el_clear && el_clear.removeEventListener('click', this.actClear);
        !!el_clear && el_clear.remove();
      } else {
        if (!el_clear) {
          if (el_inp.tagName === 'INPUT') {
            el_wrap.insertAdjacentHTML('beforeend', '<button type="button" class="ui-clear btn-clear" tabindex="-1" aria-hidden="true"  style="margin-right:' + pdr + 'px"><span class="a11y-hidden">내용지우기</span></button>');
            el_clear = el_wrap.querySelector('.ui-clear');
            el_clear.addEventListener('click', this.actClear);
            el_inp.style.paddingRight = pdr + el_clear.offsetWidth + 'px';
          } else {
            el_inp.style.paddingRight = pdr + 'px';
          }
        }
      }
    },
    actClear: function actClear(e) {
      var that = e.currentTarget;
      var el_wrap = that.parentNode;
      var el_inp = el_wrap.querySelector('.inp-base');
      var pdr = Number(el_inp.dataset.pdr);
      el_inp.style.paddingRight = pdr + 'px';
      el_inp.value = '';
      el_inp.focus();
      that.remove();
    },
    fileUpload: function fileUpload() {
      var el_files = document.querySelectorAll('.ui-file-inp');
      var fileTypes = ["image/apng", "image/bmp", "image/gif", "image/jpeg", "image/pjpeg", "image/png", "image/svg+xml", "image/tiff", "image/webp", "image/x-icon"];

      var _iterator19 = _createForOfIteratorHelper(el_files),
          _step19;

      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var el_file = _step19.value;

          if (!el_file.dataset.ready) {
            el_file.addEventListener('change', updateImageDisplay);
            el_file.dataset.ready = true;
          }
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }

      function updateImageDisplay(e) {
        var el_file = e.currentTarget;
        var id = el_file.id;
        var preview = document.querySelector('.ui-file-list[data-id="' + id + '"]');

        while (preview.firstChild) {
          preview.removeChild(preview.firstChild);
        }

        var curFiles = el_file.files;

        if (curFiles.length === 0) {
          var para = document.createElement('p');
          para.textContent = 'No files currently selected for upload';
          preview.appendChild(para);
        } else {
          var list = document.createElement('ul');
          var title = document.createElement('h4');
          var delbutton = document.createElement('button');
          delbutton.type = 'button';
          delbutton.classList.add('ui-file-del');
          delbutton.dataset.id = id;
          title.textContent = 'File upload list';
          title.classList.add('a11y-hidden');
          preview.classList.add('on');
          preview.appendChild(title);
          preview.appendChild(list);
          preview.appendChild(delbutton);
          var delbuttonSpan = document.createElement('span');
          delbuttonSpan.textContent = 'Delete attachment';
          delbuttonSpan.classList.add('a11y-hidden');
          delbutton.appendChild(delbuttonSpan);

          var _iterator20 = _createForOfIteratorHelper(curFiles),
              _step20;

          try {
            for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
              var file = _step20.value;
              var listItem = document.createElement('li');

              var _para = document.createElement('p');

              if (validFileType(file)) {
                _para.textContent = "".concat(file.name, ", ").concat(returnFileSize(file.size), ".");
                var image = document.createElement('img');
                image.src = URL.createObjectURL(file);
                listItem.appendChild(image);
                listItem.appendChild(_para);
              } else {
                _para.textContent = "".concat(file.name);
                listItem.appendChild(_para);
              }

              list.appendChild(listItem);
            }
          } catch (err) {
            _iterator20.e(err);
          } finally {
            _iterator20.f();
          }

          delbutton.addEventListener('click', fileDelete);
        }
      }

      function fileDelete(e) {
        var id = e.currentTarget.dataset.id;
        var list = document.querySelector('.ui-file-list[data-id="' + id + '"]');
        var inp = document.querySelector('#' + id);
        list.classList.remove('on');

        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }

        inp.value = '';
      }

      function validFileType(file) {
        return fileTypes.includes(file.type);
      }

      function returnFileSize(number) {
        if (number < 1024) {
          return number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
          return (number / 1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
          return (number / 1048576).toFixed(1) + 'MB';
        }
      }
    }
  };
  Global.rangeSlider = {
    init: function init(opt) {
      var id = opt.id;
      var el_range = document.querySelector('.ui-range[data-id="' + id + '"]');
      var el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
      var el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');

      if (el_from && el_to) {
        //range
        Global.rangeSlider.rangeFrom({
          id: id
        });
        Global.rangeSlider.rangeTo({
          id: id
        });
        el_from.addEventListener("input", function () {
          Global.rangeSlider.rangeFrom({
            id: id
          });
        });
        el_to.addEventListener("input", function () {
          Global.rangeSlider.rangeTo({
            id: id
          });
        });
      } else {
        //single
        Global.rangeSlider.rangeFrom({
          id: id,
          type: 'single'
        });
        el_from.addEventListener("input", function () {
          Global.rangeSlider.rangeFrom({
            id: id,
            type: 'single'
          });
        });
      }
    },
    rangeFrom: function rangeFrom(opt) {
      var id = opt.id;
      var v = opt.value;
      var el_range = document.querySelector('.ui-range[data-id="' + id + '"]');
      var el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
      var el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');
      var el_left = el_range.querySelector(".ui-range-btn.left");
      var el_right = el_range.querySelector(".ui-range-btn.right");
      var el_bar = el_range.querySelector(".ui-range-bar");
      var inp_froms = document.querySelectorAll('[data-' + id + '="from"]');
      var percent;
      var value = el_from.value,
          min = el_from.min,
          max = el_from.max;

      if (v) {
        el_from.value = v;
      }

      var from_value = +el_from.value;

      if (opt.type !== 'single') {
        if (+el_to.value - from_value < 0) {
          from_value = +el_to.value - 0;
          el_from.value = from_value;
        }

        percent = (from_value - +min) / (+max - +min) * 100;
        el_right.classList.remove('on');
        el_to.classList.remove('on');
        el_left.style.left = "".concat(percent, "%");
        el_bar.style.left = "".concat(percent, "%");
      } else {
        if (from_value < 0) {
          from_value = 0;
        }

        percent = (from_value - +min) / (+max - +min) * 100;
        el_left.style.left = "".concat(percent, "%");
        el_bar.style.right = "".concat(100 - percent, "%");
      }

      el_left.classList.add('on');
      el_from.classList.add('on');

      var _iterator21 = _createForOfIteratorHelper(inp_froms),
          _step21;

      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var inp_from = _step21.value;

          if (inp_from.tagName === 'INPUT') {
            inp_from.value = from_value;
          } else {
            inp_from.textContent = from_value;
          }
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
    },
    rangeTo: function rangeTo(opt) {
      var id = opt.id;
      var v = opt.value;
      var el_range = document.querySelector('.ui-range[data-id="' + id + '"]');
      var el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
      var el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');
      var el_left = el_range.querySelector(".ui-range-btn.left");
      var el_right = el_range.querySelector(".ui-range-btn.right");
      var el_bar = el_range.querySelector(".ui-range-bar");
      var inp_tos = document.querySelectorAll('[data-' + id + '="to"]');
      var value = el_to.value,
          min = el_to.min,
          max = el_to.max;

      if (v) {
        el_to.value = v;
      }

      var to_value = +el_to.value;

      if (+value - +el_from.value < 0) {
        to_value = +el_from.value + 0;
        el_to.value = to_value;
      }

      var percent = (to_value - +min) / (+max - +min) * 100;
      el_right.classList.add('on');
      el_left.classList.remove('on');
      el_to.classList.add('on');
      el_from.classList.remove('on');
      el_right.style.right = "".concat(100 - percent, "%");
      el_bar.style.right = "".concat(100 - percent, "%");

      var _iterator22 = _createForOfIteratorHelper(inp_tos),
          _step22;

      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var inp_to = _step22.value;

          if (inp_to.tagName === 'INPUT') {
            inp_to.value = el_to.value;
          } else {
            inp_to.textContent = el_to.value;
          }
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    }
  };
  Global.datepicker = {
    destroy: function destroy(opt) {
      var is_dim = !!doc.querySelector('.sheet-dim');
      var callback = opt === undefined || opt.callback === undefined ? false : opt.callback;
      var el_dp;

      if (is_dim) {
        Global.sheets.dim(false);
      }

      if (!opt) {
        el_dp = document.querySelectorAll('.datepicker');

        var _iterator23 = _createForOfIteratorHelper(el_dp),
            _step23;

        try {
          for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
            var that = _step23.value;
            that.remove();
          }
        } catch (err) {
          _iterator23.e(err);
        } finally {
          _iterator23.f();
        }
      } else {
        el_dp = document.querySelector('.datepicker[data-id="' + opt.id + '"]');
        el_dp.remove();
      }

      !!callback && callback();
    },
    open: function open(id) {
      var base = doc.querySelector('#' + id);
      Global.sheets.bottom({
        id: base.id,
        callback: function callback() {
          Global.datepicker.init({
            id: base.id,
            date: base.value,
            min: base.min,
            max: base.max,
            title: base.title,
            period: base.dataset.period,
            callback: function callback() {
              console.log('callback init');
            }
          });
        }
      });
    },
    init: function init(opt) {
      var setId = opt.id;
      var currentDate = opt.date;
      var endDate = opt.date;
      var title = opt.title;
      var el_inp = document.querySelector('#' + setId);
      var el_uidp = el_inp.closest('.ui-datepicker');
      var el_start = el_uidp.querySelector('[data-period="start"]');
      var el_end = el_uidp.querySelector('[data-period="end"]');
      var setDate = opt.date === '' || opt.date === undefined ? new Date() : opt.date;
      var period = opt.period === '' || opt.period === undefined ? false : opt.period;
      var area = opt.area === '' || opt.area === undefined ? document.querySelector('body') : opt.area;
      var date = new Date(setDate);

      var _viewYear = date.getFullYear();

      var _viewMonth = date.getMonth();

      var el_dp = document.querySelector('.datepicker[data-id="' + setId + '"]');
      var yyyymm = _viewYear + '-' + Global.parts.add0(_viewMonth + 1);
      var callback = opt === undefined || opt.callback === undefined ? false : opt.callback;
      var _dpHtml = '';
      Global.datepicker.destroy();

      if (!!period || !!el_end) {
        period = true;
        endDate = el_end.value;
      }

      if (!el_dp) {
        if (period) {
          _dpHtml += '<section class="datepicker" data-id="' + setId + '" data-date="' + yyyymm + '" data-start="' + currentDate + '" data-end="' + endDate + '" data-period="start">';
        } else {
          _dpHtml += '<section class="datepicker" data-id="' + setId + '" data-date="' + yyyymm + '" data-start="' + currentDate + '">';
        }

        _dpHtml += '<div class="datepicker-wrap">';
        _dpHtml += '<div class="datepicker-header">';
        _dpHtml += '<h3 class="datepicker-title">' + title + '</h3>';
        _dpHtml += '<button type="button" class="ui-prev-y" data-dpid="' + setId + '"><span class="a11y-hidden">이전 년도</span></button>';
        _dpHtml += '<div class="datepicker-yy"></div>';
        _dpHtml += '<button type="button" class="ui-next-y" data-dpid="' + setId + '"><span class="a11y-hidden">다음 년도</span></button>';
        _dpHtml += '<button type="button" class="ui-prev-m" data-dpid="' + setId + '"><span class="a11y-hidden">이전 월</span></button>';
        _dpHtml += '<div class="datepicker-mm"></div>';
        _dpHtml += '<button type="button" class="ui-next-m" data-dpid="' + setId + '"><span class="a11y-hidden">다음 월</span></button>';
        _dpHtml += '<button type="button" class="ui-today" data-dpid="' + setId + '"><span class="a11y-hidden">오늘</span></button>';
        _dpHtml += '</div>';
        _dpHtml += '<div class="datepicker-body">';
        _dpHtml += '<table>';
        _dpHtml += '<caption>' + title + '</caption>';
        _dpHtml += '<colgroup>';
        _dpHtml += '<col span="7">';
        _dpHtml += '</colgroup>';
        _dpHtml += '<thead>';
        _dpHtml += '<tr>';
        _dpHtml += '<th scope="col">일</th>';
        _dpHtml += '<th scope="col">월</th>';
        _dpHtml += '<th scope="col">화</th>';
        _dpHtml += '<th scope="col">수</th>';
        _dpHtml += '<th scope="col">목</th>';
        _dpHtml += '<th scope="col">금</th>';
        _dpHtml += '<th scope="col">토</th>';
        _dpHtml += '</tr>';
        _dpHtml += '</thead>';
        _dpHtml += '<tbody class="datepicker-date"></tbody>';
        _dpHtml += '</table>';
        _dpHtml += '</div>';
        _dpHtml += '<div class="datepicker-footer">';
        _dpHtml += '<div class="btn-wrap">';
        _dpHtml += '<button type="button" class="btn-base ui-confirm" data-confirm="' + setId + '"><span>확인</span></button>';
        _dpHtml += '</div>';
        _dpHtml += '</div>';
        _dpHtml += '</div>';
        _dpHtml += '</section>';
        area.insertAdjacentHTML('beforeend', _dpHtml); //document.querySelector('#' + setId).parentNode.insertAdjacentHTML('beforeend',_dpHtml);

        el_dp = document.querySelector('.datepicker[data-id="' + setId + '"]');
        this.dateMake({
          setDate: date,
          currentDate: currentDate,
          setId: setId,
          period: period
        });
        _dpHtml = null;
        !!callback && callback(); //event

        var nextY = el_dp.querySelector('.ui-next-y');
        var prevY = el_dp.querySelector('.ui-prev-y');
        var nextM = el_dp.querySelector('.ui-next-m');
        var prevM = el_dp.querySelector('.ui-prev-m');
        var today = el_dp.querySelector('.ui-today');
        var confirm = el_dp.querySelector('.ui-confirm');
        nextY.addEventListener('click', Global.datepicker.nextYear);
        prevY.addEventListener('click', Global.datepicker.prevYear);
        nextM.addEventListener('click', Global.datepicker.nextMonth);
        prevM.addEventListener('click', Global.datepicker.prevMonth);
        today.addEventListener('click', Global.datepicker.goToday);
        confirm.addEventListener('click', function () {
          Global.datepicker.confirm({
            id: this.dataset.confirm
          });
        });
      }
    },
    confirm: function confirm(opt) {
      console.log(opt.id);
      var el_btn = document.querySelector('.ui-confirm[data-confirm="' + opt.id + '"]');
      var el_dp = el_btn.closest('.datepicker');
      var startDay = el_dp.dataset.start;
      var endDay = el_dp.dataset.end;
      var id = el_dp.dataset.id;
      var el_inp = document.getElementById(id);
      var el_uidp = el_inp.closest('.ui-datepicker');
      var el_start = el_uidp.querySelector('[data-period="start"]');
      var el_end = el_uidp.querySelector('[data-period="end"]');
      var callback = opt === undefined || opt.callback === undefined ? false : opt.callback;
      el_inp.value = startDay;
      !!callback && callback();

      if (!!el_end) {
        el_end.value = endDay;
      }

      if (el_dp.classList.contains('sheet-bottom')) {
        Global.sheets.bottom({
          id: id,
          state: false,
          callback: function callback() {
            Global.datepicker.destroy({
              id: id
            });
          }
        });
      } else {
        Global.datepicker.destroy({
          id: id
        });
      }
    },
    dateMake: function dateMake(opt) {
      var setDate = opt.setDate;
      var setId = opt.setId;
      var el_dp = document.querySelector('.datepicker[data-id="' + setId + '"]');
      var el_inp = document.querySelector('#' + setId);
      var el_uidp = el_inp.closest('.ui-datepicker');
      var el_start = el_uidp.querySelector('[data-period="start"]');
      var el_end = el_uidp.querySelector('[data-period="end"]');

      if (!!el_dp.dataset.period) {
        if (el_dp.dataset.end !== '' && el_dp.dataset.end !== el_dp.dataset.start) {
          el_dp.dataset.period = 'end';
        }
      }

      var period = el_dp.dataset.period;
      var min = el_inp.getAttribute('min');
      var max = el_inp.getAttribute('max');

      if (period === 'end') {
        min = el_end.getAttribute('min');
        max = el_end.getAttribute('max');
      }

      var date = setDate;
      var today = new Date();
      var min_day = new Date(min);
      var max_day = new Date(max);
      var startDay = el_dp.dataset.start;
      var startDate = null;
      var endDay = null;
      var endDate = null;

      if (period === 'end') {
        endDay = el_dp.dataset.end;
      } //설정된 날


      var viewYear = date.getFullYear();
      var viewMonth = date.getMonth();
      var viewDay = date.getDate(); //오늘

      var _viewYear = today.getFullYear();

      var _viewMonth = today.getMonth();

      var _viewDay = today.getDate(); //선택한 날


      var start_viewYear = null;
      var start_viewMonth = null;
      var start_viewDay = null; //선택한 날

      var end_viewYear = null;
      var end_viewMonth = null;
      var end_viewDay = null; //최소

      var min_viewYear = min_day.getFullYear();
      var min_viewMonth = min_day.getMonth();
      var min_viewDay = min_day.getDate(); //최대

      var max_viewYear = max_day.getFullYear();
      var max_viewMonth = max_day.getMonth();
      var max_viewDay = max_day.getDate(); //설정일자가 있는 경우

      if (!!setDate) {
        date = new Date(setDate);
        viewYear = date.getFullYear();
        viewMonth = date.getMonth();
        viewDay = date.getDate();
      } //선택일자가 있는 경우


      if (startDay !== '') {
        startDate = new Date(startDay);
        start_viewYear = startDate.getFullYear();
        start_viewMonth = startDate.getMonth();
        start_viewDay = startDate.getDate();
      }

      if (endDay !== '') {
        endDate = new Date(endDay);
        end_viewYear = endDate.getFullYear();
        end_viewMonth = endDate.getMonth();
        end_viewDay = endDate.getDate();
      } //지난달 마지막 date, 이번달 마지막 date


      var prevLast = new Date(viewYear, viewMonth, 0);
      var thisLast = new Date(viewYear, viewMonth + 1, 0);
      var PLDate = prevLast.getDate();
      var PLDay = prevLast.getDay();
      var TLDate = thisLast.getDate();
      var TLDay = thisLast.getDay();
      var prevDates = [];

      var thisDates = _toConsumableArray(Array(TLDate + 1).keys()).slice(1);

      var nextDates = []; //prevDates 계산

      if (PLDay !== 6) {
        for (var i = 0; i < PLDay + 1; i++) {
          prevDates.unshift('');
        }
      } //nextDates 계산


      for (var _i2 = 1; _i2 < 7 - TLDay; _i2++) {
        nextDates.unshift('');
      } //dates 합치기


      var dates = prevDates.concat(thisDates, nextDates);
      var _dpHtml = ''; //dates 정리

      dates.forEach(function (date, i) {
        var _class = '';
        var _disabled = false; // _class = (i % 7 === 0) ? 'hday' : '';
        // _class = (i % 7 === 0) ? 'hday' : _class;
        //오늘날짜 설정

        _class = date === _viewDay && viewYear === _viewYear && viewMonth === _viewMonth ? _class + 'today' : _class; //max date

        if (viewYear === max_viewYear) {
          if (viewMonth === max_viewMonth) {
            if (date > max_viewDay) {
              _disabled = true;
            }
          } else if (viewMonth > max_viewMonth) {
            _disabled = true;
          }
        } else if (viewYear > max_viewYear) {
          console.log('>');
          _disabled = true;
        } //min date


        if (viewYear === min_viewYear) {
          console.log('===', viewMonth, min_viewMonth);

          if (viewMonth === min_viewMonth) {
            if (date < min_viewDay) {
              _disabled = true;
            }
          } else if (viewMonth < min_viewMonth) {
            _disabled = true;
          }
        } else if (viewYear < min_viewYear) {
          console.log('<');
          _disabled = true;
        } //selected date


        var _day = date === start_viewDay && viewYear === start_viewYear && viewMonth === start_viewMonth ? _class + ' selected-start' : date === end_viewDay && viewYear === end_viewYear && viewMonth === end_viewMonth ? _class + ' selected-end' : _class;

        if (!!endDay) {
          _class = _class + ' during';

          if (viewYear < start_viewYear || viewYear > end_viewYear) {
            _class = _class.replace(' during', '');
          }

          if (viewYear === start_viewYear && viewMonth < start_viewMonth) {
            _class = _class.replace(' during', '');
          }

          if (viewYear === start_viewYear && viewMonth === start_viewMonth && date <= start_viewDay) {
            _class = _class.replace(' during', '');
          }

          if (viewYear === end_viewYear && viewMonth > end_viewMonth) {
            _class = _class.replace(' during', '');
          }

          if (viewYear === end_viewYear && viewMonth === end_viewMonth && date >= end_viewDay) {
            _class = _class.replace(' during', '');
          }
        } //row


        if (!(i % 7)) {
          _dpHtml += i !== 0 ? '</tr><tr>' : '<tr>';
        } else {
          _dpHtml += '';
        }

        _dpHtml += '<td class="' + _class + '">';

        if (date === '') {//빈곳
        } else {
          if (!_disabled) {
            _dpHtml += '<button type="button" class="datepicker-day ' + _day + '" data-date="' + viewYear + '-' + Global.parts.add0(viewMonth + 1) + '-' + Global.parts.add0(date) + '">';
          } else {
            _dpHtml += '<button type="button" class="datepicker-day ' + _day + '" data-date="' + viewYear + '-' + Global.parts.add0(viewMonth + 1) + '-' + Global.parts.add0(date) + '" disabled>';
          }
        }

        _dpHtml += '<span>' + date + '</span>';
        _dpHtml += '</button>';
        _dpHtml += '</td>';
      });
      var dp_tbody = el_dp.querySelector('.datepicker-date');
      var dp_y = el_dp.querySelector('.datepicker-yy');
      var dp_m = el_dp.querySelector('.datepicker-mm');
      var getData = el_dp.dataset.date.split('-');
      dp_y.innerHTML = getData[0];
      dp_m.innerHTML = getData[1];
      dp_tbody.innerHTML = _dpHtml;
      var dayBtn = dp_tbody.querySelectorAll('.datepicker-day');

      for (var _i3 = 0, _len4 = dayBtn.length; _i3 < _len4; _i3++) {
        dayBtn[_i3].addEventListener('click', Global.datepicker.daySelect);

        dayBtn[_i3].dataset.n = _i3;

        dayBtn[_i3].addEventListener('keydown', keyMove);
      } // for (var dayBtns of dayBtn) {
      // 	dayBtns.addEventListener('click', Global.datepicker.daySelect);
      // 	console.log(dayBtns);
      // 	dayBtns.addEventListener('keydown', keyMove);
      // }


      function keyMove(e) {
        e.preventDefault();
        var isShift = !!window.event.shiftKey;
        var n = Number(e.currentTarget.dataset.n);
        var keycode = e.keyCode;
        var keys = Global.state.keys;
        var current = n;

        switch (keycode) {
          case keys.up:
            current = n - 7 < 0 ? 0 : n - 7;
            dp_tbody.querySelector('.datepicker-day[data-n="' + current + '"]').focus();
            break;

          case keys.left:
            current = n - 1 < 0 ? 0 : n - 1;
            dp_tbody.querySelector('.datepicker-day[data-n="' + current + '"]').focus();
            break;

          case keys.down:
            current = n + 7 > len - 1 ? len - 1 : n + 7;
            dp_tbody.querySelector('.datepicker-day[data-n="' + current + '"]').focus();
            break;

          case keys.right:
            current = n + 1 > len - 1 ? len - 1 : n + 1;
            dp_tbody.querySelector('.datepicker-day[data-n="' + current + '"]').focus();
            break;

          case keys.tab:
            isShift ? el_dp.querySelector('.datepicker-header .datepicker-title').focus() : el_dp.querySelector('.ui-confirm').focus();
            break;

          case keys.enter:
            Global.datepicker.daySelect(e);
            break;
        }
      }
    },
    daySelect: function daySelect(event) {
      var el_btn = event.currentTarget;
      var el_dp = el_btn.closest('.datepicker');
      var dayBtn = el_dp.querySelectorAll('.datepicker-day');
      var selectDay = el_btn.dataset.date;
      var period = el_dp.dataset.period;
      var n = 0;
      var id = el_dp.dataset.id;
      var date = new Date(el_dp.dataset.date);
      var el_inp = document.querySelector('#' + id);
      var el_uidp = el_inp.closest('.ui-datepicker');
      var el_start = el_uidp.querySelector('[data-period="start"]');
      var el_end = el_uidp.querySelector('[data-period="end"]');
      period = !!el_dp.dataset.end ? 'end' : period;

      if (!period) {
        //single mode
        el_dp.dataset.start = selectDay;

        var _iterator24 = _createForOfIteratorHelper(dayBtn),
            _step24;

        try {
          for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
            var that = _step24.value;
            that.classList.remove('selected-start');
          }
        } catch (err) {
          _iterator24.e(err);
        } finally {
          _iterator24.f();
        }

        el_btn.classList.add('selected-start');
      } else {
        //period mode
        if (period === 'start') {
          //start
          el_dp.dataset.start = selectDay;
          el_dp.dataset.period = 'end';
          el_btn.classList.add('selected-start'); //el_end.min = selectDay;
        } else {
          //end
          if (el_dp.dataset.start > selectDay) {
            el_dp.dataset.start = selectDay;
            el_dp.dataset.end = '';
            el_btn.classList.add('selected-start');
            el_dp.querySelector('.selected-start') && el_dp.querySelector('.selected-start').classList.remove('selected-start');
            el_dp.querySelector('.selected-end') && el_dp.querySelector('.selected-end').classList.remove('selected-end');
          } else {
            if (!el_dp.dataset.end) {
              //end 
              if (el_dp.dataset.start === selectDay) {
                el_dp.dataset.start = '';
                el_dp.dataset.end = '';
                el_dp.dataset.period = 'start';
                el_dp.querySelector('.selected-start') && el_dp.querySelector('.selected-start').classList.remove('selected-start');
              } else {
                el_dp.dataset.end = selectDay;
                el_btn.classList.add('selected-end');
              }
            } else {
              //end값 수정`
              if (el_dp.dataset.start === selectDay) {
                el_dp.dataset.start = '';
                el_dp.dataset.end = '';
                el_dp.dataset.period = 'start';
                el_dp.querySelector('.selected-start') && el_dp.querySelector('.selected-start').classList.remove('selected-start');
                el_dp.querySelector('.selected-end') && el_dp.querySelector('.selected-end').classList.remove('selected-end');
              } else {
                if (el_dp.dataset.end === selectDay) {
                  el_dp.dataset.end = '';
                  el_dp.querySelector('.selected-end') && el_dp.querySelector('.selected-end').classList.remove('selected-end');
                } else {
                  if (!!el_dp.querySelector('.selected-end')) {
                    el_dp.querySelector('.selected-end').classList.remove('selected-end');
                  }

                  el_dp.dataset.end = selectDay;
                  el_btn.classList.add('selected-end');
                }
              }
            }
          }
        }

        Global.datepicker.dateMake({
          setDate: date,
          setId: id
        });
      }
    },
    nextYear: function nextYear(event) {
      var dpId = event.target.dataset.dpid;
      var el_inp = document.querySelector('#' + dpId);
      var el_dp = document.querySelector('.datepicker[data-id="' + dpId + '"]');
      var el_next = el_dp.querySelector('.ui-next-y');
      var el_prev = el_dp.querySelector('.ui-prev-y');
      var el_next_m = el_dp.querySelector('.ui-next-m');
      var el_prev_m = el_dp.querySelector('.ui-prev-m');
      var date = new Date(el_dp.dataset.date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDay();
      var max = el_inp.getAttribute('max');
      var max_date = new Date(max);
      var max_year = max_date.getFullYear();
      var max_month = max_date.getMonth() + 1;
      var max_day = max_date.getDay();
      var min = el_inp.getAttribute('min');
      var min_date = new Date(min);
      var min_year = min_date.getFullYear();
      var min_month = min_date.getMonth() + 1;
      var min_day = min_date.getDay(); // if (year + 1 <= min_year) {
      // 	//el_prev.disabled = true;
      // } else {
      // 	//el_prev.disabled = false;
      // }
      // el_prev_m.disabled = false;
      // if (year + 1 === max_year) {
      // 	if (month > max_month) {
      // 		month = max_month;
      // 		//el_next_m.disabled = true;
      // 	}
      // 	date.setMonth(month - 1);
      // 	//el_next.disabled = true;
      // } else if (year > max_year) {
      // 	//return false;
      // }

      date.setFullYear(year + 1);
      el_dp.dataset.date = year + 1 + '-' + Global.parts.add0(month);
      Global.datepicker.dateMake({
        setDate: date,
        setId: dpId
      });
    },
    prevYear: function prevYear(event) {
      var dpId = event.target.dataset.dpid;
      var el_inp = document.querySelector('#' + dpId);
      var el_dp = document.querySelector('.datepicker[data-id="' + dpId + '"]');
      var el_next = el_dp.querySelector('.ui-next-y');
      var el_prev = el_dp.querySelector('.ui-prev-y');
      var el_next_m = el_dp.querySelector('.ui-next-m');
      var el_prev_m = el_dp.querySelector('.ui-prev-m');
      var date = new Date(el_dp.dataset.date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDay();
      var max = el_inp.getAttribute('max');
      var max_date = new Date(max);
      var max_year = max_date.getFullYear();
      var max_month = max_date.getMonth() + 1;
      var min = el_inp.getAttribute('min');
      var min_date = new Date(min);
      var min_year = min_date.getFullYear();
      var min_month = min_date.getMonth() + 1; // if (year - 1 >= max_year) {
      // 	el_next.disabled = true;
      // } else {
      // 	el_next.disabled = false;
      // }
      // el_next_m.disabled = false;
      // if (year - 1 === min_year) {
      // 	if (month < min_month) {
      // 		month = min_month;
      // 		el_prev_m.disabled = true;
      // 	}
      // 	date.setMonth(month - 1);
      // 	el_prev.disabled = true;
      // } else if (year < min_year) {
      // 	return false;
      // }

      date.setFullYear(year - 1);
      el_dp.dataset.date = year - 1 + '-' + Global.parts.add0(month);
      Global.datepicker.dateMake({
        setDate: date,
        setId: dpId
      });
    },
    nextMonth: function nextMonth(event) {
      var dpId = event.target.dataset.dpid;
      var el_dp = document.querySelector('.datepicker[data-id="' + dpId + '"]');
      var date = new Date(el_dp.dataset.date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;

      if (month > 11) {
        month = 0;
        year = year + 1;
        date.setFullYear(year);
      }

      date.setMonth(month);
      el_dp.dataset.date = year + '-' + Global.parts.add0(month + 1);
      Global.datepicker.dateMake({
        setDate: date,
        setId: dpId
      });
    },
    prevMonth: function prevMonth(event) {
      var dpId = event.target.dataset.dpid;
      var el_dp = document.querySelector('.datepicker[data-id="' + dpId + '"]');
      var date = new Date(el_dp.dataset.date);
      var year = date.getFullYear();
      var month = date.getMonth();

      if (month < 1) {
        month = 12;
        year = year - 1;
        date.setFullYear(year);
      }

      date.setMonth(month - 1);
      el_dp.dataset.date = year + '-' + Global.parts.add0(month);
      Global.datepicker.dateMake({
        setDate: date,
        setId: dpId
      });
    },
    goToday: function goToday(event) {
      var dpId = event.target.dataset.dpid;
      var el_dp = document.querySelector('.datepicker[data-id="' + dpId + '"]');
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      el_dp.dataset.date = year + '-' + Global.parts.add0(month);
      Global.datepicker.dateMake({
        setDate: date,
        setId: dpId
      });
    }
  };
  Global.sheets = {
    dim: function dim(opt) {
      var show = opt.show,
          callback = opt.callback;
      var dim;

      if (show) {
        var sheet = doc.querySelector('.sheet-bottom[data-id="' + opt.id + '"]');
        sheet.insertAdjacentHTML('beforeend', '<div class="sheet-dim"></div>');
        dim = doc.querySelector('.sheet-dim');
        dim.classList.add('on');
        !!callback && callback();
      } else {
        dim = doc.querySelector('.sheet-dim');
        dim.classList.remove('on');
      }
    },
    bottom: function bottom(opt) {
      var id = opt.id,
          state = opt.state,
          callback = opt.callback;
      var el_base = doc.querySelector('#' + id);
      var el_sheet = doc.querySelector('[data-id*="' + id + '"]');
      var scr_t = doc.documentElement.scrollTop;
      var win_w = win.innerWidth;
      var win_h = win.innerHeight;
      var off_t = el_base.getBoundingClientRect().top;
      var off_l = el_base.getBoundingClientRect().left;
      var base_w = el_base.offsetWidth;
      var base_h = el_base.offsetHeight;
      var is_expanded = !!el_sheet;
      var show = !is_expanded || is_expanded === 'false';

      if (state !== undefined) {
        show = state;
      }

      if (show) {
        !!callback && callback();
        el_sheet = doc.querySelector('[data-id*="' + id + '"]');
        el_sheet.classList.add('sheet-bottom');
        var wrap_w = Number(el_sheet.offsetWidth.toFixed(2));
        var wrap_h = Number(el_sheet.offsetHeight.toFixed(2));
        Global.sheets.dim({
          id: id,
          show: true,
          callback: function callback() {
            var dim = doc.querySelector('.sheet-dim');
            dim.addEventListener('click', dimAct);

            function dimAct() {
              Global.sheets.bottom({
                id: id,
                state: false
              });
            }
          }
        });
        el_sheet.classList.add('on');
        el_sheet.style.left = wrap_w + off_l > win_w ? off_l - (wrap_w - base_w) + 'px' : off_l + 'px';
        el_sheet.style.top = win_h - (off_t - scr_t + base_h) > wrap_h ? off_t + base_h + scr_t + 'px' : off_t - wrap_h + scr_t + 'px';
        Global.focus.loop({
          selector: el_sheet
        });
      } else {
        //hide
        el_sheet.classList.remove('on');
        el_sheet.classList.add('off');
        setTimeout(function () {
          !!callback && callback();
          el_sheet.remove();
          doc.querySelector('#' + id).focus();
        }, 300);
      }
    }
  };
  Global.select = {
    options: {
      id: false,
      current: null,
      customscroll: true,
      callback: false
    },
    init: function init(option) {
      var opt = Object.assign({}, this.options, option);
      var current = opt.current;
      var callback = opt.callback;
      var customscroll = opt.customscroll;
      var id = opt.id;
      var isId = !!id ? doc.querySelector('#' + opt.id) : false;
      var el_uiSelects = doc.querySelectorAll('.ui-select');
      var keys = Global.state.keys;
      var isMobile = Global.state.device.mobile;
      var el_select;
      var $selectCurrent;
      var selectID;
      var listID;
      var optionSelectedID;
      var selectN;
      var selectTitle;
      var selectDisabled;
      var btnTxt = '';
      var hiddenClass = '';
      var htmlOption = '';
      var htmlButton = ''; //init

      Global.state.device.mobile ? customscroll = false : ''; //reset

      var idN = JSON.parse(sessionStorage.getItem('scrollbarID')); //select set

      var _iterator25 = _createForOfIteratorHelper(el_uiSelects),
          _step25;

      try {
        for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
          var el_uiSelect = _step25.value;
          var el_btn = el_uiSelect.querySelector('.ui-select-btn');
          var el_wrap = el_uiSelect.querySelector('.ui-select-wrap');
          var el_dim = el_uiSelect.querySelector('.dim');
          el_btn && el_btn.remove();
          el_wrap && el_wrap.remove();
          el_dim && el_dim.remove();
          el_select = el_uiSelect.querySelector('select');
          selectID = el_select.id;

          if (!!id && selectID === id) {
            act(el_uiSelect, el_select, selectID);
          } else {
            act(el_uiSelect, el_select, selectID);
          }
        }
      } catch (err) {
        _iterator25.e(err);
      } finally {
        _iterator25.f();
      }

      function act(el_uiSelect, el_select, selectID) {
        selectID === undefined ? el_select.id = 'uiSelect_' + idN : '';
        listID = selectID + '_list';
        selectDisabled = el_select.disabled;
        selectTitle = el_select.title;
        hiddenClass = ''; //el_uiSelect.css('max-width', el_uiSelect.outerWidth());
        //callback 나중에 작업필요
        //(!el_select.data('callback') || !!callback) && el_select.data('callback', callback);

        if (customscroll) {
          htmlOption += '<div class="ui-select-wrap ui-scrollbar" scroll-id="uiSelectScrollBar_' + idN + '">';
          idN = idN + 1;
          sessionStorage.setItem('scrollbarID', idN);
        } else {
          htmlOption += '<div class="ui-select-wrap" style="min-width:' + el_uiSelect.offsetWIdth + 'px">';
        }

        htmlOption += '<strong class="ui-select-title">' + selectTitle + '</strong>';
        htmlOption += '<div class="ui-select-opts" role="listbox" id="' + listID + '" aria-hidden="false">';
        setOption(el_uiSelect, el_select.selectedIndex);
        htmlOption += '</div>';
        htmlOption += '<button type="button" class="ui-select-cancel"><span>취소</span></strong>';
        htmlOption += '<button type="button" class="ui-select-confirm"><span>확인</span></strong>';
        htmlOption += '</div>';
        htmlButton = '<button type="button" class="ui-select-btn ' + hiddenClass + '" id="' + selectID + '_inp" role="combobox" aria-autocomplete="list" aria-owns="' + listID + '" aria-haspopup="true" aria-expanded="false" aria-activedescendant="' + optionSelectedID + '" data-n="' + selectN + '" data-id="' + selectID + '" tabindex="-1"><span>' + btnTxt + '</span></button>';
        el_uiSelect.insertAdjacentHTML('beforeend', htmlButton);
        el_select.classList.add('off');
        el_select.setAttribute('aria-hidden', true); // el_select.setAttribute('tabindex', -1);

        el_uiSelect.insertAdjacentHTML('beforeend', htmlOption);

        if (selectDisabled) {
          var _btn = el_uiSelect.querySelector('.ui-select-btn');

          _btn.disabled = true;

          _btn.classList.add('disabled');
        } // const _optwrap = el_uiSelect.querySelector('.ui-select-opts');
        // console.log(_optwrap);
        // const _btns = _optwrap.querySelectorAll('button');
        // for (let _btn of _btns) {
        // 	_btn.remove();
        // }


        eventFn();
        htmlOption = '';
        htmlButton = '';
      }

      function setOption(uiSelect, v) {
        var _select = uiSelect !== undefined ? uiSelect.closest('.ui-select') : uiSelect;

        if (uiSelect !== undefined) {
          _select = _select.querySelector('select');
        }

        var _options = _select.querySelectorAll('option');

        var _optionID = _select.id + '_opt';

        var _optLen = _options.length;
        var _optionCurrent = _options[0];
        var _current = current;
        var _selected = false;
        var _disabled = false;
        var _hidden = false;
        var _val = false;

        var _hiddenCls;

        var _optionIdName;

        if (v !== undefined) {
          _current = v;
        }

        for (var i = 0; i < _optLen; i++) {
          _optionCurrent = _options[i];
          _hidden = _optionCurrent.hidden;

          if (_current !== null) {
            if (_current === i) {
              _selected = true;
              _optionCurrent.selected = true;
            } else {
              _selected = false;
              _optionCurrent.selected = false;
            }
          } else {
            _selected = _optionCurrent.selected;
          }

          _disabled = _optionCurrent.disabled;
          _hiddenCls = _hidden ? 'hidden' : '';

          if (_selected) {
            _val = _optionCurrent.value;
            btnTxt = _optionCurrent.textContent;
            optionSelectedID = _optionID + '_' + i;
            selectN = i;
          }

          _selected && _hidden ? hiddenClass = 'opt-hidden' : '';
          _optionIdName = _optionID + '_' + i;

          if (Global.state.device.mobile) {
            _disabled ? _selected ? htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected ' + _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' : htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled ' + _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' : _selected ? htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected ' + _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">' : htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt ' + _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">';
          } else {
            _disabled ? _selected ? htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected ' + _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' : htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled ' + _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' : _selected ? htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected ' + _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">' : htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt ' + _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">';
          }

          htmlOption += '<span class="ui-select-txt">' + _optionCurrent.textContent + '</span>';
          htmlOption += '</button>';
        }

        return htmlOption;
      } //event


      eventFn();

      function eventFn() {
        // $(doc).off('click.dp').on('click.dp', '.ui-select-btn', function(e){
        // 	var $this = $(this).closest('.ui-datepicker').find('.inp-base');
        // 	Global.sheets.bottom({
        // 		id: $this.attr('id'),
        // 		callback: function(){
        // 		}
        // 	});
        // });
        //const el_dims = doc.querySelectorAll('.dim-select');
        var el_confirms = doc.querySelectorAll('.ui-select-confirm');
        var el_cancels = doc.querySelectorAll('.ui-select-cancel');
        var el_btns = doc.querySelectorAll('.ui-select-btn'); //const el_opts = doc.querySelectorAll('.ui-select-opt');
        //const el_wraps = doc.querySelectorAll('.ui-select-wrap');

        var el_labels = doc.querySelectorAll('.ui-select-label');
        var el_selects = doc.querySelectorAll('.ui-select select'); // for (let el_dim of el_dims) {
        // 	el_dim.addEventListener('click', selectClick);
        // }

        var _iterator26 = _createForOfIteratorHelper(el_confirms),
            _step26;

        try {
          for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
            var el_confirm = _step26.value;
            el_confirm.addEventListener('click', optConfirm);
          }
        } catch (err) {
          _iterator26.e(err);
        } finally {
          _iterator26.f();
        }

        var _iterator27 = _createForOfIteratorHelper(el_cancels),
            _step27;

        try {
          for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
            var el_cancel = _step27.value;
            el_cancel.addEventListener('click', Global.select.hide);
          }
        } catch (err) {
          _iterator27.e(err);
        } finally {
          _iterator27.f();
        }

        var _iterator28 = _createForOfIteratorHelper(el_btns),
            _step28;

        try {
          for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
            var el_btn = _step28.value;
            el_btn.addEventListener('click', selectClick); // el_btn.addEventListener('keydown', selectKey);
            // el_btn.addEventListener('mouseover', selectOver);
            // el_btn.addEventListener('focus', selectOver);
            // el_btn.addEventListener('mouseleave', selectLeave);
          }
        } catch (err) {
          _iterator28.e(err);
        } finally {
          _iterator28.f();
        }

        var _iterator29 = _createForOfIteratorHelper(el_labels),
            _step29;

        try {
          for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
            var el_label = _step29.value;
            el_label.addEventListener('click', labelClick);
          }
        } catch (err) {
          _iterator29.e(err);
        } finally {
          _iterator29.f();
        }

        var _iterator30 = _createForOfIteratorHelper(el_selects),
            _step30;

        try {
          for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
            var _el_select = _step30.value;

            _el_select.addEventListener('change', Global.select.selectChange);
          }
        } catch (err) {
          _iterator30.e(err);
        } finally {
          _iterator30.f();
        }
      }

      function labelClick(e) {
        var that = e.currentTarget;
        var idname = that.getAttribute('for');
        var inp = doc.querySelector('#' + idname);
        setTimeout(function () {
          inp.focus();
        }, 0);
      }

      function selectLeave() {
        var body = doc.querySelector('body');
        body.dataset.selectopen = true;
      }

      function selectClick(e) {
        var that = e.currentTarget;
        var el_uiselect = that.closest('.ui-select');
        var el_select = el_uiselect.querySelector('select');
        var opts = el_uiselect.querySelectorAll('option');
        var n = el_select.selectedIndex; // for (let opt of opts) {
        // 	//console.log(a.selected && Global.parts.getIndex(a));
        // 	n = opt.selected && Global.parts.getIndex(opt);
        // }

        that.dataset.sct = doc.documentElement.scrollTop;
        doc.removeEventListener('click', Global.select.back);
        setTimeout(function () {
          doc.addEventListener('click', Global.select.back);
        }, 0);
        setOption(that, n);
        optExpanded(that, n);
      }

      function selectKey(e) {
        var el_btn = e.currentTarget;
        var id = el_btn.dataset.id;
        var el_list = doc.querySelector('#' + id + '_list');
        var el_wrap = el_list.closest('.ui-select-wrap');
        var el_optwrap = el_wrap.querySelector('.ui-select-opts');
        var el_opts = el_wrap.querySelectorAll('.ui-select-opt');
        var list_selected = el_list.querySelector('.selected');
        var n = Number(Global.parts.getIndex(list_selected));
        var nn = 0;
        var nnn = 0;
        var wrap_h = el_wrap.offsetHeight;
        var len = el_opts.length;
        var n_top = 0;

        if (e.altKey) {
          if (e.keyCode === keys.up) {
            optOpen(el_btn);
          }

          e.keyCode === keys.down && Global.select.hide();
          return;
        }

        switch (e.keyCode) {
          case keys.up:
          case keys.left:
            nn = n - 1 < 0 ? 0 : n - 1;
            nnn = Math.abs(el_optwrap.getBoundingClientRect().top);
            n_top = el_opts[nn].getBoundingClientRect().top + nnn;
            optScroll(el_wrap, n_top, wrap_h, 'up');
            optPrev(e, id, n, len);
            break;

          case keys.down:
          case keys.right:
            nn = n + 1 > len - 1 ? len - 1 : n + 1;
            nnn = Math.abs(el_optwrap.getBoundingClientRect().top);
            n_top = el_opts[nn].getBoundingClientRect().top + nnn;
            optScroll(el_wrap, n_top, wrap_h, 'down');
            optNext(e, id, n, len);
            break;
        }
      }

      function optBlur(e) {//if (doc.querySelector('body').dataset.selectopen) { .. }); dim
        //optClose();
      }

      function optExpanded(btn) {
        if (Global.state.device.mobile) {
          optOpen(btn);
        } else {
          if (btn.getAttribute('aria-expanded') === 'false') {
            Global.select.hide();
            optOpen(btn);
          } else {
            Global.select.hide();
          }
        }
      }

      function optScroll(el_wrap, n_top, wrap_h, key) {
        var dT = doc.documentElement.scrollTop;
        Global.scroll.move({
          top: Number(n_top),
          selector: customscroll ? el_wrap.querySelector(':scope > .ui-scrollbar-item') : el_wrap,
          effect: 'auto',
          align: 'default'
        });
      }

      function optPrev(e, id, n, len) {
        e.preventDefault();
        var current = n === 0 ? 0 : n - 1;
        Global.select.act({
          id: id,
          current: current
        });
      }

      function optNext(e, id, n, len) {
        e.preventDefault();
        var current = n === len - 1 ? len - 1 : n + 1;
        Global.select.act({
          id: id,
          current: current
        });
      }

      function optOpen(btn) {
        var el_body = doc.querySelector('body');
        var el_uiselect = btn.closest('.ui-select');
        var el_wrap = el_uiselect.querySelector('.ui-select-wrap');
        var el_optwrap = el_wrap.querySelector('.ui-select-opts');
        var el_opts = el_optwrap.querySelectorAll('.ui-select-opt');
        var el_select = el_uiselect.querySelector('select');
        var el_option = el_select.querySelectorAll('option'); //const el_opts = doc.querySelectorAll('.ui-select-opt');

        var offtop = el_uiselect.getBoundingClientRect().top;
        var scrtop = doc.documentElement.scrollTop;
        var wraph = el_wrap.offsetHeight;
        var btn_h = btn.offsetHeight;
        var opt_h = 40;
        var win_h = win.innerHeight;
        var className = win_h - (offtop - scrtop + btn_h) > wraph ? 'bottom' : 'top';
        var n = el_select.selectedIndex;
        el_body.classList.add('dim-select');
        btn.dataset.expanded = true;
        btn.setAttribute('aria-expanded', true);
        el_uiselect.classList.add('on');
        el_wrap.classList.add('on');
        el_wrap.classList.add(className);
        el_wrap.setAttribute('aria-hidden', false);
        el_opts[n].classList.add('selected');

        if (customscroll) {
          Global.scrollBar({
            selector: el_wrap
          });
        }

        setTimeout(function () {
          el_optwrap = el_wrap.querySelector('.ui-select-opts');
          el_opts = el_optwrap.querySelectorAll('.ui-select-opt');
          Global.scroll.move({
            top: Number(opt_h * n),
            selector: customscroll ? el_wrap.querySelector(':scope > .ui-scrollbar-item') : el_wrap,
            effect: 'auto',
            align: 'default'
          });

          var _iterator31 = _createForOfIteratorHelper(el_opts),
              _step31;

          try {
            for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
              var el_opt = _step31.value;
              console.log(el_opt);
              el_opt.addEventListener('click', Global.select.optClick);
              el_opt.addEventListener('mouseover', Global.select.selectOver);
            }
          } catch (err) {
            _iterator31.e(err);
          } finally {
            _iterator31.f();
          }

          el_wrap.addEventListener('mouseleave', selectLeave);
          el_wrap.addEventListener('blur', optBlur);
        }, 0);
        openScrollMove(el_uiselect);
        el_wrap.removeEventListener('touchstart', Global.select.wrapTouch);
        el_wrap.addEventListener('touchstart', Global.select.wrapTouch);
      }

      function openScrollMove(el_uiselect) {
        var el_html = doc.querySelector('html, body');
        var dT = Math.floor(doc.documentElement.scrollTop);
        var wH = win.innerHeight;
        var el_btn = el_uiselect.querySelector('.ui-select-btn');
        var elT = el_btn.getBoundingClientRect().top;
        var elH = el_btn.offsetHeight;
        var a = Math.floor(elT - dT);
        var b = wH - 240;
        el_uiselect.dataset.orgtop = dT;

        if (a > b) {
          el_html.scrollTo({
            top: a - b + elH + 10 + dT,
            behavior: 'smooth'
          });
        }
      }

      function optConfirm(e) {
        var el_confirm = e.currentTarget;
        var el_uiSelect = el_confirm.closest('.ui-select');
        var el_body = doc.querySelector('body');
        var el_btn = el_uiSelect.querySelector('.ui-select-btn');
        var el_wrap = el_uiSelect.querySelector('.ui-select-wrap');
        var el_select = el_uiSelect.querySelector('select');
        var orgTop = el_uiSelect.dataset.orgtop;
        console.log(el_btn.dataset.id, el_select.selectedIndex);
        Global.select.act({
          id: el_btn.dataset.id,
          current: el_select.selectedIndex
        });
        el_body.classList.remove('dim-select');
        el_btn.dataset.expanded = false;
        el_btn.setAttribute('aria-expanded', false);
        el_btn.focus();
        el_uiSelect.classList.remove('on');
        el_wrap.classList.remove('on');
        el_wrap.classList.remove('top');
        el_wrap.classList.remove('bottom');
        el_wrap.setAttribute('aria-hidden', true);
        console.log(el_select); //el_select.onchange();
        //$('html, body').scrollTop(orgTop);
      }
    },
    back: function back(e) {
      e.preventDefault();
      var isTure = '';

      var _iterator32 = _createForOfIteratorHelper(e.path),
          _step32;

      try {
        for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
          var path = _step32.value;
          isTure = isTure + path.classList;
        }
      } catch (err) {
        _iterator32.e(err);
      } finally {
        _iterator32.f();
      }

      isTure.indexOf('ui-select-wrap') < 0 && Global.select.hide();
    },
    scrollSelect: function scrollSelect(v, el) {
      var _opts = el.querySelectorAll('.ui-select-opt');

      var el_uiSelect = el.closest('.ui-select');
      var el_btn = el_uiSelect.querySelector('.ui-select-btn');
      el.scrollTo({
        top: 40 * v,
        behavior: 'smooth'
      });

      for (var i = 0, _len5 = _opts.length; i < _len5; i++) {
        _opts[i].classList.remove('selected');

        if (v === i) {
          _opts[i].classList.add('selected');

          el_uiSelect.dataset.current = i;
        }
      } // Global.select.act({ 
      // 	id: el_btn.dataset.id, 
      // 	current: v
      // });

    },
    wrapTouch: function wrapTouch(e) {
      var that = e.currentTarget;
      var wrap = that.querySelector('.ui-select-opts');
      var timerScroll = null;
      var touchMoving = false;
      var wrapT = that.getBoundingClientRect().top;
      var getScrollTop = Math.abs(wrap.getBoundingClientRect().top - wrapT);
      var currentN = 0;
      clearTimeout(timerScroll);
      that.addEventListener('touchmove', actMove);

      function actMove() {
        touchMoving = true;
        getScrollTop = Math.abs(wrap.getBoundingClientRect().top - wrapT);
        that.addEventListener('touchcancel', actEnd);
        that.addEventListener('touchend', actEnd);
      }

      function actEnd() {
        var that = this;

        function scrollCompare() {
          timerScroll = setTimeout(function () {
            if (getScrollTop !== Math.abs(wrap.getBoundingClientRect().top - wrapT)) {
              getScrollTop = Math.abs(wrap.getBoundingClientRect().top - wrapT);
              scrollCompare();
            } else {
              currentN = Math.floor((Math.floor(getScrollTop) + 20) / 40);
              Global.select.scrollSelect(currentN, that);
            }
          }, 100);
        }

        touchMoving && scrollCompare();
        that.removeEventListener('touchmove', actMove);
      }
    },
    optClick: function optClick(e) {
      console.log(e);

      var _uiSelect = this.closest('.ui-select');

      var _btn = _uiSelect.querySelector('.ui-select-btn');

      var el_select = _uiSelect.querySelector('select');

      var _wrap = _uiSelect.querySelector('.ui-select-wrap');

      var idx = Global.parts.getIndex(this);
      var isMobile = Global.state.device.mobile;

      if (!isMobile) {
        Global.select.act({
          id: _btn.dataset.id,
          current: idx
        });

        _btn.focus();

        Global.select.hide();
        el_select.onchange();
      } else {
        Global.select.scrollSelect(idx, _wrap);
      }
    },
    selectOver: function selectOver() {
      var body = doc.querySelector('body');
      body.dataset.selectopen = false;
    },
    selectChange: function selectChange(e) {
      var that = e.target;
      var uiSelect = that.closest('.ui-select');
      uiSelect.dataset.fn;
      Global.select.act({
        id: that.id,
        current: that.options.selectedIndex,
        original: true
      });
    },
    hide: function hide() {
      var el_body = doc.querySelector('body');
      var el_selects = doc.querySelectorAll('.ui-select');
      var el_selectWraps = doc.querySelectorAll('.ui-select-wrap[aria-hidden="false"]');
      var el_btns = doc.querySelectorAll('.ui-select-btn[aria-expanded="true"]');
      var el_select, el_wrap, orgTop;
      el_body.classList.remove('dim-select');
      console.log(el_btns);

      var _iterator33 = _createForOfIteratorHelper(el_btns),
          _step33;

      try {
        for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
          var that = _step33.value;
          el_select = that.closest('.ui-select');
          el_wrap = el_select.querySelector('.ui-select-wrap');
          orgTop = el_select.dataset.orgtop;
          that.dataset.expanded = false;
          that.setAttribute('aria-expanded', false);
          that.focus();
          el_select.classList.remove('on');
          el_wrap.classList.remove('on');
          el_wrap.classList.remove('top');
          el_wrap.classList.remove('bottom');
          el_wrap.setAttribute('aria-hidden', true);
          doc.querySelector('html, body').scrollTo({
            top: orgTop,
            behavior: 'smooth'
          });
        }
      } catch (err) {
        _iterator33.e(err);
      } finally {
        _iterator33.f();
      }

      doc.removeEventListener('click', Global.select.back);
    },
    act: function act(opt) {
      var id = opt.id;
      var el_select = doc.querySelector('#' + id);
      var el_opts = el_select.querySelectorAll('option');
      var el_uiSelect = el_select.closest('.ui-select');
      var el_btn = el_uiSelect.querySelector('.ui-select-btn');
      var el_text = el_btn.querySelector('span');
      var el_btnopts = el_uiSelect.querySelectorAll('.ui-select-opt'); // var dataCallback = el_select.data('callback'),
      // 	callback = opt.callback === undefined ? dataCallback === undefined ? false : dataCallback : opt.callback,

      var current = opt.current;
      var org = opt.original === undefined ? false : opt.original;

      if (el_uiSelect.dataset.current !== undefined) {
        current = el_uiSelect.dataset.current;
        el_select.selectedIndex = el_uiSelect.dataset.current;
      } //!org && el_uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true);


      if (!org) {
        el_opts[current].selected = true; // el_uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true).trigger('change');
      } //trigger 오류 확인필요


      var optCurrent = el_opts[current];
      optCurrent.hidden === true ? el_btn.classList.remove('opt-hidden') : el_btn.classList.add('opt-hidden');
      console.log(current, optCurrent.textContent);
      el_text.textContent = optCurrent.textContent;

      var _iterator34 = _createForOfIteratorHelper(el_btnopts),
          _step34;

      try {
        for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
          var el_btnopt = _step34.value;
          el_btnopt.classList.remove('selected');
        }
      } catch (err) {
        _iterator34.e(err);
      } finally {
        _iterator34.f();
      }

      el_btnopts[current].classList.add('selected');
      Global.state.device.mobile && el_btnopts[current].focus(); // callback && callback({ 
      // 	id: id, 
      // 	current: current, 
      // 	val: optCurrent.val() 
      // });
    }
  };
  Global.accordion = {
    options: {
      current: null,
      autoclose: false,
      callback: false,
      effect: Global.state.effect.easeInOut,
      effTime: '.2'
    },
    init: function init(option) {
      var opt = Object.assign({}, Global.accordion.options, option);
      var accoId = opt.id;
      var callback = opt.callback;
      var current = opt.current;
      var autoclose = opt.autoclose;
      var el_acco = doc.querySelector('#' + accoId);
      var el_wrap = el_acco.querySelectorAll(':scope > .ui-acco-wrap');
      var len = el_wrap.length;
      var para = Global.para.get('acco');
      var paras;
      var paraname; //set up : parameter > current

      if (!!para) {
        if (para.split('+').length > 1) {
          //2 or more : acco=exeAcco1*2+exeAcco2*3
          paras = para.split('+');

          for (var j = 0; j < paras.length; j++) {
            paraname = paras[j].split('*');
            opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
          }
        } else {
          //only one : tab=1
          if (para.split('*').length > 1) {
            paraname = para.split('*');
            opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
          } else {
            current = [Number(para)];
          }
        }
      }

      el_acco.dataset.n = len; //set up : parameter > current

      for (var i = 0; i < len; i++) {
        var this_wrap = el_wrap[i];
        var el_tit = this_wrap.querySelector(':scope > .ui-acco-tit');
        var el_pnl = this_wrap.querySelector(':scope > .ui-acco-pnl');
        var el_btn = el_tit.querySelector('.ui-acco-btn');
        this_wrap.dataset.n = i;
        el_tit.tagName !== 'DT' && el_tit.setAttribute('role', 'heading');
        el_btn.id = accoId + 'Btn' + i;
        el_btn.dataset.selected = false;
        el_btn.setAttribute('aria-expanded', false);
        el_btn.removeAttribute('data-order');
        el_btn.dataset.n = i;

        if (!!el_pnl) {
          el_pnl.id = accoId + 'Pnl' + i;
          el_btn.setAttribute('aria-controls', el_pnl.id);
          el_pnl.setAttribute('aria-labelledby', el_btn.id);
          el_pnl.dataset.height = el_pnl.offsetHeight;
          el_pnl.setAttribute('aria-hidden', true);
          el_pnl.dataset.n = i;
          Global.parts.toggleSlide({
            el: el_pnl,
            state: 'hide'
          });

          if (current === 'all') {
            el_btn.dataset.selected = true;
            el_btn.setAttribute('aria-expanded', true);
            el_pnl.setAttribute('aria-hidden', false);
            Global.parts.toggleSlide({
              el: el_pnl,
              state: 'show'
            });
          }
        }

        if (i === 0) {
          el_btn.dataset.order = 'first';
        }

        if (i === len - 1) {
          el_btn.dataset.order = 'last';
        }

        el_btn.removeEventListener('click', Global.accordion.evtClick);
        el_btn.removeEventListener('keydown', Global.accordion.evtKeys);
        el_btn.addEventListener('click', Global.accordion.evtClick);
        el_btn.addEventListener('keydown', Global.accordion.evtKeys);
      }

      var currentLen = current === null ? 0 : current.length;

      if (current !== 'all') {
        for (var _i4 = 0; _i4 < currentLen; _i4++) {
          var _this_wrap = el_acco.querySelector('.ui-acco-wrap[data-n="' + current[_i4] + '"]');

          var _tit = _this_wrap.querySelector(':scope > .ui-acco-tit');

          var _btn = _tit.querySelector('.ui-acco-btn');

          var _pnl = _this_wrap.querySelector(':scope > .ui-acco-pnl');

          if (!!_pnl) {
            _btn.dataset.selected = true;

            _btn.setAttribute('aria-expanded', true);

            _pnl.setAttribute('aria-hidden', false);

            Global.parts.toggleSlide({
              el: _pnl,
              state: 'show'
            });
          }
        }
      }

      !!callback && callback();
      Global.accordion[accoId] = {
        callback: callback,
        autoclose: autoclose,
        current: current
      };
    },
    evtClick: function evtClick(e) {
      var that = e.currentTarget;
      var btnId = that.id;
      var n = that.dataset.n;
      var accoId = btnId.split('Btn');
      accoId = accoId[0];

      if (!!btnId) {
        e.preventDefault();
        Global.accordion.toggle({
          id: accoId,
          current: [n]
        });
      }
    },
    evtKeys: function evtKeys(e) {
      var that = e.currentTarget;
      var btnId = that.id;
      var n = Number(that.dataset.n);
      var keys = Global.state.keys;
      var accoId = btnId.split('Btn');
      accoId = accoId[0];
      var acco = doc.querySelector('#' + accoId);
      var len = Number(acco.dataset.n);

      switch (e.keyCode) {
        case keys.up:
        case keys.left:
          upLeftKey(e);
          break;

        case keys.down:
        case keys.right:
          downRightKey(e);
          break;

        case keys.end:
          endKey(e);
          break;

        case keys.home:
          homeKey(e);
          break;
      }

      function upLeftKey(e) {
        e.preventDefault();
        that.dataset.order !== 'first' ? acco.querySelector('#' + accoId + 'Btn' + (n - 1)).focus() : acco.querySelector('#' + accoId + 'Btn' + (len - 1)).focus();
      }

      function downRightKey(e) {
        e.preventDefault();
        that.dataset.order !== 'last' ? acco.querySelector('#' + accoId + 'Btn' + (n + 1)).focus() : acco.querySelector('#' + accoId + 'Btn0').focus();
      }

      function endKey(e) {
        e.preventDefault();
        acco.querySelector('#' + accoId + 'Btn' + (len - 1)).focus();
      }

      function homeKey(e) {
        e.preventDefault();
        acco.querySelector('#' + accoId + 'Btn0').focus();
      }
    },
    toggle: function toggle(opt) {
      var id = opt.id;
      var el_acco = doc.querySelector('#' + id);
      var current = opt.current === undefined ? null : opt.current;
      var callback = opt.callback === undefined ? opt.callback : Global.accordion[id].callback;
      var state = opt.state === undefined ? 'toggle' : opt.state;
      var autoclose = opt.autoclose === undefined ? Global.accordion[id].autoclose : opt.autoclose;
      console.log(current, state, autoclose);
      var el_wraps = el_acco.querySelectorAll(':scope > .ui-acco-wrap');
      var el_pnl;
      var el_tit;
      var el_btn;
      var len = el_wraps.length;
      var check = 0;
      var currentLen = current === null ? 0 : current.length;

      if (current !== 'all') {
        for (var i = 0; i < currentLen; i++) {
          var this_wrap = el_acco.querySelector('.ui-acco-wrap[data-n="' + current[i] + '"]');
          el_tit = this_wrap.querySelector(':scope > .ui-acco-tit');
          el_pnl = this_wrap.querySelector(':scope > .ui-acco-pnl');
          el_btn = el_tit.querySelector('.ui-acco-btn');

          if (!!el_pnl) {
            if (state === 'toggle') {
              el_btn.dataset.selected === 'true' ? act('down') : act('up');
            } else {
              state === 'open' && act('up');
              state === 'close' && act('down');
            }
          }
        }

        !!callback && callback({
          id: id,
          current: current
        });
      } else if (current === 'all') {
        checking();
      }

      function checking() {
        //state option 
        if (state === 'open') {
          check = 0;
          el_acco.dataset.allopen = false;
        } else if (state === 'close') {
          check = len;
          el_acco.dataset.allopen = true;
        } //all check action


        if (el_acco.dataset.allopen !== 'true') {
          el_acco.dataset.allopen = true;
          act('down');
        } else {
          el_acco.dataset.allopen = false;
          act('up');
        }
      }

      function act(v) {
        var isDown = !(v === 'down'); //set up close

        if (!!autoclose) {
          var _iterator35 = _createForOfIteratorHelper(el_wraps),
              _step35;

          try {
            for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
              var wrap = _step35.value;

              var _tit = wrap.querySelector(':scope > .ui-acco-tit');

              var _btn = _tit.querySelector('.ui-acco-btn');

              var _pnl = wrap.querySelector(':scope > .ui-acco-pnl');

              console.log(_pnl.offsetHeight);

              if (!!_pnl) {
                _btn.dataset.selected = false;

                _btn.setAttribute('aria-expanded', false);

                _pnl.setAttribute('aria-hidden', true);
              }
            }
          } catch (err) {
            _iterator35.e(err);
          } finally {
            _iterator35.f();
          }
        }

        if (current === 'all') {
          var _iterator36 = _createForOfIteratorHelper(el_wraps),
              _step36;

          try {
            for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
              var _wrap2 = _step36.value;

              var _tit2 = _wrap2.querySelector(':scope > .ui-acco-tit');

              var _btn3 = _tit2.querySelector('.ui-acco-btn');

              var _pnl2 = _wrap2.querySelector(':scope > .ui-acco-pnl');

              if (!!_pnl2) {
                _btn3.dataset.selected = isDown;

                _btn3.setAttribute('aria-expanded', isDown);

                _pnl2.setAttribute('aria-hidden', !isDown);

                Global.parts.toggleSlide({
                  el: _pnl2,
                  state: !isDown ? 'show' : 'hide'
                });
              }
            }
          } catch (err) {
            _iterator36.e(err);
          } finally {
            _iterator36.f();
          }
        } else {
          el_btn.dataset.selected = isDown;
          el_btn.setAttribute('aria-expanded', isDown);

          if (!!el_pnl) {
            console.log(!isDown);
            el_pnl.setAttribute('aria-hidden', isDown);
            Global.parts.toggleSlide({
              el: el_pnl,
              state: 'toggle'
            });
          }
        }
      }
    }
  };
  Global.dropdown = {
    options: {
      ps: 'BL',
      area: doc.querySelector('body'),
      src: false,
      offset: true,
      callback: false
    },
    init: function init(option) {
      var opt = Object.assign({}, Global.dropdown.options, option);
      var id = opt.id,
          ps = opt.ps,
          hold = opt.hold,
          area = opt.area,
          src = opt.src,
          offset = opt.offset;
      var callback = opt.callback !== undefined ? opt.callback : false; //ajax 

      if (!!src && !doc.querySelector('[data-id="' + id + '"]')) {
        Global.ajax.init({
          area: area,
          url: src,
          add: true,
          callback: function callback() {
            setDropdown();
          }
        });
      } else {
        setDropdown();
      } //set


      function setDropdown() {
        var el_btn = doc.querySelector('#' + id);
        var el_pnl = doc.querySelector('[data-id="' + id + '"]');
        var el_close = el_pnl.querySelector('.ui-drop-close'); //set up

        el_btn.setAttribute('aria-expanded', false);
        el_btn.dataset.ps = ps;
        el_pnl.setAttribute('aria-hidden', true);
        el_pnl.setAttribute('aria-labelledby', id);
        el_pnl.dataset.id = id;
        el_pnl.dataset.ps = ps; //event

        el_btn.addEventListener('click', action);
        el_close.addEventListener('click', actionClose);

        function actionClose() {
          var id = this.closest('.ui-drop-pnl').dataset.id;
          Global.dropdown.toggle({
            id: id
          });
          doc.querySelector('#' + id).focus();
        }

        function action(e) {
          e.preventDefault();
          var that = e.currentTarget;
          that.dataset.sct = doc.documentElement.scrollTop;
          Global.dropdown.toggle({
            id: that.id
          });
        }

        !!callback && callback();
      }
    },
    back: function back(e) {
      e.preventDefault();
      var isTure = '';

      var _iterator37 = _createForOfIteratorHelper(e.path),
          _step37;

      try {
        for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
          var path = _step37.value;
          isTure = isTure + path.classList;
        }
      } catch (err) {
        _iterator37.e(err);
      } finally {
        _iterator37.f();
      }

      isTure.indexOf('ui-drop-pnl') < 0 && Global.dropdown.hide();
    },
    toggle: function toggle(opt) {
      var id = opt.id;
      var el_btn = doc.querySelector('#' + id);
      var el_pnl = doc.querySelector('.ui-drop-pnl[data-id="' + id + '"]');
      var state = opt.state !== undefined ? opt.state : 'toggle';
      var btnExpanded = el_btn.getAttribute('aria-expanded');
      var ps = el_btn.dataset.ps;

      if (!!el_btn.dataset.ps) {
        ps = el_btn.dataset.ps;
      }

      if (state === 'open') {
        btnExpanded = (_readOnlyError("btnExpanded"), 'false');
      } else if (state === 'close') {
        btnExpanded = (_readOnlyError("btnExpanded"), 'true');
      }

      btnExpanded === 'false' ? pnlShow() : pnlHide();

      function pnlShow() {
        var elBody = doc.querySelector('body');
        !el_btn.closest('.ui-drop-pnl') && Global.dropdown.hide();
        Global.focus.loop({
          selector: doc.querySelector('.ui-drop-pnl[data-id="' + id + '"]'),
          callback: pnlHide
        });
        el_btn.setAttribute('aria-expanded', true);
        el_pnl.setAttribute('aria-hidden', false);
        el_pnl.classList.add('on');
        var sT = Math.floor(doc.documentElement.scrollTop);
        var btn_w = Math.ceil(el_btn.offsetWidth);
        var btn_h = Math.ceil(el_btn.offsetHeight);
        var btn_t = Math.ceil(el_btn.getBoundingClientRect().top);
        var btn_l = Math.ceil(el_btn.getBoundingClientRect().left);
        var pnl_w = Math.ceil(el_pnl.offsetWidth);
        var pnl_h = Math.ceil(el_pnl.offsetHeight);

        switch (ps) {
          case 'BL':
            el_pnl.style.top = btn_t + sT + btn_h + 'px';
            el_pnl.style.left = btn_l + 'px';
            break;

          case 'BC':
            el_pnl.style.top = btn_t + sT + btn_h + 'px';
            el_pnl.style.left = btn_l - (pnl_w - btn_w) / 2 + 'px';
            break;

          case 'BR':
            el_pnl.style.top = btn_t + sT + btn_h + 'px';
            el_pnl.style.left = btn_l - (pnl_w - btn_w) + 'px';
            break;

          case 'TL':
            el_pnl.style.top = btn_t + sT - pnl_h + 'px';
            el_pnl.style.left = btn_l + 'px';
            break;

          case 'TC':
            el_pnl.style.top = btn_t + sT - pnl_h + 'px';
            el_pnl.style.left = btn_l + 'px';
            break;

          case 'TR':
            el_pnl.style.top = btn_t + sT - pnl_h + 'px';
            el_pnl.style.left = btn_l - (pnl_w - btn_w) + 'px';
            break;

          case 'RT':
            el_pnl.style.top = btn_t + sT + 'px';
            el_pnl.style.left = btn_l + btn_w + 'px';
            break;

          case 'RM':
            el_pnl.style.top = btn_t + sT - (pnl_h - btn_h) / 2 + 'px';
            el_pnl.style.left = btn_l + btn_w + 'px';
            break;

          case 'RB':
            el_pnl.style.top = btn_t + sT - (pnl_h - btn_h) + 'px';
            el_pnl.style.left = btn_l + btn_w + 'px';
            break;

          case 'LT':
            el_pnl.style.top = btn_t + sT + 'px';
            el_pnl.style.left = btn_l - pnl_w + 'px';
            break;

          case 'LM':
            el_pnl.style.top = btn_t + sT - (pnl_h - btn_h) / 2 + 'px';
            el_pnl.style.left = btn_l - pnl_w + 'px';
            break;

          case 'LB':
            el_pnl.style.top = btn_t + sT - (pnl_h - btn_h) + 'px';
            el_pnl.style.left = btn_l - pnl_w + 'px';
            break;

          case 'CM':
            el_pnl.style.top = '50%';
            el_pnl.style.left = '50%';
            el_pnl.style.marginTop = pnl_h / 2 * -1 + 'px';
            el_pnl.style.marginLeft = pnl_w / 2 * -1 + 'px';
            break;
        }

        setTimeout(function () {
          elBody.classList.add('dropdownOpened');
          setTimeout(function () {
            el_pnl.focus();
          }, 0);
        }, 0);
        doc.removeEventListener('click', Global.dropdown.back);
        setTimeout(function () {
          doc.addEventListener('click', Global.dropdown.back);
        }, 0);
      }

      function pnlHide() {
        var in_pnl = el_btn.closest('.ui-drop-pnl');
        var elBody = doc.querySelector('body');

        if (!in_pnl) {
          elBody.classList.remove('dropdownOpened');
        }

        el_btn.setAttribute('aria-expanded', false);
        el_btn.focus();
        el_pnl.setAttribute('aria-hidden', true);
        el_pnl.setAttribute('tabindex', -1);
        el_pnl.classList.remove('on');
      }
    },
    hide: function hide() {
      var elBody = doc.querySelector('body');
      var elDrops = doc.querySelectorAll('.ui-drop');
      var elDropPnls = doc.querySelectorAll('.ui-drop-pnl[aria-hidden="false"]');
      elBody.classList.remove('dropdownOpened');

      var _iterator38 = _createForOfIteratorHelper(elDrops),
          _step38;

      try {
        for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
          var that = _step38.value;
          that.setAttribute('aria-expanded', false);
        }
      } catch (err) {
        _iterator38.e(err);
      } finally {
        _iterator38.f();
      }

      var _iterator39 = _createForOfIteratorHelper(elDropPnls),
          _step39;

      try {
        for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
          var _that5 = _step39.value;

          _that5.setAttribute('hidden', true);

          _that5.setAttribute('tabindex', -1);

          _that5.classList.remove('on');
        }
      } catch (err) {
        _iterator39.e(err);
      } finally {
        _iterator39.f();
      }

      doc.removeEventListener('click', Global.dropdown.back);
    }
  };
  Global.modal = {
    options: {
      type: 'normal',

      /* type : normal, system */
      full: false,
      ps: 'center',
      src: false,
      remove: 'false',
      width: false,
      height: false,
      mg: 20,
      callback: false,
      closeCallback: false,
      endfocus: false,
      sMessage: '',
      sBtnConfirmTxt: 'Ok',
      sBtnCancelTxt: 'Cancel',
      sZindex: false,
      sClass: 'type-system',
      sConfirmCallback: false,
      sCancelCallback: false
    },
    optionsClose: {
      remove: 'false',
      callback: false,
      endfocus: false
    },
    show: function show(option) {
      var opt = Object.assign({}, Global.modal.options, option);
      var elBody = doc.querySelector('body');
      var type = opt.type,
          src = opt.src,
          full = opt.full,
          ps = opt.ps,
          width = opt.width,
          height = opt.height,
          callback = opt.callback,
          callbackClose = opt.callbackClose;
      var mg = opt.mg,
          id = opt.id,
          remove = opt.remove;
      var endfocus = opt.endfocus === false ? document.activeElement : opt.endfocus;
      var scr_t = doc.documentElement.scrollTop;
      var timer; //system

      var sMessage = opt.sMessage,
          sBtnConfirmTxt = opt.sBtnConfirmTxt,
          sBtnCancelTxt = opt.sBtnCancelTxt,
          sZindex = opt.sZindex,
          sClass = opt.sClass,
          sConfirmCallback = opt.sConfirmCallback,
          sCancelCallback = opt.sCancelCallback; //setting

      if (type === 'normal') {
        //modal
        if (!!src && !doc.querySelector('#' + opt.id)) {
          Global.ajax.init({
            area: elBody,
            url: src,
            add: true,
            callback: function callback() {
              act();
            }
          });
        } else {
          act();
        }

        endfocus.dataset.focus = id;
      } else {
        //system modal
        endfocus = null;
        remove = 'true';
        id = 'uiSystemModal';
        makeSystemModal();
      }

      function makeSystemModal() {
        var htmlSystem = '';
        htmlSystem += '<div class="ui-modal type-system ' + sClass + '" id="uiSystemModal">';
        htmlSystem += '<div class="ui-modal-wrap">';
        htmlSystem += '<div class="ui-modal-body">';
        htmlSystem += sMessage;
        htmlSystem += '</div>';
        htmlSystem += '<div class="ui-modal-footer">';
        htmlSystem += '<div class="btn-wrap">';

        if (type === 'confirm') {
          htmlSystem += '<button type="button" class="btn-base-m text ui-modal-cancel"><span>' + sBtnCancelTxt + '</span></button>';
        }

        htmlSystem += '<button type="button" class="btn-base-m text primary ui-modal-confirm"><span>' + sBtnConfirmTxt + '</span></button>';
        htmlSystem += '</div>';
        htmlSystem += '</div>';
        htmlSystem += '</div>';
        htmlSystem += '</div>';
        elBody.insertAdjacentHTML('beforeend', htmlSystem);
        htmlSystem = '';
        act();
      }

      function act() {
        var elModal = doc.querySelector('#' + id);
        var elModals = doc.querySelectorAll('.ui-modal');

        var _iterator40 = _createForOfIteratorHelper(elModals),
            _step40;

        try {
          for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
            var md = _step40.value;
            md.classList.remove('current');
            elBody.classList.add('scroll-no');
          }
        } catch (err) {
          _iterator40.e(err);
        } finally {
          _iterator40.f();
        }

        !elModal.querySelector('.ui-modal-dim') && elModal.insertAdjacentHTML('beforeend', '<div class="ui-modal-dim"></div>');
        var elModalWrap = elModal.querySelector('.ui-modal-wrap');
        var elModalBody = elModalWrap.querySelector('.ui-modal-body');
        var elModalHeader = elModalWrap.querySelector('.ui-modal-header');
        var elModalFooter = elModalWrap.querySelector('.ui-modal-footer');
        var elModalTit = elModal.querySelector('.ui-modal-tit');
        var elModalDim = elModal.querySelector('.ui-modal-dim');
        var elModalCancel = elModal.querySelector('.ui-modal-cancel');
        var elModalConfirm = elModal.querySelector('.ui-modal-confirm');
        var elModalClose = elModal.querySelector('.ui-modal-close');
        var elModalOpen = doc.querySelectorAll('.ui-modal.open');
        var openLen = !!elModalOpen ? elModalOpen.length : 0;
        doc.querySelector('html').classList.add('is-modal');
        elModal.classList.add('n' + openLen);
        elModal.classList.remove('close');
        elModal.classList.remove('type-full');
        elModal.classList.remove('ps-center');
        elModal.classList.remove('ps-top');
        elModal.classList.remove('ps-bottom');
        elModal.classList.add('current');
        elModal.classList.add('ready');
        elModal.dataset.remove = remove;
        elModal.dataset.n = openLen;
        elModal.dataset.scrolltop = scr_t;
        elModal.setAttribute('role', 'dialog');
        !!elModalTit && elModalTit.setAttribute('tabindex', 0);
        elModalBody.style.overflowY = 'auto';
        var headerH = !!elModalHeader ? elModalHeader.offsetHeight : 0;
        var footerH = !!elModalFooter ? elModalFooter.offsetHeight : 0;
        var space = !!full ? 0 : mg; //[set] position

        switch (ps) {
          case 'center':
            elModal.classList.add('ps-center');
            break;

          case 'top':
            elModal.classList.add('ps-top');
            break;

          case 'bottom':
            elModal.classList.add('ps-bottom');
            break;

          default:
            elModal.classList.add('ps-center');
            break;
        } //[set] full type / width & height


        !!full && elModal.classList.add('type-full');
        !!width ? elModalWrap.style.width = width : '';
        elModalBody.style.height = !height ? '100%' : height + 'px';
        elModalBody.style.maxHeight = win.innerHeight - (headerH + footerH + space * 2) + 'px';
        elModalBody.style.maxWidth = win.innerWidth - space * 2 + 'px';
        clearTimeout(timer);
        timer = setTimeout(function () {
          Global.focus.loop({
            selector: elModal
          });
          elModal.classList.add('open');
          !!sZindex ? elModal.style.zIndex = sZindex : '';
          win.innerHeight < elModalWrap.offsetHeight ? elModal.classList.add('is-over') : elModal.classList.remove('is-over');
          !!elModalTit && elModalTit.focus();
          !!callback && callback(id); //dim event

          elModalDim.addEventListener('click', Global.modal.dimAct);
        }, 150); //close button event

        if (!!elModalClose) {
          elModalClose.addEventListener('click', closeAct);
        }

        function closeAct(e) {
          var elThis = e.currentTarget;
          var elThisModal = elThis.closest('.ui-modal');
          netive.modal.hide({
            id: elThisModal.id,
            remove: remove,
            callbackClose: callbackClose
          });
        } //systyem modal confirm & cancel callback


        elModalConfirm && elModalConfirm.addEventListener('click', sConfirmCallback);
        elModalCancel && elModalCancel.addEventListener('click', sCancelCallback); //transition end event

        elModalWrap.addEventListener('transitionend', modalTrEnd);

        function modalTrEnd() {
          if (!!full) {
            elModal.classList.add('fix-header');
            elModalBody.style.paddingTop = headerH + 10 + 'px';
          }
        } //resize event


        var timerResize;
        win.addEventListener('resize', winResize);

        function winResize() {
          clearTimeout(timerResize);
          timerResize = setTimeout(function () {
            Global.modal.reset();
          }, 200);
        }
      }
    },
    dimAct: function dimAct() {
      var elOpens = doc.querySelectorAll('.ui-modal.open');
      var openN = [];

      var _iterator41 = _createForOfIteratorHelper(elOpens),
          _step41;

      try {
        for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
          var elOpen = _step41.value;
          elOpen.dataset.n && openN.push(elOpen.dataset.n);
        }
      } catch (err) {
        _iterator41.e(err);
      } finally {
        _iterator41.f();
      }

      var elCurrent = doc.querySelector('.ui-modal.open[data-n="' + Math.max.apply(null, openN) + '"]');
      var currentID = elCurrent.id; //system modal 제외

      if (currentID !== 'uiSystemModal') {
        netive.modal.hide({
          id: currentID,
          remove: elCurrent.dataset.remove
        });
      }
    },
    reset: function reset() {
      var elModals = doc.querySelectorAll('.ui-modal.open.ps-center');

      var _iterator42 = _createForOfIteratorHelper(elModals),
          _step42;

      try {
        for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
          var elModal = _step42.value;
          var elModalHead = elModal.querySelector('.ui-modal-header');
          var elModalBody = elModal.querySelector('.ui-modal-body');
          var elModalFoot = elModal.querySelector('.ui-modal-footer');
          var h_win = win.innerHeight;
          var h_head = elModalHead.outerHeight();
          var h_foot = elModalFoot.outerHeight();
          var h = h_win - (h_head + h_foot);

          if (Global.browser.size !== 'desktop') {
            elModalBody.style.minHeight = h + 'px';
            elModalBody.style.maxHeight = h + 'px';
          } else {
            elModalBody.style.minHeight = '';
            elModalBody.style.maxHeight = '';
          }
        }
      } catch (err) {
        _iterator42.e(err);
      } finally {
        _iterator42.f();
      }
    },
    hide: function hide(option) {
      var opt = Object.assign({}, Global.modal.optionsClose, option);
      var id = opt.id,
          type = opt.type,
          remove = opt.remove,
          callback = opt.callback;
      var elModal = doc.querySelector('#' + id);
      var elBody = doc.querySelector('body');
      var elHtml = doc.querySelector('html');
      var elModals = doc.querySelectorAll('.ui-modal');
      elModal.classList.add('close');
      elModal.classList.remove('open');
      elModal.classList.remove('fix-header');
      var elOpen = doc.querySelectorAll('.ui-modal.open');
      var len = elOpen.length > 0 ? elOpen.length : false;
      var timer;
      var endfocus = opt.endfocus;
      var elModalPrev = false;

      var _iterator43 = _createForOfIteratorHelper(elModals),
          _step43;

      try {
        for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
          var md = _step43.value;
          md.classList.remove('current');
        }
      } catch (err) {
        _iterator43.e(err);
      } finally {
        _iterator43.f();
      }

      if (!!len) {
        elModalPrev = doc.querySelector('.ui-modal.open.n' + (len - 1));
        elModalPrev.classList.add('current');
      } //시스템팝업이 아닌 경우


      if (type !== 'system') {
        if (!len) {
          //단일
          endfocus = endfocus === false ? doc.querySelector('[data-focus="' + id + '"]') : opt.endfocus; //$('html').off('click.uimodaldim');

          elHtml.classList.remove('is-modal');
        } else {
          //여러개
          endfocus = endfocus === false ? doc.querySelector('[data-focus="' + id + '"]') : opt.endfocus;
        }
      }

      Global.scroll.move({
        top: Number(elModal.dataset.scrolltop)
      });
      clearTimeout(timer);
      timer = setTimeout(function () {
        var elWrap = elModal.querySelector('.ui-modal-wrap');
        var elOpen = doc.querySelectorAll('.ui-modal.open');
        var len = !!elOpen ? elOpen.length : false;
        elWrap.removeAttribute('style');
        elBody.removeAttribute('style');
        elModal.dataset.n = null;

        if (!len) {
          elHtml.classList.remove('scroll-no');
          elBody.classList.remove('scroll-no');
        }

        remove === 'true' && elModal.remove();
        !!callback && callback(id);
        !!endfocus && endfocus.focus();
      }, 210);
    },
    hideSystem: function hideSystem() {
      netive.modal.hide({
        id: 'uiSystemModal',
        type: 'system',
        remove: 'true'
      });
    }
  };
  Global.toast = {
    timer: null,
    options: {
      delay: 'short',
      classname: '',
      conts: ''
    },
    show: function show(option) {
      var opt = Object.assign({}, this.options, option);
      var delay = opt.delay,
          classname = opt.classname,
          conts = opt.conts;
      var el_body = document.querySelector('body');
      var toast = '<div class="ui-toast toast ' + classname + '">' + conts + '</div>';
      var time = delay === 'short' ? 2000 : 3500;

      if (delay === 'short') {
        time = 2000;
      } else if (delay === 'long') {
        time = 3500;
      } else {
        time = delay;
      }

      if (!!doc.querySelector('.ui-toast-ready')) {
        clearTimeout(Global.toast.timer);
        el_body.classList.remove('ui-toast-show');
        el_body.classList.remove('ui-toast-ready');
        doc.querySelector('.ui-toast').removeEventListener('transitionend', act);
        doc.querySelector('.ui-toast').remove();
      }

      el_body.insertAdjacentHTML('beforeend', toast);
      toast = null;
      var el_toast = doc.querySelector('.ui-toast');
      el_body.classList.add('ui-toast-ready');
      setTimeout(function () {
        el_body.classList.add('ui-toast-show');
        el_toast.addEventListener('transitionend', act);
      }, 0);

      function act(e) {
        var that = e.currentTarget;
        that.removeEventListener('transitionend', act);
        that.classList.add('on');
        Global.toast.timer = setTimeout(Global.toast.hide, time);
      }
    },
    hide: function hide() {
      var el_body = doc.querySelector('body');
      var el_toast = doc.querySelector('.ui-toast');

      if (!!el_toast) {
        clearTimeout(Global.toast.timer);
        el_body.classList.remove('ui-toast-show');
        el_toast.removeEventListener('transitionend', act);
        el_toast.addEventListener('transitionend', act);

        function act(e) {
          var that = e.currentTarget;
          that.removeEventListener('transitionend', act);
          that.remove();
          el_body.classList.remove('ui-toast-ready');
        }
      }
    }
  };
  Global.tooltip = {
    options: {
      visible: null,
      id: false,
      ps: false
    },
    timerShow: null,
    timerHide: null,
    show: function show(e) {
      e.preventDefault();
      var elBody = doc.querySelector('body');
      var el = e.currentTarget;
      var elId = el.getAttribute('aria-describedby');
      var elSrc = el.dataset.src;
      var evType = e.type;
      var elTooltip = doc.querySelector('#' + elId);

      if (!!elSrc && !elTooltip) {
        elBody.insertAdjacentHTML('beforeend', '<div class="ui-tooltip" id="' + elId + '" role="tooltip" aria-hidden="true"><div class="ui-tooltip-arrow"></div>');
        Global.ajax.init({
          area: doc.querySelector('#' + elId),
          url: elSrc,
          add: true,
          callback: function callback() {
            act();
          }
        });
      } else {
        if (el.dataset.view !== 'fix') {
          act();
        } else {
          if (evType === 'click') {
            el.dataset.view = 'unfix';
            Global.tooltip.hide(e);
          } else {
            act();
          }
        }
      }

      function act() {
        elTooltip = doc.querySelector('#' + elId);
        var tooltips = doc.querySelectorAll('.ui-tooltip');
        var btns = doc.querySelectorAll('.ui-tooltip-btn');
        var elArrow = elTooltip.querySelector('.ui-tooltip-arrow');
        var classToggle = evType !== 'click' ? 'add' : 'remove';

        if (evType === 'click' && el.dataset.view !== 'fix') {
          var _iterator44 = _createForOfIteratorHelper(tooltips),
              _step44;

          try {
            for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
              var tts = _step44.value;

              if (tts.id !== elId) {
                tts.removeAttribute('style');
                tts.setAttribute('aria-hidden', true);
              }
            }
          } catch (err) {
            _iterator44.e(err);
          } finally {
            _iterator44.f();
          }

          var _iterator45 = _createForOfIteratorHelper(btns),
              _step45;

          try {
            for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
              var bs = _step45.value;
              bs.dataset.view = 'unfix';
            }
          } catch (err) {
            _iterator45.e(err);
          } finally {
            _iterator45.f();
          }

          el.dataset.view = 'fix';
          doc.removeEventListener('click', Global.tooltip.back);
          setTimeout(function () {
            doc.addEventListener('click', Global.tooltip.back);
          }, 0);
        }

        var _iterator46 = _createForOfIteratorHelper(tooltips),
            _step46;

        try {
          for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
            var _tts = _step46.value;

            if (_tts.id !== elId) {
              _tts.classList.remove('hover');
            }
          }
        } catch (err) {
          _iterator46.e(err);
        } finally {
          _iterator46.f();
        }

        elTooltip.classList[classToggle]('hover');
        var elT = el.getBoundingClientRect().top;
        var elL = el.getBoundingClientRect().left;
        var elW = el.offsetWidth;
        var elH = el.offsetHeight;
        var wW = win.innerWidth;
        var wH = win.innerHeight;
        var dT = doc.documentElement.scrollTop;
        var dL = doc.documentElement.scrollLeft;
        clearTimeout(Global.tooltip.timerHide);
        Global.tooltip.timerShow = setTimeout(function () {
          var tW = Math.floor(elTooltip.offsetWidth);
          var left = tW / 2 > elL - dL + elW / 2 ? 10 : elL - tW / 2 + elW / 2;
          wW < Math.floor(left) + tW ? elTooltip.style.right = '10px' : '';
          elTooltip.style.left = Math.floor(left) + 'px';
          var tH = Math.floor(elTooltip.offsetHeight);
          var top = elT - dT > wH / 2 ? elT + dT - tH - 8 : elT + elH + dT + 8;
          elTooltip.style.top = Math.floor(top) + 'px';
          var arrow = elT - dT > wH / 2 ? 'top' : 'bottom';
          elArrow.style.left = Math.floor(elL - left + elW / 2) + 'px';
          elTooltip.dataset.ps = arrow;
          elTooltip.setAttribute('aria-hidden', false);
          console.log(Math.floor(left) + tW, wW);
        }, 100);
        el.addEventListener('blur', Global.tooltip.hide);
        el.addEventListener('mouseleave', Global.tooltip.hide);
      }
    },
    back: function back(e) {
      e.preventDefault();
      var tooltips = doc.querySelectorAll('.ui-tooltip');
      var btns = doc.querySelectorAll('.ui-tooltip-btn');

      var _iterator47 = _createForOfIteratorHelper(tooltips),
          _step47;

      try {
        for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
          var tts = _step47.value;
          tts.setAttribute('aria-hidden', true);
        }
      } catch (err) {
        _iterator47.e(err);
      } finally {
        _iterator47.f();
      }

      var _iterator48 = _createForOfIteratorHelper(btns),
          _step48;

      try {
        for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
          var bs = _step48.value;
          bs.dataset.view = 'unfix';
        }
      } catch (err) {
        _iterator48.e(err);
      } finally {
        _iterator48.f();
      }

      doc.removeEventListener('click', Global.tooltip.back);
    },
    hide: function hide(e) {
      e.preventDefault();
      var el = e.currentTarget;
      var elId = el.getAttribute('aria-describedby');
      var elTooltip = doc.querySelector('#' + elId);

      if (el.dataset.view !== 'fix') {
        clearTimeout(Global.tooltip.timerShow);
        elTooltip.classList.remove('hover');
        elTooltip.setAttribute('aria-hidden', true);
      }

      el.removeEventListener('blur', Global.tooltip.hide);
      el.removeEventListener('mouseleave', Global.tooltip.hide);
    },
    init: function init(opt) {
      var option = Object.assign({}, Global.tooltip.options, opt);
      var el_btn = doc.querySelectorAll('.ui-tooltip-btn');

      var _iterator49 = _createForOfIteratorHelper(el_btn),
          _step49;

      try {
        for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
          var btn = _step49.value;
          btn.addEventListener('mouseover', Global.tooltip.show);
          btn.addEventListener('focus', Global.tooltip.show);
          btn.addEventListener('click', Global.tooltip.show);
          win.addEventListener('resize', Global.tooltip.back);
        }
      } catch (err) {
        _iterator49.e(err);
      } finally {
        _iterator49.f();
      }
    }
  };
  Global.floating = {
    init: function init() {
      var el_body = document.body;
      var el_items = doc.querySelectorAll('.ui-floating');
      el_body.dataset.fixheight = 0; //setting

      var _iterator50 = _createForOfIteratorHelper(el_items),
          _step50;

      try {
        for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
          var _that$dataset$mg;

          var that = _step50.value;
          var fix = that.dataset.fix;
          var ps = that.dataset.ps;
          var el_wrap = that.querySelector('.ui-floating-wrap');
          var mg = Number((_that$dataset$mg = that.dataset.mg) !== null && _that$dataset$mg !== void 0 ? _that$dataset$mg : 0);
          var elH = el_wrap.offsetHeight;
          var elT = that.getBoundingClientRect().top;
          var wH = win.innerHeight;
          that.style.height = elH + 'px';

          if (fix === 'true') {
            //고정으로 시작
            that.dataset.state = 'fix';

            if (ps === 'top') {
              if (elT >= 0 + mg && fix === 'true') {
                el_wrap.style.marginTop = mg + 'px';
              } else {
                that.dataset.state = 'normal';
              }
            } else {
              if (elT - wH + elH + mg >= 0 && fix === 'true') {
                el_wrap.style.transform = 'translateY(-' + mg + 'px)';
              } else {
                that.dataset.state = 'normal';
              }
            }
          } else {
            that.dataset.state = 'normal';
          }
        }
      } catch (err) {
        _iterator50.e(err);
      } finally {
        _iterator50.f();
      }

      window.removeEventListener('scroll', this.scrollAct);
      window.addEventListener('scroll', this.scrollAct);
    },
    scrollAct: function scrollAct() {
      var elBody = document.body;
      var el_items = doc.querySelectorAll('.ui-floating');

      var _iterator51 = _createForOfIteratorHelper(el_items),
          _step51;

      try {
        for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
          var _that$dataset$mg2;

          var that = _step51.value;
          var fix = that.dataset.fix;
          var ps = that.dataset.ps;
          var state = that.dataset.state;
          var el_wrap = that.querySelector('.ui-floating-wrap');
          var mg = Number((_that$dataset$mg2 = that.dataset.mg) !== null && _that$dataset$mg2 !== void 0 ? _that$dataset$mg2 : 0);
          var elH = el_wrap.offsetHeight;
          var elT = that.getBoundingClientRect().top;
          var wH = win.innerHeight;

          if (state === 'fix') {
            if (ps === 'top') {
              //현재 상단고정상태
              if (elT <= 0 + mg && fix === 'true') {
                that.dataset.state = 'normal';
                el_wrap.style.marginTop = 0;
              }

              if (elT >= 0 + mg && fix === 'false') {
                that.dataset.state = 'normal';
                el_wrap.style.marginTop = 0;
              }
            } else {
              //현재 하단고정상태
              if (elT - wH + elH + mg <= 0 && fix === 'true') {
                that.dataset.state = 'normal';
                el_wrap.style.transform = 'translateY(0)';
              }

              if (elT - wH + elH + mg >= 0 && fix === 'false') {
                that.dataset.state = 'normal';
                el_wrap.style.transform = 'translateY(0)';
              }
            }
          } else {
            if (ps === 'top') {
              //현재 상단고정상태
              if (elT >= 0 + mg && fix === 'true') {
                that.dataset.state = 'fix';
                el_wrap.style.marginTop = mg + 'px';
              }

              if (elT <= 0 + mg && fix === 'false') {
                that.dataset.state = 'fix';
                el_wrap.style.marginTop = mg + 'px';
              }
            } else {
              //현재 하단고정상태
              if (elT - wH + elH + mg >= 0 && fix === 'true') {
                that.dataset.state = 'fix';
                el_wrap.style.transform = 'translateY(-' + mg + 'px)';
              }

              if (elT - wH + elH + mg <= 0 && fix === 'false') {
                that.dataset.state = 'fix';
                el_wrap.style.transform = 'translateY(-' + mg + 'px)';
              }
            }
          }
        }
      } catch (err) {
        _iterator51.e(err);
      } finally {
        _iterator51.f();
      }
    },
    range: function range() {
      var el_ranges = doc.querySelectorAll('.ui-floating-range');
      window.removeEventListener('scroll', act);
      window.addEventListener('scroll', act);

      function act() {
        var _iterator52 = _createForOfIteratorHelper(el_ranges),
            _step52;

        try {
          for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
            var _el_range$dataset$mg;

            var el_range = _step52.value;
            var el_item = el_range.querySelector('.ui-floating-range-item');
            var mg = (_el_range$dataset$mg = el_range.dataset.mg) !== null && _el_range$dataset$mg !== void 0 ? _el_range$dataset$mg : 0;
            var itemH = el_item.offsetHeight;
            var wrapT = el_range.getBoundingClientRect().top;
            var wrapH = el_range.offsetHeight;
            var wT = win.pageYOffset;

            if (wT > wrapT + wT - mg) {
              if (wrapH - itemH >= wT - (wrapT + wT - mg)) {
                el_item.style.top = wT - (wrapT + wT - mg) + 'px';
              }
            } else {
              el_item.style.top = 0;
            }
          }
        } catch (err) {
          _iterator52.e(err);
        } finally {
          _iterator52.f();
        }
      }
    }
  };
  Global.tab = {
    options: {
      current: 0,
      onePanel: false,
      callback: false,
      effect: false,
      align: 'center'
    },
    init: function init(option) {
      var opt = Object.assign({}, this.options, option);
      var id = opt.id;
      var effect = opt.effect;
      var current = isNaN(opt.current) ? 0 : opt.current;
      var onePanel = opt.onePanel;
      var callback = opt.callback;
      var align = opt.align;
      var el_tab = doc.querySelector('#' + id);
      var el_btnwrap = el_tab.querySelector(':scope > .ui-tab-btns');
      var el_wrap = el_btnwrap.querySelector(':scope > .btn-wrap');
      var el_btns = el_btnwrap.querySelectorAll('.ui-tab-btn');
      var el_pnlwrap = el_tab.querySelector(':scope > .ui-tab-pnls');
      var el_pnls = el_pnlwrap.querySelectorAll(':scope > .ui-tab-pnl');
      var keys = Global.state.keys;
      var para = Global.para.get('tab');
      var paras;
      var paraname; //set up

      if (!!para) {
        if (para.split('+').length > 1) {
          //2 or more : tab=exeAcco1*2+exeAcco2*3
          paras = para.split('+');

          for (var j = 0; j < paras.length; j++) {
            paraname = paras[j].split('*');
            opt.id === paraname[0] ? current = Number(paraname[1]) : '';
          }
        } else {
          //only one : tab=1
          if (para.split('*').length > 1) {
            paraname = para.split('*');
            opt.id === paraname[0] ? current = Number(paraname[1]) : '';
          } else {
            current = Number(para);
          }
        }
      } //set up


      !!effect && el_tab.classList.add(effect);
      el_btnwrap.setAttribute('role', 'tablist'); //setting

      for (var i = 0, _len6 = el_btns.length; i < _len6; i++) {
        var el_btn = el_btns[i];
        var el_pnl = el_pnls[i];
        el_btn.setAttribute('role', 'tab');

        if (!el_btn.dataset.tab) {
          el_btn.dataset.tab = i;
        }

        el_btn.dataset.len = _len6;
        el_btn.dataset.n = i;
        var n = Number(el_btn.dataset.tab);
        var isCurrent = Number(current) === n;
        var cls = isCurrent ? 'add' : 'remove';

        if (!el_btn.id) {
          el_btn.id = id + 'Btn' + n;
        }

        if (!onePanel) {
          el_pnl.setAttribute('role', 'tabpanel');

          if (!el_pnl.dataset.tab) {
            el_pnl.dataset.tab = i;
          }

          if (!el_pnl.id) {
            el_pnl.id = id + 'pnl' + n;
          }
        } else {
          el_pnls[0].setAttribute('role', 'tabpanel');
          el_pnls[0].dataset.tab = current;
          el_pnls[0].id = id + 'pnl' + current;
        }

        var btnID = el_btn.id;
        var pnlID = !onePanel ? el_pnl.id : el_pnls[0].id;
        el_btn.setAttribute('aria-controls', pnlID);
        el_btn.classList[cls]('selected');

        if (!onePanel) {
          el_pnl.setAttribute('aria-labelledby', btnID);

          if (Number(current) === Number(el_pnl.dataset.tab)) {
            el_pnl.setAttribute('aria-hidden', false);
            el_pnl.classList.add('selected');
          } else {
            el_pnl.setAttribute('aria-hidden', true);
            el_pnl.classList.remove('selected');
          }
        } else {
          el_pnls[0].setAttribute('aria-labelledby', btnID);
          el_pnls[0].setAttribute('aria-hidden', false);
          el_pnls[0].classList[cls]('selected');
        }

        i === 0 && el_btn.setAttribute('tab-first', true);
        i === _len6 - 1 && el_btn.setAttribute('tab-last', true);

        if (isCurrent) {
          Global.scroll.move({
            selector: el_btnwrap,
            left: el_btn.getBoundingClientRect().left + el_btnwrap.scrollLeft,
            add: 0,
            align: align
          });
        }

        el_btn.addEventListener('click', evtClick);
        el_btn.addEventListener('keydown', evtKeys);
      }

      callback && callback(opt); //event

      function evtClick(e) {
        Global.tab.toggle({
          id: id,
          current: Number(e.currentTarget.dataset.tab),
          align: align,
          onePanel: onePanel,
          callback: callback
        });
      }

      function evtKeys(e) {
        var that = this;
        var n = Number(that.dataset.n);
        var m = Number(that.dataset.len);

        switch (e.keyCode) {
          case keys.up:
            upLeftKey(e);
            break;

          case keys.left:
            upLeftKey(e);
            break;

          case keys.down:
            downRightKey(e);
            break;

          case keys.right:
            downRightKey(e);
            break;

          case keys.end:
            endKey(e);
            break;

          case keys.home:
            homeKey(e);
            break;
        }

        function upLeftKey(e) {
          e.preventDefault();
          !that.getAttribute('tab-first') ? Global.tab.toggle({
            id: id,
            current: n - 1,
            align: align
          }) : Global.tab.toggle({
            id: id,
            current: m - 1,
            align: align
          });
        }

        function downRightKey(e) {
          e.preventDefault();
          !that.getAttribute('tab-last') ? Global.tab.toggle({
            id: id,
            current: n + 1,
            align: align
          }) : Global.tab.toggle({
            id: id,
            current: 0,
            align: align
          });
        }

        function endKey(e) {
          e.preventDefault();
          Global.tab.toggle({
            id: id,
            current: m - 1,
            align: align
          });
        }

        function homeKey(e) {
          e.preventDefault();
          Global.tab.toggle({
            id: id,
            current: 0,
            align: align
          });
        }
      }
    },
    toggle: function toggle(option) {
      var opt = Object.assign({}, this.options, option);
      var id = opt.id;
      var callback = opt.callback;
      var el_tab = doc.querySelector('#' + id);
      var el_btnwrap = el_tab.querySelector(':scope > .ui-tab-btns');
      var el_btn = el_btnwrap.querySelectorAll('.ui-tab-btn');
      var el_pnlwrap = el_tab.querySelector(':scope > .ui-tab-pnls');
      var el_pnls = el_pnlwrap.querySelectorAll(':scope > .ui-tab-pnl');
      var current = isNaN(opt.current) ? 0 : opt.current;
      var onePanel = opt.onePanel;
      var align = opt.align;
      var el_current = el_btnwrap.querySelector('.ui-tab-btn[data-tab="' + current + '"]');
      var el_pnlcurrent = el_pnlwrap.querySelector('.ui-tab-pnl[data-tab="' + current + '"]');
      var btnId = el_current.id;
      var el_scroll = el_btnwrap.querySelector(':scope > .ui-scrollbar-item');

      var _iterator53 = _createForOfIteratorHelper(el_btn),
          _step53;

      try {
        for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
          var _that6 = _step53.value;

          _that6.classList.remove('selected');
        }
      } catch (err) {
        _iterator53.e(err);
      } finally {
        _iterator53.f();
      }

      console.log(id);
      el_current.classList.add('selected');
      el_current.focus();

      if (!el_scroll) {
        el_scroll = el_btnwrap;
      }

      Global.scroll.move({
        selector: el_btnwrap,
        left: el_current.getBoundingClientRect().left + el_scroll.scrollLeft,
        add: 0,
        align: align
      });

      if (!onePanel) {
        var _iterator54 = _createForOfIteratorHelper(el_pnls),
            _step54;

        try {
          for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
            var that = _step54.value;
            that.setAttribute('aria-hidden', true);
            that.classList.remove('selected');
          }
        } catch (err) {
          _iterator54.e(err);
        } finally {
          _iterator54.f();
        }

        el_pnlcurrent.classList.add('selected');
        el_pnlcurrent.setAttribute('aria-hidden', false);
      } else {
        el_pnls[0].setAttribute('aria-hidden', false);
        el_pnls[0].setAttribute('aria-labelledby', btnId);
      }

      callback && callback(opt);
    }
  };
  /* 작업필요 */

  Global.project = {
    list: function list(opt) {
      Global.ajax.init({
        area: document.querySelector('#' + opt.id),
        url: opt.url,
        page: false,
        callback: callback
      });

      function callback(v) {
        var dataExecel = JSON.parse(v);
        var today = new Date();
        today = getFormatDate(today);

        function getFormatDate(date) {
          var year = date.getFullYear();
          var month = 1 + date.getMonth();
          var day = date.getDate();
          month = month >= 10 ? month : '0' + month;
          day = day >= 10 ? day : '0' + day;
          return year + '-' + month + '-' + day;
        }

        function changeFormatDate(date) {
          var year = date.substring(0, 4);
          var month = date.substring(5, 6);
          var day = date.substring(6, 8);
          month = month >= 10 ? month : '0' + month;
          day = day >= 10 ? day : '0' + day;
          return year + '-' + month + '-' + day;
        }

        function dateDiff(_date1, _date2) {
          var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
          var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
          diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
          diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());
          var isAbs = diffDate_2.getTime() - diffDate_1.getTime() < 0 ? '' : '-';
          var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
          diff = isAbs + Math.ceil(diff / (1000 * 3600 * 24));
          return diff;
        }

        var state, date, enddate, moddate, pub, dev, id, idm, memo, overl;
        var d1, d2, d3, d4, d5, d6, d7, d8;
        var r1, r2, r3, r4;
        var d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_;
        var c1, c2, c3, c4, c5, c6, c7, c8;
        var endsum = 0,
            delsum = 0,
            tstsum = 0,
            ingsum = 0,
            watsum = 0,
            chksum = 0,
            num = -1,
            ctg_state = [],
            ctg_pub = [],
            ctg_dev = [],
            ctg_date = [],
            ctg_enddate = [],
            ctg_mdate = [],
            ctg_menu = [],
            cls2 = '',
            cls = '',
            root = '',
            depth = '',
            table = '';
        var len = dataExecel.list.length;

        for (var i = 0; i < len; i++) {
          state = dataExecel.list[i].state || '';
          date = dataExecel.list[i].date || '';
          enddate = dataExecel.list[i].enddate || '';
          moddate = dataExecel.list[i].moddate || '';
          pub = dataExecel.list[i].pub || '';
          dev = dataExecel.list[i].dev || '';
          id = dataExecel.list[i].id || '';
          idm = dataExecel.list[i].idm || '';
          memo = dataExecel.list[i].memo || '';
          d1 = dataExecel.list[i].d1 || '';
          d2 = dataExecel.list[i].d2 || '';
          d3 = dataExecel.list[i].d3 || '';
          d4 = dataExecel.list[i].d4 || '';
          d5 = dataExecel.list[i].d5 || '';
          d6 = dataExecel.list[i].d6 || '';
          d7 = dataExecel.list[i].d7 || '';
          d8 = dataExecel.list[i].d8 || '';
          r1 = dataExecel.list[i].r1 || '';
          r2 = dataExecel.list[i].r2 || '';
          r3 = dataExecel.list[i].r3 || '';
          r4 = dataExecel.list[i].r4 || '';
          overl = dataExecel.list[i].overlap || '';
          root = dataExecel.list[i].root || '';
          d1 !== '' ? d1_ = dataExecel.list[i - 1 < 0 ? 0 : i].d1 : d1 = d1_;
          dataExecel.list[i].d1 === '' ? d2 !== '' ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2 = d2_ : !!dataExecel.list[i - 1 < 0 ? 0 : i].d2 ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2_ = '';
          dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' ? d3 !== '' ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3 = d3_ : !!dataExecel.list[i - 1 < 0 ? 0 : i].d3 ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3_ = '';
          dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' ? d4 !== '' ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4 = d4_ : !!dataExecel.list[i - 1 < 0 ? 0 : i].d4 ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4_ = '';
          dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' ? d5 !== '' ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5 = d5_ : !!dataExecel.list[i - 1 < 0 ? 0 : i].d5 ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5_ = '';
          dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '' ? d6 !== '' ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6 = d6_ : !!dataExecel.list[i - 1 < 0 ? 0 : i].d6 ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6_ = '';
          dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '' && dataExecel.list[i].d6 === '' ? d7 !== '' ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7 = d7_ : !!dataExecel.list[i - 1 < 0 ? 0 : i].d7 ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7_ = '';
          !!dataExecel.list[i].d1 ? d1 = dataExecel.list[i].d1 : '';
          !!dataExecel.list[i].d2 ? d2 = dataExecel.list[i].d2 : '';
          !!dataExecel.list[i].d3 ? d3 = dataExecel.list[i].d3 : '';
          !!dataExecel.list[i].d4 ? d4 = dataExecel.list[i].d4 : '';
          !!dataExecel.list[i].d5 ? d5 = dataExecel.list[i].d5 : '';
          !!dataExecel.list[i].d6 ? d6 = dataExecel.list[i].d6 : '';
          !!dataExecel.list[i].d7 ? d7 = dataExecel.list[i].d7 : '';
          !!dataExecel.list[i].d8 ? d8 = dataExecel.list[i].d8 : '';
          endsum = state === "완료" ? endsum + 1 : endsum;
          tstsum = state === "검수" ? tstsum + 1 : tstsum;
          delsum = state === "제외" ? delsum + 1 : delsum;
          watsum = state === "대기" ? watsum + 1 : watsum;
          var x = i === 0 ? 0 : i - 1;
          c1 = dataExecel.list[i].d1 !== dataExecel.list[x].d1 ? ' c1' : '';
          c2 = dataExecel.list[i].d2 !== dataExecel.list[x].d2 ? ' c2' : '';
          c3 = dataExecel.list[i].d3 !== dataExecel.list[x].d3 ? ' c3' : '';
          c4 = dataExecel.list[i].d4 !== dataExecel.list[x].d4 ? ' c4' : '';
          c5 = dataExecel.list[i].d5 !== dataExecel.list[x].d5 ? ' c5' : '';
          c6 = dataExecel.list[i].d6 !== dataExecel.list[x].d6 ? ' c6' : '';
          c7 = dataExecel.list[i].d7 !== dataExecel.list[x].d7 ? ' c7' : '';
          c8 = dataExecel.list[i].d8 !== dataExecel.list[x].d8 ? ' c8' : '';
          cls2 = state === '완료' ? 'end' : state === '검수' ? 'tst' : state === '제외' ? 'del' : state === '약관' ? 'trm' : '';
          cls = cls2 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
          ctg_state.push(dataExecel.list[i].state);
          ctg_pub.push(dataExecel.list[i].pub);
          ctg_dev.push(dataExecel.list[i].dev);
          state !== '제외' ? ctg_date.push(dataExecel.list[i].date) : '';
          ctg_enddate.push(dataExecel.list[i].enddate);
          ctg_menu.push(dataExecel.list[i].d2);

          if (state !== '제외' && i === 0) {
            table += '<div class="tbl-base">';
            table += '<table>';
            table += '<caption>코딩리스트</caption>';
            table += '<colgroup>';
            table += '<col class="col-1">'; //상태

            table += '<col class="col-2">'; //일정

            table += '<col class="col-2">'; //완료일

            table += '<col class="col-2">'; //수정일

            table += '<col class="col-3">'; //퍼블담당자

            table += '<col class="col-3">'; //개발담당자

            table += '<col class="col-4">'; //화면아이디

            table += '</colgroup>';
            table += '<colgroup>';
            dataExecel.list[i].d1 !== undefined ? table += '<col class="col-5">' : '';
            dataExecel.list[i].d2 !== undefined ? table += '<col class="col-5">' : '';
            dataExecel.list[i].d3 !== undefined ? table += '<col class="col-5">' : '';
            dataExecel.list[i].d4 !== undefined ? table += '<col class="col-5">' : '';
            dataExecel.list[i].d5 !== undefined ? table += '<col class="col-5">' : '';
            dataExecel.list[i].d6 !== undefined ? table += '<col class="col-5">' : '';
            dataExecel.list[i].d7 !== undefined ? table += '<col class="col-5">' : '';
            dataExecel.list[i].d8 !== undefined ? table += '<col class="col-5">' : '';
            table += '</colgroup>';
            table += '<col class="col-6">'; //메모

            table += '<thead>';
            table += '<th scope="col">' + state + '</th>';
            table += '<th scope="col">' + date + '</th>';
            table += '<th scope="col">' + enddate + '</th>';
            table += '<th scope="col">' + moddate + '</th>';
            table += '<th scope="col">' + pub + '</th>';
            table += '<th scope="col">' + dev + '</th>';
            table += '<th scope="col">' + id + '</th>';
            dataExecel.list[i].d1 !== undefined ? table += '<th scope="col">' + d1 + '</th>' : '';
            dataExecel.list[i].d2 !== undefined ? table += '<th scope="col">' + d2 + '</th>' : '';
            dataExecel.list[i].d3 !== undefined ? table += '<th scope="col">' + d3 + '</th>' : '';
            dataExecel.list[i].d4 !== undefined ? table += '<th scope="col">' + d4 + '</th>' : '';
            dataExecel.list[i].d5 !== undefined ? table += '<th scope="col">' + d5 + '</th>' : '';
            dataExecel.list[i].d6 !== undefined ? table += '<th scope="col">' + d6 + '</th>' : '';
            dataExecel.list[i].d7 !== undefined ? table += '<th scope="col">' + d7 + '</th>' : '';
            dataExecel.list[i].d8 !== undefined ? table += '<th scope="col">' + d8 + '</th>' : '';
            table += '<th scope="col">' + memo + '</th>';
            table += '</thead>';
            table += '</tbody>';
          } else if (state !== '제외') {
            num = num + 1;

            if (!(date === '미정' || date === '일정' || date === undefined) && state !== '완료' && state !== '검수' && state !== '체크') {
              var dateStart = date;
              dateStart = changeFormatDate(dateStart);
              var care = dateDiff(dateStart, new Date());

              if (care < 3 && care >= 0) {
                cls = cls + ' sch_care';
              } else if (care < 0) {
                cls = cls + ' sch_warn';
              }
            }

            Global.state.device.mobile ? table += '<tr class="' + cls + '" >' : table += '<tr class="' + cls + '">';
            table += '<td class="state"><span>' + state + '</span></td>';
            table += '<td class="date"><span>' + date.substring(4, 10) + '</span></td>';
            table += '<td class="enddate"><span>' + enddate.substring(4, 10) + '</span></td>';
            table += '<td class="moddate"><span>' + moddate.substring(4, 10) + '</span></td>';
            table += '<td class="name pub"><span>' + pub + '</span></td>';
            table += '<td class="name dev"><span>' + dev + '</span></td>';
            table += id !== '' ? '<td class="id ico_pg"><span><a class="ui-coding-link" href="/netiveUI/html/index.html?page=' + id + '" target="coding">' + id + '</a></span></td>' : //'<td class="id ico_pg"><span><a href="' + root + '/' + id + '.html" target="coding">' + id + '</a></span></td>' :
            '<td class="id "><span></span></td>';
            dataExecel.list[i].d1 !== '' ? table += '<td class="d d1"><span>' + d1 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].d2 !== '' ? table += '<td class="d d2"><span>' + d2 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].d3 !== '' ? table += '<td class="d d3"><span>' + d3 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].d4 !== '' ? table += '<td class="d d4"><span>' + d4 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].d5 !== '' ? table += '<td class="d d5"><span>' + d5 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].d6 !== '' ? table += '<td class="d d6"><span>' + d6 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].d7 !== '' ? table += '<td class="d d7"><span>' + d7 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].d8 !== '' ? table += '<td class="d d8"><span>' + d8 + '</span></td>' : table += '<td class="d"></td>';
            dataExecel.list[i].memo === '' ? table += '<td class="memo none"><span>' + memo + '</span></td>' : table += '<td class="memo"><span>' + memo + '</span></td>';
            table += '</tr>';
            i === len - 1 ? table += '</tbody>' : '';
            i === len - 1 ? table += '</table>' : '';
          }

          table += '</div>';
          root = '';
        }

        var codinglist = doc.querySelector('#' + opt.id);
        codinglist.innerHTML = table;
        table = '';
        var info = '<div class="ui-codinglist-header">';
        info += '<div class="ui-codinglist-state"><dl><dt>' + today + '</dt><dd>';
        info += '<ul class="ui-codinglist-info">';
        info += '<li>진행율(완료:<span class="n_end">0</span>+검수:<span class="n_tst">0</span>) : <span class="n_all">0</span> / <span class="total">0</span> (<span class="per0">0</span>%)</li>';
        info += '</ul></dd></dl><span class="bar"><span></div>';
        info += '<div class="box-srch mgt-xs">';
        info += '<div class="srch-area">';
        info += '<input type="search" id="projectListSrchCode" class="inp-base ui-inpcancel" value="" placeholder="검색어를 입력해주세요.">';
        info += '<button type="button" id="projectListSrchBtn" class="btn-base"><span>검색</span></button>';
        info += '<button type="button" id="projectListSrchRe" class="btn-base"><span>초기화</span></button>';
        info += '<button type="button" id="mobilePreview" class="btn-base"><span>모바일</span></button>';
        info += '</div>';
        info += '</div>';
        var ifr = '<div class="ui-codinglist-mobile"><button type="button" id="mobilePreviewClose" class="btn-close icon-material" data-icon="close"><span class="a11y-hidden">닫기</span></button><iframe id="codingListIframe" title="mobile preview" class="ui-codinglist-iframe type-ipx" src=""></iframe></div>';
        codinglist.insertAdjacentHTML('afterbegin', info);
        document.querySelector('body').insertAdjacentHTML('beforeend', ifr);
        var links = doc.querySelectorAll('.ui-coding-link');
        var previewBtn = doc.querySelector('#mobilePreview');
        var previewClose = doc.querySelector('#mobilePreviewClose');
        var uiCodingIframeWrap = doc.querySelector('.ui-codinglist-mobile');
        var uiCodingIframe = doc.querySelector('.ui-codinglist-iframe');
        previewBtn.addEventListener('click', pagePreviewOn);
        previewClose.addEventListener('click', pagePreviewOn);

        var _iterator55 = _createForOfIteratorHelper(links),
            _step55;

        try {
          for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
            var that = _step55.value;
            that.addEventListener('mouseover', pagePreview);
          }
        } catch (err) {
          _iterator55.e(err);
        } finally {
          _iterator55.f();
        }

        function pagePreviewOn() {
          uiCodingIframeWrap.classList.toggle('on');
        }

        function pagePreview() {
          var pageSrc = this.href;

          if (uiCodingIframe.src === pageSrc) {
            return false;
          }

          uiCodingIframe.src = pageSrc;
          uiCodingIframe.addEventListener('load', previewAct);
        }

        function previewAct() {
          var iframeDoc = uiCodingIframe.contentDocument;
          var iframeHtml = iframeDoc.querySelector('html');
          iframeHtml.classList.remove('etc');
          iframeHtml.classList.remove('ui-d');
          iframeHtml.classList.remove('chrome');
          iframeHtml.classList.add('ios');
          iframeHtml.classList.add('ui-m');
          iframeHtml.classList.add('safari');
        }

        var el_info = doc.querySelector('.ui-codinglist-info');
        var el_total = el_info.querySelector('.total');
        var el_all = el_info.querySelector('.n_all');
        var el_end = el_info.querySelector('.n_end');
        var el_tst = el_info.querySelector('.n_tst');
        var el_per0 = el_info.querySelector('.per0');
        var el_bar = doc.querySelector('.ui-codinglist-state .bar');
        var srchCode = doc.querySelector('#projectListSrchCode');
        var srchBtn = doc.querySelector('#projectListSrchBtn');
        var srchBtnRe = doc.querySelector('#projectListSrchRe');
        el_end.textContent = endsum;
        el_tst.textContent = tstsum;
        el_total.textContent = len - delsum - 1;
        el_all.textContent = endsum + tstsum;
        el_per0.textContent = ((endsum + tstsum) / (len - delsum - 1) * 100).toFixed(0);
        el_bar.style.width = ((endsum + tstsum) / (len - delsum - 1) * 100).toFixed(0) + '%';

        if (srchCode.value !== '') {
          var temp = $('.ui-codinglist tbody tr td *:contains(' + $('#projectListSrchCode').val() + ')');
          $('.ui-codinglist tbody tr').hide();
          $(temp).closest('tr').show();
        }

        srchBtnRe.addEventListener('click', function () {
          var el = doc.querySelector('.ui-codinglist tbody');
          var el_tr = el.querySelectorAll('tr');
          srchCode.value = '';

          var _iterator56 = _createForOfIteratorHelper(el_tr),
              _step56;

          try {
            for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
              var that = _step56.value;
              that.classList.remove('srch-hidden');
            }
          } catch (err) {
            _iterator56.e(err);
          } finally {
            _iterator56.f();
          }
        });
        srchBtn.addEventListener('click', srchAct);
        srchCode.addEventListener('keyup', function () {
          if (win.event.keyCode === 13) {
            srchAct();
          }
        });

        function srchAct() {
          var k = srchCode.value;
          var el = doc.querySelector('.ui-codinglist tbody');
          var el_td = el.querySelectorAll('td');
          var el_tr = el.querySelectorAll('tr');

          var _iterator57 = _createForOfIteratorHelper(el_tr),
              _step57;

          try {
            for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
              var that = _step57.value;
              that.classList.add('srch-hidden');
            }
          } catch (err) {
            _iterator57.e(err);
          } finally {
            _iterator57.f();
          }

          var _iterator58 = _createForOfIteratorHelper(el_td),
              _step58;

          try {
            for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
              var _that7 = _step58.value;
              var text = _that7.textContent;

              var el_tr2 = _that7.closest('tr');

              console.log(text.indexOf(k), text, k);

              if (text.indexOf(k) >= 0) {
                console.log(1111);
                el_tr2.classList.remove('srch-hidden');
              }
            }
          } catch (err) {
            _iterator58.e(err);
          } finally {
            _iterator58.f();
          }
        }

        var pjl = document.querySelector('#projectList');
        var pjl_thead = pjl.querySelector('table thead');
        var pjl_th = pjl_thead.querySelectorAll('th');

        var _loop3 = function _loop3(_i5) {
          pjl_th[_i5].addEventListener('click', function () {
            Global.table.sort({
              id: opt.id,
              n: _i5
            });
          });
        };

        for (var _i5 = 0; _i5 < pjl_th.length; _i5++) {
          _loop3(_i5);
        }
      }
    }
  };
  /* 작업필요 */

  Global.count = {
    step: function step(opt) {
      var el = doc.querySelector('#' + opt.id);
      var countNum = !!opt.value === true ? opt.value : el.textContent;
      var count = 0;

      var timer, diff, _counter;

      var add = Math.ceil((countNum - count) / (countNum - count), -2);
      var j = 1;
      var v = 0;
      var s = 100;

      if (el.dataset.ing !== 'true') {
        _counter = function counter() {
          j = v < 10 ? j = 0 : v < 10 ? j + 11 : v < 40 ? j + 111 : v < 70 ? j + 1111 : j + 11111;
          s = s < 0 ? s = 0 : s - 10;
          diff = countNum - count;
          diff > 0 ? count += add + j : '';
          var n = Global.parts.comma(count);
          el.textContent = n;
          v = v + 1;

          if (count < countNum) {
            timer = setTimeout(function () {
              _counter();
            }, s);
          } else {
            el.textContent = Global.parts.comma(countNum);
            clearTimeout(timer);
          }
        };

        _counter();
      }
    }
  };
  /* 작업필요 */

  Global.slot = {
    play: {},
    init: function init(opt) {
      if (opt === undefined) {
        return false;
      }

      var $slot = $('#' + opt.id),
          current = opt.current === undefined ? 0 : opt.current,
          auto = opt.auto === undefined ? false : opt.auto,
          single = opt.single === undefined ? true : opt.single,
          $wrap = $slot.find('.ui-slot-wrap'),
          $item = $wrap.find('.ui-slot-item'),
          item_h = $item.outerHeight(),
          len = $item.length,
          cut,
          clone; //common set up

      $slot.data('n', len).data('single', single);
      $item.each(function (i) {
        $(this).attr('n', i + 1).data('n', i + 1);
      }); //single or multi set up

      if (single) {
        $wrap.css({
          marginTop: 0,
          top: (current - 1) * item_h * -1
        });
        itemClone({
          n: 0,
          append: true
        });
      } else {
        $wrap.css({
          marginTop: (item_h / 2 + item_h) * -1,
          top: 0
        });

        if (current - 1 > 0) {
          for (var i = 0; i < current - 1; i++) {
            // 2일경우
            if (current - 2 === i) {
              itemClone({
                n: i - 1,
                append: false
              });
              itemClone({
                n: i,
                append: true
              });
              itemClone({
                n: i + 1,
                append: true
              });
              itemClone({
                n: i + 2,
                append: true
              });
            } else {
              cut = $item.eq(i).detach();
              $wrap.append(cut);
            }
          }
        } else {
          itemClone({
            n: -1,
            append: false
          });
          itemClone({
            n: -2,
            append: false
          });
          itemClone({
            n: current - 1,
            append: true
          });
          itemClone({
            n: current,
            append: true
          });
        }
      }

      function itemClone(opt) {
        //var stickitem = opt.append ? 'append' : 'prepend';
        clone = $item.eq(opt.n).clone().addClass('clone').removeAttr('n');
        $wrap[opt.append ? 'append' : 'prepend'](clone);
      }

      auto ? Global.slot.start(opt) : '';
    },
    start: function start(opt) {
      if (opt === undefined) {
        return false;
      }

      var $slot = $('#' + opt.id),
          $wrap = $slot.find('.ui-slot-wrap'),
          $item = $wrap.find('.ui-slot-item'),
          single = $slot.data('single'),
          item_h = $item.outerHeight(),
          len = $item.length,
          wrap_h = len * item_h,
          h = 0;
      var s = 500;

      if (!$slot.data('ing')) {
        $slot.data('ing', true);
        Global.slot[opt.id] = win.setInterval(steplot, s);
      }

      function steplot() {
        $wrap.css('top', 0).stop().animate({
          top: single ? item_h * (len - 1) * -1 : Math.ceil(item_h * (len - 3) * -1)
        }, s, 'linear');
        win.clearInterval(Global.slot[opt.id]);
        Global.slot[opt.id] = win.setInterval(steplot, s);
      }
    },
    stop: function stop(opt) {
      if (opt === undefined) {
        return false;
      }

      var $slot = $('#' + opt.id),
          $wrap = $slot.find('.ui-slot-wrap'),
          $item = $wrap.find('.ui-slot-item'),
          item_h = $item.outerHeight(),
          len = $item.length,
          callback = opt.callback,
          single = $slot.data('single'),
          n = $slot.data('n'),
          result = Math.floor(Math.random() * n) + 1,
          index = $wrap.find('.ui-slot-item[n="' + result + '"]').index(),
          x = single ? index : index - 2,
          timer,
          t,
          s = 500;
      $slot.data('ing', false);
      $item.removeClass('selected');
      single ? $wrap.css('margin-top', 0) : '';
      clearTimeout(timer);
      timer = setTimeout(function () {
        win.clearInterval(Global.slot[opt.id]);
        t = item_h * x * -1 > 0 ? item_h * x : item_h * x * -1;
        $wrap.stop().animate({
          top: t
        }, 1000, function () {
          $wrap.find('.ui-slot-item').eq(index).addClass('selected');
          callback(result);
        });
      }, 10);
    }
  };
  /* 작업필요 */

  Global.draggable = {
    init: function init(opt) {
      var $wrap = $('#' + opt.id);
      var $item = $wrap.find('.ui-draggable-item');
      var $area = $wrap.find('.ui-draggable-area');
      var scale = 1;
      var $svg = $wrap.find('svg'); //기본값 세팅

      $(window).off('resize.aaa').on('resize.aaa', function () {
        set();
      });
      set();

      function set() {
        scale = 1;
        $item.each(function (i) {
          var $this = $(this);
          $this.addClass('original');
          $this.attr('orgt', $this.offset().top / scale - $wrap.offset().top / scale);
          $this.attr('orgl', $this.offset().left / scale - $wrap.offset().left / scale);

          if (!$this.attr('onlymove')) {
            $this.after($this.clone().removeClass('original').addClass('clone').prop('disabled', true));
          }

          if (!!$this.attr('line')) {
            var nm = $this.attr('name');
            var strokWidth = 4 / scale;
            var lineX = Number($this.attr('orgl')) + $this.outerWidth() / 2 / scale - strokWidth / 2;
            var lineY = Number($this.attr('orgt')) + $this.outerHeight() / 2 / scale - strokWidth / 2;
            $this.attr('linex', lineX);
            $this.attr('liney', lineY);
            $svg.find('line[name="' + nm + '"]').attr('x1', lineX).attr('y1', lineY).attr('x2', lineX).attr('y2', lineY).attr('stroke-width', strokWidth);
          }
        });
        $wrap.attr('ts', $wrap.offset().top / scale);
        $wrap.attr('te', $wrap.offset().top / scale + $wrap.outerHeight() / scale);
        $wrap.attr('ls', $wrap.offset().left / scale);
        $wrap.attr('le', $wrap.offset().left / scale + $wrap.outerWidth() / scale);
        $area.each(function (i) {
          scale = 1;
          var $this = $(this);
          $this.attr('ts', $this.offset().top / scale);
          $this.attr('te', $this.offset().top / scale + $this.outerHeight() / scale);
          $this.attr('ls', $this.offset().left / scale);
          $this.attr('le', $this.offset().left / scale + $this.outerWidth() / scale);
        });
        $item.off('mousedown.drag').on('mousedown.drag', function (e) {
          scale = 1; //dragStart(e, this);

          var $this = $(this);
          var $wrap_ = $this.closest('.ui-draggable');
          var itemName = $this.attr('name');
          var $area = $wrap_.find('.ui-draggable-area[name="' + itemName + '"]');
          var wrapW = $wrap_.outerWidth();
          var wrapH = $wrap_.outerHeight();
          var itemW = $this.outerWidth();
          var itemH = $this.outerHeight();
          var moving = false;
          var onlymove = !!$this.attr('onlymove');
          var line = !!$this.attr('line');
          var x, y;
          var scopeW = wrapW - itemW,
              scopeH = wrapH - itemH;
          var arrTs = [],
              arrTe = [],
              arrLs = [],
              arrLe = [];
          var off_tw = $wrap.offset().top / scale,
              off_lw = $wrap.offset().left / scale,
              off_t = $this.position().top / scale,
              off_l = $this.position().left / scale;

          for (var i = 0, len = $area.length; i < len; i++) {
            console.log(i);
            arrTs.push($area.eq(i).position().top);
            arrTe.push($area.eq(i).position().top + $area.eq(i).outerHeight() * scale);
            arrLs.push($area.eq(i).position().left);
            arrLe.push($area.eq(i).position().left + $area.eq(i).outerWidth() * scale);
          }

          $this.css({
            top: off_t + 'px',
            left: off_l + 'px'
          });
          $(document).off('mousemove.drag').on('mousemove.drag', function (e) {
            moving = true;

            if (e.touches !== undefined) {
              y = e.touches[0].pageY / scale;
              x = e.touches[0].pageX / scale;
            } else {
              if (e.pageY !== undefined) {
                y = e.pageY / scale;
                x = e.pageX / scale;
              }

              if (e.pageY === undefined) {
                y = e.clientY / scale;
                x = e.clientX / scale;
              }
            }

            var $body = $('body');
            var nowT = y - itemH / 2 - off_tw;
            var nowL = x - itemW / 2 - off_lw;

            if (0 > nowT) {
              nowT = 0;
            }

            if (scopeH < nowT) {
              nowT = scopeH;
            }

            if (0 > nowL) {
              nowL = 0;
            }

            if (scopeW < nowL) {
              nowL = scopeW;
            }

            if (onlymove) {
              for (var i = 0; i < arrTs.length; i++) {
                var isInVer = nowT * scale > arrTs[i] - itemH * scale / 2 && nowT * scale < arrTe[i] - itemH * scale / 2;
                var isInHor = nowL * scale > arrLs[i] - itemW * scale / 2 && nowL * scale < arrLe[i] - itemW * scale / 2;

                if (isInVer && isInHor) {
                  if (Number($body.attr('dragps')) !== i) {
                    $body.attr('dragps', i);
                  }

                  break;
                } else {
                  if (0 <= nowT && scopeH >= nowT && 0 <= nowL && scopeW >= nowL) {
                    $body.removeAttr('dragps');
                  }
                }
              }
            }

            if (line) {
              var lineName = $this.attr('name');
              var lineX = Number(nowL) + Number($this.outerWidth() / 2);
              var lineY = Number(nowT) + Number($this.outerHeight() / 2);
              $svg.find('line[name="' + lineName + '"]').attr('x2', lineX).attr('y2', lineY);
              0 > nowT && $svg.find('line[name="' + lineName + '"]').attr('y2', 0);
              scopeH < nowT && $svg.find('line[name="' + lineName + '"]').attr('y2', scopeH);
              0 > nowL && $svg.find('line[name="' + lineName + '"]').attr('x2', 0);
              scopeW < nowL && $svg.find('line[name="' + lineName + '"]').attr('x2', scopeW);
            }

            $this.css({
              top: nowT + 'px',
              left: nowL + 'px'
            });
          }).off('mouseup.drag').on('mouseup.drag', function (e) {
            if (moving && !onlymove) {
              var nowT = $this.position().top + itemH / 2;
              var nowL = $this.position().left + itemW / 2;

              for (var i = 0; i < arrTs.length; i++) {
                var isIn = nowT > arrTs[i] && nowT < arrTe[i] && nowL > arrLs[i] && nowL < arrLe[i];
                var $area_ = $area.eq(i);

                if (isIn && !$area_.attr('full')) {
                  if (!$area_.attr('full')) {
                    if (!!$area_.attr('limit')) {
                      $area_.attr('full', true);
                      $area_.addClass('ok');
                    } else {
                      $area.eq(0).addClass('ok');
                    }

                    $this.addClass('ok');
                    $this.prop('disabled', true);
                  }
                }
              }

              if (!$this.hasClass('ok')) {
                if (line) {
                  var lineName = $this.attr('name');
                  $svg.find('line[name="' + lineName + '"]').attr('x2', $this.attr('linex')).attr('y2', $this.attr('liney'));
                }

                $this.stop().animate({
                  top: $this.attr('orgt') + 'px',
                  left: $this.attr('orgl') + 'px'
                });
              }
            }

            $(document).off('mousemove.drag');
            $(document).off('mouseup.drag');
          });
        });
      }
    },
    reset: function reset(opt) {
      var $wrap = opt !== undefined ? $('#' + opt.id) : $('.ui-draggable');
      var $item = $wrap.find('.ui-draggable-item');
      var $area = $wrap.find('.ui-draggable-area');
      var $svg = $wrap.find('svg');
      $('body').removeAttr('draggable');
      $area.removeClass('ok').removeAttr('full');
      $item.each(function () {
        var $this = $(this);
        $this.prop('disabled', false).removeClass('ok');
        $this.stop().animate({
          top: $this.attr('orgt') + 'px',
          left: $this.attr('orgl') + 'px'
        });

        if (!!$this.attr('line')) {
          var nm = $this.attr('name');
          $svg.find('line[name="' + nm + '"]').attr('x2', $this.attr('linex')).attr('y2', $this.attr('liney'));
        }
      });
    }
  };
})(window, document);