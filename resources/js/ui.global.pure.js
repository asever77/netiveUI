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
		//resize state
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

		/**
		* append html : 지정된 영역 안에 마지막에 요소 추가하기
		* @param {object} el target element
		* @param {string} str 지정된 영역에 들어갈 값
		* @param {string} htmltag HTML tag element
		*/
		appendHtml: (el, str, htmltag) => {
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
		deleteParent: (child) => {
			const parent = child.parentNode;

			parent.parentNode.removeChild(parent);
		},

		/**
		* wrap tag : 지정된 요소의 tag 감싸기
		* @param {object} child target element
		*/
		wrapTag: (front, selector, back) => {
			const org_html = selector.innerHTML;
			const new_html = front + org_html + back;
			
			selector.innerHTML = new_html;
		},

		//숫자 세자리수마다 ',' 붙이기
		comma: (n) => {
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},

		//숫자 한자리수 일때 0 앞에 붙이기
		add0: (x) => {
			return Number(x) < 10 ? '0' + x : x;
		},

		//주소의 파라미터 값 가져오기
		para: (paraname) => {
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
		selectorType: (v) => {
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
		},
		//
		
	}
	Global.uiParts.resizeState();

	/**
	* XMLHttpRequest
	* @param {function} callback call back function
	* @param {string} src file source
	*/
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
	
		request(option) {
			const opt = Object.assign({}, this, option);
			const xhr = new XMLHttpRequest();
			const callback = opt.callback;

			xhr.open(opt.type, opt.src);
			xhr.setRequestHeader(opt.mimeType, opt.contType);
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

		show(option) {
			const opt = Object.assign({}, this, option);
			const target = Global.uiParts.selectorType(opt.selector);
			const htmlTag = opt.htmlTag;
			
			//중복실행 방지
			console.log(!!target.dataset.ing);
			for (let i = 0, n = target.children.length; i < n; i++) {
				if (target.children[i].className === 'ui-loading visible' || target.dataset.ing) {
					
					console.log('중복실행 방지');
					return false;
				}
			}

			clearTimeout(this.timerS);
			clearTimeout(this.timerH);

			const newNode = document.createElement('div');

			newNode.classList.add('ui-loading');
			newNode.innerHTML = htmlTag;
			target.append(newNode);
			target.dataset.ing = true;

			this.timerS = setTimeout(function(){
				let uiLoading = null;
				for (let i = 0, n = target.children.length; i < n; i++) {
					if (target.children[i].className === 'ui-loading') {
						uiLoading = target.children[i];
					}
					console.log(target.children[i].className );
				}
 				//target.dataset.loading = true;
				uiLoading.classList.add('visible');
				uiLoading.classList.remove('close');
				target.dataset.ing = '';
			},300);
		}

		hide(option) {
			clearTimeout(this.timerS);
			const opt = Object.assign({}, this, option);
			const target = Global.uiParts.selectorType(opt.selector);
			let uiLoading = null;

			for (let i = 0, n = target.children.length; i < n; i++) {
				if (target.children[i].className === 'ui-loading visible') {
					uiLoading = target.children[i];
				}
			}

			if (!uiLoading) {
				return false;
			}
			target.dataset.ing = '';
			//target.dataset.loading = false;
			uiLoading.classList.add('close');
			this.timerH = setTimeout(function(){
				uiLoading.classList.remove('visible');
				uiLoading.parentNode.removeChild(uiLoading);
			},500);
		}
	}
	Global.uiLoading = new UiLoading();



	class UIdatepicker {
		constructor() {
			this.dateSplit ='-';
			this.newDate = new Date();
			this.calendarVar = {};
			this.shortDate = false; //true: DDMMYY, false:DDMMYYYY
			this.regExp = /^([0-9]{4}).([0-9]{2}).([0-9]{2})/g;
			this.calId = null;
			this.dateId = null;
			this.inpId = null;
			this.btnId = null;
			this.elTarget = null;
			this.elDatepicker = null;
			this.elInput = null;
			this.elWrap = null;
			this.dateMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
			this.weekDay = ['일', '월', '화', '수', '목', '금', '토'];
		}

		init(target) {
			const $this = this;
			const elCalendar = document.querySelectorAll('.ui-datepicker-btn');

			for (let btn of elCalendar) {
				btn.addEventListener('mousedown', datepickerShow);
			}

			function datepickerShow(e){
				console.log('------------------------');
				console.log('show', this);
				$this.datepickerReady(e.target);
			}

			// const elCalendar = document.querySelector('[data-id="'+ target +'"]');

		}

		datepickerReady(target) {
			console.log('datepickerReady');
			//this.elTarget = target;
			const el_target = this.elTarget = target;
			const el_datepicker = this.elDatepicker = el_target.closest('.ui-datepicker');
			const el_input = this.elInput = el_datepicker.querySelector('.ui-datepicker-inp');
			const el_wrap = this.elWrap = el_datepicker.querySelector('.ui-datepicker-wrap');
			const option_period = el_datepicker.getAttribute('data-period');
			const option_dual = el_datepicker.getAttribute('data-dual');
			const option_title = el_datepicker.getAttribute('data-title');
			const option_type = el_datepicker.getAttribute('data-type');
			const option_id = el_datepicker.getAttribute('data-id');
			const option_inputid = el_input.getAttribute('id');
			const option_value = el_input.value;

			this.calId = 'calWrap_' + option_id;
			this.dateId = option_id;
			this.inpId = option_inputid;
			this.btnId = 'calBtn_' + option_id;
			this.regExp = (this.dateSplit === '.') ? /^([0-9]{4}).([0-9]{2}).([0-9]{2})/g : /^([0-9]{4})-([0-9]{2})-([0-9]{2})/g;

			let html_wrap = '';
			html_wrap += '<div id="'+ this.calId +'" class="datepicker-sec">';
			html_wrap += '<div class="datepicker-wrap">';
			html_wrap += '</div>';
			html_wrap += '</div>';

			Global.uiParts.appendHtml(el_wrap, html_wrap);
			html_wrap = '';

			this.displayCalendar('generate');
		}

		displayCalendar(v) {
			console.log('displayCalendar', v);

			this.buildCalendar(v);
			this.reDisplayCalendar(v);
		}
		reDisplayCalendar(v) {
			console.log('reDisplayCalendar');
			this.buildCore(v);
		}

		buildCalendar(v) {
			console.log('buildCalendar', v);
			const el_dpwrap = this.elWrap.querySelector('.datepicker-wrap');
			

			let html_wrap = '';
			html_wrap += '<div class="datepicker-header">';
			html_wrap += '</div>';
			html_wrap += '<div class="datepicker-body">';
			html_wrap += '	<div class="tbl-datepicker">';
			html_wrap += '		<table>';
			html_wrap += '		<thead>';
			html_wrap += '			<tr>';

			for (let i = 0, len = this.weekDay.length; i < len; i++) {
				html_wrap += '<th scope="col">' + this.weekDay[i] + '</th>';
			}

			html_wrap += '			</tr>';
			html_wrap += '		</thead>';
			html_wrap += '		<tbody class="datepicker-core">';
			html_wrap += '		</tbody>';
			html_wrap += '		</table>';
			html_wrap += '	</div>';
			html_wrap += '</div>';
			html_wrap += '<div class="datepicker-footer">';
			html_wrap += '</div>';

			Global.uiParts.appendHtml(el_dpwrap, html_wrap);
			html_wrap = '';
		}
		buildCore(v) {
			console.log('buildCore');
			const el_core = this.elWrap.querySelector('.datepicker-core');
			const _val = this.elInput.value;
			const date = this.newDate;
			const _valDate = _val.split(this.dateSplit);
			const generate = v === 'generate' ? true : false;
			const day = !generate ? 
				date.getDate() : 
				_val === '' ? date.getDate() : Number(_valDate[2]);
			const month = !generate ? 
				date.getMonth() : 
				_val === '' ? date.getMonth() : Number(_valDate[1] - 1);
			const year = !generate ? 
				date.getFullYear() : 
				_val === '' ? date.getFullYear() : Number(_valDate[0]);

			const prevMonth = new Date(year, month - 1, 1);
			const thisMonth = new Date(year, month, 1);
			const nextMonth = new Date(year, month + 1, 1);
			const nextMonth2 = new Date(year, month + 2, 1);
			const firstWeekDay = thisMonth.getDay();
			const nextWeekDay = nextMonth.getDay();
			const prevWeekDay = prevMonth.getDay();

			const daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24));
			const daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24));
			const daysInMonth_next = Math.floor((nextMonth2.getTime() - nextMonth.getTime()) / (1000 * 60 * 60 * 24));

			const _minDay = new Array();
			const _maxDay = new Array();

			let next_m = nextMonth.getMonth();
			let week_day = null;
			let empty_before = daysInMonth_prev - firstWeekDay;
			let empty_after = 0;

			month === 2 ? daysInMonth = 31 : '';
			
			next_m = Number(next_m) + 1;

			//작년으로 가는 경우
			next_m < 1 ? next_m = 12 : '';

			//내년으로 넘어가는 경우
			if (next_m > 12) {
				next_m = 1;
				year = year + 1;
			}

			next_m = Global.uiParts.add0(next_m);
			week_day = firstWeekDay;

			let html_wrap = '';
			html_wrap += '<tr>';

			emptyDay(firstWeekDay, 'prev');

			for (let i = 1; i <= daysInMonth; i++) {
				week_day %= 7;
				
				if (week_day === 0 ) {
					daysInMonth - i < 7 ? 
						html_wrap += '</tr>' : 
						html_wrap += '</tr><tr>';
				} 

				html_wrap += '<td><button type="button" aria-label="' +  this.textDate(i, next_m, year, true) + '" data-day="' + this.textDate(i, next_m, year, false) + '" value="' + i + '">' + Global.uiParts.add0(i) + '</button></td>';
				
				week_day++;
			}

			emptyDay(week_day, 'next');

			html_wrap += '</tr>';


			console.log(html_wrap);
			Global.uiParts.appendHtml(el_core, html_wrap, 'tbody');
 			html_wrap = '';

			function emptyDay(n, type) {
				if (type === 'prev') {
					for (let i = 0; i < n; i++) {
						empty_before = empty_before + 1;
	
						if (i < n - 1) {
							html_wrap += '<td class="empty"><button type="button" disabled>' + Global.uiParts.add0(empty_before) + '</button></td>';
						} else {
							html_wrap += '<td class="empty last"><button type="button" disabled>' + Global.uiParts.add0(empty_before) + '</button></td>';
						}
					}
				} else {
					for (let i = n; i < 7; i++) {
						empty_after = empty_after + 1;
	
						if (i > 7) {
							html_wrap += '<td class="empty"><button type="button" disabled>' + Global.uiParts.add0(empty_after) + '</button></td>';
						} else {
							html_wrap += '<td class="empty last"><button type="button" disabled>' + Global.uiParts.add0(empty_after) + '</button></td>';
						}
					}
				}
			}
			
		}
		textDate (d, m, y, whatday) {
			var _date = new Date(y, m - 1, d);
			var gDate = _date.getFullYear() + this.dateSplit + this.dateMonths[_date.getMonth()] + this.dateSplit + Global.uiParts.add0(_date.getDate());

			if (whatday === true) {
				//요일 추가
				return (gDate + " (" + this.weekDay[_date.getDay()] + ")");
			} else {
				return (gDate);
			}
		}
	}
	Global.uiDatepicker = new UIdatepicker();







	/**
	* Animate scrolling to a target position
	* @param {string} target Target selector
	* @param {number} duration (Option) Duration time(ms) (Default. 800ms)
	* @param {number} adjust (Option) Adjustment value of position
	*/
	class UiScrolling {
		constructor(){
			this.value = 0;
			this.speed = 0;
			this.callback = false;
			this.ps = 'y';
			this.adjust = false;
			this.focus = false;
			this.selector = 'html, body';
		}

		move(option) {
			const opt = Object.assign({}, this, option);
			const psValue = opt.value;
			const duration = opt.duration ? opt.duration : 600;
			const callback = opt.callback;
			const ps = opt.ps;
			const adjust = opt.adjust * -1;
			const focus = Global.uiParts.selectorType(opt.focus);
			const targetEle = Global.uiParts.selectorType(opt.selector);

			const scrollEle = document.documentElement || window.scrollingElement;
			const currentY = targetEle.scrollTop;
			const targetY = targetEle.offsetTop - (adjust || 0);

		

			console.log(currentY, targetY);

			const _start = currentY;
			const _end = 200; 

			const unit = (_end - _start) / duration;
			const startTime = new Date().getTime();
			const endTime = new Date().getTime() + duration;
				
			const scrollTo = function() {
				let now = new Date().getTime();
				let passed = now - startTime;
				console.log(now, endTime, now <= endTime,  passed, unit, _start + (unit * passed)); 
				if (now <= endTime) {
					scrollEle.scrollTop = _start + (unit * passed);
					requestAnimationFrame(scrollTo);
				} else {

					!!callback && callback();
					console.log('End off.')
				}
			};
			requestAnimationFrame(scrollTo);
		}
	}
	Global.uiScrolling = new UiScrolling();

	// 	if (p === 'top') {
	// 		$target.stop().animate({ 
	// 				scrollTop : psVal 
	// 			}, { 
	// 				duration: s,
	// 				step: function(now) { 
	// 				!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
	// 			},
	// 			complete: function(){
	// 				if (overlap) {
	// 					!!c ? c({ focus:f, complete:true }) : '';
	// 					!!f ? f.attr('tabindex', 0).focus() : '';
	// 				} else {
	// 					overlap = true;
	// 				}
	// 			}
	// 		});
	// 	} else if (p === 'left') {
	// 		$target.stop().animate({ 
	// 				scrollLeft : psVal
	// 			}, { 
	// 				duration: s,
	// 				step: function(now) { 
	// 					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
	// 			},
	// 			complete: function(){
	// 				!!c ? c({ focus:f, complete:true }) : '';
	// 				!!f ? f.attr('tabindex', 0).focus() : '';
	// 			}
	// 		});
	// 	} else if (p === 'center') {
	// 		var w = $target.outerWidth();

	// 		$target.stop().animate({ 
	// 			scrollLeft : psVal - (w / 2) + addLeft
	// 		}, { 
	// 			duration: s,
	// 			step: function(now) { 
	// 				!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
	// 			},
	// 			complete: function(){
	// 				!!c ? c({ focus:f, complete:true }) : '';
	// 				!!f ? f.attr('tabindex', 0).focus() : '';
	// 			}
	// 		});
	// 	}
	// }
})(window, document);
