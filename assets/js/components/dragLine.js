export default class DragLine {
    constructor(opt) {
        this.id = opt.id;
        this.doc = document.documentElement;
        this.wrap = document.querySelector(`[data-line-id="${this.id}"]`);
        this.items = this.wrap.querySelectorAll(
            '[data-line-object], [data-line-target]'
        );
        this.objects = this.wrap.querySelectorAll(`[data-line-object]`);
        
        this.type = this.wrap.dataset.lineType
            ? this.wrap.dataset.lineType
            : 'single';
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
        this.answer_last = opt.lastAnswer;

        this.callback = opt.callback;
        this.callbackComplete = opt.callbackComplete;
        this.callbackCheck = opt.callbackCheck;
        this.isTouch = 'ontouchstart' in document.documentElement;
        this.init();

    }

    init() {
        if (this.wrap.dataset.load === 'ok') {
            return false;
        }
        this.wrap.dataset.load = 'ok';
        this.wrap.insertAdjacentHTML('beforeend', `<svg></svg>`);
        this.svg = this.wrap.querySelector('svg');

        const set = () => {
            this.reset(true);
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
                item.dataset.x = rect_item.left + item_w - this.wrap_l;
                item.dataset.y = rect_item.top + item_h - this.wrap_t;
            }
            
            if (this.answer_last?.length) {
                this.drawLastAnswer();
            } else {
                this.answer_last = [];
            }
        };
        const resizeObserver = new ResizeObserver(() => {
            set();
        });
        resizeObserver.observe(this.wrap);

        let click_info = {
            currentTarget: null,
            x: null,
            y: null,
            name: null,
            isObject: null
        };
        const actStart = e => {
            console.log('actStart----', e.type);
            
            //클릭 이벤트가 없는 경우 line생성
            if (this.wrap.dataset.event !== 'click-start' && this.wrap.dataset.event !== 'click-end') {
                console.log('line생성');

                this.wrap.querySelector('svg').insertAdjacentHTML(
                    'beforeend',
                    `<line x1="0" x2="0" y1="0" y2="0" data-state="ing"></line>`
                );
            } 
            //클릭 이벤트가 있고, 마우스다운 이벤트라면 click 이벤트가 뒤에 일어나기 때문에 중지.

            console.log('actStart----', this.wrap.dataset.event === 'click-start' && (e.type === 'mousedown' || e.type === 'touchstart'));

            if (this.wrap.dataset.event === 'click-start' && (e.type === 'mousedown' || e.type === 'touchstart')) {
                return false;
            }
            
            this.wrap_t = this.wrap.getBoundingClientRect().top;
            this.wrap_l = this.wrap.getBoundingClientRect().left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;

            let el_line = this.svg.querySelector('line[data-state="ing"]');
            const el_item = e.currentTarget;
            const rect_item = el_item.getBoundingClientRect();
            const is_object = el_item.dataset.lineObject ? true : false;
            const data_name = el_item.dataset.name;
            const value = is_object
                ? el_item.dataset.lineObject
                : el_item.dataset.lineTarget;
            const item_w = el_item.offsetWidth / 2;
            const item_h = el_item.offsetHeight / 2;
            const x_value = rect_item.left + item_w - this.wrap_l;
            const y_value = rect_item.top + item_h - this.wrap_t;
            let _x;
            let _y;
            let actMove;
            let actEnd;
    
            actEnd = () => {
                console.log('actEnd----', this.wrap.dataset.event === 'click-start' && (e.type === 'mousedown' || e.type === 'touchstart'));

                //클릭완료이벤트에 마우스다운, 터치스타트인경우 이벤트 취소 및 종료 : 클릭이벤트만 적용하기 위해
                if (this.wrap.dataset.event === 'click-start' && (e.type === 'mousedown' || e.type === 'touchstart')) {
                    this.doc.removeEventListener('mousemove', actMove);
                    this.doc.removeEventListener('touchmove', actMove);
                    this.doc.removeEventListener('mouseup', actEnd);
                    this.doc.removeEventListener('touchend', actEnd);
                    return false;
                }

                //클릭완료이벤트에 클릭이벤트인경우 클릭완료 설정
                if (this.wrap.dataset.event === 'click-start' && e.type === 'click') {
                    click_info.currentTarget.dataset.active = "";
                    this.wrap.dataset.event = "click-end";
                }

                const v_x = _x - this.wrap_l;
                const v_y = _y - this.wrap_t;
                let is_complete = false;
                let is_answer = false;

                el_line.dataset.state = 'complete';

                for (let item of this.items) {
                    // item.dataset.state = '';
                    const _is_object = item.dataset.lineObject ? true : false;

                    //완료된아이템여부 확인
                    const _is_complete = item.dataset.complete;
                    const _value = _is_object
                        ? item.dataset.lineObject
                        : item.dataset.lineTarget;
                    const _rect_item = item.getBoundingClientRect();
                    const i_x = Number(item.dataset.x);
                    const i_y = Number(item.dataset.y);
                    const if_x = v_x <= i_x + item_w && v_x + item_w * 2 >= i_x + item_w;
                    const if_y = v_y >= i_y - item_h && v_y <= i_y - item_h + item_h * 2;
                    let is_selected = false;
                    let connect_array;
                    //1:1규칙용
                    //특정영역안에 있고, 같은 분류가 아니며, 완료되지않은 아이템
                    const if_compete =
                        this.type === 'single'
                            ? if_x && if_y && is_object !== _is_object && !_is_complete
                            : if_x && if_y && is_object !== _is_object;

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
                        if (!item.dataset.connect) {
                            item.dataset.connect = el_item.dataset.name;
                        } else {
                            item.dataset.connect =
                                item.dataset.connect + ',' + el_item.dataset.name;
                        }

                        //최종 라인종료 위치
                        el_line.setAttribute('x2', _rect_item.left + item_w - this.wrap_l);
                        el_line.setAttribute('y2', _rect_item.top + item_h - this.wrap_t);

                        //정오답적용
                        const v1 = value.split(',');
                        const v2 = _value.split(',');

                        if (this.type === 'multiple') {
                            //multiple인 경우 정오답
                            if (v1.filter(x => v2.includes(x)).length > 0) {
                                el_line.dataset.answer = true;
                                is_answer = true;
                                this.answer_n = this.answer_n + 1;
                            } else {
                                el_line.dataset.answer = false;
                                is_answer = false;
                                this.answer_n = this.answer_n - 1;
                            }
                        } else {
                            //single인 경우 정오답
                            if (value === _value) {
                                el_line.dataset.answer = true;
                                is_answer = true;
                                this.answer_n = this.answer_n + 1;
                            } else {
                                el_line.dataset.answer = false;
                                is_answer = false;
                            }
                        }
                        is_complete = true;
                        if (el_item.dataset.lineObject) {
                            this.answer_last.push({
                                ['key_' + el_item.dataset.name]: el_item.dataset.lineObject,
                                ['key_' + item.dataset.name]: item.dataset.lineTarget,
                            });
                        } else {
                            this.answer_last.push({
                                ['key_' + item.dataset.name]: item.dataset.lineObject,
                                ['key_' + el_item.dataset.name]: el_item.dataset.lineTarget,
                            });
                        }
                        break;
                    }
                }
                //연결 실패인 경우 라인 삭제
                if (!is_complete) el_line.remove();

                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);

                if (this.callback) {
                    this.callback({
              /*전체정답갯수*/ answer_all_sum: this.answer_len,
              /*현재정답갯수*/ answer_current_sum: this.answer_n,
              /*선택한정답  */ answer_current: value,
              /*정오답상태  */ answer_state: is_answer,
              /*히스토리    */ answer_last: this.answer_last,
                    });
                }
                if (this.complete_n === this.n) this.completeCallback();
            };
            actMove = e => {
                _x = e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = e.clientY ? e.clientY : e.targetTouches[0].clientY;
                el_line.setAttribute('x2', _x - this.wrap_l);
                el_line.setAttribute('y2', _y - this.wrap_t);
            };

            //클릭시작이 아니라면 이벤트 실행
            if (this.wrap.dataset.event !== 'click-start') {
                this.doc.addEventListener('mousemove', actMove);
                this.doc.addEventListener('mouseup', actEnd);
                this.doc.addEventListener('touchmove', actMove);
                this.doc.addEventListener('touchend', actEnd);
                
                //클릭완료가 아니라면 실행 
                if (this.wrap.dataset.event !== 'click-end') {
                    el_line.setAttribute('x1', x_value);
                    el_line.setAttribute('y1', y_value);
                    el_line.setAttribute('x2', x_value);
                    el_line.setAttribute('y2', y_value);
                    
                    //클릭이벤트라면 클릭시작 설정 및 클릭정보 저장
                    if (e.type === 'click' ) {
                        this.wrap.dataset.event = "click-start";
                        el_item.dataset.active = "true";
                        click_info = {
                            line: el_line,
                            currentTarget: el_item,
                            x: x_value,
                            y: y_value,
                            name: data_name,
                            isObject: is_object
                        }
                    } 
                } 
                //클릭완료인 경우 이벤트 취소
                else {
                    this.wrap.dataset.event= "";
                    this.doc.removeEventListener('mousemove', actMove);
                    this.doc.removeEventListener('mouseup', actEnd);
                    this.doc.removeEventListener('touchmove', actMove);
                    this.doc.removeEventListener('touchend', actEnd);
                }
            } 
            //클릭시작이 이미 존재하는 경우 무브,앤드 이벤트 취소
            else if (this.wrap.dataset.event === 'click-start') {
                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);

                if (e.type === 'click') {
                    click_info.currentTarget.dataset.active = "";
                    el_line = click_info.line;
                    
                    if (click_info.isObject !== is_object) {
                        el_line.setAttribute('x1', click_info.x);
                        el_line.setAttribute('y1', click_info.y);
                        actEnd();
                    } 
                } else if (e.type === 'touchstart') {
                    click_info.currentTarget.dataset.active = "";
                    el_line = click_info.line;
                    
                    if (click_info.isObject !== is_object) {
                        el_line.setAttribute('x2', x_value);
                        el_line.setAttribute('y2', y_value);
                    } 
                } 
            } 
            
        };

        for (let item of this.items) {
            if (this.isTouch) {
                item.addEventListener('touchstart', actStart, {
                    passive: true,
                });
            } else {
                item.addEventListener('mousedown', actStart);
            }
            item.addEventListener('click', actStart);
        }
    }
    completeCallback() {
        if (this.callbackComplete) {
            this.callbackComplete({
          /*전체정답갯수  */ answer_all_sum: this.answer_len,
          /*현재정답갯수  */ answer_current_sum: this.answer_n,
          /*전체정오답상태*/ answer_all_state:
                    this.answer_len === this.answer_n ? true : false,
          /*히스토리     */ answer_last: this.answer_last,
            });
        }
    }

    //초기화 실행
    reset = v => {
        const isDeep = v;
        for (let item of this.items) {
            item.removeAttribute('data-state');
            item.removeAttribute('data-complete');
            item.removeAttribute('data-connect');
        }
        this.svg = this.wrap.querySelector('svg');
        if (this.svg.lastChild) {
            while (this.svg.lastChild) {
                this.svg.removeChild(this.svg.lastChild);
            }
        }
        if (!isDeep) {
            this.answer_last = [];
        }
        this.wrap.dataset.state = '';
        this.complete_n = 0;
        this.answer_n = 0;
    };
    //정오답체크
    check = () => {
        this.wrap.dataset.state = 'check';
        if (this.callbackCheck) {
            this.callbackCheck({
          /*전체정답갯수  */ answer_all_sum: this.answer_len,
          /*현재정답갯수  */ answer_current_sum: this.answer_n,
          /*전체정오답상태*/ answer_all_state:
                    this.answer_len === this.answer_n ? true : false,
          /*히스토리     */ answer_last: this.answer_last,
            });
        }
    };
    //정답확인
    complete = () => {
        this.reset();
        for (let i = 0; i < this.n; i++) {
            const el_object = this.items[i];
            const value = el_object.dataset.lineObject;
            if (value !== 'null') {
                const _v = value.split(',');
                for (let j = 0; j < _v.length; j++) {
                    const el_target = this.wrap.querySelector(
                        `[data-line-target="${_v[j]}"]`
                    );

                    this.svg.insertAdjacentHTML(
                        'beforeend',
                        `<line x1="${el_object.dataset.x}" x2="${el_target.dataset.x}" y1="${el_object.dataset.y}" y2="${el_target.dataset.y}" data-state="complete"></line>`
                    );
                }
            }
        }
        this.answer_n = this.answer_len;
        this.wrap.dataset.state = 'complete';
        this.completeCallback();
    };
    drawLastAnswer = () => {
        for (let i = 0; i < this.answer_last.length; i++) {
            const last = this.answer_last[i];
            const keyname = Object.keys(last);
            const el_object = this.wrap.querySelector(
                `[data-name="${keyname[0].split('_')[1]}"]`
            );
            const el_target = this.wrap.querySelector(
                `[data-name="${keyname[1].split('_')[1]}"]`
            );
            el_object.dataset.complete = 'true';
            el_target.dataset.complete = 'true';
            if (last[keyname[0]] === last[keyname[1]]) {
                this.answer_n = this.answer_n + 1;
            }
            this.svg.insertAdjacentHTML(
                'beforeend',
                `<line x1="${el_object.dataset.x}" x2="${el_target.dataset.x}" y1="${el_object.dataset.y}" y2="${el_target.dataset.y}" data-state="complete"></line>`
            );
        }
    };
}
