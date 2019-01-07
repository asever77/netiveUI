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
	}
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
	}
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
				'constructor'
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
	console.log('global')

	'use strict';

	var global = '$plugins', 
		namespace = 'netiveUI.plugins',
		easings = {
			linear : function(t,b,c,d){return c*t/d+b;},
			easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
			easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
			easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
			easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
			easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
			easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
			easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
			easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
			easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
			easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
			easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
			easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
			easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
			easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
			easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
			easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
			easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
			easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
			easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
			easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
			easeInExpo : function(t,b,c,d){return (t==0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
			easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
			easeInOutExpo : function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
			easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
			easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
			easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
			easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
			easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
			easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
			easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
			easeInOutElastic : function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
			easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
			easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
			easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
			easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
			easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
			easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
			easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
			easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
			easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
		},
		easing;

	//IIFE - device & browser setup check
	(function () {
		var width = document.documentElement.offsetWidth,
			devsize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360],
			size_len = devsize.length,
			sizeMode,
			colClass = width > devsize[5] ? 'col12' : width > devsize[8] ? 'col8' : 'col4',
			html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'],
			i = 0,
			max = html5tags.length,
			timer;

		deviceSizeClassName(width);

		for (i = 0; i < max; i++) {
			document.createElement(html5tags[i]);
		}

		document.documentElement.className += (' s' + sizeMode + ' ' +colClass);

		$(win).resize(function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				width = $(win).outerWidth();

				deviceSizeClassName(width);

				colClass = (width > devsize[5] ? 'col12' : width > devsize[8] ? 'col8' : 'col4');
				$('html').removeClass('s1920 s1600 s1440 s1280 s1024 s960 s840 s720 s600 s480 s400 s360 s300 col12 col8 col4').addClass(' s' + sizeMode + ' ' + colClass);
			}, 100);
		});

		function deviceSizeClassName(w){
			for (var j = 0; j < size_len; j++) {
				if (w > devsize[j]) {
					sizeMode = devsize[j];
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 300 : '';
				}
			}
		}
	})();
	
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

	//jquery easing add
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			}
		})(easing);
	}

	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
        win[global] = createNameSpace(namespace, {
            uiNameSpace: function (identifier, module) { 
                return createNameSpace(identifier, module); 
            }
        });
    }
	console.log(win[global])
	//components option
	win[global].option = {
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40,
		},
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
		},
        uiComma: function(n){
            var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        },
        partsAdd0 :function(x, y, z) {
            //숫자 한자리수 일때 0 앞에 붙이기
            var y = y === undefined ? 10 : y,
                z = z === undefined ? '0' : z;

            return ((x < 10) ? z + x : x);
        }
	};

	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length,
			browser = win[global].borwser,
			support = $.support,
			device = win[global].device,
			i = 0,
			version,
			j;

		!browser ? win[global].browser = browser = {} : '';

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}

		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			browser.oldie = false;
			browser.ie9 = false;
			( 9 > ie ) ? browser.oldie = true : ( 9 == ie ) ? browser.ie9 = true : '';
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
			browser.oldie = false;
			browser.ie9 = false;
		}

		//class 생성
		$('html')
		.addClass(browser.os)
		.addClass(browser.chrome? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : '')
		.addClass(browser.ie && 8 > browser.ie ? 'oldie' : '')
		.addClass(browser.ios ? "ios" : browser.android ? "android" : '')
		.addClass(browser.mobile ? 'ui-m' : 'ui-d')
		.addClass(browser.app ? 'ui-a' : '');
	})();

	win[global] = win[global].uiNameSpace(namespace, {
		uiConsoleGuide: function (opt) {
			return createUiConsoleGuide(opt);
		},
		uiAjax: function (opt) {
			return createUiAjax(opt);
		},
		uiScroll: function (opt) {
			return createUiScroll(opt);
		},
		uiPara: function (v) {
			return createUiPara(v);
		},
		uiHasScrollBar: function (opt) {
			return createUiHasScrollBar(opt);
		},
		uiScrollBar: function (opt) {
			return createuiScrollBar(opt);
		},
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		},
		uiPopup: function (opt) {
			return createUiPopup(opt);
		},
        uiCookieSet: function (opt) {
			return creaeteUiCookieSet(opt);
		},
		uiCookieGet: function (opt) {
			return creaeteUiCookieGet(opt);
		},
		uiCookieDel: function (opt) {
			return creaeteUiCookieDel(opt);
		}
	});
    
    function createNameSpace(identifier, module) {
		var w = win,
			name = identifier.split('.'),
			p,
			i = 0;

		if (!!identifier) {
			for (i = 0; i < name.length; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}
	function createUiConsoleGuide(opt) {
		if (!win[global].browser.ie) {
			console.log('');
			for (var i = 0; i < opt.length; i++) {
				(i === 0) ? console.log("%c" + opt[i], "background:#333; color:#ffe400; font-size:12px"): console.log(opt[i]);
			}
			console.log('');
		}
	}



	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		type: 'GET',
		callback: false,
		errorCallback: false,
		contType: 'application/x-www-form-urlencoded; charset=euc-kr'

	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiAjax({ id:'아이디명', url:'링크주소', add:true/false, page:true/false, callback:function(){...} );",
				"- id: #을 제외한 아이디명만 입력(!필수)",
				"- url: 링크 주소 입력(!필수)",
				"- page: true일 경우 html추가 및 값 전달, false일 경우 값만 전달, (!선택 - 기본값 true)",
				"- add: false일 경우 삭제추가, true일 경우 추가(!선택 - 기본값 false)",
				"- callback: 콜백함수 (!선택)",
			]);
			return false;
		}

		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiAjax.option, opt),
			$id = $('#' + opt.id),
			callback = opt.callback === undefined ? false : opt.callback,
			errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: false,
			async: false,  
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				opt.page ? opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v) : '';
				callback ? callback(v) : '';
			}
		});
	}



	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		focus: false,
		target: false
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiScroll({ value:0, speed:600, focus:'#name', callback:function(){...} );",
				"- value: 움직일 위치값(!선택 - 기본값 0)",
				"- speed: 속도(!선택 - 기본값 600)",
				"- p: 방향(!선택 - 기본값 'top')",
				"- focus: 포커스이동  (!선택)",
				"- callback: 콜백함수 (!선택)"
			]);
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			v = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			overlap = false,
			f = typeof opt.focus === 'string' ? '#' + opt.focus : opt.focus,
			$target = opt.target === false ? $('html, body') : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
				scrollTop : v 
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
				scrollLeft : v 
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		}
	}



	function createUiPara(paraname){
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


	
	win[global].uiScrollBar.option = {
		ps: 'bottom',
		add: false,
		fix: true,
		callback: false
	};
	win[global].uiScrollBar.timer = {};
	function createuiScrollBar(opt) {
		var $base = $('.ui-scrollbar'),
			overlapExe = 0;

		$base.each(function(i){
			var $this = $(this);

			if (win[global].uiHasScrollBar({ selector: $this }) && !$plugins.browser.mobile) {
				scrollbarReady($this, i);
			}
		});
		scrollbarEvent();
		
		function scrollbarReady(wrap_this, i){
			var $wrap = wrap_this,
				$item =  $wrap.children('.ui-scrollbar-item'),
				html_scrollbar = '';

			//set
			if (!$wrap.data('ready') || !$wrap.attr('id')) {
				$wrap.css('overflow','hidden').attr('tabindex', 0).attr('id', 'uiScrollBar_'+ i).data('ready', true);
			
				html_scrollbar += '<div class="ui-scrollbar-barwrap" >';
				html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1"><span class="hide">스크롤버튼</span></button>';
				html_scrollbar += '</div>';
				html_scrollbar += '</div>';

				$wrap.prepend(html_scrollbar);
				$wrap.find('> .ui-scrollbar-barwrap .ui-scrollbar-bar').css('height', Math.floor($wrap.innerHeight() / ($item.outerHeight(true) / 100)) +'%')
			}
		}

		function scrollbarEvent(){
			$('.ui-scrollbar').off('mouseover.uiscrbar focus.uiscrbar').on({
				'mouseover.uiscrbar': mouseEventAct,
				'focus.uiscrbar': keyEventAct
			});
			
			function mouseEventAct(e) {
				e.preventDefault();
				e.stopPropagation();

				var $this = $(this),
					wrap_h = $this.innerHeight(),
					item_h = $this.children('.ui-scrollbar-item').outerHeight(true),
					max_y = item_h - wrap_h,
					y = e.pageY,
					bar_t;

				//미완성 mouse drag event
				$('.ui-scrollbar-bar').off('mousedown.bar touchstart.bar').on('mousedown.bar touchstart.bar', function(e){
					e.preventDefault();
					var $bar = $(this),
						moving = false;

					bar_t = $bar.position().top;
					console.log('bar_t', bar_t);

					$(doc).off('mousemove.bar touchmove.bar').on('mousemove.bar touchmove.bar', function(e){
						moving = true;
						console.log(22222);
					}).off('mouseup.bar touchcancel.bar touchend.bar').on('mouseup.bar touchcancel.bar touchend.bar', function(){
						console.log(33333);
						//moving ? act($this, minmax) : '';
						$(doc).off('mousemove.bar mouseup.bar touchmove.bar');
					});
				});

				//wheel event
				$this.off('mousewheel.aa DOMMouseScroll.aa').on('mousewheel.aa DOMMouseScroll.aa', function(e){
					e.preventDefault();
					e.stopPropagation();
					wheelAct($this, e.originalEvent.wheelDelta, wrap_h, item_h, max_y);
				});
			}

			function keyEventAct(e){
				$('.ui-scrollbar').off('keydown.bb').on('keydown.bb', function(e){
					var $this = $(this),
						wrap_h = $this.innerHeight(),
						item_h = $this.children('.ui-scrollbar-item').outerHeight(true),
						max_y = item_h - wrap_h,
						y = e.pageY,
						bar_t,
						keys = win[global].option.keys;

					console.log('focus', e.keyCode);
					switch(e.keyCode){
						case keys.up:
							e.preventDefault();
							e.stopPropagation();
							console.log('up');
							wheelAct($this, 120, wrap_h, item_h, max_y);
							break;

						case keys.down:
							e.preventDefault();
							e.stopPropagation();
							console.log('down');
							wheelAct($this, -120, wrap_h, item_h, max_y);
							break;
					}
				});
			}

		}
			
		function wheelAct(wrap_this, wheelDelta, wrap_h, item_h, max_y) {
			var $this = wrap_this,
				delta = -Math.max(-1, Math.min(1, wheelDelta)),
				$this_bar = $this.find('> .ui-scrollbar-barwrap > .ui-scrollbar-bar'),
				$this_item =  $this.children('.ui-scrollbar-item'),

				item_top = $this_item.position().top,
				bar_space = wrap_h - $this_bar.outerHeight(),
				v,
				wh,
				ms = 3;

			overlapExe = overlapExe + 1;
			console.log(overlapExe);

			switch (overlapExe) {
				case 1 : ms = 3; break;
				case 2 : ms = 2; break;
				case 3 : ms = 1.5; break;
				case 4 : ms = 1; break;
				default : ms = 0.5; break;
			}

			if (delta > 0) {
				wh = item_top - (wrap_h / ms);
			} else {
				wh = item_top + (wrap_h / ms);
			}

			v = Math.ceil(wh);

			if (v > 0) {
				v = 0;
				console.log('최상단');
			} else if (Math.abs(v) > max_y){
				console.log('최하단');
				v = max_y * -1;
				item_top = max_y * -1;
			}

			clearTimeout(win[global].uiScrollBar.timer);
			win[global].uiScrollBar.timer = setTimeout(function(){
				var v_bar = (v / (max_y / 100)) * (bar_space / 100);

				Math.ceil(v_bar) > bar_space ? v_bar = bar_space * -1 : '';
				
				$this_bar.stop().animate({
					'top': v_bar * -1 +'px'
				},300);

				$this_item.stop().animate({
					'top': v +'px'
				},300, 'easeInOutQuad', function(){
					overlapExe = 0;
				});
			},100);
		}

			function per($this, e, minmax){
				var value_l;

				slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight();
				
				if (!vertical) {
					if (e.touches !== undefined) {
						value_l = e.touches[0].pageX - $bg.offset().left - 0;
					}
					if (e.touches === undefined) {
						if (e.pageX !== undefined) {
							value_l = e.pageX - $bg.offset().left - 0;
						}
						//ie
						if (e.pageX === undefined) {
							value_l = e.clientX - $bg.offset().left - 0;
						}
					}
				} else {
					if (e.touches !== undefined) {
						value_l = e.touches[0].pageY - $bg.offset().top - 0;
					}
					if (e.touches === undefined) {
						if (e.pageX !== undefined) {
							value_l = e.pageY - $bg.offset().top - 0;
						}
						//ie
						if (e.pageX === undefined) {
							value_l = e.clientY - $bg.offset().top - 0;
						}
					}
				}

				p = (value_l <= 0) ? 0 : (value_l >= slider_w) ? slider_w - 0 : value_l;
				p = (p / slider_w) * 100;
				rev ? p = 100 - p : ''; 
				p > 50 ? Math.floor(p/10) * 10 : Math.ceil(p/10) * 10;
				p = p.toFixed(0);
				p = p < 0 ? 0 : p > 100 ? 100 : p;


				if (minmax === 'min') {
					lmt_min = 0;
					isNaN(lmt_max) ? lmt_max = per_max : '';
					p * 1 >= lmt_max * 1 ? p = lmt_max: '';
					per_min = p; 
					!range ? $bar.css(siz, per_min + '%').css(dir, 0) : $bar.css(siz, lmt_max - per_min + '%').css(dir, per_min + '%');
				}  
				
				if (minmax === 'max') {
					lmt_max = 100;
					isNaN(lmt_min) ? lmt_min = per_min : '';
					p * 1 <= lmt_min * 1 ? p = lmt_min: '';
					per_max = p;
					$bar.css(siz, per_max - per_min + '%');
				}
				$this.css(dir, p + '%');
			}

			
			// $wrap.on('mousedown.uiscrollbar', function(e){
			// 	var $this = $(this);
			// 	wrap_h = $this.outerHeight();
			// 	item_h = $this.find('.ui-scrollbar-item').outerHeight();
			// 	max_y = item_h - wrap_h;
			// 	y = e.pageY;	
			// 	$(doc).on('mousemove.uiscrollbar', function(e){
			// 		$this.data('y') === undefined ? $this.data('y', 0) :'';
			// 		y2 = e.pageY;
			// 		yn = Number($this.data('y')) + (y2 - y);
			// 		yn = Math.ceil(yn + (yn / 10));
			// 		console.log(yn,  Math.abs(yn), max_y);
			// 		y3 = yn > 0 ? 0 : Math.abs(yn) >= max_y ? max_y * -1 : yn;
			// 		$this.find('.ui-scrollbar-item').css('transform','translatey('+ y3 +'px)');

			// 	});
			// 	$(doc).on('mouseup', function(){
			// 			$this.data('y', y3);
			// 			$(doc).off('mousemove.uiscrollbar');
			// 			//$('.ui-scrollbar').off('mousedown.uiscrollbar');
			// 		});
			// });

			//event
			

			

			
			
			
		
		
		
		
	}

	function createUiHasScrollBar(opt) {
		var $this = opt.selector;
		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}
	win[global].uiFocusTab.option = {
		focusitem : '.ui-select-tit, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), label, [role="button"]',
		callback: false,
		focusnot: false,
		type: 'hold' //'hold', 'sense'
	};




	function createUiFocusTab(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiFocusHold({ id:'css셀렉트' );",
				"- selector: css셀렉터 형식 예) '#aaa', '.aa .bb' ...(!필수)",
				"※  지정한 특정영역에서 tab 이동 시 포커스 홀딩 "
			]);
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ui-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ui-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},0);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}
	win[global].uiPopup.option = {
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
	};
	function createUiPopup(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiPopup.option, opt),
			specs;

		if (opt.align === 'center') {
			opt.left = ($(win).outerWidth() / 2) - (opt.width / 2);
			opt.top = ($(win).outerHeight() / 2) - (opt.height / 2);
		}

		specs = 'width=' + opt.width + ', height='+ opt.height + ', left=' + opt.left + ', top=' + opt.top;
		specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
		
		win.open(opt.link, opt.name , specs);
	}
	function creaeteUiCookieSet(opt){
		var cookieset = opt.name + '=' + opt.value + ';',
			expdate;
		if (opt.term) {
			expdate = new Date();
			expdate.setTime( expdate.getTime() + opt.term * 1000 * 60 * 60 * 24 ); // term 1 is a day
			cookieset += 'expires=' + expdate.toGMTString() + ';';
		}
		(opt.path) ? cookieset += 'path=' + opt.path + ';' : '';
		(opt.domain) ? cookieset += 'domain=' + opt.domain + ';' : '';
		document.cookie = cookieset;
	}
	function creaeteUiCookieGet(opt){
		var match = ( document.cookie || ' ' ).match( new RegExp(opt.name + ' *= *([^;]+)') );
		return (match) ? match[1] : null;
	}
	function creaeteUiCookieDel(opt){
		var expireDate = new Date();

		expireDate.setDate(expireDate.getDate() + -1);
		win[global].uiCookieSet({ name:opt.name, term:'-1' });
	}
})(jQuery, window, document);	