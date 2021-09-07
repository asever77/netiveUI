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
;(function ($, win, doc, undefined) {

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
			
			selector.innerHTML = new_html;
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
			if (!!selector[0]) {
				selector = selector[0];
			}

			console.log('move:', option);

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
						let n = ((areaT - (start - s)) * 0.003).toFixed(2);
						let styleData = el_item.dataset.css;

						n = n < 0 ? 0 : n > 1 ? 1 : n;

						styleData = styleData.replace(/{n}/gi, n);
						styleData = styleData.replace(/{nn}/gi, n * 10);
						styleData = styleData.replace(/{nnn}/gi, n * 100);
						styleData = styleData.replace(/{-n}/gi, (1 - n).toFixed(2));
						styleData = styleData.replace(/{-nn}/gi, (10 - n * 10).toFixed(2));
						styleData = styleData.replace(/{-nnn}/gi, (100 - n * 100).toFixed(2));

						el_item.setAttribute('style', styleData);
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

	Global.scrollBar = {
		options : {
			selector: false,
			callback:false,
			infiniteCallback:false,
			space: false,
			remove: false
		},
		init: function(opt){
			var opt = $.extend(true, {}, this.options, opt);
			var selector = opt.id;
			var space = opt.space;
			var callback = opt.callback;
			var infiniteCallback = opt.infiniteCallback;
			var remove = opt.remove;
			var $base = !selector ? $('.ui-scrollbar') : typeof selector === 'object' ? selector : $('[scroll-id="' + selector +'"]');
			var timerResize;
			
			// if (Global.support.touch) {
			// 	return false;
			// } 

			$base.each(function () {
				!remove ? scrollbarReady($(this)) : scrollbarRemove($(this));
			});
			function scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space){
				var $wrap = t;
				var	$item = $wrap.children('.ui-scrollbar-item');

				if (!$item.length) {
					return false;
				}

				var nWrapH = $wrap.outerHeight();
				var nWrapW = $wrap.outerWidth();
				var nItemH = $item.prop('scrollHeight');
				var nItemW = $item.prop('scrollWidth');
				var changeH = (itemH !== nItemH || wrapH !== nWrapH);
				var changeW = (itemW !== nItemW || wrapW !== nWrapW);
				var timer;

				$(win).on('resize', function(){
					clearTimeout(timerResize);
					timerResize = setTimeout(function(){
						$wrap.css('height','');						
						nWrapH = $wrap.outerHeight();
						$wrap.css('height', nWrapH);
					}, 300);
				});

				if (changeH || changeW) {
					var barH = Math.floor(nWrapH / (nItemH / 100));
					var barW = Math.floor(nWrapW / (nItemW / 100));
					var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
					var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

					changeH && $barY.css('height', barH + '%').data('height', barH);
					changeW && $barX.css('width', barW + '%').data('width', barW);
					
					(nWrapH < nItemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
					(nWrapW < nItemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');

					$wrap.data(
						'opt', {
							'itemH':nItemH, 
							'itemW':nItemW, 
							'wrapH':nWrapH, 
							'wrapW':nWrapW 
						});
					eventFn();
					scrollEvent($item, space);
				}

				clearTimeout(timer);
				timer = setTimeout(function(){
					scrollbarUpdate(t, nWrapH, nWrapW, nItemH, nItemW);
				}, 300);
			}
			function scrollbarRemove(t){
				var $wrap = t;

				$wrap.removeClass('ready view-scrollbar').removeData('infiniteCallback').removeData('ready').removeAttr('style');
				$wrap.find('> .ui-scrollbar-item').contents().unwrap();
				$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
				$wrap.find('> .ui-scrollbar-barwrap').remove();
			}
			function scrollbarReady(t) {
				var $wrap = t;
				var	html_scrollbar = '';

				$wrap.removeClass('ready').data('infiniteCallback', infiniteCallback).data('ready', false);
				$wrap.find('> .ui-scrollbar-item').contents().unwrap();
				$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
				$wrap.find('> .ui-scrollbar-barwrap').remove();

				var wrapW = $wrap.innerWidth();
				var wrapH = $wrap.outerHeight();

				$wrap.wrapInner('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap"></div></div>');

				var	$item = $wrap.find('> .ui-scrollbar-item');
				var	$itemWrap = $item.find('> .ui-scrollbar-wrap');

				var cssDisplay = $wrap.css('display');
				var cssPadding = $wrap.css('padding');

				$itemWrap.css({
					display: cssDisplay,
					padding: cssPadding
				});

				if (!space) {
					cssDisplay === 'inline-block' && $itemWrap.css('display','block');
					$itemWrap.css('width','100%');
				} 

				!space && $item.css('width','100%');
				$wrap.css('overflow','hidden');

				var itemW =  $item.prop('scrollWidth');
				var itemH =$item.prop('scrollHeight');

				$wrap.data('opt', {'itemH':itemH, 'itemW':itemW, 'wrapH':wrapH, 'wrapW':wrapW });
				
				var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

				//idN = idN === undefined ? 0 : idN;
				
				if (!$wrap.data('ready') || !$wrap.attr('scroll-id')) {
					
					if (!$wrap.attr('scroll-id')) {
						$wrap.attr('scroll-id', 'uiScrollBar_' + idN).data('ready', true).addClass('ready');
						idN = idN + 1;
						sessionStorage.setItem('scrollbarID', idN);
					} else {
						$wrap.data('ready', true).addClass('ready');
					}

					$item.attr('tabindex', 0);
					$wrap.css('height', wrapH + 'px');
					
					if (space) {
						$item.addClass('scroll-y-padding');
						$item.addClass('scroll-x-padding');
					} else {
						!!$wrap.parent('.ui-tablescroll').length && $wrap.parent('.ui-tablescroll').addClass('not-space');
					}

					html_scrollbar += '<div class="ui-scrollbar-barwrap type-y" >';
					html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="y"><span class="hide">scroll</span></button>';
					html_scrollbar += '</div>';
					html_scrollbar += '<div class="ui-scrollbar-barwrap type-x" >';
					html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="x"><span class="hide">scroll</span></button>';
					html_scrollbar += '</div>';
					
					$wrap.prepend(html_scrollbar);

					(wrapH < itemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
					(wrapW < itemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');

					var barH = Math.floor(wrapH / (itemH / 100));
					var barW = Math.floor(wrapW / (itemW / 100));
					var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
					var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
					
					$barY.css('height', barH + '%').data('height', barH);
					$barX.css('width', barW + '%').data('width', barW);

					$wrap.addClass('view-scrollbar');
					!!callback && callback(); 
					scrollEvent($item);
					scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space);
					eventFn();
				}
			}	
			function eventFn(){
				$(doc).find('.ui-scrollbar-item').off('scroll.uiscr').on('scroll.uiscr', function(){
					scrollEvent(this);
				});
				$(doc).find('.ui-scrollbar-bar').off('mousedown.bar touchstart.bar').on('mousedown.bar touchstart.bar', function(e) {
					dragMoveAct(e, this);
				});
			}	
			function scrollEvent(t){
				var $this = $(t),
					$wrap = $this.closest('.ui-scrollbar'),
					$barY = $wrap.find('> .type-y .ui-scrollbar-bar'),
					$barX = $wrap.find('> .type-x .ui-scrollbar-bar');
				
				var opt = $wrap.data('opt');

				if (opt === undefined) {
					return false;
				}

				var itemH = opt.itemH,
					itemW = opt.itemW,
					wrapH = opt.wrapH,
					wrapW = opt.wrapW;

				var scrT = $this.scrollTop(),
					scrL = $this.scrollLeft(),
					barH = $barY.data('height'),
					barW = $barX.data('width');
				
				var hPer = Math.round(scrT / (itemH - wrapH) * 100),
					_hPer = (barH / 100) * hPer,
					wPer = Math.round(scrL / (itemW - wrapW) * 100),
					_wPer = (barW / 100) * wPer;

				var _infiniteCallback = $wrap.data('infiniteCallback');

				$barY.css('top', hPer - _hPer + '%');
				$barX.css('left', wPer - _wPer + '%');

				if (!!_infiniteCallback) {
					hPer === 100 && _infiniteCallback(); 
				}
			}
			function dragMoveAct(e, t) {
				var $bar = $(t),
					$uiScrollbar = $bar.closest('.ui-scrollbar'),
					$barWrap = $bar.closest('.ui-scrollbar-barwrap'),
					$wrap = $bar.closest('.ui-scrollbar'),
					$item = $uiScrollbar.find('> .ui-scrollbar-item');

				var off_t = $barWrap.offset().top,
					w_h = $barWrap.innerHeight(),
					off_l = $barWrap.offset().left,
					w_w = $barWrap.innerWidth(),
					barH = $bar.data('height'),
					barW = $bar.data('width'),
					opt = $wrap.data('opt');

				var yRPer, xRPer;
				var $btn = e.target;
				var isXY = $btn.getAttribute('data-scrollxy');
				
				$('body').addClass('scrollbar-move');

				$(doc).off('mousemove.bar touchmove.bar').on('mousemove.bar touchmove.bar', function (e) {
					var y_m, 
						x_m;
					
					if (e.touches === undefined) {
						if (e.pageY !== undefined) {
							y_m = e.pageY;
						} else if (e.pageY === undefined) {
							y_m = e.clientY;
						}

						if (e.pageX !== undefined) {
							x_m = e.pageX;
						} else if (e.pageX === undefined) {
							x_m = e.clientX;
						}
					}

					var yR = y_m - off_t;
					var xR = x_m - off_l;

					yR < 0 ? yR = 0 : '';
					yR > w_h ? yR = w_h : '';
					xR < 0 ? xR = 0 : '';
					xR > w_w ? xR = w_w : '';

					yRPer = yR / w_h * 100;
					xRPer = xR / w_w * 100;
					var nPerY = (yRPer - (barH / 100 * yRPer)).toFixed(2);
					var nPerX = (xRPer - (barW / 100 * xRPer)).toFixed(2);

					if (isXY === 'y') {
						$bar.css('top', nPerY + '%');
						$item.scrollTop(opt.itemH * nPerY / 100);
					} else {
						$bar.css('left', nPerX + '%');
						$item.scrollLeft(opt.itemW * nPerX / 100);
					}

				}).off('mouseup.bar touchcancel.bar touchend.bar').on('mouseup.bar touchcancel.bar touchend.bar', function () {
					var _infiniteCallback = $wrap.data('infiniteCallback');

					if (!!_infiniteCallback) {
						yRPer === 100 && _infiniteCallback(); 
					}

					$('body').removeClass('scrollbar-move');
					$(doc).off('mousemove.bar mouseup.bar touchmove.bar');
				});
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
			const opt = $.extend(true, {}, this.options, option);
			const {name,width,height,align,toolbar,location,menubar,status,resizable,scrollbars,link} = opt;
			let {top,left} = opt;

			if (align === 'center') {
				left = ($(win).outerWidth() / 2) - (width / 2);
				top = ($(win).outerHeight() / 2) - (height / 2);
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
		caption: function(){
			const el_captions = doc.querySelectorAll('.ui-caption');

			for (let el_caption of el_captions) {
				el_caption.textContent = '';
			
				const el_table = el_caption.closest('table');
				const ths = el_table.querySelectorAll('th');
				let captionTxt = '';

				for (let th of ths) {
					const txt = th.textContent;
					
					(captionTxt !== '') ?
						captionTxt += ', ' + txt:
						captionTxt += txt;
				}

				el_caption.textContent = captionTxt + ' 정보입니다.';
			}
		},
		scrollOption: {
			callback:false
		},
		scroll: function(option){
			const opt = Object.assign({}, this.scrollOption, option);
			const callback = opt.callback;
			const el_wraps = doc.querySelectorAll('.ui-tablescroll');

			for (let el_wrap of el_wraps) {
				const el_tblWrap = el_wrap.querySelector('.ui-tablescroll-wrap');
				const el_tbl = el_tblWrap.querySelector('table');
				const cloneTable = el_tbl.cloneNode(true);

				if (!el_tbl.querySelector('.ui-tablescroll-clone')) {
					el_wrap.prepend(cloneTable);

					const clone_tbl = el_wrap.querySelector(':scope > table:first-child');
					const clone_ths = clone_tbl.querySelectorAll('th');
					const clone_caption = clone_tbl.querySelector('caption');
					const clone_tbodys = clone_tbl.querySelectorAll('tbody');

					clone_caption.remove();

					for (let clone_tbody of clone_tbodys) {
						clone_tbody.remove();
					}

					clone_tbl.classList.add('ui-tablescroll-clone');
					clone_tbl.setAttribute('aria-hidden', true);

					for (let clone_th of clone_ths) {
						clone_th.setAttribute('aria-hidden', true);
					}
				}
			}

			!!callback && callback();
		},
		fixTd : function() {
			const el_tbls = doc.querySelectorAll('.ui-fixtd');
			
			for (let el_tbl of el_tbls) {
				const el_tblCols = el_tbl.querySelectorAll('col');
				const el_tblTrs = el_tbl.querySelectorAll('tr');

				const fix_n = Number(el_tbl.dataset.fix);
				const view_n = Number(el_tbl.dataset.view);
				const col_len = el_tblCols.length;
				const fix_sum = col_len - fix_n;
				const len = el_tblTrs.length;
				let tit = [];
	
				el_tbl.setAttribute('data-current', 1)
				el_tbl.setAttribute('data-total', col_len);
	
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

				const el_btns = el_tbl.querySelectorAll('.ui-fixtd-btn');

				for (let el_btn of el_btns) {
					el_btn.addEventListener('click', act);
				}
			}

			function act(e){
				const that = e.currentTarget;
				const el_table = that.closest('.ui-fixtd');
				const this_sum = Number(el_table.dataset.total - el_table.dataset.fix);
				let n = Number(el_table.dataset.current);
				
				(that.dataset.btn === 'next') ? 
					el_table.dataset.current = (n + 1 > this_sum) ? n = 1 : n + 1:
					el_table.dataset.current = (n - 1 <= 0) ? n = this_sum : n - 1;
			}
		}
	}

	Global.form = {
		init: function(opt){
			const el_inps = doc.querySelectorAll('.inp-base');

			for (let el_inp of el_inps) {
				const el_wrap = el_inp.parentNode;
				const el_form = el_inp.closest('[class*="ui-form"]');
				const unit = el_inp.dataset.unit;
				const prefix = el_inp.dataset.prefix;
				const el_label = el_form.querySelector('.form-item-label');
				let el_unit = el_wrap.querySelector('.unit');
				let el_prefix = el_wrap.querySelector('.prefix');
				let space = 0;

				el_inp.removeAttribute('style');
				el_unit && el_unit.remove();
				el_prefix && el_prefix.remove();

				const pdr = parseFloat(doc.defaultView.getComputedStyle(el_inp).getPropertyValue('padding-right'));
				const pdl = parseFloat(doc.defaultView.getComputedStyle(el_inp).getPropertyValue('padding-left'));

				if (unit !== undefined) {
					el_wrap.insertAdjacentHTML('beforeend', '<div class="unit">'+unit+'</div>');
					el_unit = el_wrap.querySelector('.unit');
					space = Math.floor(el_unit.offsetWidth) + (pdr / 2) ;
				}

				el_inp.style.paddingRight = Number(space + pdr);;
				el_inp.dataset.pdr = space + pdr;
				el_inp.setAttribute('pdr', space + pdr);
				space = 0;
				
				if (prefix !== undefined) {					
					el_wrap.insertAdjacentHTML('afterbegin', '<div class="prefix">'+prefix+'</div>');
					el_prefix = el_wrap.querySelector('.prefix');
					space = Math.floor(el_prefix.offsetWidth) + pdl;
					el_inp.style.paddingLeft = (space + pdl) + 'px';
					el_inp.dataset.pdl = space + pdl;
					el_label.style.marginLeft = space + 'px';
				}

				this.isValue(el_inp,false);
				el_inp.style.paddingLeft = space + pdl;
				el_inp.dataset.pdl = space + pdl;

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

				el_inp.removeEventListener('keyup', this.actValue);
				el_inp.removeEventListener('focus', this.actValue);
				el_inp.removeEventListener('blur', this.actUnValue);

				el_inp.addEventListener('keyup', this.actValue);
				el_inp.addEventListener('focus', this.actValue);
				el_inp.addEventListener('blur', this.actUnValue);
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
			const that = e.currentTarget;
			const wrap = that.parentNode;
			const el_clear = wrap.querySelector('.ui-clear');
			const pdr = Number(that.dataset.pdr);

			Global.form.isValue(that, false);

			setTimeout(function(){
				that.style.paddingRight = pdr + 'px'; 
				el_clear && el_clear.remove();
			},100);
		},
		isValue: function (that, value){
			const el_that = that;
			const el_wrap = el_that.parentNode;
			const el_inner = el_that.closest('.ui-form-inner');
			const el_inp = el_wrap.querySelector('.inp-base');

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
			
			if (el_that.readonly || el_that.disabled || el_that.type === 'date') {
				return false;
			}

			if (el_that.value === undefined || el_that.value === '') {
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
			var is_dim = !!$('.sheet-dim').length;
			var callback = opt === undefined || opt.callback === undefined ? false : opt.callback;

			if (is_dim) {
				Global.sheets.dim(false);
			}
			
			if (!opt) {
				var el_dp = document.querySelectorAll('.datepicker');

				for (var el_dps of el_dp) {
					el_dps.remove();
				}
			} else {
				var el_dp = document.querySelector('.datepicker[data-id="'+ opt.id +'"]');

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
			var setId = opt.id;
			var currentDate = opt.date;
			var endDate = opt.date;
			var title = opt.title;
			var el_inp = document.querySelector('#' + setId);
			var el_uidp = el_inp.closest('.ui-datepicker');
			var el_start = el_uidp.querySelector('[data-period="start"]');
			var el_end = el_uidp.querySelector('[data-period="end"]');
			var setDate = (opt.date === '' || opt.date === undefined) ? new Date(): opt.date;
			var period = (opt.period === '' || opt.period === undefined) ? false : opt.period;
			var area = (opt.area === '' || opt.area === undefined) ? document.querySelector('body') : opt.area;
			var date = new Date(setDate);
			var _viewYear = date.getFullYear();
			var _viewMonth = date.getMonth();
			var el_dp = document.querySelector('.datepicker[data-id="'+setId+'"]');
			var yyyymm = _viewYear + '-' + Global.parts.add0(_viewMonth + 1);
			var _dpHtml = '';
			var callback = opt === undefined || opt.callback === undefined ? false : opt.callback;
			
			Global.datepicker.destroy();

			if (!!period || !!el_end) {
				period = true;
				endDate = el_end.value;
			}
			if (!el_dp) {
				console.log(!!currentDate);
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
			var viewYear = date.getFullYear();
			var viewMonth = date.getMonth();
			var viewDay = date.getDate();
			//오늘
			var _viewYear = today.getFullYear();
			var _viewMonth = today.getMonth();
			var _viewDay = today.getDate();
			//선택한 날
			var start_viewYear = null;
			var start_viewMonth = null;
			var start_viewDay = null;
			//선택한 날
			var end_viewYear = null;
			var end_viewMonth = null;
			var end_viewDay = null;
			//최소
			var min_viewYear = min_day.getFullYear();
			var min_viewMonth = min_day.getMonth();
			var min_viewDay = min_day.getDate();
			//최대
			var max_viewYear = max_day.getFullYear();
			var max_viewMonth = max_day.getMonth();
			var max_viewDay = max_day.getDate();
			
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
			var prevLast = new Date(viewYear, viewMonth, 0);
			var thisLast = new Date(viewYear, viewMonth + 1, 0);
			var PLDate = prevLast.getDate();
			var PLDay = prevLast.getDay();
			var TLDate = thisLast.getDate();
			var TLDay = thisLast.getDay();
			var prevDates = [];
			var thisDates = [...Array(TLDate + 1).keys()].slice(1);
			var nextDates = [];

			//prevDates 계산
			if (PLDay !== 6) {
				for(var i = 0; i < PLDay + 1; i++) {
					prevDates.unshift('');
				}
			}

			//nextDates 계산
			for(var i = 1; i < 7 - TLDay; i++) {
				nextDates.unshift('');
			}

			//dates 합치기
			var dates = prevDates.concat(thisDates, nextDates);
			var _dpHtml = '';

			//dates 정리
			dates.forEach((date,i) => {
				var _class = '';
				var _disabled = false;

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
				var _day = (date === start_viewDay && viewYear === start_viewYear && viewMonth === start_viewMonth) ? 
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

			var dp_tbody = el_dp.querySelector('.datepicker-date');
			var dp_y = el_dp.querySelector('.datepicker-yy');
			var dp_m = el_dp.querySelector('.datepicker-mm');
			var getData = el_dp.dataset.date.split('-');
			
			dp_y.innerHTML = getData[0];
			dp_m.innerHTML = getData[1];
			dp_tbody.innerHTML = _dpHtml;

			var dayBtn = dp_tbody.querySelectorAll('.datepicker-day');
			var len = dayBtn.length;

			for (var i = 0; i < len; i++) {
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

				var isShift = !!window.event.shiftKey;
				var n = Number(e.currentTarget.dataset.n);
				var current = n;
				var keycode = e.keyCode;
				var keys = Global.state.keys;

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

			period = (!!el_dp.dataset.end) ? 'end' : period;

			if (!period) {
				//single mode
				el_dp.dataset.start = selectDay;

				for (var dayBtns of dayBtn) {
					dayBtns.classList.remove('selected-start');
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
			
			// end date 값 넘기기
			

			

			
		},
		nextYear: (event) => {
			var dpId = event.target.dataset.dpid;
			var el_inp = document.querySelector('#' + dpId);
			var el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
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
			var min_day = min_date.getDay();

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
			var dpId = event.target.dataset.dpid;
			var el_inp = document.querySelector('#' + dpId);
			var el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
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
			var min_month = min_date.getMonth() + 1;

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
			var dpId = event.target.dataset.dpid;
			var el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			var date = new Date(el_dp.dataset.date);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			
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
			var dpId = event.target.dataset.dpid;
			var el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			var date = new Date(el_dp.dataset.date);
			var year = date.getFullYear();
			var month = date.getMonth();
			
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
			var dpId = event.target.dataset.dpid;
			var el_dp = document.querySelector('.datepicker[data-id="'+dpId+'"]');
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			
			console.log('goToday', dpId, date);

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
				$('.sheet-dim').removeClass('on');
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
				el_sheet.style.top = (win_h - ((off_t - scr_t) + base_h) > wrap_h) ? (off_t + base_h) + 'px' : (off_t - wrap_h) + 'px';

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
				
				const el_dims = doc.querySelectorAll('.dim-select');
				const el_confirms = doc.querySelectorAll('.ui-select-confirm');
				const el_cancels = doc.querySelectorAll('.ui-select-cancel');
				const el_btns = doc.querySelectorAll('.ui-select-btn');
				const el_opts = doc.querySelectorAll('.ui-select-opt');
				const el_wraps = doc.querySelectorAll('.ui-select-wrap');
				const el_labels = doc.querySelectorAll('.ui-select-label');
				const el_selects = doc.querySelectorAll('.ui-select select');

				for (let el_dim of el_dims) {
					// el_dim.addEventListener('click', selectClick);
				}

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

				for (let el_opt of el_opts) {
					el_opt.addEventListener('click', optClick);
					el_opt.addEventListener('mouseover', selectOver);
				}

				for (let el_wrap of el_wraps) {
					el_wrap.addEventListener('mouseleave', selectLeave);
					//el_wrap.addEventListener('blur', optBlur);
				}

				for (let el_label of el_labels) {
					el_label.addEventListener('click', labelClick);
				}

				for (let el_select of el_selects) {
					el_select.removeEventListener('change', Global.select.selectChange);
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
			function optClick() {
				const _uiSelect = this.closest('.ui-select');
				const _btn = _uiSelect.querySelector('.ui-select-btn');
				const el_select = _uiSelect.querySelector('select');
				const _wrap = _uiSelect.querySelector('.ui-select-wrap');
				const idx = Global.parts.getIndex(this);

				if (customscroll) {
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
			}

			function selectOver() {
				const body = doc.querySelector('body');

				body.dataset.selectopen = false;
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
				const el_optwrap = el_wrap.querySelector('.ui-select-opts');
				const el_opts = el_optwrap.querySelectorAll('.ui-select-opt');
				const el_select = el_uiselect.querySelector('select');
				const el_option = el_select.querySelectorAll('option');

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

				console.log('optOpen');
				
				if (customscroll) {
					Global.scrollBar.init({
						selector: el_wrap
					});

					Global.scroll.move({ 
						top: Number(opt_h * n) , 
						selector: el_wrap.querySelector(':scope > .ui-scrollbar-item'), 
						effect: 'auto', 
						align: 'default' 
					});
				} else {
					Global.scroll.move({ 
						top: Number(opt_h * n) , 
						selector: el_wrap, 
						effect: 'auto', 
						align: 'default' 
					});
				}

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
				var $this = $(this);

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

				el_select.onchange();

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

					if (current === 'all') {
						el_btn.dataset.selected = true;
						el_btn.setAttribute('aria-expanded', true);
						el_pnl.setAttribute('aria-hidden', false);
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
						}
					}
				} else {
					el_btn.dataset.selected = isDown;
					el_btn.setAttribute('aria-expanded', isDown);

					if (!!el_pnl) {
						el_pnl.setAttribute('aria-hidden', !isDown);
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
				
				doc.removeEventListener('click', Global.dropdown.back);
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

	/* 작업필요 */
	Global.floating = {
	
		options: {
			ps: 'bottom',
			add: false,
			fix: true,
			callback: false
		}, 
		base: function(opt) {
			var opt = opt === undefined ? {} : opt,
				opt = $.extend(true, {}, Global.floating.options, opt),
				id = opt.id,
				ps = opt.ps,
				add = opt.add,
				fix = opt.fix,
				callback = opt.callback,
				$id = $('#' + id),
				$idwrap = $id.find('.ui-floating-wrap'),
				$add = $('#' + add),
				$addwrap = $add.find('.ui-floating-wrap').length ? $add.find('.ui-floating-wrap') : $add,
				c = 'ui-fixed-' + ps,
				timer;
			
			!!fix ? $id.addClass(c) : '';
			
			if ($id.length) {
				clearTimeout(timer);
				timer = setTimeout(act, 300);
			}
			
			$(win).on('scroll.win', function(){
				if ($id.length) {
					act();
					clearTimeout(timer);
					timer = setTimeout(act, 500);
				}
			});
			
			function act(){
				var tt = Math.ceil($id.offset().top),
					th = Math.ceil($idwrap.outerHeight()),
					st = $(win).scrollTop(),
					wh = Math.ceil( Global.state.device.mobile ? window.screen.height : $(win).outerHeight() ),
					dh = Math.ceil($(doc).outerHeight()),
					lh = (!!add) ? $add.outerHeight() : 0 ,
					lt = (!!add) ? dh - ($add.offset().top).toFixed(0) : 0,
					lb = 0, 
					_lb;
				
				$idwrap.removeAttr('style');
				$id.data('fixbottom', th);

				console.log($add, lh);

				if (!!add) {
					if ($add.data('fixbottom') === undefined) {
						$add.data('fixbottom', th + $addwrap.outerHeight());
					}
				}

				!!add ? lh = lh + Number($add.data('fixtop') === undefined ? 0 : $add.data('fixtop')) : '';
				!!callback ? callback({ id:id, scrolltop:st, boundaryline: tt - lh }) : '';
				$id.css('height', th);

				// 상단으로 고정
				if (ps === 'top') {
					// 고정 > 흐름
					if (fix === true) {
						if (tt - lh <= st) { 
							$id.removeClass(c).data('fixtop', false);
							$idwrap.removeAttr('style');
						} else { 
							$id.addClass(c).data('fixtop', lh);
							$idwrap.css('top', lh);
						}
					} 
					// 흐름 > 고정	
					else {
						if (tt - lh <= st) { 
							$id.addClass(c).data('fixtop', lh);
							$idwrap.css('top', lh);
						} else { 
							$id.removeClass(c).data('fixtop', false);
							$idwrap.removeAttr('style');
						}
					}
				} 
				// 하단으로 고정
				else if (ps === 'bottom') {
					if (!!add) { 
						lb = th + Number($add.data('fixbottom'));
						$id.data('fixbottom', lb);
					}
					_lb = (lb - th < 0) ? 0 : lb - th;
					// 고정 > 흐름
					if (fix === true) {
						if (tt + th + _lb - wh <= st) { 
							$id.removeClass(c);
							$idwrap.removeAttr('style');
						} else {
							$id.addClass(c)
							$idwrap.css('bottom', _lb);
						}
							
					// 흐름 > 고정		
					} else {
						if (tt + th + _lb - wh <= st) {
							$id.addClass(c);
							$idwrap.css('bottom', _lb);
						} else {
							$id.removeClass(c);
							$idwrap.removeAttr('style');
						}
					}
				}
			}
		},
		range: function(opt) {
			var opt = opt === undefined ? {} : opt,
				id = opt.id,
				mg = opt.margin ?? 0,
				$range = $('#' + id),
				$item = $range.find('.ui-floating-range-item'),
				item_h = $item.outerHeight(),
				range_t = $range.offset().top,
				range_h = $range.outerHeight(),
				win_scrt = $(win).scrollTop(),
				itemTop = $item.position().top;
							
			$(win).on('scroll.win', function(){
				act();
			});
			
			function act(){
				range_t = $range.offset().top;
				range_h = $range.outerHeight();
				win_scrt = $(win).scrollTop();
				
				if (range_t <= (win_scrt - itemTop + mg)) {
					if ((range_t + range_h) - item_h < (win_scrt + mg)) {
						$item.css('top', range_h - item_h - itemTop);
					} else {
						$item.css('top', (win_scrt - itemTop + mg) - range_t );
					}
				} else {
					$item.css('top', 0);
				}
			}
		}
	}

	/* 작업필요 */
	Global.masonry = {
		options: {
			fixCol: {
				1500:4,
				1200:3,
				800:2,
				400:1,
			},
			response: true
		},
		init: function(opt){
			if (opt === undefined) { return false; }
		
			var opt = opt === undefined ? {} : opt,
				opt = $.extend(true, {}, Global.masonry.options, opt),
				$base = $('#' + opt.id), 
				$item = $base.find('.ui-bricklist-item').not('.disabled'),
				fixCol = opt.fixCol,
				re = opt.response,
				wrapW = $base.outerWidth(),
				itemW = $item.outerWidth(),
				itemSum = $item.length,
				itemCol = Math.floor(wrapW / itemW),
				itemRow = (itemSum / itemCol) + (itemSum % itemCol) ? 1 : 0,
				itemTopArray = [],
				timer;

			if (!!fixCol) {
				var key = Object.keys(fixCol);
				key.sort(function(a,b){
					return a - b;
				});
				var fixCol__;
				for (var i = 0; i < key.length; i++) {
					if (Number(key[i]) > $(win).outerWidth()) {
						fixCol__ = fixCol[key[i]];
						break;
					} else {
						fixCol__ = fixCol[key[key.length - 1]];
					}
				}

				itemCol = fixCol__;
				if (!!re) {
					itemW = wrapW / fixCol__;
				}
			} 
			$base.data('orgcol', itemCol);

			//the number of columns 
			for (var i = 0; i < itemCol; i++) {		
				var $itemN = $item.eq(i);

				$itemN.attr('role','listitem').css({
					position: 'absolute',
					left : itemW * i,
					top : 0
				});

				if (!!fixCol && !!re) {
					$itemN.css('width', itemW + 'px');
				} 
				itemTopArray[i] = 0;
			}
			//save option information
			$base.data('opt', { 
				'wrap': wrapW, 
				'width': itemW, 
				'itemTopArray': itemTopArray, 
				'row': itemRow, 
				'col': itemCol, 
				'response': re,
				'fixCol': fixCol,
				'start': 0
			});

			Global.masonry.act({ id: opt.id });
			var winW = $(win).outerWidth();
			if (re) {
				$(win).off('resize.win').on('resize.win', function(){
					var $uiBricklist = $('.ui-bricklist');

					clearTimeout(timer);
					timer = setTimeout(function(){
						if (winW !== $(win).outerWidth()) {
							console.log('re');
							$uiBricklist.each(function(){
								var $this = $(this);
								var dataOpt = $this.data('opt');
								var reColN = Math.floor($this.outerWidth() / $this.find('.ui-bricklist-item').outerWidth());

								if ($this.data('orgcol') !== reColN || !!dataOpt.fixCol) {
									Global.masonry.init({ 
										id : $this.attr('id'),
										fixCol: dataOpt.fixCol,
										response: dataOpt.response
									});
									
									$this.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, itemTopArray));
								}
							});
						}
					},300);
				});
			}	
		},
		act: function(opt){
			if (opt === undefined) { return false; }
		
			var $base = $('#' + opt.id), 
				$item = $base.find('.ui-bricklist-item').not('.disabled'),
				dataOpt = $base.data('opt'),
				fixCol = dataOpt.fixCol,
				re = dataOpt.response,
				wrapW = dataOpt.wrap,
				itemW = dataOpt.width,
				itemRow = dataOpt.row,
				itemTopArray = dataOpt.itemTopArray,
				itemSum = $item.length;
			
			//netive.uiLoading({ id: opt.id, visible:true });

			var n = dataOpt.start;
			var timer;
			var setItem = function(){
				var $itemN = $item.eq(n);
				var $itemImg = $itemN.find('img');
				
				$itemImg.attr('src', $itemImg.attr('data-src'));
				$itemImg.load(function(){
					if (!!fixCol && !!re) {
						$itemN.css('width', itemW + 'px');
					} 
					
					var minH = Math.min.apply(null, itemTopArray);
					var nextN = itemTopArray.indexOf(minH);
					var itemH = Number($itemN.outerHeight());

					$itemN.attr('data-left', itemW * nextN).attr('data-top', itemTopArray[nextN]);
					itemTopArray[nextN] = Number(minH + itemH);
					n = n + 1;

					clearTimeout(timer);
					if (n < itemSum) {
						setItem();
					} else {
						Global.loading.hide();
					}

					timer = setTimeout(function(){
						$item.each(function(){
							$(this).css({
								position: 'absolute',
								top : $(this).attr('data-top') + 'px',
								left:  $(this).attr('data-left') + 'px'
							}).addClass('on');
						});
						$base.data('opt', { 
							'wrap': wrapW, 
							'width':itemW, 
							'itemTopArray':itemTopArray, 
							'row':itemRow, 
							'col':n, 
							'response': re,
							'fixCol': fixCol,
							'start': itemSum 
						});
						$base.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, itemTopArray));
					},100);
				});
			} 
			setItem();
		}
	}

	/* 작업필요 */
	Global.tab = {
		options: {
			current: 0,
			onePanel: false,
			callback: false,
			effect: false,
			align : 'center'
		},
		init: function(opt) {
			var opt = opt === undefined ? {} : opt;
			var opt = $.extend(true, {}, Global.tab.options, opt);
			var id = opt.id;
			var effect = opt.effect;
			var current = isNaN(opt.current) ? 0 : opt.current;
			var onePanel = opt.onePanel;
			var callback = opt.callback;
			var align = opt.align;
				
			var $tab = $('#' + id);
			var $btns = $tab.find('> .ui-tab-btns');
			var $wrap = $btns.find('> .btn-wrap');
			var $btn = $btns.find('.ui-tab-btn');
			var $pnls = $tab.find('> .ui-tab-pnls');
			var $pnl = $pnls.find('> .ui-tab-pnl');

			var	len = $btn.length;
			var keys = Global.state.keys;
				
			var	para = Global.para.get('tab');
			var paras;
			var paraname;

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
			!!effect && $tab.addClass(effect);
			$tab.data('opt', opt);
			$btns.attr('role','tablist');
			$btn.attr('role','tab');
			$pnl.attr('role','tabpanel');
			
			var ps_l = [];

			//setting
			for (var i = 0; i < len; i++) {
				var $btnN = $btn.eq(i);
				
				$btnN.data('tab') ?? $btnN.attr('data-tab', i);
				$btnN.attr('data-n', i);

				var n =  Number($btnN.data('tab'));
				var isCurrent = current === i;
				var cls = isCurrent ? 'addClass' : 'removeClass';
	
				//make ID
				$btnN.attr('id') ?? $btnN.attr('id', id + 'Btn' + n);
				
				var btnID = $btnN.attr('id');
				var $pnlN = $pnl.eq(i);

				$pnlN.data('tab') ?? $pnlN.attr('data-tab', i);
				$pnlN = $pnls.find('> .ui-tab-pnl[data-tab="'+ n +'"]');
				$pnlN.attr('id') ?? $pnlN.attr('id', id + 'pnl' + n);

				var pnlID = $pnlN.attr('id');

				if (!onePanel) {
					$btnN.attr('aria-controls', pnlID)[cls]('selected');
					$pnlN.attr('aria-labelledby', btnID).attr('aria-hidden', (isCurrent) ? false : true)[cls]('selected');
				} else {
					$btnN.attr('aria-controls', $pnl.eq(0).attr('id')).addClass('selected');
					isCurrent && $pnl.attr('aria-labelledby', btnID).addClass('selected');
				}

				(isCurrent) ?
					$btnN.attr('aria-selected', true).addClass('selected'):
					$btnN.attr('aria-selected', false).removeClass('selected');
					
				ps_l.push(Math.ceil($btnN.position().left));

				i === 0 && $btnN.attr('tab-first', true);
				i === len - 1 && $btnN.attr('tab-last', true);
			}

			callback ? callback(opt) : '';
			$btn.data('psl', ps_l).data('len', len);

			
			Global.scroll.move({ 
				top: ps_l[current], 
				target: $btns,
				effect: 'auto', 
				align: align
			});

			//event
			$btn.off('click.tab.init keydown.tab.init')
				.on({
					'click.tab.init': evtClick,
					'keydown.tab.init': evtKeys
				});

			function evtClick() {
				Global.tab.toggle({ 
					id: id, 
					current: $(this).index(), 
					align:align 
				}); 
			}
			function evtKeys(e) {
				var $this = $(this),
					n = $this.index(),
					m = Number($this.data('len'));

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
					!$this.attr('tab-first') ? 
					Global.tab.toggle({ id: id, current: n - 1, align:align }): 
					Global.tab.toggle({ id: id, current: m - 1, align:align});
				}
				function downRightKey(e) {
					e.preventDefault();
					!$this.attr('tab-last') ? 
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
		toggle: function(opt) {
			var id = opt.id;
			var $tab = $('#' + id);
			var $btns = $tab.children('.ui-tab-btns');
			var $btn = $btns.find('.ui-tab-btn');
			var $pnls = $tab.children('.ui-tab-pnls');
			var $pnl = $pnls.children('.ui-tab-pnl');
			var $target = $btns;
			
			var ps_l = $btn.data('psl');
			var opt = $.extend(true, {}, $tab.data('opt'), opt);
			var current = isNaN(opt.current) ? 0 : opt.current;
			var onePanel = opt.onePanel;
			var align = opt.align;
			var callback = opt.callback;
			var n = $btn.eq(current).data('tab');

			$btn.removeClass('selected').eq(current).addClass('selected').focus();
			

			var $btnN = $btns.find('.ui-tab-btn[data-tab="'+ n +'"]');
			var btnId = $btnN.attr('id');

			if ($btns.hasClass('ui-scrollbar')) {
				$target = $btns.find('> .ui-scrollbar-item');

				Global.scroll.move({ 
					top: ps_l[current], 
					add : $btn.outerWidth(),
					selector: $target, 
					align: align 
				});
			}

			if (onePanel === false) {
				$pnl.attr('aria-hidden', true).removeClass('selected');
				$pnls.children('.ui-tab-pnl[data-tab="'+ n +'"]').addClass('selected').attr('aria-hidden', false);
			} else {
				$pnl.attr('aria-labelledby', btnId);
			}

			!!callback ? callback(opt) : '';
		}
	}

	/* 작업필요 */
	Global.project = {
		list: function(opt){
			

			Global.ajax.init({
				url: opt.url, 
				page: false, 
				callback: callback 
			});

			
			function callback(v) {
				var dataExecel = JSON.parse(v); 

				var today = new Date();
				today = getFormatDate(today); 

				function getFormatDate(date){
					var year = date.getFullYear();
					var month = (1 + date.getMonth());
					month = month >= 10 ? month : '0' + month;
					var day = date.getDate();
					day = day >= 10 ? day : '0' + day;
					return  year + '-' + month + '-' + day;
				}
				function changeFormatDate(date){
					var year = date.substring(0,4);
					var month = date.substring(5,6); 
					month = month >= 10 ? month : '0' + month;
					var day = date.substring(6,8);
					day = day >= 10 ? day : '0' + day; 
					return year + '-' + month + '-' + day; 
				}

				function dateDiff(_date1, _date2) {
					var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
					var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
					diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
					diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
					var isAbs = diffDate_2.getTime() - diffDate_1.getTime() < 0 ? '' : '-';
					var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());

					diff = isAbs + Math.ceil(diff / (1000 * 3600 * 24));
				
					return diff;
				}


				var len = dataExecel.list.length;
				
				var i = 0;
				var state, date, enddate, moddate, pub, dev, id, idm, memo, overl;
				var d1, d2, d3, d4, d5, d6, d7, d8;
				var r1, r2, r3, r4;
				var d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_;
				var c1, c2, c3, c4, c5, c6, c7, c8;

				var	endsum = 0, delsum = 0, tstsum = 0, ingsum = 0, watsum = 0, chksum = 0, num = -1,
					ctg_state = [],
					ctg_pub = [],
					ctg_dev = [],
					ctg_date = [],
					ctg_enddate = [],
					ctg_mdate = [],
					ctg_menu = [],
					ctg_dev = [],
					cls2 = '',
					cls = '',
					root = '',
					depth = '',
					table = '';

				for (i = 0; i < len; i++) {
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

					var x = (i === 0) ? 0 : i - 1;

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
						table += '<table>';
						table += '<caption>코딩리스트</caption>';

						table += '<colgroup>';
						table += '<col class="col-1">';//상태
						table += '<col class="col-2">';//일정
						table += '<col class="col-3">';//완료일
						table += '<col class="col-3">';//수정일
						table += '<col class="col-4">';//퍼블담당자
						table += '<col class="col-4">';//개발담당자

						table += '<col class="col-8">';//화면아이디
						table += '</colgroup>';

						table += '<colgroup>';
						(dataExecel.list[i].d1 !== undefined) ? table += '<col class="col-9">' : '';
						(dataExecel.list[i].d2 !== undefined) ? table += '<col class="col-9">' : '';
						(dataExecel.list[i].d3 !== undefined) ? table += '<col class="col-9">' : '';
						(dataExecel.list[i].d4 !== undefined) ? table += '<col class="col-9">' : '';
						(dataExecel.list[i].d5 !== undefined) ? table += '<col class="col-9">' : '';
						(dataExecel.list[i].d6 !== undefined) ? table += '<col class="col-9">' : '';
						(dataExecel.list[i].d7 !== undefined) ? table += '<col class="col-9">' : '';
						(dataExecel.list[i].d8 !== undefined) ? table += '<col class="col-9">' : '';
						table += '</colgroup>';

						table += '<col class="col-10">';//메모

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
					}
					else if (state !== '제외') {
						num = num + 1;

						if (!(date === '미정' || date === '일정' || date === undefined) && state !== '완료' && state !== '검수' && state !== '체크') {
							var dateStart = date;
							dateStart = changeFormatDate(dateStart)

							var care = dateDiff(dateStart, new Date());
		
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
						table += '<td class="date"><span>' + date + '</span></td>';
						table += '<td class="enddate"><span>' + enddate + '</span></td>';
						table += '<td class="enddate"><span>' + moddate + '</span></td>';
						table += '<td class="name pub"><span>' + pub + '</span></td>';
						table += '<td class="name dev"><span>' + dev + '</span></td>';
						table += id !== '' ?
							'<td class="id ico_pg"><span><a href="' + root + '/' + id + '.html" target="coding">' + id + '</a></span></td>' :
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
					root = '';
				}
				$('#' + opt.id).html(table);
				table = '';

				var info = '';
				info += '<dl class="ui-codinglist-state"><dt>'+ today +'</dt><dd>'
				info += '<ul class="ui-codinglist-info">';
				info += '<li>진행율(완료+검수) : <span class="n_all">0</span> / <span class="total">0</span> (<span class="per0">0</span>%)</li>';
				info += '<li>완료 : <span class="n_end">0</span> (<span class="per1">0</span>%)</li>';
				info += '<li>검수 : <span class="n_tst">0</span> (<span class="per2">0</span>%)</li>';
				info += '<li>대기 : <span class="n_wat">0</span> (<span class="per4">0</span>%)</li>';
				info += '</ul></dd></dl>';

				var sel = '';
				sel += '<div class="ui-codinglist-sel mgb-xxxs">';
				sel += '<button type="button" class="btn-base"><span>전체</span></button>';
				sel += '<select id="uiCLstate" data-ctg="state">';
				sel += '<option value="0">상태선택</option>';
				sel += '</select>';
				sel += '<select id="uiCLpub" data-ctg="pub">';
				sel += '<option value="0">퍼블선택</option>';
				sel += '</select>';
				sel += '<select id="uiCLdev" data-ctg="dev">';
				sel += '<option value="0">개발선택</option>';
				sel += '</select>';
				sel += '<select id="uiCLDate" data-ctg="date">';
				sel += '<option value="0">일정선택</option>';
				sel += '</select>';
				// sel += '<select id="uiCLdepth" data-ctg="d2">';
				// sel += '<option value="0">메뉴선택</option>';
				// sel += '</select>';
				sel += '</div>';
				sel += '<div class="box-srch mgb-xxxs">';
				sel += '<div class="srch-area">';
				sel += '<input type="search" id="projectListSrchCode" class="inp-base ui-inpcancel" value="" placeholder="검색어를 입력해주세요.">';
				sel += '</div>';
				sel += '</div>';
				
				$('#' + opt.id).prepend(sel);
				$('#' + opt.id).prepend(info);

				if (!$('.ui-codinglist-info .total').data('data')) {
					$('.ui-codinglist-info .total').data('data', true).text(len - delsum - 1);
					$('.ui-codinglist-info .n_all').text(endsum + tstsum);
					$('.ui-codinglist-info .per0').text(((endsum + tstsum) / (len - delsum - 1) * 100).toFixed(0));
					$('.ui-codinglist-info .n_end').text(endsum);
					$('.ui-codinglist-info .per1').text((endsum / (len - delsum - 1) * 100).toFixed(0));
					$('.ui-codinglist-info .n_tst').text(tstsum);
					$('.ui-codinglist-info .per2').text((tstsum / (len - delsum - 1) * 100).toFixed(0));
					$('.ui-codinglist-info .n_wat').text(watsum);
					$('.ui-codinglist-info .per4').text((watsum / (len - delsum - 1) * 100).toFixed(0));
				}

				selectoption('uiCLstate', ctg_state);
				selectoption('uiCLpub', ctg_pub);
				selectoption('uiCLDate', ctg_date, true);
				selectoption('uiCLdepth', ctg_menu);
				selectoption('uiCLdev', ctg_dev);
				selectAct();

				function selectoption(id, optarray, v) {
					var $sel = $('#' + id);
					var nn = 1,
						nnn = 1;
					if (!$sel.data('data')) {
						var optionArray = [],
							optionSum = [],
							j = 0,
							optionHtml = '';
						v ? optarray.push('일정') : '';
						optarray.splice(0, 1);

						// 숫자 .sort(function(a,b){return a-b}) , 문자 sort()
						optionArray = optarray.slice().sort().reduce(function (a, b) {
							if (a.slice(-1)[0] !== b && b !== '') {
								a.push(b);
								v ? optionSum.push(nn) : '';
								nn = 1;
							} else {
								nn = nn + 1;
							}
							return a;
						}, []);

						var alen = optionArray.length;
						for (j; j < alen; j++) {
							if (v) {
								if (j < alen - 1) {
									optionHtml += '<option value="' + optionArray[j] + '">' + optionArray[j] + ' [' + optionSum[j + 1] + ']건</option>';
								}
							} else {
								optionHtml += '<option value="' + optionArray[j] + '">' + optionArray[j] + '</option>';
							}
						}
						$sel.data('data', true).append(optionHtml);
					}
				}

				function selectAct() {
					$('.ui-codinglist-sel select').on('change', function () {
						var $this = $(this),
							v = $this.val(),
							c = $this.data('ctg'),
							$sel = $('#' + opt.id + ' .' + c);

						if (v === '0') {
							$sel.closest('tr').removeClass('hidden');
						} else {
							$this.siblings().find('option:eq(0)').prop('selected', true);
							$sel.each(function (i) {
								v === 'all' ? $sel.closest('tr').removeClass('hidden') :
									v !== $sel.find('span').eq(i).text() ?
										$(this).closest('tr').addClass('hidden') : $(this).closest('tr').removeClass('hidden');
							});
						}
					});
				}

				$('.ui-codinglist-sel button').on('click', function (e) {
					$('#' + opt.id + ' tr').removeClass('hidden');
					$('.ui-codinglist-sel select').find('option:eq(0)').prop('selected', true);
				});
				$('.ui-codinglist table a, .ui-codinglist table button').off('click.uicoding').on('click.uicoding', function () {
					$(this).closest('tr').addClass('selected').siblings().removeClass('selected');
				});

				if ($('#projectListSrchCode').val() !== '') {
					var temp = $('.ui-codinglist tbody tr td *:contains('+ $('#projectListSrchCode').val() +')');

					$('.ui-codinglist tbody tr').hide();
					$(temp).closest('tr').show();
				}
				$.expr[":"].contains = $.expr.createPseudo(function(arg){
					return function(elem) {
						return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
					}
				});
				$('#projectListSrchCode').on('keyup', function(){
					var k = $(this).val(),
						temp = $('.ui-codinglist tbody tr td *:contains('+ k +')');
					$('.ui-codinglist tbody tr').hide();
					$(temp).closest('tr').show();
				});

				Global.form.init();
			}
		}
	}

	/* 작업필요 */
	Global.count = {
		step: function(opt) {
			var $base = $('#' + opt.id),
				countNum = !!opt.value === true ? opt.value : $base.text(),
				base_h = $base.outerHeight(),
				textNum = 0,
				len = countNum.toString().length,
				speed = !!opt.speed === true ? opt.speed + 's' : '1.0s',
				eff  = !!opt.eff === true ? opt.eff : 'easeOutQuart',
				transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
				i = 0,
				step, 
				// re, 
				timer, 
				r;
				
			if ($base.data('ing') !== true) {
				textNum = Global.parts.comma(countNum);
				base_h === 0 ? base_h = $base.text('0').outerHeight() : '';
				$base.data('ing',true).empty().css('height', base_h);
				len = textNum.length;
				step = len;
				// re = Math.ceil(len / 9); 
				(step < 9) ? step = 9 - len : step = 1;	

				// 숫자 단위만큼 
				for (i; i < len; i++) {
					var n = Number(textNum.substr(i, 1)),
						$thisNum, $base_div;
					
					if (isNaN(n)) {
						// 숫자가 아닐때 ', . ' 
						$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + textNum.substr(i, 1) + '</div></div>');
						$base.find('.n' + i).append('<span>' + textNum.substr(i, 1) + '</span>');
					}
					else {
						// 숫자일때
						$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + n + '</div></div>');
						$base.find('.n' + i).append('<span>9<br>8<br>7<br>6<br>5<br>4<br>3<br>2<br>1<br>0<br>' + n + '</span>');
						step = step + 1;
					}
					
					$base_div = $base.children('.n' + i);
					$base_div.find('span').wrapAll('<div class="ui-count-num" style="top:' + base_h + 'px; transition:top '+ speed +' cubic-bezier(' + Global.state.effect[eff] + ');"></div>');
					$thisNum = $base_div.find('.ui-count-num');
					$thisNum.data('height', $thisNum.height()); 
				}

				r = len;
				timer = setInterval(function() {
					count(r)
					r = r - 1; 
					(r < 0) ? clearInterval(timer) : '';
				},150);
				
				
			}
			function count(r){
				var $current_num = $base.children('.n' + r).find('.ui-count-num'),
					num_h = Number($current_num.data('height'));
				$current_num.css('top', (num_h - base_h) * -1); 
				
				if (r === 0) {
					$current_num.one(transitionEnd, function(){
						$base.text(textNum).data('ing', false);
					});
				}
			}
		},
		slot: function(opt) {
			var $base = $('#' + opt.id);
			var countNum = !!opt.value === true ? opt.value : $base.text();

			var count = 0,
				timer, diff, counter,
				add = Math.ceil((countNum - count) / (countNum - count), -2),
				j = 1,
				v = 0,
				s = 100;
			
			if ($base.data('ing') !== true) {
				counter = function(){
					j = v < 10? j = 0 : v < 10 ? j + 11 : v < 40 ? j +111 : v < 70 ? j + 1111 : j + 11111;
					s = s < 0 ? s = 0 : s - 10;
					diff = countNum - count;
					(diff > 0) ? count += add + j : '';

					var n = Global.parts.comma(count);
					$base.text(n);
					v = v + 1;

					if(count < countNum) {
						timer = setTimeout(function() { 
							counter(); 
						}, s);
					} else {
						$base.text(Global.parts.comma(countNum));
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
	

})(jQuery, window, document);
