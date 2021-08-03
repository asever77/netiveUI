;(function($, win, doc, undefined) {

	'use strict';
	
	netive.common = {
		init: function(){
			var fristHref = '/netiveUI/html/start/introduction.html';

			if (!!netive.para.get('page')) {
				switch(netive.para.get('page')) {
					case 'introduction' :
						fristHref = '/netiveUI/html/start/introduction.html';
						break;
					case 'typography' :
						fristHref = '/netiveUI/html/start/typography.html';
						break;
					case 'color' :
						fristHref = '/netiveUI/html/start/color.html';
						break;
					case 'device' :
						fristHref = '/netiveUI/html/start/device.html';
						break;
					case 'margin' :
						fristHref = '/netiveUI/html/start/margin.html';
						break;
					case 'naming' :
						fristHref = '/netiveUI/html/start/naming.html';
						break;
					case 'placeholder' :
						fristHref = '/netiveUI/html/start/placeholder.html';
						break;
					case 'units' :
						fristHref = '/netiveUI/html/start/units.html';
						break;

					case 'bulletList' :
						fristHref = '/netiveUI/html/contents/bulletList.html';
						break;
					case 'table' :
						fristHref = '/netiveUI/html/contents/table.html';
						break;
					case 'inputFormat' :
						fristHref = '/netiveUI/html/contents/inputFormat.html';
						break;
					case 'inputPlaceholder' :
						fristHref = '/netiveUI/html/components/inputPlaceholder.html';
						break;

					case 'accordion' :
						fristHref = '/netiveUI/html/components/accordion.html';
						break;
					case 'brickList' :
						fristHref = '/netiveUI/html/components/brickList.html';
						break;
					case 'draggable' :
						console.log('draggable');
						fristHref = '/netiveUI/html/components/draggable.html';
						break;
					case 'dropdown' :
						fristHref = '/netiveUI/html/components/dropdown.html';
						break;
					case 'floating' :
						fristHref = '/netiveUI/html/components/floating.html';
						break;
					case 'floatingRange' :
						fristHref = '/netiveUI/html/components/floatingRange.html';
						break;
					case 'modal' :
						fristHref = '/netiveUI/html/components/modal.html';
						break;
					case 'scrollBar' :
						fristHref = '/netiveUI/html/components/scrollBar.html';
						break;
					case 'parallax' :
						fristHref = '/netiveUI/html/components/parallax.html';
						break;
					case 'popupBook' :
						fristHref = '/netiveUI/html/components/popupBook.html';
						break;
					case 'loading' :
						fristHref = '/netiveUI/html/components/loading.html';
						break;
					case 'tab' :
						fristHref = '/netiveUI/html/components/tab.html';
						break;
					case 'tableCaption' :
						fristHref = '/netiveUI/html/components/tableCaption.html';
						break;
					case 'tableCellFix' :
						fristHref = '/netiveUI/html/components/tableCellFix.html';
						break;
					case 'tableScroll' :
						fristHref = '/netiveUI/html/components/tableScroll.html';
						break;
					case 'print' :
						fristHref = '/netiveUI/html/components/print.html';
						break;
					case 'popup' :
						fristHref = '/netiveUI/html/components/popup.html';
						break;
					case 'tooltip' :
						fristHref = '/netiveUI/html/components/tooltip.html';
						break;
					case 'datePicker' :
						fristHref = '/netiveUI/html/components/datePicker.html';
						break;
					case 'inputClear' :
						fristHref = '/netiveUI/html/components/inputClear.html';
						break;
					case 'select' :
						fristHref = '/netiveUI/html/components/select.html';
						break;
					case 'innerLabel' :
						fristHref = '/netiveUI/html/components/innerLabel.html';
						break;
					case 'scrollMove' :
						fristHref = '/netiveUI/html/components/scrollMove.html';
						break;
					case 'countNumber' :
						fristHref = '/netiveUI/html/components/countNumber.html';
						break;

					case 'layout' :
						fristHref = '/netiveUI/html/contents/layout.html';
						break;
					case 'button' :
						fristHref = '/netiveUI/html/contents/button.html';
						break;
					case 'jsonCodingList' :
						fristHref = '/netiveUI/html/components/jsonCodingList.html';
						break;
					case 'fileUpload' :
						fristHref = '/netiveUI/html/components/fileUpload.html';
						break;
					case 'slider' :
						fristHref = '/netiveUI/html/components/range.html';
						break;
					case 'issue' :
						fristHref = '/netiveUI/html/memory/issue.html';
						break;
				   
				}
			} 

			netive.ajax.init({ 
				selector: $('.base-header'), 
				url:'/netiveUI/html/inc/header.html', 
				page:true, 
				callback:netive.common.header 
			});
			netive.ajax.init({ 
				selector: $('base-footer'), 
				url:'/netiveUI/html/inc/footer.html', 
				page:true
			});
			netive.ajax.init({ 
				selector: $('.base-main'), 
				url: fristHref, 
				page: true, 
				effect: true,
				callback: function(){
					$(win).off('scroll.win');
					netive.common.pageInit(fristHref);
					netive.common.settingAside();
 					
					// $(doc).find('.base-wrap').find('button, a').on('click', function(){
					// 	var $this = $(this); 
					// 	(!$this.closest('.ui-modal').length || $this.hasClass('.ui-modal')) && $('body').data('active', $this);
					// });
					
				}
			});

			
			
			// netive.ajax.init({ 
			//	 id:'baseFooter', 
			//	 url:'/netiveUI/html/inc/footer.html', 
			//	 page:true, 
			//	 callback:netive.common.footer 
			// });
			
			console.log('------------------------------------------------------')

			netive.table.caption();
			netive.form.init();
		},
		gridSwitch: function(){
			var $grid = $('.base-grid');

			(!$grid.hasClass('on')) ? $grid.addClass('on') : $grid.removeClass('on');

		},
		header: function(){
			console.log('header load');
			netive.accordion.init({ 
				id: 'exeLNB', 
				current: 'all', 
				autoclose: false
			});
			netive.common.menuAjax();

			$('.ui-nav').on('click', netive.common.navOpen);
			document.querySelector('.btn-mode').addEventListener('click', function() {
				document.querySelector('html').classList.toggle('dark-mode');
			});
		},
		navOpen: function(){
			var $body = $('body');

			if (!$body.hasClass('nav-open')) {
				$body.addClass('nav-open')
			} else {
				$body.removeClass('nav-open')
			}
			
		},
		settingAside: function(){
			var $aside = $('.base-aside'),
				$main = $('.base-main'),
				$h2 = $main.find('.h-2');

			var asideUl = '<ul>';
			
			if (!!$aside.find('ul')){
				var delAside = $aside.find('ul');
				delAside.remove();
			}

			asideUl += '<li><a href="#">Top</a></li>'; 
			$h2.each(function(i){
				$(this).attr('id', 'pageTit' + i);
				asideUl += '<li><a href="#pageTit'+ i +'">'+ $(this).text() +'</a></li>';				
			});
			asideUl += '</ul>';
			$aside.append(asideUl);
		},
		pageInit: function(v){
			var jsName = null;

			if (!!doc.querySelector('#uiJsName')) {
				jsName = doc.querySelector('#uiJsName').value;
				netive.page[jsName]();
			}

			if(typeof(history.pushState) == 'function') {
				var renewURL = location.href;
				
				renewURL = renewURL.replace(/\&page=([0-9]+)/ig,'');
				renewURL = renewURL.split('/netiveUI/');
				renewURL = renewURL[0];
				renewURL = renewURL + v;

				var paraUrl = v.split('.'),
					paraUrl = paraUrl[0].split('/'),
					paraUrl = paraUrl[paraUrl.length - 1];

				var indexUrl = '/netiveUI/html/index.html?page=' + paraUrl;
   
				history.pushState(false, 'loading', indexUrl);
				
			}
			if(document.currentScript === undefined){
				// IE 에서만 돌아갈 내용
			} else {
				// IE 가 아닐 때 돌아갈 내용
				hljs.configure({tabReplace: " "});
				hljs.initHighlighting();
			}
			

			//hljs.initHighlighting();
			//hljs.highlightAll();
			

			// console.log(v.split('.html'), !!doc.querySelector('#uiPageJS'));
			// if (!doc.querySelector('#uiPageJS')) {
			//	  var del = doc.querySelector('#uiPageJS');
			//	 del.parentNode.removeChild(del);
			// }

			// var jsSrc = v.split('.html'),
			//	 jsSrc = jsSrc[0] + '.js',
			//	 script = document.createElement('script'),
			//	 element = document.getElementsByTagName('body')[0]; 

			// script.src = jsSrc; 
			// script.id = 'uiPageJS'
			// script.async = true; 
			// script.defer = true; 
			// (typeof element === 'undefined' ? document.getElementsByTagName('html')[0] : element).appendChild(script);
			
			
		},

		menuAjax: function(){
			$('.dep-2-btn').off('click.ajax').on('click.ajax', function(){
				var href = this.getAttribute('data-href');
				!!$('body').hasClass('nav-open') && netive.common.navOpen();
				netive.ajax.init({ 
					selector: $('.base-main'), 
					url: href, 
					page: true, 
					effect: true,
					callback: function(v){
						netive.scroll.move({ 
							value:0, 
							speed:0, 
							focus:  $('.base-main h1').eq(0)
						});
						
						$(win).off('scroll.win');
						netive.common.pageInit(href);
						netive.common.settingAside();
						
						// document.addEventListener('DOMContentLoaded', (event) => {
						// 	document.querySelectorAll('pre code').forEach((el) => {
						// 		alert(1);
						// 	  hljs.highlightElement(el);
						// 	});
						//   });

						
						
					}
				});
			});

			
		},
		footer: function(){
			console.log('footer load');
		}
	};

	//modal
	

	//page 
	netive.page = {}

	//callback
	netive.callback = {
		modal: function(modalId){
			switch(modalId) {
				case 'modalID':
					break;  

					
			}
		}
	}
   
	// $(doc).ready(function() {
	//	 var timer,
	//		 n = 0;

	//	 pageCodeIs();
		
	//	 function pageCodeIs(){
	//		 console.log('common.js ready?')
	//		 if (netive.common.pageid === undefined && n < 10) {
	//			 n = n + 1;
	//			 delayExe();
	//		 } else {
	//			 console.log('common.js ok')
	//			 clearTimeout(timer);
	//			 netive.common.init();
	//			 $('body').stop().animate({
	//				 opacity:1
	//			 }, 150);
	//		 }
	//	 }
	//	 function delayExe(){
	//		 clearTimeout(timer);
	//		 timer = setTimeout(function() {
	//			 console.log('common.js no')
	//			 pageCodeIs();
	//		 }, 0);
	//	 }
	// });
})(jQuery, window, document);
