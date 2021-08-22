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
			var page = document.URL.substring(document.URL.lastIndexOf("/") + 1),
				pagename = page.split('?');

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

	Global.uiParts = {
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
				Global.uiParts.RAF.time = _start + (unit * passed);
				requestAnimationFrame(scrollTo);
			} else {
				!!callback && callback();
				console.log('End off.')
			}
		}
	}
	Global.uiParts.resizeState();

	/**
	 * loading show/hide
	 */
	Global.loading = {
		timerShow : {},
		timerHide : {},
		options : {
			selector: null,
			message : null,
			styleClass : 'orbit' //time
		},
		show : function(opt){
			var opt = $.extend(true, {}, this.options, opt);
			var selector = opt.selector;
			var styleClass = opt.styleClass;
			var message = opt.message;
			var	$selector = !!selector ? selector : $('body');
			var htmlLoading = '';

			$('.ui-loading').not('.visible').remove();

			selector === null ?
			htmlLoading += '<div class="ui-loading '+ styleClass +'">':
			htmlLoading += '<div class="ui-loading '+ styleClass +'" style="position:absolute">';
				htmlLoading += '<div class="ui-loading-wrap">';

			message !== null ?
					htmlLoading += '<strong class="ui-loading-message"><span>'+ message +'</span></strong>':
					htmlLoading += '';

				htmlLoading += '</div>';
			htmlLoading += '</div>';

			clearTimeout(this.timerShow);
			clearTimeout(this.timerHide);
			this.timerShow = setTimeout(showLoading,300);
			
			function showLoading(){
				!$selector.find('.ui-loading').length && $selector.append(htmlLoading);	
				htmlLoading = null;		

				$('.ui-loading').addClass('visible').removeClass('close');			
			}
		},
		hide: function(){
			clearTimeout(this.timerShow);
			this.timerHide = setTimeout(function(){

				$('.ui-loading').addClass('close');	
				setTimeout(function(){
					$('.ui-loading').removeClass('visible')
					$('.ui-loading').remove();
				},300);
			},300)
		}

	}

	/**
	 * ajax
	 */
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
		init : function(opt){
			if (opt === undefined) {
				return false;
			}

			var xhr = new XMLHttpRequest();	
			var opt = $.extend(true, {}, this.options, opt);
			var $area = opt.area;
			var loading = opt.loading;
			var effect = opt.effect;
			var callback = opt.callback || false;
			var errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;
	
			if (loading) {
				Global.loading.show();
			}
	
			if (!!effect) {
				$area.removeClass(effect + ' action');
				$area.addClass(effect);
			}

			xhr.open(opt.type, opt.url);
			xhr.setRequestHeader(opt.mimeType, opt.contType);
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== XMLHttpRequest.DONE) {
					return;
				}

				if (xhr.status === 200) {
					if (loading) {
						Global.loading.hide();
					}
	
					if (opt.page) {
						console.log($area);
						if (opt.add){
							opt.prepend ? 
								$area.insertAdjacentHTML('afterbegin', xhr.responseText) : 
								$area.insertAdjacentHTML('beforeend', xhr.responseText);
						} else {
							$area.html(xhr.responseText);
						}

						callback && callback();
						effect && $area.addClass('action');
					} else {
						callback && callback(xhr.responseText);
					}

				} else {
					if (loading) {
						Global.loading.hide();
					}
					errorCallback ? errorCallback() : '';
				}
			};
	
			// $.ajax({
			// 	type: opt.type,
			// 	url: opt.url,
			// 	cache: opt.cache,
			// 	async: opt.async,  
			// 	headers: {
			// 		"cache-control": "no-cache",
			// 		"pragma": "no-cache"
			// 	},
			// 	error: function (request, status, err) {
			// 		if (loading) {
			// 			Global.uiLoading({
			// 				visible: false
			// 			});
			// 		}
			// 		errorCallback ? errorCallback() : '';
			// 	},
			// 	success: function (v) {
			// 		if (loading) {
			// 			Global.uiLoading({
			// 				visible: false
			// 			});
			// 		}
	
			// 		if (opt.page) {
			// 			opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v);
			// 			callback && callback();
			// 			effect && $id.addClass('action');
			// 		} else {
			// 			callback && callback(v);
			// 		}
			// 	},
			// 	complete: function(){
			// 	}
			// });
		}
	}

	/**
	 * toast
	 */
	Global.toast = {
		timer : null,
		options : {
			delay: 'short',
			classname : ''
		},
		show : function(opt) {
			var opt = $.extend(true, {}, this.options, opt);
			var delay = opt.delay;
			var toast = '<div class="ui-toast toast '+ opt.classname +'">'+ opt.conts +'</div>';
			var $body = $('body');
			var time = delay === 'short' ? 2000 : 3500;

			if (delay === 'short') {
				time = 2000;
			} else if(delay === 'long') {
				time = 3500;
			} else {
				time = delay;
			}

			if (!!$('.ui-toast-ready').length) {
				clearTimeout(Global.toast.timer);
				$body.removeClass('ui-toast-show').removeClass('ui-toast-ready');
				$('.ui-toast').off('transitionend.toastshow').remove();
			} 

			$body.append(toast);
			toast = null;
			
			var $shanckbar = $('.ui-toast');
			
			$body.addClass('ui-toast-ready');

			setTimeout(function(){
				$body.addClass('ui-toast-show');

				$shanckbar.off('transitionend.toasthide').on('transitionend.toastshow', function(){
					$(this).off('transitionend.toastshow').addClass('on');
					Global.toast.timer = setTimeout(Global.toast.hide, time);
				});
			},0);
		},
		hide : function(){
			var $body = $('body');
			
			clearTimeout(Global.toast.timer);
			$body.removeClass('ui-toast-show');

			$('.ui-toast').off('transitionend.toastshow').on('transitionend.toasthide', function(){
				$(this).off('transitionend.toasthide').remove();
				$body.removeClass('ui-toast-ready');
			});
		}
	}

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


	/**
	* scroll
	* move: 특정 위치로 스크롤 이동
	* checkEnd: 스크롤 이동 완료 체크 후 포커스 및 콜백 실행
	*/
	Global.scroll = {
		options : {
			value: 0,
			effect:'smooth', //'auto'
			callback: false,
			ps: 'top',
			add: 0,
			focus: false,
			selector: document.querySelector('html, body')
		},
		move : function(opt){
			if (opt === undefined) {
				return false;
			}

			var opt = $.extend(true, {}, this.options, opt);

			var { value, callback, ps, add, focus, selector, effect } = opt;

			// var value = opt.value;
			// var callback = opt.callback;
			// var ps = opt.ps;
			// var add = opt.add;
			// var focus = opt.focus;
			// var selector = opt.selector;
			// var effect = opt.effect;
			
			//jquery selector인 경우 변환
			if (!!selector[0]) {
				selector = selector[0];
			}

			switch (ps) {
				case 'top':
					selector.scrollTo({
						top: value + add,
						behavior: effect
					});
	
					this.checkEnd({
						selector : selector,
						now : selector.scrollTop,
						ps : 'top',
						callback : callback,
						focus : focus
					});
					break;

				case 'left':
					selector.scrollTo({
						left: value + add,
						behavior: effect
					});
	
					this.checkEnd({
						selector : selector,
						now : selector.scrollTop,
						ps : 'left',
						callback : callback,
						focus : focus
					});
					break;

				case 'center':
					var w = selector.offsetWidth ;
				
					selector.scrollTo({
						left: value - (w / 2) + add,
						behavior: effect
					});

					
					this.checkEnd({
						selector : selector,
						now : selector.scrollLeft,
						ps : 'left',
						callback : callback,
						focus : focus
					});
					break;
			}
		},
		checkEndTimer : {},
		checkEnd: function(opt){
			var $selector = opt.selector;
			var now = opt.now;
			var ps = opt.ps === undefined ? 'top' : opt.ps; //top,left
			var scrollPs = ps === 'top' ? 'scrollTop' : 'scrollLeft';
			var focus = opt.focus;
			var callback = opt.callback;

			Global.scroll.checkEndTimer = setTimeout(function(){
				//스크롤 현재 진행 여부 판단
				if (now === $selector[scrollPs]) {
					clearTimeout(Global.scroll.checkEndTimer);
					//포커스가 위치할 엘리먼트를 지정하였다면 실행
					if (!!focus ) {
						focus.attr('tabindex', 0).focus();
					}
					//스크롤 이동후 콜백함수 실행
					if (!!callback ) {
						callback();
					}
				} else {
					now = $selector[scrollPs];
					Global.scroll.checkEnd({
						selector : opt.selector,
						now : $selector[scrollPs],
						ps : opt.ps,
						callback : opt.callback,
						focus : opt.focus
					});
				}
			},100);
		},

		optionsParllax: {
			selector : null,
			area : null
		},
		parallax: function(opt) {
			var opt = $.extend(true, {}, Global.scroll.optionsParllax, opt);
			var $area = opt.area ?? $(win);
			var $parallax = opt.selector ?? $('.ui-parallax');
			var $wrap = $parallax.find('> .ui-parallax-wrap');

			act();
			$area.off('scroll.win').on('scroll.win', act);

			function act() {
				var areaH = $area.outerHeight();
				var areaT = Math.floor($area.scrollTop());
				var baseT = Math.floor($wrap.eq(0).offset().top);

				for (var i = 0, len = $wrap.length; i < len; i++) {
					var $current = $wrap.eq(i);
					var $item = $current.find('.ui-parallax-item');
					var item_len = $item.length;

					var attrStart = $current.attr('data-start');
					var attrEnd = $current.attr('data-end');

					attrStart === undefined ? attrStart = 0 : '';
					attrEnd === undefined ? attrEnd = 0 : '';

					var h = Math.floor($current.outerHeight());
					var start = Math.floor($current.offset().top);
					var end = h + start;
					var s = areaH * Number(attrStart) / 100;
					var e = areaH * Number(attrEnd) / 100;
					
					if (opt.area !== 'window') {
						start = (start + areaT) - (baseT + areaT);
						end = (end + areaT) - (baseT + areaT);
					}
					
					(areaT >= start - s) ? $current.addClass('parallax-s') : $current.removeClass('parallax-s');
					(areaT >= end - e) ? $current.addClass('parallax-e') : $current.removeClass('parallax-e');

					for (var j = 0; j < item_len; j++) {
						var n = ((areaT - (start-s)) * 0.003).toFixed(2);
						var styleData = $item.eq(j).data('css');

						n = n < 0 ? 0 : n > 1 ? 1 : n;

						styleData = styleData.replace(/{n}/gi, n);
						styleData = styleData.replace(/{nn}/gi, n * 10);
						styleData = styleData.replace(/{nnn}/gi, n * 100);
						styleData = styleData.replace(/{-n}/gi, (1 - n).toFixed(2));
						styleData = styleData.replace(/{-nn}/gi, (10 - n * 10).toFixed(2));
						styleData = styleData.replace(/{-nnn}/gi, (100 - n * 100).toFixed(2));
						
						$item.eq(j).attr('style', styleData).attr('data-parallax', n);
					}
				}
			}
		}
	}


	/**
	 * parameter get
	 */
	Global.para = {
		get: function(paraname){
			var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

			for (var i = 0, len = _tempArray_len; i < len; i++) {
				_keyValue = _tempArray[i].split('=');

				if (_keyValue[0] === paraname) {
					return _keyValue[1];
				}
			}
		}
	}

	/**
	 * Focus Loop 
	 */
	Global.focus = {
		options: {
			callback: false
		},
		loop : function(opt){
			if (opt === undefined) {
				return false;
			}

			var opt = $.extend(true, {}, this.options, opt);
			var $base = opt.selector;
			var callback = opt.callback;
			var $focusItem = $base.find('input, h1, h2, h3, a, button, label, textarea, select').eq(0);

			$focusItem.attr('tabindex', 0).focus();

			if(!$base.find('[class*="ui-focusloop-"]').length) {
				$base.prepend('<div tabindex="0" class="ui-focusloop-start"><span>시작지점입니다.</span></div>');
				$base.append('<div tabindex="0" class="ui-focusloop-end"><span>마지막지점입니다.</span></div>');
			}

			var $itemStart = $base.find('.ui-focusloop-start');
			var $itemEnd = $base.find('.ui-focusloop-end');
		
			$itemStart.off('keydown.loop').on('keydown.loop', function(e) {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$itemEnd.focus();
					!!callback && callback();
				}
			});
			$itemEnd.off('keydown.loop').on('keydown.loop', function(e) {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$itemStart.focus();
					!!callback && callback();
				}
			});
		}
	}

	/**
	 * custom scroll bar
	 */
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

	/**
	 * window popup
	 */
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
			memubar: 'no',
			status: 'no',
			resizable: 'no',
			scrolbars: 'yes'
		},
		open: function(opt){
			var opt = opt === undefined ? {} : opt;
			var opt = $.extend(true, {}, this.options, opt);
			var specs;

			if (opt.align === 'center') {
				opt.left = ($(win).outerWidth() / 2) - (opt.width / 2);
				opt.top = ($(win).outerHeight() / 2) - (opt.height / 2);
			}

			specs = 'width=' + opt.width + ', height='+ opt.height + ', left=' + opt.left + ', top=' + opt.top;
			specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
			
			win.open(opt.link, opt.name , specs);
		}
	}

	/**
	 * cookie set/get/del
	 */
	Global.cookie = {
		set: function(){
			var cookieset = opt.name + '=' + opt.value + ';';
			var expdate;

			if (opt.term) {
				expdate = new Date();
				expdate.setTime( expdate.getTime() + opt.term * 1000 * 60 * 60 * 24 ); // term 1 is a day
				cookieset += 'expires=' + expdate.toGMTString() + ';';
			}
			(opt.path) ? cookieset += 'path=' + opt.path + ';' : '';
			(opt.domain) ? cookieset += 'domain=' + opt.domain + ';' : '';
			document.cookie = cookieset;
		},
		get: function(opt){
			var match = ( document.cookie || ' ' ).match( new RegExp(opt.name + ' *= *([^;]+)') );

			return (match) ? match[1] : null;
		},
		del: function(opt){
			var expireDate = new Date();

			expireDate.setDate(expireDate.getDate() + -1);
			this.set({ name:opt.name, term:'-1' });
		}
	}

	/**
	 * table caption/scroll(vertical)
	 */
	Global.table = {
		caption: function(){
			var $cp = $('.ui-caption');

			$cp.text('');
			$cp.each(function(){
				var $caption = $(this);
				var $table = $caption.closest('table');
				var th = $table.find('th');
				var cp_txt = '';

				for (var i = 0; i < th.length; i++) {
					var a = th.eq(i).text();
					
					if (a !== '') {
						cp_txt += a;
					}
					if (i < th.length - 1) {
						cp_txt += ', ';
					}
				}

				$caption.text(cp_txt + ' 정보입니다.');
			});
		},
		scrollOption: {
			callback:false
		},
		scroll: function(opt){
			var opt = $.extend(true, {}, this.scrollOption, opt);
			var callback = opt.callback;
			var $tblWrap = $('.ui-tablescroll');

			for (var i = 0, len = $tblWrap.length; i < len; i++) {
				var $tbl = $tblWrap.eq(i),
					_$tblWrap = $tbl.find('.ui-tablescroll-wrap'),
					_$tbl = _$tblWrap.find('table'),
					cloneTable = _$tbl.clone();
				
				if (!$tbl.find('.ui-tablescroll-clone').length) {
					$tbl.prepend(cloneTable);

					var $cloneTable = $tbl.find('> table:first-child'),
						$cloneTableTh = $cloneTable.find('th');

					$cloneTable.find('caption').remove();
					$cloneTable.find('tbody').remove();
					$cloneTable.addClass('ui-tablescroll-clone');
					$cloneTable.attr('aria-hidden', true);
					$cloneTableTh.each(function(){
						$(this).attr('aria-hidden', true);
					});
				}
			}

			!!callback && callback();
		},
		fixTd : function() {
			// var el_tbl = document.querySelectorAll('.ui-fixtd');
			
			// for (var el_tbls of el_tbl) {
				
			// 	var tbl_col = el_tbls.querySelectorAll('col');
			// 	var tbl_tr = el_tbls.querySelectorAll('tr');
			// 	var fix_n = Number(el_tbls.dataset.fix);
			// 	var view_n = Number(el_tbls.dataset.view);
			// 	var col_len = tbl_col.length;
			// 	var tr_len = tbl_tr.length;
			// 	var fix_sum = col_len - fix_n;
			// 	var tit = [];

			// 	console.log(fix_sum);
			// 	el_tbls.setAttribute('data-current', 1);
			// 	el_tbls.setAttribute('data-total', col_len);

			// 	for (var i = 0; i < tr_len; i++) {
			// 		for (var j = 0; j < fix_sum; j++) {
			// 			console.log(j , fix_sum);
			// 			var tr_this = tbl_tr[i];
			// 			var td_this = tr_this.querySelector('td')[j - fix_sum];
			// 			var jj = (j + 1);
	
			// 			td_this.classList.add('ui-fixtd-n' + jj);
			// 			td_this.dataset.n = j;

			// 			if (tr_this.closest('thead').length) {
			// 				tit.push(td_this.textContent);
			// 				td_this.prepend('<button type="button" class="ui-fixtd-btn prev" data-btn="prev" data-idx="'+ jj +'"><span class="a11y-hidden">previous</span></button>');
			// 				td_this.append('<button type="button" class="ui-fixtd-btn next" data-btn="next" data-idx="'+ jj +'"><span class="a11y-hidden">next</span></button>');
			// 			}

			// 			$tbl_col[j - fix_sum].classList.add('ui-fixtd-n' + jj);
			// 		}
			// 	}

			// }
			var $tbl = $('.ui-fixtd');
			
			$tbl.each(function(i){
				var $tbl = $(this);
				var $tbl_col = $tbl.find('col');
				var $tbl_tr = $tbl.find('tr');

				var fix_n = Number($tbl.data('fix'));
				var view_n = Number($tbl.data('view'));
				var col_len = $tbl_col.length;
				var fix_sum = col_len - fix_n;
				var len = $tbl_tr.length;
				var tit = [];
	
				$tbl.attr('data-current', 1).attr('data-total', col_len);
	
				for (var i = 0; i < len; i++) {
					for (var j = 0; j < fix_sum; j++) {
						var $tr_this = $tbl_tr.eq(i);
						var $td_this = $tr_this.find('> *').eq(j - fix_sum);
						var jj = (j + 1);
	
						$td_this.addClass('ui-fixtd-n' + jj).data('n', j);
						if ($tr_this.closest('thead').length) {
							tit.push($td_this.text());
							$td_this.prepend('<button type="button" class="ui-fixtd-btn prev" data-btn="prev" data-idx="'+ jj +'"><span class="a11y-hidden">previous</span></button>');
							$td_this.append('<button type="button" class="ui-fixtd-btn next" data-btn="next" data-idx="'+ jj +'"><span class="a11y-hidden">next</span></button>');
						}
						$tbl_col.eq(j - fix_sum).addClass('ui-fixtd-n' + jj);
					}
				}
			});
	
			$tbl.find('.ui-fixtd-btn').off('click.uifixtd').on('click.uifixtd', function(){
				var $tbl_this = $(this).closest('.ui-fixtd');
				var this_sum =  Number($tbl_this.data('total') - $tbl_this.data('fix'));
				var n = Number($tbl_this.attr('data-current'));
				console.log(n);
				if ($(this).data('btn') === 'next') {
					$tbl_this.attr('data-current', n + 1 > this_sum ? n = 1 : n + 1);
				} else {
					$tbl_this.attr('data-current', n - 1 <= 0 ? n = this_sum : n - 1);
				}
			});
		},
		sort: function(opt){
			
		}
	}

	Global.form = {
		init: function(opt){
			var $inp = $('.inp-base');
			var len = $inp.length;

			for (var i = 0; i < len; i++) {
				var $that = $inp.eq(i);
				var $wrap = $that.parent();
				var $item = $that.closest('[class*="ui-form"]');
				var unit = $that.data('unit');
				var prefix = $that.data('prefix');
				var $label =  $item.find('.form-item-label');
				var space = 0;

				$that.removeAttr('style');
				$wrap.find('.unit').remove();
				$wrap.find('.prefix').remove();

				var pdr = parseFloat($that.css('padding-right'));
				var pdl = parseFloat($that.css('padding-left'));

				if (unit !== undefined) {
					$wrap.append('<div class="unit">'+unit+'</div>');
					space = Math.floor($wrap.find('.unit').outerWidth()) + (pdr / 2) ;
				}

				$that.css('padding-right', Number(space + pdr)).data('pdr', space + pdr).attr('pdr', space + pdr);
				space = 0;
				
				if (prefix !== undefined) {					
					$wrap.prepend('<div class="prefix">'+prefix+'</div>');
					space = Math.floor($wrap.find('.prefix').outerWidth()) + pdl;
					$that.css('padding-left', (space + pdl) + 'px').data('pdl', space + pdl);
					$label.css('margin-left',  space + 'px');
				}

				isValue($that,false);
				$that.css('padding-left', space + pdl).data('pdl', space + pdl);
			}

			$('.ui-select-btn, ui-datepicker-btn').off('click.label').on('click.label', function(){
				isValue($(this),true);
			});
	
			$inp.off('keyup.clear focus.clear').on('keyup.clear focus.clear', function(){
				isValue($(this),true);
			}).off('blur.clear').on('blur.clear', function(){
				var $this = $(this);
				var $clear = $this.parent().find('.ui-clear');
				var pdr = Number($this.data('pdr'));
				
				isValue($this,false);
				setTimeout(function(){
					$this.css('padding-right', pdr + 'px'); 
					$clear.remove();
				},100);
			});
			
			function isValue(t,v){
				var $this = t;
				var $wrap = $this.parent();
				var $inner = $this.closest('.ui-form-inner');
				var $inp = $wrap.find('.inp-base');
				var pdr = Number($inp.data('pdr'));
				
				if (!!$inner) {
					if (v) {
						$inner.addClass('is-value');
					} else {
						if (!!$inp.val()) {
							$inner.addClass('is-value');
						} else {
							$inner.removeClass('is-value');
						}
					}
				}
				
				if ($this.prop('readonly') || $this.prop('disabled') || $this.attr('type') === 'date') {
					return false;
				}

				if ($this.val() === '') {
					$inp.css('padding-right', pdr + 'px'); 
					$wrap.find('.ui-clear').remove();
				} else {
					if (!$wrap.find('.ui-clear').length) {
						if ($inp.prop('tagName') === 'INPUT') { 
							$wrap.append('<button type="button" class="ui-clear btn-clear" style="margin-right:'+pdr+'px"><span class="a11y-hidden">내용지우기</span></button>');
							$inp.css('padding-right', pdr + $wrap.find('.ui-clear').outerWidth() + 'px'); 
						} else {
							$inp.css('padding-right', pdr + 'px'); 
						}
					} 
				}
			}

			//event
			$(doc).off('click.clear').on('click.clear', '.ui-clear', function(){
				var $this = $(this);
				var $wrap = $this.parent();
				var $inp = $wrap.find('.inp-base');
				var pdr = Number($inp.data('pdr'));

				$inp.css('padding-right', pdr + 'px').val('').focus();
				$this.remove();
			});

			//datepicker event
			$(doc).off('click.dp').on('click.dp', '.ui-datepicker-btn', function(e){
				//e.preventDefault();
				
				var $this = $(this).closest('.ui-datepicker').find('.inp-base');
				//<input type="date" id="uiDate_1" class="inp-base" value="" min="2020-12-05" max="2022-05-20" title="시작일" required="">
				Global.sheets.bottom({
					id: $this.attr('id'),
					callback: function(){
						Global.datepicker.init({
							id: $this.attr('id'),
							date: $this.val(),
							min: $this.attr('min'),
							max: $this.attr('max'),
							title: $this.attr('title'),
							period: $this.data('period'),
							callback: function(){
								console.log('callback init')
							}
						});
					}
				});
			});
		},
		fileUpload: function(opt){
			var el_file = document.querySelectorAll('.ui-file-inp');
			var fileTypes = [
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

			for (var i = 0; i < el_file.length; i++) {
				if (!el_file[i].dataset.ready) {
					el_file[i].addEventListener('change', updateImageDisplay);
					el_file[i].dataset.ready = true;
				}
			}
			
			function updateImageDisplay(event) {
				var el_file = event.currentTarget;
				var id = el_file.id;
				var preview = document.querySelector('.ui-file-list[data-id="'+ id +'"]');

				while(preview.firstChild) {
					preview.removeChild(preview.firstChild);
				}

				var curFiles = el_file.files;

				if(curFiles.length === 0) {
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
				
					for(var file of curFiles) {
						var listItem = document.createElement('li');
						var para = document.createElement('p');

						if(validFileType(file)) {
							para.textContent = `${file.name}, ${returnFileSize(file.size)}.`;
							
							var image = document.createElement('img');
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

			function fileDelete(event){
				var id = event.currentTarget.dataset.id;
				var list = document.querySelector('.ui-file-list[data-id="'+ id +'"]');
				var inp = document.querySelector('#'+ id);

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
			var id = opt.id;
			var el_range = document.querySelector('.ui-range[data-id="'+ id +'"]');
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
			var id = opt.id;
			var v = opt.value;
			var el_range = document.querySelector('.ui-range[data-id="'+ id +'"]');
			var el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
			var el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');
			var el_left = el_range.querySelector(".ui-range-btn.left");
			var el_right = el_range.querySelector(".ui-range-btn.right");
			var el_bar = el_range.querySelector(".ui-range-bar");
			var inp_from = document.querySelectorAll('[data-'+ id +'="from"]');
			var percent;
			var {
				value,
				min,
				max
			} = el_from;

			if (v) {
				el_from.value = v;
			}

			var from_value = +el_from.value;
			
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
			
			for (var i = 0; i < inp_from.length; i++) {
				if (inp_from[i].tagName === 'INPUT') {
					inp_from[i].value = from_value;
				} else {
					inp_from[i].textContent = from_value;
				}
			}
		},
		rangeTo: function(opt){
			var id = opt.id;
			var v = opt.value;
			var el_range = document.querySelector('.ui-range[data-id="'+ id +'"]');
			var el_from = el_range.querySelector('.ui-range-inp[data-range="from"]');
			var el_to = el_range.querySelector('.ui-range-inp[data-range="to"]');
			var el_left = el_range.querySelector(".ui-range-btn.left");
			var el_right = el_range.querySelector(".ui-range-btn.right");
			var el_bar = el_range.querySelector(".ui-range-bar");
			var inp_to = document.querySelectorAll('[data-'+ id +'="to"]');
			var {
				value,
				min,
				max
			} = el_to;

			if (v) {
				el_to.value = v;
			}

			var to_value = +el_to.value;

			if (+value - +el_from.value < 0) {
				to_value = +el_from.value + 0;
				el_to.value = to_value;
			}

			var percent = ((to_value - +min) / (+max - +min)) * 100;

			el_right.classList.add('on');
			el_left.classList.remove('on');
			el_to.classList.add('on');
			el_from.classList.remove('on');
			el_right.style.right = `${100 - percent}%`;
			el_bar.style.right = `${100 - percent}%`;

			for (var i = 0; i < inp_to.length; i++) {
				if (inp_to[i].tagName === 'INPUT') {
					inp_to[i].value = el_to.value;
				} else {
					inp_to[i].textContent = el_to.value;
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
			var yyyymm = _viewYear + '-' + Global.uiParts.add0(_viewMonth + 1);
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
						_dpHtml += '<button type="button" class="datepicker-day '+ _day +'" data-date="'+ viewYear +'-'+ Global.uiParts.add0(viewMonth + 1)+'-'+ Global.uiParts.add0(date)+ '">';
					} else {
						_dpHtml += '<button type="button" class="datepicker-day '+ _day +'" data-date="'+ viewYear +'-'+ Global.uiParts.add0(viewMonth + 1)+'-'+ Global.uiParts.add0(date)+ '" disabled>';
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

			el_dp.dataset.date = (year + 1) +'-'+ Global.uiParts.add0(month); 
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

			el_dp.dataset.date = (year - 1) +'-'+ Global.uiParts.add0(month); 
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

			el_dp.dataset.date = year +'-'+ Global.uiParts.add0(month + 1); 
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

			el_dp.dataset.date = year +'-'+ Global.uiParts.add0(month); 
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

			el_dp.dataset.date = year +'-'+ Global.uiParts.add0(month); 
			Global.datepicker.dateMake({
				setDate: date,
				setId: dpId
			});
		}
	}

	Global.sheets = {
		dim: function(opt){
			var callback = opt.callback;

 			if (opt.show) {
				$('.sheet-bottom[data-id="'+opt.id+'"]').append('<div class="sheet-dim"></div>');

				$('.sheet-dim').addClass('on');
				!!callback && callback();
			} else {
				$('.sheet-dim').removeClass('on');
			}
		},
		bottom: function(opt){
			var id = opt.id;
			var state = opt.state; // true, false
			var callback = opt.callback;

			var $base = $('#'+id);
			var $sheet = $('[data-id*="'+id+'"]');
			
			var scr_t = $(doc).scrollTop();
			var win_w = $(win).outerWidth();
			var win_h = $(win).outerHeight();
			var off_t = $base.offset().top;
			var off_l = $base.offset().left;
			var base_w = $base.outerWidth();
			var base_h = $base.outerHeight();

			var is_expanded = !!$sheet.length;
			var show = !is_expanded || is_expanded === 'false';

			if (state !== undefined) {
				show = state;
			}

			if (show) {
				!!callback && callback(); 
				
				$sheet = $('[data-id*="'+id+'"]');
				$sheet.addClass('sheet-bottom');

				var wrap_w = Number($sheet.outerWidth().toFixed(2));
				var wrap_h = Number($sheet.height().toFixed(2));

				Global.sheets.dim({
					id: id,
					show: true,
					callback: function(){
						$('.sheet-dim').on('click', function(){
							Global.sheets.bottom({
								id:id,
								state: false
							})
						});
					}
				});

				$sheet.addClass('on').css({
					left: ((wrap_w + off_l) > win_w) ? (off_l - (wrap_w - base_w))+ 'px' : off_l + 'px',
					top: (win_h - ((off_t - scr_t) + base_h) > wrap_h) ? (off_t + base_h) + 'px' : (off_t - wrap_h) + 'px'
				});

				Global.focus.loop({
					selector: $sheet
				});
			} else {
				//hide
				$sheet.removeClass('on').addClass('off');
				
				setTimeout(function(){
					!!callback && callback();
					$sheet.remove();
					$('#'+id).focus();
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
		init: function(opt){
			var opt = opt === undefined ? {} : opt;
			var opt = $.extend(true, {}, Global.select.options, opt);
			var current = opt.current;
			var callback = opt.callback;
			var customscroll = opt.customscroll;
			var id = opt.id;
			var is_id = id === false ? false : true;
			var $ui_select = is_id ? typeof id === 'string' ? $('#' + opt.id).closest('.ui-select') : id.find('.ui-select') : $('.ui-select');
			var keys = Global.state.keys;

			var $sel;
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
			var htmlButton = '' ;

			//init
			Global.state.device.mobile ? customscroll = false : '';

			//reset
			$ui_select.find('.ui-select-btn').remove();
			$ui_select.find('.ui-select-wrap').remove();
			$ui_select.find('.dim').remove();

			var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

			//select set
			for (var i = 0, len = $ui_select.length; i < len; i++) {
				$selectCurrent = $ui_select.eq(i);
				$sel = $selectCurrent.find('select');

				selectID = $sel.attr('id');
				(selectID === undefined) && $sel.attr('id', 'uiSelect_' + idN);
				listID = selectID + '_list';

				selectDisabled = $sel.prop('disabled');
				selectTitle = $sel.attr('title');
				hiddenClass = '';

				//$selectCurrent.css('max-width', $selectCurrent.outerWidth());

				(!$sel.data('callback') || !!callback) && $sel.data('callback', callback);

				if (customscroll) {
					htmlOption += '<div class="ui-select-wrap ui-scrollbar" scroll-id="uiSelectScrollBar_'+ idN +'">';
					idN = idN + 1;
					sessionStorage.setItem('scrollbarID', idN);
				} else {
					htmlOption += '<div class="ui-select-wrap" style="min-width:' + $selectCurrent.outerWidth() + 'px">';
				}

				htmlOption += '<strong class="ui-select-title">'+ selectTitle +'</strong>';
				htmlOption += '<div class="ui-select-opts" role="listbox" id="' + listID + '" aria-hidden="false">';

				setOption();

				htmlOption += '</div>';
				htmlOption += '<button type="button" class="ui-select-cancel"><span>취소</span></strong>';
				htmlOption += '<button type="button" class="ui-select-confirm"><span>확인</span></strong>';
				htmlOption += '</div>';

				htmlButton = '<button type="button" class="ui-select-btn '+ hiddenClass +'" id="' + selectID + '_inp" role="combobox" aria-autocomplete="list" aria-owns="' + listID + '" aria-haspopup="true" aria-expanded="false" aria-activedescendant="' + optionSelectedID + '" data-n="' + selectN + '" data-id="' + selectID + '" tabindex="-1"><span>' + btnTxt + '</span></button>';

				

				$selectCurrent.append(htmlButton);
				$sel.addClass('off');
				//$sel.attr('aria-hidden', true).attr('tabindex', -1);
				$selectCurrent.append(htmlOption);

				selectDisabled ? $selectCurrent.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';

				htmlOption = '';
				htmlButton = '';
			}
			
			function setOption(t, v){
				var _$sel = (t !== undefined) ? $(t).closest('.ui-select').find('select') : $sel;
				var _$option = _$sel.find('option');
				var _$optionCurrent = _$option.eq(0);

				selectID = _$sel.attr('id');

				var _optionID = selectID + '_opt';
				var _optLen = _$option.length;
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

				for (var j = 0; j < _optLen; j++) {
					_$optionCurrent = _$option.eq(j);
					_hidden = _$optionCurrent.prop('hidden');

					if (_current !== null) {
						
						if (_current === j) {
							_selected = true;
							_$optionCurrent.prop('selected', true);
						} else {
							_selected = false;
							_$optionCurrent.prop('selected', false);
						}

					} else {
						_selected = _$optionCurrent.prop('selected');
					}

					_disabled = _$optionCurrent.prop('disabled');
					_hiddenCls =  _hidden ? 'hidden' : '';

					if (_selected) {
						_val = _$optionCurrent.val();
						btnTxt = _$optionCurrent.text();
						optionSelectedID = _optionID + '_' + j;
						selectN = j;
					}

					_selected && _hidden ? hiddenClass = 'opt-hidden' : '';
					_optionIdName = _optionID + '_' + j;

					if (Global.state.device.mobile) {
						_disabled ?
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">';
					} else {
						_disabled ?
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt disabled '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" disabled tabindex="-1">' :
							_selected ?
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt selected '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">' :
								htmlOption += '<button type="button" role="option" id="' + _optionIdName + '" class="ui-select-opt '+ _hiddenCls + '" value="' + _$optionCurrent.val() + '" tabindex="-1">';
					}

					htmlOption += '<span class="ui-select-txt">' + _$optionCurrent.text() + '</span>';
					htmlOption += '</button>';
				}

				if (t !== undefined) {
					_$sel.closest('.ui-select').find('.ui-select-opts button').remove();
					_$sel.closest('.ui-select').find('.ui-select-opts').append(htmlOption);
					htmlOption = '';
					eventFn();
				}
			}

			//event
			eventFn();
			function eventFn(){
				var $doc = $(doc);

				// $(doc).off('click.dp').on('click.dp', '.ui-select-btn', function(e){
					
				// 	var $this = $(this).closest('.ui-datepicker').find('.inp-base');
				// 	Global.sheets.bottom({
				// 		id: $this.attr('id'),
				// 		callback: function(){

				// 		}
				// 	});
				// });
				
				$doc.find('.dim-select').off('click.dim').on('click.dim', function () {
					if ($('body').data('select-open')) {
						optBlur();
					}
				});
				$doc.find('.ui-select-confirm').off('click.cfm').on('click.cfm', optConfirm);
				$doc.find('.ui-select-cancel').off('click.cfm').on('click.cfm', optClose);
				$doc.find('.ui-select-btn').off('click.ui keydown.ui mouseover.ui focus.ui mouseleave.ui').on({
					'click.ui': selectClick,
					'keydown.ui': selectKey,
					'mouseover.ui': selectOver,
					'focus.ui': selectOver,
					'mouseleave.ui': selectLeave
				});
				$doc.find('.ui-select-opt').off('click.ui mouseover.ui').on({
					'click.ui': optClick,
					'mouseover.ui': selectOver
				});
				$doc.find('.ui-select-wrap').off('mouseleave.ui').on({ 'mouseleave.ui': selectLeave });
				$doc.find('.ui-select-wrap').off('blur.ui').on({ 'blur.ui': optBlur });
				$doc.find('.ui-select-label').off('click.ui').on('click.ui', function () {
					var idname = $(this).attr('for');

					setTimeout(function () {
						$('#' + idname + '_inp').focus();
					}, 0);
				});
				$doc.find('.ui-select select').off('change.ui').on('change.ui', selectChange );
			}

			function selectLeave() {
				$('body').data('select-open', true);
			}
			function selectChange() {
				var $this = $(this);
				$this.closest('.ui-select').data('fn');

				Global.select.act({
					id:$this .attr('id'),
					current: $this.find('option:selected').index(),
					callback: $this.data('callback'), original:true
				});
			}
			function optBlur() {
				optClose();
			}
			function selectClick() {
				var $btn = $(this);
				$btn.data('sct', $(doc).scrollTop());

				setOption(this, $btn.closest('.ui-select').find('option:selected').index() );
				optExpanded(this);
			}
			function optClick() {
				var t = this;
				var idx =  $(t).index();

				if (customscroll) {
					Global.select.act({ 
						id: $(t).closest('.ui-select').find('.ui-select-btn').data('id'), 
						current: idx 
					});

					$(t).closest('.ui-select').find('.ui-select-btn').focus();
					optClose();
				} else {
					scrollSelect(idx, $(t).closest('.ui-select').find('.ui-select-wrap') );
				}
			}
			function selectOver() {
				$('body').data('select-open', false);
			}
			function selectKey(e) {
				var t = this,
					$btn = $(this),
					id = $btn.data('id'),
					$list = $('#' + id + '_list'),
					$wrap = $list.closest('.ui-select-wrap'),
					$opts = $wrap.find('.ui-select-opts'),
					$opt = $wrap.find('.ui-select-opt'),

					n = Number($list.find('.selected').index()),
					nn = 0,
					nnn = 0,
					wrap_h = $wrap.outerHeight(),
					len = $opt.length,
					n_top = 0;

				if (e.altKey) {
					if (e.keyCode === keys.up) {
						optOpen(t);
					}

					e.keyCode === keys.down && optClose();
					return;
				}

				switch (e.keyCode) {
					case keys.up:
					case keys.left:
						nn = n - 1 < 0 ? 0 : n - 1;
						nnn = Math.abs($opts.position().top);
						n_top = $opt.eq(nn).position().top + nnn;

						optScroll($wrap, n_top, wrap_h, 'up');
						optPrev(e, id, n, len);
						break;

					case keys.down:
					case keys.right:
						nn = n + 1 > len - 1 ? len - 1 : n + 1;
						nnn = Math.abs($opts.position().top);
						n_top = $opt.eq(nn).position().top + nnn;
						
						optScroll($wrap, n_top, wrap_h, 'down');
						optNext(e, id, n, len);
						break;
				}
			}
			function optExpanded(t) {
				if (Global.state.device.mobile) {
					optOpen(t)
				} else {
					if ($(t).attr('aria-expanded') === 'false') {
						optClose();
						optOpen(t);
					} else {
						optClose();
					}
				}
			}
			function optScroll($wrap, n_top, wrap_h, key) {
				Global.scroll.move({ 
					value: Number(n_top), 
					selector: customscroll ? $wrap.find('> .ui-scrollbar-item') : $wrap, 
					effect: 'auto', 
					ps: 'top' 
				});
			}
			function optPrev(e, id, n, len) {
				e.preventDefault();
				n === 0 ? n = 0 : n = n - 1;
				Global.select.act({ id: id, current: n });
			}
			function optNext(e, id, n, len) {
				e.preventDefault();
				n === len - 1 ? n = len - 1 : n = n + 1;
				Global.select.act({ id: id, current: n });
			}
			function optOpen(t) {
				var $body = $('body'),
					_$sel = $(t),
					_$uisel = _$sel.closest('.ui-select'),
					_$wrap = _$uisel.find('.ui-select-wrap'),
					_$opts = _$wrap.find('.ui-select-opts'),
					_$opt = _$opts.find('.ui-select-opt');

				var offtop = _$uisel.offset().top,
					scrtop = $(doc).scrollTop(),
					wraph = _$wrap.outerHeight(),
					btn_h = _$sel.outerHeight(),
					opt_h = _$opt.outerHeight(),
					win_h = $(win).outerHeight(),
					className = win_h - ((offtop - scrtop) + btn_h) > wraph ? 'bottom' : 'top';

				$body.addClass('dim-select');

				if (!_$sel.data('expanded')) {
					_$sel.data('expanded', true).attr('aria-expanded', true);
					_$uisel.addClass('on');
					_$wrap.addClass('on ' + className).attr('aria-hidden', false);
					_$opts.find('.ui-select-opt').eq(_$uisel.find(':selected').index());
				}
				
				if (customscroll) {
					Global.scrollBar.init({
						selector: _$wrap
					});
					Global.scroll.move({ 
						value: Number(opt_h * _$uisel.find(':checked').index()), 
						selector: _$wrap.find('> .ui-scrollbar-item'), 
						effect: 'auto', 
						ps: 'top' 
					});
				} else {
					Global.scroll.move({ 
						value: Number(opt_h * _$uisel.find(':checked').index()), 
						selector: _$wrap, 
						effect: 'auto', 
						ps: 'top' 
					});
				}

				openScrollMove(_$uisel);

				var timerScroll = null;
				var touchMoving = false;

				_$wrap.off('touchstart.uiscroll').on('touchstart.uiscroll', function(e){
					var $this = $(this);
					var getScrollTop = $this.scrollTop();
					var currentN = 0;
					clearTimeout(timerScroll);
					touchMoving = false;

					$this.stop();
					
					_$wrap.off('touchmove.uiscroll').on('touchmove.uiscroll', function(e){
						touchMoving = true;
						getScrollTop = $this.scrollTop();

					}).off('touchcancel.uiscroll touchend.uiscroll').on('touchcancel.uiscroll touchend.uiscroll', function(e){
						var _$this = $(this);

						function scrollCompare(){
							timerScroll = setTimeout(function(){
								if (getScrollTop !== _$wrap.scrollTop()) {
									getScrollTop = _$wrap.scrollTop();
									scrollCompare();
								} else {
									currentN = Math.floor((Math.floor(getScrollTop) + 20) / 40);
									scrollSelect(currentN, _$this );
								}
							},100);
						} 

						touchMoving && scrollCompare();
						_$wrap.off('touchmove.uiscroll');
					});
				});
			}

			function scrollSelect(v, _$this){
				console.log(v);
				_$this.stop().animate({
					scrollTop : 40 * v
				}, 100);
				_$this.closest('.ui-select').find('.ui-select-opt').removeClass('selected');
				_$this.closest('.ui-select').find('.ui-select-opt').eq(v).addClass('selected');

				// Global.select.act({ 
				// 	id: _$this.closest('.ui-select').find('.ui-select-btn').data('id'), 
				// 	current: v
				// });
			}

			function openScrollMove(_$uisel){
				var __$uiSel = _$uisel;
				var __scrollTop = Math.floor($(doc).scrollTop());
				var __winH = $(win).outerHeight();
				var __$uiSelBtn = __$uiSel.find('.ui-select-btn');
				var __btnTop = __$uiSelBtn.offset().top;
				var __btnH = __$uiSelBtn.outerHeight();
				var a = Math.floor(__btnTop - __scrollTop);
				var b = __winH - 240;

				__$uiSel.data('orgtop', __scrollTop);

				(a > b) && $('html, body').scrollTop(a - b + __btnH + 10 + __scrollTop);
			}

			function optConfirm() {
				var $this = $(this);
				
				var $body = $('body');
				var $btn = $('.ui-select-btn[aria-expanded="true"]');
				var $select = $btn.closest('.ui-select');
				var $wrap = $select.find('.ui-select-wrap');
				var orgTop = $select.data('orgtop');

				Global.select.act({ 
					id: $btn.data('id'), 
					current: $wrap.find('.selected').index()
				});

				$body.removeClass('dim-select');
				$btn.data('expanded', false).attr('aria-expanded', false).focus();
				$select.removeClass('on');
				$wrap.removeClass('on top bottom').attr('aria-hidden', true);
				$('html, body').scrollTop(orgTop);
			}

			function optClose() {
				var $body = $('body');
				var $btn = $('.ui-select-btn[aria-expanded="true"]');
				var $select = $btn.closest('.ui-select');
				var $wrap = $select.find('.ui-select-wrap');
				var orgTop = $select.data('orgtop');

				$body.removeClass('dim-select');
				$btn.data('expanded', false).attr('aria-expanded', false).focus();
				$select.removeClass('on');
				$wrap.removeClass('on top bottom').attr('aria-hidden', true);
				$('html, body').scrollTop(orgTop);
			}
		},
		act: function(opt){
			var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
				$sel = $('#' + id),
				$uiSelect = $sel.closest('.ui-select');

			var dataCallback = $sel.data('callback'),
				callback = opt.callback === undefined ? dataCallback === undefined ? false : dataCallback : opt.callback,
				current = opt.current,
				org = opt.original === undefined ? false : opt.original;

			//!org && $uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true);
			!org && $uiSelect.find('option').prop('selected', false).eq(current).prop('selected', true).trigger('change');
			//trigger 오류 확인필요
			
			var $optCurrent = $sel.find('option').eq(current);
			var $selButton = $sel.closest('.ui-select').find('.ui-select-btn');

			!$optCurrent.prop('hidden')
				?  $selButton.removeClass('opt-hidden')
				:  $selButton.addClass('opt-hidden');

			$uiSelect.find('.ui-select-btn span').text($optCurrent.text());
			$uiSelect.find('.ui-select-opt').removeClass('selected').eq(current).addClass('selected');

			Global.state.device.mobile && $uiSelect.find('.ui-select-opt').eq(current).focus();

			callback && callback({ 
				id: id, 
				current: current, 
				val: $optCurrent.val() 
			});
		}
	}

	Global.accordion = {
		options: {
			current: null,
			autoclose: false,
			callback: false,
			add: false,
			level: 3,
			effect: Global.state.effect.easeInOut,
			effTime: '.2'
		},
		init: function(opt){
			if (opt === undefined) {
				return false;
			}
	
			var opt = $.extend(true, {}, Global.accordion.options, opt);
			var id = opt.id;
			var current = opt.current;
			var callback = opt.callback;
			var autoclose = opt.autoclose;
			var level = opt.level;
			var add = opt.add;

			var	$acco = $('#' + id);
			var	$wrap = $acco.children('.ui-acco-wrap');
			var	$pnl = $wrap.children('.ui-acco-pnl');
			var	$tit = $wrap.children('.ui-acco-tit');
			var	$btn = $tit.find('.ui-acco-btn');
	
			var	len = $wrap.length; 
			var	keys = Global.state.keys;
			var	optAcco;
	
			var para = Global.para.get('acco');
			var	paras;
			var	paraname;
			
			//set up
			if (!!para && !add) {
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
	
			if (add) {
				current = [];
				var ss = JSON.parse(sessionStorage.getItem(id));
	
				autoclose = autoclose || ss.close;
	
				$acco.find('.ui-acco-btn.selected').each(function(){
					current.push($(this).closest('.ui-acco-wrap').index());
				});
				$btn.removeAttr('acco-last').removeAttr('acco-first');
	
				autoclose = $acco.data('opt').close;
				callback = $acco.data('opt').callback;
			}
	
			sessionStorage.setItem(id, JSON.stringify({ 'close': autoclose, 'current': current }) );
			Global.accordion[id] = callback;
	
			//set up
			!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';
			$acco.data('opt', { 
				id: id, 
				close: autoclose, 
				callback: callback
			});
	
			for (var i = 0; i < len; i++) {
				var $wrap_i = $wrap.eq(i),
					$accotit = $wrap_i.find('> .ui-acco-tit'),
					$accopln = $wrap_i.find('> .ui-acco-pnl'),
					$accobtn = $accotit.find('.ui-acco-btn');
	
				if ($accotit.prop('tagName') !== 'DT') {
					$accotit.attr('role','heading');
					$accotit.attr('aria-level', level);
				}
				
				if (!$accopln) {
					$accopln = $accotit.children('.ui-acco-pnl');
				}
	
				($accotit.attr('id') === undefined) && $accobtn.attr('id', id + '-btn' + i);
				($accopln.attr('id') === undefined) && $accopln.attr('id', id + '-pnl' + i);
				
				$accobtn
					.data('selected', false)
					.attr('data-n', i)
					.attr('data-len', len)
					.attr('aria-expanded', false)
					.attr('aria-controls', $accopln.attr('id'))
					.removeClass('selected');
				$accopln
					.attr('data-n', i)
					.attr('data-len', len)
					.attr('aria-labelledby', $accobtn.attr('id'))
					.attr('aria-hidden', true).hide();
	
				(i === 0) && $accobtn.attr('acco-first', true);
				(i === len - 1) && $accobtn.attr('acco-last', true);
			}
			
			if (current !== null) {
				Global.accordion.toggle({ 
					id: id, 
					current: current, 
					motion: false 
				});
			}
	
			//event
			$btn.off('click.uiaccotab keydown.uiaccotab')
				.on({
					'click.uiaccotab': evtClick,
					'keydown.uiaccotab': evtKeys
				});
	
			function evtClick(e) {
				if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
					e.preventDefault();
					var $this = $(this);
	
					optAcco = $this.closest('.ui-acco').data('opt');
					Global.accordion.toggle({ 
						id: optAcco.id, 
						current: [$this.data('n')], 
						close: optAcco.close, 
						callback: optAcco.callback
					});
				}
			}
			function evtKeys(e) {
				var $this = $(this),
					n = Number($this.data('n')),
					m = Number($this.data('len')),
					id = $this.closest('.ui-acco').attr('id');
	
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
					
					!$this.attr('acco-first') ?
					$('#' + id + '-btn' + (n - 1)).focus():
					$('#' + id + '-btn' + (m - 1)).focus();
				}
				function downRightKey(e) {
					e.preventDefault();
	
					!$this.attr('acco-last') ? 
					$('#' + id + '-btn' + (n + 1)).focus():
					$('#' + id + '-btn0').focus();
				}
				function endKey(e) {
					e.preventDefault();
	
					$('#' + id + '-btn' + (m - 1)).focus();
				}
				function homeKey(e) {
					e.preventDefault();
					$('#' + id + '-btn0').focus();
				}
			}
		},
		toggle: function(opt){
			if (opt === undefined) {
				return false;
			}
			
			var id = opt.id,
				$acco = $('#' + id),
				dataOpt = $acco.data('opt'),
				current = opt.current === undefined ? null : opt.current;
	
			console.log(dataOpt);
	
			var	callback = opt.callback === undefined ? dataOpt.callback : opt.callback,
				state = opt.state === undefined ? 'toggle' : opt.state,
				motion = opt.motion === undefined ? true : opt.motion,
				autoclose = dataOpt.close,
				open = null,
				$wrap = $acco.children('.ui-acco-wrap'),
				$pnl,
				$tit,
				$btn,
				len = $wrap.length,
				speed = 200,
				i, c = 0;
			
			(motion === false) ? speed = 0 : speed = 200;
	
			if (current !== 'all') {
				for (i = 0 ; i < current.length; i++) {
					$pnl = $wrap.eq(current[i]).children('.ui-acco-pnl');
					$tit = $wrap.eq(current[i]).children('.ui-acco-tit');
					$btn = $tit.find('.ui-acco-btn');
					
					if (state === 'toggle') {
						(!$btn.data('selected')) ? act('down') : act('up');
					} else {
						(state === 'open') ? act('down') : (state === 'close') ? act('up') : '';
					}
				}
				!callback ? '' :
					callback({ 
						id:id, 
						open:open, 
						current:current
					});
			} else if (current === 'all') {
				checking();
			}
	
			function checking() {
				//열린상태 체크하여 전체 열지 닫을지 결정
				c = 0;
				$wrap.each(function(i){
					c = ($wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').attr('aria-expanded') === 'true') ? c + 1 : c + 0;
				});
				//state option 
				if (state === 'open') {
					c = 0;
					$acco.data('allopen', false);
				} else if (state === 'close') {
					c = len;
					$acco.data('allopen', true);
				}
				//all check action
				if (c === 0 || !$acco.data('allopen')) {
					$acco.data('allopen', true);
					act('down');
				} else if (c === len || !!$acco.data('allopen')) {
					$acco.data('allopen', false);
					act('up');
				}
			}
			function act(v) {
				var isDown = v === 'down',
					a = isDown ? true : false, 
					cls = isDown ? 'addClass' : 'removeClass', 
					updown = isDown ? 'slideDown' : 'slideUp';
				
				open = isDown ? true : false;
	
				if (autoclose === true && isDown) {
					$wrap.each(function(i){
						$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', false).removeClass('selected').attr('aria-expanded', false);
						$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden',true).stop().slideUp(speed);
					});
				}
	
				if (current === 'all') {
					$wrap.each(function(i){
						$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', a)[cls]('selected').attr('aria-expanded', a);
						$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden', !a).stop()[updown](speed, function(){
							$(this).css({ height: '', padding: '', margin: '' }); 
						});
					});
				} else {
					$btn.data('selected', a).attr('aria-expanded', a)[cls]('selected');
					$pnl.attr('aria-hidden', !a).stop()[updown](speed, function(){
						$(this).css({ height: '', padding: '', margin: '' }); 
					});
				}
			}
		}
	}

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

	Global.dropdown = {
		options: {
			ps: 'BL',
			hold: true,
			area: doc.querySelector('body'),
			src: false,
			offset: true,
			openback:false,
			closeback:false
		},
		init: function(opt){
			if (opt === undefined || !$('#' + opt.id).length) {
				return false;
			}
	
			const option = Object.assign({}, Global.dropdown.options, opt);
			const id = option.id;
			const ps = option.ps;
			const hold = option.hold;
			const area = option.area;
			const src = option.src;
			const offset = option.offset;
			const openback = option.openback;
			const closeback = option.closeback;
			
			//ajax 
			if (!!src && !$('[data-id="' + id + '"]').length) {
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
				var $btn = $('#' + id),
					$pnl = $('[data-id="'+ id +'"]'); 
	
				//set up
				$btn.attr('aria-expanded', false)
					.data('opt', { 
						id: id, 
						ps: ps,
						hold: hold, 
						openback: openback,
						closeback: closeback,
						offset: offset
					});
				$pnl.attr('aria-hidden', true).attr('aria-labelledby', id)
					.data('opt', { 
						id: id, 
						ps: ps,
						hold: hold, 
						openback: openback,
						closeback: closeback,
						offset: offset
					});
				
				//event
				$btn.off('click.dp').on('click.dp', function(e){
					e.preventDefault();
					action(this);
				});
				$(doc).find('.ui-drop-close').off('click.dp').on('click.dp', function(e){
					var pnl_opt = $('#' + $(this).closest('.ui-drop-pnl').data('id')).data('opt');
					Global.dropdown.toggle({ 
						id: pnl_opt.id 
					});
					$('#' + pnl_opt.id).focus();
				});
				//dropdown 영역 외에 클릭 시 
				$(doc).off('click.dpb').on('click.dpb', function(e){
					e.preventDefault();
					if (!!$('body').data('dropdownOpened')){
						if ($(doc).find('.ui-drop-pnl').has(e.target).length < 1) {
							Global.dropdown.hide();
						}
					}
				});

				
				function action(t) {
					var $this = $(t),
						btn_opt = $this.data('opt');
	
					$this.data('sct', $(doc).scrollTop());
					Global.dropdown.toggle({ 
						id: btn_opt.id 
					});
				}
			}
		},
		toggle: function(opt) {
			if (opt === undefined) {
				return false;
			}
			
			var id = opt.id,
				$btn = $('#' + id),
				$pnl = $('.ui-drop-pnl[data-id="'+ id +'"]'),
				defaults = $btn.data('opt'),
				opt = $.extend(true, {}, defaults, opt),
				
				ps = opt.ps,
				openback = opt.openback,
				closeback = opt.closeback,
				hold = opt.hold,
				state = opt.state,
				offset = opt.offset,
				btnExpanded =  $btn.attr('aria-expanded'),
				is_modal = !!$btn.closest('.ui-modal').length,
	
				btn_w = Math.ceil($btn.outerWidth()),
				btn_h = Math.ceil($btn.outerHeight()),

				btn_t = Math.ceil($btn.position().top) + parseInt($btn.css('margin-top')),
				btn_l = Math.ceil($btn.position().left) + parseInt($btn.css('margin-left')),

				pnl_w = Math.ceil($pnl.outerWidth()),
				pnl_h = Math.ceil($pnl.outerHeight());
	
			//offset: ture 이거나 modal안의 dropdown 일때 position -> offset 으로 위치 값 변경
			if (offset || is_modal) {
				btn_t = Math.ceil($btn.offset().top);
				btn_l = Math.ceil($btn.offset().left);
				is_modal ? btn_t = btn_t - $(win).scrollTop(): '';
			}
			
			//test 
			!!$btn.attr('data-ps') ? ps = $btn.attr('data-ps') : '';
			
			if (state === 'open') {
				btnExpanded = 'false';
			} else if (state === 'close') {
				btnExpanded = 'true';
			}
			
			btnExpanded === 'false' ? pnlShow(): pnlHide();

			function pnlShow(){
				var drop_inner = $btn.closest('.ui-drop-pnl').data('id');
				
				//dropdown in dropdown 인 경우
				if (!!drop_inner) {
					$('.ui-drop').not('#' + drop_inner).attr('aria-expanded', false);
					$('.ui-drop-pnl').not('[data-id="' + drop_inner +'"]')
							.attr('aria-hidden', true)
							.attr('tabindex', -1)
							.removeAttr('style');
				} else {
					Global.dropdown.hide();
				}
				
				Global.focus.loop({
					selector: $('.ui-drop-pnl[data-id="'+ id +'"]'),
					callback:pnlHide
				});
				//focus hold or sense
				// hold ?	
				// 	Global.focus.loop({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
				// 	Global.focus.loop({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });
				$btn.attr('aria-expanded', true);				
				
				switch (ps) {
					case 'BL': 
						$pnl.css({ 
							top: btn_t + btn_h, 
							left: btn_l
						}); 
						break;
					case 'BC': 
						$pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
						break;
					case 'BR': 
						$pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); 
						break;
					case 'TL': 
						$pnl.css({ top: btn_t - pnl_h, left: btn_l }); 
						break;
					case 'TC': 
						$pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
						break;
					case 'TR': 
						$pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); 
						break;
					case 'RT': 
						$pnl.css({ top: btn_t, left: btn_l + btn_w }); 
						break;
					case 'RM': 
						$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left:  btn_l + btn_w  }); 
						break;
					case 'RB': 
						$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); 
						break;
					case 'LT': 
						$pnl.css({ top: btn_t, left: btn_l - pnl_w }); 
						break;
					case 'LM': 
						$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w  }); 
						break;
					case 'LB': 
						$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); 
						break; 
					case 'CM': 
						$pnl.css({ top: '50%', left: '50%', marginTop: (pnl_h / 2 ) * -1, marginLeft: (pnl_w / 2 ) * -1 }); 
						break;
				}
				
				$pnl.attr('aria-hidden', false).addClass('on');

				setTimeout(function(){
					$('body').data('dropdownOpened',true).addClass('dropdownOpened');
					setTimeout(function(){
						$pnl.focus();
					},0);
				},0);
	
				!!openback ? openback() : '';							
			}
			function pnlHide(){
				if ($('#' + id).closest('.ui-drop-pnl').length < 1) {
					$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
				}
	
				$btn.attr('aria-expanded', false).focus();
				$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
				
				!!closeback ? closeback() : '';
			}

			
		}, 
		hide: function(opt) {
			$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
			$('.ui-drop').attr('aria-expanded', false);
			$('.ui-drop-pnl[aria-hidden="false"]').each(function(){
				var $pnl = $(this),
					defaults = $pnl.data('opt'),
					opt = $.extend(true, {}, defaults),
					closeback = opt.closeback;
				
				$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
				!!closeback ? closeback() : '';
			});	
		}
	}	
	
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

	Global.modal = {
		options : {
			/* type : normal, system */
			type: 'normal',
			// wrap: false,
			full: false,
			ps: 'center',
			src: false,
			remove: false,
			width: false,
			height: false,
			innerScroll: false,
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
			remove: false,
			endfocus: false
		},
		show: function(option){
			const opt = Object.assign({}, Global.modal.options, option);

			const elBody = doc.querySelector('body');
			
			const type = opt.type;
			
			const src = opt.src;
			const full = opt.full;
			const ps = opt.ps;
			let mg = opt.mg;
			const w = opt.width;
			const h = opt.height;
			const innerScroll = opt.innerScroll;

			const scr_t = doc.documentElement.scrollTop;

			let id = opt.id;
			let remove = opt.remove;
			let endfocus = opt.endfocus === false ? document.activeElement : typeof opt.endfocus === 'string' ? doc.querySelector('#' + opt.endfocus) : opt.endfocus;

			const callback = opt.callback;
			const closeCallback = opt.closeCallback;
			let timer;
			
			const sMessage = opt.sMessage;
			const sBtnConfirmTxt = opt.sBtnConfirmTxt;
			const sBtnCancelTxt = opt.sBtnCancelTxt;
			const sZindex = opt.sZindex;
			const sClass = opt.sClass;

			const sConfirmCallback = opt.sConfirmCallback;
			const sCancelCallback = opt.sCancelCallback;

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
			} else {
				//system modal
				endfocus = null;
				remove = true;
				id = 'uiSystemModal';
				makeSystemModal();
			}

			if (endfocus === 'body') {
				endfocus = elBody.dataset.active;
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
				console.log(elModal);
				const elModalWrap = elModal.querySelector('.ui-modal-wrap');
				const elModalBody = elModalWrap.querySelector('.ui-modal-body');
				const elModalHeader = elModalWrap.querySelector('.ui-modal-header');
				const elModalFooter = elModalWrap.querySelector('.ui-modal-footer');
				
				const elModals = doc.querySelectorAll('.ui-modal');

				for (let md of elModals) {
					md.classList.remove('current');
					elBody.classList.add('scroll-no');
				}
				
				const elModalOpen = doc.querySelectorAll('.ui-modal.open');
				const openLen = !!elModalOpen ? elModalOpen.length : 0;

				elModal.setAttribute('tabindex', 0);
				elModal.setAttribute('role', 'dialog');
				
				elModal.classList.add('n' + openLen);
				elModal.classList.add('current');

				elModal.dataset.n = openLen;
				elModal.dataset.scrolltop = scr_t;
				//elModal.dataset.closecallback = closeCallback;

				if (full) {
					elModal.classList.add('type-full');
					mg = 0;
				} 

				doc.querySelector('html').classList.add('is-modal');
				
				switch (ps) {
					case 'center' :
						elModal.classList.add('ready');
						elModal.classList.add('ps-center');
						break;
					case 'top' :
						elModal.classList.add('ready');
						elModal.classList.add('ps-top');
						break;
					case 'bottom' :
						elModal.classList.add('ready');
						elModal.classList.add('ps-bottom');
						break;
				}
	
				const headerH = !!elModalHeader ? elModalHeader.offsetHeight : 0;
				const footerH = !!elModalFooter ? elModalFooter.offsetHeight : 0;

				if (!full) {
					console.log(1111);
					//lyaer modal
					if (!h) {
						const win_h = win.innerHeight;
						const max_h = win_h - (headerH + footerH + (mg * 2));

						elModalBody.classList.add('is-scrollable');
						elModalBody.style.maxHeight = max_h + 'px';
						elModalBody.style.overflowY = 'auto';
						elModalBody.style.height = '100%';

					} else {
						elModalBody.classList.add('is-scrollable');
						elModalBody.style.overflowY = 'auto';
						elModalBody.style.height = h + 'px';
					}
				} else {
					//full modal
					!!w ? elModalWrap.style.width = w : '';
					if (!!h) {
						elModalBody.style.height = h + 'px';
						elModalBody.style.overflowY = 'auto';
					} else {
						elModalBody.style.height = '100%';
						elModalBody.style.maxHeight = (win.innerHeight - headerH - footerH)  + 'px';
						elModalBody.style.overflowY = 'auto';
					}
				}

				
				clearTimeout(timer);
				timer = setTimeout(function(){
					// Global.focus.loop({ 
					// 	selector: elModal, 
					// });


					// Global.focus.loop({ 
					// 	selector: elModal, 
					// 	type:'hold' 
					// });

					elModal.classList.add('open');

					!!sZindex ? elModal.style.zIndex = sZindex : '';
					callback && callback(opt);

					//doc.querySelector('html').addEventListener('click', dimAct);
					
					function dimAct(e){
						const elTarget = e.currentTarget;
						const elWrap = elTarget.closest('.ui-modal-wrap');
						const elOpens = doc.querySelectorAll('.ui-modal.open');

						console.log(e);

						if (!elWrap) {
							let openN = [];

							for (let elOpen of elOpens) {
								const thisN = elOpen.dataset.n;

								thisN !== undefined ?
									openN.push(thisN) : '';
							}

							

							const elCurrent = doc.querySelector('.ui-modal.open[n="'+ Math.max.apply(null, openN) +'"]');
							const currentID = elCurrent.id;

							if (currentID !== 'uiSystemModal') {
								netive.modal.hide({ 
									id: currentID, 
									remove: remove,
									closeCallback: closeCallback
								});
							}
						}
					}

					win.innerHeight < elModal.querySelector('.ui-modal-wrap').offsetHeight ? 
						elModal.classList.add('is-over'):
						elModal.classList.remove('is-over');
				},150);

				// close button
				const elCloses = doc.querySelectorAll('.ui-modal-close');

				for (let elClose of elCloses) {
					elClose.addEventListener('click', closeAct);
				}

				function closeAct(e){
					const elThis = e.currentTarget;
					const elThisModal = elThis.closest('.ui-modal');
					netive.modal.hide({ 
						id: elThisModal.id, 
						remove: remove,
						closeCallback: closeCallback
					});
				}

				const elCofirms = doc.querySelectorAll('.ui-modal-confirm');
				const elCancels = doc.querySelectorAll('.ui-modal-cancel');
				/*
				for (let el of elCofirms) {
					el.addEventListener('click', sConfirmCallback);
				}

				for (let el of elCancels) {
					el.addEventListener('click', sCancelCallback);
				}

	
				for (let el of elModals) {
					const elModalBtns = el.querySelectorAll('button');
					const elModalAs = el.querySelectorAll('a');

					console.log(elModalBtns);

					for (let el2 of elModalBtns) {
						el2.addEventListener('click', sCancelCallback);
					}
					for (let el3 of elModalAs) {
						el3.addEventListener('click', sCancelCallback);
					}
				}
				*/
				

				function active(e){
					const elThis = e.currentTarget;
					const elModal = elThis.closest('.ui-modal');
					elModal.dataset.active = elThis;
				}

				elModalWrap.addEventListener('transitionend', modalTrEnd);
 				
				function modalTrEnd(){
					console.log('modalTrEnd');
					if (!!full) {
						elModal.classList.add('fix-header');
						elModalBody.style.paddingTop = (headerH + 10)  + 'px';
					}
				}


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
		reset: function(opt) {
			var $modal = $('.ui-modal.open.ps-center');

			for (var i = 0, len = $modal.length; i < len; i++) {
				var $this = $modal.eq(i);
				var $head = $this.find('.ui-modal-header');
				var $body = $this.find('.ui-modal-body');
				var $foot = $this.find('.ui-modal-footer');
				var h_win = $(win).outerHeight();
				var h_head = $head.outerHeight();
				var h_foot = $foot.outerHeight();

				if (Global.browser.size !== 'desktop') {
					$body.css({
						'min-height': h_win - (h_head + h_foot) + 'px',
						'max-height': h_win - (h_head + h_foot) + 'px'
					});
				} else {
					$body.css({
						'min-height': '',
						'max-height': ''
					});
				}
			}
		},
		hide: function(option){
			
			const opt = Object.assign({}, Global.modal.optionsClose, option);
			const id = opt.id;
			var type = opt.type;
			var remove = opt.remove;
			var elModal = doc.querySelector('#' + id);
			var endfocus = opt.endfocus;
			var closeCallback = opt.closeCallback === undefined ? elModal.dataset.closecallback === undefined ? false : elModal.dataset.closecallback : opt.closeCallback;
			var elModalWrap = elModal.querySelector('.ui-modal-wrap');

			//elModalWrap.off('transitionend.modal');
			elModal.classList.remove('open')
			elModal.classList.add('close');
			elModal.classList.remove('fix-header');
			//$(win).off('resize.modal');

			var timer;
			const elOpen = doc.querySelectorAll('.ui-modal.open');
			const len = elOpen.length > 0 ? elOpen.length : false;
			let elModalPrev = false;

			console.log(len, elModalPrev);

			if (!!len) {
				elModalPrev = doc.querySelector('.ui-modal.open.n' + len - 1);
				elModalPrev.classList.add('current');
			}

			
			const elBody = doc.querySelector('body');
			const elHtml = doc.querySelector('html');

			if (type !== 'system') {
				if (!len) {
					endfocus = endfocus === false ? elBody.dataset.active : typeof opt.endfocus === 'string' ? doc.querySelector('#' + opt.endfocus) : opt.endfocus;

					//$('html').off('click.uimodaldim');
					elHtml.classList.remove('is-modal');
				} else {
					endfocus = endfocus === false ? elModalPrev.data.active : typeof opt.endfocus === 'string' ? doc.querySelector('#' + opt.endfocus) : opt.endfocus;
				}
			}

			
			
			Global.scroll.move({
				value: Number(elModal.dataset.scrolltop)
			});
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				const elWrap = elModal.querySelector('.ui-modal-wrap');
				const elOpen = doc.querySelectorAll('.ui-modal.open');
				const len = !!elOpen ? elOpen.length : false;
				const elHtml = doc.querySelector('html');
				const elBody = doc.querySelector('body');

				elWrap.removeAttribute('style');
				elBody.removeAttribute('style');
				
		
				//elModal.removeClass('ready is-over current close ps-bottom ps-top ps-center type-normal type-full n0 n1 n2 n3 n4 n5 n6 n7');
				elModal.dataset.n = null;
				
				if (!len) {
					elHtml.classList.remove('scroll-no');
					elBody.classList.remove('scroll-no');
				}
				//closeCallback ? closeCallback(opt) : '';
				remove ? elModal.remove() : '';

				console.log(remove);

				!!endfocus ? endfocus.focus() : '';
			},210);
		}, 
		hideSystem: function(opt){
			netive.modal.hide({ 
				id: 'uiSystemModal', 
				remove: true,
				type: 'system'
			});
		}
	}


	/* ------------------------
	* name : tab
	* date : 2020-06-14
	------------------------ */	
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
				value: ps_l[current], 
				target: $btns,
				effect: 'auto', 
				ps: align
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
					value: ps_l[current], 
					add : $btn.outerWidth(),
					selector: $target, 
					ps: align 
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

	//width 값 동일하게 적용
	Global.samWidth = (org, target) => {
		target.forEach(el => el.style.width = org.offsetWidth + 'px');
	}

	/* ------------------------
	* name : tooltip
	* date : 2021-08-20
	------------------------ */	
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


	/* ------------------------
	* name : coding list
	* date : 2020-06-20
	------------------------ */	
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

	/* ------------------------
	* name : count number
	* date : 2020-06-20
	------------------------ */
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
				textNum = Global.uiParts.comma(countNum);
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

					var n = Global.uiParts.comma(count);
					$base.text(n);
					v = v + 1;

					if(count < countNum) {
						timer = setTimeout(function() { 
							counter(); 
						}, s);
					} else {
						$base.text(Global.uiParts.comma(countNum));
						clearTimeout(timer);
					}
				}
				counter();
			}
		}
	}

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

	/* ------------------------
	* name : dragglable
	* date : 2020-06-20
	------------------------ */	
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
	


	




























































	


	



	/* ------------------------------------------------------------------------
	 * slide(carousel) v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	Global.swiper = {
		options: {
			current:0,
			multi:false,
			loop:true,
			items:1,
			eff:'slide',
			dot:true,
			nav:true,
			auto:true,
			play:false,
			gauge:true,
			resize: true,
			speed:300,
			autoTime:3000,
			callback: false,
			/* multi use */
			margin:0,
			mouseDrag:true,
			touchDrag:true
		},
		init: function(opt) {
			//option guide
			if (opt === undefined) {
				return false;
			}
			
			Global.swiper[opt.id] = {};
			var base = Global.swiper[opt.id];

			//루트설정
			base.root = $('#' + opt.id);
			base.tit = base.root.find('.ui-slide-tit');
			base.wrap = base.root.find('.ui-slide-wrap');
			base.itemwrap = base.root.find('.ui-slide-itemwrap');
			base.item = base.root.find('.ui-slide-item');
			base.itemtit = base.root.find('.ui-slide-itemtit');

			//옵션저장
			base.opt = $.extend({}, Global.swiper.options, opt);
			
			//중복실행 방지
			if (!base.root.is('.load')) {
				base.root.addClass('load');
				uiSlideSet(base);

				
			}
		},
		fnEvt: function(opt) {
			//함수실행
			var base = $('#' + opt.id).data('base');
				
			base.opt.current = opt.current;
			base.dir = base.opt.past < base.opt.current ? 'next' : 'prev';
			
			uiSlideAct(base);
		},
		fnAuto: function(opt) {
			//함수실행
			var base = $('#' + opt.id).data('base');

			base.opt.auto ? uiSlideAutoEvt(base, opt.play) : '';
		}
	}

	function uiSlideSet(base){
		var base = base;

		//기본필요값 설정
		base.opt.len = base.item.length;
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.opt.win_w = $(win).outerWidth();
		base.opt.docw = $(doc).outerHeight();
		
		//multi
		base.multi = {};
		base.multi.is = base.opt.multi;
		if (base.multi.is) {
			base.multi.w = [0]; //items width array
			base.multi.h = [];
			base.multi.ww = 0; //itemwrap width
			base.multi.rw = base.root.outerWidth(); //slide width
			base.root.addClass('ui-slide-multi n' + base.opt.items);
			base.itemwrap.addClass('ui-slide-multiitem');
			
			for (var i = 0; i < base.opt.len; i++) {
				base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
				base.multi.h.push(base.item.eq(i).outerHeight());
				base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
				base.multi.w.push(base.multi.ww);
			}
			base.itemwrap.css('width', base.multi.ww);
			base.itemwrap.data('left', 0) ;
		}
		
		//current item 설정
		//base.opt.eff !== 'slide' ? base.item.addClass('animated') : '';
		if (!base.multi.is) {
			base.item.attr('aria-hidden', true).css('left', base.opt.w).eq(base.opt.current).attr('aria-hidden', false).css('left',0);
		}
		
		//heigth 설정
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);

		//이벤트 관련 설정
		base.evt = {};
		base.evt.offsetX = 0;
		base.evt.offsetY = 0;
		base.evt.activate = false; //현재 모션 여부
		base.evt.swap = 'off'; //dragmove,cancel 이벤트 실행여부
		base.evt.cancel = false;
		base.evt.xaxis = false;
		base.evt.movX = 0;
		base.evt.movY = 0;

		//자동진행
		base.auto = {};
		base.timer = {};
		base.timers = {};
		
		//fade effect value
		base.fade = {};
		base.fade.opacity = 0;
		
		//control 
		(base.opt.dot) ? uiSlideDot(base) : ''; 
		(base.opt.nav) ? uiSlideNav(base) : '';
		(base.opt.auto) ? uiSlideAuto(base) : '';
		(base.opt.gauge) ? uiSlideGauge(base) : ''; 
		
		uiSlideReset(base);
		uiSlideEvtType(base);
		uiSlideEvt(base);

		$(win).resize(function(){
			base.itemwrap.find('.ui-slide-item[aria-hidden="true"]').css('left', base.itemwrap.outerWidth());
			uiSlideReset(base);
			uiSlideEvtType(base);
			uiSlideEvt(base);
		});
		base.root.data('base', base);
	}
	function uiSlideDot(base) {
		var base = base,
			i, dotwrap, dotdiv, selected;
		
		dotwrap = doc.createElement("div");
		dotdiv = doc.createElement("div");
		$(dotwrap).addClass('ui-slide-dotwrap');
		$(dotdiv).addClass('ui-slide-dotdiv').attr('role', 'tablist');

		for (i = 0; i < base.opt.len; i++) {
			selected = (base.opt.current === i) ? 'true' : 'false'; 
			$(dotdiv).append('<button class="ui-slide-dot" type="button" role="tab" aria-selected="' + selected + '"><span class="hide">' + base.item.eq(i).find(".ui-slide-itemtit").text() + '</span></button>');
		}
		base.root.prepend(dotwrap);
		base.dotwrap = base.root.find('.ui-slide-dotwrap');
		base.dotwrap.append(dotdiv);
		base.dotdiv = base.dotwrap.find('.ui-slide-dotdiv');
		base.dotbtn = base.dotdiv.find('.ui-slide-dot');
	}
	function uiSlideNav(base) {
		var base = base,
			navwrap, $navwrap, eqNext, eqPrev;
		
		eqNext = base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1;
		eqPrev = base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1;
		
		navwrap = doc.createElement("div");
		$navwrap = $(navwrap);
		
		$navwrap.addClass('ui-slide-navwrap');
		$navwrap.append('<button type="button" class="ui-slide-prev">이전 : <span>' + base.item.eq(eqPrev).find(".ui-slide-itemtit").text() + '</span></button>');
		$navwrap.append('<button type="button" class="ui-slide-next">다음 : <span>' + base.item.eq(eqNext).find(".ui-slide-itemtit").text() + '</span></button>');
		base.root.append(navwrap);
		
		base.nav = base.root.find('.ui-slide-navwrap');
		base.nav.prev = base.nav.find('.ui-slide-prev');
		base.nav.next = base.nav.find('.ui-slide-next');
	}
	function uiSlideAuto(base) {
		var base = base,
				dotwrap, autobtn;

			if (!base.root.find('.ui-slide-dotwrap').length) {
				dotwrap = doc.createElement("div");
				$(dotwrap).addClass('ui-slide-dotwrap');
				base.root.prepend(dotwrap);
				base.dotwrap = base.root.find('.ui-slide-dotwrap');
			}
			if (!!base.opt.play) {
				autobtn = '<button type="button" class="ui-slide-auto" state="play"><span>정지</span></button>';
			} else {
				autobtn = '<button type="button" class="ui-slide-auto" state="stop"><span>자동 진행</span></button>';
			}
			base.dotwrap.prepend(autobtn);
			base.autobtn = base.dotwrap.find('.ui-slide-auto');
			(base.opt.play && base.opt.auto) ? uiSlideAutoEvt(base, true) : '';
	}
	function uiSlideGauge(base) {
		var base = base,
			gaugewrap = doc.createElement("div"),
			$gaugewrap = $(gaugewrap);
		
		$gaugewrap.addClass('ui-slide-gauge');
		$gaugewrap.append('<div class="ui-slide-gaugebar"></div>');
		base.root.append(gaugewrap);
		
		base.gauge =  base.root.find('.ui-slide-gauge');
		base.gauge.bar = base.gauge.find('.ui-slide-gaugebar');
	}
	function uiSlideReset(base) {
		var base = base;

		$(win).resize(function(){
			clearTimeout(base.timers);
			base.timers = setTimeout(function(){
				if (base.opt.win_w !== $(win).outerWidth()) {
					base.opt.len = base.item.length;
					base.opt.w = base.item.eq(base.opt.current).outerWidth();
					base.opt.h = base.item.eq(base.opt.current).outerHeight();
					base.opt.win_w = $(win).outerHeight();
					base.opt.docw = $(doc).outerHeight();
					base.evt.activate = false; //현재 모션 여부
					
					if (base.multi.is) {
						base.multi.w = [0]; //items width array
						base.multi.h = [];
						base.multi.ww = 0; //itemwrap width
						base.multi.rw = base.root.outerWidth(); //slide width
						base.root.addClass('ui-slide-multi n' + base.opt.items);
						base.itemwrap.addClass('ui-slide-multiitem');
						
						for (var i = 0; i < base.opt.len; i++) {
							base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
							base.multi.h.push(base.item.eq(i).outerHeight());
							base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
							base.multi.w.push(base.multi.ww);
						}
						base.itemwrap.css({ width: base.multi.ww, left: 0 });
						base.itemwrap.data('left', 0) ;
					}
				}
			}, 200);
		});	
	}
	function uiSlideEvtType(base) {
		var base = base,
			types = ['as', 'ever', 'j', 'o'];

		if (base.opt.mouseDrag === true && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide mousedown.uiSlide', 'touchmove.uiSlide mousemove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide mouseup.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === false && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide', 'touchmove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === true && base.opt.touchDrag === false) {
			types = ['mousedown.uiSlide', 'mousemove.uiSlide', 'mouseup.uiSlide', 'click.uiSlide'];
		}
		
		base.evt.start = types[0];
		base.evt.move = types[1];
		base.evt.end = types[2]; 
		base.evt.click = types[3]; 
	}
	function uiSlideEvtCurrent(base){
		var base = base;
		
		//이전 다음 번호생성
		base.evt.next = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
		base.evt.prev = (base.opt.current - 1 < 0) ? base.opt.len - 1 : base.opt.current - 1;
	}
	function uiSlideEvt(base) {
		var base = base;

		base.opt.past = base.opt.current;
		
		//click event
		base.root.off(base.evt.click).on(base.evt.click, 'button', function(){
			var $this = $(this);
			
			if (!base.evt.activate) {
				uiSlideEvtCurrent(base);

				if ($this.hasClass('ui-slide-next')) {
					actfn(base.evt.next, 'next');
				} else if ($this.hasClass('ui-slide-prev')) {
					actfn(base.evt.prev, 'prev');
				} else if ($this.hasClass('ui-slide-dot')) {
					actfn($this.index(), base.opt.past < base.opt.current ? 'next' : 'prev');
				} else if ($this.hasClass('ui-slide-auto')) {
					$this.attr('state') === 'play' && base.opt.auto ? uiSlideAutoEvt(base, false) : uiSlideAutoEvt(base, true);
				}
			}
		});
		function actfn(c, d){
			base.opt.current = c;
			base.dir = d;
			uiSlideAct(base);
			base.opt.auto ? uiSlideAutoEvt(base, false) : '';
		}
		
		if (!base.multi.is) {
			base.item.off(base.evt.start).on(base.evt.start, function(event){
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		} else {
			base.itemwrap.off(base.evt.start).on(base.evt.start, function(event){
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		}
	}
	function uiSlideAutoEvt(base, v) {
		//자동실행 v값이 true이면 실행, false이면 정지
		var base = base;

		if (v === true) {
			base.opt.play = false;
			base.autobtn.attr('state', 'play').find('span').text('정지');
			base.timer = win.requestAFrame(autoRAF);
			//base.timer = window.requestAFrame(autoRAF);
		} else {
			base.opt.play = true;
			base.autobtn.attr('state', 'stop').find('span').text('자동 진행');
			win.cancelAFrame(base.timer);
			//window.cancelAFrame(base.timer);
		}

		function autoRAF(timestamp){
			var tstamp = !timestamp ? base.timer : timestamp.toFixed(0),
				limit = !timestamp ? base.opt.autoTime / 10 : base.opt.autoTime,
				progress;

			(!base.startA) ? base.startA = tstamp : '';
			progress = tstamp - base.startA;
			
			if (progress < limit) {
				base.gauge.bar.css('width', (progress / limit * 100).toFixed(0) + '%');
				base.timer = win.requestAFrame(autoRAF);
				/*base.timer = window.requestAFrame(autoRAF);*/
			} else {
				base.opt.current = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
				base.dir = 'next';
				base.startA = null;
				base.gauge.bar.css('width', '100%');
				
				uiSlideAct(base, callbackAuto);
				
			}
		}
		function callbackAuto(){
			base.timer = win.requestAFrame(autoRAF);
			/*base.timer = window.requestAFrame(autoRAF);*/
		}
	}
	function uiSlideGetTouches(event) {
		//터치 이벤트가 undefined 가 아니라면
		if (event.touches !== undefined) {
			return { x : event.touches[0].pageX, y : event.touches[0].pageY };
		}
		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return { x : event.pageX, y : event.pageY };
			}
			//ie
			if (event.pageX === undefined) {
				return { x : event.clientX, y : event.clientY };
			}
		}
	}
	function uiSlideEvtDrag(base) {
		var base = base;

		if (base.evt.swap === 'on') {
			$(doc).off(base.evt.move).on(base.evt.move, function(event){
				base.root.data('touch', 'move');
				uiSlideDragMove(base, event);
			});
			$(doc).off(base.evt.end).on(base.evt.end, function(event){
				base.root.data('touch', 'end');
				uiSlideDragEnd(base, event);
			});
		} else if (base.evt.swap === 'off') {
			$(doc).off(base.evt.move);
			$(doc).off(base.evt.end);
		}
	}
	function uiSlideDragStart(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;
		
		base.evt.offsetX = uiSlideGetTouches(ev).x;
		base.evt.offsetY = uiSlideGetTouches(ev).y;
		base.evt.swap = 'on';
		base.evt.yaxis = false;

		uiSlideEvtCurrent(base);
		if (!base.multi.is) {
			switch(base.opt.eff){
			case 'slide': 
				startLeft(base.opt.w, base.opt.w * -1);
				break;
			case 'fade': 
				startLeft(0, 0);
				break;
			//The default value is 'slide'. So no default value is required.
			}
		}
		function startLeft(n,p){
			base.item.eq(base.evt.next).css('left', n);
			base.item.eq(base.evt.prev).css('left', p);
		}
		
		uiSlideEvtDrag(base);
		//$('body').on('touchstart.bodyscroll', uiSlideLockTouch);
		// /
	}
	function uiSlideDragEnd(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;

		base.evt.swap = 'off';
		base.evt.xaxis = false;
		uiSlideEvtDrag(base);
		//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		if (!base.multi.is) {
			if (Math.abs(base.evt.movX) > base.opt.w / 5) {
				if (base.evt.movX < 0) {
					base.opt.current = base.evt.next;
					base.dir = 'next';
				} else if (base.evt.movX > 0) {
					base.opt.current = base.evt.prev;
					base.dir = 'prev';
				}
				base.evt.cancel = false;
				uiSlideAct(base);
			} else if(base.evt.movX !== 0) {
				base.evt.cancel = true;
				uiSlideAct(base);
			}
		} else {
			var n = 0;
			for (var i = 0; i < base.multi.w.length; i++) {
				if (Number(base.multi.w[i]) > Number(base.itemwrap.css('left').replace(/[^0-9]/g, ""))) {
					n = i;
					break;
				}
			}
			if (base.multi.p === 'prev') {
				n = n - 1 < 0 ? 0 : n - 1;
			}
			
			base.itemwrap.stop().animate({
				left:(base.multi.ww - base.multi.rw) < base.multi.w[n] ? (base.multi.ww - base.multi.rw) * -1 : base.multi.w[n] * -1
			},200 , function(){
				base.itemwrap.data('left', base.multi.w[n] * -1);
			});
		}
	}
	function uiSlideDragMove(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;
		
		base.evt.movX = parseInt(base.evt.offsetX - uiSlideGetTouches(ev).x, 10) * -1;
		base.evt.movY = parseInt(base.evt.offsetY - uiSlideGetTouches(ev).y, 10) * -1;
		
		base.opt.auto ? uiSlideAutoEvt(base, false) : '';

		//single drag scope
		if (Math.abs(base.evt.movX) > base.opt.w && !base.multi.is) {
			base.evt.movX = (base.evt.movX < 0) ? base.opt.w * -1 : base.opt.w;
		} 
		if (base.multi.is) {
			base.multi.p = (base.evt.movX < 0) ? 'next' : 'prev';
		}

		//y축이 x축보다 이동이 크고 X축 이동이 5보다 작을때
		if (Math.abs(base.evt.movY) > 2 && Math.abs(base.evt.movX) < 2 && base.evt.xaxis === false) {
			base.evt.swap = 'off';
			base.evt.yaxis = true;
			uiSlideEvtDrag(base);
			//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
			//$('html, body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		}
		//X축이 y축보다 이동이 클때	
		else if(base.evt.yaxis === false){
			base.evt.xaxis = true;
			//멀티일때 좌우 끝에서 복원되는 모션 일때 중복실행 방지
			//base.multi.restore : 멀티일때 좌우 끝에서 복원되는 모션
			//if (!base.multi.restore) {
				
				//slide mode
				if (base.opt.eff === 'slide') {
					//single slide mode
					if (!base.multi.is) {
						base.item.eq(base.opt.current).css('left', base.evt.movX);
						base.item.eq(base.evt.next).css('left', base.opt.w + base.evt.movX);
						base.item.eq(base.evt.prev).css('left', (base.opt.w * -1) + base.evt.movX);
					} 
					//multi slide mode
					else if (base.multi.is) {
						// data left 값이 없다면 0으로 설정.
						//base.itemwrap.data('left') ? base.itemwrap.data('left', 0) : '';

						/*clearTimeout(base.multi.timer);
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							base.multi.timer = setTimeout(function(){
								NETIVE.uiSlide.restore(base, 0);
							},200);
							base.itemwrap.data('left', 0);
							base.evt.movX = 0;
						} 
						*/

						//multi drag scope 
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							//앞부분
							base.itemwrap.css('left', 0).data('left', 0);
						} else if(base.evt.movX + Number(base.itemwrap.data('left')) <  (base.multi.ww - base.multi.rw) * -1){
							//뒷부분
							base.itemwrap.css('left', (base.multi.ww - base.multi.rw) * -1).data('left', (base.multi.ww - base.multi.rw) * -1);
						} else {
							base.itemwrap.css('left', base.evt.movX + Number(base.itemwrap.data('left'))).data('movx', base.evt.movX + Number(base.itemwrap.data('left')));
						}
					}
				}
				
				//fade mode
				else if (base.opt.eff === 'fade') {
					base.fade.opacity = ((base.opt.w - Math.abs(base.evt.movX)) / base.opt.w).toFixed(2);
					base.item.css({ opacity: 0, zIndex: 0 }).eq(base.opt.current).css({ opacity: base.fade.opacity, zIndex: 1 });
					(base.evt.movX < 0) ?
						base.item.eq(base.evt.next).css({ opacity: 1 - base.fade.opacity, zIndex: 0 }) :
						base.item.eq(base.evt.prev).css({ opacity: 1 - base.fade.opacity, zIndex: 0 });
				}
			//}
		}
	}
	function uiSlideAct(base, callbackAuto) {
		var base = base,
			$current = base.item.eq(base.opt.current),
			$past = base.item.eq(base.opt.past),
			w = base.opt.w,
			h = base.opt.h;

		if (base.opt.past !== base.opt.current || base.evt.cancel) {
			if (base.dir === 'next' && base.evt.movX === 0) {
				$current.css('left', w);
			} else if(base.dir === 'prev' && base.evt.movX === 0) {
				$current.css('left', w * -1);
			} else {
				if (base.evt.cancel) {
					$current.css('left', base.evt.movX);
				} else {
					base.evt.movX < 0 ? $current.css('left', w + base.evt.movX) : $current.css('left', (w * -1) + base.evt.movX);
				}
			}
			
			base.item.removeClass('on').attr('aria-hidden', true);
			$current.addClass('on').attr('aria-hidden', false);
			base.start = null;
			uiSlideStep(base, callbackAuto);
		}
	}
	function uiSlideStep(base, callbackAuto) {
		//eff분기
		switch(base.opt.eff){
		case'slide':
			(!base.multi.is) ? uiSlideSteplide(base, callbackAuto) : uiSlideStepMulti(base, callbackAuto);
			break;
		case'fade':
			uiSlideStepFade(base, callbackAuto);
			break;
		}
		
		//heigth 재설정
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);
	}
	function uiSlideStepMulti(base, callbackAuto) {
		base.itemwrap.data('left', base.itemwrap.data('movx'));
	}
	function uiSlideStepFade(base, callbackAuto) {
		var base = base,
			step = (base.opt.speed / 16).toFixed(0),
			per = Math.ceil(100 / step),
			n = 0,
			opa = 0,
			tstamp, 
			progress;

			win.requestAFrame(stepRAF);
		base.evt.activate = true;

		function stepRAF(timestamp){
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				opa = Number((per * n) / 100);

				base.fade.opacity !== 0 ? opa = opa + (1 - Number(base.fade.opacity)) : '';
				opa = opa.toFixed(2);
				n = n + 1;
				
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({ 
						left: 0,
						opacity: 1 - opa < 0 ? 0 : 1 - opa,
						zIndex: 0
					});
					base.item.eq(base.opt.current).css({
						left: 0,
						opacity: opa > 1 ? 1 : opa,
						zIndex: 1
					});
				} 
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({ 
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({ 
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					} 
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({ 
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({ 
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					}
				}
				//ing or end
				(progress < base.opt.speed) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					opacity: 1,
					zIndex: 1
				},300, function(){
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: 0,
						opacity: 0,
						zIndex: 0
					}, 300);
				}
			}
		}
	}
	function uiSlideSteplide(base, callbackAuto){
		var base = base,
			tstamp, progress, m, n, 
			j = (base.dir === 'next') ? [-1, 1] : [1, -1],
			nn = 0,
			px_add = (base.opt.w / (base.opt.speed / 16)) - 16,
			px;

			win.requestAFrame(stepRAF);
		base.evt.activate = true;
		
		function stepRAF(timestamp){
			//requestAnimationFrame
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				
				m = base.evt.movX < 0 ? base.evt.movX : base.evt.movX * -1; //X축으로 이동값 정수로 변경
				px = progress + (px_add * nn);
				n = Math.ceil(px - m); 
				nn = nn + 1;
				//next & prev step
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({ 
						left: Math.min(n , base.opt.w) * j[0] + 'px',
						zIndex: 1
					});
					base.item.eq(base.opt.current).css({
						left: Math.max(base.opt.w - n, 0) * j[1] + 'px',
						zIndex: 1
					});
				} 
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({ 
							left: Math.min(base.evt.movX + px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({ 
							left: Math.min((base.opt.w + base.evt.movX) + px, base.opt.w),
							zIndex: 1
						});
					} 
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({ 
							left: Math.max(base.evt.movX - px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({ 
							left: Math.max( ((base.opt.w * -1) + base.evt.movX) - px, base.opt.w * -1 ),
							zIndex: 1
						});
					}
				}
				//ing or end
				(px < base.opt.w) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					zIndex: 1
				},300, function(){
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: base.opt.w * j[0] + 'px',
						zIndex: 1
					}, 300);
				}
			}
		}
	}
	function uiSlideEnd(base, callbackAuto) {
		var base = base;

		base.item.css('z-index', 0);
		base.item.eq(base.opt.current).css('z-index', 1);
		
		(!base.evt.cancel) ? base.opt.past = base.opt.current : '';
		
		//base.opt.eff !== 'slide' ? base.item.eq(base.opt.current).addClass(base.opt.eff) : '';
		base.evt.activate = false;
		base.evt.cancel = false;
		base.evt.movX = 0;
		base.evt.movY = 0;
		base.root.data('base', base);
		base.fade.opacity = 0;
		base.opt.gauge ? 
		base.gauge.bar.css('width', 0) : '';
		
		(base.opt.nav) ? uiSlideNavTxt(base) : '';
		(base.opt.dot) ? uiSlideDotChg(base) : ''; 
		!!callbackAuto ? callbackAuto() : '';
		!!base.opt.callback ?  uiSlideCallback(base) : '';
	}
	function uiSlideNavTxt(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.nav.prev.find('span').text(base.item.eq(base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1).find('.ui-slide-itemtit').text());
		base.nav.next.find('span').text(base.item.eq(base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1).find('.ui-slide-itemtit').text());
	}
	function uiSlideDotChg(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.dotbtn.attr('aria-selected', false).eq(base.opt.current).attr('aria-selected', true)
	}
	function uiSlideCallback(base) {
		//callback
		var base = base,
			v = { 'id':base.opt.id, 'current':base.opt.current};
		base.opt.callback(v);		
	}


	

})(jQuery, window, document);
