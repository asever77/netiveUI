'use strict';

//Polyfill
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
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'varructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

//utils module
;(function (win, doc, undefined) {

	'use strict';

	const global = 'netive';

	win[global] = {};

	const Global = win[global];
	const UA = navigator.userAgent.toLowerCase();
	const deviceSize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
	const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];
	//const filter = "win16|win32|win64|mac|macintel";

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//components state 
	Global.callback = {};

	Global.state = {
		device: {
			info: (function() {
				for (let i = 0, len = deviceInfo.length; i < len; i++) {
					if (UA.match(deviceInfo[i]) !== null) {
						return deviceInfo[i];
					}
				}
			})(),
			width: window.innerWidth,
			height: window.innerHeight,
			breakpoint: null,
			colClass: null,
			ios: (/ip(ad|hone|od)/i).test(UA),
			android: (/android/i).test(UA),
			app: UA.indexOf('appname') > -1 ? true : false,
			touch: null,
			mobile: null,
			os: (navigator.appVersion).match(/(mac|win|linux)/i)
		},
		browser: {
			ie: UA.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			local: (/^http:\/\//).test(location.href),
			firefox: (/firefox/i).test(UA),
			webkit: (/applewebkit/i).test(UA),
			chrome: (/chrome/i).test(UA),
			opera: (/opera/i).test(UA),
			safari: (/applewebkit/i).test(UA) && !(/chrome/i).test(UA),	
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
		pageName: function() {
			const page = document.URL.substring(document.URL.lastIndexOf("/") + 1);
			const pagename = page.split('?');

			return pagename[0]
		},
		breakPoint: [600, 905],
		effect: { //http://cubic-bezier.com - css easing effect
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
	}
	
	Global.parts = {
		//resize state
		resizeState: function() {
			let timerWin;

			const act = function() {
				const browser = Global.state.browser;
				const device = Global.state.device;

				device.width = window.innerWidth;
				device.height = window.innerHeight;

				device.touch = device.ios || device.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
				device.mobile = device.touch && (device.ios || device.android);
				device.os = device.os ? device.os[0] : '';
				device.os = device.os.toLowerCase();

				device.breakpoint = device.width >= deviceSize[5] ? true : false;
				device.colClass = device.width >= deviceSize[5] ? 'col-12' : device.width > deviceSize[8] ? 'col-8' : 'col-4';

				if (browser.ie) {
					browser.ie = browser.ie = parseInt( browser.ie[1] || browser.ie[2] );
					( 11 > browser.ie ) ? support.pointerevents = false : '';
					( 9 > browser.ie ) ? support.svgimage = false : '';
				} else {
					browser.ie = false;
				}

				const clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
				const clsMobileSystem = device.ios ? "ios" : device.android ? "android" : 'etc';
				const clsMobile = device.mobile ? device.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
				const el_html = doc.querySelector('html');

				el_html.classList.remove('col-12', 'col-8', 'col-4');
				el_html.classList.add(device.colClass, clsBrowser, clsMobileSystem, clsMobile);
			
				const w = window.innerWidth;

				clearTimeout(timerWin);
				timerWin = setTimeout(function(){
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
				},200);
			}
			win.addEventListener('resize', act);
			act();
		},

		/**
		* append html : 지정된 영역 안에 마지막에 요소 추가하기
		* @param {object} el target element
		* @param {string} str 지정된 영역에 들어갈 값
		* @param {string} htmltag HTML tag element
		*/
		appendHtml: function(el, str, htmltag) {
			const _htmltag = !!htmltag ? htmltag : 'div';
			const div = doc.createElement(_htmltag);

			div.innerHTML = str;

			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
		},

		/**
		* delete parent tag : 지정된 요소의 부모태그 삭제
		* @param {object} child target element
		*/
		deleteParent: function(child) {
			const parent = child.parentNode;

			parent.parentNode.removeChild(parent);
		},

		/**
		* wrap tag : 지정된 요소의 tag 감싸기
		* @param {object} child target element
		*/
		wrapTag: function(front, selector, back) {
			const org_html = selector.innerHTML;
			const new_html = front + org_html + back;

			selector.innerHTML = '';
 			selector.insertAdjacentHTML('beforeend', new_html) ;
		},

		//숫자 세자리수마다 ',' 붙이기
		comma: function(n) {
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},

		//숫자 한자리수 일때 0 앞에 붙이기
		add0: function(x) {
			return Number(x) < 10 ? '0' + x : x;
		},

		//주소의 파라미터 값 가져오기
		para: function(paraname) {
			const tempUrl = win.location.search.substring(1);
			const tempArray = tempUrl.split('&');
			const tempArray_len = tempArray.length;
			let keyValue;
	
			for (var i = 0, len = tempArray_len; i < len; i++) {
				keyValue = tempArray[i].split('=');
	
				if (keyValue[0] === paraname) {
					return keyValue[1];
				}
			}
		},

		//기본 선택자 설정
		selectorType: function(v) {
			let base = document.querySelector('body');

			if (v !== null) {
				if (typeof v === 'string') {
					base = document.querySelector(v);
				} else {
					base = v;
				} 
			}

			return base;
		},

		RAF: function(start, end, startTime, duration){
			const _start = start;
			const _end = end;
			const _duration = duration ? duration : 300;
			const unit = (_end - _start) / _duration;
			const endTime = startTime + _duration;

			let now = new Date().getTime();
			let passed = now - startTime;

			if (now <= endTime) {
				Global.parts.RAF.time = _start + (unit * passed);
				requestAnimationFrame(scrollTo);
			} else {
				!!callback && callback();
				console.log('End off.')
			}
		},

		getIndex: function (ele) {
			let _i = 0;

			while((ele = ele.previousSibling) != null ) {
				_i++;
			}

			return _i;
		},
		toggleSlide: function(opt) {
			const el = opt.el;
			const state = opt.state;
			let n;

			if (state === 'toggle') {
				(0 === el.offsetHeight) ? show() : hide();
			} else {
				(state === 'show') ? show() : hide();
			}

			function show(){
				el.setAttribute('aria-hidden', false);
				el.style.height = "auto";
				n = el.offsetHeight;
				el.style.height = 0;
				void el.offsetHeight;
				el.style.height = `${n}px`;
			}
			function hide(){
				el.setAttribute('aria-hidden', true);
				el.style.height = 0;
			}
		}
	}
	Global.parts.resizeState();

	Global.loading = {
		timerShow : {},
		timerHide : {},
		options : {
			selector: null,
			message : null,
			styleClass : 'orbit' //time
		},
		show : function(option){
			const opt = Object.assign({}, this.options, option);
			const {selector, styleClass, message} = opt;
			const el = (selector !== null) ? selector : doc.querySelector('body');
			const el_loadingHides = doc.querySelectorAll('.ui-loading:not(.visible)');

			for (let that of el_loadingHides) {
				that.remove();
			}

			let htmlLoading = '';

			(selector === null) ?
				htmlLoading += '<div class="ui-loading '+ styleClass +'">':
				htmlLoading += '<div class="ui-loading type-area '+ styleClass +'">';
			htmlLoading += '<div class="ui-loading-wrap">';

			(message !== null) ?
				htmlLoading += '<strong class="ui-loading-message"><span>'+ message +'</span></strong>':
				htmlLoading += '';

			htmlLoading += '</div>';
			htmlLoading += '</div>';

			clearTimeout(this.timerShow);
			clearTimeout(this.timerHide);
			this.timerShow = setTimeout(showLoading, 300);
			
			function showLoading(){
				!el.querySelector('.ui-loading') && el.insertAdjacentHTML('beforeend', htmlLoading);
				htmlLoading = null;		

				const el_loadings = doc.querySelectorAll('.ui-loading');

				for (let that of el_loadings) {
					that.classList.add('visible');
					that.classList.remove('close');
				}
			}
		},
		hide: function(){
			clearTimeout(this.timerShow);
			this.timerHide = setTimeout(function(){
				const el_loadings = doc.querySelectorAll('.ui-loading');

				for (let that of el_loadings) {
					that.classList.add('close');
					setTimeout(function(){
						that.classList.remove('visible')
						that.remove();
					},300);
				}
			},300);
		}
	}

	Global.ajax = {
		options : {
			page: true,
			add: false,
			prepend: false,
			effect: false,
			loading:false,
			callback: false,
			errorCallback: false,
			type: 'GET',
			cache: false,
			async: true,
			contType: 'application/x-www-form-urlencoded',
			dataType: 'html'
		},
		init : function(option){
			if (option === undefined) {
				return false;
			}

			const xhr = new XMLHttpRequest();	
			const opt = Object.assign({}, this.options, option);
			const {area, loading, effect, type, url, page, add, prepend, mimeType, contType} = opt;
			const callback = opt.callback || false;
			const errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;
	
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
						if (add){
							prepend ? 
								area.insertAdjacentHTML('afterbegin', xhr.responseText) : 
								area.insertAdjacentHTML('beforeend', xhr.responseText);
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
	}

	/**
	 * intersection observer
	 */
	Global.io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.intersectionRatio > 0) {
				entry.target.classList.add('tada');
			} else {
				entry.target.classList.remove('tada');
			}
		});
	});

	Global.scroll = {
		options : {
			selector: document.querySelector('html, body'),
			focus: false,
			top: 0,
			left:0,
			add: 0,
			align: 'default',
			effect:'smooth', //'auto'
			callback: false,	
		},
		init: function(){
			const el_areas = document.querySelectorAll('.ui-scrollmove-btn[data-area]');

			for (let el_this of el_areas) {
				el_this.removeEventListener('click', this.act);
				el_this.addEventListener('click', this.act);
			}
		},
		act: function(e){
			const that = e.currentTarget;
			const area = that.dataset.area;
			const name = that.dataset.name;
			const add = that.dataset.add === undefined ? 0 : that.dataset.add;
			const align = that.dataset.align === undefined ? 'default' : that.dataset.align;
			const callback = that.dataset.callback === undefined ? false : that.dataset.callback;

			const el_area = doc.querySelector('.ui-scrollmove[data-area="'+ area +'"]');
			const el_item = el_area.querySelector('.ui-scrollmove-item[data-name="'+ name +'"]');
			
			let top = (el_area.getBoundingClientRect().top - el_item.getBoundingClientRect().top) - el_area.scrollTop;
			let left = (el_area.getBoundingClientRect().left - el_item.getBoundingClientRect().left) - el_area.scrollLeft;

			if (align === 'center') {
				top = top - (el_item.offsetHeight / 2);
				left = left - (el_item.offsetWidth / 2);
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
		move : function(option){
			const opt = Object.assign({}, this.options, option);
			const {top, left, callback, align, add, focus, effect} = opt;
			let selector = opt.selector;

			//jquery selector인 경우 변환
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
						top: Math.abs(top) - (selector.offsetHeight / 2) + add,
						left: Math.abs(left) - (selector.offsetWidth / 2) + add,
						behavior: effect
					});
					break;
			}

			this.checkEnd({
				selector : selector,
				nowTop : selector.scrollTop, 
				nowLeft : selector.scrollLeft,
				align : align,
				callback : callback,
				focus : focus
			});
		},
		checkEndTimer : {},
		checkEnd: function(opt){
			const el_selector = opt.selector;
			const {align, focus, callback} = opt;
			
			let nowTop = opt.nowTop;
			let nowLeft = opt.nowLeft;

			Global.scroll.checkEndTimer = setTimeout(function(){
				//스크롤 현재 진행 여부 판단
				if (nowTop === el_selector.scrollTop && nowLeft === el_selector.scrollLeft) {
					clearTimeout(Global.scroll.checkEndTimer);
					//포커스가 위치할 엘리먼트를 지정하였다면 실행
 					if (!!focus ) {
						focus.setAttribute('tabindex', 0);
						focus.focus();
					}
					//스크롤 이동후 콜백함수 실행
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
			},100);
		},

		optionsParllax: {
			selector : null,
			area : null
		},
		parallax: function(option) {
			const opt = Object.assign({}, this.optionsParllax, option);
			const el_area = opt.area ?? window;
			const el_parallax = opt.selector ?? doc.querySelector('.ui-parallax');
			const el_wraps = el_parallax.querySelectorAll(':scope > .ui-parallax-wrap');

			act();
			el_area.addEventListener('scroll', act);

			function act() {
				const isWin = el_area === window;
				const areaH = isWin ? window.innerHeight : el_area.offsetHeight;
				const areaT = isWin ? Math.floor(window.scrollY) : Math.floor(el_area.scrollTop);
				const baseT = Math.floor(el_wraps[0].getBoundingClientRect().top);
				
				for (let el_wrap of el_wraps) {
					const el_items = el_wrap.querySelectorAll('.ui-parallax-item');
					const attrStart = el_wrap.dataset.start === undefined ? 0 : el_wrap.dataset.start;
					const attrEnd = el_wrap.dataset.end === undefined ? 0 : el_wrap.dataset.end;
					const h = Math.floor(el_wrap.offsetHeight);
					let start = Math.floor(el_wrap.getBoundingClientRect().top);
					let end = h + start;
					const s = areaH * Number(attrStart) / 100;
					const e = areaH * Number(attrEnd) / 100;

					if (opt.area !== 'window') {
						start = (start + areaT) - (baseT + areaT);
						end = (end + areaT) - (baseT + areaT);
					}

					(areaT >= start - s) ? 
						el_wrap.classList.add('parallax-s') : 
						el_wrap.classList.remove('parallax-s');
					(areaT >= end - e) ? 
						el_wrap.classList.add('parallax-e') : 
						el_wrap.classList.remove('parallax-e');

					for (let el_item of el_items) {
						const n = ((areaT - (start - s)) * 0.003).toFixed(2);
						const callbackname = el_item.dataset.act;

						//n = n < 0 ? 0 : n > 1 ? 1 : n;

						if (!!Global.callback[callbackname]) {
							Global.callback[callbackname]({
								el: el_item, 
								n: n
							});
						}

						el_item.setAttribute('data-parallax', n);
					}
				}
			}
		}
	}

	Global.para = {
		get: function(paraname){
			const _tempUrl = win.location.search.substring(1);
			const _tempArray = _tempUrl.split('&');
			let _keyValue;

			for (let i = 0, len = _tempArray.length; i < len; i++) {
				_keyValue = _tempArray[i].split('=');

				if (_keyValue[0] === paraname) {
					return _keyValue[1];
				}
			}
		}
	}

	Global.focus = {
		options: {
			callback: false
		},
		loop : function(option){
			if (option === undefined) {
				return false;
			}
			const opt = Object.assign({}, Global.focus.options, option);
			const el = opt.selector;
			const callback = opt.callback;
			// var $focusItem = $base.find('input, h1, h2, h3, a, button, label, textarea, select').eq(0);

			// $focusItem.attr('tabindex', 0).focus();

			if(!el.querySelector('[class*="ui-focusloop-"]')) {
				el.insertAdjacentHTML('afterbegin', '<div tabindex="0" class="ui-focusloop-start"><span>시작지점입니다.</span></div>');
				el.insertAdjacentHTML('beforeend', '<div tabindex="0" class="ui-focusloop-end"><span>마지막지점입니다.</span></div>');
			}

			const el_start = el.querySelector('.ui-focusloop-start');
			const el_end = el.querySelector('.ui-focusloop-end');
		
			el_start.addEventListener('keydown', keyStart);
			el_end.addEventListener('keydown', keyEnd);

			function keyStart(e) {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					el_end.focus();
					// !!callback && callback();
				}
			}

			function keyEnd(e) {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					el_start.focus();
					// !!callback && callback();
				}
			}
		}
	}

	class ScrollBar {
		//객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화
		constructor(idName) {
			this.id = idName;
			this.callback = function(){
				console.log(`${idName} 커스텀 스크롤 준비완료`);
			};
			this.infiniteCallback = false;
		}

		//메서드 사이엔 쉼표가 없습니다.
		init(option) {
			const opt = Object.assign({}, this, option);
			const id = opt.id;
			const callback = opt.callback;
			const infiniteCallback = opt.infiniteCallback;
			const el_scrollbar = doc.querySelector('[data-scroll-id="' + id +'"]');

			let timer;
			let prevHeightPercent = 0;
			let scrollDirection = 'keep';

			//+reset
			if (el_scrollbar.dataset.ready === 'yes') {
				console.log(111111111);
				return false;
			}

			el_scrollbar.classList.remove('ready');
			el_scrollbar.dataset.ready = 'no';
			el_scrollbar.dataset.direction = scrollDirection;
			
			const wrapW = el_scrollbar.offsetWidth;
			const wrapH = el_scrollbar.offsetHeight;

			Global.parts.wrapTag('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap">', el_scrollbar ,'</div></div>');

			//++make
			const el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
			const el_itemWrap = el_item.querySelector('.ui-scrollbar-wrap');
			const _display = window.getComputedStyle(el_scrollbar).display;
			const _padding = window.getComputedStyle(el_scrollbar).padding;

			el_itemWrap.style.display = _display;
			el_itemWrap.style.padding = _padding;

			if (_display === 'inline-block') {
				el_itemWrap.style.display = 'block';
			}

			el_itemWrap.style.width = '100%';
			el_item.style.width = '100%';

			el_scrollbar.style.overflow = 'hidden';

			const itemW = el_item.scrollWidth;
			const itemH = el_item.scrollHeight;

			el_scrollbar.dataset.itemH = itemH;
			el_scrollbar.dataset.itemW = itemW;
			el_scrollbar.dataset.wrapH = wrapH;
			el_scrollbar.dataset.wrapW = wrapW;
			
			if (el_scrollbar.dataset.ready === 'no') {
				el_scrollbar.dataset.ready = 'yes';
				el_scrollbar.classList.add('ready');
				el_item.setAttribute('tabindex', 0);
				el_scrollbar.style.height = wrapH + 'px';

				const html_barwrap = doc.createElement('div');
				const html_barwrapX = doc.createElement('div');
				const html_button = doc.createElement('button');
				const html_buttonX = doc.createElement('button');

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

				(wrapH < itemH) ? 
					el_scrollbar.classList.add('view-y') : 
					el_scrollbar.classList.remove('view-y');

				(wrapW < itemW) ? 
					el_scrollbar.classList.add('view-x') : 
					el_scrollbar.classList.remove('view-x');

				const barH = Math.floor(wrapH / (itemH / 100));
				const barW = Math.floor(wrapW / (itemW / 100));
				const el_barY = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				const el_barX = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
				
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

			function scrollbarUpdate(el_scrollbar, wrapH, wrapW, itemH, itemW){
				const _el_scrollbar = el_scrollbar;
				const	el_item = _el_scrollbar.querySelector('.ui-scrollbar-item');
				
				if (!el_item) {
					return false;
				}

				const nWrapH = _el_scrollbar.offsetHeight;
				const nWrapW = _el_scrollbar.offsetWidth;
				const nItemH = el_item.scrollHeight;
				const nItemW = el_item.scrollWidth;
				const changeH = (itemH !== nItemH || wrapH !== nWrapH);
				const changeW = (itemW !== nItemW || wrapW !== nWrapW);

				//resizing
				if (changeH || changeW) {
					const barH = Math.floor(nWrapH / (nItemH / 100));
					const barW = Math.floor(nWrapW / (nItemW / 100));
					const el_barY = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
					const el_barX = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

					if (changeH) {
						el_barY.style.height = barH + '%';
						el_barY.dataset.height = barH;
					} 
					if (changeW) {
						el_barX.style.width = barW + '%';
						el_barX.dataset.width = barW;
					}
					
					(nWrapH < nItemH) ? _el_scrollbar.classList.add('view-y') : _el_scrollbar.classList.remove('view-y');
					(nWrapW < nItemW) ? _el_scrollbar.classList.add('view-x') : _el_scrollbar.classList.remove('view-x');

					el_scrollbar.dataset.itemH = nItemH;
					el_scrollbar.dataset.itemW = nItemW;
					el_scrollbar.dataset.wrapH = nWrapH;
					el_scrollbar.dataset.wrapW = nWrapW;
				}

				setTimeout(function(){
					scrollbarUpdate(el_scrollbar, nWrapH, nWrapW, nItemH, nItemW);
				}, 300);
			}

			function eventFn(v){
				const _el_scrollbar = el_scrollbar;
				const el_item = _el_scrollbar.querySelector('.ui-scrollbar-item');
				const el_bar = _el_scrollbar.querySelectorAll('.ui-scrollbar-bar');

				el_item.addEventListener('scroll', scrollEvent);

				for (let bar of el_bar) {
					bar.addEventListener('mousedown', dragMoveAct);
				}
			}	
			
			function scrollEvent(event, el_item){
				const _el_item = !!event ? event.target : el_item;
				const el_scrollbar = _el_item.closest('.ui-scrollbar');
				const itemH = Number(el_scrollbar.dataset.itemH);
				const itemW = Number(el_scrollbar.dataset.itemW);
				const wrapH = Number(el_scrollbar.dataset.wrapH);
				const wrapW = Number(el_scrollbar.dataset.wrapW);

				//el_scrollbar.dataset 값이 없을 경우 4개의 값중 하나라도 없으면 중단
				if (wrapW === undefined) {
					return false;
				}

				const el_barY = el_scrollbar.querySelector('.type-y .ui-scrollbar-bar');
				const el_barX = el_scrollbar.querySelector('.type-x .ui-scrollbar-bar');
				const scrT = _el_item.scrollTop;
				const scrL = _el_item.scrollLeft;
				const barH = Number(el_barY.dataset.height);
				const barW = Number(el_barX.dataset.width);
				const hPer = Math.round(scrT / (itemH - wrapH) * 100);
				const wPer = Math.round(scrL / (itemW - wrapW) * 100);
				const _hPer = (barH / 100) * hPer;
				const _wPer = (barW / 100) * wPer;
				
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
					timer = setTimeout(() => {
						!!infiniteCallback && infiniteCallback();
					},200);
				}
			}
			
			function dragMoveAct(event) {
				const body = doc.querySelector('body');
				const el_bar = event.target;
				const el_scrollbar = el_bar.closest('.ui-scrollbar');
				const el_barWrap = el_bar.closest('.ui-scrollbar-barwrap');
				const el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
				const itemH = Number(el_scrollbar.dataset.itemH);
				const itemW = Number(el_scrollbar.dataset.itemW);
				const el_barWrapRect = el_barWrap.getBoundingClientRect();
				const off_t = el_barWrapRect.top + doc.documentElement.scrollTop;
				const off_l = el_barWrapRect.left + doc.documentElement.scrollLeft;
				const w_h = el_barWrapRect.height;
				const w_w = el_barWrapRect.width;
				const barH = el_bar.getAttribute('data-height');
				const barW = el_bar.getAttribute('data-width');
				const isXY = el_bar.getAttribute('data-scrollxy');

				body.classList.add('scrollbar-move');

				doc.addEventListener('mousemove', mousemoveAct);
				doc.addEventListener('mouseup', mouseupAct);

				function mousemoveAct(event){
					let y_m; 
					let x_m;
					
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

					let yR = y_m - off_t;
					let xR = x_m - off_l;

					yR = yR < 0 ? 0 : yR;
					yR = yR > w_h ? w_h : yR;
					xR = xR < 0 ? 0 : xR;
					xR = xR > w_w ? w_w : xR;

					const yRPer = yR / w_h * 100;
					const xRPer = xR / w_w * 100;
					const nPerY = (yRPer - (barH / 100 * yRPer)).toFixed(2);
					const nPerX = (xRPer - (barW / 100 * xRPer)).toFixed(2);

					if (isXY === 'y') {
						el_bar.style.top = nPerY + '%';
						el_item.scrollTop = itemH * nPerY / 100;
					} else {
						el_bar.style.left = nPerX + '%';
						el_item.scrollLeft = itemW * nPerX / 100;
					}
				}
				function mouseupAct(){
					body.classList.remove('scrollbar-move');
					doc.removeEventListener('mousemove', mousemoveAct);
					doc.removeEventListener('mouseup', mouseupAct);
				}
			}
		}

		destroy() {
			const el_scrollbar = doc.querySelector('[data-scroll-id="' + this.id +'"]');
			const el_barwrap = el_scrollbar.querySelectorAll('.ui-scrollbar-barwrap');
			const el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
			const el_wrap = el_item.querySelector('.ui-scrollbar-wrap');
			const wrapHtml = el_wrap.innerHTML;

			el_scrollbar.dataset.ready = 'no';
			el_scrollbar.classList.remove('ready');
			el_scrollbar.classList.remove('view-y');
			el_scrollbar.classList.remove('view-x');
			el_scrollbar.classList.remove('view-scrollbar');
			el_scrollbar.style.overflow = 'auto';
			//el_scrollbar.removeAttribute('style');
			el_barwrap.forEach((userItem) => {
				el_scrollbar.removeChild(userItem);
			});
			el_scrollbar.removeChild(el_item);
			el_scrollbar.innerHTML = wrapHtml;
		}

		reset(opt) {
			console.log(this);
			Global.uiScrollBar[this.id].destroy();
			Global.uiScrollBar[this.id].init({
				infiniteCallback: opt.infiniteCallback
			});

		}
	}
	//uiScrollBar 실행함수 생성
	Global.scrollBar = (opt) => {
		let scrollBar = doc.querySelectorAll('.ui-scrollbar');

		if (opt !== undefined && opt.selector !== undefined){ 
			scrollBar = opt.selector;
		}
		
		if (sessionStorage.getItem('scrollbarID') === null) {
			sessionStorage.setItem('scrollbarID', 0);
		}

		if (scrollBar.length === undefined) {
			let scrollId = scrollBar.getAttribute('data-scroll-id');
	
			if (!scrollId) {
				let idN = JSON.parse(sessionStorage.getItem('scrollbarID'));
					
				idN = idN + 1;
				sessionStorage.setItem('scrollbarID', idN);
				scrollId = 'item' + idN;
				scrollBar.dataset.scrollId = scrollId;
			} 

			Global.scrollBar[scrollId] = new ScrollBar(scrollId);

			setTimeout(function(){
				Global.scrollBar[scrollId].init();
			},0);
		} else {
			for (let that of scrollBar) {
				let scrollId = that.getAttribute('data-scroll-id');

				if (that.dataset.ready !== 'yes') {
					if (!scrollId) {
						let idN = JSON.parse(sessionStorage.getItem('scrollbarID'));
							
						idN = idN + 1;
						sessionStorage.setItem('scrollbarID', idN);
						scrollId = 'item' + idN;
						that.dataset.scrollId = scrollId;
					} 
		
					Global.scrollBar[scrollId] = new ScrollBar(scrollId);
		
					setTimeout(function(){
						Global.scrollBar[scrollId].init();
					},0);
				}
			}
		}
	}

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
		open: function(option){
			const opt = Object.assign({}, this.options, option);
			const {name,width,height,align,toolbar,location,menubar,status,resizable,scrollbars,link} = opt;
			let {top,left} = opt;

			if (align === 'center') {
				left = (win.innerWidth / 2) - (width / 2);
				top = (win.innerHeight / 2) - (height / 2);
			}

			const specs = 'width=' + width + ', height='+ height + ', left=' + left + ', top=' + top + ', toolbar=' + toolbar + ', location=' + location + ', resizable=' + resizable + ', status=' + status + ', menubar=' + menubar + ', scrollbars=' + scrollbars;
			
			win.open(link, name , specs);
		}
	}

	Global.cookie = {
		set: function(opt){
			const {name, value, term, path, domain} = opt;
			let cookieset = name + '=' + value + ';';
			let expdate;

			if (term) {
				expdate = new Date();
				expdate.setTime( expdate.getTime() + term * 1000 * 60 * 60 * 24 ); // term 1 is a day
				cookieset += 'expires=' + expdate.toGMTString() + ';';
			}
			(path) ? cookieset += 'path=' + path + ';' : '';
			(domain) ? cookieset += 'domain=' + domain + ';' : '';

			document.cookie = cookieset;
		},
		get: function(name){
			const match = ( document.cookie || ' ' ).match( new RegExp(name + ' *= *([^;]+)') );

			return (match) ? match[1] : null;
		},
		del: function(name){
			const expireDate = new Date();

			expireDate.setDate(expireDate.getDate() + -1);
			this.set({ 
				name: name, 
				term: '-1' 
			});
		}
	}

	Global.table = {
		sort: function(opt){
			let table = doc.querySelector('#' + opt.id);
			let switchcount = 0;
			let switching = true;
			let dir = "asc";
			let rows, o, x, y, shouldSwitch;

			

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
				} else if(dir === 'desc') {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}

			if (shouldSwitch) {
				rows[o].parentNode.insertBefore(rows[o + 1], rows[o]);
				switching = true;
				switchcount ++;
			} else {
				if (switchcount === 0 && dir === 'asc') {
					dir = 'desc';
					switching = true;
				}
			}
		},
		caption: function(){
			const el_captions = doc.querySelectorAll('.ui-caption');

			for (let that of el_captions) {
				that.textContent = '';
			
				const el_table = that.closest('table');
				const ths = el_table.querySelectorAll('th');
				let captionTxt = '';

				for (let that of ths) {
					const txt = that.textContent;
					
					(captionTxt !== '') ?
						captionTxt += ', ' + txt:
						captionTxt += txt;
				}

				that.textContent = captionTxt + ' 정보입니다.';
			}
		},
		scrollOption: {
			callback:false
		},
		scroll: function(option){
			const opt = Object.assign({}, this.scrollOption, option);
			const callback = opt.callback;
			const el_wraps = doc.querySelectorAll('.ui-tablescroll');

			for (let that of el_wraps) {
				const el_tblWrap = that.querySelector('.ui-tablescroll-wrap');
				const el_tbl = el_tblWrap.querySelector('table');
				const cloneTable = el_tbl.cloneNode(true);

				if (!el_tbl.querySelector('.ui-tablescroll-clone')) {
					that.prepend(cloneTable);

					const clone_tbl = that.querySelector(':scope > table:first-child');
					const clone_ths = clone_tbl.querySelectorAll('th');
					const clone_caption = clone_tbl.querySelector('caption');
					const clone_tbodys = clone_tbl.querySelectorAll('tbody');

					clone_caption.remove();

					for (let that of clone_tbodys) {
						that.remove();
					}

					clone_tbl.classList.add('ui-tablescroll-clone');
					clone_tbl.setAttribute('aria-hidden', true);

					for (let that of clone_ths) {
						that.setAttribute('aria-hidden', true);
					}
				}
			}

			!!callback && callback();
		},
		fixTd : function() {
			const el_tbls = doc.querySelectorAll('.ui-fixtd');
			
			for (let that of el_tbls) {
				const el_tblCols = that.querySelectorAll('col');
				const el_tblTrs = that.querySelectorAll('tr');

				const fix_n = Number(that.dataset.fix);
				const view_n = Number(that.dataset.view);
				const col_len = el_tblCols.length;
				const fix_sum = col_len - fix_n;
				const len = el_tblTrs.length;
				let tit = [];
	
				that.setAttribute('data-current', 1)
				that.setAttribute('data-total', col_len);
	
				for (let i = 0; i < len; i++) {
					for (let j = 0; j < fix_sum; j++) {
						const tr = el_tblTrs[i];
						const thead = tr.closest('thead');
						const tds = tr.querySelectorAll(':scope > *');
						const td = tds[j + fix_sum - 1];
						const jj = (j + 1);
						
						el_tblCols[j + fix_sum - 1].classList.add('ui-fixtd-n' + jj);
						td.classList.add('ui-fixtd-n' + jj);
						td.dataset.n = j;

						if (!!thead) {
							tit.push(td.textContent);
							td.insertAdjacentHTML('beforeend', '<button type="button" class="ui-fixtd-btn prev" data-btn="prev" data-idx="'+ jj +'"><span class="a11y-hidden">previous</span></button>');
							td.insertAdjacentHTML('afterbegin', '<button type="button" class="ui-fixtd-btn next" data-btn="next" data-idx="'+ jj +'"><span class="a11y-hidden">next</span></button>');
						}
					}
				}

				const el_btns = that.querySelectorAll('.ui-fixtd-btn');

				for (let that of el_btns) {
					that.addEventListener('click', act);
				}
			}

			function act(e){
				const btn = e.currentTarget;
				const el_table = btn.closest('.ui-fixtd');
				const this_sum = Number(el_table.dataset.total - el_table.dataset.fix);
				let n = Number(el_table.dataset.current);
				
				(btn.dataset.btn === 'next') ? 
					el_table.dataset.current = (n + 1 > this_sum) ? n = 1 : n + 1:
					el_table.dataset.current = (n - 1 <= 0) ? n = this_sum : n - 1;
			}
		}
	}

	Global.form = {
		init: function(opt){
			const el_inps = doc.querySelectorAll('.inp-base');

			for (let that of el_inps) {
				const el_wrap = that.parentNode;
				const el_form = that.closest('[class*="ui-form"]');
				const unit = that.dataset.unit;
				const prefix = that.dataset.prefix;
				const el_label = el_form.querySelector('.form-item-label');
				let el_unit = el_wrap.querySelector('.unit');
				let el_prefix = el_wrap.querySelector('.prefix');
				let space = 0;

				that.removeAttribute('style');
				el_unit && el_unit.remove();
				el_prefix && el_prefix.remove();

				const pdr = parseFloat(doc.defaultView.getComputedStyle(that).getPropertyValue('padding-right'));
				const pdl = parseFloat(doc.defaultView.getComputedStyle(that).getPropertyValue('padding-left'));

				if (unit !== undefined) {
					el_wrap.insertAdjacentHTML('beforeend', '<div class="unit">'+unit+'</div>');
					el_unit = el_wrap.querySelector('.unit');
					space = Math.floor(el_unit.offsetWidth) + (pdr / 2) ;
				}

				that.style.paddingRight = Number(space + pdr);;
				that.dataset.pdr = space + pdr;
				that.setAttribute('pdr', space + pdr);
				space = 0;
				
				if (prefix !== undefined) {					
					el_wrap.insertAdjacentHTML('afterbegin', '<div class="prefix">'+prefix+'</div>');
					el_prefix = el_wrap.querySelector('.prefix');
					space = Math.floor(el_prefix.offsetWidth) + pdl;
					that.style.paddingLeft = (space + pdl) + 'px';
					that.dataset.pdl = space + pdl;
					el_label.style.marginLeft = space + 'px';
				}

				this.isValue(that, false);
				that.style.paddingLeft = space + pdl;
				that.dataset.pdl = space + pdl;

				const select_btns = doc.querySelectorAll('.ui-select-btn');
				const datepicker_btns = doc.querySelectorAll('.ui-datepicker-btn');

				for (let btn of select_btns) {
					btn.removeEventListener('click', this.actValue);
					btn.addEventListener('click', this.actValue);
				}

				for (let btn of datepicker_btns) {
					btn.removeEventListener('click', this.actValue);
					btn.addEventListener('click', this.actValue);
					btn.addEventListener('click', this.actDaterpicker);
				}

				that.removeEventListener('keyup', this.actValue);
				that.removeEventListener('focus', this.actValue);
				that.removeEventListener('blur', this.actUnValue);

				that.addEventListener('keyup', this.actValue);
				that.addEventListener('focus', this.actValue);
				that.addEventListener('blur', this.actUnValue);
			}
		},
		actDaterpicker: function(e){
			e.preventDefault();

			const that = e.currentTarget;
			const el_datepicker = that.closest('.ui-datepicker');
			const el_inp = el_datepicker.querySelector('.inp-base');

			Global.sheets.bottom({
				id: el_inp.id,
				callback: function(){
					Global.datepicker.init({
						id: el_inp.id,
						date: el_inp.value,
						min: el_inp.min,
						max: el_inp.max,
						title: el_inp.title,
						period: el_inp.dataset.period,
						callback: function(){
							console.log('callback init')
						}
					});
				}
			});

		},
		actValue: function (e){
			const that = e.currentTarget;
			
			Global.form.isValue(that, true);
		},
		actUnValue: function (e){
			const inp = e.currentTarget;
			const wrap = inp.parentNode;
			const el_clear = wrap.querySelector('.ui-clear');
			const pdr = Number(inp.dataset.pdr);

			Global.form.isValue(inp, false);

			setTimeout(function(){
				inp.style.paddingRight = pdr + 'px'; 
				el_clear && el_clear.remove();
			},100);
		},
		isValue: function (inp, value){
			const el_inp = inp;
			const el_wrap = el_inp.parentNode;
			const el_inner = el_inp.closest('.ui-form-inner');
			//const el_inp = el_wrap.querySelector('.inp-base');

			let el_clear = el_wrap.querySelector('.ui-clear');
			let pdr = Number(el_inp.dataset.pdr);
			
			if (!!el_inner) {
				if (value) {
					el_inner.classList.add('is-value');
				} else {
					(!!el_inp.value) ? 
						el_inner.classList.add('is-value'):
						el_inner.classList.remove('is-value');
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
						el_wrap.insertAdjacentHTML('beforeend', '<button type="button" class="ui-clear btn-clear" tabindex="-1" aria-hidden="true"  style="margin-right:'+ pdr +'px"><span class="a11y-hidden">내용지우기</span></button>');

						el_clear = el_wrap.querySelector('.ui-clear');
						el_clear.addEventListener('click', this.actClear);

						el_inp.style.paddingRight = pdr + el_clear.offsetWidth + 'px'; 
					} else {
						el_inp.style.paddingRight = pdr + 'px'; 
					}
				} 
			}
		},
		actClear: function(e){
			const that = e.currentTarget;
			const el_wrap = that.parentNode;
			const el_inp = el_wrap.querySelector('.inp-base');
			const pdr = Number(el_inp.dataset.pdr);

			el_inp.style.paddingRight = pdr + 'px'
			el_inp.value = '';
			el_inp.focus();
			that.remove();
		},
		fileUpload: function() {
			const el_files = document.querySelectorAll('.ui-file-inp');
			const fileTypes = [
				"image/apng",
				"image/bmp",
				"image/gif",
				"image/jpeg",
				"image/pjpeg",
				"image/png",
				"image/svg+xml",
				"image/tiff",
				"image/webp",
				"image/x-icon"
			];

			for (let el_file of el_files) {
				if (!el_file.dataset.ready) {
					el_file.addEventListener('change', updateImageDisplay);
					el_file.dataset.ready = true;
				}
			}
			
			function updateImageDisplay(e) {
				const el_file = e.currentTarget;
				const id = el_file.id;
				const preview = document.querySelector('.ui-file-list[data-id="'+ id +'"]');

				while(preview.firstChild) {
					preview.removeChild(preview.firstChild);
				}

				const curFiles = el_file.files;

				if(curFiles.length === 0) {
					const para = document.createElement('p');
					para.textContent = 'No files currently selected for upload';
					preview.appendChild(para);
				} else {
					const list = document.createElement('ul');
					const title = document.createElement('h4');
					const delbutton = document.createElement('button');

					delbutton.type = 'button';
					delbutton.classList.add('ui-file-del');
					delbutton.dataset.id = id;

					title.textContent = 'File upload list';
					title.classList.add('a11y-hidden');
					preview.classList.add('on');
					preview.appendChild(title);
					preview.appendChild(list);
					preview.appendChild(delbutton);

					const delbuttonSpan = document.createElement('span'); 

					delbuttonSpan.textContent = 'Delete attachment';
					delbuttonSpan.classList.add('a11y-hidden');
					delbutton.appendChild(delbuttonSpan);
				
					for(let file of curFiles) {
						const listItem = document.createElement('li');
						const para = document.createElement('p');

						if(validFileType(file)) {
							para.textContent = `${file.name}, ${returnFileSize(file.size)}.`;
							
							const image = document.createElement('img');
							image.src = URL.createObjectURL(file);
							
							listItem.appendChild(image);
							listItem.appendChild(para);
							
						} else {
							para.textContent = `${file.name}`;
							listItem.appendChild(para);
						}
				
						list.appendChild(listItem);
					}

					delbutton.addEventListener('click', fileDelete);
				}
			}

			function fileDelete(e){
				const id = e.currentTarget.dataset.id;
				const list = document.querySelector('.ui-file-list[data-id="'+ id +'"]');
				const inp = document.querySelector('#'+ id);

				list.classList.remove('on');
				while(list.firstChild) {
					list.removeChild(list.firstChild);
				}
				inp.value = ''; 
			}

			function validFileType(file) {
				return fileTypes.includes(file.type);
			}

			function returnFileSize(number) {
				if(number < 1024) {
					return number + 'bytes';
				} else if(number >= 1024 && number < 1048576) {
					return (number/1024).toFixed(1) + 'KB';
				} else if(number >= 1048576) {
					return (number/1048576).toFixed(1) + 'MB';
				}
			}
		}
		
	}

	Global.rangeSlider = {
		init: function(opt){
			const id = opt.id;
			const el_range = document.querySelector('.ui-range[data-id="'+ id +'"]');
			const el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
			const el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');

			if (el_from && el_to) {
				//range
				Global.rangeSlider.rangeFrom({
					id: id
				});
				Global.rangeSlider.rangeTo({
					id: id
				});
				el_from.addEventListener("input", function(){
					Global.rangeSlider.rangeFrom({
						id: id
					});
				});
				el_to.addEventListener("input", function(){
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
				el_from.addEventListener("input", function(){
					Global.rangeSlider.rangeFrom({
						id: id,
						type: 'single'
					});
				});
			}
		},
		rangeFrom: function(opt){
			const id = opt.id;
			const v = opt.value;
			const el_range = document.querySelector('.ui-range[data-id="'+ id +'"]');
			const el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
			const el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');
			const el_left = el_range.querySelector(".ui-range-btn.left");
			const el_right = el_range.querySelector(".ui-range-btn.right");
			const el_bar = el_range.querySelector(".ui-range-bar");
			const inp_froms = document.querySelectorAll('[data-'+ id +'="from"]');
			let percent;
			let {value, min, max} = el_from;

			if (v) {
				el_from.value = v;
			}

			let from_value = +el_from.value;
			
			if (opt.type !== 'single') {
				if (+el_to.value - from_value < 0) {
					from_value = +el_to.value - 0;
					el_from.value = from_value;
				}

				percent = ((from_value - +min) / (+max - +min)) * 100;

				el_right.classList.remove('on');
				el_to.classList.remove('on');
				el_left.style.left = `${percent}%`;
				el_bar.style.left = `${percent}%`;
			} else {
				if (from_value < 0) {
					from_value = 0;
				}
				percent = ((from_value - +min) / (+max - +min)) * 100;
				el_left.style.left = `${percent}%`;
				el_bar.style.right = `${100 - percent}%`;
			}

			el_left.classList.add('on');
			el_from.classList.add('on');
			
			for (let inp_from of inp_froms) {
				if (inp_from.tagName === 'INPUT') {
					inp_from.value = from_value;
				} else {
					inp_from.textContent = from_value;
				}
			}
		},
		rangeTo: function(opt){
			const id = opt.id;
			const v = opt.value;
			const el_range = document.querySelector('.ui-range[data-id="'+ id +'"]');
			const el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
			const el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');
			const el_left = el_range.querySelector(".ui-range-btn.left");
			const el_right = el_range.querySelector(".ui-range-btn.right");
			const el_bar = el_range.querySelector(".ui-range-bar");
			const inp_tos = document.querySelectorAll('[data-'+ id +'="to"]');
			let {value,min,max} = el_to;

			if (v) {
				el_to.value = v;
			}

			let to_value = +el_to.value;

			if (+value - +el_from.value < 0) {
				to_value = +el_from.value + 0;
				el_to.value = to_value;
			}

			let percent = ((to_value - +min) / (+max - +min)) * 100;

			el_right.classList.add('on');
			el_left.classList.remove('on');
			el_to.classList.add('on');
			el_from.classList.remove('on');
			el_right.style.right = `${100 - percent}%`;
			el_bar.style.right = `${100 - percent}%`;

			for (let inp_to of inp_tos) {
				if (inp_to.tagName === 'INPUT') {
					inp_to.value = el_to.value;
				} else {
					inp_to.textContent = el_to.value;
				}
			}
		}
	}

	Global.datepicker = {
		destroy: function(opt){
			const is_dim = !!doc.querySelector('.sheet-dim');
			const callback = opt === undefined || opt.callback === undefined ? false : opt.callback;
			let el_dp;

			if (is_dim) {
				Global.sheets.dim(false);
			}
			
			if (!opt) {
				el_dp = document.querySelectorAll('.datepicker');

				for (var that of el_dp) {
					that.remove();
				}
			} else {
				el_dp = document.querySelector('.datepicker[data-id="'+ opt.id +'"]');

				el_dp.remove();
			}

			!!callback && callback();
		},
		open: function(id) {
			const base = doc.querySelector('#' + id);

			Global.sheets.bottom({
				id: base.id,
				callback: function(){
					Global.datepicker.init({
						id: base.id,
						date: base.value,
						min: base.min,
						max: base.max,
						title: base.title,
						period: base.dataset.period,
						callback: function(){
							console.log('callback init')
						}
					});
				}
			});
		},
		init: function(opt) {
			const setId = opt.id;
			const currentDate = opt.date;
			let endDate = opt.date;
			const title = opt.title;
			const el_inp = document.querySelector('#' + setId);
			const el_uidp = el_inp.closest('.ui-datepicker');
			const el_start = el_uidp.querySelector('[data-period="start"]');
			const el_end = el_uidp.querySelector('[data-period="end"]');
			const setDate = (opt.date === '' || opt.date === undefined) ? new Date(): opt.date;
			let period = (opt.period === '' || opt.period === undefined) ? false : opt.period;
			const area = (opt.area === '' || opt.area === undefined) ? document.querySelector('body') : opt.area;
			const date = new Date(setDate);
			const _viewYear = date.getFullYear();
			const _viewMonth = date.getMonth();
			let el_dp = document.querySelector('.datepicker[data-id="'+setId+'"]');
			const yyyymm = _viewYear + '-' + Global.parts.add0(_viewMonth + 1);
			const callback = opt === undefined || opt.callback === undefined ? false : opt.callback;
			let _dpHtml = '';
			
			Global.datepicker.destroy();

			if (!!period || !!el_end) {
				period = true;
				endDate = el_end.value;
			}
			if (!el_dp) {
				if (period) {
					_dpHtml += '<section class="datepicker" data-id="'+setId+'" data-date="'+yyyymm+'" data-start="'+currentDate+'" data-end="'+endDate+'" data-period="start">';
				} else {
					_dpHtml += '<section class="datepicker" data-id="'+setId+'" data-date="'+yyyymm+'" data-start="'+currentDate+'">';
				}
				
				_dpHtml += '<div class="datepicker-wrap">';

				_dpHtml += '<div class="datepicker-header">';
				_dpHtml += '<h3 class="datepicker-title">'+title+'</h3>';
				_dpHtml += '<button type="button" class="ui-prev-y" data-dpid="'+setId+'"><span class="a11y-hidden">이전 년도</span></button>';
				_dpHtml += '<div class="datepicker-yy"></div>';
				_dpHtml += '<button type="button" class="ui-next-y" data-dpid="'+setId+'"><span class="a11y-hidden">다음 년도</span></button>';
				_dpHtml += '<button type="button" class="ui-prev-m" data-dpid="'+setId+'"><span class="a11y-hidden">이전 월</span></button>';
				_dpHtml += '<div class="datepicker-mm"></div>';
				_dpHtml += '<button type="button" class="ui-next-m" data-dpid="'+setId+'"><span class="a11y-hidden">다음 월</span></button>';
				_dpHtml += '<button type="button" class="ui-today" data-dpid="'+setId+'"><span class="a11y-hidden">오늘</span></button>';
				_dpHtml += '</div>';

				_dpHtml += '<div class="datepicker-body">';
				_dpHtml += '<table>';
				_dpHtml += '<caption>'+title+'</caption>';
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
				_dpHtml += '<button type="button" class="btn-base ui-confirm" data-confirm="'+ setId +'"><span>확인</span></button>';
				_dpHtml += '</div>';
				_dpHtml += '</div>';

				_dpHtml += '</div>';
				_dpHtml += '</section>';

				area.insertAdjacentHTML('beforeend',_dpHtml);
				//document.querySelector('#' + setId).parentNode.insertAdjacentHTML('beforeend',_dpHtml);
				el_dp = document.querySelector('.datepicker[data-id="'+setId+'"]');

				this.dateMake({
					setDate: date,
					currentDate: currentDate, 
					setId: setId,
					period: period
				});

				_dpHtml = null;

				!!callback && callback();
				
				//event
				const nextY = el_dp.querySelector('.ui-next-y');
				const prevY = el_dp.querySelector('.ui-prev-y');
				const nextM = el_dp.querySelector('.ui-next-m');
				const prevM = el_dp.querySelector('.ui-prev-m');
				const today = el_dp.querySelector('.ui-today');
				const confirm = el_dp.querySelector('.ui-confirm');

				nextY.addEventListener('click', Global.datepicker.nextYear);
				prevY.addEventListener('click', Global.datepicker.prevYear);
				nextM.addEventListener('click', Global.datepicker.nextMonth);
				prevM.addEventListener('click', Global.datepicker.prevMonth);
				today.addEventListener('click', Global.datepicker.goToday);
				confirm.addEventListener('click', function(){
					Global.datepicker.confirm({
						id: this.dataset.confirm
					});
				});
			}
		},
		confirm: function(opt){
			console.log(opt.id)
			var el_btn = document.querySelector('.ui-confirm[data-confirm="'+opt.id+'"]');
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
					callback: function(){
						Global.datepicker.destroy({
							id : id
						});
					}
				});
			} else {
				Global.datepicker.destroy({
					id : id
				});
			}
		},
		dateMake: function(opt){
			var setDate = opt.setDate;

			var setId = opt.setId;
			var el_dp = document.querySelector('.datepicker[data-id="' + setId + '"]');
			var el_inp = document.querySelector('#' + setId);
			var el_uidp = el_inp.closest('.ui-datepicker');	
			var el_start = el_uidp.querySelector('[data-period="start"]');
			var el_end = el_uidp.querySelector('[data-period="end"]');

			if (!!el_dp.dataset.period) {
				if (el_dp.dataset.end !== '' && (el_dp.dataset.end !== el_dp.dataset.start)) {
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
			}

			//설정된 날
			let viewYear = date.getFullYear();
			let viewMonth = date.getMonth();
			let viewDay = date.getDate();
			//오늘
			const _viewYear = today.getFullYear();
			const _viewMonth = today.getMonth();
			const _viewDay = today.getDate();
			//선택한 날
			let start_viewYear = null;
			let start_viewMonth = null;
			let start_viewDay = null;
			//선택한 날
			let end_viewYear = null;
			let end_viewMonth = null;
			let end_viewDay = null;
			//최소
			const min_viewYear = min_day.getFullYear();
			const min_viewMonth = min_day.getMonth();
			const min_viewDay = min_day.getDate();
			//최대
			const max_viewYear = max_day.getFullYear();
			const max_viewMonth = max_day.getMonth();
			const max_viewDay = max_day.getDate();
			
			//설정일자가 있는 경우
			if (!!setDate) {
				date = new Date(setDate);

				viewYear = date.getFullYear();
				viewMonth = date.getMonth();
				viewDay = date.getDate();	
			}

			//선택일자가 있는 경우
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
			}

			//지난달 마지막 date, 이번달 마지막 date
			const prevLast = new Date(viewYear, viewMonth, 0);
			const thisLast = new Date(viewYear, viewMonth + 1, 0);
			const PLDate = prevLast.getDate();
			const PLDay = prevLast.getDay();
			const TLDate = thisLast.getDate();
			const TLDay = thisLast.getDay();
			let prevDates = [];
			let thisDates = [...Array(TLDate + 1).keys()].slice(1);
			let nextDates = [];

			//prevDates 계산
			if (PLDay !== 6) {
				for(let i = 0; i < PLDay + 1; i++) {
					prevDates.unshift('');
				}
			}

			//nextDates 계산
			for(let i = 1; i < 7 - TLDay; i++) {
				nextDates.unshift('');
			}

			//dates 합치기
			const dates = prevDates.concat(thisDates, nextDates);
			let _dpHtml = '';

			//dates 정리
			dates.forEach((date,i) => {
				let _class = '';
				let _disabled = false;

				// _class = (i % 7 === 0) ? 'hday' : '';
				// _class = (i % 7 === 0) ? 'hday' : _class;

				//오늘날짜 설정
				_class = (date === _viewDay && viewYear === _viewYear && viewMonth === _viewMonth) ? _class + 'today' : _class;

				//max date
				if (viewYear === max_viewYear) {
					if (viewMonth === max_viewMonth) {
						if (date > max_viewDay) {
							_disabled = true;
						}
					} else if (viewMonth > max_viewMonth) {
						_disabled = true;
					}
					
				} else if (viewYear > max_viewYear ) {
					console.log('>');
					_disabled = true;
				}

				//min date
				if (viewYear === min_viewYear) {
					console.log('===', viewMonth,  min_viewMonth);
					if (viewMonth === min_viewMonth) {
						if (date < min_viewDay) {
							_disabled = true;
						}
					} else if (viewMonth < min_viewMonth) {
						_disabled = true;
					}
					
				} else if (viewYear < min_viewYear ) {
					console.log('<');
					_disabled = true;
				}

				//selected date
				const _day = (date === start_viewDay && viewYear === start_viewYear && viewMonth === start_viewMonth) ? 
					_class + ' selected-start' : 
					(date === end_viewDay && viewYear === end_viewYear && viewMonth === end_viewMonth) ? _class + ' selected-end' : _class;
				
				if (!!endDay) {
					_class = _class + ' during';

					if (viewYear < start_viewYear || viewYear > end_viewYear) {
						_class = _class.replace(' during', '');
					}

					if (viewYear === start_viewYear && viewMonth < start_viewMonth) {
						_class = _class.replace(' during', '');
					}

					if (viewYear === start_viewYear && viewMonth === start_viewMonth && date <=  start_viewDay) {
						_class = _class.replace(' during', '');
					}

					if (viewYear === end_viewYear && viewMonth > end_viewMonth) {
						_class = _class.replace(' during', '');
					}

					if (viewYear === end_viewYear && viewMonth === end_viewMonth && date >=  end_viewDay) {
						_class = _class.replace(' during', '');
					}
				}

				//row
				if (!(i % 7)) {
					_dpHtml += (i !== 0) ? '</tr><tr>' : '<tr>';
				
				} else {
					_dpHtml += '';
				}

				_dpHtml += '<td class="'+ _class +'">';

				if (date === '') {
					//빈곳
				} else {
					if (!_disabled) {
						_dpHtml += '<button type="button" class="datepicker-day '+ _day +'" data-date="'+ viewYear +'-'+ Global.parts.add0(viewMonth + 1)+'-'+ Global.parts.add0(date)+ '">';
					} else {
						_dpHtml += '<button type="button" class="datepicker-day '+ _day +'" data-date="'+ viewYear +'-'+ Global.parts.add0(viewMonth + 1)+'-'+ Global.parts.add0(date)+ '" disabled>';
					}
				}
				
				_dpHtml += '<span>' + date +'</span>';
				_dpHtml += '</button>';
				_dpHtml += '</td>';
			});

			const dp_tbody = el_dp.querySelector('.datepicker-date');
			const dp_y = el_dp.querySelector('.datepicker-yy');
			const dp_m = el_dp.querySelector('.datepicker-mm');
			const getData = el_dp.dataset.date.split('-');
			
			dp_y.innerHTML = getData[0];
			dp_m.innerHTML = getData[1];
			dp_tbody.innerHTML = _dpHtml;

			const dayBtn = dp_tbody.querySelectorAll('.datepicker-day');

			for (let i = 0, len = dayBtn.length; i < len; i++) {
				dayBtn[i].addEventListener('click', Global.datepicker.daySelect);
				dayBtn[i].dataset.n = i;
				dayBtn[i].addEventListener('keydown', keyMove);
			}

			// for (var dayBtns of dayBtn) {
			// 	dayBtns.addEventListener('click', Global.datepicker.daySelect);
			// 	console.log(dayBtns);
			// 	dayBtns.addEventListener('keydown', keyMove);
			// }

			function keyMove(e) {
				e.preventDefault();

				const isShift = !!window.event.shiftKey;
				const n = Number(e.currentTarget.dataset.n);
				const keycode = e.keyCode;
				const keys = Global.state.keys;

				let current = n;

				switch (keycode) {
					case keys.up:
						current = (n - 7 < 0) ? 0 : n - 7;
						dp_tbody.querySelector('.datepicker-day[data-n="'+current+'"]').focus();
						break;
					case keys.left:
						current = (n - 1 < 0) ? 0 : n - 1;
						dp_tbody.querySelector('.datepicker-day[data-n="'+current+'"]').focus();
						break;
					case keys.down:
						current = (n + 7 > len - 1) ? len - 1 : n + 7;
						dp_tbody.querySelector('.datepicker-day[data-n="'+current+'"]').focus();
						break;
					case keys.right:
						current = (n + 1 > len - 1) ? len - 1 : n + 1;
						dp_tbody.querySelector('.datepicker-day[data-n="'+current+'"]').focus();
						break;
					case keys.tab:
						isShift ?
							el_dp.querySelector('.datepicker-header .datepicker-title').focus(): 
							el_dp.querySelector('.ui-confirm').focus();
						break;
					case keys.enter:
						Global.datepicker.daySelect(e);
						break;
				}
			}
		},
		daySelect: (event) => {
			const el_btn = event.currentTarget;
			const el_dp = el_btn.closest('.datepicker');
			const dayBtn = el_dp.querySelectorAll('.datepicker-day');
			const selectDay = el_btn.dataset.date;
			let period = el_dp.dataset.period;
			const n = 0;
			const id = el_dp.dataset.id;
			const date = new Date(el_dp.dataset.date);

			const el_inp = document.querySelector('#' + id);
			const el_uidp = el_inp.closest('.ui-datepicker');
			const el_start = el_uidp.querySelector('[data-period="start"]');
			const el_end = el_uidp.querySelector('[data-period="end"]');

			period = (!!el_dp.dataset.end) ? 'end' : period;

			if (!period) {
				//single mode
				el_dp.dataset.start = selectDay;

				for (let that of dayBtn) {
					that.classList.remove('selected-start');
				}
				el_btn.classList.add('selected-start');
			} else {
				//period mode
				if (period === 'start') {
					//start
					el_dp.dataset.start = selectDay;
					el_dp.dataset.period = 'end';
					el_btn.classList.add('selected-start');
					//el_end.min = selectDay;
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
		nextYear: (event) => {
			const dpId = event.target.dataset.dpid;
			const el_inp = document.querySelector('#' + dpId);
			const el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			const el_next = el_dp.querySelector('.ui-next-y');
			const el_prev = el_dp.querySelector('.ui-prev-y');
			const el_next_m = el_dp.querySelector('.ui-next-m');
			const el_prev_m = el_dp.querySelector('.ui-prev-m');

			const date = new Date(el_dp.dataset.date);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDay();

			const max = el_inp.getAttribute('max');
			const max_date = new Date(max);
			const max_year = max_date.getFullYear();
			const max_month = max_date.getMonth() + 1;
			const max_day = max_date.getDay();

			const min = el_inp.getAttribute('min');
			const min_date = new Date(min);
			const min_year = min_date.getFullYear();
			const min_month = min_date.getMonth() + 1;
			const min_day = min_date.getDay();

			// if (year + 1 <= min_year) {
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

			el_dp.dataset.date = (year + 1) +'-'+ Global.parts.add0(month); 
			Global.datepicker.dateMake({
				setDate: date,
				setId: dpId
			});
		},
		prevYear: (event) => {
			const dpId = event.target.dataset.dpid;
			const el_inp = document.querySelector('#' + dpId);
			const el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			const el_next = el_dp.querySelector('.ui-next-y');
			const el_prev = el_dp.querySelector('.ui-prev-y');
			const el_next_m = el_dp.querySelector('.ui-next-m');
			const el_prev_m = el_dp.querySelector('.ui-prev-m');

			const date = new Date(el_dp.dataset.date);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDay();

			const max = el_inp.getAttribute('max');
			const max_date = new Date(max);
			const max_year = max_date.getFullYear();
			const max_month = max_date.getMonth() + 1;

			const min = el_inp.getAttribute('min');
			const min_date = new Date(min);
			const min_year = min_date.getFullYear();
			const min_month = min_date.getMonth() + 1;

			// if (year - 1 >= max_year) {
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

			el_dp.dataset.date = (year - 1) +'-'+ Global.parts.add0(month); 

			Global.datepicker.dateMake({
				setDate: date,
				setId: dpId
			});
		},
		nextMonth: (event) => {
			const dpId = event.target.dataset.dpid;
			const el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			let date = new Date(el_dp.dataset.date);
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			
			if (month > 11) {
				month = 0;
				year = year + 1;
				date.setFullYear(year);
			}

			date.setMonth(month);

			el_dp.dataset.date = year +'-'+ Global.parts.add0(month + 1); 

			Global.datepicker.dateMake({
				setDate: date,
				setId: dpId
			});
		},
		prevMonth: (event) => {
			const dpId = event.target.dataset.dpid;
			const el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			let date = new Date(el_dp.dataset.date);
			let year = date.getFullYear();
			let month = date.getMonth();
			
			if (month < 1) {
				month = 12;
				year = year - 1;
				date.setFullYear(year);
			}

			date.setMonth(month - 1);

			el_dp.dataset.date = year +'-'+ Global.parts.add0(month); 

			Global.datepicker.dateMake({
				setDate: date,
				setId: dpId
			});
		},
		goToday: (event) => {
			const dpId = event.target.dataset.dpid;
			const el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			
			el_dp.dataset.date = year +'-'+ Global.parts.add0(month); 

			Global.datepicker.dateMake({
				setDate: date,
				setId: dpId
			});
		}
	}

	Global.sheets = {
		dim: function(opt){
			const {show, callback} = opt;
			let dim;

 			if (show) {
				const sheet = doc.querySelector('.sheet-bottom[data-id="'+opt.id+'"]');
				sheet.insertAdjacentHTML('beforeend', '<div class="sheet-dim"></div>');

				dim = doc.querySelector('.sheet-dim');
				dim.classList.add('on');

				!!callback && callback();
			} else {
				dim = doc.querySelector('.sheet-dim');
				dim.classList.remove('on');
			}
		},
		bottom: function(opt){
			const {id, state, callback} = opt;
			const el_base = doc.querySelector('#'+ id);
			let el_sheet = doc.querySelector('[data-id*="'+id+'"]');
			const scr_t = doc.documentElement.scrollTop;
			const win_w = win.innerWidth;
			const win_h = win.innerHeight;
			const off_t = el_base.getBoundingClientRect().top;
			const off_l = el_base.getBoundingClientRect().left;
			const base_w = el_base.offsetWidth;
			const base_h = el_base.offsetHeight;
			const is_expanded = !!el_sheet;
			let show = !is_expanded || is_expanded === 'false';

			if (state !== undefined) {
				show = state;
			}

			if (show) {
				!!callback && callback(); 
				
				el_sheet = doc.querySelector('[data-id*="'+ id +'"]');
				el_sheet.classList.add('sheet-bottom');

				const wrap_w = Number(el_sheet.offsetWidth.toFixed(2));
				const wrap_h = Number(el_sheet.offsetHeight.toFixed(2));

				Global.sheets.dim({
					id: id,
					show: true,
					callback: function(){
						const dim = doc.querySelector('.sheet-dim');

						dim.addEventListener('click', dimAct);

						function dimAct(){
							Global.sheets.bottom({
								id: id,
								state: false
							});
						}
					}
				});

				el_sheet.classList.add('on');
				el_sheet.style.left = ((wrap_w + off_l) > win_w) ? (off_l - (wrap_w - base_w))+ 'px' : off_l + 'px';
				el_sheet.style.top = (win_h - ((off_t - scr_t) + base_h) > wrap_h) ? (off_t + base_h) + scr_t + 'px' : (off_t - wrap_h) + scr_t + 'px';

				Global.focus.loop({
					selector: el_sheet
				});
			} else {
				//hide
				el_sheet.classList.remove('on');
				el_sheet.classList.add('off');
				
				setTimeout(function(){
					!!callback && callback();
					el_sheet.remove();

					doc.querySelector('#'+id).focus();
				},300);
			}
		}
	}

	Global.select = {
		options: {
			id: false, 
			current: null,
			customscroll: true,
			callback: false
		},
		init: function(option){
			const opt = Object.assign({}, this.options, option);
			const current = opt.current;
			const callback = opt.callback;
			let customscroll = opt.customscroll;
			const id = opt.id;
			const isId = !!id ? doc.querySelector('#' + opt.id) : false;
			const el_uiSelects = doc.querySelectorAll('.ui-select');
			const keys = Global.state.keys;
			const isMobile = Global.state.device.mobile;

			let el_select;
			let $selectCurrent;
			let selectID;
			let listID;
			let optionSelectedID;
			let selectN;
			let selectTitle;
			let selectDisabled;
			let btnTxt = '';
			let hiddenClass = '';
			let htmlOption = '';
			let htmlButton = '' ;

			//init
			Global.state.device.mobile ? customscroll = false : '';

			//reset
			let idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

			//select set
			for (let el_uiSelect of el_uiSelects) {
				let el_btn = el_uiSelect.querySelector('.ui-select-btn');
				let el_wrap = el_uiSelect.querySelector('.ui-select-wrap');
				let el_dim = el_uiSelect.querySelector('.dim');

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

			function act(el_uiSelect, el_select, selectID){
				(selectID === undefined) ? el_select.id = 'uiSelect_' + idN : '';
				listID = selectID + '_list';

				selectDisabled = el_select.disabled;
				selectTitle = el_select.title;
				hiddenClass = '';

				//el_uiSelect.css('max-width', el_uiSelect.outerWidth());
				//callback 나중에 작업필요
				//(!el_select.data('callback') || !!callback) && el_select.data('callback', callback);

				if (customscroll) {
					htmlOption += '<div class="ui-select-wrap ui-scrollbar" scroll-id="uiSelectScrollBar_'+ idN +'">';
					idN = idN + 1;
					sessionStorage.setItem('scrollbarID', idN);
				} else {
					htmlOption += '<div class="ui-select-wrap" style="min-width:' + el_uiSelect.offsetWIdth + 'px">';
				}

				htmlOption += '<strong class="ui-select-title">'+ selectTitle +'</strong>';
				htmlOption += '<div class="ui-select-opts" role="listbox" id="' + listID + '" aria-hidden="false">';

				setOption(el_uiSelect, el_select.selectedIndex);

				htmlOption += '</div>';
				htmlOption += '<button type="button" class="ui-select-cancel"><span>취소</span></strong>';
				htmlOption += '<button type="button" class="ui-select-confirm"><span>확인</span></strong>';
				htmlOption += '</div>';
				htmlButton = '<button type="button" class="ui-select-btn '+ hiddenClass +'" id="' + selectID + '_inp" role="combobox" aria-autocomplete="list" aria-owns="' + listID + '" aria-haspopup="true" aria-expanded="false" aria-activedescendant="' + optionSelectedID + '" data-n="' + selectN + '" data-id="' + selectID + '" tabindex="-1"><span>' + btnTxt + '</span></button>';
				
				el_uiSelect.insertAdjacentHTML('beforeend', htmlButton);
				el_select.classList.add('off');
				el_select.setAttribute('aria-hidden', true)
				// el_select.setAttribute('tabindex', -1);
				el_uiSelect.insertAdjacentHTML('beforeend', htmlOption);

				if (selectDisabled) {
					const _btn = el_uiSelect.querySelector('.ui-select-btn');

					_btn.disabled = true;
					_btn.classList.add('disabled')
				}  
				
				// const _optwrap = el_uiSelect.querySelector('.ui-select-opts');
				// console.log(_optwrap);
				// const _btns = _optwrap.querySelectorAll('button');
				// for (let _btn of _btns) {
				// 	_btn.remove();
				// }
				
				eventFn();
				htmlOption = '';
				htmlButton = '';
			}
			
			function setOption(uiSelect, v){
				let _select = (uiSelect !== undefined) ? uiSelect.closest('.ui-select') : uiSelect;

				if (uiSelect !== undefined) {
					_select = _select.querySelector('select');
				}

				const _options = _select.querySelectorAll('option');
				const _optionID = _select.id + '_opt';
				const _optLen = _options.length;

				let _optionCurrent = _options[0];
				let _current = current;
				let _selected = false;
				let _disabled = false;
				let _hidden = false;
				let _val = false;
				let _hiddenCls;
				let _optionIdName;

				if (v !== undefined) {
					_current = v;
				}

				for (let i = 0; i < _optLen; i++) {
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
					_hiddenCls =  _hidden ? 'hidden' : '';

					if (_selected) {
						_val = _optionCurrent.value;
						btnTxt = _optionCurrent.textContent;
						optionSelectedID = _optionID + '_' + i;
						selectN = i;
					}

					_selected && _hidden ? hiddenClass = 'opt-hidden' : '';
					_optionIdName = _optionID + '_' + i;

					if (Global.state.device.mobile) {
						_disabled ?
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' :
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">';
					} else {
						_disabled ?
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _optionCurrent.value + '" disabled tabindex="-1">' :
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _optionCurrent.value + '" tabindex="-1">';
					}

					htmlOption += '<span class="ui-select-txt">' + _optionCurrent.textContent + '</span>';
					htmlOption += '</button>';
				}

				return htmlOption;
			}

			//event
			eventFn();
			function eventFn(){
				// $(doc).off('click.dp').on('click.dp', '.ui-select-btn', function(e){
					
				// 	var $this = $(this).closest('.ui-datepicker').find('.inp-base');
				// 	Global.sheets.bottom({
				// 		id: $this.attr('id'),
				// 		callback: function(){

				// 		}
				// 	});
				// });
				
				//const el_dims = doc.querySelectorAll('.dim-select');
				const el_confirms = doc.querySelectorAll('.ui-select-confirm');
				const el_cancels = doc.querySelectorAll('.ui-select-cancel');
				const el_btns = doc.querySelectorAll('.ui-select-btn');
				//const el_opts = doc.querySelectorAll('.ui-select-opt');
				//const el_wraps = doc.querySelectorAll('.ui-select-wrap');
				const el_labels = doc.querySelectorAll('.ui-select-label');
				const el_selects = doc.querySelectorAll('.ui-select select');

				// for (let el_dim of el_dims) {
				// 	el_dim.addEventListener('click', selectClick);
				// }

				for (let el_confirm of el_confirms) {
					el_confirm.addEventListener('click', optConfirm);
				}

				for (let el_cancel of el_cancels) {
					el_cancel.addEventListener('click', Global.select.hide);
				}

				for (let el_btn of el_btns) {
					el_btn.addEventListener('click', selectClick);
					// el_btn.addEventListener('keydown', selectKey);
					// el_btn.addEventListener('mouseover', selectOver);
					// el_btn.addEventListener('focus', selectOver);
					// el_btn.addEventListener('mouseleave', selectLeave);
				}

				for (let el_label of el_labels) {
					el_label.addEventListener('click', labelClick);
				}

				for (let el_select of el_selects) {

					el_select.addEventListener('change', Global.select.selectChange);
				}
			}

			function labelClick(e) {
				const that = e.currentTarget;
				const idname = that.getAttribute('for');
				const inp = doc.querySelector('#' + idname);
 
				setTimeout(function() {
					inp.focus();
				}, 0);
			}

			function selectLeave() {
				const body = doc.querySelector('body');

				body.dataset.selectopen = true;
			}
			
			
			function selectClick(e) {
				const that = e.currentTarget;
				const el_uiselect = that.closest('.ui-select');
				const el_select = el_uiselect.querySelector('select');
				const opts = el_uiselect.querySelectorAll('option');
				const n = el_select.selectedIndex;

				// for (let opt of opts) {
				// 	//console.log(a.selected && Global.parts.getIndex(a));
				// 	n = opt.selected && Global.parts.getIndex(opt);
				// }

				that.dataset.sct = doc.documentElement.scrollTop;

				doc.removeEventListener('click', Global.select.back);
				setTimeout(function(){
					doc.addEventListener('click', Global.select.back);
				},0);

				setOption(that, n);
				optExpanded(that, n);
			}

			function selectKey(e) {
				const el_btn = e.currentTarget;
				const id = el_btn.dataset.id;
				const el_list = doc.querySelector('#' + id + '_list');
				const el_wrap = el_list.closest('.ui-select-wrap');
				const el_optwrap = el_wrap.querySelector('.ui-select-opts');
				const el_opts = el_wrap.querySelectorAll('.ui-select-opt');
				const list_selected = el_list.querySelector('.selected');

				let n = Number(Global.parts.getIndex(list_selected));
				let nn = 0;
				let nnn = 0;
				let wrap_h = el_wrap.offsetHeight;
				let len = el_opts.length;
				let n_top = 0;

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

			function optBlur(e) {
				//if (doc.querySelector('body').dataset.selectopen) { .. }); dim
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
				const dT = doc.documentElement.scrollTop;

				Global.scroll.move({ 
					top: Number(n_top), 
					selector: customscroll ? el_wrap.querySelector(':scope > .ui-scrollbar-item') : el_wrap, 
					effect: 'auto', 
					align: 'default' 
				});
			}
			function optPrev(e, id, n, len) {
				e.preventDefault();
				const current = (n === 0) ?0 :n - 1;

				Global.select.act({ id: id, current: current });
			}
			function optNext(e, id, n, len) {
				e.preventDefault();
				const current = n === len - 1 ? len - 1 :n + 1;

				Global.select.act({ id: id, current: current });
			}
			function optOpen(btn) {
				const el_body = doc.querySelector('body');
				const el_uiselect = btn.closest('.ui-select');
				const el_wrap = el_uiselect.querySelector('.ui-select-wrap');
				let el_optwrap = el_wrap.querySelector('.ui-select-opts');
				let el_opts = el_optwrap.querySelectorAll('.ui-select-opt');
				const el_select = el_uiselect.querySelector('select');
				const el_option = el_select.querySelectorAll('option');

				//const el_opts = doc.querySelectorAll('.ui-select-opt');

				const offtop = el_uiselect.getBoundingClientRect().top;
				const scrtop = doc.documentElement.scrollTop;
				const wraph = el_wrap.offsetHeight;
				const btn_h = btn.offsetHeight;
				const opt_h = 40;
				const win_h = win.innerHeight;
				const className = win_h - ((offtop - scrtop) + btn_h) > wraph ? 'bottom' : 'top';
				const n = el_select.selectedIndex;

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
					
				setTimeout(function(){

					el_optwrap = el_wrap.querySelector('.ui-select-opts');
					el_opts = el_optwrap.querySelectorAll('.ui-select-opt');

					Global.scroll.move({ 
						top: Number(opt_h * n) , 
						selector: customscroll ? el_wrap.querySelector(':scope > .ui-scrollbar-item') : el_wrap, 
						effect: 'auto', 
						align: 'default' 
					});

					for (let el_opt of el_opts) {
						console.log(el_opt);
			
						el_opt.addEventListener('click', Global.select.optClick);
						el_opt.addEventListener('mouseover',  Global.select.selectOver);
					}
					
					el_wrap.addEventListener('mouseleave', selectLeave);
					el_wrap.addEventListener('blur', optBlur);
				}, 0);

				openScrollMove(el_uiselect);

				el_wrap.removeEventListener('touchstart', Global.select.wrapTouch);
				el_wrap.addEventListener('touchstart', Global.select.wrapTouch);
			}

			function openScrollMove(el_uiselect){
				const el_html = doc.querySelector('html, body');
				const dT = Math.floor(doc.documentElement.scrollTop);
				const wH = win.innerHeight;
				const el_btn = el_uiselect.querySelector('.ui-select-btn');
				const elT = el_btn.getBoundingClientRect().top;
				const elH = el_btn.offsetHeight;
				const a = Math.floor(elT - dT);
				const b = wH - 240;

				el_uiselect.dataset.orgtop = dT;

				if (a > b) {
					el_html.scrollTo({
						top: a - b + elH + 10 + dT,
						behavior: 'smooth'
					});
				} 
			}

			function optConfirm(e) {
				const el_confirm = e.currentTarget;
				const el_uiSelect = el_confirm.closest('.ui-select');
				const el_body = doc.querySelector('body');
				const el_btn = el_uiSelect.querySelector('.ui-select-btn');
				const el_wrap = el_uiSelect.querySelector('.ui-select-wrap');
				const el_select = el_uiSelect.querySelector('select');
				const orgTop = el_uiSelect.dataset.orgtop;
				
				console.log(el_btn.dataset.id, el_select.selectedIndex);

				Global.select.act({ 
					id: el_btn.dataset.id, 
					current: el_select.selectedIndex
				});

				el_body.classList.remove('dim-select');
				el_btn.dataset.expanded = false;
				el_btn.setAttribute('aria-expanded', false)
				el_btn.focus();

				el_uiSelect.classList.remove('on');
				el_wrap.classList.remove('on');
				el_wrap.classList.remove('top');
				el_wrap.classList.remove('bottom');
				el_wrap.setAttribute('aria-hidden', true);

				console.log(el_select);
				//el_select.onchange();

				//$('html, body').scrollTop(orgTop);
			}

		},
		back: function(e){
			e.preventDefault();

			let isTure = '';

			for (let path of e.path) {
				isTure = isTure + path.classList;
			}

			(isTure.indexOf('ui-select-wrap') < 0) && Global.select.hide();
		},
		scrollSelect: function(v, el){
			const _opts = el.querySelectorAll('.ui-select-opt');
			const el_uiSelect = el.closest('.ui-select');
			const el_btn = el_uiSelect.querySelector('.ui-select-btn');

			el.scrollTo({
				top: 40 * v,
				behavior: 'smooth'
			});

			for (let i = 0, len = _opts.length; i < len; i++) {
				_opts[i].classList.remove('selected');

				
				if (v === i) {
					_opts[i].classList.add('selected');
					el_uiSelect.dataset.current = i;
				} 
			}

			// Global.select.act({ 
			// 	id: el_btn.dataset.id, 
			// 	current: v
			// });
		},
		wrapTouch: function(e){
			const that = e.currentTarget;
			const wrap = that.querySelector('.ui-select-opts');

			let timerScroll = null;
			let touchMoving = false;
			const wrapT = that.getBoundingClientRect().top;
			let getScrollTop = Math.abs(wrap.getBoundingClientRect().top - wrapT);
			let currentN = 0;

			clearTimeout(timerScroll);
			
			that.addEventListener('touchmove', actMove);
			

			function actMove(){
				touchMoving = true;
				getScrollTop = Math.abs(wrap.getBoundingClientRect().top - wrapT);

				that.addEventListener('touchcancel', actEnd);
				that.addEventListener('touchend', actEnd);
			}
			function actEnd(){
				const that = this;

				function scrollCompare(){
					timerScroll = setTimeout(function(){

						if (getScrollTop !== Math.abs(wrap.getBoundingClientRect().top - wrapT)) {
							getScrollTop = Math.abs(wrap.getBoundingClientRect().top - wrapT);
							scrollCompare();
						} else {
							currentN = Math.floor((Math.floor(getScrollTop) + 20) / 40);
							Global.select.scrollSelect(currentN,  that);
						}
					},100);
				} 

				touchMoving && scrollCompare();
				that.removeEventListener('touchmove', actMove);
			}
		},
		optClick: function(e) {
			console.log(e);

			const _uiSelect = this.closest('.ui-select');
			const _btn = _uiSelect.querySelector('.ui-select-btn');
			const el_select = _uiSelect.querySelector('select');
			const _wrap = _uiSelect.querySelector('.ui-select-wrap');
			const idx = Global.parts.getIndex(this);
			const isMobile = Global.state.device.mobile;

			

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
		selectOver: function() {
			const body = doc.querySelector('body');

			body.dataset.selectopen = false;
		},
		selectChange: function(e) {
			const that = e.target;
			const uiSelect = that.closest('.ui-select');
			
			uiSelect.dataset.fn;

			Global.select.act({
				id: that.id,
				current: that.options.selectedIndex,
				original:true
			});
		},
		hide: function(){
			const el_body = doc.querySelector('body');
			const el_selects = doc.querySelectorAll('.ui-select');
			const el_selectWraps = doc.querySelectorAll('.ui-select-wrap[aria-hidden="false"]');
			const el_btns = doc.querySelectorAll('.ui-select-btn[aria-expanded="true"]');
			let el_select, el_wrap, orgTop;

			el_body.classList.remove('dim-select');
			console.log(el_btns);

			for (let that of el_btns) {
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


			doc.removeEventListener('click', Global.select.back);
		},
		act: function(opt){
			const id = opt.id;
			const el_select = doc.querySelector('#' + id);
			const el_opts = el_select.querySelectorAll('option');
			const el_uiSelect = el_select.closest('.ui-select');
			const el_btn = el_uiSelect.querySelector('.ui-select-btn');
			const el_text = el_btn.querySelector('span');
			const el_btnopts = el_uiSelect.querySelectorAll('.ui-select-opt');

			// var dataCallback = el_select.data('callback'),
			// 	callback = opt.callback === undefined ? dataCallback === undefined ? false : dataCallback : opt.callback,
			let current = opt.current;
			const org = opt.original === undefined ? false : opt.original;

			if (el_uiSelect.dataset.current !== undefined) {
				current = el_uiSelect.dataset.current;
				el_select.selectedIndex = el_uiSelect.dataset.current;
			} 

			//!org && el_uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true);
			if (!org) {
				el_opts[current].selected = true;

				// el_uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true).trigger('change');
			} 
			//trigger 오류 확인필요
			
			const optCurrent = el_opts[current];

			(optCurrent.hidden === true) ? 
				el_btn.classList.remove('opt-hidden'):
				el_btn.classList.add('opt-hidden');

			console.log(current, optCurrent.textContent);

			el_text.textContent = optCurrent.textContent;

			for (let el_btnopt of el_btnopts) {
				el_btnopt.classList.remove('selected');
			}

			el_btnopts[current].classList.add('selected');

			Global.state.device.mobile && el_btnopts[current].focus();

			// callback && callback({ 
			// 	id: id, 
			// 	current: current, 
			// 	val: optCurrent.val() 
			// });
		}
	}

	Global.accordion = {
		options: {
			current: null,
			autoclose: false,
			callback: false,
			effect: Global.state.effect.easeInOut,
			effTime: '.2'
		},
		init: function(option){
			const opt = Object.assign({}, Global.accordion.options, option);
			const accoId = opt.id;
			const callback = opt.callback;
			let current = opt.current;
			let autoclose = opt.autoclose;
			const el_acco = doc.querySelector('#' + accoId);
			const el_wrap = el_acco.querySelectorAll(':scope > .ui-acco-wrap');
			const len = el_wrap.length;
			const para = Global.para.get('acco');
			let paras;
			let paraname;
			
			//set up : parameter > current
			if (!!para) {
				if (para.split('+').length > 1) {
					//2 or more : acco=exeAcco1*2+exeAcco2*3
					paras = para.split('+');
	
					for (var j = 0; j < paras.length; j++ ) {
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

			el_acco.dataset.n = len;

			//set up : parameter > current
			for (let i = 0; i < len; i++) {
				const this_wrap = el_wrap[i];
				const el_tit = this_wrap.querySelector(':scope > .ui-acco-tit');
				const el_pnl = this_wrap.querySelector(':scope > .ui-acco-pnl');
				const el_btn = el_tit.querySelector('.ui-acco-btn');

				this_wrap.dataset.n = i;
				(el_tit.tagName !== 'DT') && el_tit.setAttribute('role','heading');

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

			const currentLen = current === null ? 0 : current.length;
			
			if (current !== 'all') {
				for (let i = 0; i < currentLen; i++) {
					const this_wrap = el_acco.querySelector('.ui-acco-wrap[data-n="'+ current[i] +'"]');
	
					const _tit = this_wrap.querySelector(':scope > .ui-acco-tit');
					const _btn = _tit.querySelector('.ui-acco-btn');
					const _pnl = this_wrap.querySelector(':scope > .ui-acco-pnl');
	
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
		evtClick: function(e){
			const that = e.currentTarget;
			const btnId = that.id;
			const n = that.dataset.n;
			
			let accoId = btnId.split('Btn');
			accoId = accoId[0];

			if (!!btnId) {
				e.preventDefault();

				Global.accordion.toggle({ 
					id: accoId, 
					current: [n]
				});
			}
		},
		evtKeys: function(e){
			const that = e.currentTarget;
			const btnId = that.id;
			const n = Number(that.dataset.n);
			const keys = Global.state.keys;

			let accoId = btnId.split('Btn');
			accoId = accoId[0];

			const acco = doc.querySelector('#' + accoId);
			const len = Number(acco.dataset.n);

			switch(e.keyCode){
				case keys.up:	
				case keys.left: upLeftKey(e);
					break;

				case keys.down:
				case keys.right: downRightKey(e);
					break;

				case keys.end: endKey(e);
					break;

				case keys.home: homeKey(e);
					break;
			}
			
			function upLeftKey(e) {
				e.preventDefault();

				that.dataset.order !== 'first' ?
				acco.querySelector('#' + accoId + 'Btn' + (n - 1)).focus():
				acco.querySelector('#' + accoId + 'Btn' + (len - 1)).focus();
			}
			function downRightKey(e) {
				e.preventDefault();

				that.dataset.order !== 'last' ?
				acco.querySelector('#' + accoId + 'Btn' + (n + 1)).focus():
				acco.querySelector('#' + accoId + 'Btn0').focus();
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
		toggle: function(opt){
			const id = opt.id;
			const el_acco = doc.querySelector('#' + id);
			const current = opt.current === undefined ? null : opt.current;
			const callback = opt.callback === undefined ? opt.callback : Global.accordion[id].callback;
			const state = opt.state === undefined ? 'toggle' : opt.state;
			const autoclose = opt.autoclose === undefined ? Global.accordion[id].autoclose : opt.autoclose;

			console.log(current,  state, autoclose);

			let el_wraps = el_acco.querySelectorAll(':scope > .ui-acco-wrap');
			let el_pnl;
			let el_tit;
			let el_btn;
			let len = el_wraps.length;
			let check = 0;
			
			const currentLen = current === null ? 0 : current.length;

			if (current !== 'all') {
				for (let i = 0; i < currentLen; i++) {
					const this_wrap = el_acco.querySelector('.ui-acco-wrap[data-n="'+ current[i] +'"]');

					el_tit = this_wrap.querySelector(':scope > .ui-acco-tit');
					el_pnl = this_wrap.querySelector(':scope > .ui-acco-pnl');
					el_btn = el_tit.querySelector('.ui-acco-btn');
	
					if (!!el_pnl) {
						if (state === 'toggle') {
							(el_btn.dataset.selected === 'true') ? act('down') : act('up');
						} else {
							(state === 'open') && act('up');
							(state === 'close') && act('down');
						}
					}
				}
				!!callback && callback({ 
					id:id, 
					current:current
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
				}
				//all check action
				if (el_acco.dataset.allopen !== 'true') {
					el_acco.dataset.allopen = true;
					act('down');
				} else {
					el_acco.dataset.allopen = false;
					act('up');
				}
			}
			function act(v) {
				const isDown = !(v === 'down');

				//set up close
				if (!!autoclose) {
					for (let wrap of el_wraps) {
						const _tit = wrap.querySelector(':scope > .ui-acco-tit');
						const _btn = _tit.querySelector('.ui-acco-btn');
						const _pnl = wrap.querySelector(':scope > .ui-acco-pnl');
						
						console.log(_pnl.offsetHeight);

						if (!!_pnl) {
							_btn.dataset.selected = false;
							_btn.setAttribute('aria-expanded', false);
							_pnl.setAttribute('aria-hidden', true);
						}
					}
				}
	
				if (current === 'all') {
					for (let wrap of el_wraps) {
						const _tit = wrap.querySelector(':scope > .ui-acco-tit');
						const _btn = _tit.querySelector('.ui-acco-btn');
						const _pnl = wrap.querySelector(':scope > .ui-acco-pnl');
						
						if (!!_pnl) {
							_btn.dataset.selected = isDown;
							_btn.setAttribute('aria-expanded', isDown);
							_pnl.setAttribute('aria-hidden', !isDown);
							Global.parts.toggleSlide({
								el: _pnl, 
								state: !isDown ? 'show' : 'hide'
							});
						}
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
	}
	
	Global.dropdown = {
		options: {
			ps: 'BL',
			area: doc.querySelector('body'),
			src: false,
			offset: true,
			callback:false
		},
		init: function(option){
			const opt = Object.assign({}, Global.dropdown.options, option);
			const {id, ps, hold, area, src, offset} = opt;
			const callback = opt.callback !== undefined ? opt.callback : false;

			//ajax 
			if (!!src && !doc.querySelector('[data-id="' + id + '"]')) {
				Global.ajax.init({
					area: area,
					url: src,
					add: true,
					callback: function(){
						setDropdown();
					}
				});
			} else {
				setDropdown();
			}
			
			//set
			function setDropdown(){
				const el_btn = doc.querySelector('#' + id);
				const el_pnl = doc.querySelector('[data-id="'+ id +'"]'); 
				const el_close = el_pnl.querySelector('.ui-drop-close');

				//set up
				el_btn.setAttribute('aria-expanded', false);
				el_btn.dataset.ps = ps;
				el_pnl.setAttribute('aria-hidden', true);
				el_pnl.setAttribute('aria-labelledby', id);
				el_pnl.dataset.id = id;
				el_pnl.dataset.ps = ps;

				//event
				el_btn.addEventListener('click', action);
				el_close.addEventListener('click', actionClose);

				function actionClose(){
					const id = this.closest('.ui-drop-pnl').dataset.id;

					Global.dropdown.toggle({ 
						id: id 
					});
					doc.querySelector('#' + id).focus();
				}
				function action(e) {
					e.preventDefault();
					const that = e.currentTarget;
	
					that.dataset.sct = doc.documentElement.scrollTop;
					Global.dropdown.toggle({ 
						id: that.id,
					});
				}

				!!callback && callback();
			}
		},
		back: function(e){
			e.preventDefault();

			let isTure = '';

			for (let path of e.path) {
				isTure = isTure + path.classList;
			}

			(isTure.indexOf('ui-drop-pnl') < 0) && Global.dropdown.hide();
		},
		toggle: function(opt) {
			const id = opt.id;
			const el_btn = doc.querySelector('#' + id);
			const el_pnl = doc.querySelector('.ui-drop-pnl[data-id="'+ id +'"]');
			const state = opt.state !== undefined ? opt.state : 'toggle';
			const btnExpanded =  el_btn.getAttribute('aria-expanded');

			let ps = el_btn.dataset.ps;
	
			if (!!el_btn.dataset.ps) {
				ps = el_btn.dataset.ps;
			}
			
			if (state === 'open') {
				btnExpanded = 'false';
			} else if (state === 'close') {
				btnExpanded = 'true';
			}
			
			btnExpanded === 'false' ? pnlShow(): pnlHide();

			function pnlShow(){
				const elBody = doc.querySelector('body');

				(!el_btn.closest('.ui-drop-pnl')) && Global.dropdown.hide();

				Global.focus.loop({
					selector: doc.querySelector('.ui-drop-pnl[data-id="'+ id +'"]'),
					callback:pnlHide
				});

				el_btn.setAttribute('aria-expanded', true);	
				el_pnl.setAttribute('aria-hidden', false)
				el_pnl.classList.add('on');

				const sT = Math.floor(doc.documentElement.scrollTop);
				const btn_w = Math.ceil(el_btn.offsetWidth);
				const btn_h = Math.ceil(el_btn.offsetHeight);
				const btn_t = Math.ceil(el_btn.getBoundingClientRect().top);
				const btn_l = Math.ceil(el_btn.getBoundingClientRect().left);
				const pnl_w = Math.ceil(el_pnl.offsetWidth);
				const pnl_h = Math.ceil(el_pnl.offsetHeight);

				switch (ps) {
					case 'BL': 
						el_pnl.style.top = btn_t + sT + btn_h + 'px';
						el_pnl.style.left = btn_l + 'px';
						break;
					case 'BC': 
						el_pnl.style.top = btn_t + sT + btn_h + 'px';
						el_pnl.style.left = btn_l - ((pnl_w - btn_w) / 2) + 'px';
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
						el_pnl.style.left =  btn_l - (pnl_w - btn_w) + 'px';
						break;
					case 'RT': 
						el_pnl.style.top = btn_t + sT + 'px';
						el_pnl.style.left = btn_l + btn_w + 'px';
						break;
					case 'RM': 
					
						el_pnl.style.top = btn_t + sT - ((pnl_h - btn_h) / 2) + 'px';
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
						el_pnl.style.top = btn_t + sT - ((pnl_h - btn_h) / 2) + 'px';
						el_pnl.style.left = btn_l - pnl_w + 'px';
						break;
					case 'LB': 
					el_pnl.style.top = btn_t + sT - (pnl_h - btn_h) + 'px';
						el_pnl.style.left = btn_l - pnl_w + 'px';
						break; 
					case 'CM': 
						el_pnl.style.top = '50%';
						el_pnl.style.left = '50%';
						el_pnl.style.marginTop = (pnl_h / 2 ) * -1 + 'px';
						el_pnl.style.marginLeft = (pnl_w / 2 ) * -1 + 'px';
						break;
				}
				
				setTimeout(function(){
					elBody.classList.add('dropdownOpened');
					setTimeout(function(){
						el_pnl.focus();
					},0);
				},0);

				doc.removeEventListener('click', Global.dropdown.back);
				setTimeout(function(){
					doc.addEventListener('click', Global.dropdown.back);
				},0);
			}
			function pnlHide(){
				const in_pnl = el_btn.closest('.ui-drop-pnl');
				const elBody = doc.querySelector('body');

				if (!in_pnl) {
					elBody.classList.remove('dropdownOpened');
				}
	
				el_btn.setAttribute('aria-expanded', false)
				el_btn.focus();
				el_pnl.setAttribute('aria-hidden', true)
				el_pnl.setAttribute('tabindex', -1)
				el_pnl.classList.remove('on');
			}
		}, 
		hide: () => {
			const elBody = doc.querySelector('body')
			const elDrops = doc.querySelectorAll('.ui-drop');
			const elDropPnls = doc.querySelectorAll('.ui-drop-pnl[aria-hidden="false"]');

			elBody.classList.remove('dropdownOpened');

			for (let that of elDrops) {
				that.setAttribute('aria-expanded', false);
			}

			for (let that of elDropPnls) {
				that.setAttribute('hidden', true);
				that.setAttribute('tabindex', -1);
				that.classList.remove('on');
			}

			doc.removeEventListener('click', Global.dropdown.back);
		}
	}	

	Global.modal = {
		options : {
			type: 'normal', /* type : normal, system */
			full: false,
			ps: 'center',
			src: false,
			remove: 'false',
			width: false,
			height: false,
			mg: 20,
			callback:false,

			closeCallback:false,
			endfocus:false,

			sMessage: '',
			sBtnConfirmTxt: 'Ok',
			sBtnCancelTxt: 'Cancel',
			sZindex: false,
			sClass: 'type-system',
			sConfirmCallback: false,
			sCancelCallback: false
		},
		optionsClose : {
			remove: 'false',
			callback: false,
			endfocus: false
		},
		show: function(option){
			const opt = Object.assign({}, Global.modal.options, option);
			const elBody = doc.querySelector('body');
			const {type, src, full, ps, width, height, callback, callbackClose} = opt;
			let {mg, id, remove} = opt;
			let endfocus = opt.endfocus === false ? document.activeElement : opt.endfocus;
			const scr_t = doc.documentElement.scrollTop;
			let timer;
			
			//system
			const {sMessage, sBtnConfirmTxt, sBtnCancelTxt, sZindex, sClass, sConfirmCallback, sCancelCallback} = opt;

			//setting
			if (type === 'normal') {
				//modal
				if (!!src && !doc.querySelector('#' + opt.id)) {
					Global.ajax.init({
						area: elBody,
						url: src,
						add: true,
						callback: function(){
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

			function makeSystemModal(){
				let htmlSystem = '';
				
				htmlSystem += '<div class="ui-modal type-system '+ sClass +'" id="uiSystemModal">';
				htmlSystem += '<div class="ui-modal-wrap">';
				htmlSystem += '<div class="ui-modal-body">';
				htmlSystem += sMessage;
				htmlSystem += '</div>';
				htmlSystem += '<div class="ui-modal-footer">';
				htmlSystem += '<div class="btn-wrap">';

				if (type === 'confirm') {
					htmlSystem += '<button type="button" class="btn-base-m text ui-modal-cancel"><span>'+ sBtnCancelTxt +'</span></button>';
				}

				htmlSystem += '<button type="button" class="btn-base-m text primary ui-modal-confirm"><span>'+ sBtnConfirmTxt +'</span></button>';	
				htmlSystem += '</div>';
				htmlSystem += '</div>';
				htmlSystem += '</div>';
				htmlSystem += '</div>';

				elBody.insertAdjacentHTML('beforeend', htmlSystem);

				htmlSystem = '';
				act();
			}

			function act(){
				const elModal = doc.querySelector('#' + id);
				const elModals = doc.querySelectorAll('.ui-modal');

				for (let md of elModals) {
					md.classList.remove('current');
					elBody.classList.add('scroll-no');
				}
				
				(!elModal.querySelector('.ui-modal-dim')) && elModal.insertAdjacentHTML('beforeend','<div class="ui-modal-dim"></div>');

				const elModalWrap = elModal.querySelector('.ui-modal-wrap');
				const elModalBody = elModalWrap.querySelector('.ui-modal-body');
				const elModalHeader = elModalWrap.querySelector('.ui-modal-header');
				const elModalFooter = elModalWrap.querySelector('.ui-modal-footer');
				const elModalTit = elModal.querySelector('.ui-modal-tit');
				const elModalDim = elModal.querySelector('.ui-modal-dim');
				const elModalCancel = elModal.querySelector('.ui-modal-cancel');
				const elModalConfirm = elModal.querySelector('.ui-modal-confirm');
				const elModalClose = elModal.querySelector('.ui-modal-close');
				const elModalOpen = doc.querySelectorAll('.ui-modal.open');
				const openLen = !!elModalOpen ? elModalOpen.length : 0;

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

				const headerH = !!elModalHeader ? elModalHeader.offsetHeight : 0;
				const footerH = !!elModalFooter ? elModalFooter.offsetHeight : 0;
				const space = !!full ? 0 : mg;

				//[set] position
				switch (ps) {
					case 'center' :
						elModal.classList.add('ps-center');
						break;
					case 'top' :
						elModal.classList.add('ps-top');
						break;
					case 'bottom' :
						elModal.classList.add('ps-bottom');
						break;
					default :
						elModal.classList.add('ps-center');
						break;
				}
				
				//[set] full type / width & height
				(!!full) && elModal.classList.add('type-full');
				(!!width) ? elModalWrap.style.width = width : '';
				elModalBody.style.height = (!height) ? '100%' : height + 'px';
				elModalBody.style.maxHeight = win.innerHeight - (headerH + footerH + (space * 2))  + 'px';
				elModalBody.style.maxWidth = win.innerWidth - (space * 2) + 'px';
				
				clearTimeout(timer);
				timer = setTimeout(function(){
					Global.focus.loop({ 
						selector: elModal, 
					});

					elModal.classList.add('open');
					(!!sZindex) ? elModal.style.zIndex = sZindex : '';
					(win.innerHeight < elModalWrap.offsetHeight) ? 
						elModal.classList.add('is-over'):
						elModal.classList.remove('is-over');

					!!elModalTit && elModalTit.focus();
					!!callback && callback(id);

					//dim event
					elModalDim.addEventListener('click', Global.modal.dimAct);
				},150);

				//close button event
				if (!!elModalClose) {
					elModalClose.addEventListener('click', closeAct);
				}
				function closeAct(e){
					const elThis = e.currentTarget;
					const elThisModal = elThis.closest('.ui-modal');

					netive.modal.hide({ 
						id: elThisModal.id, 
						remove: remove,
						callbackClose: callbackClose
					});
				}

				//systyem modal confirm & cancel callback
				elModalConfirm && elModalConfirm.addEventListener('click', sConfirmCallback);
				elModalCancel && elModalCancel.addEventListener('click', sCancelCallback);
			
				//transition end event
				elModalWrap.addEventListener('transitionend', modalTrEnd);
				function modalTrEnd(){
					if (!!full) {
						elModal.classList.add('fix-header');
						elModalBody.style.paddingTop = (headerH + 10)  + 'px';
					}
				}

				//resize event
				let timerResize;
				win.addEventListener('resize', winResize);
				function winResize() {
					clearTimeout(timerResize);
					timerResize = setTimeout(function(){
						Global.modal.reset();
					}, 200);
				}
			}
		},
		dimAct: () => {
			const elOpens = doc.querySelectorAll('.ui-modal.open');
			let openN = [];

			for (let elOpen of elOpens) {
				elOpen.dataset.n && openN.push(elOpen.dataset.n);
			}

			const elCurrent = doc.querySelector('.ui-modal.open[data-n="'+ Math.max.apply(null, openN) +'"]');
			const currentID = elCurrent.id;

			//system modal 제외
			if (currentID !== 'uiSystemModal') {
				netive.modal.hide({ 
					id: currentID, 
					remove: elCurrent.dataset.remove
				});
			}
		},
		reset: () => {
			const elModals = doc.querySelectorAll('.ui-modal.open.ps-center');

			for (let elModal of elModals) {
				const elModalHead = elModal.querySelector('.ui-modal-header');
				const elModalBody = elModal.querySelector('.ui-modal-body');
				const elModalFoot = elModal.querySelector('.ui-modal-footer');
				const h_win = win.innerHeight;
				const h_head = elModalHead.outerHeight();
				const h_foot = elModalFoot.outerHeight();
				const h = h_win - (h_head + h_foot);

				if (Global.browser.size !== 'desktop') {
					elModalBody.style.minHeight = h + 'px';
					elModalBody.style.maxHeight = h + 'px';
				} else {
					elModalBody.style.minHeight = '';
					elModalBody.style.maxHeight = '';
				}
			}
		},
		hide: function(option){
			const opt = Object.assign({}, Global.modal.optionsClose, option);
			const {id, type, remove, callback} = opt;
			const elModal = doc.querySelector('#' + id);
			const elBody = doc.querySelector('body');
			const elHtml = doc.querySelector('html');
			const elModals = doc.querySelectorAll('.ui-modal');

			elModal.classList.add('close');
			elModal.classList.remove('open')
			elModal.classList.remove('fix-header');
			
			const elOpen = doc.querySelectorAll('.ui-modal.open');
			const len = (elOpen.length > 0) ? elOpen.length : false;

			let timer;
			let endfocus = opt.endfocus ;
			let elModalPrev = false;
			
			for (let md of elModals) {
				md.classList.remove('current');
			}

			if (!!len) {
				elModalPrev = doc.querySelector('.ui-modal.open.n' + (len - 1));
				elModalPrev.classList.add('current');
			}

			//시스템팝업이 아닌 경우
			if (type !== 'system') {
				if (!len) {
					//단일
					endfocus = endfocus === false ? 
						doc.querySelector('[data-focus="'+id+'"]') : 
						opt.endfocus;

					//$('html').off('click.uimodaldim');
					elHtml.classList.remove('is-modal');
				} else {
					//여러개
					endfocus = endfocus === false ? 
						doc.querySelector('[data-focus="'+id+'"]') : 
						opt.endfocus;
				}
			}

			Global.scroll.move({
				top: Number(elModal.dataset.scrolltop)
			});
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				const elWrap = elModal.querySelector('.ui-modal-wrap');
				const elOpen = doc.querySelectorAll('.ui-modal.open');
				const len = !!elOpen ? elOpen.length : false;
	
				elWrap.removeAttribute('style');
				elBody.removeAttribute('style');
				elModal.dataset.n = null;
				
				if (!len) {
					elHtml.classList.remove('scroll-no');
					elBody.classList.remove('scroll-no');
				}

				(remove === 'true') && elModal.remove();
				!!callback && callback(id);
				!!endfocus && endfocus.focus();
			},210);
		}, 
		hideSystem: () => {
			netive.modal.hide({ 
				id: 'uiSystemModal', 
				type: 'system', 
				remove: 'true'
			});
		}
	}

	Global.toast = {
		timer : null,
		options : {
			delay: 'short',
			classname : '',
			conts: ''
		},
		show : function(option) {
			const opt = Object.assign({}, this.options, option);
			const {delay, classname, conts} = opt;
			const el_body = document.querySelector('body');

			let toast = '<div class="ui-toast toast '+ classname +'">'+ conts +'</div>';
			let time = (delay === 'short') ? 2000 : 3500;

			if (delay === 'short') {
				time = 2000;
			} else if(delay === 'long') {
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
			
			const el_toast = doc.querySelector('.ui-toast');
			
			el_body.classList.add('ui-toast-ready');

			setTimeout(function(){
				el_body.classList.add('ui-toast-show');
				el_toast.addEventListener('transitionend', act);
			},0);

			function act(e){
				const that = e.currentTarget;

				that.removeEventListener('transitionend', act);
				that.classList.add('on');
				Global.toast.timer = setTimeout(Global.toast.hide, time);
			}
		},
		hide : function(){
			const el_body = doc.querySelector('body');
			const el_toast = doc.querySelector('.ui-toast');

			if (!!el_toast) {
				clearTimeout(Global.toast.timer);
				el_body.classList.remove('ui-toast-show');

				el_toast.removeEventListener('transitionend', act);
				el_toast.addEventListener('transitionend', act);

				function act(e){
					const that = e.currentTarget;

					that.removeEventListener('transitionend', act);
					that.remove();
					el_body.classList.remove('ui-toast-ready');
				}
			}
		}
	}

	Global.tooltip = {
		options: {
			visible: null,
			id: false,
			ps: false
		},
		timerShow: null,
		timerHide: null,
		show: function(e){
			e.preventDefault();

			const elBody = doc.querySelector('body');
			const el = e.currentTarget;
			const elId = el.getAttribute('aria-describedby');
			const elSrc = el.dataset.src;
			const evType = e.type;

			let elTooltip = doc.querySelector('#' + elId);

			if (!!elSrc && !elTooltip) {	
				elBody.insertAdjacentHTML('beforeend', '<div class="ui-tooltip" id="'+ elId +'" role="tooltip" aria-hidden="true"><div class="ui-tooltip-arrow"></div>');
				Global.ajax.init({
					area: doc.querySelector('#' + elId),
					url: elSrc,
					add: true,
					callback: function(){						
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

			function act(){
				elTooltip = doc.querySelector('#' + elId);

				const tooltips = doc.querySelectorAll('.ui-tooltip');
				const btns = doc.querySelectorAll('.ui-tooltip-btn');
				const elArrow = elTooltip.querySelector('.ui-tooltip-arrow');
				const classToggle = evType !== 'click' ? 'add' : 'remove';
				
				if (evType === 'click' && el.dataset.view !== 'fix') {
					for (let tts of tooltips) {
						if (tts.id !== elId) {
							tts.removeAttribute('style');
							tts.setAttribute('aria-hidden', true);
						}
					}

					for (let bs of btns) {
						bs.dataset.view = 'unfix';
					}

					el.dataset.view = 'fix';

					doc.removeEventListener('click', Global.tooltip.back);
					setTimeout(function(){
						doc.addEventListener('click', Global.tooltip.back);
					},0);
				}

				for (let tts of tooltips) {
					if (tts.id !== elId) {
						tts.classList.remove('hover');
					}
				}

				elTooltip.classList[classToggle]('hover');

				const elT = el.getBoundingClientRect().top;
				const elL = el.getBoundingClientRect().left;
				const elW = el.offsetWidth;
				const elH = el.offsetHeight;
				const wW = win.innerWidth;
				const wH = win.innerHeight;
				const dT = doc.documentElement.scrollTop;
				const dL = doc.documentElement.scrollLeft;

				clearTimeout(Global.tooltip.timerHide);
				Global.tooltip.timerShow = setTimeout(function(){
					const tW = Math.floor(elTooltip.offsetWidth);
					const left = (tW / 2 > (elL - dL) + (elW / 2)) ? 10 : elL - (tW / 2) + (elW / 2);
					wW < Math.floor(left) + tW ? elTooltip.style.right = '10px' : '';
					elTooltip.style.left = Math.floor(left) + 'px';

					const tH = Math.floor(elTooltip.offsetHeight);
					const top = (elT - dT > wH / 2) ? elT + dT - tH - 8 : elT + elH + dT + 8;
					elTooltip.style.top = Math.floor(top) + 'px';

					const arrow = (elT - dT > wH / 2) ? 'top' : 'bottom';
					elArrow.style.left = Math.floor(elL - left + (elW / 2)) + 'px';

					elTooltip.dataset.ps = arrow;
					elTooltip.setAttribute('aria-hidden', false);
					console.log(Math.floor(left) + tW, wW);
				},100);
				
				el.addEventListener('blur', Global.tooltip.hide);
				el.addEventListener('mouseleave', Global.tooltip.hide);
			}
		},
		back: function(e){
			e.preventDefault();

			const tooltips = doc.querySelectorAll('.ui-tooltip');
			const btns = doc.querySelectorAll('.ui-tooltip-btn');

			for (let tts of tooltips) {
				tts.setAttribute('aria-hidden', true);
			}

			for (let bs of btns) {
				bs.dataset.view = 'unfix';
			}

			doc.removeEventListener('click', Global.tooltip.back);
		},
		hide: function(e){
			e.preventDefault();

			const el = e.currentTarget;
			const elId = el.getAttribute('aria-describedby');
			const elTooltip = doc.querySelector('#' + elId);

			if (el.dataset.view !== 'fix') {
				clearTimeout(Global.tooltip.timerShow);
				elTooltip.classList.remove('hover');
				elTooltip.setAttribute('aria-hidden', true);
			}

			el.removeEventListener('blur', Global.tooltip.hide);
			el.removeEventListener('mouseleave', Global.tooltip.hide);
		},
		init: function(opt) {
			const option = Object.assign({}, Global.tooltip.options, opt);
			const el_btn = doc.querySelectorAll('.ui-tooltip-btn');

			for (let btn of el_btn) {
				btn.addEventListener('mouseover', Global.tooltip.show);
				btn.addEventListener('focus', Global.tooltip.show);
				btn.addEventListener('click', Global.tooltip.show);
				win.addEventListener('resize',  Global.tooltip.back);
			}
		}
	}

	Global.floating = {
		init: function() {
			const el_body = document.body;
			const el_items = doc.querySelectorAll('.ui-floating');

			el_body.dataset.fixheight = 0;

			//setting
			for (let that of el_items) {
				const fix = that.dataset.fix;
				const ps = that.dataset.ps;
				const el_wrap = that.querySelector('.ui-floating-wrap');
				const mg = Number(that.dataset.mg ?? 0);
				const elH = el_wrap.offsetHeight;
				const elT = that.getBoundingClientRect().top;
				const wH = win.innerHeight;

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
						if ((elT - wH) + elH + mg >= 0 && fix === 'true') {
							el_wrap.style.transform = 'translateY(-' + mg + 'px)';
						} else {
							that.dataset.state = 'normal';
						}
					}
				} else {
					that.dataset.state = 'normal';
				}
			}

			window.removeEventListener('scroll', this.scrollAct);
			window.addEventListener('scroll', this.scrollAct);
		},
		scrollAct: function(){
			const elBody = document.body;
			const el_items = doc.querySelectorAll('.ui-floating');

			for (let that of el_items) {
				const fix = that.dataset.fix;
				const ps = that.dataset.ps;
				const state = that.dataset.state;
				const el_wrap = that.querySelector('.ui-floating-wrap');
				const mg = Number(that.dataset.mg ?? 0);
				const elH = el_wrap.offsetHeight;
				const elT = that.getBoundingClientRect().top;
				const wH = win.innerHeight;

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
						if ((elT - wH) + elH + mg <= 0 && fix === 'true') {
							that.dataset.state = 'normal';
							el_wrap.style.transform = 'translateY(0)';
						}

						if ((elT - wH) + elH + mg >= 0 && fix === 'false') {
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
						if ((elT - wH) + elH + mg >= 0 && fix === 'true') {
							that.dataset.state = 'fix';
							el_wrap.style.transform = 'translateY(-' + mg + 'px)';
						}

						if ((elT - wH) + elH + mg <= 0 && fix === 'false') {
							that.dataset.state = 'fix';
							el_wrap.style.transform = 'translateY(-' + mg + 'px)';
						}
					}
				}
			}
		},
		range: function() {
			const el_ranges = doc.querySelectorAll('.ui-floating-range');
			
			window.removeEventListener('scroll', act);
			window.addEventListener('scroll', act);
							
			function act(){
				for (let el_range of el_ranges) {
					const el_item = el_range.querySelector('.ui-floating-range-item');
					const mg = el_range.dataset.mg ?? 0;
					const itemH = el_item.offsetHeight;
					const wrapT = el_range.getBoundingClientRect().top;
					const wrapH = el_range.offsetHeight;
					const wT = win.pageYOffset;

					if (wT > (wrapT + wT - mg)) {
						if (wrapH - itemH >= wT - (wrapT + wT - mg)) {
							el_item.style.top = (wT - (wrapT + wT - mg)) + 'px';
						}
					} else {
						el_item.style.top = 0;
					}
				}
			}
		}
	}

	Global.tab = {
		options: {
			current: 0,
			onePanel: false,
			callback: false,
			effect: false,
			align : 'center'
		},
		init: function(option) {
			const opt = Object.assign({}, this.options, option);
			const id = opt.id;
			const effect = opt.effect;
			let current = isNaN(opt.current) ? 0 : opt.current;
			const onePanel = opt.onePanel;
			const callback = opt.callback;
			const align = opt.align;
			const el_tab = doc.querySelector('#' + id);
			const el_btnwrap = el_tab.querySelector(':scope > .ui-tab-btns');
			const el_wrap = el_btnwrap.querySelector(':scope > .btn-wrap');
			const el_btns = el_btnwrap.querySelectorAll('.ui-tab-btn');
			const el_pnlwrap = el_tab.querySelector(':scope > .ui-tab-pnls');
			const el_pnls = el_pnlwrap.querySelectorAll(':scope > .ui-tab-pnl');
			const keys = Global.state.keys;
			const para = Global.para.get('tab');

			let paras;
			let paraname;

			//set up
			if (!!para) {
				if (para.split('+').length > 1) {
					//2 or more : tab=exeAcco1*2+exeAcco2*3
					paras = para.split('+');

					for (var j = 0; j < paras.length; j++ ) {
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
			}

			//set up
			!!effect && el_tab.classList.add(effect);
			el_btnwrap.setAttribute('role','tablist');

			//setting
			for (let i = 0, len = el_btns.length; i < len; i++) {
				const el_btn = el_btns[i];
				const el_pnl = el_pnls[i];

				el_btn.setAttribute('role','tab');

				if (!el_btn.dataset.tab) {
					el_btn.dataset.tab = i;
				}
				el_btn.dataset.len = len;
				el_btn.dataset.n = i;

				const n = Number(el_btn.dataset.tab);
				const isCurrent = Number(current) === n;
				const cls = isCurrent ? 'add' : 'remove';

				
				if (!el_btn.id) {
					el_btn.id = id + 'Btn' + n;
				} 

				if (!onePanel) {
					el_pnl.setAttribute('role','tabpanel');

					if (!el_pnl.dataset.tab) {
						el_pnl.dataset.tab = i;
					}

					if (!el_pnl.id) {
						el_pnl.id = id + 'pnl' + n;
					} 
				} else {
					el_pnls[0].setAttribute('role','tabpanel');
					el_pnls[0].dataset.tab = current;
					el_pnls[0].id = id + 'pnl' + current;
				}
  
				const btnID = el_btn.id;
				const pnlID = !onePanel ? el_pnl.id : el_pnls[0].id;

				el_btn.setAttribute('aria-controls', pnlID);
				el_btn.classList[cls]('selected');

				if (!onePanel) {
					el_pnl.setAttribute('aria-labelledby', btnID);

					if ((Number(current) === Number(el_pnl.dataset.tab))) {
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
				i === len - 1 && el_btn.setAttribute('tab-last', true);

				if (isCurrent) {
					Global.scroll.move({ 
						selector: el_btnwrap, 
						left: el_btn.getBoundingClientRect().left + el_btnwrap.scrollLeft, 
						add : 0,
						align: align 
					});
				}

				el_btn.addEventListener('click', evtClick);
				el_btn.addEventListener('keydown', evtKeys);
			}

			callback && callback(opt);
			
			//event
			function evtClick(e) {
				Global.tab.toggle({ 
					id: id, 
					current: Number(e.currentTarget.dataset.tab), 
					align:align,
					onePanel:onePanel,
					callback:callback
				}); 
			}
			function evtKeys(e) {
				const that = this;
				const n = Number(that.dataset.n);
				const m = Number(that.dataset.len);

				switch(e.keyCode){
					case keys.up: upLeftKey(e);
					break;

					case keys.left: upLeftKey(e);
					break;

					case keys.down: downRightKey(e);
					break;

					case keys.right: downRightKey(e);
					break;

					case keys.end: endKey(e);
					break;

					case keys.home: homeKey(e);
					break;
				}

				function upLeftKey(e) {
					e.preventDefault();
					!that.getAttribute('tab-first') ? 
					Global.tab.toggle({ id: id, current: n - 1, align:align }): 
					Global.tab.toggle({ id: id, current: m - 1, align:align});
				}
				function downRightKey(e) {
					e.preventDefault();
					!that.getAttribute('tab-last') ? 
					Global.tab.toggle({ id: id, current: n + 1, align:align }): 
					Global.tab.toggle({ id: id, current: 0, align:align });
				}
				function endKey(e) {
					e.preventDefault();
					Global.tab.toggle({ id: id, current: m - 1, align:align });
				}
				function homeKey(e) {
					e.preventDefault();
					Global.tab.toggle({ id: id, current: 0, align:align });
				}
			}
		},
		toggle: function(option) {
			const opt = Object.assign({}, this.options, option);

			const id = opt.id;
			const callback = opt.callback;
			const el_tab = doc.querySelector('#' + id);
			const el_btnwrap = el_tab.querySelector(':scope > .ui-tab-btns');
			const el_btn = el_btnwrap.querySelectorAll('.ui-tab-btn');
			const el_pnlwrap = el_tab.querySelector(':scope > .ui-tab-pnls');
			const el_pnls = el_pnlwrap.querySelectorAll(':scope > .ui-tab-pnl');
			const current = isNaN(opt.current) ? 0 : opt.current;
			const onePanel = opt.onePanel;
			const align = opt.align;
			const el_current = el_btnwrap.querySelector('.ui-tab-btn[data-tab="'+ current +'"]');
			const el_pnlcurrent = el_pnlwrap.querySelector('.ui-tab-pnl[data-tab="'+ current +'"]');
			const btnId = el_current.id;
			let el_scroll = el_btnwrap.querySelector(':scope > .ui-scrollbar-item');

			for(let that of el_btn) {
				that.classList.remove('selected');
			}
			console.log(id);
			
			el_current.classList.add('selected')
			el_current.focus();

			if (!el_scroll) {
				el_scroll = el_btnwrap;
			}

			Global.scroll.move({ 
				selector: el_btnwrap, 
				left: el_current.getBoundingClientRect().left + el_scroll.scrollLeft, 
				add : 0,
				align: align 
			});

			if (!onePanel) {
				for (let that of el_pnls) {
					that.setAttribute('aria-hidden', true);
					that.classList.remove('selected');
				}
				
				el_pnlcurrent.classList.add('selected');
				el_pnlcurrent.setAttribute('aria-hidden', false);
			} else {
				el_pnls[0].setAttribute('aria-hidden', false);
				el_pnls[0].setAttribute('aria-labelledby', btnId);
			}

			callback && callback(opt);
		}
	}

	/* 작업필요 */
	Global.project = {
		list: function(opt){
			Global.ajax.init({
				area: document.querySelector('#' + opt.id),
				url: opt.url, 
				page: false, 
				callback: callback 
			});
			
			function callback(v) {
				const dataExecel = JSON.parse(v); 
				let today = new Date();
				
				today = getFormatDate(today); 

				function getFormatDate(date){
					const year = date.getFullYear();
					let month = (1 + date.getMonth());
					let day = date.getDate();

					month = month >= 10 ? month : '0' + month;
					day = day >= 10 ? day : '0' + day;

					return  year + '-' + month + '-' + day;
				}

				function changeFormatDate(date){
					const year = date.substring(0,4);
					let month = date.substring(5,6); 
					let day = date.substring(6,8);

					month = month >= 10 ? month : '0' + month;
					day = day >= 10 ? day : '0' + day; 

					return year + '-' + month + '-' + day; 
				}

				function dateDiff(_date1, _date2) {
					let diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
					let diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);

					diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
					diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());

					const isAbs = diffDate_2.getTime() - diffDate_1.getTime() < 0 ? '' : '-';
					let diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());

					diff = isAbs + Math.ceil(diff / (1000 * 3600 * 24));
				
					return diff;
				}

				let state, date, enddate, moddate, pub, dev, id, idm, memo, overl;
				let d1, d2, d3, d4, d5, d6, d7, d8;
				let r1, r2, r3, r4;
				let d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_;
				let c1, c2, c3, c4, c5, c6, c7, c8;

				let	endsum = 0, delsum = 0, tstsum = 0, ingsum = 0, watsum = 0, chksum = 0, num = -1,
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

				const len = dataExecel.list.length

				for (let i = 0; i < len; i++) {
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

					(d1 !== '') ? d1_ = dataExecel.list[i - 1 < 0 ? 0 : i].d1 : d1 = d1_;

					(dataExecel.list[i].d1 === '') ?
						(d2 !== '') ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2 = d2_ :
						(!!dataExecel.list[i - 1 < 0 ? 0 : i].d2) ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i].d2 : d2_ = '';

					(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '') ?
						(d3 !== '') ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3 = d3_ :
						(!!dataExecel.list[i - 1 < 0 ? 0 : i].d3) ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i].d3 : d3_ = '';

					(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '') ?
						(d4 !== '') ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4 = d4_ :
						(!!dataExecel.list[i - 1 < 0 ? 0 : i].d4) ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i].d4 : d4_ = '';

					(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '') ?
						(d5 !== '') ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5 = d5_ :
						(!!dataExecel.list[i - 1 < 0 ? 0 : i].d5) ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i].d5 : d5_ = '';

					(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '') ?
						(d6 !== '') ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6 = d6_ :
						(!!dataExecel.list[i - 1 < 0 ? 0 : i].d6) ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i].d6 : d6_ = '';

					(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '' && dataExecel.list[i].d6 === '') ?
						(d7 !== '') ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7 = d7_ :
						(!!dataExecel.list[i - 1 < 0 ? 0 : i].d7) ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i].d7 : d7_ = '';

					!!dataExecel.list[i].d1 ? d1 = dataExecel.list[i].d1 : '';
					!!dataExecel.list[i].d2 ? d2 = dataExecel.list[i].d2 : '';
					!!dataExecel.list[i].d3 ? d3 = dataExecel.list[i].d3 : '';
					!!dataExecel.list[i].d4 ? d4 = dataExecel.list[i].d4 : '';
					!!dataExecel.list[i].d5 ? d5 = dataExecel.list[i].d5 : '';
					!!dataExecel.list[i].d6 ? d6 = dataExecel.list[i].d6 : '';
					!!dataExecel.list[i].d7 ? d7 = dataExecel.list[i].d7 : '';
					!!dataExecel.list[i].d8 ? d8 = dataExecel.list[i].d8 : '';

					endsum = (state === "완료") ? endsum + 1 : endsum;
					tstsum = (state === "검수") ? tstsum + 1 : tstsum;
					delsum = (state === "제외") ? delsum + 1 : delsum;
					watsum = (state === "대기") ? watsum + 1 : watsum;

					const x = (i === 0) ? 0 : i - 1;

					c1 = (dataExecel.list[i].d1 !== dataExecel.list[x].d1) ? ' c1' : '';
					c2 = (dataExecel.list[i].d2 !== dataExecel.list[x].d2) ? ' c2' : '';
					c3 = (dataExecel.list[i].d3 !== dataExecel.list[x].d3) ? ' c3' : '';
					c4 = (dataExecel.list[i].d4 !== dataExecel.list[x].d4) ? ' c4' : '';
					c5 = (dataExecel.list[i].d5 !== dataExecel.list[x].d5) ? ' c5' : '';
					c6 = (dataExecel.list[i].d6 !== dataExecel.list[x].d6) ? ' c6' : '';
					c7 = (dataExecel.list[i].d7 !== dataExecel.list[x].d7) ? ' c7' : '';
					c8 = (dataExecel.list[i].d8 !== dataExecel.list[x].d8) ? ' c8' : '';

					cls2 = 
						state === '완료' ? 'end' : 
						state === '검수' ? 'tst' : 
						state === '제외' ? 'del' : 
						state === '약관' ? 'trm' : '';

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
						table += '<col class="col-1">';//상태
						table += '<col class="col-2">';//일정
						table += '<col class="col-2">';//완료일
						table += '<col class="col-2">';//수정일

						table += '<col class="col-3">';//퍼블담당자
						table += '<col class="col-3">';//개발담당자

						table += '<col class="col-4">';//화면아이디
						table += '</colgroup>';

						table += '<colgroup>';
						(dataExecel.list[i].d1 !== undefined) ? table += '<col class="col-5">' : '';
						(dataExecel.list[i].d2 !== undefined) ? table += '<col class="col-5">' : '';
						(dataExecel.list[i].d3 !== undefined) ? table += '<col class="col-5">' : '';
						(dataExecel.list[i].d4 !== undefined) ? table += '<col class="col-5">' : '';
						(dataExecel.list[i].d5 !== undefined) ? table += '<col class="col-5">' : '';
						(dataExecel.list[i].d6 !== undefined) ? table += '<col class="col-5">' : '';
						(dataExecel.list[i].d7 !== undefined) ? table += '<col class="col-5">' : '';
						(dataExecel.list[i].d8 !== undefined) ? table += '<col class="col-5">' : '';
						table += '</colgroup>';

						table += '<col class="col-6">';//메모

						table += '<thead>';
						table += '<th scope="col">' + state + '</th>';
						table += '<th scope="col">' + date + '</th>';
						table += '<th scope="col">' + enddate + '</th>';
						table += '<th scope="col">' + moddate + '</th>';
						table += '<th scope="col">' + pub + '</th>';
						table += '<th scope="col">' + dev + '</th>';

						table += '<th scope="col">' + id + '</th>';
						(dataExecel.list[i].d1 !== undefined) ? table += '<th scope="col">' + d1 + '</th>' : '';
						(dataExecel.list[i].d2 !== undefined) ? table += '<th scope="col">' + d2 + '</th>' : '';
						(dataExecel.list[i].d3 !== undefined) ? table += '<th scope="col">' + d3 + '</th>' : '';
						(dataExecel.list[i].d4 !== undefined) ? table += '<th scope="col">' + d4 + '</th>' : '';
						(dataExecel.list[i].d5 !== undefined) ? table += '<th scope="col">' + d5 + '</th>' : '';
						(dataExecel.list[i].d6 !== undefined) ? table += '<th scope="col">' + d6 + '</th>' : '';
						(dataExecel.list[i].d7 !== undefined) ? table += '<th scope="col">' + d7 + '</th>' : '';
						(dataExecel.list[i].d8 !== undefined) ? table += '<th scope="col">' + d8 + '</th>' : '';
						table += '<th scope="col">' + memo + '</th>';
						table += '</thead>';
						table += '</tbody>';
					} else if (state !== '제외') {
						num = num + 1;

						if (!(date === '미정' || date === '일정' || date === undefined) && state !== '완료' && state !== '검수' && state !== '체크') {
							let dateStart = date;

							dateStart = changeFormatDate(dateStart)

							const care = dateDiff(dateStart, new Date());
		
							if (care < 3 && care >= 0) {
								cls = cls + ' sch_care';
							} else if (care < 0) {
								cls = cls + ' sch_warn';
							}
						}

						Global.state.device.mobile ?
							table += '<tr class="' + cls + '" >' :
							table += '<tr class="' + cls + '">';
						table += '<td class="state"><span>' + state + '</span></td>';
						table += '<td class="date"><span>' + date.substring(4,10) + '</span></td>';
						table += '<td class="enddate"><span>' + enddate.substring(4,10) + '</span></td>';
						table += '<td class="moddate"><span>' + moddate.substring(4,10) + '</span></td>';
						table += '<td class="name pub"><span>' + pub + '</span></td>';
						table += '<td class="name dev"><span>' + dev + '</span></td>';
						table += id !== '' ?
							'<td class="id ico_pg"><span><a href="/netiveUI/html/index.html?page=' + id + '" target="coding">' + id + '</a></span></td>' :
							//'<td class="id ico_pg"><span><a href="' + root + '/' + id + '.html" target="coding">' + id + '</a></span></td>' :
							'<td class="id "><span></span></td>';	
						(dataExecel.list[i].d1 !== '') ? table += '<td class="d d1"><span>' + d1 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].d2 !== '') ? table += '<td class="d d2"><span>' + d2 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].d3 !== '') ? table += '<td class="d d3"><span>' + d3 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].d4 !== '') ? table += '<td class="d d4"><span>' + d4 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].d5 !== '') ? table += '<td class="d d5"><span>' + d5 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].d6 !== '') ? table += '<td class="d d6"><span>' + d6 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].d7 !== '') ? table += '<td class="d d7"><span>' + d7 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].d8 !== '') ? table += '<td class="d d8"><span>' + d8 + '</span></td>' : table += '<td class="d"></td>';
						(dataExecel.list[i].memo === '') ? table += '<td class="memo none"><span>' + memo + '</span></td>' : table += '<td class="memo"><span>' + memo + '</span></td>';
						table += '</tr>';
						(i === len - 1) ? table += '</tbody>' : '';
						(i === len - 1) ? table += '</table>' : '';
					}
					table += '</div>';
					root = '';
				}

				const codinglist = doc.querySelector('#' + opt.id);

				codinglist.innerHTML = table;
				table = '';

				let info = '<div class="ui-codinglist-header">';
				info += '<div class="ui-codinglist-state"><dl><dt>'+ today +'</dt><dd>'
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

				
				
				codinglist.insertAdjacentHTML('afterbegin', info);

				const el_info = doc.querySelector('.ui-codinglist-info');
				const el_total = el_info.querySelector('.total');
				const el_all = el_info.querySelector('.n_all');
				const el_end = el_info.querySelector('.n_end');
				const el_tst = el_info.querySelector('.n_tst');
				const el_per0 = el_info.querySelector('.per0');
				const el_bar = doc.querySelector('.ui-codinglist-state .bar');
				const srchCode = doc.querySelector('#projectListSrchCode');
				const srchBtn = doc.querySelector('#projectListSrchBtn');
				const srchBtnRe = doc.querySelector('#projectListSrchRe');

				el_end.textContent = endsum;
				el_tst.textContent = tstsum;
				el_total.textContent = (len - delsum - 1);
				el_all.textContent = (endsum + tstsum);
				el_per0.textContent = ((endsum + tstsum) / (len - delsum - 1) * 100).toFixed(0);
				el_bar.style.width = ((endsum + tstsum) / (len - delsum - 1) * 100).toFixed(0) + '%';

				if (srchCode.value !== '') {
					var temp = $('.ui-codinglist tbody tr td *:contains('+ $('#projectListSrchCode').val() +')');

					$('.ui-codinglist tbody tr').hide();
					$(temp).closest('tr').show();
				}

				srchBtnRe.addEventListener('click', function(){
					const el = doc.querySelector('.ui-codinglist tbody');
					const el_tr = el.querySelectorAll('tr');

					srchCode.value = '';
					for (let that of el_tr) {
						that.classList.remove('srch-hidden');
					}
				});
				srchBtn.addEventListener('click', srchAct);
				srchCode.addEventListener('keyup', function(){
					if (win.event.keyCode === 13) {
						srchAct();
					}
				});

				function srchAct(){
					const k = srchCode.value;
					const el = doc.querySelector('.ui-codinglist tbody');
					const el_td = el.querySelectorAll('td');
					const el_tr = el.querySelectorAll('tr');

					for (let that of el_tr) {
						that.classList.add('srch-hidden');
					}

					for (let that of el_td) {
						const text = that.textContent;
						const el_tr2 = that.closest('tr');

						console.log(text.indexOf(k), text, k);

						if (text.indexOf(k) >= 0) {
							console.log(1111);
							
							el_tr2.classList.remove('srch-hidden');
						} 
					}
				}

				const pjl = document.querySelector('#projectList');
				const pjl_thead = pjl.querySelector('table thead');
				const pjl_th = pjl_thead.querySelectorAll('th');

				for (let i = 0; i < pjl_th.length; i++) {
					pjl_th[i].addEventListener('click', function(){
						Global.table.sort({
							id: opt.id,
							n: i
						});
					});
				}
			}
		}
	}

	

	/* 작업필요 */
	Global.count = {
		step: function(opt) {
			const el = doc.querySelector('#' + opt.id);
			const countNum = !!opt.value === true ? opt.value : el.textContent;

			let count = 0;
			let timer, diff, counter;
			let add = Math.ceil((countNum - count) / (countNum - count), -2);
			let j = 1;
			let v = 0;
			let s = 100;
			
			if (el.dataset.ing !== 'true') {
				counter = function(){
					j = v < 10 ? j = 0 : v < 10 ? j + 11 : v < 40 ? j + 111 : v < 70 ? j + 1111 : j + 11111;
					s = s < 0 ? s = 0 : s - 10;
					diff = countNum - count;
					(diff > 0) ? count += add + j : '';

					const n = Global.parts.comma(count);
					el.textContent = n;
					v = v + 1;

					if(count < countNum) {
						timer = setTimeout(function() { 
							counter(); 
						}, s);
					} else {
						el.textContent = Global.parts.comma(countNum);
						clearTimeout(timer);
					}
				}
				counter();
			}
		}
	}

	/* 작업필요 */
	Global.slot = {
		play: {},
		init: function(opt) {
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
				cut, clone;
			
			//common set up
			$slot.data('n', len).data('single', single);
			$item.each(function(i){
				$(this).attr('n', i + 1).data('n', i + 1);
			});
			
			//single or multi set up
			if (single) {
				$wrap.css({ 
					marginTop: 0, 
					top: (current - 1) * item_h * -1
				});
				itemClone({ n: 0, append: true });
			} else {
				$wrap.css({ 
					marginTop: ((item_h/2) + item_h) * -1, 
					top: 0
				});
				if (current - 1 > 0) {
					for(var i = 0; i < current - 1; i++){
						// 2일경우
						if (current - 2 === i) {
							itemClone({ n: i - 1, append: false });
							itemClone({ n: i, append: true });
							itemClone({ n: i + 1, append: true });
							itemClone({ n: i + 2, append: true });
						} else {
							cut = $item.eq(i).detach();
							$wrap.append(cut);
						}
					}
				} else {
					itemClone({ n: - 1, append: false });
					itemClone({ n: - 2, append: false });
					itemClone({ n: current - 1, append: true });
					itemClone({ n: current, append: true });
				}
			}
	
			function itemClone(opt) {
				//var stickitem = opt.append ? 'append' : 'prepend';
				clone = $item.eq(opt.n).clone().addClass('clone').removeAttr('n');
				$wrap[opt.append ? 'append' : 'prepend'](clone);
			}
			auto ? Global.slot.start(opt) : '';
		},
		start: function(opt) {
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
			
			function steplot(){
				$wrap.css('top', 0).stop().animate({
					top: single ? item_h * (len - 1) * -1 : Math.ceil(item_h * (len - 3) * -1)
				},s , 'linear') ;
				win.clearInterval(Global.slot[opt.id]);
				Global.slot[opt.id] = win.setInterval(steplot, s);
			}
		},
		stop: function(opt) {
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
				index =  $wrap.find('.ui-slot-item[n="' + result + '"]').index(),
				x = single ? index : index - 2,
				timer, t, s = 500;
			
			$slot.data('ing', false);
			$item.removeClass('selected');
			single ? $wrap.css('margin-top', 0): '';
	
			clearTimeout(timer);
			timer = setTimeout(function(){
				win.clearInterval(Global.slot[opt.id]);
				t = item_h * x * -1 > 0 ? item_h * x : item_h * x * -1;
				$wrap.stop().animate({
					top: t
				},1000, function(){
					$wrap.find('.ui-slot-item').eq(index).addClass('selected');
					callback(result);
				});
			},10);
		}
	}

	/* 작업필요 */
	Global.draggable = {
		init: function(opt) {
			var $wrap = $('#' + opt.id);
			var $item = $wrap.find('.ui-draggable-item');
			var $area = $wrap.find('.ui-draggable-area');
			var scale = 1;
			var $svg = $wrap.find('svg');
			
			//기본값 세팅
			$(window).off('resize.aaa').on('resize.aaa', function(){
				set();
			});
			set();
			function set(){
				scale =1;
				$item.each(function(i){
					var $this = $(this);
					
					$this.addClass('original');
					$this.attr('orgt', $this.offset().top / scale - ($wrap.offset().top / scale));
					$this.attr('orgl', $this.offset().left / scale - ($wrap.offset().left / scale));
					
					if (!$this.attr('onlymove')) {
						$this.after($this.clone().removeClass('original').addClass('clone').prop('disabled', true));
					}
					if (!!$this.attr('line')) {
						var nm = $this.attr('name');
						var strokWidth = 4 / scale;
						var lineX = Number($this.attr('orgl')) + ($this.outerWidth() / 2 / scale ) - strokWidth / 2;
						var lineY = Number($this.attr('orgt')) + ($this.outerHeight() / 2 / scale ) - strokWidth / 2;

						$this.attr('linex', lineX);
						$this.attr('liney', lineY);
						$svg.find('line[name="'+ nm +'"]')
							.attr('x1', lineX)
							.attr('y1', lineY)
							.attr('x2', lineX)
							.attr('y2', lineY)
							.attr('stroke-width', strokWidth);
					}
				});

				$wrap.attr('ts',$wrap.offset().top / scale);
				$wrap.attr('te',$wrap.offset().top / scale + $wrap.outerHeight() / scale);
				$wrap.attr('ls',$wrap.offset().left / scale);
				$wrap.attr('le',$wrap.offset().left / scale + $wrap.outerWidth() / scale);

				$area.each(function(i){
					scale = 1;
					var $this = $(this);

					$this.attr('ts',$this.offset().top / scale);
					$this.attr('te',$this.offset().top / scale + $this.outerHeight() / scale);
					$this.attr('ls',$this.offset().left / scale);
					$this.attr('le',$this.offset().left / scale + $this.outerWidth() / scale);
				});

				$item.off('mousedown.drag').on('mousedown.drag', function (e) {
					scale = 1;
					//dragStart(e, this);
					var $this = $(this);
					var $wrap_ = $this.closest('.ui-draggable');
					var itemName = $this.attr('name');
					var $area = $wrap_.find('.ui-draggable-area[name="'+ itemName +'"]');
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
						var nowT = y - (itemH / 2) - off_tw;
						var nowL = x - (itemW / 2) - off_lw;
						
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
							for(var i = 0; i < arrTs.length; i++) {
								var isInVer = (nowT * scale > arrTs[i] - (itemH * scale / 2) && nowT * scale < arrTe[i] - (itemH * scale / 2));
								var isInHor = (nowL * scale > arrLs[i] - (itemW * scale / 2) && nowL * scale < arrLe[i] - (itemW * scale / 2));

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

							$svg.find('line[name="'+ lineName +'"]')
								.attr('x2', lineX)
								.attr('y2', lineY);

							(0 > nowT) && $svg.find('line[name="'+ lineName +'"]').attr('y2', 0);
							(scopeH < nowT) && $svg.find('line[name="'+ lineName +'"]').attr('y2', scopeH);
							(0 > nowL) && $svg.find('line[name="'+ lineName +'"]').attr('x2', 0);
							(scopeW < nowL) && $svg.find('line[name="'+ lineName +'"]').attr('x2', scopeW);
						}
						
						$this.css({
							top: nowT + 'px',
							left: nowL + 'px'
						});
					}).off('mouseup.drag').on('mouseup.drag', function (e) {
						if (moving && !onlymove) {
							var nowT = $this.position().top + (itemH / 2);
							var nowL = $this.position().left + (itemW / 2);

							for(var i = 0; i < arrTs.length; i++) {
								var isIn = (nowT > arrTs[i] && nowT < arrTe[i]) && (nowL > arrLs[i] && nowL < arrLe[i]);
								var $area_ = $area.eq(i);

								if (isIn && !$area_.attr('full')) {
									if(!$area_.attr('full')) {
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
									$svg.find('line[name="'+ lineName +'"]')
										.attr('x2', $this.attr('linex'))
										.attr('y2', $this.attr('liney'));
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
		reset: function(opt) {
			var $wrap = opt !== undefined ? $('#' + opt.id) :$('.ui-draggable');
			var $item = $wrap.find('.ui-draggable-item');
			var $area = $wrap.find('.ui-draggable-area');
			var $svg = $wrap.find('svg');

			$('body').removeAttr('draggable');
			$area.removeClass('ok').removeAttr('full');
			$item.each(function(){
				var $this = $(this);

				$this.prop('disabled', false).removeClass('ok');
				$this.stop().animate({
					top: $this.attr('orgt') + 'px',
					left: $this.attr('orgl') + 'px'
				});

				if (!!$this.attr('line')) {
					var nm = $this.attr('name');
					
					$svg.find('line[name="'+ nm +'"]')
						.attr('x2', $this.attr('linex'))
						.attr('y2', $this.attr('liney'));
				}
			});
		}
	}
	

})(window, document);
