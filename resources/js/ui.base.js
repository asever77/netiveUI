// ;(function () {
//     console.log('base.js')

//     var head = document.getElementsByTagName('head')[0],
//         script = document.createElement('script'),
//         _reload;

//     script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';
//     head.appendChild(script);

//     // jquery load
//     _reload = function (w, d, $) {
//         if (!$) {
//             setTimeout(function () {
//                 _reload(window, window.document, window.jQuery);
//             }, 100);
//             return;
//         }

//         $(function () {
//             var script_file = '';
//             script_file += '<script src="/netiveUI/resources/js/ui.plugins.js"></script>';
//             script_file += '<script src="/netiveUI/resources/js/ui.common.js"></script>';
//             script_file += '<script src="/netiveUI/resources/js/ui.page.js"></script>';

//             $('head').append(script_file);
//         });
//     }
//     _reload(window, window.document, window.jQuery);
// })();

;(function ($, win, doc, undefined) {
    console.log('base.js')

    var script_file = '';
    //script_file += '<script src="/netiveUI/resources/js/lib/jquery.smoothwheel.js"></script>';
    

    script_file += '<script src="/netiveUI/resources/js/ui.global.js"></script>';
    script_file += '<script src="/netiveUI/resources/js/ui.plugins.js"></script>';
    script_file += '<script src="/netiveUI/resources/js/ui.common.js"></script>';
    script_file += '<script src="/netiveUI/resources/js/ui.page.js"></script>';

    

    $('head').append(script_file);

})(jQuery, window, document);	