'use strict';

//utils module
;(function (win, doc, undefined) {

	'use strict';

	const global = 'netive';
	win[global] = {};

	class UiParts {
		//append
		appendHtml(el, str) {
			const div = document.createElement('div');

			div.innerHTML = str;

			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
		}

		deleteParent(child) {
			const parent = child.parentNode;

			parent.parentNode.removeChild(parent);
		}

		wrapTag(front, selector, back){
			const org_html = selector.innerHTML;
			const new_html = front + org_html + back;
			
			selector.innerHTML = new_html;
		}

		keys = { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40
		}

		//http://cubic-bezier.com - css easing effect
		effect = {
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

		//숫자 세자리수마다 ',' 붙이기
		uiComma(n) {
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		}

		//숫자 한자리수 일때 0 앞에 붙이기
		partsAdd0(x) {
			return Number(x) < 10 ? '0' + x : x;
		}

	}
	win[global].uiParts = new UiParts();

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
	win[global].uiAjax = new UiAjax();
	
	class UiScrollBar {
		constructor(idName){
			this.id = idName;
			this.callback = false;
			this.infiniteCallback = false;
			this.space = false;
			this.remove = false;
		}

		init = (opt) => {
			const _opt = Object.assign({}, this, opt);
			const id = _opt.id;
			const space = _opt.space;
			const callback = _opt.callback;
			const infiniteCallback = _opt.infiniteCallback;
			const remove = _opt.remove;
			const el_scrollbar = document.querySelector('[data-scroll-id="' + id +'"]');
			console.log('id' , el_scrollbar);
			//+reset
			el_scrollbar.classList.remove('ready');
			//el_scrollbar.dataset.infiniteCallback = infiniteCallback;
			el_scrollbar.dataset.ready = 'no';

			//초기화 --------------- 나중에 확인필요
			if (!!el_scrollbar.querySelector('.ui-scrollbar-item')) {
				win[global].uiParts.deleteParent(el_scrollbar.querySelector('.ui-scrollbar-item'));
				//el_scrollbar.querySelector('> .ui-scrollbar-item').contents().unwrap();
				//el_scrollbar.querySelector('> .ui-scrollbar-wrap').contents().unwrap();
				el_scrollbar.querySelector('.ui-scrollbar-barwrap').remove();
			}

			const wrapW = el_scrollbar.offsetWidth;
			const wrapH = el_scrollbar.offsetHeight;

			win[global].uiParts.wrapTag('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap">', el_scrollbar ,'</div></div>');

			//++make
			const el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
			const el_itemWrap = el_item.querySelector('.ui-scrollbar-wrap');

			const _display = window.getComputedStyle(el_scrollbar).display;
			const _padding = window.getComputedStyle(el_scrollbar).padding;

			el_itemWrap.style.display = _display;
			el_itemWrap.style.padding = _padding;

			if (!space) {
				if (_display === 'inline-block') {
					el_itemWrap.style.display = 'block';
				}
				el_itemWrap.style.width = '100%';
				el_item.style.width = '100%';
			} 

			el_scrollbar.style.overflow = 'hidden';

			const itemW =	el_item.scrollWidth;
			const itemH = el_item.scrollHeight;

			el_scrollbar.dataset.itemH = itemH;
			el_scrollbar.dataset.itemW = itemW;
			el_scrollbar.dataset.wrapH = wrapH;
			el_scrollbar.dataset.wrapW = wrapW;
			
			let idN = JSON.parse(sessionStorage.getItem('scrollbarID'));
			//idN = idN === undefined ? 0 : idN;
			
			if (el_scrollbar.dataset.ready === 'no') {
				
				if (!el_scrollbar.getAttribute('data-scroll-id')) {
					//el_scrollbar.dataset.scrollId = uiScrollBar_' + idN;
					el_scrollbar.dataset.ready = 'yes';
					el_scrollbar.classList.add('ready');
					idN = idN + 1;
					sessionStorage.setItem('scrollbarID', idN);
				} else {
					el_scrollbar.dataset.ready = 'yes';
					el_scrollbar.classList.add('ready');
				}

				el_item.setAttribute('tabindex', 0);
				el_scrollbar.style.height = wrapH + 'px';
				
				let el_tablescroll = el_scrollbar.closest('.ui-tablescroll');

				if (space) {
					el_item.classList.add('scroll-y-padding');
					el_item.classLIst.add('scroll-x-padding');
				} else {
					!!el_tablescroll && el_tablescroll.classList.add('not-space');
				}

				let html_barwrap = document.createElement('div');
				let html_barwrapX = document.createElement('div');
				let html_button = document.createElement('button');
				let html_buttonX = document.createElement('button');

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

				var barH = Math.floor(wrapH / (itemH / 100));
				var barW = Math.floor(wrapW / (itemW / 100));
				var el_barY = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				var el_barX = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
				

				el_barY.style.height = barH + '%';
				el_barY.dataset.height = barH;

				el_barX.style.height = barW + '%';
				el_barX.dataset.height = barW;

				el_scrollbar.classList.add('view-scrollbar');
				!!callback && callback(); 

				scrollEvent(el_item);
				scrollbarUpdate(el_scrollbar, wrapH, wrapW, itemH, itemW, space);
				eventFn();
			}
				
			
			function scrollbarUpdate(el_scrollbar, wrapH, wrapW, itemH, itemW, space){
				let _el_scrollbar = el_scrollbar;
				let	el_item = _el_scrollbar.querySelector('.ui-scrollbar-item');
				
				if (!el_item) {
					return false;
				}

				let nWrapH = _el_scrollbar.offsetHeight;
				let nWrapW = _el_scrollbar.offsetWidth;
				let nItemH = el_item.scrollHeight;
				let nItemW = el_item.scrollWidth;
				let changeH = (itemH !== nItemH || wrapH !== nWrapH);
				let changeW = (itemW !== nItemW || wrapW !== nWrapW);

				if (changeH || changeW) {
					let barH = Math.floor(nWrapH / (nItemH / 100));
					let barW = Math.floor(nWrapW / (nItemW / 100));
					let el_barY = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
					let el_barX = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

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

					eventFn();
					scrollEvent(el_item, space);
				}

				setTimeout(function(){
					scrollbarUpdate(el_scrollbar, nWrapH, nWrapW, nItemH, nItemW);
				}, 300);
			}
			
			function scrollbarRemove(t){
				var $wrap = t;

				$wrap.removeClass('ready view-scrollbar').removeData('infiniteCallback').removeData('ready').removeAttr('style');
				$wrap.find('> .ui-scrollbar-item').contents().unwrap();
				$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
				$wrap.find('> .ui-scrollbar-barwrap').remove();
			}

			function eventFn(){
				let el_item = document.querySelectorAll('.ui-scrollbar-item');
				let el_bar = document.querySelectorAll('.ui-scrollbar-bar');

				for (let item of el_item) {
					item.addEventListener('scroll', function(){
						scrollEvent(this);
					});
				}

				for (let bar of el_bar) {
					bar.addEventListener('mousedown', function(e){
						dragMoveAct(e, this);
					});
				}
			}	
			
			function scrollEvent(el_item){
				const _el_item = el_item;
				const el_scrollbar = _el_item.closest('.ui-scrollbar');
				const itemH = Number(el_scrollbar.dataset.itemH);
				const itemW = Number(el_scrollbar.dataset.itemW);
				const wrapH = Number(el_scrollbar.dataset.wrapH);
				const wrapW = Number(el_scrollbar.dataset.wrapW);

				//el_scrollbar.dataset 값이 없을 경우 4개의 갑중 하나라도 없으면 중단
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

				
				if (hPer === 100) {
					console.log(infiniteCallback);
				// 	win[global].uiScrollBar[id].infiniteCallback(); 
				}
			}
			
			function dragMoveAct(e, el_bar) {
				const body = document.querySelector('body');
				const _el_bar = el_bar;
				const el_btn = e.target;
				const el_scrollbar = _el_bar.closest('.ui-scrollbar');
				const el_barWrap = _el_bar.closest('.ui-scrollbar-barwrap');
				const el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
				const itemH = Number(el_scrollbar.dataset.itemH);
				const itemW = Number(el_scrollbar.dataset.itemW);
				const el_barWrapRect = el_barWrap.getBoundingClientRect();
				const off_t = el_barWrapRect.top + document.documentElement.scrollTop;
				const off_l = el_barWrapRect.left + document.documentElement.scrollLeft;
				const w_h = el_barWrapRect.height;
				const w_w = el_barWrapRect.width;
				const barH = _el_bar.getAttribute('data-height');
				const barW = _el_bar.getAttribute('data-width');
				const isXY = el_btn.getAttribute('data-scrollxy');

				let yRPer;
				let xRPer;

				body.classList.add('scrollbar-move');

				document.addEventListener('mousemove', mousemoveAct);
				document.addEventListener('mouseup', mouseupAct);

				function mousemoveAct(e){
					

					let y_m, 
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

					console.log(y_m, off_t);

					let yR = y_m - off_t;
					let xR = x_m - off_l;

					yR < 0 ? yR = 0 : '';
					yR > w_h ? yR = w_h : '';
					xR < 0 ? xR = 0 : '';
					xR > w_w ? xR = w_w : '';

					yRPer = yR / w_h * 100;
					xRPer = xR / w_w * 100;

					const nPerY = (yRPer - (barH / 100 * yRPer)).toFixed(2);
					const nPerX = (xRPer - (barW / 100 * xRPer)).toFixed(2);

					if (isXY === 'y') {
						_el_bar.style.top = nPerY + '%';
						el_item.scrollTop = itemH * nPerY / 100;
					} else {
						_el_bar.style.left = nPerX + '%';
						el_item.scrollLeft = itemW * nPerX / 100;
					}
				}
				function mouseupAct(){
					body.classList.remove('scrollbar-move');
					document.removeEventListener('mousemove', mousemoveAct);
					document.removeEventListener('mouseup', mouseupAct);
				}
				
			}
		}

	}
	win[global].uiScrollBar = () => {
		const uiScrollBar = document.querySelectorAll('.ui-scrollbar');
		
		if (sessionStorage.getItem('scrollbarID') === null) {
			sessionStorage.setItem('scrollbarID', 0);
		}
		
		for (let i = 0, len = uiScrollBar.length; i < len; i++) {
			
			let scrollId = uiScrollBar[i].getAttribute('data-scroll-id')
		
			if (!scrollId) {
				scrollId = 'item' + i;
				uiScrollBar[i].dataset.scrollId = scrollId;
				win[global].uiScrollBar[scrollId] = new UiScrollBar(scrollId);
			} else {
				
				win[global].uiScrollBar[scrollId] = new UiScrollBar(scrollId);
			}

			win[global].uiScrollBar[scrollId].init();
			
		}
	}
	

//	win[global].uiScrollBar = new UiScrollBar();
	//win[global].uiScrollBar.timer = {}

})(window, document);