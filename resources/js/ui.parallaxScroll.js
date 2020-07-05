;(function($, win, doc, undefined) {
    

    $plugins.uiParallaxScroll = function(v){
        var winScrTop = $(window).scrollTop();

        $(win).off('scroll.scrpage').on('scroll.scrpage', function(){
            winScrTop = $(this).scrollTop();
            scrollAni2(winScrTop);
        });

        function scrollAni2(v) {
            var $current = $('.scroll-page-item.n2');
            var winH = $(window).outerHeight();
            var h = $current.outerHeight();
            var start = $current.position().top;
            var end = h - winH + start;

            (v > start) ? $current.addClass('eff1') : $current.removeClass('eff1');
            (v > end) ? $current.addClass('eff-end') : $current.removeClass('eff-end');
            (v > start + 20) ? $current.addClass('eff2') : $current.removeClass('eff2');
        }
    }

    $(doc).ready(function(){
        $plugins.uiParallaxScroll();
    });
    
})(jQuery, window, document);