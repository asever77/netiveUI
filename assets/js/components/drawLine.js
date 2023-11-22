export default class DrawLine {
    constructor(opt) {
        this.id = opt.id;
        this.wrap = document.querySelector('.ui-draw[data-id="' + this.id + '"]');
        this.dots = this.wrap.querySelectorAll('.ui-draw-dot');
        this.wrap_t = this.wrap.getBoundingClientRect().top;
        this.wrap_l = this.wrap.getBoundingClientRect().left;
        this.wrap_w = this.wrap.offsetWidth;
        this.wrap_h = this.wrap.offsetHeight;
        this.answer = opt.answer;
        this.callback = opt.callback;
        this.answer_n = 0;
        this.init();
    }

    init() {
        this.wrap.insertAdjacentHTML('beforeend', '<svg></svg>');

        for (let item of this.dots) {
            const _dot_info = item.getBoundingClientRect();
            const _dot_name = item.dataset.name;
            const _dot_w = item.offsetWidth / 2;
            const _dot_h = item.offsetHeight / 2;

            item.dataset.x = (_dot_info.left + _dot_w - this.wrap_l);
            item.dataset.y = (_dot_info.top + _dot_h - this.wrap_t);
        }

        const actStart = (e) => {
            this.wrap.querySelector('svg').insertAdjacentHTML('beforeend', '<line x1="0" x2="0" y1="0" y2="0" data-state="ing"></line>');
            this.wrap_t = this.wrap.getBoundingClientRect().top;
            this.wrap_l = this.wrap.getBoundingClientRect().left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;

            const win_y = window.scrollY;
            const win_x = window.scrollX;
            const el_svg = this.wrap.querySelector('svg');
            const el_line = el_svg.querySelector('line[data-state="ing"]');
            const el_dot = e.currentTarget;
            const dot_info = el_dot.getBoundingClientRect();
            const dot_name = el_dot.dataset.name;
            const dot_w = el_dot.offsetWidth / 2;
            const dot_h = el_dot.offsetHeight / 2;
            const s_x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            const s_y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

            let dot_data = [];
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
                const v_x = _x - dot_w - this.wrap_l;
                const v_y = _y + dot_h - this.wrap_t;
                el_line.dataset.state = 'complete';
                let is_answer = false;

                for (let item of this.dots) {
                    item.dataset.state = '';

                    const i_x = Number(item.dataset.x);
                    const i_y = Number(item.dataset.y);

                    if ((v_x <= i_x + dot_w && v_x + (dot_w * 2) >= i_x + dot_w) && (v_y >= i_y - dot_h && v_y <= i_y - dot_h + (dot_h * 2))) {
                        if (item.dataset.name === dot_name) {
                            is_answer = true;
                            el_dot.dataset.complete = true;
                            item.dataset.complete = true;
                            this.answer_n = this.answer_n + 1;
                            break;
                        } else if (!is_answer) {
                            el_line.remove();
                        }
                    }
                }

                if (!is_answer) {
                    el_line.remove();
                }

                for (let item of this.dots) {
                    item.dataset.state = '';
                }

                this.wrap.removeEventListener('mousemove', actMove);
                this.wrap.removeEventListener('mouseup', actEnd);
                this.wrap.removeEventListener('touchmove', actMove);
                this.wrap.removeEventListener('touchend', actEnd);
                this.callback({
                    sum: this.answer,
                    value: this.answer_n,
                    name: dot_name,
                    state: is_answer
                });
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

                el_line.setAttribute('x2', _x - dot_w - this.wrap_l);
                el_line.setAttribute('y2', _y + dot_h - this.wrap_t);

                console.log(_x)
            }

            //event
            this.wrap.addEventListener('mousemove', actMove);
            this.wrap.addEventListener('mouseup', actEnd);
            this.wrap.addEventListener('touchmove', actMove);
            this.wrap.addEventListener('touchend', actEnd);
        }

        for (let item of this.dots) {
            item.addEventListener('mousedown', actStart);
            item.addEventListener('touchstart', actStart);
        }
    }
}