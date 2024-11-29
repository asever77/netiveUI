import Layer from './components/layer.js';

(() => {

    'use strict';

    const global = 'UI';

    if (!window[global]) {
        window[global] = {};
    } 
    const Global = window[global];

    const UA = navigator.userAgent.toLowerCase();
    const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];

    Global.page = {};
    Global.data = {};
    Global.exe = {};
    Global.callback = {};
	Global.answer = {};
	
    Global.state = {
        isSystemModal: false,
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
        breakPoint: [600, 905],
    };
    Global.parts = {
        scroll(){
            const el_html = document.querySelector('html');
            let last_know_scroll_position = 0;
            let ticking = false;

            const doSomething = (scroll_pos) => {
                Global.state.scroll.direction = 
                    Global.state.scroll.y > scroll_pos ? 'up' : Global.state.scroll.y < scroll_pos ? 'down' : ''; 
                Global.state.scroll.y = scroll_pos;
                el_html.dataset.direction = Global.state.scroll.direction;
            }
            window.addEventListener('scroll', (e) => {
                last_know_scroll_position = window.scrollY;

                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        doSomething(last_know_scroll_position);
                        ticking = false;
                    });

                    ticking = true;
                }
            });
        },
        resizeState() {
            const act = () => {
                const el_html = document.querySelector('html');
                const browser = Global.state.browser;
                const device = Global.state.device;

                device.width = window.innerWidth;
                device.height = window.innerHeight;

                device.touch = device.ios || device.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
                device.mobile = device.touch && (device.ios || device.android);
                device.os = device.os ? device.os[0] : '';
                device.os = device.os.toLowerCase();

                device.breakpoint = device.width >= Global.state.breakPoint[0] ? true : false;
                device.col = device.width >= Global.state.breakPoint[1] ? '12' : device.width > Global.state.breakPoint[0] ? '8' : '4';

                if (browser.ie) {
                    browser.ie = browser.ie = parseInt( browser.ie[1] || browser.ie[2] );
                    ( 11 > browser.ie ) ? support.pointerevents = false : '';
                    ( 9 > browser.ie ) ? support.svgimage = false : '';
                } else {
                    browser.ie = false;
                }

                el_html.dataset.col = device.col;
                el_html.dataset.browser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie' + browser.ie : 'other';
                el_html.dataset.platform = device.ios ? "ios" : device.android ? "android" : 'window';
                el_html.dataset.device = device.mobile ? device.app ? 'app' : 'mobile' : 'desktop';
            }
            window.addEventListener('resize', act);
            act();
        },
        comma(n) {
            let parts = n.toString().split(".");

            return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        },
        add0(x) {
            return Number(x) < 10 ? '0' + x : x;
        },
        paraGet(paraname) {
            const _tempUrl = window.location.href;
            let _tempArray = _tempUrl.split(paraname + '=');

            if (_tempArray.length > 1) {
                _tempArray = _tempArray[1];
                _tempArray = _tempArray.split('&');
                _tempArray = _tempArray[0];
                _tempArray = _tempArray.split('#');
                _tempArray = _tempArray[0];
            } else {
                _tempArray = null
            }
			
            return _tempArray;
        },
        paraSet(key, value) {
            const _tempUrl = window.location.href;
            let _tempArray = _tempUrl.split(key + '=');

            if (_tempArray.length > 1) {
                _tempArray = _tempArray[0] + key + '=' + value;
            } else {
                _tempArray = _tempUrl + '?' + key + '=' + value;
            }

            history.pushState(null, null, _tempArray);
        },
        RAF(start, end, startTime, duration){
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
            }
        },
        getIndex(ele) {
			let _i = 0;
			
			while((ele = ele.previousSibling) != null) {
               (ele.nodeType === 1) && _i++;				
			}

			return _i;
		},
        /**
         * include
         * @param {string} opt.id 
         * @param {string} opt.src 
         * @param {string} opt.type : 'html' | 'json'
         * @param {boolean} opt.insert : true[insertAdjacentHTML] | false[innerHTML]
         * @param {function} opt.callback
         * 
         */
        include(opt) {
            const selector = document.querySelector('[data-id="'+ opt.id +'"]');
            const src = opt.src;
            const type = !opt.type ? 'HTML' : opt.type;
            const insert = !!opt.insert ? opt.insert : false;
            const callback = !!opt.callback ? opt.callback : false;

            if (!!selector && !!src) {
                switch (type) {
                    case 'HTML' :
                        fetch(src)
                        .then(response => response.text())
                        .then(result => {
                            if (insert) {
                                selector.insertAdjacentHTML('afterbegin', result);
                            } else {
                                selector.innerHTML = result;
                            }
                        }).then(() => {
                            !!callback && callback();
                        });
                        break;
                }   
            }  
        },
        resizObserver(opt) {
            let timer = null;
            let w = null;
            let h = null;
            const observer = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const {width, height} = entry.contentRect;
                    w === null ? w = width : '';
                    h === null ? h = height : '';
                    
                    !!timer && clearTimeout(timer);
                    // timer = setTimeout(() => {
                    //     console.log(width, height);
                        opt.callback({
                            width: width,
                            height: height,
                            resize: [w === width ? false : true, h === height ? false : true] 
                        });
                    // }, 50);
                }
            });

            observer.observe(opt.el);
        }	
    };
    Global.weather = {
        success(position) {
            console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            Global.weather.get({
                lat: latitude, 
                lon: longitude
            });
        },
        fail() {
            alert("좌표를 받아올 수 없음");
        },
        get(opt) {
            const API_KEY = '65045c3fea36143336ff03f3bae04eb9';
            const lat = opt.lat; 
            const lon = opt.lon;
            const city = opt.city;
            const _data = !city ?  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr` : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;
            fetch(_data).then((response) => {
                return response.json();
            }).then((json) => {
                const temperature = json.main.temp;
                const place = json.name;
                const description = json.weather[0].description;
                const icon_name = json.weather[0].icon;
                let icon;
                let dayNight;

                switch (icon_name) {
                    case '01d': 
                        dayNight = 'day';
                        icon = 'clear_day';
                        break;
                    case '01n': 
                        dayNight = 'night';
                        icon = 'clear_night';
                        break;

                    case '02d': 
                        dayNight = 'day';
                        icon = 'partly_cloudy_day'
                        break;
                    case '02n': 
                        dayNight = 'night';
                        icon = 'partly_cloudy_night';
                        break;

                    case '03d': 
                        dayNight = 'day';
                        icon = 'cloud'
                        break;
                    case '03n': 
                        dayNight = 'night';
                        icon = 'cloud';
                        break;

                    case '04d': 
                        dayNight = 'day';
                        icon = 'cloud'
                        break;
                    case '04n': 
                        dayNight = 'night';
                        icon = 'cloud';
                        break;

                    case '09d': 
                        dayNight = 'day';
                        icon = 'rainy'
                        break;
                    case '09n': 
                        dayNight = 'night';
                        icon = 'rainy';
                        break;

                    case '10d': 
                        dayNight = 'day';
                        icon = 'rainy'
                        break;
                    case '10n': 
                        dayNight = 'night';
                        icon = 'rainy';
                        break;

                    case '11d': 
                        dayNight = 'day';
                        icon = 'thunderstorm'
                        break;
                    case '11n': 
                        dayNight = 'night';
                        icon = 'thunderstorm';
                        break;

                    case '13d': 
                        dayNight = 'day';
                        icon = 'weather_snowy'
                        break;
                    case '13n': 
                        dayNight = 'night';
                        icon = 'weather_snowy';
                        break;

                    case '50d': 
                        dayNight = 'day';
                        icon = 'foggy'
                        break;
                    case '50n': 
                        dayNight = 'night';
                        icon = 'foggy';
                        break;
                }

                console.log(dayNight, icon);
                if (document.querySelector('[data-style="weather"]')) {
                    document.querySelector('[data-style="weather"] .icon').textContent = icon;
                    document.querySelector('[data-style="weather"] .temperature').textContent = temperature + '°';
                }
            });

        }
    }
    Global.loading = {
		timerShow : {}, 
		timerHide : {},
		options : {
			selector: null,
			message : null,
			styleClass : 'orbit' //time
		},
		show(option){
			const opt = Object.assign({}, this.options, option);
			const selector = opt.selector; 
			const styleClass = opt.styleClass; 
			const message = opt.message;
			const el = (selector !== null) ? selector : document.querySelector('body');
			const el_loadingHides = document.querySelectorAll('.mdl-loading:not(.visible)');

			for (let i = 0, len = el_loadingHides.length; i < len; i++) {
				const that = el_loadingHides[i];

				that.remove();
			}

			let htmlLoading = '';

			(selector === null) ?
				htmlLoading += '<div class="mdl-loading '+ styleClass +'">':
				htmlLoading += '<div class="mdl-loading type-area '+ styleClass +'">';

			htmlLoading += '<div class="mdl-loading-wrap">';

			(message !== null) ?
				htmlLoading += '<strong class="mdl-loading-message"><span>'+ message +'</span></strong>':
				htmlLoading += '';

			htmlLoading += '</div>';
			htmlLoading += '</div>';

			const showLoading = () => {
				const el_child = el.childNodes;
				let is_loading = false;

				for (let i = 0; i < el_child.length; i++) {
					if (el_child[i].nodeName === 'DIV' && el_child[i].classList.contains('mdl-loading')) {
						is_loading = true;
					}
				}

				!is_loading && el.insertAdjacentHTML('beforeend', htmlLoading);
				htmlLoading = null;		
				
				const el_loadings = document.querySelectorAll('.mdl-loading');

				for (let i = 0, len = el_loadings.length; i < len; i++) {
					const that = el_loadings[i];

					that.classList.add('visible');
					that.classList.remove('close');
				}
			}
			clearTimeout(this.timerShow);
			clearTimeout(this.timerHide);
			this.timerShow = setTimeout(showLoading, 300);
		},
		hide(){
			clearTimeout(this.timerShow);
			this.timerHide = setTimeout(() => {
				const el_loadings = document.querySelectorAll('.mdl-loading');

				for (let i = 0, len = el_loadings.length; i < len; i++) {
					const that = el_loadings[i];

					that.classList.add('close');
					setTimeout(() => {
						that.classList.remove('visible')
						that.remove();
					},300);
				}
			},300);
		}
	}
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
		init() {
			const el_areas = document.querySelectorAll('.ui-scrollmove-btn[data-area]');

			for (let i = 0, len = el_areas.length; i < len; i++) {
				const that = el_areas[i];

				that.removeEventListener('click', this.act);
				that.addEventListener('click', this.act);
			}
			// for (let that of el_areas) {
			// 	that.removeEventListener('click', this.act);
			// 	that.addEventListener('click', this.act);
			// }
		},
		act(e) {
			const el = e.currentTarget;
			const area = el.dataset.area;
			const name = el.dataset.name;
			const add = el.dataset.add === undefined ? 0 : el.dataset.add;
			const align = el.dataset.align === undefined ? 'default' : el.dataset.align;
			const callback = el.dataset.callback === undefined ? false : el.dataset.callback;
			let el_area = document.querySelector('.ui-scrollmove[data-area="'+ area +'"]');
			const item = el_area.querySelector('.ui-scrollbar-item');
			
			if (!!item) {
				el_area = el_area.querySelector('.ui-scrollbar-item');
			}

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
		move(option) {
			const opt = Object.assign({}, this.options, option);
			//const opt = {...this.options, ...option};
			const top = opt.top;
			const left = opt.left;
			const callback = opt.callback;
			const align = opt.align;
			const add = opt.add;
			const focus = opt.focus;
			const effect = opt.effect;
			let selector = opt.selector;
			const item = selector.querySelector('.ui-scrollbar-item');
			const isCustomScroll = selector.classList.contains('ui-scrollbar');

			if (!!item && !!isCustomScroll) {
				selector = selector.querySelector('.ui-scrollbar-item');
			}
			
			switch (align) {
				case 'center':
					selector.scrollTo({
						top: Math.abs(top) - (selector.offsetHeight / 2) + add,
						left: Math.abs(left) - (selector.offsetWidth / 2) - add,
						behavior: effect
					});
					break;
				
				case 'default':
				default :
					selector.scrollTo({
						top: Math.abs(top) + add,
						left: Math.abs(left) + add,
						behavior: effect
					});
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
		checkEnd(opt) {
			const el_selector = opt.selector;
			const align = opt.align
			const focus = opt.focus
			const callback = opt.callback
			
			let nowTop = opt.nowTop;
			let nowLeft = opt.nowLeft;

			Global.scroll.checkEndTimer = setTimeout(() => {
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
		}
	}
    Global.form = {
		init() {
			const el_inps = document.querySelectorAll('.inp-base');
			const prefix = (inp) => {
				const wrap = inp.parentElement;

				if (!wrap.querySelector('.prefix')){
					const preFixTxt = document.createElement('span');
					const theFirstChild = wrap.firstChild;
					const txt = inp.dataset.prefix;

					preFixTxt.classList.add('prefix');
					preFixTxt.textContent = txt;
					wrap.insertBefore(preFixTxt, theFirstChild);

					const w = wrap.querySelector('.prefix').offsetWidth;

					wrap.querySelector('.inp-base').style.paddingLeft = w + 'px';
				}
			}
			const suffix = (inp) => {
				const wrap = inp.parentElement;

				if (!wrap.querySelector('.suffix')){
					const fixTxt = document.createElement('span');
					const txt = inp.dataset.suffix;

					fixTxt.classList.add('suffix');
					fixTxt.textContent = txt;
					wrap.appendChild(fixTxt);

					const w = wrap.querySelector('.suffix').offsetWidth;

					inp.dataset.suf = w;
					wrap.querySelector('.inp-base').style.paddingRight = w + 'px';
				}
			}

			for (let i = 0, len = el_inps.length; i < len; i++) {
				const inp = el_inps[i];

				inp.addEventListener('focus', this.actClear);
				inp.addEventListener('input', this.actClear);
				inp.addEventListener('blur', this.actClear);
				
				//prefix, suffix text
				!!inp.dataset.prefix && prefix(inp);
				!!inp.dataset.suffix && suffix(inp);
				!!inp.value && (!!inp.dataset.clear || inp.type === 'search') && (!!inp.dataset.keep || inp.type === 'search') && this.actClear(inp);
			}
		},
		clearTimer:{},
		actClear(event) {
			let inp;
			const isInput = event.type === 'text' || event.type === 'search' || event.type === 'number' || event.type === 'tel' || event.type === 'email' || event.type === 'file' || event.type === 'password' || event.type === 'url' || event.type === 'tel' || event.type === 'date';
			if (isInput) {
				inp = event;
			} else {
				inp = event.currentTarget;
			}

			// const id = inp.id;
			const title = inp.title;
			const wrap = inp.parentElement;
			const suffix = wrap.querySelector('.suffix');
			const isValue = inp.value;
			let eventType = event.type;
			const isClear = inp.dataset.clear || inp.type === 'search' ? true : false;
			let isKeep = inp.dataset.keep;
			const w_suffix = !!suffix ? suffix.offsetWidth : 0;
			const paddingR = Number((inp.style.paddingRight).split('px')[0]);

			if (!isClear) {
				return false;
			}

			if (isInput) {
				eventType = 'input';
			}
			
			if (inp.type === 'search') {
				isKeep = true;
			}
			
			const clear = () => {
				clearTimeout(this.clearTimer);
				inp.value = '';
				inp.focus();
			}
			const beforeClear = () => {
				const btn = wrap.querySelector('.ui-clear');
				const btnclear = () => {
					if (!!btn) {
						const w = btn.offsetWidth;
						inp.style.paddingRight = paddingR - w + 'px';
						btn.removeEventListener('click', clear);
						btn.remove();
					}
				}
				(!!isKeep) ? (!inp.value) && btnclear() : btnclear();
			}

			switch (eventType) {
				case 'focus' :
				case 'input' :
					if (!!isValue) {
						if (!wrap.querySelector('.ui-clear')) {
							const clearbutton = document.createElement('button');
							clearbutton.type = 'button';
							clearbutton.classList.add('btn-clear');
							clearbutton.classList.add('ui-clear');
							clearbutton.setAttribute('aria-label', title + ' 값 삭제');
							// clearbutton.dataset.id = id;
							
							inp.after(clearbutton);

							const btn = wrap.querySelector('.ui-clear');
							const w = btn.offsetWidth + w_suffix;

							inp.style.paddingRight = w + 'px'
							btn.style.marginRight = w_suffix + 'px';

							btn.addEventListener('focus', () => clearTimeout(this.clearTimer));
							btn.addEventListener('blur', beforeClear);
							btn.removeEventListener('click', clear);
							btn.addEventListener('click', clear);
						}
					} else {
						beforeClear();
					}
					break;

				case 'blur' :
					if (!!wrap.querySelector('.ui-clear')) {
						this.clearTimer = setTimeout(() => {
							beforeClear();
						},300);
					}
					break;
			}
		},

		fileUpload() {
			const el_files = document.querySelectorAll('.mdl-file-inp');
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

			const fileDelete = (e) => {
				const id = e.currentTarget.dataset.id;
				
				const list = document.querySelector('.mdl-file-list[data-id="'+ id +'"]');
				const list_ul = list.querySelector('ul');
				const list_li = list.querySelectorAll('li');
				const inp = document.querySelector('#'+ id);
				const nodes = [... list_ul.children];
				const index = Number(nodes.indexOf(e.currentTarget.closest('li')));

				const dataTransfer = new DataTransfer();
				const _files = inp.files;	
				let fileArray = Array.from(_files);
				
				fileArray.splice(index, 1);
				fileArray.forEach((file) => { 
					dataTransfer.items.add(file); 
				});
				list_li[index].remove();
				inp.files = dataTransfer.files;	
			}
			const validFileType = (file) => {
				return fileTypes.includes(file.type);
			}
			const returnFileSize = (number) => {
				if(number < 1024) {
					return number + 'bytes';
				} else if(number >= 1024 && number < 1048576) {
					return (number/1024).toFixed(1) + 'KB';
				} else if(number >= 1048576) {
					return (number/1048576).toFixed(1) + 'MB';
				}
			}

			const updateImageDisplay = (e) => {
				const el_file = e.currentTarget;
				const id = el_file.id;
				const preview = document.querySelector('.mdl-file-list[data-id="'+ id +'"]');
				const curFiles = el_file.files;

				while(preview.firstChild) {
					preview.removeChild(preview.firstChild);
				}

				if(curFiles.length === 0) {
					const para = document.createElement('p');
					para.textContent = 'No files currently selected for upload';
					preview.appendChild(para);
				} else {
					const list = document.createElement('ul');
					const title = document.createElement('h4');
					
					title.textContent = 'File upload list';
					title.classList.add('a11y-hidden');
					preview.classList.add('on');
					preview.appendChild(title);
					preview.appendChild(list);
					
					for (let i = 0, len = curFiles.length; i < len; i++) {
						const that = curFiles[i];
						const listItem = document.createElement('li');
						const para = document.createElement('p');
						const delbutton = document.createElement('button');

						delbutton.type = 'button';
						delbutton.classList.add('mdl-file-del');
						delbutton.title = '파일 삭제';
						delbutton.dataset.id = id;
						delbutton.dataset.n = i;

						para.textContent = that.name + ', ' + returnFileSize(that.size) + '.';

						if(validFileType(that)) {
							const image = document.createElement('img');
							image.src = URL.createObjectURL(that);

							listItem.appendChild(image);
						} 
							
						listItem.appendChild(para);
						listItem.appendChild(delbutton);
						list.appendChild(listItem);
						delbutton.addEventListener('click', fileDelete);
					}
				}
			}

			for (let i = 0, len = el_files.length; i < len; i++) {
				const that = el_files[i];

				if (!that.dataset.ready) {
					that.addEventListener('change', updateImageDisplay);
					that.dataset.ready = true;
				}
			}
		},
		allCheck(opt) {
			const el_parents = document.querySelectorAll('[data-allcheck-parent]');
			const el_childs = document.querySelectorAll('[data-allcheck-child]');
			const opt_callback = opt.allCheckCallback;

			const allCheckParent = () => {
				isAllChecked({
					name: this.dataset.allcheckParent, 
					type: 'parent'
				});
			}

			const allCheckChild = () => {
				isAllChecked({
					name: this.dataset.allcheckChild, 
					type: 'child'
				});
			}
			
			const isAllChecked = (opt) =>{
				const isType = opt.type;
				const isName = opt.name;
				const parent = document.querySelector('[data-allcheck-parent="' + isName + '"]');
				const childs = document.querySelectorAll('[data-allcheck-child="' + isName + '"]');
				const allChecked = parent.checked;
				const len = childs.length;
				let n_checked = 0;
				let n_disabled = 0;

				for (let i = 0; i < len; i++) {
					const child = childs[i];
					
					if (isType === 'parent' && !child.disabled) {
						child.checked = allChecked;
					} 
					
					n_checked = child.checked && !child.disabled ? ++n_checked : n_checked;
					n_disabled = child.disabled ? ++n_disabled : n_disabled;
				}

				parent.checked = (len !== n_checked + n_disabled) ? false : true;

				opt_callback({
					group: isName,
					allChecked: parent.checked
				});
			}
			
			for (let i = 0; i < el_parents.length; i++) {
				if (!el_parents[i].dataset.apply) {
					el_parents[i].addEventListener('change', allCheckParent);
					isAllChecked({
						name: el_parents[i].dataset.allcheckParent, 
						type: 'child'
					});
				}

				el_parents[i].dataset.apply = '1';
			}

			for (let i = 0; i < el_childs.length; i++) {
				if (!el_childs[i].dataset.apply) {
					el_childs[i].addEventListener('change', allCheckChild);
				}

				el_childs[i].dataset.apply = '1';
			}
		},
		setSelect() {
			const selects = document.querySelectorAll('.mdl-select');
			let n = 0;
			for (let item of selects) {
				if (!!item.dataset.id) {
					const _id = item.dataset.id;
					if (!UI.exe[_id]) {
						UI.exe[_id] = new Layer({
							id:  _id,
							type: 'select'
						});
					}
				} else {
					const _id = 'select_' + Date.now() + n;
					n = n + 1;
					item.dataset.id = _id;
				
					UI.exe[_id] = new Layer({
						id: _id,
						type: 'select'
					});
				}
			}
		},
	}

    //common exe
    Global.parts.resizeState();
    Global.parts.scroll();
    Global.weather.get({ city:'Seoul' });

    //common callback
    Global.callback.toggle_weather = () => {
        console.log('weather');
        navigator.geolocation.getCurrentPosition(UI.weather.success, UI.weather.fail);
    }
    Global.callback.toggle_nav = (result) => {
        console.log('toggle_nav', result);
        const btn = document.querySelector('[data-toggle-object="'+ result.name +'"]');

        if (result.state === 'true') {
            btn.dataset.meterial = 'arrow_forward';
        } else {
            btn.dataset.meterial = 'arrow_back';
        }
    }
    Global.callback.toggle_darkmode = (result) => {
        console.log('toggle_darkmode', result);
        const btn = document.querySelector('[data-toggle-object="'+ result.name +'"]');
        const html = document.querySelector('html');
        console.log(html, result.state)
        if (result.state === 'true') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

	
})();

