export default class DragLine {
    constructor(opt) {
        this.id = opt.id;
        this.doc = document.documentElement;
        this.wrap = document.querySelector('[data-drag-id="' + this.id + '"]');
        this.items = this.wrap.querySelectorAll('[data-drag-object], [data-drag-target]');
        this.objects = this.wrap.querySelectorAll('[data-drag-object]');

        this.wrap_t = this.wrap.getBoundingClientRect().top;
        this.wrap_l = this.wrap.getBoundingClientRect().left;
        this.wrap_w = this.wrap.offsetWidth;
        this.wrap_h = this.wrap.offsetHeight;

        this.n = this.objects.length;
        this.svg = null;
        this.answer_len = opt.answer;
        this.callback = opt.callback;
        this.callbackComplete = opt.callbackComplete;
        this.callbackCheck = opt.callbackCheck;
        this.answer_n = 0;
        this.complete_n = 0;

        // this.init();
    }

    init() {
        this.wrap.insertAdjacentHTML('beforeend', '<svg></svg>');
        this.svg = this.wrap.querySelector('svg');

        const set = () => {
            this.reset();
            this.wrap_t = this.wrap.getBoundingClientRect().top;
            this.wrap_l = this.wrap.getBoundingClientRect().left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;
            
            for (let item of this.items) {
                const rect_item = item.getBoundingClientRect();
                const item_w = item.offsetWidth / 2;
                const item_h = item.offsetHeight / 2;

                item.dataset.x = (rect_item.left + item_w - this.wrap_l);
                item.dataset.y = (rect_item.top + item_h - this.wrap_t);
            }
        }
        set();    
        // window.addEventListener('resize', set);
        UI.parts.resizObserver({
            el: this.wrap,
            callback: (v) => {
                console.log(v);
                v.resize[0] && set();
            }
        });

        const actStart = (e) => {
            this.wrap.querySelector('svg').insertAdjacentHTML('beforeend', '<line x1="0" x2="0" y1="0" y2="0" data-state="ing"></line>');
            this.wrap_t = this.wrap.getBoundingClientRect().top;
            this.wrap_l = this.wrap.getBoundingClientRect().left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;

            const win_y = window.scrollY;
            const win_x = window.scrollX;
            
            const el_line = this.svg.querySelector('line[data-state="ing"]');
            const el_item = e.currentTarget;
            const rect_item = el_item.getBoundingClientRect();
             
            const is_object = el_item.dataset.dragObject ? true : false;
            const value = is_object ? el_item.dataset.dragObject : el_item.dataset.dragTarget;
            
            const item_w = el_item.offsetWidth / 2;
            const item_h = el_item.offsetHeight / 2;
            const s_x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            const s_y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

            let _x;
            let _y;
            const x_value = rect_item.left + item_w - this.wrap_l;
            const y_value = rect_item.top + item_h - this.wrap_t;

            el_line.setAttribute('x1', x_value);
            el_line.setAttribute('y1', y_value);
            el_line.setAttribute('x2', x_value);
            el_line.setAttribute('y2', y_value);

            for (let item of this.items) {
                item.dataset.state = 'none';
            }

            const actEnd = (e) => {
                const v_x = _x  - this.wrap_l;
                const v_y = _y  - this.wrap_t;
                let is_complete = false;
                let is_answer = false;

                el_line.dataset.state = 'complete';

                for (let item of this.items) {
                    item.dataset.state = '';

                    const _is_object = item.dataset.dragObject ? true : false;
                    item.dataset.dragName
                    const _value = _is_object ? item.dataset.dragObject : item.dataset.dragTarget;
                    const _rect_item = item.getBoundingClientRect();
                    const i_x = Number(item.dataset.x);
                    const i_y = Number(item.dataset.y);
                    const if_x = (v_x <= i_x + item_w && v_x + (item_w * 2) >= i_x + item_w);
                    const if_y = (v_y >= i_y - item_h && v_y <= i_y - item_h + (item_h * 2));

                    if (if_x && if_y && is_object !== _is_object) {
                            
                        el_item.dataset.complete = true;
                        item.dataset.complete = true;
                        this.complete_n = this.complete_n + 1;

                        el_line.setAttribute('x2', _rect_item.left + item_w - this.wrap_l);
                        el_line.setAttribute('y2', _rect_item.top + item_h - this.wrap_t);

                        if (_value === value) {
                            el_line.dataset.answer = true;
                            is_answer = true;
                            this.answer_n = this.answer_n + 1;
                        } else {
                            el_line.dataset.answer = false;
                            is_answer = false;
                        }

                        is_complete = true;
                        break;
                    }
                }

                if (!is_complete) {
                    el_line.remove();
                }

                for (let item of this.items) {
                    item.dataset.state = '';
                }

                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
                this.callback({
                    sum: this.answer_len,
                    value: this.answer_n,
                    name: value,
                    state: is_answer
                });
                this.complete_n === this.n && this.completeCallback();
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

                el_line.setAttribute('x2', _x - this.wrap_l);
                el_line.setAttribute('y2', _y - this.wrap_t);
            }

            //event
            this.doc.addEventListener('mousemove', actMove);
            this.doc.addEventListener('mouseup', actEnd);
            this.doc.addEventListener('touchmove', actMove);
            this.doc.addEventListener('touchend', actEnd);
        }

        for (let item of this.items) {
            item.addEventListener('mousedown', actStart);
            item.addEventListener('touchstart', actStart, {
                passive: true
            });
        }
    }
    
    completeCallback() {
        this.callbackComplete && this.callbackComplete({
            sum: this.answer_len,
            value: this.answer_n,
            state: this.answer_len === this.answer_n ? true : false
        });
    }

    reset() {
        for (let item of this.items) {
            item.removeAttribute('data-state');
            item.removeAttribute('data-complete');
        }

        if (!!this.svg.lastChild) {
            while (this.svg.lastChild) {
                this.svg.removeChild(this.svg.lastChild);
            }
        }
        this.wrap.dataset.state="";
        this.complete_n = 0;
        this.answer_n = 0;
    }
    check() {
        this.wrap.dataset.state="check";
        this.callbackCheck && this.callbackCheck({
            sum: this.answer_len,
            value: this.answer_n,
            state: this.answer_len === this.answer_n ? true : false
        });
    }
    complete() {
        this.reset();
        for (let i = 0; i < this.n; i++) {
            const el_object = this.items[i];

            const value = el_object.dataset.dragObject;
            const el_target = this.wrap.querySelector('[data-drag-target="'+ value +'"]');

            this.svg.insertAdjacentHTML('beforeend', '<line x1="'+ el_object.dataset.x +'" x2="'+ el_target.dataset.x +'" y1="'+ el_object.dataset.y +'" y2="'+ el_target.dataset.y +'" data-state="complete"></line>');
        }
        this.answer_n = this.answer_len;
        this.wrap.dataset.state="complete";
        this.completeCallback();
    }
}