
export default class Select {
    constructor(opt) {
        this.id = opt.id;
        this.callback = opt.callback;
        this.select_wrap = document.querySelector('.mdl-select[data-id="'+ this.id +'"]');
        this.select = this.select_wrap.querySelector('select');
        this.options = this.select.querySelectorAll('option');
        this.init();
    }
    init() {
       


        let html_option = '<div class="mdl-select-wrap"><ul>';
        for (let i = 0, len = this.options.length; i < len; i++) {
            html_option += '<li><button type="button" value="'+ this.options[i].value +'">'+ this.options[i].text +'</button></li>'
        }
        html_option += '</ul></div>';
    
        this.select_wrap.insertAdjacentHTML('beforeend', html_option);
        console.log(html_option)
    }
}
