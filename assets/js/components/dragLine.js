export default class DragLine {
  /**
   * 선잇기 callback 정보
   * answer_all_sum === answer_current_sum 정답상태
   * @param {number} answer_all_sum 전체정답갯수
   * @param {number} answer_current_sum 현재정답갯수
   * @param {string} answer_current 선택한 답
   * @param {boolean} answer_all_state 전체정오답상태
   * @param {object} answer_last 히스토리
   *
   */
  constructor(opt) {
    this.id = opt.id;
    this.doc = document.documentElement;
    this.wrap = document.querySelector(`[data-line-id="${this.id}"]`);
    this.items = this.wrap.querySelectorAll(
      '[data-line-object], [data-line-target]'
    );
    this.objects = this.wrap.querySelectorAll(`[data-line-object]`);
    this.targets = this.wrap.querySelectorAll(`[data-line-target]`);

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
    this.answer_len = Number(opt.answer);
    this.answer_n = 0;
    this.complete_n = 0;
    this.answer_last = opt.lastAnswer;

    this.callback = opt.callback;
    this.callbackComplete = opt.callbackComplete;
    this.callbackCheck = opt.callbackCheck;
    this.isTouch = window.matchMedia(
      '(hover: none) and (pointer: coarse)'
    ).matches /*'ontouchstart' in document.documentElement*/;
    this.init();
  }

  init() {
    //중복실행방지
    if (this.wrap.dataset.load === 'ok') {
      return false;
    }
    this.wrap.dataset.load = 'ok';

    //svg생성
    this.wrap.insertAdjacentHTML('beforeend', `<svg></svg>`);
    this.svg = this.wrap.querySelector('svg');

    //setup
    const set = () => {
      this.reset(true);

      const rect = this.wrap.getBoundingClientRect();
      this.wrap_t = rect.top;
      this.wrap_l = rect.left;
      this.wrap_w = this.wrap.offsetWidth;
      this.wrap_h = this.wrap.offsetHeight;

      //object점와 target점 크기, 위치 정보 저장
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

    //resize
    const resizeObserver = new ResizeObserver(() => {
      set();
    });
    resizeObserver.observe(this.wrap);

    let firstTouch = {
      state: false,
      item: null,
      line: null,
      x: null,
      y: null,
      is_object: null,
    };
    let moving = false;
    let isObject;

    //선 만들기 시작
    const make_line = e => {
      let el_item = e.type === 'keydown' ? e.target : e.currentTarget;

      //현재 object인가 target인가

      let data_name_object = null;
      let data_name_target = null;
      const data_name = el_item.dataset.name;

      if (isObject) {
        data_name_object = el_item.dataset.name;
      } else {
        data_name_target = el_item.dataset.name;
      }
      const el_rect = el_item.getBoundingClientRect();
      const tag_line = `<line x1="0" x2="0" y1="0" y2="0" data-state="ing" data-name="${data_name}" data-object-name="${data_name_object}" data-target-name="${data_name_target}"></line>`;

      //라인 생성
      if (this.isTouch) {
        if (!firstTouch.state) {
          this.wrap
            .querySelector('svg')
            .insertAdjacentHTML('beforeend', tag_line);
        }
      } else {
        if (!moving) {
          this.wrap
            .querySelector('svg')
            .insertAdjacentHTML('beforeend', tag_line);
        }
      }

      // if (e.type !== 'keydown') document.querySelector('body').classList.add('noScroll');

      //라인전체영역
      this.wrap_t = this.wrap.getBoundingClientRect().top;
      this.wrap_l = this.wrap.getBoundingClientRect().left;
      this.wrap_w = this.wrap.offsetWidth;
      this.wrap_h = this.wrap.offsetHeight;

      //싱글모드, 완료아이템 재선택
      if (this.type === 'single' && el_item.dataset.complete === 'true') {
        el_item.removeAttribute('data-complete');
        const _nn = el_item.dataset.lineObject
          ? el_item.dataset.lineObject
          : el_item.dataset.lineTarget;
        let _nnn;
        let _name;
        let _dot;

        const line_del = this.wrap.querySelector(
          `line[data-name="${data_name}"]`
        );
        const object_name = line_del.dataset.objectName;
        const target_name = line_del.dataset.targetName;
        line_del.remove();

        const _obj = this.wrap.querySelector(
          '[data-name="' + object_name + '"]'
        );
        const _trg = this.wrap.querySelector(
          '[data-name="' + target_name + '"]'
        );
        if (_obj) _obj.setAttribute('aria-label', _obj.dataset.label);
        if (_trg) _trg.setAttribute('aria-label', _trg.dataset.label);

        //target인 경우
        if (el_item.dataset.connect) {
          _name = el_item.dataset.connect;
          el_item.removeAttribute('data-connect');
          _dot = this.wrap.querySelector(`[data-name="${_name}"]`);
        }
        //object인 경우
        else {
          
          _name = data_name;
          _dot = this.wrap.querySelector(`[data-connect="${_name}"]`);
        }

        console.log(el_item,_dot, _name)  
        _dot.removeAttribute('data-connect');
        _dot.removeAttribute('data-complete');
        _nnn = _dot.dataset.lineObject
          ? _dot.dataset.lineObject
          : _dot.dataset.lineTarget;

        if (_nn === _nnn) this.answer_n = this.answer_n - 1;
      }

      el_item.dataset.active = moving ? '' : 'true';

      let el_line = this.svg.querySelector('line[data-state="ing"]');

      if (e.type === 'keydown') {
        const item_w = el_item.offsetWidth / 2;
        const item_h = el_item.offsetHeight / 2;
        const x_value = el_rect.left + item_w - this.wrap_l;
        const y_value = el_rect.top + item_h - this.wrap_t;

        el_line.setAttribute('x1', x_value);
        el_line.setAttribute('y1', y_value);
        el_line.setAttribute('x2', x_value);
        el_line.setAttribute('y2', y_value);
      }
    };

    const actStart = e => {
      let el_item = e.currentTarget;
      let actMove;
      let actEnd;
      let _x;
      let _y;
      isObject = el_item.dataset.lineObject ? true : false;
      make_line(e);

      e.preventDefault();
      
      let is_object = el_item.dataset.lineObject ? true : false;
      let el_line = this.svg.querySelector('line[data-state="ing"]');
      let value = is_object
        ? el_item.dataset.lineObject
        : el_item.dataset.lineTarget;
      const data_name = el_item.dataset.name;


      

      if (this.type === 'single') {

        console.log(is_object), data_name;

        if (is_object) {
          el_line = this.svg.querySelector(
            `line[data-object-name="${data_name}"]`
          );
        } else {
          el_line = this.svg.querySelector(
            `line[data-target-name="${data_name}"]`
          );
        }
      }

      const rect_item = el_item.getBoundingClientRect();
      const item_w = el_item.offsetWidth / 2;
      const item_h = el_item.offsetHeight / 2;
      const x_value = rect_item.left + item_w - this.wrap_l;
      const y_value = rect_item.top + item_h - this.wrap_t;

      actEnd = () => {
        //클릭완료이벤트에 클릭이벤트인경우 클릭완료 설정
        document.querySelector('body').classList.remove('noScroll');
        const v_x = _x - this.wrap_l;
        const v_y = _y - this.wrap_t;
        let is_complete = false;
        let is_answer = false;

        moving = false;
        el_line.dataset.state = 'complete';
        el_item.dataset.active = '';
        firstTouch.state = false;

        for (let item of this.items) {
          const _isObject = item.dataset.lineObject ? true : false;

          //다른그룹일때만
          if (_isObject !== isObject) {
            let is_selected = false;
            let connect_array;

            //완료된아이템여부 확인
            const _is_complete = item.dataset.complete;
            const _value = _isObject
              ? item.dataset.lineObject
              : item.dataset.lineTarget;

            const _rect_item = item.getBoundingClientRect();
            const i_x = Number(item.dataset.x);
            const i_y = Number(item.dataset.y);

            //현재위치가 범위내에 들어와 있는지?
            const if_x =
              v_x <= i_x + item_w && v_x + item_w * 2 >= i_x + item_w;
            const if_y =
              v_y >= i_y - item_h && v_y <= i_y - item_h + item_h * 2;

            //싱글 연결완료조건: 범위내, 미완료
            //멀티 연결완료조건: 범위내
            const if_true =
              this.type === 'single'
                ? if_x && if_y && !_is_complete
                : if_x && if_y;

            //멀티
            //연결된 아이템인 경우에서 서로 이미 연결이 된 경우라면 is_selected true 설정하여 연결실패로 처리
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
            if (if_true && !is_selected) {
              //연결된 아이템 완료상태
              el_item.dataset.complete = true;
              item.dataset.complete = true;

              //완료갯수
              this.complete_n = this.complete_n + 1;

              //연결된 정보 connect 여부에 따른 값설정
              if (!item.dataset.connect) {
                //connect가 없다면
                item.dataset.connect = el_item.dataset.name;
              } else {
                //connect가 있다면 , 추가
                item.dataset.connect =
                  item.dataset.connect + ',' + el_item.dataset.name;
              }
              //연결된 정보
              if (!el_item.dataset.connect) {
                el_item.dataset.connect = item.dataset.name;
              } else {
                el_item.dataset.connect =
                  el_item.dataset.connect + ',' + item.dataset.name;
              }

              //최종 라인종료 위치
              el_line.setAttribute(
                'x2',
                _rect_item.left + item_w - this.wrap_l
              );
              el_line.setAttribute('y2', _rect_item.top + item_h - this.wrap_t);

              if (_isObject) {
                el_line.dataset.objectName = item.dataset.name;
              } else {
                el_line.dataset.targetName = item.dataset.name;
              }

              //접근성 현재 연결된 상황 aria-label
              let object_correct = el_item.dataset.connect;
              object_correct = object_correct.split(',');
              let label_txt = '';
              for (let i = 0; i < object_correct.length; i++) {
                let el = this.wrap.querySelector(
                  '[data-line-target][data-name="' + object_correct[i] + '"]'
                );

                if (!is_object) {
                  el = this.wrap.querySelector(
                    '[data-line-object][data-name="' + object_correct[i] + '"]'
                  );
                }
                if (label_txt !== '') {
                  label_txt = label_txt + ', ' + el.getAttribute('aria-label');
                } else {
                  label_txt = el.getAttribute('aria-label');
                }
              }
              el_item.setAttribute(
                'aria-label',
                `${el_item.dataset.label}와 ${label_txt} 연결됨`
              );
              item.setAttribute(
                'aria-label',
                `${el_item.dataset.label}와 ${label_txt} 연결됨`
              );

              //정오답적용
              const v1 = value.split(',');
              const v2 = _value.split(',');

              //multiple인 경우 정오답
              if (this.type === 'multiple') {
                if (v1.filter(x => v2.includes(x)).length > 0) {
                  el_line.dataset.answer = true;
                  is_answer = true;
                  this.answer_n = this.answer_n + 1;
                } else {
                  el_line.dataset.answer = false;
                  is_answer = false;
                  this.answer_n = this.answer_n - 1;
                }
              }
              //single인 경우 정오답
              else {
                if (value === _value) {
                  el_line.dataset.answer = true;
                  is_answer = true;
                  this.answer_n = this.answer_n + 1;
                } else {
                  el_line.dataset.answer = false;
                  is_answer = false;
                }
              }
              //연결완료성공
              is_complete = true;

              //answer_last 수정일 경우
              if (this.answer_last) {
                for (let i = 0; i < this.answer_last.length; i++) {
                  if (
                    Object.keys(this.answer_last[i]).includes(
                      'key_' + el_item.dataset.name
                    )
                  ) {
                    this.answer_last.splice(i, 1);
                    this.complete_n = this.complete_n - 1;
                  }
                }
              }
              if (is_object) {
                this.answer_last.push({
                  ['key_' + el_item.dataset.name]: el_item.dataset.lineObject,
                  ['key_' + item.dataset.name]: item.dataset.lineTarget,
                  label: el_item.getAttribute('aria-label'),
                });
              } else {
                this.answer_last.push({
                  ['key_' + item.dataset.name]: item.dataset.lineObject,
                  ['key_' + el_item.dataset.name]: el_item.dataset.lineTarget,
                  label: item.getAttribute('aria-label'),
                });
              }
              break;
            }
          }
        }

        //이벤트 취소
        this.doc.removeEventListener('touchmove', actMove);
        this.doc.removeEventListener('touchend', actEnd);
        this.doc.removeEventListener('mousemove', actMove);
        this.doc.removeEventListener('mouseup', actEnd);

        //연결 실패인 경우 라인 삭제 및 이전기록 삭제
        if (!is_complete) {
          const object_name = el_line.dataset.objectName;
          const target_name = el_line.dataset.targetName;

          el_line.remove();
          //answer_last 수정일 경우
          if (this.answer_last) {
            for (let i = 0; i < this.answer_last.length; i++) {
              if (
                Object.keys(this.answer_last[i]).includes(
                  'key_' + el_item.dataset.name
                )
              ) {
                this.answer_last.splice(i, 1);
                this.complete_n = this.complete_n - 1;
                const _obj = this.wrap.querySelector(
                  '[data-name="' + object_name + '"]'
                );
                if (_obj) _obj.setAttribute('aria-label', _obj.dataset.label);
                const _trg = this.wrap.querySelector(
                  '[data-name="' + target_name + '"]'
                );
                if (_trg) _trg.setAttribute('aria-label', _trg.dataset.label);
              }
            }
          }
        }
        if (this.callback) {
          this.callback({
            answer_state: this.answer_n === this.answer_len ? true : false,
            answer_last: this.answer_last,
          });
        }
      };
      actMove = e => {
        e.preventDefault();

        _x = e.clientX ? e.clientX : e.targetTouches[0].clientX;
        _y = e.clientY ? e.clientY : e.targetTouches[0].clientY;
        el_line.setAttribute('x2', _x - this.wrap_l);
        el_line.setAttribute('y2', _y - this.wrap_t);
        if (this.isTouch) {
          this.doc.addEventListener('touchend', actEnd);
        } else {
          this.doc.addEventListener('mouseup', actEnd);
        }

        moving = true;
      };

      if (this.isTouch) {
        if (!firstTouch.state) {
          this.doc.addEventListener('touchmove', actMove, {passive: false});

          firstTouch.state = true;
          firstTouch.item = el_item;
          firstTouch.line = el_line;
          firstTouch.x = x_value;
          firstTouch.y = y_value;
          firstTouch.is_object = is_object;

          el_line.setAttribute('x1', x_value);
          el_line.setAttribute('y1', y_value);
          el_line.setAttribute('x2', x_value);
          el_line.setAttribute('y2', y_value);

          this.doc.addEventListener('touchend', () => {
            if (!moving) this.doc.removeEventListener('touchmove', actMove);
          });
        } else {
          this.doc.removeEventListener('touchmove', actMove);

          firstTouch.state = false;
          firstTouch.item.dataset.active = '';
          el_item.dataset.active = '';
          el_item = firstTouch.item;
          is_object = firstTouch.is_object;
          value = is_object
            ? firstTouch.item.dataset.lineObject
            : firstTouch.item.dataset.lineTarget;
          _x = e.clientX ? e.clientX : e.targetTouches[0].clientX;
          _y = e.clientY ? e.clientY : e.targetTouches[0].clientY;

          actEnd();
        }
      } else {
        if (!moving) {
          this.doc.addEventListener('mousemove', actMove);

          el_line.setAttribute('x1', x_value);
          el_line.setAttribute('y1', y_value);
          el_line.setAttribute('x2', x_value);
          el_line.setAttribute('y2', y_value);
        }
      }
    };

    //keyborad
    const actKey = e => {
      const _this = e.currentTarget;
      const _wrap = _this.parentNode;
      const _this_name = _this.dataset.label;
      let isEnd = false;
      //space key
      if (e.keyCode === 32) {
        make_line(e);
        //셀렉트생성
        let make_select = `<select aria-label="${_this_name} 연결 항목 선택">
        <option>선택하세요</option>`;
        for (const item of this.targets) {
          if (item.dataset.complete !== 'true') {
            make_select += `<option value="
            ${item.dataset.lineTarget}">${item.getAttribute(
              'aria-label'
            )}</option>`;
          } else if (this.type === 'multiple') {
            make_select += `<option value="
            ${item.dataset.lineTarget}">${item.getAttribute(
              'aria-label'
            )}</option>`;
          }
        }
        make_select += `</select>`;
        _wrap.insertAdjacentHTML('beforeend', make_select);

        const el_line = this.svg.querySelector('line[data-state="ing"]');

        //키아웃
        const actKeyout = () => {
          if (_select) _select.remove();
          if (!isEnd) {
            el_line.remove();
          }
        };

        //선택시
        const actSelect = e => {
          isEnd = true;

          const _this_select = e.currentTarget;
          const sel_val = Number(_this_select.value);
          const el_target = this.wrap.querySelector(
            '[data-line-target="' + sel_val + '"]'
          );
          let is_answer = false;

          _select.removeEventListener('change', actSelect);
          el_line.dataset.state = 'complete';
          el_target.dataset.complete = true;
          _this.dataset.active = '';
          _this.dataset.complete = true;
          _this.focus();

          //target 연결된 정보
          if (!el_target.dataset.connect) {
            el_target.dataset.connect = _this.dataset.name;
          } else {
            el_target.dataset.connect =
              el_target.dataset.connect + ',' + _this.dataset.name;
          }

          //object에 연결된 정보
          if (!_this.dataset.connect) {
            _this.dataset.connect = el_target.dataset.name;
          } else {
            _this.dataset.connect =
              _this.dataset.connect + ',' + el_target.dataset.name;
          }

          //최종 라인종료 위치
          const _rect_item = el_target.getBoundingClientRect();
          const item_w = el_target.offsetWidth / 2;
          const item_h = el_target.offsetHeight / 2;
          el_line.setAttribute('x2', _rect_item.left + item_w - this.wrap_l);
          el_line.setAttribute('y2', _rect_item.top + item_h - this.wrap_t);

          //접근성 aria-label
          let object_correct = _this.dataset.connect;
          object_correct = object_correct.split(',');
          let label_txt = '';
          for (let i = 0; i < object_correct.length; i++) {
            const el = this.wrap.querySelector(
              '[data-line-target][data-name="' + object_correct[i] + '"]'
            );
            if (label_txt !== '') {
              label_txt = label_txt + ', ' + el.getAttribute('aria-label');
            } else {
              label_txt = el.getAttribute('aria-label');
            }
          }
          _this.setAttribute(
            'aria-label',
            `${_this.dataset.label}와 ${label_txt} 연결됨`
          );

          //정오답적용
          const value = _this.dataset.lineObject;
          const _value = el_target.dataset.lineTarget;
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

          //콜백정보정리
          this.complete_n = this.complete_n + 1;

          //answer_last 수정일 경우
          if (this.answer_last) {
            for (let i = 0; i < this.answer_last.length; i++) {
              if (
                Object.keys(this.answer_last[i]).includes(
                  'key_' + _this.dataset.name
                )
              ) {
                this.answer_last.splice(i, 1);
                this.complete_n = this.complete_n - 1;
              }
            }
          }

          if (_this.dataset.lineObject) {
            this.answer_last.push({
              ['key_' + _this.dataset.name]: _this.dataset.lineObject,
              ['key_' + el_target.dataset.name]: el_target.dataset.lineTarget,
            });
          } else {
            this.answer_last.push({
              ['key_' + el_target.dataset.name]: el_target.dataset.lineObject,
              ['key_' + _this.dataset.name]: _this.dataset.lineTarget,
            });
          }
          if (this.callback) {

            this.callback({
              answer_state: this.answer_n === this.answer_len ? true : false,
              answer_last: this.answer_last,
            });
          }
        };

        //이벤트
        const _select = _wrap.querySelector('select');
        _select.focus();
        _select.addEventListener('change', actSelect);
        _select.addEventListener('focusout', actKeyout);
      }
    };

    for (const item of this.items) {
      if (this.isTouch) {
        item.addEventListener('touchstart', actStart, {
          passive: false,
        });
      } else {
        item.addEventListener('mousedown', actStart);
        item.addEventListener('keydown', actKey);
      }
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
      item.setAttribute('aria-label', item.dataset.label);
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
        answer_all_sum: this.answer_len,
        answer_current_sum: this.answer_n,
        answer_all_state: this.answer_len === this.answer_n ? true : false,
        answer_last: this.answer_last,
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
      el_object.dataset.connect = el_target.dataset.name;
      el_target.dataset.connect = el_object.dataset.name;
      el_target.dataset.complete = 'true';
      el_object.setAttribute('aria-label', last.label);

      if (last[keyname[0]] === last[keyname[1]]) {
        this.answer_n = this.answer_n + 1;
      }

      this.svg.insertAdjacentHTML(
        'beforeend',
        `<line x1="${el_object.dataset.x}" x2="${el_target.dataset.x}" y1="${el_object.dataset.y}" y2="${el_target.dataset.y}" data-state="complete" data-target-name="${el_target.dataset.name}" data-object-name="${el_object.dataset.name}" data-answer="${last[keyname[0]] === last[keyname[1]] ? true : false}"></line>`
      );
    }
  };
}
