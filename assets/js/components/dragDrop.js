export default class DrawDrop {
    constructor(opt) {
        this.id = opt.id;
        this.answer = opt.answer;
        this.type = opt.type;
        this.callback = opt.callback;
        this.callbackComplete = opt.callbackComplete;
        this.doc = document.documentElement;
        this.wrap = document.querySelector('[data-drag-id="' + this.id + '"]');
        this.drops = this.wrap.querySelectorAll('[data-drag-object]');
        this.areas = this.wrap.querySelectorAll('[data-drag-target]');
        this.box = this.wrap.querySelector('[data-drag-box]');
        this.array_area = [];
        this.el_scroll = document.querySelector('[data-pagescroll]');
        
        this.wrap_rect = this.wrap.getBoundingClientRect();
        this.wrap_t = this.wrap_rect.top;
        this.wrap_l = this.wrap_rect.left;

        if (this.box) {
            this.box_rect = this.box.getBoundingClientRect();
            this.box_t = this.box_rect.top;
            this.box_l = this.box_rect.left;
        } else {
            this.box_rect = null;
            this.box_t = null;
            this.box_l = null;
        }
        

        this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
        this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;

        this.complete_n = 0;
        this.answer_n = 0;
        // this.answer_len = this.answer.length;
        this.init();
    }

    init() {
        const set = () => {
            this.wrap_rect = this.wrap.getBoundingClientRect();
            this.wrap_t = this.wrap_rect.top;
            this.wrap_l = this.wrap_rect.left;
            this.array_area = [];
            this.areas = this.wrap.querySelectorAll('[data-drag-target]');
           
            for (let item of this.areas) {
                const rect = item.getBoundingClientRect();
                this.array_area.push({
                    name : item.dataset.dragTarget,
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left,
                    x: rect.x,
                    y: rect.y,
                    rangeX: [rect.left, rect.left + rect.width],
                    rangeY: [rect.top, rect.top + rect.height],
                });
            }
        }
        set();    

        UI.parts.resizObserver({
            el: this.wrap,
            callback: (v) => {
                v.resize[0] && set();
            }
        });

        const calc = (v, w) => {
            let n = this[v];
            n = (w === '-') ? n - 1 : (w === '+') ? n + 1 : n;
            (n < 0) ? n = 0 : '';
            this[v] = n;
            // return v = n; 
        }

        //clone drag
        const actStartClone = (e) => {
            const el_this = e.currentTarget;
            const el_this_area = el_this.closest('[data-drag-target]');
            const el_wrap = el_this.closest('[data-drag-id]');
            const data_name = el_this.dataset.dragObject;
            const area_name = el_this_area.dataset.dragTarget;

            el_this.removeAttribute('data-drag-state');
            el_this.classList.add('active');
            this.el_scroll.dataset.pagescroll = 'hidden';

            this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
            this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;
            this.wrap_rect = this.wrap.getBoundingClientRect();
            this.wrap_t = this.wrap_rect.top + this.win_y;
            this.wrap_l = this.wrap_rect.left + this.win_x;

            const rect_this = el_this.getBoundingClientRect();
            const rect_area = el_this_area.getBoundingClientRect();

            let _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            let _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
            let m_y;
            let m_x;

            if (getComputedStyle(el_this_area).display !== 'flex') {
                console.log('sort: flex none')
                m_x = _x - rect_area.left - (rect_this.width / 2);
                m_y = _y - rect_area.top - (rect_this.height / 2);
            } else {
                console.log('sort: flex')
                m_x = _x - rect_area.left - (rect_this.width / 2);
                m_y = _y - rect_area.top - (rect_this.height / 2);
            }
            
            el_this.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';

            const actEnd = () => {
                const e_x = _x  ;
                const e_y = _y  ;
                let is_range;
                let is_name;

                this.el_scroll.dataset.pagescroll = 'auto';
                el_this.classList.remove('active');

                for (let i = 0, len = this.array_area.length; i < len; i++ ) {
                    const is_x = this.array_area[i].rangeX[0] -  this.win_x < e_x && this.array_area[i].rangeX[1] - this.win_x > e_x;
                    const is_y = this.array_area[i].rangeY[0] - this.win_y < e_y && this.array_area[i].rangeY[1] - this.win_y > e_y;
                    
                    if (is_x && is_y) {
                        is_range = true;
                        is_name = this.array_area[i].name;
                        m_x = _x - this.array_area[i].left - (rect_this.width / 2) + this.win_x;
                        m_y = _y - this.array_area[i].top - (rect_this.height / 2) + this.win_y;

                        break;
                    } else {
                        is_range = false;
                    }
                }

                if (is_range) {
                    const current_area = el_wrap.querySelector('[data-drag-target="'+ is_name +'"]');
                    const limit = Number(current_area.dataset.limit);
                    const current_area_drops = current_area.querySelectorAll('[data-drag-object]');
                    const n = current_area_drops.length;
                    const area_in_clone = el_this;

                    const act = () => {
                        area_in_clone.dataset.dragState = 'complete';
                        area_in_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
                        current_area.insertAdjacentElement('beforeend', area_in_clone);

                        let is_name_array = is_name.split(',');
                        console.log(is_name_array)
                        let is_state = false;
                        for (let key in is_name_array) {
                            console.log(data_name, is_name_array[key])
                            if (data_name === is_name_array[key]) {
                                is_state = true;
                                calc('answer_n', '+');
                                break;
                            }
                        }

                        this.callback && this.callback({
                            name: data_name,
                            state: is_state,
                        });
                    }

                    (area_name !== is_name) ? 
                    el_this.remove() : area_in_clone.dataset.dragState = 'complete';
console.log(limit, n)
                    if (limit !== n ) {
                        act();
                    } else {
                        if (area_name !== is_name) {
                            if (limit === 1) {
                                //change
                                const _el_clone = current_area.querySelector('[data-drag-object]'); 
                                el_this_area.insertAdjacentElement('beforeend', _el_clone);

                                //delete
                                //const __name = current_area.querySelector('[data-drag-object]').dataset.dragObject;
                                // current_area.querySelector('[data-drag-object]').remove();
                                // const __drop =  el_wrap.querySelector('[data-drag-object="'+ __name +'"]');
                                // __drop.classList.remove('disabled');
                                // calc('complete_n', '-');
                                act();
                            } else {
                                console.log(111111111111)
                                calc('complete_n', '-');
                                el_wrap.querySelector('.disabled[data-drag-object="'+ data_name +'"]').classList.remove('disabled');

                                (data_name === is_name) ?  calc('answer_n', '+') : calc('answer_n', '-');
                            }
                        }
                    }
                   
                    el_this.addEventListener('mousedown', actStartClone);
                    el_this.addEventListener('touchstart', actStartClone, { passive: true });
                    
                } else {
                    console.log(el_this.dataset.dragObject)
                    
                    const _disabled_drop = el_wrap.querySelector('.disabled[data-drag-object="'+ el_this.dataset.dragObject +'"]');

                    _disabled_drop.classList.remove('disabled');
                    calc('complete_n', '-');
                    calc('answer_n', '-');

                    el_this.remove();

                    // for (let item2 of _disabled_drops) {
                    //     item2.classList.remove('disabled');
                    // }
                }

                const n_clone = el_this_area.querySelectorAll('[data-drag-object').length;
                el_this_area.dataset.empty = (n_clone > 0) ? true : false;

                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

                if (getComputedStyle(el_this_area).display !== 'flex') {
                    m_x = _x - rect_area.left - (rect_this.width / 2);
                    m_y = _y - rect_area.top - (rect_this.height / 2);
                } else {
                    m_x = _x - rect_area.left - (rect_this.width / 2);
                    m_y = _y - rect_area.top - (rect_this.height / 2);
                }

                el_this.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            }

            this.doc.addEventListener('mousemove', actMove);
            this.doc.addEventListener('mouseup', actEnd);
            this.doc.addEventListener('touchmove', actMove);
            this.doc.addEventListener('touchend', actEnd);
        }

        //original drag
        const actStart = (e) => {
            const el_this = e.currentTarget;
            const el_wrap = el_this.closest('[data-drag-box]');
            const el_clone = el_this.cloneNode(true);
            const data_copy = el_this.dataset.dragCopy;
            const data_name = el_this.dataset.dragObject;
            const rect_this = el_this.getBoundingClientRect();

            this.el_scroll.dataset.pagescroll = 'hidden';
            
            (data_copy === 'false' || !data_copy) && el_this.classList.add('disabled');
            el_clone.classList.add('clone');
            el_clone.dataset.dragType = 'clone';
            el_clone.classList.add('active');
            el_wrap.insertAdjacentElement('beforeend', el_clone);
           
            this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
            this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;
            this.wrap_rect = this.wrap.getBoundingClientRect();
            this.wrap_t = this.wrap_rect.top + this.win_y;
            this.wrap_l = this.wrap_rect.left + this.win_x;

            let _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            let _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
            let m_y = _y + this.win_y - this.box_t - (rect_this.height / 2);
            let m_x = _x + this.win_x - this.box_l - (rect_this.width / 2);
           
            el_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            el_clone.style.maxWidth = rect_this.width + 'px';

            const actEnd = (e) => {
                const e_x = m_x + this.box_l + (rect_this.width / 2);
                const e_y = m_y + this.box_t + (rect_this.height / 2);
                let is_range;
                let is_name;

                this.el_scroll.dataset.pagescroll = 'auto';
                el_clone.classList.remove('active');
            
                //영역안에 들어가는지 체크 is_range
                for (let i = 0, len = this.array_area.length; i < len; i++ ) {
                    const is_x = this.array_area[i].rangeX[0] < e_x && this.array_area[i].rangeX[1] > e_x;
                    const is_y = this.array_area[i].rangeY[0] < e_y && this.array_area[i].rangeY[1] > e_y;

                    if (is_x && is_y) {
                        is_range = true;
                        is_name = this.array_area[i].name;
                        // m_y = m_y - (this.array_area[i].top - this.wrap_t);
                        // m_x = m_x - (this.array_area[i].left - this.wrap_l);
                        break;
                    } else {
                        is_range = false;
                    }
                }

                //영역안에 들어가는 복제아이템 들어가기
                if (is_range) {
                    const current_area = this.wrap.querySelector('[data-drag-target="'+ is_name +'"]');
                    const limit = Number(current_area.dataset.limit);
                    const current_area_drops = current_area.querySelectorAll('[data-drag-object]');
                    const n = current_area_drops.length;
                    const area_in_clone = el_clone;
                    el_clone.remove();
                    
                    const act = () => {
                        area_in_clone.dataset.dragState = 'complete';
                        current_area.insertAdjacentElement('beforeend', area_in_clone);
                        area_in_clone.getBoundingClientRect()
                        calc('complete_n', '+');

                        let is_name_array = is_name.split(',');
                        console.log(is_name_array)
                        let is_state = false;
                        for (let key in is_name_array) {
                            console.log(data_name, is_name_array[key])
                            if (data_name === is_name_array[key]) {
                                is_state = true;
                                calc('answer_n', '+');
                                break;
                            }
                        }

                        area_in_clone.style.transform = `translate(${e_x - current_area.getBoundingClientRect().left - this.win_x - (area_in_clone.getBoundingClientRect().width / 2)}px, ${e_y - current_area.getBoundingClientRect().top - this.win_y - (area_in_clone.getBoundingClientRect().height / 2)}px)`;
        
                        this.callback && this.callback({
                            name: data_name,
                            state: is_state,
                        });
                    }

                    //최대치와 같냐?
                    if (limit === n) {
                        //최대치가 1인 경우
                        if (limit === 1) {
                            const __name = current_area.querySelector('[data-drag-object]').dataset.dragObject;
                            current_area.querySelector('[data-drag-object]').remove();
                            const __drop =  el_wrap.querySelector('[data-drag-object="'+ __name +'"]');
                            __drop.classList.remove('disabled');
                            act();
                            calc('complete_n', '-');
                        } else {
                            el_this.classList.remove('disabled');
                        }
                    } else {
                        act();
                    }

                    const area_drops = current_area.querySelectorAll('[data-drag-object]');
                    
                    for (let item of area_drops) {
                        item.addEventListener('mousedown', actStartClone);
                        item.addEventListener('touchstart', actStartClone, {
                            passive: true
                        });
                    }
                } 
                else {
                    el_clone.remove();
                    el_this.classList.remove('disabled');
                }

                // (this.complete_n === this.answer_len) && this.completeCallback();
                if (is_name) {
                    const _current_area = this.wrap.querySelector('[data-drag-target="'+ is_name +'"]');
                    const n_clone = _current_area.querySelectorAll('[data-drag-object').length;

                    _current_area.dataset.empty = (n_clone > 0) ? true : false;
                }
                
                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
                m_x = _x - this.win_x - this.box_l - (rect_this.width / 2);
                m_y = _y + this.win_y - this.box_t - (rect_this.height / 2);
                
                el_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            }

            this.doc.addEventListener('mousemove', actMove);
            this.doc.addEventListener('mouseup', actEnd);
            this.doc.addEventListener('touchmove', actMove);
            this.doc.addEventListener('touchend', actEnd);
        }

        //original drag
        const actStartOrder = (e) => {
            const el_this = e.currentTarget;
            const el_wrap = el_this.closest('[data-drag-area]');
            const el_clone = el_this.cloneNode(true);
            const data_copy = el_this.dataset.dragCopy;
            const data_name = el_this.dataset.dragObject;
            const rect_this = el_this.getBoundingClientRect();

            this.el_scroll.dataset.pagescroll = 'hidden';
            
            (data_copy === 'false' || !data_copy) && el_this.classList.add('disabled');
            el_clone.classList.add('clone');
            el_clone.dataset.dragType = 'clone';
            el_clone.classList.add('active');
            el_wrap.insertAdjacentElement('beforeend', el_clone);
           
            this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
            this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;
            this.wrap_rect = this.wrap.getBoundingClientRect();
            this.wrap_t = this.wrap_rect.top + this.win_y;
            this.wrap_l = this.wrap_rect.left + this.win_x;

            let _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            let _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
            let m_y = _y + this.win_y - this.box_t - (rect_this.height / 2);
            let m_x = _x + this.win_x - this.box_l - (rect_this.width / 2);
           
            el_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            el_clone.style.maxWidth = rect_this.width + 'px';

            const actEnd = (e) => {
                const e_x = m_x + this.box_l + (rect_this.width / 2);
                const e_y = m_y + this.box_t + (rect_this.height / 2);
                let is_range;
                let is_name;

                this.el_scroll.dataset.pagescroll = 'auto';
                el_clone.classList.remove('active');
            
                //영역안에 들어가는지 체크 is_range
                for (let i = 0, len = this.array_area.length; i < len; i++ ) {
                    const is_x = this.array_area[i].rangeX[0] < e_x && this.array_area[i].rangeX[1] > e_x;
                    const is_y = this.array_area[i].rangeY[0] < e_y && this.array_area[i].rangeY[1] > e_y;

                    if (is_x && is_y) {
                        is_range = true;
                        is_name = this.array_area[i].name;
                        // m_y = m_y - (this.array_area[i].top - this.wrap_t);
                        // m_x = m_x - (this.array_area[i].left - this.wrap_l);
                        break;
                    } else {
                        is_range = false;
                    }
                }

                //영역안에 들어가는 복제아이템 들어가기
                if (is_range) {
                    const current_area = this.wrap.querySelector('[data-drag-target="'+ is_name +'"]');
                    const limit = Number(current_area.dataset.limit);
                    const current_area_drops = current_area.querySelectorAll('[data-drag-object]');
                    const n = current_area_drops.length;
                    const area_in_clone = el_clone;
                    el_clone.remove();
                    
                    const act = () => {
                        area_in_clone.dataset.dragState = 'complete';
                        current_area.insertAdjacentElement('beforeend', area_in_clone);
                        area_in_clone.getBoundingClientRect()
                        calc('complete_n', '+');

                        let is_name_array = is_name.split(',');
                        console.log(is_name_array)
                        let is_state = false;
                        for (let key in is_name_array) {
                            console.log(data_name, is_name_array[key])
                            if (data_name === is_name_array[key]) {
                                is_state = true;
                                calc('answer_n', '+');
                                break;
                            }
                        }

                        area_in_clone.style.transform = `translate(${e_x - current_area.getBoundingClientRect().left - this.win_x - (area_in_clone.getBoundingClientRect().width / 2)}px, ${e_y - current_area.getBoundingClientRect().top - this.win_y - (area_in_clone.getBoundingClientRect().height / 2)}px)`;
        
                        this.callback && this.callback({
                            name: data_name,
                            state: is_state,
                        });
                    }

                    //최대치와 같냐?
                    if (limit === n) {
                        //최대치가 1인 경우
                        if (limit === 1) {
                            const __name = current_area.querySelector('[data-drag-object]').dataset.dragObject;
                            current_area.querySelector('[data-drag-object]').remove();
                            const __drop =  el_wrap.querySelector('[data-drag-object="'+ __name +'"]');
                            __drop.classList.remove('disabled');
                            act();
                            calc('complete_n', '-');
                        } else {
                            el_this.classList.remove('disabled');
                        }
                    } else {
                        act();
                    }

                    const area_drops = current_area.querySelectorAll('[data-drag-object]');
                    
                    for (let item of area_drops) {
                        item.addEventListener('mousedown', actStartClone);
                        item.addEventListener('touchstart', actStartClone, {
                            passive: true
                        });
                    }
                } 
                else {
                    el_clone.remove();
                    el_this.classList.remove('disabled');
                }

                // (this.complete_n === this.answer_len) && this.completeCallback();
                if (is_name) {
                    const _current_area = this.wrap.querySelector('[data-drag-target="'+ is_name +'"]');
                    const n_clone = _current_area.querySelectorAll('[data-drag-object').length;

                    _current_area.dataset.empty = (n_clone > 0) ? true : false;
                }
                
                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
                m_x = _x - this.win_x - this.box_l - (rect_this.width / 2);
                m_y = _y + this.win_y - this.box_t - (rect_this.height / 2);
                
                el_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            }

            this.doc.addEventListener('mousemove', actMove);
            this.doc.addEventListener('mouseup', actEnd);
            this.doc.addEventListener('touchmove', actMove);
            this.doc.addEventListener('touchend', actEnd);
        }
        if (this.type === 'order') {
            for (let item of this.drops) {
                item.addEventListener('mousedown', actStartOrder);
                item.addEventListener('touchstart', actStartOrder, { passive: true });
            }
        } else {
            for (let item of this.drops) {
                item.addEventListener('mousedown', actStart);
                item.addEventListener('touchstart', actStart, { passive: true });
            }
        }
        
    }

    completeCallback() {
        this.callbackComplete && this.callbackComplete({
            // sum: this.answer_len,
            value: this.answer_n,
            // state: this.answer_len === this.answer_n ? true : false,
            answer: this.answer
        });
    }
    reset() {
        for (let i = 0, len = this.answer_len; i < len; i++) {
            this.answer[i].state = false;
        }
        for (let item of this.areas) {
            const drops = item.querySelectorAll('[data-drag-object]');
            item.removeAttribute('data-state');
            item.dataset.empty = '';
            for (let drop of drops) {
                drop.remove();
            }
        }
        for (let item of this.drops) {
            item.classList.remove('disabled');
        }
        this.wrap.removeAttribute('data-state');
        this.complete_n = 0;
        this.answer_n = 0;
    }
    check() {
        for (let i = 0;  i < this.answer_len; i++) {
            const name = this.answer[i].name;
            const el_area = this.wrap.querySelector('[data-drag-target="'+ name +'"]');
            const el_drops = el_area.querySelectorAll('[data-drag-object]');
            const sum = this.answer[i].sum;
            let n = 0;
            let is_state = false;

            if (el_drops) {
                if (sum !== el_drops.length) {
                    is_state = false;
                    this.answer[i].state = false;
                } else {
                    for (let item of el_drops) {
                        if (item.dataset.dragObject === name.toString()) {
                            is_state = true;
                            this.answer[i].state = true;
                        } else {
                            is_state = false;
                            this.answer[i].state = false;
                        } 
    
                        n = n + 1;
                        if (n === sum) break;
                    }
                }

                el_area.dataset.state = is_state;
            }

        }
    }
    complete() {
        this.reset();
        for (let item of this.areas) {
            const name = item.dataset.dragTarget;
            let el_object;

            let is_name_array = name.split(',');
            console.log(is_name_array)
            let is_state = false;
            for (let key in is_name_array) {
                el_object = this.wrap.querySelector('[data-drag-object="'+ is_name_array[key] +'"]');

                const el_clone = el_object.cloneNode(true);

                el_object.classList.add('disabled');
                this.wrap.dataset.state = 'complete';
                el_clone.dataset.dragState = 'complete';
                item.insertAdjacentElement('beforeend', el_clone);
                item.dataset.empty = true;
                
            }
        }

        // this.complete_n = this.answer_len;
        // this.answer_n = this.answer_len;
        console.log(this.complete_n, this.answer_n)
    }
}