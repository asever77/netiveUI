export default class Modal {
    constructor(opt) {
        this.id = opt.id;
        this.src = opt.src;
        this.html = document.querySelector('html');
        this.modal;
        this.btn_close;
        this.modal_wrap;
        this.last;
        this.focus;

        if (this.src) {
            this.made();
        } else {
            this.modal = document.querySelector('.mdl-modal[data-id="'+ this.id +'"]');
            this.btn_close = this.modal.querySelector('.mdl-modal-close');
            this.modal_wrap = this.modal.querySelector('.mdl-modal-wrap');
            this.init()
        }
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
                _btn.classList.add('mdl-modal-last');

                css_usage_modal && css_usage_modal.remove();
                js_usage_modal && js_usage_modal.remove();
                document.body.appendChild(_script);
                document.head.appendChild(_link);

                this.modal = document.querySelector('.mdl-modal[data-id="'+ this.id +'"]');
                this.btn_close = this.modal.querySelector('.mdl-modal-close');
                this.modal_wrap = this.modal.querySelector('.mdl-modal-wrap');

                this.modal_wrap.appendChild(_btn);
                this.last = this.modal.querySelector('.mdl-modal-last');
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

        this.btn_close.removeEventListener('click', this.hide);
        this.btn_close.addEventListener('click', this.hide);
        this.last.removeEventListener('click', this.hide);
        this.last.addEventListener('click', this.hide);
        this.btn_close.addEventListener('keydown', keyStart);
        this.last.addEventListener('keydown', keyEnd);
    }
    show = () =>  {
        const _zindex = 100;
        const _prev = document.querySelector('[data-modal-current="true"]');

        _prev ? _prev.dataset.modalCurrent = 'false' : '';
        this.modal.dataset.modalCurrent = 'true';

        this.modal || this.src && this.make();

        this.modal.dataset.state = 'show';
        this.html.dataset.modal = 'show';

        this.focus = document.activeElement;

        this.html.dataset.modalN = !this.html.dataset.modalN ? 1 : Number(this.html.dataset.modalN) + 1;
        this.modal.style.zIndex = Number(_zindex) + Number(this.html.dataset.modalN);
        this.modal.dataset.modalN = this.html.dataset.modalN;
        this.btn_close.focus();
       
    }
    hidden = () => {
        console.log('hidden', this.id);
        const _prev = document.querySelector('[data-modal-current="true"]');

        _prev.dataset.modalCurrent = 'false';
        // this.modal.dataset.modalCurrent = 'true';

        this.modal_wrap.removeEventListener('animationend', this.hidden);
        this.modal.dataset.state = 'hidden';
        this.html.dataset.modal = 'hidden';

        this.focus.focus();
        this.html.dataset.modalN = Number(this.html.dataset.modalN) - 1;
        if (Number(this.html.dataset.modalN) !== 0) {
            let a = document.querySelector('.mdl-modal[data-modal-n="'+ this.html.dataset.modalN +'"]');
            console.log(a);
            a.dataset.modalCurrent = 'true';
        }
        
        if (this.src) {
            // this.modal.remove();
        }
    }
    hide = () => {
        console.log('hide', this.id);

        this.modal.dataset.state = 'hide';
        this.modal_wrap.addEventListener('animationend', this.hidden);
    }
}