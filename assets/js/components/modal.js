export default class Modal {
    constructor(opt) {
        this.id = opt.id;
        this.modal = document.querySelector('.mdl-modal[data-id="'+ this.id +'"]');
        this.btn_close = this.modal.querySelector('.mdl-modal-close');
        this.modal_wrap = this.modal.querySelector('.mdl-modal-wrap');
        this.html = document.querySelector('html');
        
        this.init();
    }
    init() {
        console.log(this.id);

        this.btn_close.removeEventListener('click', this.hide);
        this.btn_close.addEventListener('click', this.hide);
    }
    show() {
        console.log('show', this.id);
        this.modal.dataset.state = 'show';
        this.html.dataset.modal = 'show';
    }
    hidden = () => {
        console.log('hidden', this.id);
        this.modal_wrap.removeEventListener('animationend', this.hidden);
        this.modal.dataset.state = 'hidden';
        this.html.dataset.modal = 'hidden';
    }
    hide = () => {
        console.log('hide', this.id);

        this.modal.dataset.state = 'hide';
        this.modal_wrap.addEventListener('animationend', this.hidden);
    }
}