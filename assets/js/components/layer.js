/**
 * T:top        L:left
 * C:center     C:center
 * B:bottom     R:right
 */

export default class Layer {
    constructor(opt) {
        this.id = opt.id;
        this.src = opt.src;
        this.html = document.querySelector('html');
        this.modal;
        this.btn_close;
        this.modal_wrap;
        this.ok;
        this.cancel;
        this.last;
        this.focus;
        this.type = !opt.type ? 'modal' : opt.type; 
        this.ps = opt.ps ?? 'BL';

        this.title = opt.title;
        this.content = opt.content;
        this.btn = opt.button;

        if (this.type === 'system') {
            //script coding
            this.madeSystem();
        } else if (this.src) {
            //fetch load
            this.made();
        } else {
            //hard coding
            this.modal = document.querySelector('.mdl-layer[data-id="'+ this.id +'"]');
            this.btn_close = this.modal.querySelector('.mdl-layer-close');
            this.modal_wrap = this.modal.querySelector('.mdl-layer-wrap');

            switch(this.type) {
                case 'modal' :
                    this.modal.dataset.type = 'modal';
                    break;
                case 'dropdown' :
                    this.modal.dataset.type = 'dropdown';
                    break;
            }

            this.init();
        }
    }
    madeSystem() {
        //alert & confirm
        let html = '';
        html += '<section class="mdl-layer" data-id="'+ this.id +'" data-type="alert" data-state="" >';
        html += '<div class="mdl-layer-wrap">';
        html += '    <div class="mdl-layer-body">';
        if (!!this.title) {
        html += '        <h1 class="mdl-layer-tit">'+ this.title +'</h1>';
        }
        html += this.content;
        html += '        <div class="mdl-btn-wrap">';
        if (this.btn.length === 2) {
        html += '            <button type="button" class="mdl-btn" data-state="cancel" data-style="primary-gray">';
        html += '                <span>'+ this.btn[1].text +'</span>';
        html += '            </button>';
        } 
        html += '            <button type="button" class="mdl-btn" data-state="ok" data-style="primary">';
        html += '                <span>'+ this.btn[0].text +'</span>';
        html += '            </button>';
        html += '        </div>';
        html += '    </div>';
        html += '</div>';
        html += '<div class="mdl-layer-dim"></div>';
        html += '</section>';

        document.querySelector('body').insertAdjacentHTML('beforeend', html);
        
        html = null;
        this.modal = document.querySelector('.mdl-layer[data-id="'+ this.id +'"]');
        this.modal_wrap = this.modal.querySelector('.mdl-layer-wrap');
        this.ok = this.modal.querySelector('.mdl-btn[data-state="ok"]');
        this.cancel = this.modal.querySelector('.mdl-btn[data-state="cancel"]');

        this.ok && this.ok.addEventListener('click', this.btn[0].callback);
        this.cancel && this.cancel.addEventListener('click', this.btn[1].callback);

        this.init();
    }
    made() {
        UI.parts.include({
            id: 'body',
            src: this.src + '.html',
            type: 'HTML',
            insert: true,
            callback: () => {
                const css_usage_modal = document.querySelector('link[data-usage="'+ this.id +'"]');
                const js_usage_modal = document.querySelector('script[data-usage="'+ this.id +'"]');
                
                let _script = document.createElement('script');
                _script.dataset.usage = this.id;
                _script.type = 'module';
                _script.src = this.src + '.js?v=' + Date.now();

                let _link = document.createElement('link');
                _link.dataset.usage = this.id;
                _link.rel = 'stylesheet';
                _link.href = this.src + '.css?v=' + Date.now();

                let _btn = document.createElement('button');
                _btn.type = 'button';
                _btn.setAttribute('aria-lable', '마지막 구간입니다. 클릭하시면 닫힙니다.');
                _btn.classList.add('mdl-layer-last');

                css_usage_modal && css_usage_modal.remove();
                js_usage_modal && js_usage_modal.remove();
                document.body.appendChild(_script);
                document.head.appendChild(_link);

                this.modal = document.querySelector('.mdl-layer[data-id="'+ this.id +'"]');
                this.btn_close = this.modal.querySelector('.mdl-layer-close');
                this.modal_wrap = this.modal.querySelector('.mdl-layer-wrap');

                this.modal_wrap.appendChild(_btn);
                this.last = this.modal.querySelector('.mdl-layer-last');

                switch(this.type) {
                    case 'modal' :
                        this.modal.dataset.type = 'modal';
                        break;
                    case 'dropdown' :
                        this.modal.dataset.type = 'dropdown';
                        break;
                }

                this.init();
            }
        });
    }
    init() {
        //focus loop
        const keyStart = (e) => {
            if (e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.last.focus();
            }
        }
        const keyEnd = (e) => {
            if (!e.shiftKey && e.keyCode == 9) {
                e.preventDefault();
                this.btn_close.focus();
            }
        }

        this.btn_close && this.btn_close.removeEventListener('click', this.hide);
        this.btn_close && this.btn_close.addEventListener('click', this.hide);
        this.last && this.last.removeEventListener('click', this.hide);
        this.last && this.last.addEventListener('click', this.hide);
        this.btn_close && this.btn_close.addEventListener('keydown', keyStart);
        this.last && this.last.addEventListener('keydown', keyEnd);
    }
    show = () =>  {
        const _zindex = 100;
        const _prev = document.querySelector('[data-layer-current="true"]');
        const _body = document.querySelector('html');
        const btn_dropdown = document.querySelector('[data-dropdown="'+ this.id +'"]');
        _prev ? _prev.dataset.layerCurrent = 'false' : '';

        this.modal.dataset.layerCurrent = 'true';
        this.modal || this.src && this.make();
        this.modal.dataset.state = 'show';

        if (this.type === 'dropdown') {
            const btn_dropdown_info = {
                m_width: this.modal.offsetWidth,
                m_height: this.modal.offsetHeight,
                height: btn_dropdown.offsetHeight,
                width: btn_dropdown.offsetWidth,
                top: btn_dropdown.getBoundingClientRect().top,
                left: btn_dropdown.getBoundingClientRect().left,
                sc_top: _body.scrollTop,
                sc_left: _body.scrollLeft,
            }
            let _top, _left;

            !this.ps ? this.ps = 'BL' : '';

            console.log(btn_dropdown_info);

            switch(this.ps){
                case 'TL': 
                    _top = ((btn_dropdown_info.top - btn_dropdown_info.sc_top) + btn_dropdown_info.height) / 10 + 'rem';
                    _left = ((btn_dropdown_info.left - btn_dropdown_info.sc_left)) / 10 + 'rem';
                    break;
                case 'TC': 
                break;
                case 'TR': 
                break;
                case 'BL': 
                    _top = ((btn_dropdown_info.top - btn_dropdown_info.sc_top) + btn_dropdown_info.height) / 10 + 'rem';
                    _left = ((btn_dropdown_info.left - btn_dropdown_info.sc_left)) / 10 + 'rem';
                    break;
                case 'BC': 
                    _top = ((btn_dropdown_info.top - btn_dropdown_info.sc_top) + btn_dropdown_info.height) / 10 + 'rem';
                    _left = ((btn_dropdown_info.left - btn_dropdown_info.sc_left) + (btn_dropdown_info.width / 2) - (btn_dropdown_info.m_width / 2)) / 10 + 'rem';
                    break;
                case 'BR': 
                    _top = ((btn_dropdown_info.top - btn_dropdown_info.sc_top) + btn_dropdown_info.height) / 10 + 'rem';
                    _left = ((btn_dropdown_info.left - btn_dropdown_info.sc_left) - (btn_dropdown_info.m_width - btn_dropdown_info.width)) / 10 + 'rem';
                    break;

                case 'LT': 
                break;
                case 'LC': 
                break;
                case 'LB': 
                break;
                case 'RT': 
                break;
                case 'RC': 
                break;
                case 'RB': 
                break;
            }

            this.modal.style.top = _top;
            this.modal.style.left = _left;
        } else {
            this.html.dataset.modal = 'show';
        }

        this.focus = document.activeElement;

        this.html.dataset.layerN = !this.html.dataset.layerN ? 1 : Number(this.html.dataset.layerN) + 1;
        this.modal.style.zIndex = Number(_zindex) + Number(this.html.dataset.layerN);
        this.modal.dataset.layerN = this.html.dataset.layerN;

        this.btn_close && this.btn_close.focus();

    }
    hidden = () => {
        const _prev = document.querySelector('[data-layer-current="true"]');

        _prev.dataset.layerCurrent = 'false';
        // this.modal.dataset.layerCurrent = 'true';

        this.modal_wrap.removeEventListener('animationend', this.hidden);
        this.modal.dataset.state = 'hidden';
        this.html.dataset.modal = 'hidden';

        this.focus.focus();
        this.html.dataset.layerN = Number(this.html.dataset.layerN) - 1;
        if (Number(this.html.dataset.layerN) !== 0) {
            let a = document.querySelector('.mdl-layer[data-layer-n="'+ this.html.dataset.layerN +'"]');
            a.dataset.layerCurrent = 'true';
        }
        
        if (this.src) {
            // this.modal.remove();
        }
    }
    hide = () => {
        this.modal.dataset.state = 'hide';
        this.modal_wrap.addEventListener('animationend', this.hidden);
    }
}