'use strict';

document.addEventListener('DOMContentLoaded', function () {
	var view = COMMONLIBRARY.view;
	view.setScale();

	window.addEventListener('resize', COMMONLIBRARY.view.setScale);
	
 	$(".toolsWrap .btnOpen").click(function(){
 		$(".toolsWrap").addClass("open");
 	});


	$('.viewTooltip').tooltip({
		tooltipClass: 'tooltipUI',
	 	track: true,
		position: {
			my: "center top+20",
			at: "center",
			of: "#targetElement", 
			collision: "fit" 
		},
		content: function(callback) {
			$('.ui-helper-hidden-accessible > div').remove();
			!!$(this).find('.title').length ?
				callback($(this).find('.title').html()):
				callback($(this).prop('title'));

			var arrow = $(this).attr('arrow');
			if(arrow !== undefined) {
				console.log(arrow);
				$('.body').addClass(arrow);
			} 
			
		}
	});
	$('.viewTooltip-left').tooltip({
		tooltipClass: 'tooltipUI left',
	 	track: true,
		position: {
			my: "left bottom-20",
			at: "center",
			of: "#targetElement", 
			collision: "fit" 
		},
		content: function(callback) {
			$('.ui-helper-hidden-accessible > div').remove();
			!!$(this).find('.title').length ?
				callback($(this).find('.title').html()):
				callback($(this).prop('title'));
		}
	});
	$('.viewTooltip-right').tooltip({
		tooltipClass: 'tooltipUI right',
	 	track: true,
		position: {
			my: "right bottom-20",
			at: "center",
			of: "#targetElement", 
			collision: "fit" 
		},
		content: function(callback) {
			$('.ui-helper-hidden-accessible > div').remove();
			!!$(this).find('.title').length ?
				callback($(this).find('.title').html()):
				callback($(this).prop('title'));
		}
	});
	$('.viewTooltip2').tooltip({
		tooltipClass:'tooltipUI2',
	 	track: true,
		position: {
			my: "left bottom+50",
			at: "left",
			of: "#targetElement", 
			collision: "fit" 
		},
		// my: "left+3 bottom-3",
		// of: event,
		// collision: "fit",
		content: function(callback) {
			$('.ui-helper-hidden-accessible > div').remove();
		  	callback($(this).prop('title'));
		}
	});
	$('.viewTooltip3').tooltip({
		tooltipClass:'tooltipUI3',
		track: true,
		position: {
			my: "left bottom+50",
			at: "left",
			of: "#targetElement",
			collision: "fit"
		},
		content: function(callback) {
			$('.ui-helper-hidden-accessible > div').remove();
			callback($(this).prop('title'));
		}
	});
});

