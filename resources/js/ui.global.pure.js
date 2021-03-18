'use strict';

//utils module
;(function (win, doc, undefined) {

	'use strict';

	const global = 'netive';

	win[global] = {};

	const Global = win[global];

	const UA = navigator.userAgent.toLowerCase();
	const deviceSize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
	const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];
	const filter = "win16|win32|win64|mac|macintel";
	
	Global.state = {
		device: {
			info: (() => {
				for (let i = 0, len = deviceInfo.length; i < len; i++) {
					console.log(UA,deviceInfo[i]);
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

		//리사이즈 이벤트 모음
		resizeState: () => {
			const act = () => {
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
			}

			win.addEventListener('resize', act);
			act();
		},

		//뒤에 추가하기
		appendHtml: (el, str) => {
			const div = doc.createElement('div');

			div.innerHTML = str;

			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
		},

		//
		deleteParent: (child) => {
			const parent = child.parentNode;

			parent.parentNode.removeChild(parent);
		},

		//앞뒤 태그 감싸기 
		wrapTag: (front, selector, back) => {
			const org_html = selector.innerHTML;
			const new_html = front + org_html + back;
			
			selector.innerHTML = new_html;
		},

		//숫자 세자리수마다 ',' 붙이기
		uiComma: (n) => {
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},

		//숫자 한자리수 일때 0 앞에 붙이기
		partsAdd0: (x) => {
			return Number(x) < 10 ? '0' + x : x;
		},

		//주소의 파라미터 값 가져오기
		partsPara: (paraname) => {
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
		partsSelectorType: (v) => {
			console.log(v);
			let base = document.querySelector('body');

			if (v !== null) {
				if (typeof v === 'string') {
					base = document.querySelector(v);
				} else {
					base = v;
				} 
			}

			return base;
		}
	}
	Global.uiParts.resizeState();

	class UiAjax {
		constructor() {
			this.callback = false;
			this.type = 'GET';
			this.cache = false;
			this.async = true;
			this.mimeType = 'Content-Type'; //'Accept'
			this.contType = 'application/x-www-form-urlencoded'; //'application/json'
			this.dataType = 'html';
		}
	
		request(opt) {
			const _opt = Object.assign({}, this, opt);
			const xhr = new XMLHttpRequest();
			const callback = _opt.callback;

			xhr.open(_opt.type, _opt.src);
			xhr.setRequestHeader(_opt.mimeType, _opt.contType);
			xhr.send();
			xhr.onreadystatechange = function (e) {
				if (xhr.readyState !== XMLHttpRequest.DONE) return;

				if (xhr.status === 200) {
					callback && callback(xhr.responseText);
				} else {
					console.log('Error!');
				}
			};
		}
	}
	Global.uiAjax = new UiAjax();
	
	/*
	* @module scroll bar
	* @description  web browser scroll bar design
	* @author 조현민
	* @modify 2021.03.18
	*/
	class UiScrollBar {
		//객체의 기본 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화
		constructor(idName) {
			this.id = idName;
			this.callback = function(){
				console.log(`${idName} 커스텀 스크롤 준비완료`);
			};
			this.infiniteCallback = false;
		}

		//메서드 사이엔 쉼표가 없습니다.
		init(opt) {
			const _opt = Object.assign({}, this, opt);
			const id = _opt.id;
			const callback = _opt.callback;
			const infiniteCallback = _opt.infiniteCallback;
			const el_scrollbar = doc.querySelector('[data-scroll-id="' + id +'"]');

			let timer;
			let prevHeightPercent = 0;
			let scrollDirection = 'keep';

			//+reset
			if (el_scrollbar.dataset.ready === 'yes') {
				return false;
			}

			el_scrollbar.classList.remove('ready');
			el_scrollbar.dataset.ready = 'no';
			el_scrollbar.dataset.direction = scrollDirection;
			
			const wrapW = el_scrollbar.offsetWidth;
			const wrapH = el_scrollbar.offsetHeight;

			Global.uiParts.wrapTag('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap">', el_scrollbar ,'</div></div>');

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
			el_scrollbar.removeAttribute('style');
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
	Global.uiScrollBar = () => {
		const uiScrollBar = doc.querySelectorAll('.ui-scrollbar');
		
		if (sessionStorage.getItem('scrollbarID') === null) {
			sessionStorage.setItem('scrollbarID', 0);
		}
		
		for (let i = 0, len = uiScrollBar.length; i < len; i++) {
			let scrollId = uiScrollBar[i].getAttribute('data-scroll-id');

			if (!scrollId) {
				let idN = JSON.parse(sessionStorage.getItem('scrollbarID'));
					
				idN = idN + 1;
				sessionStorage.setItem('scrollbarID', idN);
				scrollId = 'item' + i;
				uiScrollBar[i].dataset.scrollId = scrollId;
			} 

			Global.uiScrollBar[scrollId] = new UiScrollBar(scrollId);

			setTimeout(function(){
				Global.uiScrollBar[scrollId].init();
			},0);
		}
	}
	
	class UiLoading {
		constructor(){
			this.selector = document.querySelector('body');
			this.visible = true;
			this.text = null;
			this.htmlTag = '<div class="orbit"><div class="orbit-wrap"></div></div>';
			this.timerS = null;
			this.timerH = null;
		}

		// init(opt) {
		// 	const _opt = Object.assign({}, this, opt);
		// 	const selector = _opt.selector;
		// 	const loadingVisible = _opt.visible;
		// 	const timer = _opt.timer;
		// 	const text = _opt.text;
		// 	const htmlTag = '<div class="ui-loading">' + _opt.htmlTag + '</div>';
		// 	const target = Global.uiParts.partsSelectorType(selector);
		// 	const uiLoading = target.querySelector('.ui-loading');

		// 	console.log(this.timerS, this.timerH);

		// 	if (loadingVisible) {
		// 		clearTimeout(this.timerS);
		// 		clearTimeout(this.timerH);
		// 		this.timerS = setTimeout(function(){
		// 			alert('show');
		// 		},300);
				
		// 	} else {
		// 		clearTimeout(this.timerS);
		// 		win[global].uiLoading.timerHide = setTimeout(function(){
		// 			alert('hide');
		// 		},300)
				
		// 	}	
		// }

		show(opt) {
			clearTimeout(this.timerS);
			clearTimeout(this.timerH);
			const _opt = Object.assign({}, this, opt);
			const target = Global.uiParts.partsSelectorType(_opt.selector);
			const htmlTag = _opt.htmlTag;
			const newNode = document.createElement('div');

			newNode.classList.add('ui-loading');
			newNode.innerHTML = htmlTag;

			this.timerS = setTimeout(function(){
				target.append(newNode);
				const uiLoading = target.querySelector('.ui-loading');
				target.dataset.loading = true;
				uiLoading.classList.add('visible');
				uiLoading.classList.remove('close');
			},300);
		}

		hide() {

		}
	}
	Global.uiLoading = new UiLoading({
		
	});


	class UiScrollMove {

	}

})(window, document);
