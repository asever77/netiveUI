;(function(win, doc, undefined) {

	'use strict';
	
	netive.common = {
		init: function(){
			let fristHref = '../html/start/introduction.html';

			if (!!netive.para.get('page')) {
				switch(netive.para.get('page')) {
					case 'introduction' :
						fristHref = '../html/start/introduction.html';
						break;
					case 'typography' :
						fristHref = '../html/start/typography.html';
						break;
					case 'color' :
						fristHref = '../html/start/color.html';
						break;
					case 'device' :
						fristHref = '../html/start/device.html';
						break;
					case 'margin' :
						fristHref = '../html/start/margin.html';
						break;
					case 'naming' :
						fristHref = '../html/start/naming.html';
						break;
					case 'placeholder' :
						fristHref = '../html/start/placeholder.html';
						break;
					case 'units' :
						fristHref = '../html/start/units.html';
						break;

					case 'bulletList' :
						fristHref = '../html/contents/bulletList.html';
						break;
					case 'table' :
						fristHref = '../html/contents/table.html';
						break;
					case 'inputFormat' :
						fristHref = '../html/contents/inputFormat.html';
						break;
					case 'inputPlaceholder' :
						fristHref = '../html/components/inputPlaceholder.html';
						break;

					case 'accordion' :
						fristHref = '../html/components/accordion.html';
						break;
					case 'brickList' :
						fristHref = '../html/components/brickList.html';
						break;
					case 'draggable' :
						console.log('draggable');
						fristHref = '../html/components/draggable.html';
						break;
					case 'dropdown' :
						fristHref = '../html/components/dropdown.html';
						break;
					case 'floating' :
						fristHref = '../html/components/floating.html';
						break;
					case 'floatingRange' :
						fristHref = '../html/components/floatingRange.html';
						break;
					case 'modal' :
						fristHref = '../html/components/modal.html';
						break;
					case 'scrollBar' :
						fristHref = '../html/components/scrollBar.html';
						break;
					case 'parallax' :
						fristHref = '../html/components/parallax.html';
						break;
					case 'popupBook' :
						fristHref = '../html/components/popupBook.html';
						break;
					case 'loading' :
						fristHref = '../html/components/loading.html';
						break;
					case 'tab' :
						fristHref = '../html/components/tab.html';
						break;
					case 'tableCaption' :
						fristHref = '../html/components/tableCaption.html';
						break;
					case 'tableCellFix' :
						fristHref = '../html/components/tableCellFix.html';
						break;
					case 'tableScroll' :
						fristHref = '../html/components/tableScroll.html';
						break;
					case 'print' :
						fristHref = '../html/components/print.html';
						break;
					case 'popup' :
						fristHref = '../html/components/popup.html';
						break;
					case 'tooltip' :
						fristHref = '../html/components/tooltip.html';
						break;
					case 'datePicker' :
						fristHref = '../html/components/datePicker.html';
						break;
					case 'inputClear' :
						fristHref = '../html/components/inputClear.html';
						break;
					case 'select' :
						fristHref = '../html/components/select.html';
						break;
					case 'toast' :
						fristHref = '../html/components/toast.html';
						break;
					case 'innerLabel' :
						fristHref = '../html/components/innerLabel.html';
						break;
					case 'scrollMove' :
						fristHref = '../html/components/scrollMove.html';
						break;
					case 'countNumber' :
						fristHref = '../html/components/countNumber.html';
						break;

					case 'layout' :
						fristHref = '../html/contents/layout.html';
						break;
					case 'button' :
						fristHref = '../html/contents/button.html';
						break;
					case 'jsonCodingList' :
						fristHref = '../html/components/jsonCodingList.html';
						break;
					case 'fileUpload' :
						fristHref = '../html/components/fileUpload.html';
						break;
					case 'range' :
						fristHref = '../html/components/range.html';
						break;
					case 'slide' :
						fristHref = '../html/components/slide.html';
						break;
					case 'slot' :
						fristHref = '../html/components/slot.html';
						break;
					case 'issue' :
						fristHref = '../html/memory/issue.html';
						break;
				   
				}
			} 

			netive.ajax.init({ 
				area: document.querySelector('.base-skip'), 
				url:'../html/inc/skip.html', 
				page:true
			});
			netive.ajax.init({ 
				area: document.querySelector('.base-header'), 
				url:'../html/inc/header.html', 
				page:true, 
				callback:netive.common.header 
			});
			netive.ajax.init({ 
				area: document.querySelector('.base-footer'), 
				url:'../html/inc/footer.html', 
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
			netive.scrollBar.init();

			setTimeout(function(){
				netive.accordion.init({ 
					id: 'exeLNB', 
					current: 'all', 
					autoclose: false
				});
				netive.common.menuAjax();
				
				doc.querySelector('.ui-nav').addEventListener('click', netive.common.toggleNav);
				document.querySelector('.btn-mode').addEventListener('click', netive.common.toggleMode);
			},1);
			
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

			for (let i = 0, len = el_h2s.length; i < len; i++) {
				const that = el_h2s[i];

				that.setAttribute('id', 'pageTit' + i);
				asideUl += '<li><a href="#pageTit'+ i +'">'+ that.textContent +'</a></li>';	

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
				renewURL = renewURL.split('../');
				renewURL = renewURL[0];
				renewURL = renewURL + v;

				let paraUrl = v.split('.html');
				console.log(paraUrl);

				paraUrl = paraUrl[0].split('/');
				console.log(paraUrl);

				paraUrl = paraUrl[paraUrl.length - 1];
				console.log(paraUrl);

				

				const indexUrl = '../html/index.html?page=' + paraUrl;
   
				history.pushState(false, 'loading', indexUrl);
			}
			if(document.currentScript === undefined){
				// IE 에서만 돌아갈 내용
			} else {
				// IE 가 아닐 때 돌아갈 내용
				//hljs.configure({tabReplace: " "});
				//hljs.initHighlighting();
			}
			

			//hljs.initHighlighting();
			//hljs.highlightAll();
			

			// console.log(v.split('.html'), !!doc.querySelector('#uiPageJS'));
			// if (!doc.querySelector('#uiPageJS')) {
			// 	  var del = doc.querySelector('#uiPageJS');
			// 	 del.parentNode.removeChild(del);
			// }

			// var jsSrc = v.split('.html'),
			// 	 jsSrc = jsSrc[0] + '.js',
			// 	 script = document.createElement('script'),
			// 	 element = document.getElementsByTagName('body')[0]; 

			// script.src = jsSrc; 
			// script.id = 'uiPageJS'
			// script.async = true; 
			// script.defer = true; 
			// (typeof element === 'undefined' ? document.getElementsByTagName('html')[0] : element).appendChild(script);
			
			
		},

		menuAjax: function(){
			const dep2btns = doc.querySelectorAll('.dep-2-btn');

			for (let i = 0, len = dep2btns.length; i < len; i++) {
				const that = dep2btns[i];
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
						//delete netive.scrollbar;
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
