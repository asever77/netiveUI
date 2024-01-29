export default class DrawDrop {
    constructor(opt) {
        this.id = opt.id;
        this.callback = opt.callback;
        this.callbackComplete = opt.callbackComplete;
        this.doc = document.documentElement;
        this.wrap = document.querySelector('.ui-drag[data-id="' + this.id + '"]');

        this.drops = this.wrap.querySelectorAll('.ui-drag-drop');
        this.areas = this.wrap.querySelectorAll('.ui-drag-area');
        this.array_area = [];
        this.el_scroll = document.querySelector('[data-pagescroll]');

        this.wrap_t = this.wrap.getBoundingClientRect().top;
        this.wrap_l = this.wrap.getBoundingClientRect().left;
        this.wrap_w = this.wrap.offsetWidth;
        this.wrap_h = this.wrap.offsetHeight;
        this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
        this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;

        this.init();
    }

    init() {
        const set = () => {
            this.wrap_t = this.wrap.getBoundingClientRect().top;
            this.wrap_l = this.wrap.getBoundingClientRect().left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;
            
            for (let item of this.drops) {
                const _drop_info = item.getBoundingClientRect();

                item.dataset.x = (_drop_info.left + _drop_info.width - this.wrap_l);
                item.dataset.y = (_drop_info.top + _drop_info.height - this.wrap_t);
            }

            for (let item of this.areas) {
                const rect = item.getBoundingClientRect();

                this.array_area.push({
                    name : item.dataset.name,
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left,
                    x: rect.x,
                    y: rect.y,
                    rangeX: [rect.left, rect.left + rect.width],
                    rangeY: [rect.top, rect.top + rect.height],
                }) 
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

        //clone drag
        const actStartClone = (e) => {
            const el_this = e.currentTarget;
            const el_clone = el_this.cloneNode(true);
            const el_this_area = el_this.closest('.ui-drag-area');
            const el_wrap = el_this.closest('.ui-drag');
            el_wrap.insertAdjacentElement('beforeend', el_clone);
            el_this.remove();

            const data_name = el_this.dataset.name;

            this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
            this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;

            this.wrap_t = this.wrap.getBoundingClientRect().top + this.win_y;
            this.wrap_l = this.wrap.getBoundingClientRect().left + this.win_x;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;
            this.area = document.querySelector('.ui-drag-area[data-name="'+ data_name +'"]');

            const rect_this = el_clone.getBoundingClientRect();
            const rect_area = el_this_area.getBoundingClientRect()
            
            let _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;;
            let _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
            let m_x = _x - (rect_this.left + rect_this.width / 2);
            let m_y = _y - (rect_this.top + rect_this.height / 2 ) ;

            el_clone.style.top = (_y - this.wrap_t - (rect_this.height / 2) - (rect_area.top - this.wrap_t)) + 'px';
            el_clone.style.left = (_x - this.wrap_l - (rect_this.width / 2) - (rect_area.left - this.wrap_l)) + 'px';
            el_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';

            const actEnd = (e) => {
                const e_x = _x  ;
                const e_y = _y  ;
                let is_range;
                let is_name;

                for (let i = 0, len = this.array_area.length; i < len; i++ ) {
                    const is_x = this.array_area[i].rangeX[0] -  this.win_x < e_x && this.array_area[i].rangeX[1] - this.win_x > e_x;
                    const is_y = this.array_area[i].rangeY[0] - this.win_y < e_y && this.array_area[i].rangeY[1] - this.win_y > e_y;
                    
                    if (is_x && is_y) {
                        is_range = true;
                        is_name = this.array_area[i].name;
                        m_y = m_y - (this.array_area[i].top - this.wrap_t);
                        m_x = m_x - (this.array_area[i].left - this.wrap_l);
                        break;
                    } else {
                        is_range = false;
                    }
                }

                if (is_range) {
                    const current_area = el_wrap.querySelector('.ui-drag-area[data-name="'+ is_name +'"]');
                    const limit = Number(current_area.dataset.limit);
                    const is_move = current_area.dataset.move;
                    const current_area_drops = current_area.querySelectorAll('.ui-drag-drop');
                    const n = current_area_drops.length;
                    const area_in_clone = el_clone;
                    el_clone.remove();

                    if (limit !== n) {
                        
                        area_in_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';

                        current_area.insertAdjacentElement('beforeend', area_in_clone);
                    }

                    const area_drops = current_area.querySelectorAll('.ui-drag-drop');

                    el_clone.addEventListener('mousedown', actStartClone);
                    el_clone.addEventListener('touchstart', actStartClone, {
                        passive: true
                    });
                    
                } else {
                    el_clone.remove();
                    const _disabled_drops = el_wrap.querySelectorAll('.ui-drag-drop.disabled[data-name="'+ data_name +'"]');

                    for (let item2 of _disabled_drops) {
                        item2.classList.remove('disabled');
                    }
                }

                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
                m_x = _x - (rect_this.left + (rect_this.width / 2));
                m_y = _y - (rect_this.top + (rect_this.height / 2));
                
                el_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            }

            this.doc.addEventListener('mousemove', actMove);
            this.doc.addEventListener('mouseup', actEnd);
            this.doc.addEventListener('touchmove', actMove);
            this.doc.addEventListener('touchend', actEnd);
        }

        //original drag
        const actStart = (e) => {
            const el_this = e.currentTarget;
            const el_wrap = el_this.parentNode;
            const el_clone = el_this.cloneNode(true);

            const data_copy = el_this.dataset.copy;
            const data_name = el_this.dataset.name;
            const data_type = el_this.dataset.type;
            const rect_this = el_this.getBoundingClientRect();

            (data_copy === 'false' || !data_copy) && el_this.classList.add('disabled');
            el_clone.classList.add('clone');
            el_clone.dataset.type = 'clone';
            el_wrap.insertAdjacentElement('beforeend', el_clone);
           
            this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
            this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;

            this.wrap_t = this.wrap.getBoundingClientRect().top + this.win_y;
            this.wrap_l = this.wrap.getBoundingClientRect().left + this.win_x;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;
            this.area = document.querySelector('.ui-drag-area[data-name="'+ data_name +'"]');

            let _x;
            let _y;
            let m_x;
            let m_y;

            const actEnd = (e) => {
                const e_x = _x  ;
                const e_y = _y  ;
                let is_range;
                let is_name;
         
                for (let i = 0, len = this.array_area.length; i < len; i++ ) {
                    const is_x = this.array_area[i].rangeX[0] - this.win_x < e_x && this.array_area[i].rangeX[1] - this.win_x > e_x;
                    const is_y = this.array_area[i].rangeY[0] - this.win_y < e_y && this.array_area[i].rangeY[1] - this.win_y > e_y;
                    
                    if (is_x && is_y) {
                        is_range = true;
                        is_name = this.array_area[i].name;
                        m_y = m_y - (this.array_area[i].top - this.wrap_t);
                        m_x = m_x - (this.array_area[i].left - this.wrap_l);
                        break;
                    } else {
                        is_range = false;
                    }
                }

                if (is_range) {
                    const current_area = el_wrap.querySelector('.ui-drag-area[data-name="'+ is_name +'"]');
                    const limit = Number(current_area.dataset.limit);
                    const is_move = current_area.dataset.move;
                    const current_area_drops = current_area.querySelectorAll('.ui-drag-drop');
                    const n = current_area_drops.length;
                    const area_in_clone = el_clone;
                    el_clone.remove();

                    if (limit === n) {
                        el_this.classList.remove('disabled');
                    } else {
                        area_in_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
                        current_area.insertAdjacentElement('beforeend', area_in_clone);
                    }

                    const area_drops = current_area.querySelectorAll('.ui-drag-drop');

                    if (is_move === 'true') {
                        for (let item of area_drops) {
                            item.addEventListener('mousedown', actStartClone);
                            item.addEventListener('touchstart', actStartClone, {
                                passive: true
                            });
                        }
                    }
                } else {
                    el_clone.remove();
                    el_this.classList.remove('disabled');
                }

                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
                m_x = _x - (rect_this.left + (rect_this.width / 2));
                m_y = _y - (rect_this.top + (rect_this.height / 2));
                
                el_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            }

            this.doc.addEventListener('mousemove', actMove);
            this.doc.addEventListener('mouseup', actEnd);
            this.doc.addEventListener('touchmove', actMove);
            this.doc.addEventListener('touchend', actEnd);
        }
         
        for (let item of this.drops) {
            item.addEventListener('mousedown', actStart);
            item.addEventListener('touchstart', actStart, {
                passive: true
            });
        }
    }
    


}