;(function($, win, doc, undefined) {
    console.log('page.js');

    'use strict';

    console.log('page ready after');
    netive.common.init();  

    netive.page.pageInputPlaceholder = function(){

    };
    
    netive.page.pageInnerLabel = function(){
        netive.form.init();
        netive.select.init();
        //netive.uiDatePicker();
        // netive.form.innerLabel();

        netive.form.init();

    };
    netive.page.pageColor = function(){};
    netive.page.pageUnits = function(){};
    netive.page.pagePlaceholder = function(){};
    netive.page.pageNaming = function(){};
    netive.page.pageMargin = function(){};
    netive.page.pageIntroduction = function(){};
    netive.page.pageDevice = function(){};
    netive.page.pageTypography = function(){};
    netive.page.pageLayout = function(){};
    netive.page.pageLoading = function(){
        netive.loading.show();
        netive.loading.show();
        netive.loading.hide();
        netive.loading.show();
        netive.loading.hide();
    };
    netive.page.pageButton = function(){};

    netive.page.pageBulletList = function(){};

    netive.page.pagePrint = function(){
        // $('#prtTest').off('click.print').on('click.print', function(){
        //     netive.uiPrint({ id:'prtSct' });
        // });
    };

    netive.page.pageTableCaption = function(){
        netive.table.caption();
    };

    netive.page.pageTableCellFix = function(){
        netive.table.fixTd();
    };

    netive.page.pageTableScroll = function(){
        netive.table.scroll({
            callback:function(){
                netive.scrollBar.init({
                    selector: 'tblScrollTest1'
                });
            }
        });
        // netive.tab.initleScroll({
        //     callback:function(){
        //         netive.scrollBar.init({
        //             id: 'tblScrollTest1'
        //         });
        //     }
        // });
    };

    netive.page.pageBrickList = function(){
        netive.masonry.init({ 
            id:'uiBrickList1', 
            fixCol: {
                1500:8,
                1200:6,
                800:4,
                400:2,
            },
            response:true
        });

        netive.masonry.init({ 
            id:'uiBrickList2', 
            fixCol: {
                1500:4,
                1200:3,
                800:2,
                400:1,
            },
            response:true
        });

        var img_array = [
            "/netiveUI/resources/img/dummy/@iu16.gif",
            "/netiveUI/resources/img/dummy/@iu15.jpg",
            "/netiveUI/resources/img/dummy/@iu14.jpg",
            "/netiveUI/resources/img/dummy/@iu13.gif",
            "/netiveUI/resources/img/dummy/@iu12.jpg",
            "/netiveUI/resources/img/dummy/@iu11.gif",
            "/netiveUI/resources/img/dummy/@iu10.gif",
            "/netiveUI/resources/img/dummy/@iu9.jpg",
            "/netiveUI/resources/img/dummy/@iu8.jpg",
            "/netiveUI/resources/img/dummy/@iu7.jpg"
            ]
        function randomNum(){
            var n = Math.floor(Math.random() * 10);
            return n;
        }

        
        $('.ui-add').on('click', function() {
            addList('uiBrickList1');
        });
        $('.ui-add2').on('click', function() {
            addList('uiBrickList2');
        });

        function addList(v){
            var add = '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>' +
                '<li class="ui-bricklist-item" role="listitem">' +
                '<div><img data-src="'+ img_array[randomNum()] +'" alt=""></div>' +
                '</li>';

            $('#' + v).find('.ui-bricklist-wrap').append(add);
            netive.masonry.act({ id: v });
        }
        
    };

    netive.page.pageModal = function(){
        $(doc).find('button, a').off('click.active').on('click.active', function(){
            var $this = $(this);

            if (!$this.closest('.ui-modal').length || $this.hasClass('ui-modal')) {
                $('body').data('active', $this);
            }
        });

        $('.test-modal .btn-base').off('click.modal').on('click.modal', function(e){
            var $btn = $(this);
            
            netive.modal.show({ 
                id: $btn.attr('modal-id'), 
                ps: $btn.attr('modal-ps') === undefined ? 'center' : $btn.attr('modal-ps'), 
                src: $btn.attr('modal-src') === undefined ? false : $btn.attr('modal-src'), 
                full: $btn.attr('modal-mobilefull') === undefined ? false : $btn.attr('modal-mobilefull') === 'true' && true, 
                width: $btn.attr('modal-width') === undefined ? false : $btn.attr('modal-width'), 
                height: $btn.attr('modal-height') === undefined ? false : $btn.attr('modal-height'), 
                innerScroll : $btn.attr('modal-scroll') === undefined ? false : $btn.attr('modal-scroll') === 'true' && true, 
                callbackClose: function(v) { 
                    console.log('close callback', v); 
                },
                callback: function(v) { 
                    netive.scrollBar.init({
                        selector: $('#' + $btn.attr('modal-id')).find('.ui-scrollbar')
                    })
                    console.log('callback', v); 
                }
            });
        });


    }

    netive.page.pageFileUpload = function(){
        //netive.uiFileUpload(); 
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
    }

    netive.page.pageIssue = function(){


        if ($('#uiIssueSearch').val() !== '') {
            var temp = $('.bul-hyphen > div *:contains('+ $('#uiIssueSearch').val() +')');

            $('.bul-hyphen > div').addClass('disabled').hide();
            $(temp).closest('.bul-hyphen > div').removeClass('disabled').show();
        }
        $.expr[":"].contains = $.expr.createPseudo(function(arg){
            return function(elem) {
                return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
            }
        });
        $('#uiIssueSearchBtn').on('click', function(){
            searchAct();
        });
        $('#uiIssueSearch').on('keydown', function(e){
            if (e.keyCode === netive.state.keys.enter) {
                searchAct();
            }
        });

        function searchAct(){
            var k = $('#uiIssueSearch').val(),
                temp = $('.bul-hyphen > div *:contains('+ k +')');

            $('.bul-hyphen > div').addClass('disabled').hide();
            $(temp).closest('.bul-hyphen > div').removeClass('disabled').show();

        }
    }

    netive.page.pageSlot = function(){
        netive.slot.init({ id: 'uiSlot1', current: 1, auto: false, single:false });
        netive.slot.init({ id: 'uiSlot2', current: 4, auto: false, single:false });
        netive.slot.init({ id: 'uiSlot3', current: 2, auto: false, single:false });
        
        var n = 1,
            win = [];
        
        $('#start').click(function(){
            n = 1;
            win = [];
            netive.slot.start({ id: 'uiSlot1'});
            netive.slot.start({ id: 'uiSlot2'});
            netive.slot.start({ id: 'uiSlot3'}); 
        });
        $('#stop').click(function(){
            if (n < 4) {
                netive.slot.stop({ id: 'uiSlot' + n, callback: slotMCallback });
                n = n + 1;
            }
        });
        $('#allstop').click(function(){
            win = [];
            netive.slot.stop({ id: 'uiSlot1', callback: slotMCallback });
            netive.slot.stop({ id: 'uiSlot2', callback: slotMCallback });
            netive.slot.stop({ id: 'uiSlot3', callback: slotMCallback }); 
        });

        function slotMCallback(v){
            win.push(v);
            var lucky = 0;
            
            if (win.length === 3) {
                (win[0] === win[1]) ? lucky = lucky + 1 : '';
                (win[0] === win[2]) ? lucky = lucky + 1 : '';
                (win[1] === win[2]) ? lucky = lucky + 1 : '';
                
                switch(lucky){
                case 0: $('#slotResult').text('꽝입니다 ㅎㅎㅎ');
                break;
                case 1: $('#slotResult').text('아깝네요~~~');
                break;
                case 3: $('#slotResult').text('축하합니다.');
                break;
                }
            }
        }

    }
    netive.page.pageTooltip = function(){
        netive.tooltip.init();
    }
    netive.page.pageRange = function(){
        netive.rangeSlider.init({
            id : 'range1'
        });
    
        netive.rangeSlider.init({
            id : 'range2'
        });
    
        netive.rangeSlider.init({
            id : 'range3'
        });
    
        netive.rangeSlider.init({
            id : 'range4'
        });
        
        //range slider
        // netive.range.init({ 
        //     id:"uiSlider", 
        //     vertical:false, 
        //     reverse:false, 
        //     range:true, 
        //     now:[1500, 2500], 
        //     step:10, 
        //     min:1000, 
        //     max:6000, 
        //     tooltip:true, 
        //     unit:'만원', 
        //     txt_s:'이하', 
        //     txt_e:'이상', 
        //     acc:true, 
        //     callback:sliderCallback
        // });




        // netive.range.init({ 
        //     id:"uiSlider2", 
        //     vertical:false, 
        //     reverse:true, 
        //     range:true, 
        //     now:[1500, 2500], 
        //     step:10, 
        //     min:1000, 
        //     max:6000, 
        //     tooltip:true,
        //     unit:'달러', 
        //     txt_s:'', 
        //     txt_e:'', 
        //     acc:true, 
        //     callback:sliderCallback
        // });
        // netive.range.init({ 
        //     id:"uiSlider3", 
        //     vertical:true, reverse:false, range:true, 
        //     now:[1500, 2500], step:10, min:1000, max:6000, 
        //     tooltip:true, unit:'만원', txt_s:'이하', txt_e:'이상', 
        //     acc:true, callback:sliderCallback
        // });
        // netive.range.init({ 
        //     id:"uiSlider4", 
        //     vertical:true, reverse:true, range:true, 
        //     now:[1500, 2500], step:10, min:1000, max:6000, 
        //     tooltip:true, unit:'만원', txt_s:'이하', txt_e:'이상', 
        //     acc:true, callback:sliderCallback
        // });

        // //slider
        // netive.range.init({
        //     id:"uiSlider5",
        //     vertical:false, reverse:false, range:false,
        //     now:[500], step:10, min:0, max:1000,
        //     tooltip:true, unit:'만원', txt_s:'', txt_e:'',
        //     acc:true, callback:sliderCallback
        // });
        // netive.range.init({
        //     id:"uiSlider6",
        //     vertical:false, reverse:true, range:false,
        //     now:[500], step:10, min:0, max:1000,
        //     tooltip:true, unit:'만원', txt_s:'', txt_e:'',
        //     acc:true, callback:sliderCallback
        // });
        // netive.range.init({
        //     id:"uiSlider7",
        //     vertical:true, reverse:false, range:false, stepname:['step1','step2','step3','step4','step5','step6','step7','step8','step9','step10', 'step11'], 
        //     now:[50], step:10, min:0, max:100,
        //     tooltip:true, unit:'', txt_s:'', txt_e:'',
        //     acc:true, callback:sliderCallback
        // });
        // netive.range.init({
        //     id:"uiSlider8",
        //     vertical:true, reverse:true, range:false,
        //     now:[500], step:10, min:0, max:1000,
        //     tooltip:true, unit:'만원', txt_s:'', txt_e:'',
        //     acc:true, callback:sliderCallback
        // });
        
        
        // function sliderCallback(v){
        //     console.log(v);
        // }
    }

    netive.page.pageSlide = function(){
        netive.swiper.init();
        netive.swiper.init({ id:'slide1', current:0, loop:false, dot:true, eff:'slide', speed:300, callback:callback});
        netive.swiper.init({ id:'slide2', eff:'fade', dot:true, speed:350 });
        
        netive.swiper.init({ id:'slide3', multi:true, margin:10 });
        
        netive.swiper.init({ id:'slide4', items:3, margin:10 }); 

        function callback(v){
            console.log(v);
        }
    }

    netive.page.pageSelect = function(){
        netive.select.init();
        netive.select.init();
        netive.select.init();

        netive.select.init({
            id: 'forSelLocal',
            current: 0,
            callback: function (v) {}
        });

        // netive.select.init({
        //     id: 'uiSel1',
        //     current: 1,
        //     callback: function (v) {
        //         $('#baseWrap').css('display', 'block');
        //     }
        // });

        // var opttxt = 5;
        // $('#changeOption').on('click', function () {
        //     $('#uiSel2').append('<option value="' + opttxt + '">' + opttxt + '</option>');
        //     opttxt = opttxt + 1;
        // });

    }

    netive.page.pageScrollMove = function(){

        netive.scroll.init();
        netive.scroll.init();
        
        netive.callback.testscroll = function(){
            console.log('callback - test scroll');
        };
        
        if (!netive.callback.testscroll) {
            netive.callback.testscroll = function(){
                console.log('callback - test scroll2');
            };
        } else {
            console.log('중복 callback');
        }
    }

    netive.page.pageParallax = function(){
        netive.scroll.parallax({
            callback:function(v) {
               // console.log(v);
            }
        });
    }

    netive.page.pagePopupBook = function(){
        //netive.uiPopupBook();
    }

    netive.page.pageScrollBar = function(){
        netive.scrollBar.init({
            infiniteCallback: function(){
                console.log('infiniteCallback')
            }
        });
//netive.scrollBar.init({ id:'scrbar1', top:20 });
    }

    netive.page.pageJsonCodingList = function(){
        netive.project.list({
            id: 'projectList',
            url: '/netiveUI/resources/data/codinglist.json',
            type: 'text'
        });
    }

    netive.page.pagePopup = function(){
        $('#uiPopupA').on('click', function(e){
            e.preventDefault();
            netive.popup.open({ link:$(this).attr('href'), width:200  });
        });
        $('#uiPopupB').on('click', function(e){
            e.preventDefault();
            netive.popup.open({ link:$(this).attr('href'), name:'list'  });
        });
    }

    netive.page.pageInputFormat = function(){
       
        
        
    }

    netive.page.pageInputClear = function(){
        netive.form.init();
        
  
    }

    netive.page.pageFloatingRange = function(){
        netive.floating.range({ 
            id:'uiflRange01', 
            margin: 0
        });
        netive.floating.range({ 
            id:'uiflRange02', 
            margin: 0
        });
    }

    netive.page.pageFloating = function(){
        
        
        netive.floating.base({ id:'exeFix12', ps:'top', fix:true });
        netive.floating.base({ id:'exeFix11', ps:'top', fix:true, add:'exeFix12' });
        netive.floating.base({ id:'exeFix10', ps:'top', fix:true, add:'exeFix11' });
        
       

        netive.floating.base({ id:'exeFix1', ps:'top', fix:false, 
            callback:function(v){
                console.log(v);
            } 
        });
        netive.floating.base({ id:'exeFix2', ps:'top', add:'exeFix1', fix:false });
        netive.floating.base({ id:'exeFix3', ps:'top', add:'exeFix2', fix:false });
        
        
        netive.floating.base({ id:'exeFix6', ps:'bottom', fix:true});
        netive.floating.base({ id:'exeFix5', ps:'bottom', add:'exeFix6', fix:true});
        netive.floating.base({ id:'exeFix4', ps:'bottom', add:'exeFix5', fix:true });

        netive.floating.base({ id:'exeFix7', ps:'bottom', fix:false});
        netive.floating.base({ id:'exeFix8', ps:'bottom', add:'exeFix7', fix:false});
        netive.floating.base({ id:'exeFix9', ps:'bottom', add:'exeFix8', fix:false });


    }

    netive.page.pageCountNumber = function(){
        netive.count.step({ id:'exeCount1', value: 12345.678 });
        netive.count.slot({ id:'exeCount2', value: 12345.678 });
    }

    netive.page.pageDropdown = function(){
        $('.drop-ps-change').on('change', function(){
            $(this).closest('.box-guide').find('.ui-drop').attr('data-ps', $(this).val());
        });
    
        netive.dropdown.init({ 
            id:'uiDrop1', 
            ps:'BL',
            src:'/netiveUI/html/components/dropdown_ajax.html',
            dropExpanded: true,
            callback: function(){
                netive.tab.init({ 
                    id: 'exeTab1', 
                    current:0 
                });
                netive.dropdown.init({ 
                    id:'uiDrop5', 
                    ps:'RB',
                    src:'/netiveUI/html/components/dropdown_ajax2.html',
                });
            }
        });
    }

    netive.page.pageTab = function(){
        netive.tab.init({ 
            id:'exeTab1', 
            current:0, 
            effect: 'eff-fade',
            callback:tabCallback 
        });
        netive.tab.init({ 
            id:'exeTab12', 
            current:0, 
            callback:tabCallback 
        });


        netive.tab.init({ 
            id:'exeTab4', 
            current:0, 
            onePanel:true, 
            callback: tabCallback2 
        });
        
        function tabCallback(v){
            //console.log(v);
        }
        function tabCallback2(v){
            $('#'+ v.id).find('.ui-tab-tit').text($('#'+ v.id).find('.ui-tab-btn').eq(v.current).text());
            //console.log(v);
        }
        netive.scrollBar.init();
        $('.ui-tab-btns').on('scroll', function(){
            //console.log($(this).scrollLeft());
        });
    }

    netive.page.pageTable = function(){
       
    }

    netive.page.pageDraggable = function(){
        netive.draggable.init({
            id:'drag1'
        });
        netive.draggable.init({
            id:'drag2'
        });
        netive.draggable.init({
            id:'drag3'
        });
        netive.draggable.init({
            id:'drag4'
        });
        netive.draggable.init({
            id:'drag5',
            line: true
        });
    }

    

    netive.page.pageAccordion = function(){
        console.log('page.js-acco');


        netive.accordion.init({ 
            id:'exeAcco1', 
            current:[0], 
            autoclose:false,
            callback:function(v){
                console.log(v);
            } 
        });
        // netive.accordion.init({ 
        //     id:'exeAcco3', 
        //     current:[0], 
        //     autoclose:false 
        // });

        var add_html = '';
        add_html += '<div class="ui-acco-wrap">';
        add_html += '<dt class="ui-acco-tit">';
        add_html += '<button type="button" class="ui-acco-btn">[추가] 아코디언이란?</button>';
        add_html += '</dt>';
        add_html += '<dd class="ui-acco-pnl">';
        add_html += '<div class="ui-acco-pnl-wrap">';
        add_html += '<p>(accordion, 독일어: <a href="#">Akkodeon</a>, 프랑스어: <a href="#">accordéon</a>, 이탈리아어: <a href="#">fisarmonica</a>, 문화어:손풍금)은 바람통과 리드가 달린 상자형의 악기로, 악기학상으로는 리드 오르간의 일종으로 분류된다.</p>';
        add_html += '</div>';
        add_html += '</dd>';
        add_html += '</div>';

        $('#uiAccoAdd').on('click.add', function(){
            $('#exeAcco1').append(add_html);

            netive.accordion.init({ 
                id: 'exeAcco1', 
                add: true,
                callback: function(){console.log('callback')} 
            });
        });
    }
    
    netive.page.pageDatePicker = function(){
        
    }

    netive.page.capture = function(){
        $('#uiCaptureBtn').on('click',function(){
            netive.uiCapture({ id: 'capSct' });
        });
    }

    netive.page.countNumber = function(){
        netive.count.step({ id:'exeCount1', value: 504025 });
        netive.uiCountSlide({ id:'exeCount2', value: 5040.25 });
    }

    
    netive.page.fileupload = function(){

        /* 파일 업로드 */
        netive.uiFileUpload(); 
 
    }

    
    // netive.page.slide = function(){
    //     netive.swiper.init();
    //     netive.swiper.init({ id:'slide1', current:0, loop:false, dot:true, eff:'slide', speed:300, callback:callback});
    //     netive.swiper.init({ id:'slide2', eff:'fade', dot:true, speed:350 });
        
    //     netive.swiper.init({ id:'slide3', multi:true, margin:10 });
        
    //     netive.swiper.init({ id:'slide4', items:3, margin:10 }); 

    //     function callback(v){
    //         console.log(v);
    //     }
    // }

    
        



})(jQuery, window, document);
