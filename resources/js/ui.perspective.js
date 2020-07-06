;(function($, win, doc, undefined) {
    

    $plugins.uiPerspectiveSlide = function(v){
        var $wrap = $('.ui-perspective-wrap');
					
        $wrap.on('mouseover', function(event){
            $wrap.on('mousemove', function(event){
                event = event || window.event;

                var _x = ( event.pageX ) ? event.pageX : event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
                var isMove = $wrap.data('move');

                if (_x > $wrap.outerWidth() / 2) {
                    if (!isMove || isMove === 'right') {
                        moving('.ui-perspective-scene-a', true, 'left');
                        moving('.ui-perspective-scene-b', true, 'left');
                        moving('.ui-perspective-scene-c', true, 'left');
                    } 
                } else {
                    if (!isMove || isMove === 'left') {
                        moving('.ui-perspective-scene-a', true, 'right');
                        moving('.ui-perspective-scene-b', true, 'right');
                        moving('.ui-perspective-scene-c', true, 'right');
                    } 
                }
            });
        }).on('mouseleave', function(){
            moving('.ui-perspective-scene-a', false);
            moving('.ui-perspective-scene-b', false);
            moving('.ui-perspective-scene-c', false);
        });

        $wrap.find('.ui-perspective-item').on('mouseover', function(event){
            pause();
        }).on('mouseleave', function(event){
            moving('.ui-perspective-scene-a', false);
            moving('.ui-perspective-scene-b', false);
            moving('.ui-perspective-scene-c', false);
        });

        
        function pause() {
            setTimeout(function(){
                $wrap.data('move', 'stop');
                $('.ui-perspective-scene-a').stop();
                $('.ui-perspective-scene-b').stop();
                $('.ui-perspective-scene-c').stop();
            }, 200);
        }
        function moving(t, v, w){
            var $scene = $(t);
            var timer;

            clearTimeout(timer);
            if (v) {
                var n = $scene.outerWidth() - $wrap.outerWidth();
                var per = Math.floor((n - Math.abs($scene.position().left)) / n * 100);
                var per2 = Math.floor(Math.abs($scene.position().left) / n * 100);
                var speed = 8000 * (per / 100);
                var speed2 = 8000 * (per2 / 100);

                if (w === 'left') {
                    $wrap.data('move', 'left');
                    $scene.stop().animate({
                        left: ($scene.outerWidth() - $wrap.outerWidth()) * -1 + 'px'
                    }, speed);
                } else {
                    $wrap.data('move', 'right');
                    $scene.stop().animate({
                        left: 0
                    }, speed2);
                }
            } else {
                timer = setTimeout(function(){
                    $wrap.data('move', false);
                    $scene.stop();	
                }, 300);
            }
        }
    }

    $(doc).ready(function(){
        $plugins.uiPerspectiveSlide();
    });
    
})(jQuery, window, document);