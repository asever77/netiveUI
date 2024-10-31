import Layer from './components/layer.js';

// 전역 객체 UI 설정
const UI = (() => {
    'use strict';

    const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opera mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];
    const UA = navigator.userAgent.toLowerCase();

    const Global = {
        page: {},
        data: {},
        exe: {},
        callback: {},
        state: {
            isSystemModal: false,
            device: {
                info: deviceInfo.find(info => UA.includes(info)) || 'unknown',
                width: window.innerWidth,
                height: window.innerHeight,
                ios: (/ip(ad|hone|od)/i).test(UA),
                android: (/android/i).test(UA),
                app: UA.includes('appname'),
                touch: null,
                mobile: null,
                os: (navigator.appVersion.match(/(mac|win|linux)/i) || [''])[0].toLowerCase()
            },
            browser: {
                ie: UA.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
                local: location.protocol === 'http:',
                firefox: UA.includes('firefox'),
                webkit: UA.includes('applewebkit'),
                chrome: UA.includes('chrome'),
                opera: UA.includes('opera'),
                safari: UA.includes('applewebkit') && !UA.includes('chrome'),
                size: null
            },
            keys: { 
                tab: 9, enter: 13, alt: 18, esc: 27, space: 32, pageup: 33, pagedown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40
            },
            scroll: { y: 0, direction: 'down' },
            breakPoint: [600, 905]
        }
    };

    const parts = {
        scroll: () => {
            const el_html = document.querySelector('html');
            let lastScrollPos = 0;
            let ticking = false;

            const updateScroll = scrollPos => {
                Global.state.scroll.direction = Global.state.scroll.y > scrollPos ? 'up' : 'down';
                Global.state.scroll.y = scrollPos;
                el_html.dataset.direction = Global.state.scroll.direction;
            };

            window.addEventListener('scroll', () => {
                lastScrollPos = window.scrollY;

                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        updateScroll(lastScrollPos);
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        },

        resizeState: () => {
            const updateResizeState = () => {
                const el_html = document.querySelector('html');
                const { device, browser } = Global.state;

                device.width = window.innerWidth;
                device.height = window.innerHeight;
                device.touch = 'ontouchstart' in document;
                device.mobile = device.touch && (device.ios || device.android);
                device.breakpoint = device.width >= Global.state.breakPoint[0];
                device.col = device.width >= Global.state.breakPoint[1] ? '12' : device.width >= Global.state.breakPoint[0] ? '8' : '4';

                if (browser.ie) {
                    browser.ie = parseInt(browser.ie[1] || browser.ie[2]);
                }

                el_html.dataset.col = device.col;
                el_html.dataset.browser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? `ie${browser.ie}` : 'other';
                el_html.dataset.platform = device.ios ? "ios" : device.android ? "android" : 'window';
                el_html.dataset.device = device.mobile ? (device.app ? 'app' : 'mobile') : 'desktop';
            };

            window.addEventListener('resize', updateResizeState);
            updateResizeState();
        },

        comma: n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

        add0: x => (x < 10 ? '0' + x : x),

        paraGet: paraname => {
            const params = new URLSearchParams(window.location.search);
            return params.get(paraname);
        },

        paraSet: (key, value) => {
            const url = new URL(window.location);
            url.searchParams.set(key, value);
            window.history.pushState({}, '', url);
        },

        include: async ({ id, src, type = 'HTML', insert = false, callback = null }) => {
            const selector = document.querySelector(`[data-id="${id}"]`);
            if (!selector || !src) return;

            try {
                const response = await fetch(src);
                const result = await response.text();

                if (insert) {
                    selector.insertAdjacentHTML('afterbegin', result);
                } else {
                    selector.innerHTML = result;
                }

                if (callback) callback();
            } catch (error) {
                console.error(`Error loading include file: ${error}`);
            }
        },

        resizeObserver: ({ el, callback }) => {
            const observer = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    callback({ width, height });
                }
            });
            observer.observe(el);
        }
    };

    const init = () => {
        parts.resizeState();
        parts.scroll();
    };

    return { Global, parts, init };
})();

// UI 초기화 실행
UI.init();
