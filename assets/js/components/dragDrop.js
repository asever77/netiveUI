export default class DrawDrop {
    constructor(opt) {
      this.id = opt.id;
      this.answer = opt.answer;
      this.callback = opt.callback;
      this.callbackComplete = opt.callbackComplete;
  
      this.wrap = document.querySelector('[data-drag-id="' + this.id + '"]');
      this.doc = this.wrap;
      this.type = this.wrap.dataset.type;
      this.drag_objects = this.wrap.querySelectorAll('[data-drag-object]');
      this.drag_targets = this.wrap.querySelectorAll('[data-drag-target]');
      this.drag_items = this.wrap.querySelectorAll('[data-drag-item="object"]');
  
      this.array_target = [];
      this.array_items = [];
      this.el_scroll = document.querySelector('body');
      // this.el_scroll = document.querySelector('.innerContsScroll');
  
      this.wrap_rect = this.wrap.getBoundingClientRect();
      this.wrap_t = this.wrap_rect.top;
      this.wrap_l = this.wrap_rect.left;
  
      this.group_target = this.wrap.querySelector('[data-drag-group="target"]');
      if (this.group_target) {
        this.group_target_rect = this.group_target.getBoundingClientRect();
        this.group_target_t = this.group_target_rect.top;
        this.group_target_l = this.group_target_rect.left;
      }
  
      this.group_object = this.wrap.querySelector('[data-drag-group="object"]');
      if (this.group_object) {
        this.group_object_rect = this.group_object.getBoundingClientRect();
        this.group_object_t = this.group_object_rect.top;
        this.group_object_l = this.group_object_rect.left;
      }
      this.reset_data = [];
      this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
      this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;
      this.isTouch = 'ontouchstart' in document.documentElement;
      this.complete_n = 0;
      this.answer_n = 0;
  
      this.init();
    }
  
    init() {
      const set = () => {
        this.wrap_rect = this.wrap.getBoundingClientRect();
        this.wrap_t = this.wrap_rect.top;
        this.wrap_l = this.wrap_rect.left;
  
        this.array_target = [];
        this.drag_targets = this.wrap.querySelectorAll('[data-drag-target]');
  
        if (this.drag_targets) {
          for (let item of this.drag_targets) {
            const rect = item.getBoundingClientRect();
            this.array_target.push({
              name: item.dataset.dragTarget,
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
  
        this.array_items = [];
        this.drag_items = this.wrap.querySelectorAll('[data-drag-item]');
        if (this.drag_items) {
          for (let item of this.drag_items) {
            const rect = item.getBoundingClientRect();
            this.array_items.push({
              name: item.dataset.value,
              width: rect.width,
              height: rect.height,
              top: rect.top,
              left: rect.left,
              x: rect.x,
              y: rect.y,
              rangeX: [rect.left, rect.left + rect.width],
              rangeY: [rect.top, rect.top + rect.height],
            });
            this.reset_data.push(
              item.querySelector('[data-drag-object').dataset.dragObject
            );
          }
        }
      };
      set();
  
      const resizeObserver = new ResizeObserver(() => {
        set();
      });
      resizeObserver.observe(this.wrap);
  
      const actCalc = (v, w) => {
        let n = this[v];
        n = w === '-' ? n - 1 : w === '+' ? n + 1 : n;
        if (n < 0) n = 0;
        this[v] = n;
        // return v = n;
      };
  
      //clone drag
      const actStartClone = e => {
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
          m_x = _x - rect_area.left - rect_this.width / 2;
          m_y = _y - rect_area.top - rect_this.height / 2;
        } else {
          m_x = _x - rect_area.left - rect_this.width / 2;
          m_y = _y - rect_area.top - rect_this.height / 2;
        }
  
        el_this.style.transform = 'translate(' + m_x + 'px, ' + m_y + 'px)';
  
        const actEnd = () => {
          const e_x = _x;
          const e_y = _y;
          let is_range;
          let is_name;
  
          this.el_scroll.dataset.pagescroll = 'auto';
          el_this.classList.remove('active');
  
          for (let i = 0, len = this.array_target.length; i < len; i++) {
            const is_x =
              this.array_target[i].rangeX[0] - this.win_x < e_x &&
              this.array_target[i].rangeX[1] - this.win_x > e_x;
            const is_y =
              this.array_target[i].rangeY[0] - this.win_y < e_y &&
              this.array_target[i].rangeY[1] - this.win_y > e_y;
  
            if (is_x && is_y) {
              is_range = true;
              is_name = this.array_target[i].name;
              m_x =
                _x - this.array_target[i].left - rect_this.width / 2 + this.win_x;
              m_y =
                _y - this.array_target[i].top - rect_this.height / 2 + this.win_y;
  
              break;
            } else {
              is_range = false;
            }
          }
  
          if (is_range) {
            const current_area = el_wrap.querySelector(
              '[data-drag-target="' + is_name + '"]'
            );
            const limit = Number(current_area.dataset.limit);
            const current_area_drops =
              current_area.querySelectorAll('[data-drag-object]');
            const n = current_area_drops.length;
            const area_in_clone = el_this;
  
            const act = () => {
              area_in_clone.dataset.dragState = 'complete';
              area_in_clone.style.transform =
                'translate(' + m_x + 'px, ' + m_y + 'px)';
              current_area.insertAdjacentElement('beforeend', area_in_clone);
  
              let is_name_array = is_name.split(',');
              let is_state = false;
              for (let key in is_name_array) {
                if (data_name === is_name_array[key]) {
                  is_state = true;
                  actCalc('answer_n', '+');
                  break;
                }
              }
  
              if (this.callback) {
                this.callback({
                  name: data_name,
                  state: is_state,
                });
              }
            };
  
            if (area_name !== is_name) {
              el_this.remove();
            } else {
              area_in_clone.dataset.dragState = 'complete';
            }
  
            if (limit !== n) {
              act();
            } else {
              if (area_name !== is_name) {
                if (limit === 1) {
                  const _el_clone =
                    current_area.querySelector('[data-drag-object]');
                  el_this_area.insertAdjacentElement('beforeend', _el_clone);
                  act();
                } else {
                  actCalc('complete_n', '-');
                  el_wrap
                    .querySelector(
                      '.disabled[data-drag-object="' + data_name + '"]'
                    )
                    .classList.remove('disabled');
  
                  if (data_name === is_name) {
                    actCalc('answer_n', '+');
                  } else {
                    actCalc('answer_n', '-');
                  }
                }
              }
            }
  
            el_this.addEventListener('mousedown', actStartClone);
            el_this.addEventListener('touchstart', actStartClone, {
              passive: true,
            });
          } else {
            const _disabled_drop = el_wrap.querySelector(
              '.disabled[data-drag-object="' + el_this.dataset.dragObject + '"]'
            );
  
            _disabled_drop.classList.remove('disabled');
            actCalc('complete_n', '-');
            actCalc('answer_n', '-');
  
            el_this.remove();
  
            // for (let item2 of _disabled_drops) {
            //     item2.classList.remove('disabled');
            // }
          }
  
          const n_clone =
            el_this_area.querySelectorAll('[data-drag-object').length;
          el_this_area.dataset.empty = n_clone > 0 ? true : false;
  
          this.doc.removeEventListener('mousemove', actMove);
          this.doc.removeEventListener('mouseup', actEnd);
          this.doc.removeEventListener('touchmove', actMove);
          this.doc.removeEventListener('touchend', actEnd);
        };
  
        const actMove = e => {
          _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
          _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;
  
          if (getComputedStyle(el_this_area).display !== 'flex') {
            m_x = _x - rect_area.left - rect_this.width / 2;
            m_y = _y - rect_area.top - rect_this.height / 2;
          } else {
            m_x = _x - rect_area.left - rect_this.width / 2;
            m_y = _y - rect_area.top - rect_this.height / 2;
          }
  
          el_this.style.transform = 'translate(' + m_x + 'px, ' + m_y + 'px)';
        };
  
        this.doc.addEventListener('mousemove', actMove);
        this.doc.addEventListener('mouseup', actEnd);
        this.doc.addEventListener('touchmove', actMove);
        this.doc.addEventListener('touchend', actEnd);
      };
  
      //original drag
      const actStart = e => {
        const el_this = e.currentTarget;
        const el_item = el_this.parentNode;
        const el_wrap = el_this.closest('[data-drag-group]');
        const rect_this = el_this.getBoundingClientRect();
        const rect_item = el_item.getBoundingClientRect();
  
        const el_clone = el_this.cloneNode(true);
        const data_copy = el_this.dataset.dragCopy
          ? el_this.dataset.dragCopy
          : false;
        const data_name = el_this.dataset.dragObject;
  
        this.el_scroll.dataset.pagescroll = 'hidden';
  
        //object를 복사타입으로 계속 사용안하는 경우 원본 disabled로 접근방지
        if (data_copy === false || !data_copy || !data_copy === 'false') {
          el_this.classList.add('disabled');
        }
        el_clone.dataset.dragType = 'clone';
        el_clone.classList.add('active');
        el_item.insertAdjacentElement('beforeend', el_clone);
  
        this.win_y = this.el_scroll ? this.el_scroll.scrollTop : window.scrollY;
        this.win_x = this.el_scroll ? this.el_scroll.scrollLeft : window.scrollX;
        this.wrap_rect = this.wrap.getBoundingClientRect();
        this.wrap_t = this.wrap_rect.top + this.win_y;
        this.wrap_l = this.wrap_rect.left + this.win_x;
  
        let _x = this.isTouch ? e.targetTouches[0].clientX : e.clientX;
        let _y = this.isTouch ? e.targetTouches[0].clientY : e.clientY;
        let m_y;
        let m_x;
        
  
        m_y =
          _y + this.win_y - (rect_item.top + this.win_y) - rect_this.height / 2;
        m_x =
          _x + this.win_x - (rect_item.left + this.win_x) - rect_this.width / 2;

        const s_x = m_x;
        const y_x = m_y;

        console.log('S', _x, m_x);
  
        el_clone.style.transform = `translate(${m_x}px, ${m_y}px)`;
        el_clone.style.maxWidth = rect_this.width + 'px';

  
        const actEnd = () => {
          const e_x = m_x + rect_item.left + this.win_x + rect_this.width / 2;
          const e_y = m_y + rect_item.top + this.win_y + rect_this.height / 2;
  
          let is_range;
          let is_range_obj;
          let is_name;
  
          this.el_scroll.dataset.pagescroll = 'auto';
          el_clone.classList.remove('active');
  
          //영역안에 들어가는지 체크 is_range
          for (let i = 0, len = this.array_target.length; i < len; i++) {
            const is_x =
              this.array_target[i].rangeX[0] < e_x &&
              this.array_target[i].rangeX[1] > e_x;
            const is_y =
              this.array_target[i].rangeY[0] < e_y &&
              this.array_target[i].rangeY[1] > e_y;
  
            if (is_x && is_y) {
              is_range = true;
              is_name = this.array_target[i].name;
              break;
            } else {
              is_range = false;
            }
          }
  
          //영역안에 들어가는 복제아이템 들어가기
          if (is_range) {
            const current_area = this.wrap.querySelector(
              '[data-drag-target="' + is_name + '"]'
            );
            const limit = Number(current_area.dataset.limit);
            const current_area_drops =
              current_area.querySelectorAll('[data-drag-object]');
            const n = current_area_drops.length;
            const area_in_clone = el_clone;
            el_clone.remove();
  
            const act = () => {
              area_in_clone.dataset.dragState = 'complete';
              current_area.insertAdjacentElement('beforeend', area_in_clone);
              area_in_clone.getBoundingClientRect();
              actCalc('complete_n', '+');
  
              let is_name_array = is_name.split(',');
              let is_state = false;
              for (let key in is_name_array) {
                if (data_name === is_name_array[key]) {
                  is_state = true;
                  actCalc('answer_n', '+');
                  break;
                }
              }
              const translate_left =
                e_x -
                current_area.getBoundingClientRect().left -
                this.win_x -
                area_in_clone.getBoundingClientRect().width / 2;
              const translate_top =
                e_y -
                current_area.getBoundingClientRect().top -
                this.win_y -
                area_in_clone.getBoundingClientRect().height / 2;
              area_in_clone.style.transform = `translate(${translate_left}px, ${translate_top}px)`;
  
              if (this.callback) {
                this.callback({
                  name: data_name,
                  state: is_state,
                });
              }
            };
  
            if (limit === n) {
              if (limit === 1) {
                const __name =
                  current_area.querySelector('[data-drag-object]').dataset
                    .dragObject;
                current_area.querySelector('[data-drag-object]').remove();
                const __drop = el_wrap.querySelector(
                  '[data-drag-object="' + __name + '"]'
                );
                __drop.classList.remove('disabled');
                act();
                actCalc('complete_n', '-');
              } else {
                el_this.classList.remove('disabled');
              }
            } else {
              act();
            }
  
            const area_drops =
              current_area.querySelectorAll('[data-drag-object]');
  
            for (let item of area_drops) {
              item.addEventListener('mousedown', actStartClone);
              item.addEventListener('touchstart', actStartClone, {
                passive: true,
              });
            }
          } else {
            if (el_this.dataset.copy !== 'true') {
              for (let i = 0, len = this.array_items.length; i < len; i++) {
                const is_x =
                  this.array_items[i].rangeX[0] < e_x &&
                  this.array_items[i].rangeX[1] > e_x;
                const is_y =
                  this.array_items[i].rangeY[0] < e_y &&
                  this.array_items[i].rangeY[1] > e_y;
  
                if (is_x && is_y) {
                  is_range_obj = true;
                  is_name = this.array_items[i].name;
                  break;
                } else {
                  is_range_obj = false;
                }
              }
  
              if (is_range_obj) {
                const native_item = this.wrap.querySelector(
                  '[data-drag-item="object"][data-value="' + is_name + '"]'
                );
                const native_obj =
                  native_item.querySelector('[data-drag-object]');
                el_item.insertAdjacentElement('beforeend', native_obj);
                native_item.insertAdjacentElement('beforeend', el_this);
              }
            }
  
            el_clone.remove();
            el_this.classList.remove('disabled');
          }
  
          if (is_name) {
            const _current_area = this.wrap.querySelector(
              '[data-drag-target="' + is_name + '"]'
            );
            if (_current_area) {
              const n_clone =
                _current_area.querySelectorAll('[data-drag-object]').length;
              _current_area.dataset.empty = n_clone > 0 ? true : false;
            }
          }
  
          this.doc.removeEventListener('mousemove', actMove);
          this.doc.removeEventListener('mouseup', actEnd);
          this.doc.removeEventListener('touchmove', actMove);
          this.doc.removeEventListener('touchend', actEnd);
        };
  
        const actMove = e => {
          _x = !!e.clientX ? e.clientX : e.targetTouches[0].clientX;
          _y = !!e.clientY ? e.clientY : e.targetTouches[0].clientY;

          m_y = _y + this.win_y - (rect_item.top + this.win_y) - rect_this.height / 2;
          m_x = _x + this.win_x - (rect_item.left + this.win_x) - rect_this.width / 2;
  

           

          el_clone.style.transform = 'translate(' + m_x + 'px, ' + m_y + 'px)';
        };
  
        this.doc.addEventListener('mousemove', actMove);
        this.doc.addEventListener('mouseup', actEnd);
        this.doc.addEventListener('touchmove', actMove);
        this.doc.addEventListener('touchend', actEnd);
      };
  
      for (let item of this.drag_objects) {
        item.addEventListener('mousedown', actStart);
        item.addEventListener('touchstart', actStart, { passive: true });
      }
    }
  
    reset() {
      for (let i = 0, len = this.answer_len; i < len; i++) {
        this.answer[i].state = false;
      }
      for (let item of this.drag_targets) {
        const drops = item.querySelectorAll('[data-drag-object]');
        item.removeAttribute('data-state');
        item.dataset.empty = '';
        for (let drop of drops) {
          drop.remove();
        }
      }
      for (let i = 0; i < this.drag_items.length; i++) {
        const _object = this.wrap.querySelector(
          '[data-drag-object="' + this.reset_data[i] + '"'
        );
        this.drag_items[i].insertAdjacentElement('beforeend', _object);
      }
      for (let item of this.drag_objects) {
        item.classList.remove('disabled');
      }
      this.wrap.removeAttribute('data-state');
      this.complete_n = 0;
      this.answer_n = 0;
    }
    check() {
      let answer_n = 0;
      let answer_total = 0;
  
      if (this.drag_targets.length > 0) {
        for (let i = 0; i < this.drag_targets.length; i++) {
          const answer = this.drag_targets[i].dataset.dragTarget;
          const objs =
            this.drag_targets[i].querySelectorAll('[data-drag-object]');
          let objs_array = [];
  
          for (let item of objs) {
            objs_array.push(item.dataset.dragObject);
          }
  
          let answer_array = answer.split(',');
  
          for (let key in answer_array) {
            if (objs_array[key] === answer_array[key]) {
              answer_n = answer_n + 1;
            }
            answer_total = answer_total + 1;
          }
        }
      } else {
        for (let i = 0; i < this.drag_items.length; i++) {
          const value = this.drag_items[i].dataset.value;
          const _object = this.drag_items[i].querySelector('[data-drag-object]');
          if (value === _object.dataset.dragObject) {
            answer_n = answer_n + 1;
          }
          answer_total = answer_total + 1;
        }
      }
      if (this.callbackComplete) {
        this.callbackComplete({
          answer_total: answer_total,
          answer_n: answer_n,
          state: answer_n === answer_total ? true : false,
          percent: (answer_n / answer_total) * 100,
        });
      }
    }
    complete() {
      this.reset();
  
      if (this.drag_targets.length > 0) {
        for (let item of this.drag_targets) {
          const name = item.dataset.dragTarget;
          let el_object;
  
          let is_name_array = name.split(',');
          for (let key in is_name_array) {
            el_object = this.wrap.querySelector(
              '[data-drag-object="' + is_name_array[key] + '"]'
            );
  
            const el_clone = el_object.cloneNode(true);
  
            el_object.classList.add('disabled');
            this.wrap.dataset.state = 'complete';
            el_clone.dataset.dragState = 'complete';
            item.insertAdjacentElement('beforeend', el_clone);
            item.dataset.empty = true;
          }
        }
      } else {
        for (let item of this.drag_items) {
          const name = item.dataset.value;
          const _object = this.wrap.querySelector(
            '[data-drag-object="' + name + '"'
          );
          item.insertAdjacentElement('beforeend', _object);
          _object.dataset.dragState = 'complete';
        }
        this.wrap.dataset.state = 'complete';
      }
    }
  }
  