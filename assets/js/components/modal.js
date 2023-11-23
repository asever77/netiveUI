export default class Modal {
    constructor(opt) {
        this.id = opt.id;
        this.src = opt.src;
        this.html = document.querySelector('html');
        this.modal;
        this.btn_close;
        this.modal_wrap;

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
                const js_usage_modal = document.querySelector('script[data-usage="'+ this.id +'"]');
                let _script = document.createElement('script');
                _script.dataset.usage = this.id;
                _script.type = 'module';
                _script.src = this.src + '.js?v=' + Date.now();

                js_usage_modal && js_usage_modal.remove();
                document.body.appendChild(_script);

                this.modal = document.querySelector('.mdl-modal[data-id="'+ this.id +'"]');
                this.btn_close = this.modal.querySelector('.mdl-modal-close');
                this.modal_wrap = this.modal.querySelector('.mdl-modal-wrap');
                
                this.init();
            }
        });
    }
    init() {
        console.log(this.id);

        this.btn_close.removeEventListener('click', this.hide);
        this.btn_close.addEventListener('click', this.hide);
    }
    show = () =>  {
        this.modal || this.src && this.make()
        console.log('show', this.id);
        this.modal.dataset.state = 'show';
        this.html.dataset.modal = 'show';
    }
    hidden = () => {
        console.log('hidden', this.id);
        this.modal_wrap.removeEventListener('animationend', this.hidden);
        this.modal.dataset.state = 'hidden';
        this.html.dataset.modal = 'hidden';

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