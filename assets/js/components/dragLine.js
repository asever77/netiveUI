export default class DragLine {
    constructor(opt) {
        this.id = opt.id;
        this.doc = document.documentElement;
        this.wrap = document.querySelector('.mdl-drag[data-drag-id="' + this.id + '"]');
        this.dots = this.wrap.querySelectorAll('.mdl-drag-dot');
        this.heads = this.wrap.querySelectorAll('.mdl-drag-dot[data-drag-type="head"]');
        this.wrap_t = this.wrap.getBoundingClientRect().top;
        this.wrap_l = this.wrap.getBoundingClientRect().left;
        this.wrap_w = this.wrap.offsetWidth;
        this.wrap_h = this.wrap.offsetHeight;
        this.n = this.heads.length;
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
            
            for (let item of this.dots) {
                const _dot_info = item.getBoundingClientRect();
                const _dot_w = item.offsetWidth / 2;
                const _dot_h = item.offsetHeight / 2;

                item.dataset.x = (_dot_info.left + _dot_w - this.wrap_l);
                item.dataset.y = (_dot_info.top + _dot_h - this.wrap_t);
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

            // document.querySelector('[data-pagescroll]').style.overflow = 'hidden';

            const win_y = window.scrollY;
            const win_x = window.scrollX;
            
            const el_line = this.svg.querySelector('line[data-state="ing"]');
            const el_dot = e.currentTarget;
            const dot_info = el_dot.getBoundingClientRect();
            const dot_name = el_dot.dataset.dragName;
            const dot_w = el_dot.offsetWidth / 2;
            const dot_h = el_dot.offsetHeight / 2;
            const el_type = el_dot.dataset.dragType;
            const s_x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            const s_y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

            let _x;
            let _y;

            el_line.setAttribute('x1', dot_info.left + dot_w - this.wrap_l);
            el_line.setAttribute('y1', dot_info.top + dot_h - this.wrap_t);
            el_line.setAttribute('x2', dot_info.left + dot_w - this.wrap_l);
            el_line.setAttribute('y2', dot_info.top + dot_h - this.wrap_t);

            for (let item of this.dots) {
                item.dataset.state = 'none';
            }

            const actEnd = (e) => {
                const v_x = _x  - this.wrap_l;
                const v_y = _y  - this.wrap_t;
                el_line.dataset.state = 'complete';
                let is_complete = false;
                let is_answer = false;

                // document.querySelector('[data-pagescroll]').style.overflow = 'auto';

                for (let item of this.dots) {
                    item.dataset.state = '';
                    const _type = item.dataset.dragType;
                    const dot2_info = item.getBoundingClientRect();
                    const i_x = Number(item.dataset.x);
                    const i_y = Number(item.dataset.y);
                    const if_x = (v_x <= i_x + dot_w && v_x + (dot_w * 2) >= i_x + dot_w);
                    const if_y = (v_y >= i_y - dot_h && v_y <= i_y - dot_h + (dot_h * 2));

                    if (if_x && if_y && el_type !== _type) {
                        // if (item.dataset.dragName === dot_name) {
                            
                            el_dot.dataset.complete = true;
                            item.dataset.complete = true;
                            this.complete_n = this.complete_n + 1;

                            el_line.setAttribute('x2', dot2_info.left + dot_w - this.wrap_l);
                            el_line.setAttribute('y2', dot2_info.top + dot_h - this.wrap_t);

                            if (item.dataset.dragName === dot_name) {
                                el_line.dataset.answer = true;
                                is_answer = true;
                                this.answer_n = this.answer_n + 1;
                            } else {
                                el_line.dataset.answer = false;
                                is_answer = false;
                            }

                            is_complete = true;
                            break;
                        // } else if (!is_complete) {
                        //     el_line.remove();
                        // }
                    }
                }

                if (!is_complete) {
                    el_line.remove();
                }

                for (let item of this.dots) {
                    item.dataset.state = '';
                }

                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
                this.callback({
                    sum: this.answer_len,
                    value: this.answer_n,
                    name: dot_name,
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

        for (let item of this.dots) {
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
        for (let item of this.dots) {
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
            const _head = this.dots[i];
            const _name = _head.dataset.dragName;
            const _body = this.wrap.querySelector('.mdl-drag-dot[data-drag-type="body"][data-drag-name="'+ _name +'"]');

            this.svg.insertAdjacentHTML('beforeend', '<line x1="'+ _head.dataset.x +'" x2="'+ _body.dataset.x +'" y1="'+ _head.dataset.y +'" y2="'+ _body.dataset.y +'" data-state="complete"></line>');
        }
        this.answer_n = this.answer_len;
        this.wrap.dataset.state="complete";
        this.completeCallback();
    }
}