export default class DragLine {
    constructor(opt) {
        this.id = opt.id;
        this.doc = document.documentElement;
        this.wrap = document.querySelector(`[data-line-id="${this.id}"]`);
        this.items = this.wrap.querySelectorAll(`[data-line-object], [data-line-target]`);
        this.objects = this.wrap.querySelectorAll('[data-line-object]');
        this.type = this.wrap.dataset.lineType ? this.wrap.dataset.lineType : 'single' ;
        const rect = this.wrap.getBoundingClientRect();
        this.wrap_t = rect.top;
        this.wrap_l = rect.left;
        this.wrap_w = this.wrap.offsetWidth;
        this.wrap_h = this.wrap.offsetHeight;

        this.n = this.objects.length;
        this.svg = null;
        this.answer_len = opt.answer;
        this.answer_n = 0;
        this.complete_n = 0;
        this.history = [];

        this.callback = opt.callback;
        this.callbackComplete = opt.callbackComplete;
        this.callbackCheck = opt.callbackCheck;
    }

    init() {
        this.wrap.insertAdjacentHTML('beforeend', `<svg></svg>`);
        this.svg = this.wrap.querySelector('svg');

        const set = () => {
            this.reset();
            const rect = this.wrap.getBoundingClientRect();
            this.wrap_t = rect.top;
            this.wrap_l = rect.left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;

            for (const [index, item] of this.items.entries()) {
                const rect_item = item.getBoundingClientRect();
                const item_w = item.offsetWidth / 2;
                const item_h = item.offsetHeight / 2;

                item.dataset.name = index;
                item.dataset.x = (rect_item.left + item_w - this.wrap_l);
                item.dataset.y = (rect_item.top + item_h - this.wrap_t);
            }
        }
        set();

        UI.parts.resizObserver({
            el: this.wrap,
            callback: (v) => {
                v.resize[0] && set();
            }
        });

        const actStart = (e) => {
            this.wrap.querySelector('svg').insertAdjacentHTML('beforeend', `<line x1="0" x2="0" y1="0" y2="0" data-state="ing"></line>`);
            this.wrap_t = this.wrap.getBoundingClientRect().top;
            this.wrap_l = this.wrap.getBoundingClientRect().left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;

            const el_line = this.svg.querySelector('line[data-state="ing"]');
            const el_item = e.currentTarget;
            const rect_item = el_item.getBoundingClientRect();
            const is_object = el_item.dataset.lineObject ? true : false;
            const data_name = el_item.dataset.name;
            const value = is_object ? el_item.dataset.lineObject : el_item.dataset.lineTarget;
            const item_w = el_item.offsetWidth / 2;
            const item_h = el_item.offsetHeight / 2;
            const x_value = rect_item.left + item_w - this.wrap_l;
            const y_value = rect_item.top + item_h - this.wrap_t;
            let _x;
            let _y;

            el_line.setAttribute('x1', x_value);
            el_line.setAttribute('y1', y_value);
            el_line.setAttribute('x2', x_value);
            el_line.setAttribute('y2', y_value);

            const actEnd = () => {
                const v_x = _x  - this.wrap_l;
                const v_y = _y  - this.wrap_t;
                let is_complete = false;
                let is_answer = false;

                el_line.dataset.state = 'complete';

                for (let item of this.items) {
                    // item.dataset.state = '';
                    const _is_object = item.dataset.lineObject ? true : false;

                    //완료된아이템여부 확인
                    const _is_complete = item.dataset.complete;
                    const _value = _is_object ? item.dataset.lineObject : item.dataset.lineTarget;
                    const _rect_item = item.getBoundingClientRect();
                    const i_x = Number(item.dataset.x);
                    const i_y = Number(item.dataset.y);
                    const if_x = (v_x <= i_x + item_w && v_x + (item_w * 2) >= i_x + item_w);
                    const if_y = (v_y >= i_y - item_h && v_y <= i_y - item_h + (item_h * 2));
                    let is_selected = false;
                    let connect_array;
                    //1:1규칙용
                    //특정영역안에 있고, 같은 분류가 아니며, 완료되지않은 아이템
                    const if_compete = this.type === 'single' ? 
                    (if_x && if_y && is_object !== _is_object && !_is_complete) :
                    (if_x && if_y && is_object !== _is_object);
                    
                    //1:n인 경우 이미 연결된 아이템 제외
                    if (this.type === 'multiple' && item.dataset.connect) {
                        connect_array = item.dataset.connect.split(',');

                        for (let i = 0; i < connect_array.length; i++) {
                            if (data_name === connect_array[i]) {
                                is_selected = true;
                                break;
                            }
                        }
                    }
                    
                    //연결성공
                    if (if_compete && !is_selected) {
                        //연결된 아이템 완료상태
                        el_item.dataset.complete = true;
                        item.dataset.complete = true;
                        //완료갯수
                        this.complete_n = this.complete_n + 1;
                        //아이템 연결된 정보
                        (!item.dataset.connect) ? 
                            item.dataset.connect = el_item.dataset.name :
                            item.dataset.connect = item.dataset.connect + ',' + el_item.dataset.name;
                        //최종 라인종료 위치
                        el_line.setAttribute('x2', _rect_item.left + item_w - this.wrap_l);
                        el_line.setAttribute('y2', _rect_item.top + item_h - this.wrap_t);
                        //정오답적용
                        const v1 = value.split(',');
                        const v2 = _value.split(',');
                        const is_OX = (v) => {
                            if (v) {
                                el_line.dataset.answer = true;
                                is_answer = true;
                                this.answer_n = this.answer_n + 1;
                            } else {
                                el_line.dataset.answer = false;
                                is_answer = false;
                                this.type === 'multiple' ? this.answer_n = this.answer_n - 1 : '';
                            }
                        }
                        (this.type === 'multiple') ?
                            //multiple인 경우 정오답
                            is_OX(v1.filter(x => v2.includes(x)).length > 0):
                            //single인 경우 정오답
                            is_OX(value === _value);

                        is_complete = true;

                        (el_item.dataset.lineObject) ?
                            this.history.push({
                                ['key_' + el_item.dataset.name] : el_item.dataset.lineObject, 
                                ['key_' + item.dataset.name] : item.dataset.lineTarget, 
                            }) :
                            this.history.push({
                                ['key_' + item.dataset.name] : item.dataset.lineObject, 
                                ['key_' + el_item.dataset.name] : el_item.dataset.lineTarget, 
                            });
                        console.log('history',this.history)
                        break;
                    } else {
                        console.log('실패');
                    }
                }

                (!is_complete) && el_line.remove();

                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
                this.callback({
                    /*전체정답갯수*/answer_all_sum: this.answer_len,
                    /*현재정답갯수*/answer_current_sum: this.answer_n,
                    /*선택한정답  */answer_current: value,
                    /*정오답상태  */answer_state: is_answer,
                    /*히스토리    */answer_history: this.history,
                });
                //this.complete_n === this.n && this.completeCallback();
            }
            const actMove = (e) => {
                _x = e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = e.clientY ? e.clientY : e.targetTouches[0].clientY;
                el_line.setAttribute('x2', _x - this.wrap_l);
                el_line.setAttribute('y2', _y - this.wrap_t);
            }

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
            /*전체정답갯수  */answer_all_sum: this.answer_len,
            /*현재정답갯수  */answer_current_sum: this.answer_n,
            /*전체정오답상태*/answer_all_state: this.answer_len === this.answer_n ? true : false,
            /*히스토리     */answer_history: this.history,
        });
    }

    //초기화 실행
    reset() {
        for (let item of this.items) {
            item.removeAttribute('data-state');
            item.removeAttribute('data-complete');
            item.removeAttribute('data-connect');
        }

        if (this.svg.lastChild) {
            while (this.svg.lastChild) {
                this.svg.removeChild(this.svg.lastChild);
            }
        }
        this.wrap.dataset.state="";
        this.complete_n = 0;
        this.answer_n = 0;
    }
    //정오답체크
    check() {
        this.wrap.dataset.state="check";
        this.callbackCheck && this.callbackCheck({
            /*전체정답갯수  */answer_all_sum: this.answer_len,
            /*현재정답갯수  */answer_current_sum: this.answer_n,
            /*전체정오답상태*/answer_all_state: this.answer_len === this.answer_n ? true : false,
            /*히스토리     */answer_history: this.history,
        });
    }
    //정답확인
    complete() {
        this.reset();
        for (let i = 0; i < this.n; i++) {
            const el_object = this.items[i];
            const value = el_object.dataset.lineObject;
            if (value !== 'null') {
                const _v = value.split(',');
                for (let j = 0; j < _v.length; j++) {
                    
                    const el_target = this.wrap.querySelector('[data-line-target="'+ _v[j] +'"]');

                    this.svg.insertAdjacentHTML('beforeend', '<line x1="'+ el_object.dataset.x +'" x2="'+ el_target.dataset.x +'" y1="'+ el_object.dataset.y +'" y2="'+ el_target.dataset.y +'" data-state="complete"></line>');
                }
            }
        }
        this.answer_n = this.answer_len;
        this.wrap.dataset.state="complete";
        this.completeCallback();
    }
}