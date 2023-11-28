export default class Alert {
    constructor(opt) {
        this.id = opt.id;
        this.title = opt.title;
        this.content = opt.content;
        this.btn = opt.button;

        this.html = document.querySelector('html');
        this.modal;
        this.btn_close;
        this.modal_wrap;
        this.last;
        this.focus;

        this.made()
    }
    made() {

    }



}