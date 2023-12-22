/**
 * T:top        L:left
 * C:center     C:center
 * B:bottom     R:right
 */

export default class Layer {
    constructor(opt) {
        this.id = opt.id;
        this.src = opt.src;

        this.type = !opt.type ? 'modal' : opt.type; 
        this.classname  = opt.classname ? opt.classname : '',
        this.callback = opt.callback;

        //system 
        this.ps = opt.ps ?? 'BL';
        this.title = opt.title;
        this.btn = opt.button;

        //toast
        this.delay = opt.delay ? opt.delay : 'short', 
        this.delaytime = this.delay === 'short' ? 2000 : 3500; //short[2s] | long[3.5s]
        this.status = opt.status ? opt.status : 'off', 
        //assertive[중요도 높은 경우] | polite[중요도가 낮은 경우] | off[default]
        this.auto = opt.auto ? opt.auto : true,

        //system & toast
        this.content = opt.content;

        this.html = document.querySelector('html');
        this.el_body = document.querySelector('body');
        this.modal;
        this.btn_close;
        this.modal_wrap;
        this.ok;
        this.cancel;
        this.last;
        this.focus;
        this.pageScroll = document.querySelector('[data-pagescroll]') ?? document.querySelector('html');
        this.select;
        this.select_btn;

        this.isFocus = false;

        this.timer;

        if (this.type === 'system') {
            //script coding
            this.madeSystem();
        } 
        else if (this.type === 'toast') {
            //fetch load
            this.madeToast();
        } 
        else if (this.type === 'select') {
            //fetch load
            this.resetSelect();
            this.madeSelect();
        } 
        else if (this.src) {
            //fetch load
            this.made();
        } 
        else {
            //hard coding
            this.modal = document.querySelector('.mdl-layer[data-id="'+ this.id +'"]');
            this.btn_close = this.modal.querySelector('.mdl-layer-close');
            this.modal_wrap = this.modal.querySelector('.mdl-layer-wrap');

            switch(this.type) {
                case 'modal' :
                    this.modal.dataset.type = 'modal';
                    break;
                case 'bottom' :
                    this.modal.dataset.type = 'bottom';
                    break;
                case 'dropdown' :
                    this.modal.dataset.type = 'dropdown';
                    break;
            }

            this.init();
        }
    }
    resetSelect() {
        this.selectBtns = document.querySelectorAll('.mdl-select-btn');
        this.selectLayers = document.querySelectorAll('.mdl-layer[data-type="select"]');

        for (let item of this.selectLayers) {
            item.remove();
        }
        for (let item of this.selectBtns) {
            item.remove();
        }
    }
    madeSelect() {
        this.select = document.querySelector('.mdl-select[data-id="'+ this.id +'"]');
        const select = this.select.querySelector('select');
        const options = select.querySelectorAll('option');

        let html = '<button type="button" class="mdl-select-btn" data-select-id="'+  this.id+'_select" value="'+ select.value +'" tabindex="-1" role="combobox" aria-haspopup="listbox" aria-expanded="false"><span>'+ select.querySelector('[selected]').text +'</span></button>';
        this.select.insertAdjacentHTML('beforeend', html);

        html = null;
        html += '<section class="mdl-layer" data-id="'+ this.id +'_select" data-type="select" role="listbox">';
        html += '<div class="mdl-layer-wrap">';
        html += '   <div class="mdl-layer-header">';
        html += '       <h2>'+ select.title +'</h2>';
        html += '       <button type="button" class="mdl-layer-close" data-material="close"  aria-label="닫기"></button>';
        html += '   </div>';
        html += '    <div class="mdl-layer-body">';
        html += '       <ul class="mdl-select-wrap">';

        for (let i = 0, len = options.length; i < len; i++) {
            console.log(options[i].value, options[i].selected);

            html += '<li>';
            html += '<input type="radio" id="'+ this.id +'_r'+ i +'" value="'+ options[i].value +'"  name="'+ this.id +'_r" '+ ((options[i].selected) && 'checked') +'>';
            html += '<label for="'+ this.id +'_r'+ i +'" class="mdl-select-option" data-type="radio" data-value="'+ options[i].value +'" role="option"><span>'+ options[i].text +'</span></label></li>';
        }

        html += '       </ul>';
        html += '   </div>';
        html += '</div>';
        html += '<div class="mdl-layer-dim"></div>';
        html += '</section>';

        document.querySelector('body').insertAdjacentHTML('beforeend', html);
        
        html = null;
        this.modal = document.querySelector('.mdl-layer[data-id="'+ this.id +'_select"]');
        this.modal_wrap = this.modal.querySelector('.mdl-layer-wrap');
        this.btn_close = this.modal.querySelector('.mdl-layer-close');
        this.select_btn = this.select.querySelector('.mdl-select-btn');

        select.addEventListener('change', (e) => {
            let _this = e.currentTarget;
            this.select_btn.querySelector('span').textContent = _this.querySelector('option:checked').textContent;
            this.select_btn.value = _this.value;
        });
        
        this.select_btn.addEventListener('click', this.show);
        this.init();
    }
    madeToast() {
        let html = '';
        html = '<div class="mdl-layer '+ this.classname +'" data-id="'+ this.id +'" data-type="toast" aria-live="'+ this.status +'">';
        html += '   <div class="mdl-layer-wrap">';
        html += '       <div class="mdl-layer-body">' + this.content + '</div>';
        !this.auto ? 
        html += '       <button type="button" class="mdl-layer-close" data-material="close" aria-label="닫기"></button>' : '';
        html += '   </div>';
        html += '</div>';

        this.el_body.insertAdjacentHTML('beforeend', html);
        this.modal = document.querySelector('.mdl-layer[data-id="'+ this.id +'"]');
        this.modal_wrap = this.modal.querySelector('.mdl-layer-wrap');

        this.init();
    }
    madeSystem() {
        //alert & confirm
        let html = '';
        html += '<section class="mdl-layer" data-id="'+ this.id +'" data-type="alert">';
        html += '<div class="mdl-layer-wrap">';
        html += '    <div class="mdl-layer-body">';
        if (!!this.title) {
        html += '        <h1 class="mdl-layer-tit">'+ this.title +'</h1>';
        }
        html += '        <div>'+ this.content +'</div>';
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
    actSelected = (e) => {
        let _this = e.currentTarget;
       
        if (_this.type === 'radio') {
            _this = this.modal.querySelector('.mdl-select-option[for="'+ _this.id +'"]');
        }
        this.select.querySelector('.mdl-select-btn span').textContent = _this.textContent;
        this.select.querySelector('.mdl-select-btn').value = _this.dataset.value;
        this.select.querySelector('select option[value="'+ _this.dataset.value +'"]').selected = true;
       
        e.type !== 'keyup' && this.hide();

        this.callback && this.callback({
            text:  _this.textContent,
            value: _this.dataset.value
        });
    }
    show = (e) =>  {
        if (this.type === 'toast') {
            if (this.modal.dataset.state === 'show') {
                console.log('열려있음');
                return false;
            }
            console.log('toast show: ' , this.modal);
        }

        const _zindex = 100;
        const _prev = document.querySelector('[data-layer-current="true"]');
        let btn = (this.type === 'select') ? document.querySelector('.mdl-select-btn[data-select-id="'+ this.id +'_select"]'): document.querySelector('[data-dropdown="'+ this.id +'"]');

        //dropdown & select
        if (this.type === 'dropdown' || this.type === 'select') {
            const ps_info = {
                m_width: this.modal.offsetWidth,
                m_height: this.modal.offsetHeight,
                height: btn.offsetHeight,
                width: btn.offsetWidth,
                top: btn.getBoundingClientRect().top,
                left: btn.getBoundingClientRect().left,
                sc_top: this.pageScroll.scrollTop,
                sc_left: this.pageScroll.scrollLeft,
            }
            let _top, _left;

            !this.ps ? this.ps = 'BL' : '';

            switch(this.ps){
                case 'TL': 
                    _top = ((ps_info.top + ps_info.sc_top) + ps_info.height) + 'px';
                    _left = ((ps_info.left - ps_info.sc_left)) + 'px';
                    break;
                case 'TC': 
                break;
                case 'TR': 
                break;
                case 'BL': 
                    _top = ((ps_info.top + ps_info.sc_top) + ps_info.height) + 'px';
                    _left = ((ps_info.left - ps_info.sc_left)) + 'px';
                    break;
                case 'BC': 
                    _top = ((ps_info.top + ps_info.sc_top) + ps_info.height) + 'px';
                    _left = ((ps_info.left - ps_info.sc_left) + (ps_info.width / 2) - (ps_info.m_width / 2)) + 'px';
                    break;
                case 'BR': 
                    _top = ((ps_info.top + ps_info.sc_top) + ps_info.height) + 'px';
                    _left = ((ps_info.left - ps_info.sc_left) - (ps_info.m_width - ps_info.width)) + 'px';
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
        } 
        
        else {
            //overflow:hidden
            this.html.dataset.modal = 'show';
        }

        _prev ? _prev.dataset.layerCurrent = 'false' : '';
        this.modal.dataset.layerCurrent = 'true';
        this.modal || this.src && this.make();
        this.modal.dataset.state = 'show';
        console.log(this.html.dataset.layerN);
        this.focus = document.activeElement;

        if (this.type !== 'toast') {
            this.html.dataset.layerN = !this.html.dataset.layerN ? 1 : Number(this.html.dataset.layerN) + 1;
            this.modal.style.zIndex = Number(_zindex) + Number(this.html.dataset.layerN);
            this.modal.dataset.layerN = this.html.dataset.layerN;
        }
        this.btn_close && this.btn_close.focus();

        // select layer
        if (this.type === 'select') {
            const el_options = this.modal.querySelectorAll('.mdl-select-option');
            const el_inputs = this.modal.querySelectorAll('input');

            console.log(el_inputs);

            const el_options_checked = this.modal.querySelector('input:checked');

            this.select_btn.setAttribute('aria-expanded', true);
            this.select_btn.removeEventListener('click', this.show);

            console.log(el_options_checked);

            el_options_checked && el_options_checked.focus();

            for (let i = 0, len = el_options.length; i < len; i++) {
                el_options[i].addEventListener('click', this.actSelected);
                el_inputs[i].addEventListener('keydown', this.keyCheck);
                el_inputs[i].addEventListener('keyup', this.keyCheck);
                el_options[i].addEventListener('focusout', this.keyCheck);
                el_inputs[i].addEventListener('focusin', this.foucsOutCheck);
            }

            setTimeout(() => {
                this.html.addEventListener('click', this.backClick);
            },0);
        }
        else if (this.type === 'toast' && this.auto) {
            this.timer = setTimeout(()=> {
                this.hide();
            }, this.delaytime);
        }
       
    }
    backClick = (e) => {
        //mouse click, touch 인 경우만 실행. ''값은 방향키로 이동 시
        if (e.pointerType !== '') {
            e.srcElement.querySelector('.mdl-layer[role="listbox]') ?? this.hide();
        }
        
    }
    foucsOutCheck = () => {
        clearTimeout(this.timer);
    }
    keyCheck = (e) => {
        switch (e.keyCode) {
            case 13 : e.type === 'keydown' && this.actSelected(e);
                break;
            case 38 :
            case 40 : e.type === 'keyup' && this.actSelected(e);
                    break;
            default : e.type === 'keydown' ? this.timer = setTimeout(this.hide, 300) : '';
                break;
        }
    }
    hidden = () => {
        const _prev = document.querySelector('[data-layer-current="true"]');
        if (this.type !== 'toast') {
            _prev.dataset.layerCurrent = 'false';
        }
        // this.modal.dataset.layerCurrent = 'true';

        this.modal_wrap.removeEventListener('animationend', this.hidden);
        this.modal.dataset.state = 'hidden';
        this.html.dataset.modal = 'hidden';

        this.select_btn && this.select_btn.setAttribute('aria-expanded', false);
        this.focus.focus();
       
        if (this.type !== 'toast') {
            if (Number(this.html.dataset.layerN) !== 0) {
                document.querySelector('.mdl-layer[data-layer-n="'+ this.html.dataset.layerN +'"]').dataset.layerCurrent = 'true';
            }
        }
        
        if (this.src) {
            // this.modal.remove();
        }
    }
    hide = () => {
        console.log('hide');
        clearTimeout(this.timer);
        if (this.type !== 'toast') {
            this.html.dataset.layerN = Number(this.html.dataset.layerN) - 1;
        }
        
        this.select_btn && this.select_btn.addEventListener('click', this.show);
        this.html.removeEventListener('click', this.backClick);
        this.modal.dataset.state = 'hide';
        this.modal_wrap.addEventListener('animationend', this.hidden);
    }
}