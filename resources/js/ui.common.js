;(function(win, doc, undefined) {

	'use strict';
	
	netive.common = {
		init: function(){
			let fristHref = '/netiveUI/html/start/introduction.html';

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
					case 'toast' :
						fristHref = '/netiveUI/html/components/toast.html';
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
					case 'range' :
						fristHref = '/netiveUI/html/components/range.html';
						break;
					case 'slide' :
						fristHref = '/netiveUI/html/components/slide.html';
						break;
					case 'slot' :
						fristHref = '/netiveUI/html/components/slot.html';
						break;
					case 'issue' :
						fristHref = '/netiveUI/html/memory/issue.html';
						break;
				   
				}
			} 

			netive.ajax.init({ 
				area: document.querySelector('.base-header'), 
				url:'/netiveUI/html/inc/header.html', 
				page:true, 
				callback:netive.common.header 
			});
			netive.ajax.init({ 
				area: document.querySelector('.base-footer'), 
				url:'/netiveUI/html/inc/footer.html', 
				page:true
			});
			netive.ajax.init({ 
				area: document.querySelector('.base-main'), 
				url: fristHref, 
				page: true, 
				effect: true,
				callback: function(){
					netive.common.pageInit(fristHref);
					netive.common.settingAside();
				}
			});

			console.log('------------------------------------------------------')

			netive.table.caption();
			netive.form.init();
		},
		gridSwitch: function(){
			const el_grid = document.querySelector('.base-grid');

			el_grid.classList.toggle('on');
		},
		header: function(){
			console.log('header load');
			netive.accordion.init({ 
				id: 'exeLNB', 
				current: 'all', 
				autoclose: false
			});
			netive.common.menuAjax();

			doc.querySelector('.ui-nav').addEventListener('click', netive.common.toggleNav);
			document.querySelector('.btn-mode').addEventListener('click', netive.common.toggleMode);
		},
		toggleMode: function(){
			document.querySelector('html').classList.toggle('dark-mode');
		},
		toggleNav: function(){
			doc.querySelector('body').classList.toggle('nav-open');
		},
		settingAside: function(){
			const el_aside = doc.querySelector('.base-aside');
			const el_main = doc.querySelector('.base-main');
			const el_h2s = el_main.querySelectorAll('.h-2');

			let asideUl = '<ul>';
			
			if (!!el_aside.querySelector('ul')){
				el_aside.querySelector('ul').remove();
			}

			asideUl += '<li><a href="#">Top</a></li>'; 
			let i = 0;

			for (let el_h2 of el_h2s) {
				el_h2.setAttribute('id', 'pageTit' + i);
				asideUl += '<li><a href="#pageTit'+ i +'">'+ el_h2.textContent +'</a></li>';	

				i = i + 1;
			}

			asideUl += '</ul>';
			el_aside.insertAdjacentHTML('beforeend', asideUl);
			//el_aside.style.display = 'block';
		},
		pageInit: function(v){
			let jsName = null;

			if (!!doc.querySelector('#uiJsName')) {
				jsName = doc.querySelector('#uiJsName').value;
				netive.page[jsName]();
			}

			if(typeof(history.pushState) == 'function') {
				let renewURL = location.href;
				renewURL = renewURL.replace(/\&page=([0-9]+)/ig,'');
				renewURL = renewURL.split('/netiveUI/');
				renewURL = renewURL[0];
				renewURL = renewURL + v;

				let paraUrl = v.split('.');
				paraUrl = paraUrl[0].split('/');
				paraUrl = paraUrl[paraUrl.length - 1];

				const indexUrl = '/netiveUI/html/index.html?page=' + paraUrl;
   
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
			const dep2btns = doc.querySelectorAll('.dep-2-btn');

			for (let that of dep2btns) {
				that.addEventListener('click', act);
			}

			function act(e){
				const el = this;
				const elHref = el.getAttribute('data-href');
				const el_body = doc.querySelector('body');

				!!el_body.classList.contains('nav-open') && netive.common.toggleNav();

				netive.ajax.init({ 
					area: document.querySelector('.base-main'), 
					url: elHref, 
					page: true, 
					effect: 'page-change',
					callback: function(){
						netive.scroll.move({ 
							value:0, 
							speed:0, 
							focus: doc.querySelector('.base-main h1')
						});
						
						netive.common.pageInit(elHref);
						netive.common.settingAside();
						
						// document.addEventListener('DOMContentLoaded', (event) => {
						// 	document.querySelectorAll('pre code').forEach((el) => {
						// 		alert(1);
						// 	  hljs.highlightElement(el);
						// 	});
						//   });
					}
				});
			}



			
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
})(window, document);
