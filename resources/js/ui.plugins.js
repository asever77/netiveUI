//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var $ui = win.$plugins,
		namespace = 'netiveUI.plugins';

	/* ------------------------------------------------------------------------
	* name : table scroll & caption
	* Ver. : v1.0.0
	* date : 2018-12-21
	* EXEC statement
	* - $plugins.uiCaption();
	* - $plugins.uiTblSroll({ option });
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiTblScroll: function (opt) {
			return createUiTblScroll(opt);
		},
		uiCaption: function () {
			return createUiCaption();
		}
	});
	$ui.uiTblScroll.option = {
		selector: '.ui-tblscroll',
		customscroll: false,
		rown: 5
	}
	function createUiTblScroll(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, $ui.uiTblScroll.option, opt),
			$tbl = $(opt.selector),
			rown = opt.rown,
			customscroll = opt.customscroll,
			len = $tbl.length,
			$thead = '',
			$tbody = '',
			h = 0,
			i = 0,
			clone_colgroup,
			clone_thead,
			clone_tbl = '';

		for (i = 0; i < len; i++) {
			$tbl.eq(i).find('.tbl-scroll-thead').remove();
			$tbl.eq(i).find('.tbl-scroll-tbody').removeAttr('style');

			rown = !!$tbl.eq(i).data('row') ? $tbl.eq(i).data('row') : rown,
			$tbody = $tbl.eq(i).find('.tbl-scroll-tbody');
			clone_colgroup = $tbody.find('colgroup').clone();
			clone_thead = $tbody.find('thead tr').clone();
			h = 0;

			clone_tbl += '<div class="tbl-scroll-thead">';
			clone_tbl += '<table class="txt-c" aria-hidden="true" tabindex="-1">';
			clone_tbl += '</table>';
			clone_tbl += '</div>'

			$tbl.eq(i).prepend(clone_tbl);
			clone_tbl = '';
			$tbl.eq(i).find('.tbl-scroll-thead table').append(clone_colgroup);
			$tbl.eq(i).find('.tbl-scroll-thead table').append(clone_thead);
			$thead = $tbl.eq(i).find('.tbl-scroll-thead');
			$thead.find('th').each(function(){
				$(this).replaceWith('<td>'+ $(this).text() +'</td>');
			});

			if ($tbody.find('tbody tr').length > rown) {
				for (var j = 0; j < rown; j++) {
					h = h + $tbody.find('tbody tr').eq(j).outerHeight();
				}
				
				if (customscroll) {
					$tbl.eq(i).removeClass('is-scr');
					$tbody.addClass('ui-scrollbar').find('.tbl-base').addClass('ui-scrollbar-item');
				} else {
					$tbl.eq(i).addClass('is-scr');
					$tbody.removeClass('ui-scrollbar').find('.tbl-base').removeClass('ui-scrollbar-item');
				}
				$tbody.css('max-height', h + 'px');
			}
			customscroll ? $ui.uiScrollBar(): '';
		}
	}
	function createUiCaption(){
		var $cp = $('.ui-caption');

		$cp.text('');
		$cp.each(function(){
			var $table = $(this).closest('table'),
				isthead = !!$table.find('> thead').length,
				$th = $(this).closest('table').find('> tbody th'),
				th_len = $th.length,
				i = 0,
				cp_txt = '';
			if (isthead) {
				$th = $(this).closest('table').find('> thead th');
				th_len = $th.length
			}

			for (i = 0; i < th_len; i++) {
				if ($th.eq(i).text() !== '') {
					cp_txt += $th.eq(i).text();
				}
				if (i < th_len - 1) {
					cp_txt += ', ';
				}
			}
			$(this).text(cp_txt + ' 정보입니다.');
		})
	}


	/* ------------------------------------------------------------------------
	 * slot machine v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiSlot: function (opt) {
			return createUiSlot(opt);
		},
		uiSlotStart: function (opt) {
			return createUiSlotStart(opt);
		},
		uiSlotStop: function (opt) {
			return createUiSlotStop(opt);
		}
	});
	$ui.uiSlot.play = {}
	function createUiSlot(opt){
		if (opt === undefined) {
			return false;
		}
		
		var $slot = $('#' + opt.id),
			current = opt.current === undefined ? 0 : opt.current,
			auto = opt.auto === undefined ? false : opt.auto,
			single = opt.single === undefined ? true : opt.single,
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			item_h = $item.outerHeight(),
			len = $item.length,
			cut, clone;
		
		//common set up
		$slot.data('n', len).data('single', single);
		$item.each(function(i){
			$(this).attr('n', i + 1).data('n', i + 1);
		});
		
		//single or multi set up
		if (single) {
			$wrap.css({ 
				marginTop: 0, 
				top: (current - 1) * item_h * -1
			});
			itemClone({ n: 0, append: true });
		} else {
			$wrap.css({ 
				marginTop: ((item_h/2) + item_h) * -1, 
				top: 0
			});
			if (current - 1 > 0) {
				for(var i = 0; i < current - 1; i++){
					// 2일경우
					if (current - 2 === i) {
						itemClone({ n: i - 1, append: false });
						itemClone({ n: i, append: true });
						itemClone({ n: i + 1, append: true });
						itemClone({ n: i + 2, append: true });
					} else {
						cut = $item.eq(i).detach();
						$wrap.append(cut);
					}
				}
			} else {
				itemClone({ n: - 1, append: false });
				itemClone({ n: - 2, append: false });
				itemClone({ n: current - 1, append: true });
				itemClone({ n: current, append: true });
			}
		}

		function itemClone(opt) {
			//var stickitem = opt.append ? 'append' : 'prepend';
			clone = $item.eq(opt.n).clone().addClass('clone').removeAttr('n');
			$wrap[opt.append ? 'append' : 'prepend'](clone);
		}
		auto ? $ui.uiSlotStart(opt) : '';
	}
	function createUiSlotStart(opt){
		//option guide
		if (opt === undefined) {
			return false;
		}
		var $slot = $('#' + opt.id),
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			single = $slot.data('single'),
			item_h = $item.outerHeight(),
			current = opt.current,
			len = $item.length,
			first_t = item_h * current * -1,
			wrap_h = len * item_h,
			h = 0;
		
		var s = Math.ceil((500 / len) * (len - current));
		
		if (!$slot.data('ing')) {
			$slot.data('ing', true);
			//$ui.uiSlot.play[opt.id] = win.setInterval(steplot, s);
			$wrap.css('top', first_t).stop().animate({
				top: single ? item_h * (len - 1) * -1 : Math.ceil(item_h * (len - 3) * -1)
			},s , 'linear', function(){
				s = 500;
				first_t = 0;
				steplot();
			}) ;
		}
		
		function steplot(){
			$wrap.css('top', 0).stop().animate({
				top: single ? item_h * (len - 1) * -1 : Math.ceil(item_h * (len - 3) * -1)
			},s , 'linear') ;
			
			
			win.clearInterval($ui.uiSlot.play[opt.id]);
			$ui.uiSlot.play[opt.id] = win.setInterval(steplot, s);
		}
	}
	function createUiSlotStop(opt){
		//option guide
		if (opt === undefined) {
			return false;
		}
		
		var $slot = $('#' + opt.id),
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			item_h = $item.outerHeight(),
			len = $item.length,
			
			callback = opt.callback,
			single = $slot.data('single'),
			n = $slot.data('n'),
			result = Math.floor(Math.random() * n) + 1,
			index =  $wrap.find('.ui-slot-item[n="' + result + '"]').index(),
			x = single ? index : index - 2,
			timer, t, s = 500;
		
		$slot.data('ing', false);
		$item.removeClass('selected');
		single ? $wrap.css('margin-top', 0): '';

		clearTimeout(timer);
		timer = setTimeout(function(){
			win.clearInterval($ui.uiSlot.play[opt.id]);
			t = item_h * x * -1;
			
			var ss = Math.ceil((5000 / len) * (len - x));
			$wrap.stop().animate({
				top: t
			}, s, 'easeOutQuad', function(){
				$wrap.find('.ui-slot-item').eq(index).addClass('selected');
				callback(result);
			});
		},10);
	}


	/* ------------------------------------------------------------------------
	 * textarea auto height v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiTextareaAutoHeight: function () {
			return createUiTextareaAutoHeight();
		}
	});
	function createUiTextareaAutoHeight() {
		$('.ui-autoheight').each(function(){
			var n = 1;

			$(this).off('keyup').on('keyup', function(){
				if (!!$plugins.uiHasScrollBar({ selector:$(this) })) {
					n = n + 1;
					$(this).addClass('n' + n);
				}
			});
		});
	}


	/* ------------------------------------------------------------------------
	 * time check
	 * date : 2018-07-28
	 * 출력부분 시간,분,초 세분화 전달필요.
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiTimer: function (opt) {
			return createUiTimer(opt)
		}
	});
	$ui.uiTimer.timerID = '';
	function createUiTimer(opt){
		var timer = '',
			$timer = $('#' + opt.id),
			time = opt.time,
			callback = opt.callback;

		clearInterval($ui.uiTimer.timeID);
		$ui.uiTimer.timeID = setInterval(decrementTime, 1000);

		function decrementTime(){
			$timer.text(toMinSec(time));

			if (time > 0) {
				time--;
			} else {
				clearInterval(win[global.uiTimer.TimerID]);
				callback();
			}
		}
		function toMinSec(t) {
			var hour, min, sec;

			hour = Math.floor(t / 3600);
			min = Math.floor((t - (hour * 3600)) / 60);
			sec = t - (hour * 3600) - (min * 60);
			min < 10 ? min = '0' + min : '';
			sec < 10 ? sec = '0' + sec : '';

			return(min + ':' + sec);
		}
	}



	/* ------------------------------------------------------------------------
	 * error message v1.0 
	 * $plugins.uiError
	 * date : 2018-05-18
	 * 에러 시 메시지 생성 및 스타일 변경
	 * option
	 * - opt.message : 'message text' / [string]
	 * - opt.error : true or false / [string]
	 * - opt.selector : 'id' or $(...) / [strong] or [object]
	 * - opt.wrapper : '...' / [strong]
	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiError: function (opt) {
			return createUiError(opt);
		}
	});
	function createUiError(opt){
		var msg = opt.message, 
			err = opt.error, 
			$this = typeof opt.selector === 'string' ? $('#' + opt.selector) : opt.selector,
			$wrap = opt.wrapper === undefined ? $this.parent() : $this.closest(opt.wrapper),
			id = $this.attr('id'),
			err_html = '<em class="ui-error-msg" aria-hidden="true" id="'+ id +'-error">'+ msg +'</em>';

		//generate error message
		$this.attr('aria-labelledby', id + '-error');

		!$('#'+ id +'-error').length ? $wrap.append(err_html) : $wrap.find('.ui-error-msg').text(msg) ;
		
		//error 여부에 따른 설정
		if (err) {
			$('#'+ id +'-error').attr('aria-hidden', false);
			$wrap.addClass('ui-error-true');
			$this.addClass('ui-error-item');
			$this.closest('.ui-select').addClass('ui-error-select');
		} else {
			$('#'+ id +'-error').attr('aria-hidden', true).remove();
			$wrap.find('.ui-error-item').length === 1 ? $wrap.removeClass('ui-error-true') : '';
			$this.removeClass('ui-error-item');
			$this.closest('.ui-select').removeClass('ui-error-select');
		}
	}




	$ui = $ui.uiNameSpace(namespace, {
		uiScrolling: function (opt) {
			return createUiScrolling(opt);
		},
		uiScrollingAct: function (opt) {
			return createUiScrollingAct(opt);
		},
		uiScrollingGoto: function (opt) {
			return createUiScrollingGoto(opt);
		},
		uiScrollingCancel: function () {
			return createUiScrollingCancel();
		},
		uiScrollingSwitch: function () {
			return createUiScrollingSwitch();
		}
	});
	
	
	$ui.uiScrolling.option = {
		act:true,
		scrollpow: $(win).outerHeight() / 2,
		scrlltime: 400,
		dot_height: 50,
		current: 0,
		callback: false,
		dots: true
	};
	$ui.uiScrolling.ing = false;
	function createUiScrolling(opt) {
		var opt = $.extend(true, {}, $ui.uiScrolling.option, opt),
            $page = $('.ui-pagescroll'),
			$item = $page.find('.ui-pagescroll-item'),
            len = $item.length,
			act = opt.act,
			dots = opt.dots,
			_scrollPow = opt.scrollpow,
			w_h = $(win).outerHeight(),
			dot_h = opt.dot_height,
			current = opt.current,
			callback = opt.callback,
			mTime = opt.scrlltime,
			ing = false,
			nav_html = '';

		//$item.css('min-height', w_h);	
		for (var i = 0; i < len; i++) {
			if (dots) {
				nav_html += '<button type="button" class="ui-pagescroll-dot" aria-label="'+ $item.eq(i).data('title') +'"></button>';
			}

			$item.eq(i).data('minh') === true ? 
			$item.eq(i).css('min-height', w_h) : '';	
		}

		$('body').data('page', current).data('allpage', len);

		if (dots) {
			$('.ui-pagescroll-dot').remove();
			$('.ui-pagescroll-nav').append(nav_html);
			$('.ui-pagescroll-dot').eq(0).css('margin-top', (w_h - (dot_h * len)) / 2);
			$('.ui-pagescroll-dot').eq(current).addClass('selected');

			$('.ui-pagescroll-dot').on('click.dot', function(){
				$('body').data('page', $(this).index());
				$ui.uiScrollingGoto({
					goto: $(this).index() 
				});
			});
		}
		$('.type-mainvisual .item').css('height', w_h);
		
		if (act) {
			$ui.uiScrollingAct({
				goto: Math.round($(win).scrollTop() / w_h ),
				move_time: mTime,
				scrollPow: _scrollPow
			});
		}

		// !!$('body.sub').length && $ui.browser.mobile ? 
		// // $('.ui-pagescroll-item.n2').css('min-height', $(win).outerHeight() - ($('#baseFooter').outerHeight() + 75) ) : '';

		$(doc)
		.off('mousewheel.uiscrolling').on('mousewheel.uiscrolling', _onMouseWheel)
		.off('keydown.uiscrolling').on('keydown.uiscrolling', function(e){
			if (e.keyCode === 34) {
				$('body').data('page', $('body').data('page') + 1);
				$('body').data('page') >= $('body').data('allpage') ? $('body').data('page', $('body').data('allpage')) : '';

				$ui.uiScrollingGoto({
					goto: $('body').data('page')
				});
			} 
			if (e.keyCode === 33) {
				$('body').data('page', $('body').data('page') - 1);
				$('body').data('page') < 0 ? $('body').data('page', 0) : '';

				$ui.uiScrollingGoto({
					goto: $('body').data('page')
				});
			} 
		});
		
		var timer_scroll2,
			tcs = 0;
		
		// $('.ui-pagescroll-item.n1').on('touchstart', function(){
		// 	tcs = $(win).scrollTop();
		// });
		// $('.ui-pagescroll-item.n1').on('touchcancel touchend', function(e){
		// 	if ($ui.browser.mobile) {
		// 		if ($(win).scrollTop() < $(win).outerHeight() && tcs < $(win).scrollTop()) {
		// 			clearTimeout(timer_scroll2);
		// 			timer_scroll2 = setTimeout(function(){
		// 				if ($(win).scrollTop() <  $(win).outerHeight() + ($(win).outerHeight() / 2) ) {
		// 					$ui.uiScroll({ value:$(win).outerHeight(), speed:300  })
		// 				}
		// 			},0);
					
		// 		} else {
		// 			clearTimeout(timer_scroll2);
		// 		}
		// 	}
		// });
		// $(doc).on('click', function(){
		// 	clearTimeout(timer_scroll2);
		// });

		var timer_scroll;
		
		$(win).scroll(function(){
			clearTimeout(timer_scroll);
			timer_scroll = setTimeout(function(){
				$('body').data('page',Math.round($(win).scrollTop() / $(win).outerHeight()) );	
				$('.ui-pagescroll-nav button').removeClass('selected')
				.eq(Math.round($(win).scrollTop() / $(win).outerHeight()))
				.addClass('selected');

				!!callback ? callback($(win).scrollTop() ) : '';
			},30);
		});
		$('body').data('scrolling', 'yes');
		
		function _onMouseWheel (e){
			e.preventDefault();
			// len * w_h > $(window).scrollTop() ? 
			// _scrollPow = w_h : 
			_scrollPow = opt.scrollpow;
			!$ui.uiScrolling.ing ? _smoothScroll(e) : '';
		}
		function _smoothScroll (e) {
			var move_time = mTime,
				delta = -Math.max(-1, Math.min(1, e.originalEvent.wheelDelta));

			$ui.uiScrollingAct({
				delta: delta,
				move_time: move_time,
				scrollPow:_scrollPow,
				len : len
			});
		}
	}
	function createUiScrollingGoto(opt) {
		var n = opt.goto;

		$('.ui-pagescroll-dot').removeClass('selected').eq(n).addClass('selected');
		$('.ui-pagescroll-item').removeClass('selected').eq(n).addClass('selected');

		$("html, body").stop().animate({
			scrollTop: $('.ui-pagescroll-item').eq(n).position().top
		}, 400, 'easeOutQuad', function(){
			setTimeout(function(){
				$ui.uiScrolling.ing = false;
			},100);
		});
		$('body').attr('scrollpage', n);
	}
	function createUiScrollingAct(opt) {
		var _delta = opt.delta,
			_goto = opt.goto,
			_scrollPow = opt.scrollPow,
			_move_time = opt.move_time,
			_len = opt.len,
			w_h = $(win).outerHeight(),
			_tgScroll = $(win).scrollTop() + (_delta * _scrollPow),
			s,
			current;

		$ui.uiScrolling.ing = true;		
		s = Math.round( _tgScroll/ _scrollPow) * _scrollPow;
		s < 0 ? s = 0 : '';
		_goto !== undefined ? s = _scrollPow * _goto : '';

		current = Math.ceil(_tgScroll / w_h);
		_goto !== undefined ? current = _goto : '';
		current < 0 ? current = 0 : '';
		_len <= current ? current = _len - 1 : '';
		$('.ui-pagescroll-dot').removeClass('selected').eq(current).addClass('selected');
		$('.ui-pagescroll-item').removeClass('selected').eq(current).addClass('selected');

		$("html, body").stop().animate({
			scrollTop: s
		}, _move_time, 'easeOutQuad', function(){
			
			setTimeout(function(){
				$ui.uiScrolling.ing = false;
			},100);
		});

		$('body').attr('scrollpage', current);
	}
	function createUiScrollingCancel() {		
		$(document).off("mousewheel.uiscrolling");
		$('body').data('scrolling', 'no');
	}
	function createUiScrollingSwitch(){
		$('body').data('scrolling') === 'yes' ? $ui.uiScrollingCancel(): '';
		$('body').data('scrolling') === 'no' ? $ui.uiScrolling(): '';
	}

	/* 참고용
	* - 태그명 구하기
	* $(this)[0].nodeName.toLowerCase();
	*
	* - string을 function으로 변경하는 방법
	* fn = new Function($sel.data('change'));
	* fn();
	*
	*/

	

	

})(jQuery, window, document);