/**
 * counter up slot effect motion
 * option
 *  @param {string} opt.id 유니크한 아이디
 *  @param {number} opt.value 숫자로 ,를 제외한 순수한 숫자
 *  @param {() => {}} opt.callback 모션 완료 후 실행.
 */

class CounterUpSlot {
    constructor(opt) {
        this.id = opt.id;
        this.callback = opt.callback;
        this.value = opt.value;

        this.el = document.querySelector('.mdl-count[data-id="'+ this.id +'"]');
        this.items;
        this.h = this.el.offsetHeight;
       
        this.init();
    }
    init() {
        const n = UI.parts.comma(this.value);
        const len = n.length;
        
        const html_number = '<span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>';
        const html_comma = '<span style="height:'+ this.h + 'px">';
        let html_item = '';
        
        for (let i = 0; i < len; i++) {
            const _n = (Number(n.substr(i, 1)));

            if (isNaN(_n)) {
                html_item += '<span class="mdl-count-item" style="height:'+ this.h + 'px"><span class="mdl-count-num">';
                html_item += html_comma + n.substr(i, 1) + '</span>';
            } else {
                html_item += '<span class="mdl-count-item" data-n="'+ n.substr(i, 1) +'"><span class="mdl-count-num">';
                html_item += html_number;
            }
            html_item += '</span></span>';
        }

        this.el.setAttribute('aria-label', n);
        this.el.insertAdjacentHTML('beforeend', html_item);
        this.items = this.el.querySelectorAll('.mdl-count-item[data-n]');

        html_item = null;
    }
    act() {
        const len = this.items.length;
        let loop = 0;
        const act = () => {
            const item = this.items[(len - 1) - loop];
            const n = Number(item.dataset.n);
            const _num = item.querySelector('.mdl-count-num');
            let add = n < 7 ? 10 : 0;

            _num.style.transition = 'transform '+ 1.3 +'s cubic-bezier(.21,-0.04,.66,1.21)';

            setTimeout(() => {
                _num.style.transform = 'translateY(-'+ (this.h * (n + add)) +'px)';
            },0);

            setTimeout(() => {
                loop = loop + 1;

                if (loop < len) {
                    act();
                } else {
                    _num.addEventListener('transitionend', () => {
                        this.callback && this.callback();
                    });
                }                 
            }, 200);
        }
        act();
    }
}

class CounterUpSlotLive {
    constructor(opt) {
        this.id = opt.id;
        this.callback = opt.callback;
        this.value = opt.value;
        this.valuePrev;
        this.el = document.querySelector('.mdl-count[data-id="'+ this.id +'"]');
        this.items;
        this.h = this.el.offsetHeight;
        this.html_number = '<span>9</span><span>8</span><span>7</span><span>6</span><span>5</span><span>4</span><span>3</span><span>2</span><span>1</span><span>0</span>';
        this.init();
    }

    init() {
        const n = UI.parts.comma(this.value);
        const len = n.length;
        const html_comma = '<span style="height:'+ this.h + 'px">';
        let html_item = '';
        
        for (let i = 0; i < len; i++) {
            let _n = (Number(n.substr(i, 1))) + 9;
            _n = _n > 9 ? 9 - (_n - 9) : _n;

            if (isNaN(_n)) {
                html_item += '<span class="mdl-count-item" data-n="'+ n.substr(i, 1) +'" style="height:'+ this.h + 'px"><span class="mdl-count-num">';
                html_item += html_comma + n.substr(i, 1) + '</span>';
            } else {
                html_item += '<span class="mdl-count-item" data-n="'+ Number(n.substr(i, 1)) +'"><span class="mdl-count-num" style="transform: translateY(-'+ ((this.h / 10) * _n) +'rem); transition: transform 0.6s cubic-bezier(.21,-0.04,.66,1.21);">';
                html_item += this.html_number;
            }
            html_item += '</span></span>';
        }

        this.el.setAttribute('aria-label', n);
        this.el.insertAdjacentHTML('beforeend', html_item);
        this.items = this.el.querySelectorAll('.mdl-count-item[data-n]');

        html_item = null;
    }
    add(v) {
        this.valuePrev = this.value;
        this.value = this.value * 1000 + v * 1000;
        this.value = this.value / 1000;
        const str_current = String(Math.abs(this.value));
        const str_prev = String(Math.abs(this.valuePrev));
        const newCurrent = Array.from(str_current);
        const newPrev = Array.from(str_prev);
        
        console.log(this.valuePrev, this.value)

        if (newCurrent.length > newPrev.length) {
            let html_item = '';

            for (let i = 0, len = newCurrent.length - newPrev.length; i < len; i++) {
                let _m = Number(newCurrent[i]) + 9;
                _m = _m > 9 ? 9 - (_m - 9) : _m;

                html_item += '<span class="mdl-count-item" data-n="'+ _m +'"><span class="mdl-count-num" style="transform: translateY(-'+ ((this.h / 10) * 9) +'rem); transition: transform 0.6s cubic-bezier(.21,-0.04,.66,1.21);">' + this.html_number + '</span></span>';
            }
            this.el.insertAdjacentHTML('afterbegin', html_item);
        }

        this.items = this.el.querySelectorAll('.mdl-count-item[data-n]');

        if (this.value < 0 && !this.el.dataset.minus) {
            this.el.dataset.minus = 'true';
        } else if (this.value > 0 && this.el.dataset.minus === 'true') {
            this.el.dataset.minus = 'false';
        }

   

        setTimeout(() => {
            for (let i = newCurrent.length - 1, j = newPrev.length - 1, k = this.items.length - 1; i >= 0 || j >= 0 || k >= 0; i--, j--, k--) {
                console.log(i,j,k, this.el.dataset.minus);
                (i < 0 ) && this.items[0].remove();

                console.log(newCurrent[i] );

                if (!isNaN(newCurrent[i])) {
                    let _n = Number(newCurrent[i]) + 9;
                    _n = _n > 9 ? 9 - (_n - 9) : _n;



                    this.items[k] ? this.items[k].querySelector('.mdl-count-num').style.transform = 'translateY(-'+ ((this.h / 10) * _n) +'rem)' : '';
                }
                
            }
        },0);
        
    }
}


export {CounterUpSlot, CounterUpSlotLive}; 
