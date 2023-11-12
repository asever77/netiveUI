const global = 'UI';

if (!window[global]) {
    window[global] = {};
} 
const Global = window[global];

const UA = navigator.userAgent.toLowerCase();
const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];

Global.data = {};
Global.exe = {};
Global.callback = {};
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
        let last_know_scroll_position = 0;
        let ticking = false;

        const doSomething = (scroll_pos) => {
            Global.state.scroll.direction = 
                Global.state.scroll.y > scroll_pos ? 'up' : Global.state.scroll.y < scroll_pos ? 'down' : ''; 
            Global.state.scroll.y = scroll_pos;
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
    para(paraname) {
        const _tempUrl = window.location.search.substring(1);
        const _tempArray = _tempUrl.split('&');

        for (let i = 0, len = _tempArray.length; i < len; i++) {
            const that = _tempArray[i].split('=');

            if (that[0] === paraname) {
                return that[1];
            }
        }
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

        while((ele = ele.previousSibling) != null ) {
            _i++;
        }

        return _i;
    },

};
Global.parts.resizeState();
Global.parts.scroll();




export default {Global}; 