export default class DrawDrop {
    constructor(opt) {
        this.id = opt.id;
        this.doc = document.documentElement;
        this.wrap = document.querySelector('.ui-drag[data-id="' + this.id + '"]');

        this.drops = this.wrap.querySelectorAll('.ui-drag-drop');
        this.areas = this.wrap.querySelectorAll('.ui-drag-area');
        this.array_area = [];

        this.wrap_t = this.wrap.getBoundingClientRect().top;
        this.wrap_l = this.wrap.getBoundingClientRect().left;
        this.wrap_w = this.wrap.offsetWidth;
        this.wrap_h = this.wrap.offsetHeight;
        

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
                const _drop_w = item.offsetWidth / 2;
                const _drop_h = item.offsetHeight / 2;

                item.dataset.x = (_drop_info.left + _drop_w - this.wrap_l);
                item.dataset.y = (_drop_info.top + _drop_h - this.wrap_t);
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


        const actStart = (e) => {
            e.preventDefault();
            const _this = e.currentTarget;
            const _name = _this.dataset.name;
            const _wrap = _this.parentNode;
            const copy = _this.dataset.clone;

            const _clone = _this.cloneNode(true);
            if (copy === 'true') {

            } else {
                _this.classList.add('disabled');
            }
            
            _clone.classList.add('clone');
            _wrap.insertAdjacentElement('beforeend', _clone);

            const el_clone = _wrap.querySelector('.clone[data-name="'+ _name +'"]');
            
            this.wrap_t = this.wrap.getBoundingClientRect().top;
            this.wrap_l = this.wrap.getBoundingClientRect().left;
            this.wrap_w = this.wrap.offsetWidth;
            this.wrap_h = this.wrap.offsetHeight;

            const win_y = window.scrollY;
            const win_x = window.scrollX;
            const _this_info = _this.getBoundingClientRect();
            const _this_w = _this.offsetWidth;
            const _this_h = _this.offsetHeight;
            const s_x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
            const s_y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

            let _x;
            let _y;
            let m_x;
            let m_y;

            this.area = document.querySelector('.ui-drag-area[data-name="'+ _name +'"]');

            console.log(_this_info.left - this.wrap_l, _this_w, _this_h)

            // _this.style.top = _this.dataset

            const actEnd = (e) => {
                const e_x = _x  ;
                const e_y = _y  ;
                let is_range;
                let is_name;

                for (let i = 0, len = this.array_area.length; i < len; i++ ) {
                    const is_x = this.array_area[i].rangeX[0] < e_x && this.array_area[i].rangeX[1] > e_x;
                    const is_y = this.array_area[i].rangeY[0] < e_y && this.array_area[i].rangeY[1] > e_y;
                    
                    if (is_x && is_y) {
                        console.log('범위 안에',this.wrap_t,this.array_area[i].top );
                        is_range = true;
                        is_name = this.array_area[i].name;
                        m_y = m_y - (this.array_area[i].top - this.wrap_t);
                        m_x = m_x - (this.array_area[i].left - this.wrap_l);
                        break;
                    } else {
                        console.log('범위 밖에')
                        is_range = false;
                    }
                }

                if (is_range) {
                    const current_area = _wrap.querySelector('.ui-drag-area[data-name="'+ is_name +'"]');
                    const limit = Number(current_area.dataset.limit);
                    const current_area_drops = current_area.querySelectorAll('.ui-drag-drop');
                    const n = current_area_drops.length;
                    console.log(limit, n); 
                    const area_in_clone = _clone;
                    _clone.remove();
                    

                    if (limit === n) {
                        _this.classList.remove('disabled');
                    } else {

                       

                        area_in_clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
                        current_area.insertAdjacentElement('beforeend', area_in_clone);
                    }

                } else {
                    _clone.remove();
                    _this.classList.remove('disabled');
                }

                this.doc.removeEventListener('mousemove', actMove);
                this.doc.removeEventListener('mouseup', actEnd);
                this.doc.removeEventListener('touchmove', actMove);
                this.doc.removeEventListener('touchend', actEnd);
            }

            const actMove = (e) => {
                _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
                _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

                m_x = _x - (_this_info.left + (_this_w / 2));
                m_y = _y - (_this_info.top + (_this_h / 2));
                // el_line.setAttribute('x2', _x - this.wrap_l);
                // el_line.setAttribute('y2', _y - this.wrap_t);
                
                _clone.style.transform = 'translate('+ m_x +'px, '+ m_y +'px)';
            }

            //event
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