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
			let parent = child.parentNode;
			console.log(parent);

			parent.parentNode.removeChild(parent);
		}

		wrapTag(front, selector, back){
			let org_html = selector.innerHTML;
			let new_html = front + org_html + back;
			
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
		constructor(){
			this.id = false;
			this.callback = false;
			this.infiniteCallback = false;
			this.space = false;
			this.remove = false;

			sessionStorage.setItem('scrollbarID', 0);
		}

		init(opt){
			const _opt = Object.assign({}, this, opt);
			const id = _opt.id;
			const space = _opt.space;
			const callback = _opt.callback;
			const infiniteCallback = _opt.infiniteCallback;
			const remove = _opt.remove;
			const scrollbar = !id ? document.querySelectorAll('.ui-scrollbar') : typeof id === 'object' ? id : document.querySelector('[scroll-id="' + id +'"]');
		
			// if (win[global].support.touch) {
			// 	return false;
			// } 

			for (let i = 0, len = scrollbar.length; i < len; i++) {
				if (!remove) {
					scrollbarReady(scrollbar[i]);
				} else {
					//scrollbarRemove(el_scrollbar[i]);
				}
			}

			function scrollbarReady(scrollbar) {
				const el_scrollbar = scrollbar;
				let	html_scrollbar = '';

				//+reset
				el_scrollbar.classList.remove('ready');
				el_scrollbar.dataset.infiniteCallback = infiniteCallback;
				el_scrollbar.dataset.ready = 'no';

				//초기화 --------------- 나중에 확인필요
				if (!!el_scrollbar.querySelector('.ui-scrollbar-item')) {
					win[global].uiParts.deleteParent(el_scrollbar.querySelector('.ui-scrollbar-item'));
					//el_scrollbar.querySelector('> .ui-scrollbar-item').contents().unwrap();
					//el_scrollbar.querySelector('> .ui-scrollbar-wrap').contents().unwrap();
					el_scrollbar.querySelector('> .ui-scrollbar-barwrap').remove();
				}

				let wrapW = el_scrollbar.offsetWidth;
				let wrapH = el_scrollbar.offsetHeight;

				win[global].uiParts.wrapTag('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap">', el_scrollbar ,'</div></div>');

				//++make
				const el_item = el_scrollbar.querySelector('.ui-scrollbar-item');
				const el_itemWrap = el_item.querySelector('.ui-scrollbar-wrap');

				let _display = window.getComputedStyle(el_scrollbar).display;
				let _padding = window.getComputedStyle(el_scrollbar).padding;

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

				let itemW =	el_item.scrollWidth;
				let itemH = el_item.scrollHeight;

				el_scrollbar.dataset.itemH = itemH;
				el_scrollbar.dataset.itemW = itemW;
				el_scrollbar.dataset.wrapH = wrapH;
				el_scrollbar.dataset.wrapW = wrapW;

				// el_scrollbar.dataset.opt = {
				// 	'itemH': itemH, 
				// 	'itemW': itemW, 
				// 	'wrapH': wrapH,
				// 	'wrapW': wrapW 
				// };
				
				let idN = JSON.parse(sessionStorage.getItem('scrollbarID'));
				//idN = idN === undefined ? 0 : idN;
				
				if (el_scrollbar.dataset.ready === 'no' || !el_scrollbar.getAttribute('scroll-id')) {
					
					if (!el_scrollbar.getAttribute('scroll-id')) {
						el_scrollbar.setAttribute('scroll-id', 'uiScrollBar_' + idN);
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

					// html_scrollbar += '<div class="ui-scrollbar-barwrap type-y" >';
					// html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="y"><span class="hide">scroll</span></button>';
					// html_scrollbar += '</div>';
					// html_scrollbar += '<div class="ui-scrollbar-barwrap type-x" >';
					// html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="x"><span class="hide">scroll</span></button>';
					// html_scrollbar += '</div>';

					(wrapH < itemH) ? 
						el_scrollbar.classList.add('view-y') : 
						el_scrollbar.classList.remove('view-y');

					(wrapW < itemW) ? 
						el_scrollbar.classList.add('view-x') : 
						el_scrollbar.classList.remove('view-x');

					var barH = Math.floor(wrapH / (itemH / 100));
					var barW = Math.floor(wrapW / (itemW / 100));
					var $barY = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
					var $barX = el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
					

					$barY.style.height = barH + '%';
					$barY.dataset.height = barH;

					$barX.style.height = barW + '%';
					$barX.dataset.height = barW;

					el_scrollbar.classList.add('view-scrollbar');
					!!callback && callback(); 
					scrollEvent(el_item);
					scrollbarUpdate(el_scrollbar, wrapH, wrapW, itemH, itemW, space);
					eventFn();
				}
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
					let $barY = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
					let $barX = _el_scrollbar.querySelector('.ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

					if (changeH) {
						$barY.style.height = barH + '%';
						$barY.dataset.height = barH;
					} 
					if (changeW) {
						$barX.style.width = barW + '%';
						$barX.dataset.width = barW;
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

				
				// el_bar.addEventListener('mousedown touchstart', function(e){
				// 	dragMoveAct(e, this);
				// });
				// $(doc).find('.ui-scrollbar-item').off('scroll.uiscr').on('scroll.uiscr', function(){
				// 	scrollEvent(this);
				// });
				// $(doc).find('.ui-scrollbar-bar').off('mousedown.bar touchstart.bar').on('mousedown.bar touchstart.bar', function(e) {
				// 	dragMoveAct(e, this);
				// });
			}	
			
			function scrollEvent(el_item){
				let _el_item = el_item;
				let el_scrollbar = _el_item.closest('.ui-scrollbar');
				let itemH = Number(el_scrollbar.dataset.itemH);
				let itemW = Number(el_scrollbar.dataset.itemW);
				let wrapH = Number(el_scrollbar.dataset.wrapH);
				let wrapW = Number(el_scrollbar.dataset.wrapW);

				if (wrapW === undefined) {
					return false;
				}

				let $barY = el_scrollbar.querySelector('.type-y .ui-scrollbar-bar');
				let $barX = el_scrollbar.querySelector('.type-x .ui-scrollbar-bar');

				let scrT = _el_item.scrollTop,
					scrL = _el_item.scrollLeft,
					barH = Number($barY.dataset.height),
					barW = Number($barX.dataset.width);

				let hPer = Math.round(scrT / (itemH - wrapH) * 100),
					_hPer = (barH / 100) * hPer,
					wPer = Math.round(scrL / (itemW - wrapW) * 100),
					_wPer = (barW / 100) * wPer;

				let _infiniteCallback = el_scrollbar.dataset.infiniteCallback;
				
				$barY.style.top = hPer - _hPer + '%';
				$barX.style.left = wPer - _wPer + '%';

				console.log(typeof infiniteCallback);
				if (!!infiniteCallback) {
					hPer === 100 && infiniteCallback(); 
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
	win[global].uiScrollBar = new UiScrollBar();
	win[global].uiScrollBar.timer = {}

})(window, document);