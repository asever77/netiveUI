;(function($, win, doc, undefined) {

    'use strict';
    
    $plugins.common = {
        init: function(){
            var fristHref = '/netiveUI/html/start/introduction.html';

            if (!!$plugins.uiPara('page')) {
                switch($plugins.uiPara('page')) {
                    case 'introduction' :
                        fristHref = '/netiveUI/html/start/introduction.html';
                        break;
                    case 'accordion' :
                        fristHref = '/netiveUI/html/components/accordion.html';
                        break;
                    case 'brickList' :
                        fristHref = '/netiveUI/html/components/brickList.html';
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
                     case 'scrollBox' :
                        fristHref = '/netiveUI/html/components/scrollBox.html';
                        break;
                }
            } 

            $plugins.uiAjax({ 
                id:'baseHeader', 
                url:'/netiveUI/html/inc/header.html', 
                page:true, 
                callback:$plugins.common.header 
            });
            $plugins.uiAjax({ 
                id: 'baseMain', 
                url: fristHref, 
                page: true, 
                loading: true,
                callback: function(){
                    $(win).off('scroll.win');
                    $plugins.common.pageInit(fristHref);
                    $plugins.common.settingAside();
                }
            });
            // $plugins.uiAjax({ 
            //     id:'baseFooter', 
            //     url:'/netiveUI/html/inc/footer.html', 
            //     page:true, 
            //     callback:$plugins.common.footer 
            // });
            
            console.log('------------------------------------------------------')

            $plugins.uiCaption();
            $plugins.uiInputClear();
        },
        
        header: function(){
            console.log('header load');
            $plugins.uiAccordion({ 
                id: 'exeLNB', 
                current: 'all', 
                autoclose: false
            });
            $plugins.common.menuAjax();
        },
        settingAside: function(){
            var $aside = $('#baseAside'),
                $main = $('#baseMain'),
                $h2 = $main.find('.h2');

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
                $plugins.page[jsName]();
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

           
            

            // console.log(v.split('.html'), !!doc.querySelector('#uiPageJS'));
            // if (!doc.querySelector('#uiPageJS')) {
            //      var del = doc.querySelector('#uiPageJS');
            //     del.parentNode.removeChild(del);
            // }

            // var jsSrc = v.split('.html'),
            //     jsSrc = jsSrc[0] + '.js',
            //     script = document.createElement('script'),
            //     element = document.getElementsByTagName('body')[0]; 

            // script.src = jsSrc; 
            // script.id = 'uiPageJS'
            // script.async = true; 
            // script.defer = true; 
            // (typeof element === 'undefined' ? document.getElementsByTagName('html')[0] : element).appendChild(script);
            
            
        },
        menuAjax: function(){
            $('.dep-2-btn').off('click.ajax').on('click.ajax', function(){
                var href = this.getAttribute('data-href');

                $plugins.uiAjax({ 
                    id: 'baseMain', 
                    url: href, 
                    page: true, 
                    loading: true,
                    callback: function(){
                        $(win).off('scroll.win');
                        $plugins.common.pageInit(href);
                        $plugins.common.settingAside();
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
    $plugins.page = {}

    //callback
    $plugins.callback = {
        modal: function(modalId){
            switch(modalId) {
                case 'modalID':
                    break;  

                    
            }
        }
    }
   
    // $(doc).ready(function() {
    //     var timer,
    //         n = 0;

    //     pageCodeIs();
        
    //     function pageCodeIs(){
    //         console.log('common.js ready?')
    //         if ($plugins.common.pageid === undefined && n < 10) {
    //             n = n + 1;
    //             delayExe();
    //         } else {
    //             console.log('common.js ok')
    //             clearTimeout(timer);
    //             $plugins.common.init();
    //             $('body').stop().animate({
    //                 opacity:1
    //             }, 150);
    //         }
    //     }
    //     function delayExe(){
    //         clearTimeout(timer);
    //         timer = setTimeout(function() {
    //             console.log('common.js no')
    //             pageCodeIs();
    //         }, 0);
    //     }
	// });
})(jQuery, window, document);
