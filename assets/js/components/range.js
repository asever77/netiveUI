export default class Range {
    /**
     * 
     * @param {el_} element 
     * @param {ar_} array 
     * @param {st_} string 
     * @param {nu_} number 
     */
    constructor(opt) {
        this.st_id = opt.id;
        this.st_title = opt.title;

        this.ar_value = opt.value;
        this.ar_text = opt.text;
        this.ar_tickmark = opt.tickmark;

        this.nu_step = opt.step;
        this.nu_min = opt.min;
        this.nu_max = opt.max;

        this.el_range = document.querySelector('.mdl-range[data-id="'+ this.st_id +'"]');
        this.el_from = this.el_range.querySelector('.mdl-range-inp[data-range="from"]');
        this.el_to = this.el_range.querySelector('.mdl-range-inp[data-range="to"]');

        this.el_pointer_from;
        this.el_pointer_to;
        this.el_bar;

        this.el_track = this.el_range.querySelector('.mdl-range-track');
        this.isMarks = this.el_range.querySelectorAll('.mdl-range-marks');
        
        this.isSingle = this.el_to ? false : true;
        this.init();
    }
    init() {
        this.el_from.min = this.nu_min;
        this.el_from.max = this.nu_max;
        this.el_from.value = this.ar_value[0];

        let html_track = '<div class="mdl-range-track">';
        let html_tickmarks_from = '';
        let html_tickmarks_to = '';
        
        let vleft = ((this.ar_value[0] / this.nu_max) * 100);
        
        if (this.isSingle === false) {
            this.el_to.min = this.nu_min;
            this.el_to.max = this.nu_max;
            this.el_to.value = this.ar_value[1];

            html_tickmarks_from += '<div class="mdl-range-marks" id="'+ this.st_id +'_tickmarks_from" data-from="true">';
            html_tickmarks_to += '<div class="mdl-range-marks" id="'+ this.st_id +'_tickmarks_to" data-to="true">';

            for (let i = 0, len = this.ar_tickmark.length; i < len; i++) {
                html_tickmarks_from += '<button class="mdl-range-btn" data-id="'+ this.st_id +'" type="button" data-value="'+ i +'"><span>'+ this.ar_tickmark[i] +'</span></button>';
                html_tickmarks_to += '<button class="mdl-range-btn" data-id="'+ this.st_id +'" type="button" data-value="'+ i +'"><span>'+ this.ar_tickmark[i] +'</span></button>';
            }
            html_tickmarks_from += '</div>';             
            html_tickmarks_to += '</div>';

            this.el_range.insertAdjacentHTML('beforeend', html_tickmarks_from);
            this.el_range.insertAdjacentHTML('beforeend', html_tickmarks_to);

            const vright = 100 - ((this.ar_value[1] / this.nu_max) * 100);

            html_track += '<div class="mdl-range-bar" style="left:'+ vleft +'%; right: '+ vright +'%;"></div>';
            html_track += '<span class="left mdl-range-point on" data-range="from" aria-hidden="true" style="left: '+ vleft +'%;"><em class="mdl-range-txt" data-from="'+ this.st_id +'">'+ this.ar_text[this.ar_value[0]] +'</em></span>';
            html_track += '<span class="right mdl-range-point" data-range="to" aria-hidden="true" style="right: '+ vright +'%;"><em class="mdl-range-txt" data-to="'+ this.st_id +'">'+ this.ar_text[this.ar_value[1]] +'</em></span>'; 
        } else {
            html_tickmarks_from += '<div class="mdl-range-marks" id="'+ this.st_id +'_tickmarks_from" data-from="true">';

            for (let i = 0, len = this.ar_tickmark.length; i < len; i++) {
                html_tickmarks_from += '<button class="mdl-range-btn" data-id="'+ this.st_id +'" type="button" data-value="'+ i +'"><span>'+ this.ar_tickmark[i] +'</span></button>';
            }
                        
            html_tickmarks_from += '</div>';

            this.el_range.insertAdjacentHTML('beforeend', html_tickmarks_from);

            html_track += '<div class="mdl-range-bar" style="width:'+ vleft +'%;"></div>';
            html_track += '<span class="left mdl-range-point on" data-range="from" aria-hidden="true" style="left: '+ vleft +'%;"><em class="mdl-range-txt" data-from="'+ this.st_id +'">'+ this.ar_text[this.ar_value[0]] +'</em></span>';
        }

        html_track += '</div>';
        this.el_range.insertAdjacentHTML('beforeend', html_track);

        this.el_pointer_from = this.el_range.querySelector('.mdl-range-point[data-range="from"]');
        this.el_pointer_to = this.el_range.querySelector('.mdl-range-point[data-range="to"]');
        this.el_bar = this.el_range.querySelector('.mdl-range-bar');
        
        this.el_from.addEventListener('input', this.act);
        this.el_to && this.el_to.addEventListener('input', this.act);
    }
    act = (e) => {       
        const _this = e.target;
        const _rangeState = _this.dataset.range;
        
        let vleft;
        let vright;

        if (this.el_to) {
            if (_rangeState === 'from') {
                if (Number(this.el_from.value) > Number(this.el_to.value)) {
                    this.el_from.value = this.el_to.value;
                }
                vleft = (this.el_from.value / this.nu_max) * 100;
                this.el_pointer_from.style.left = vleft + '%';
                this.el_pointer_from.querySelector('.mdl-range-txt').textContent = this.ar_text[this.el_from.value];
            } else {
                if (Number(this.el_from.value) > Number(this.el_to.value)) {
                    this.el_to.value = this.el_from.value;
                }
                vright = 100 - ((this.el_to.value / this.nu_max) * 100);
                this.el_pointer_to.style.right = vright + '%';
                this.el_pointer_to.querySelector('.mdl-range-txt').textContent = this.ar_text[this.el_to.value];
            }
            this.el_bar.style.left = vleft + '%';
            this.el_bar.style.right = vright + '%';
        } else {
            vleft = (this.el_from.value / this.nu_max) * 100;
            this.el_pointer_from.style.left = vleft + '%';
            this.el_pointer_from.querySelector('.mdl-range-txt').textContent = this.ar_text[this.el_from.value];
            this.el_bar.style.width = vleft + '%';
        }
       
        
        
    
    }
}
