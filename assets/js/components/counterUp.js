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
        const html_comma = '<span>,</span>';
        let html_item = '';
        
        for (let i = 0; i < len; i++) {
            const _n = (Number(n.substr(i, 1)));

            if (isNaN(_n)) {
                html_item += '<span class="mdl-count-item"><span class="mdl-count-num">';
                html_item += html_comma;
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

export {CounterUpSlot}; 
