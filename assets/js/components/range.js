export default class Range {
    constructor(opt) {
        this.id = opt.id;
        this.values = opt.value;
        this.title = opt.title ? opt.title : '';
        this.el_range = document.querySelector('.mdl-range[data-id="'+ this.id +'"]');
        this.el_from = this.el_range.querySelector('.mdl-range-inp[data-range="from"]');
        
        this.el_to = this.el_range.querySelector('.mdl-range-inp[data-range="to"]');
        this.el_inp = this.el_range.querySelectorAll('.mdl-range-inp');
        this.isText = !!opt.text ? opt.text : false;
        this.track = this.el_range.querySelector('.mdl-range-track');
        this.isMarks = this.el_range.querySelectorAll('.mdl-range-marks');
        this.step = !!opt.step ? opt.step : 1;
        this.min = !!opt.min ? opt.min : Number(this.el_inp[0].min);
        this.max = !!opt.max ? opt.max : Number(this.el_inp[0].max);
        this.tickmark = !!opt.tickmark ? opt.tickmark : false;

        this.init();
    }
    init() {
        this.el_from.value = this.values[0];
        this.el_from.min = this.min;
        this.el_from.max = this.max;
        this.el_from.step = this.step;

        if (!!this.el_to) {
            this.el_from.setAttribute('aria-label', this.title + ' 최소 ' + this.isText[this.el_from.value]);
            this.el_to.value = this.values[1];
            this.el_to.min = this.min;
            this.el_to.max = this.max;
            this.el_to.step = this.step;
            this.el_to.setAttribute('aria-label', this.title + ' 최대 ' + this.isText[this.el_to.value]);
        } else {
            el_from.setAttribute('aria-label',title + ' ' + isText[el_from.value]);
        }

        !!track && track.remove();
        if (!!isMarks) {
            for (const isMark of isMarks) {
                isMark.remove();
            }
        } 

        let html = '<div class="mdl-range-track">';
        html += '<div class="mdl-range-bar"></div>';
        html += '<span class="left mdl-range-point" data-range="from" aria-hidden="true"><em class="mdl-range-txt" data-from="'+ id +'"></em></span>';

        if (!!el_to) {
            html += '<span class="right mdl-range-point" data-range="to"  aria-hidden="true"><em class="mdl-range-txt" data-to="'+ id +'"></em></span>';
        }
        
        html += '</div>';
        if (!!tickmark) {
            html += '<div class="mdl-range-marks" id="'+ id +'_tickmarks_from" data-from="true">';
            const len = tickmark.length;
            
            for (let i = 0; i < len; i++) {
                const n = (max - min) / (len - 1);
                let isSame = '';

                if (!!el_from) {
                    isSame = Number(el_from.value) === (n * i + min) ? '선택됨' : '';
                }

                (!!el_to) ? 
                html += '<button class="mdl-range-btn" data-id="'+ id +'" type="button" data-value="'+ (n * i + min) +'"><span class="a11y-hidden">'+ title +' 최소 </span><span>'+ tickmark[i] +'</span><span class="a11y-hidden state">'+ isSame +'</span></button>':
                html += '<button class="mdl-range-btn" data-id="'+ id +'" type="button" data-value="'+ (n * i + min) +'"><span class="a11y-hidden">'+ title +' </span><span>'+ tickmark[i] +'</span><span class="a11y-hidden state">'+ isSame +'</span></button>';
            }

            html += '</div>';

            if (!!el_to) {
                html += '<div class="mdl-range-marks" id="'+ id +'_tickmarks_to" data-to="true">';
            
                for (let i = 0; i < len; i++) {
                    const n = (max - min) / (len - 1);
                    let isSame = '';

                    if (!!el_to && isSame === '') {
                        isSame = Number(el_to.value) === (n * i + min) ? '선택됨' : '';
                    }

                    html += '<button class="mdl-range-btn" data-id="'+ id +'" type="button" data-value="'+ (n * i + min) +'"><span class="a11y-hidden">'+ title +' 최대 </span><span>'+ tickmark[i] +'</span><span class="a11y-hidden state">'+ isSame +'</span></button>'
                }
            }
            
            html += '</div>';

        }

        el_range.insertAdjacentHTML('beforeend', html);
        html = '';

        // if (!el_to) {
        // 	html = '<strong class="a11y-hidden">'+ el_from.value +'</strong>';
        // } else {
        // 	html = '<strong class="a11y-hidden">'+ el_from.value +'부터 '+ el_to.value +'까지</strong>';
        // }
        el_range.insertAdjacentHTML('beforeend', html);

        const el_from_btn = el_range.querySelector('.mdl-range-point.left');
        const el_to_btn = el_range.querySelector('.mdl-range-point.right');
        const eventName = !!Global.state.browser.ie ? 'click' : 'input';
        const marks = el_range.querySelectorAll('.mdl-range-marks');

        el_from_btn.dataset.range = 'from';
        el_to_btn ? el_to_btn.dataset.range = 'to' : '';
        el_range.dataset.from = '0';
        el_range.dataset.to = '0';

        if (!!marks) {
            for (let mark of marks) {
                const btns = mark.querySelectorAll('.mdl-range-btn');

                for (let btn of btns) {
                    btn.addEventListener('click', Global.rangeSlider.clcikRange);
                }
            }
        }

        if (el_from && el_to) {
            //range
            Global.rangeSlider.rangeFrom({
                id: id,
                value: values[0]
            });
            Global.rangeSlider.rangeTo({
                id: id,
                value: values[1]
            });

            //input - click input event
            el_from.addEventListener(eventName, () => {
                Global.rangeSlider.rangeFrom({
                    id: id
                });
            });
            el_to.addEventListener(eventName, () => {
                Global.rangeSlider.rangeTo({
                    id: id
                });
            });
            
            //point - mouseover event
            if (!Global.state.device.mobile) {
                el_to_btn.addEventListener('mouseover', Global.rangeSlider.inputFocus);
                el_from_btn.addEventListener('mouseover', Global.rangeSlider.inputFocus);
            } else {
                //point - touchstart event
                el_to_btn.addEventListener('touchstart', Global.rangeSlider.touchFocus);
                el_from_btn.addEventListener('touchstart', Global.rangeSlider.touchFocus);
            }

            el_inp[0].step = step;
            el_inp[1].step = step;
            el_inp[0].min = min;
            el_inp[0].max = max;
            el_inp[1].min = min;
            el_inp[1].max = max;
            if (!!Global.state.device.mobile) {
                el_inp[0].setAttribute('aria-hidden', true);
                el_inp[1].setAttribute('aria-hidden', true);
            } else {
                el_inp[0].setAttribute('tabindex', -1);
                el_inp[1].setAttribute('tabindex', -1);
            }
        } else {
            //single
            Global.rangeSlider.rangeFrom({
                id: id,
                type: 'single'
            });
            el_from.addEventListener(eventName, () => {
                Global.rangeSlider.rangeFrom({
                    id: id,
                    type: 'single'
                });
            });

            el_from_btn.addEventListener('mouseover', () => {
                el_from.classList.add('on');
                el_from.focus();
            });

            el_inp[0].step = step;
            el_inp[0].min = min;
            el_inp[0].max = max;
            if (!!Global.state.device.mobile) {
                el_inp[0].setAttribute('aria-hidden', true);
            } else {
                el_inp[0].setAttribute('tabindex', -1);
            }
        }
        el_from.classList.add('on');
        !!el_to && el_to.classList.remove('on');
    }
    clcikRange(e){
        const btn = e.currentTarget;
        const id = btn.dataset.id;
        const value = Number(btn.dataset.value);
        const btn_text = btn.textContent;
        const range = btn.closest('.mdl-range');
        const marks = btn.closest('.mdl-range-marks');
        const isFrom = marks.dataset.from;
        const type = range.dataset.type;
        const to = Number(range.dataset.to);
        const from = Number(range.dataset.from);
        const rg = range.querySelector('.mdl-range-inp.on').dataset.range;

        if (!!isFrom) {
            Global.rangeSlider.rangeFrom({
                id : id,
                value : value
            });
        } else {
            Global.rangeSlider.rangeTo({
                id : id,
                value : value
            });
        }
        


        // if (type === 'single') {
        // 	Global.rangeSlider.rangeFrom({
        // 		id : id,
        // 		value : value
        // 	});
        // } else {
        // 	if (value === to && rg !== 'to') {
        // 		Global.rangeSlider.rangeFrom({
        // 			id : id,
        // 			value : value
        // 		});
        // 	} else if (value === from && rg !== 'from') {
        // 		Global.rangeSlider.rangeTo({
        // 			id : id,
        // 			value : value
        // 		});
        // 	} else {
        // 		if ((((to - from) / 2) + from) > value) {
        // 			Global.rangeSlider.rangeFrom({
        // 				id : id,
        // 				value : value
        // 			});
        // 		} else {
        // 			Global.rangeSlider.rangeTo({
        // 				id : id,
        // 				value : value
        // 			});
        // 		}
        // 	}
        // }
    }
    touchFocus(e) {
        const point = e.currentTarget
        const toFrom = point.dataset.range;
        const eType = e.type;
        const point_parent = point.parentNode;
        const uirange = point.closest('.mdl-range');
        const el_to = uirange.querySelector('.mdl-range-inp[data-range="to"]');
        const el_from = uirange.querySelector('.mdl-range-inp[data-range="from"]');
        const el_point_to = point_parent.querySelector('.mdl-range-point[data-range="to"]');
        const el_point_from = point_parent.querySelector('.mdl-range-point[data-range="from"]');

        if (toFrom === 'to') {
            el_point_to.classList.add('on');
            el_point_from.classList.remove('on');
            el_to.classList.add('on');
            el_from.classList.remove('on');
            el_to.focus();

        } else {
            el_point_from.classList.add('on');
            el_point_to.classList.remove('on');
            el_to.classList.remove('on');
            el_from.classList.add('on');
            el_from.focus();
        }	
    }
    inputFocus(e) {
        const point = e.currentTarget
        const toFrom = point.dataset.range;
        const eType = e.type;
        const point_parent = point.parentNode;
        const uirange = point.closest('.mdl-range');
        const el_to = uirange.querySelector('.mdl-range-inp[data-range="to"]');
        const el_from = uirange.querySelector('.mdl-range-inp[data-range="from"]');
        const el_point_to = point_parent.querySelector('.mdl-range-point[data-range="to"]');
        const el_point_from = point_parent.querySelector('.mdl-range-point[data-range="from"]');
        point.removeEventListener('mouseover', Global.rangeSlider.inputFocus);
    
        if (toFrom === 'to') {
            el_to.classList.add('on');
            el_from.classList.remove('on');
            el_to.focus();
            el_to.addEventListener('change', Global.rangeSlider.valuecheck);
            el_point_from.addEventListener('mouseover', Global.rangeSlider.inputFocus);

        } else {
            el_to.classList.remove('on');
            el_from.classList.add('on');
            el_from.focus();
            el_from.addEventListener('change', Global.rangeSlider.valuecheck);
            el_point_to.addEventListener('mouseover', Global.rangeSlider.inputFocus);
        }	
    }
    valuecheck(e){
        const el = e.currentTarget;
        const uirange = el.closest('.mdl-range');
        const el_to = uirange.querySelector('.mdl-range-inp[data-range="to"]');
        const el_from = uirange.querySelector('.mdl-range-inp[data-range="from"]');

        if (el_to.value === el_from.value) {
            uirange.classList.add('same');
        } else {
            uirange.classList.remove('same')
        }
    }
    
    rangeFrom(opt){
        const id = opt.id;
        const v = opt.value;
        const el_range = document.querySelector('.mdl-range[data-id="'+ id +'"]');
        const type = !!opt.type ? opt.type : !!el_range.dataset.type ? el_range.dataset.type : null;
        const el_from = el_range.querySelector('.mdl-range-inp[data-range="from"]');
        const el_to = el_range.querySelector('.mdl-range-inp[data-range="to"]');
        const el_left = el_range.querySelector(".mdl-range-point.left");
        const el_right = el_range.querySelector(".mdl-range-point.right");
        const el_bar = el_range.querySelector(".mdl-range-bar");
        const inp_froms = document.querySelectorAll('[data-from="'+ id +'"]');
        const el_marks = el_range.querySelector('#' + id + '_tickmarks_from');
        const el_marks_to = el_range.querySelector('#' + id + '_tickmarks_to');
        const txtArray = Global.rangeSlider[id].text;
        const txtALen = txtArray.length;
        let percent;
        let min = Number(el_from.min);
        let max = Number(el_from.max);

        if (v !== undefined) {
            el_from.value = v;
        }

        let from_value = +el_from.value;

        if (type !== 'single') {
            if (+el_to.value - from_value < 0) {
                from_value = +el_to.value - 0;
                el_from.value = from_value;
            }

            percent = ((from_value - +min) / (+max - +min)) * 100;

            el_right.classList.remove('on');
            el_to.classList.remove('on');
            el_left.style.left = percent + '%';
            el_bar.style.left = percent + '%';
        } else {
            if (from_value < 0) {
                from_value = 0;
            }
            percent = ((from_value - +min) / (+max - +min)) * 100;
            el_left.style.left = percent + '%';
            el_bar.style.right = (100 - percent) + '%';
        }

        el_left.classList.add('on');
        el_from.classList.add('on');
        
        for (let i = 0, len = inp_froms.length; i < len; i++) {
            const that = inp_froms[i];

            if (that.tagName === 'INPUT') {
                that.value = from_value;
            } else {
                
                if (!!txtArray) {
                    const u = Number(max - min) / (txtALen - 1);
                    
                    for (let j = 0; j < txtALen; j++) {
                        that.textContent = txtArray[j];

                        const v_min = u * j <= 0 ? min : u * j + min;
                        if (from_value <= v_min) {
                            break;
                        }
                    }
                } else {
                    that.textContent = from_value;
                }
            }
        }

        // el_range.dataset.from = from_value;
        el_range.setAttribute('data-from', from_value);	
        if (!!el_to) {
            if (el_to.value === el_from.value) {
                el_range.classList.add('same');
            } else {
                el_range.classList.remove('same')
            }
        }

        if (el_marks) {
            const el_marks_items = el_marks.querySelectorAll('.mdl-range-btn');

            for (let item of el_marks_items) {
                const _v = Number(item.dataset.value);

                if (!item.dataset.to || item.dataset.to === 'false') {
                    item.querySelector('.state').textContent = '';
                }
                item.dataset.from = false;
                item.disabled = false;
                item.removeAttribute('tabindex');
                item.removeAttribute('role');

                if (from_value == _v) {
                    item.dataset.from = true;
                    item.querySelector('.state').textContent = '선택됨';
                } else if (!!el_to && el_to.value < _v) {
                    item.disabled = true;
                    item.setAttribute('tabindex', -1);
                    item.setAttribute('role', 'none');
                }
            }
            if (!!el_to) {
                const el_marks_items = el_marks_to.querySelectorAll('.mdl-range-btn');

                for (let item of el_marks_items) {
                    const _v = Number(item.dataset.value);

                    if (!item.dataset.from || item.dataset.from === 'false') {
                        item.querySelector('.state').textContent = '';
                    } 

                    item.disabled = false;
                    item.dataset.to = false;
                    item.removeAttribute('tabindex');
                    item.removeAttribute('role');
                    if (Number(el_to.value) == _v) {
                        item.dataset.to = true;
                        item.querySelector('.state').textContent = '선택됨';
                    } else if (el_from.value > _v) {
                        item.disabled = true;
                        item.setAttribute('tabindex', -1);
                        item.setAttribute('role', 'none');
                    }
                }
            }
        }
        !!el_to ?
            el_from.setAttribute('aria-label', Global.rangeSlider[id].title + ' 최소 ' + txtArray[el_from.value]):
            el_from.setAttribute('aria-label', Global.rangeSlider[id].title + ' ' + txtArray[el_from.value]);
    }
    rangeTo(opt){
        const id = opt.id;
        const v = opt.value;
        const el_range = document.querySelector('.mdl-range[data-id="'+ id +'"]');
        const el_from = el_range.querySelector('.mdl-range-inp[data-range="from"]');
        const el_to = el_range.querySelector('.mdl-range-inp[data-range="to"]');
        const el_left = el_range.querySelector(".mdl-range-point.left");
        const el_right = el_range.querySelector(".mdl-range-point.right");
        const el_bar = el_range.querySelector(".mdl-range-bar");
        const inp_tos = document.querySelectorAll('[data-to="'+ id +'"]');
        const el_marks = el_range.querySelector('#' + id + '_tickmarks_to');
        const el_marks_from = el_range.querySelector('#' + id + '_tickmarks_from');
        let value = el_to.value;
        let min = Number(el_from.min);
        let max = Number(el_from.max);
        
        const txtArray = Global.rangeSlider[id].text;
        const txtALen = txtArray.length;

        if (v !== undefined) {
            el_to.value = v;
        }

        let to_value = +el_to.value;

        if (+value - +el_from.value < 0) {
            to_value = +el_from.value + 0;
            el_to.value = to_value;
        }
        
        let percent = ((to_value - +min) / (+max - +min)) * 100;

        el_right.classList.add('on');
        el_left.classList.remove('on');
        el_to.classList.add('on');
        el_from.classList.remove('on');
        el_right.style.right = (100 - percent) + '%';
        el_bar.style.right = (100 - percent) + '%';

        for (let i = 0, len = inp_tos.length; i < len; i++) {
            const that = inp_tos[i];

            if (that.tagName === 'INPUT') {
                that.value = el_to.value;
            } else {
                if (!!txtArray) {
                    const u = Number(max - min) / (txtALen - 1);
                    
                    for (let j = 0; j < txtALen; j++) {
                        that.textContent = txtArray[j];

                        const v_min = u * j <= 0 ? min : u * j + min;
                        if (el_to.value <= v_min) {
                            break;
                        }
                    }
                } else {
                    that.textContent = el_to.value;
                }
            }
        }

        // el_range.dataset.to = el_to.value;
        el_range.setAttribute('data-to', el_to.value);

        if (!!el_from) {
            if (el_to.value === el_from.value) {
                el_range.classList.add('same');
            } else {
                el_range.classList.remove('same')
            }
        }
        if (el_marks) {
            const el_marks_items = el_marks.querySelectorAll('.mdl-range-btn');

            for (let item of el_marks_items) {
                const _v = Number(item.dataset.value);

                if (!item.dataset.from || item.dataset.from === 'false') {
                    item.querySelector('.state').textContent = '';
                } 

                item.disabled = false;
                item.dataset.to = false;
                item.removeAttribute('tabindex');
                item.removeAttribute('role');

                if (Number(el_to.value) == _v) {
                    item.dataset.to = true;
                    item.querySelector('.state').textContent = '선택됨';
                } else if (el_from.value > _v) {
                    item.disabled = true;
                    item.setAttribute('tabindex', -1);
                    item.setAttribute('role', 'none');
                }
            }
            if (!!el_from) {
                const el_marks_items = el_marks_from.querySelectorAll('.mdl-range-btn');

                for (let item of el_marks_items) {
                    const _v = Number(item.dataset.value);

                    if (!item.dataset.to || item.dataset.to === 'false') {
                        item.querySelector('.state').textContent = '';
                    }
                    
                    item.dataset.from = false;
                    item.disabled = false;
                    item.removeAttribute('tabindex');
                    item.removeAttribute('role');
                    
                    if (el_from.value == _v) {
                        item.dataset.from = true;
                        item.querySelector('.state').textContent = '선택됨';
                    } else if (!!el_to && el_to.value < _v) {
                        item.disabled = true;
                        item.setAttribute('tabindex', -1);
                        item.setAttribute('role', 'none');
                    }
                }
            }
        }
        el_to.setAttribute('aria-label', Global.rangeSlider[id].title + ' 최대 ' + txtArray[el_to.value]);
    }
}
