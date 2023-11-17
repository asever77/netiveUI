'use strict';

const global = 'UI';

if (!window[global]) {
    window[global] = {};
} 
const Global = window[global];

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
    breakPoint: [600, 905],
};
Global.parts = {
    comma(n) {
        let parts = n.toString().split(".");

        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    },
    include(opt) {
        const selector = document.querySelector('[data-id="'+ opt.id +'"]');
        const src = opt.src;
        const type = !opt.type ? 'html' : opt.type;
        const insert = !!opt.insert ? opt.insert : false;

        if (!!selector && !!src && type === 'html') {
            fetch(src).then(response => response.text()).then(data => {
                if (insert) {
                    selector.insertAdjacentHTML('afterbegin', data);
                } else {
                    selector.innerHTML = data;
                }
                
                (!!selector.dataset.title && !!selector.querySelector('.ocr-header-tit')) && selector.querySelector('.ocr-header-tit').setAttribute('aria-label', selector.dataset.title);
            });
        }  
    }
};
