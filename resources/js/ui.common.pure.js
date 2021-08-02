'use strict';

//utils module
;(function (win, doc, undefined) {
	netive.common = {
		init : () => {

			var fristHref = '/netiveUI/html/start/introduction.html';
			
			if (!!netive.uiParts.para('page')) {
				switch(netive.uiParts.para('page')) {
					case 'introduction' :
						fristHref = '/netiveUI/html/start/introduction.html';
						break;
					case 'typography' :
						fristHref = '/netiveUI/html/start/typography.html';
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
						fristHref = '/netiveUI/html/components/datePicker2.html';
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

			netive.uiAjax.request({ 
				src: '/netiveUI/html/inc/header.html', 
				callback: function(v){
					netive.common.header(v);
				} 
			});
	
			netive.uiAjax.request({ 
				src: '/netiveUI/html/inc/footer.html', 
				callback: function(v){
					netive.uiParts.appendHtml(document.querySelector('#baseFooter'), v);
				} 
			});
			
			netive.uiAjax.request({ 
				src: fristHref, 
				callback: function(v){
					netive.uiParts.appendHtml(document.querySelector('#baseMain'), v);
					
					// netive.uiScrollBar();
					// netive.uiScrollBar();
	
					// netive.uiScrollBar.item1.infiniteCallback = function() {
					// 	console.log(222);
					// };
	
					// netive.uiScrollBar.item0.init({ 
					// 	infiniteCallback: function() {
					// 		console.log(111);
					// 	}
					// });;
				} 
			});
		},
		header : function(v){
			netive.uiParts.appendHtml(document.querySelector('#baseHeader'), v);

			var dep2btn = doc.querySelectorAll('.dep-2-btn');

			for (const btn of dep2btn) {
				btn.addEventListener('click', pageChange)
			}

			function pageChange(event) {
				console.log(event, event.currentTarget  );
				const currentButton = event.currentTarget;
				const baseMain = document.querySelector('#baseMain');
				console.log(currentButton.dataset.href);

				netive.uiAjax.request({ 
					src: currentButton.dataset.href, 
					callback: function(v){

						baseMain.innerHTML = v;
						netive.uiScrollBar();
						netive.uiDatepicker.init();
					} 
				});
			}

			// $('.dep-2-btn').off('click.ajax').on('click.ajax', function(){
			// 	var href = this.getAttribute('data-href');
			// 	!!$('body').hasClass('nav-open') && $plugins.common.navOpen();
			// 	$plugins.uiAjax({ 
			// 		id: 'baseMain', 
			// 		url: href, 
			// 		page: true, 
			// 		effect: true,
			// 		callback: function(v){
			// 			$plugins.uiScroll({ 
			// 				value:0, 
			// 				speed:0, 
			// 				focus:  $('#baseMain h1').eq(0)
			// 			});
						
			// 			$(win).off('scroll.win');
			// 			$plugins.common.pageInit(href);
			// 			$plugins.common.settingAside();
						
			// 		}
			// 	});
			// });

		}
	};


		

})(window, document);
