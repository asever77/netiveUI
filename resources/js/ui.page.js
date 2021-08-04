;(function($, win, doc, undefined) {
    console.log('page.js');

    'use strict';

    console.log('page ready after');
    $plugins.common.init();  

    $plugins.page.pageInputPlaceholder = function(){

    };
    
    $plugins.page.pageInnerLabel = function(){
        $plugins.form.init();
        $plugins.select.init();
        //$plugins.uiDatePicker();
        // $plugins.form.innerLabel();

        $plugins.form.init();

    };
    $plugins.page.pageColor = function(){};
    $plugins.page.pageUnits = function(){};
    $plugins.page.pagePlaceholder = function(){};
    $plugins.page.pageNaming = function(){};
    $plugins.page.pageMargin = function(){};
    $plugins.page.pageIntroduction = function(){};
    $plugins.page.pageDevice = function(){};
    $plugins.page.pageTypography = function(){};
    $plugins.page.pageLayout = function(){};
    $plugins.page.pageLoading = function(){
        $plugins.loading.show();
        $plugins.loading.show();
        $plugins.loading.hide();
        $plugins.loading.show();
        $plugins.loading.hide();
    };
    $plugins.page.pageButton = function(){};

    $plugins.page.pageBulletList = function(){};

    $plugins.page.pagePrint = function(){
        $('#prtTest').off('click.print').on('click.print', function(){
            $plugins.uiPrint({ id:'prtSct' });
        });
    };

    $plugins.page.pageTableCaption = function(){
        $plugins.table.caption();
    };

    $plugins.page.pageTableCellFix = function(){
        $plugins.table.fixTd();
    };

    $plugins.page.pageTableScroll = function(){
        $plugins.table.scroll({
            callback:function(){
                $plugins.scrollBar.init({
                    id: 'tblScrollTest1'
                });
            }
        });
        // $plugins.uiTableScroll({
        //     callback:function(){
        //         $plugins.scrollBar.init({
        //             id: 'tblScrollTest1'
        //         });
        //     }
        // });
    };

    $plugins.page.pageBrickList = function(){
        $plugins.uiBrickList({ 
            id:'uiBrickList1', 
            fixCol: {
                1500:8,
                1200:6,
                800:4,
                400:2,
            },
            response:true
        });

        $plugins.uiBrickList({ 
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
            $plugins.uiBrickListItem({ id: v });
        }
        
    };

    $plugins.page.pageModal = function(){
        $(doc).find('button, a').off('click.active').on('click.active', function(){
            var $this = $(this);

            if (!$this.closest('.ui-modal').length || $this.hasClass('ui-modal')) {
                $('body').data('active', $this);
            }
        });

        $('.test-modal .btn-base').off('click.modal').on('click.modal', function(e){
            var $btn = $(this);
            
            $plugins.uiModalOpen({ 
                id: $btn.attr('modal-id'), 
                ps: $btn.attr('modal-ps') === undefined ? 'center' : $btn.attr('modal-ps'), 
                src: $btn.attr('modal-src') === undefined ? false : $btn.attr('modal-src'), 
                mobileFull: $btn.attr('modal-mobilefull') === undefined ? false : $btn.attr('modal-mobilefull') === 'true' && true, 
                modalWidth: $btn.attr('modal-width') === undefined ? false : $btn.attr('modal-width'), 
                modalHeight: $btn.attr('modal-height') === undefined ? false : $btn.attr('modal-height'), 
                innerScroll : $btn.attr('modal-scroll') === undefined ? false : $btn.attr('modal-scroll') === 'true' && true, 
                closeCallback: function(v) { 
                    //console.log('close callback', v); 
                },
                callback: function(v) { 
                    $plugins.scrollBar.init({
                        id: $('#' + $btn.attr('modal-id')).find('.ui-scrollbar')
                    })
                    //console.log('callback', v); 
                }
            });
        })
        
    }

    $plugins.page.pageFileUpload = function(){
        //$plugins.uiFileUpload(); 
        $plugins.form.fileUpload(); 
        $plugins.form.fileUpload(); 
        $plugins.form.fileUpload(); 
        $plugins.form.fileUpload(); 
    }

    $plugins.page.pageIssue = function(){


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
            if (e.keyCode === $plugins.option.keys.enter) {
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

    $plugins.page.pageSlot = function(){
        $plugins.uiSlot({ id: 'uiSlot1', current: 1, auto: false, single:false });
        $plugins.uiSlot({ id: 'uiSlot2', current: 4, auto: false, single:false });
        $plugins.uiSlot({ id: 'uiSlot3', current: 2, auto: false, single:false });
        
        var n = 1,
            win = [];
        
        $('#start').click(function(){
            n = 1;
            win = [];
            $plugins.uiSlotStart({ id: 'uiSlot1'});
            $plugins.uiSlotStart({ id: 'uiSlot2'});
            $plugins.uiSlotStart({ id: 'uiSlot3'}); 
        });
        $('#stop').click(function(){
            if (n < 4) {
                $plugins.uiSlotStop({ id: 'uiSlot' + n, callback: slotMCallback });
                n = n + 1;
            }
        });
        $('#allstop').click(function(){
            win = [];
            $plugins.uiSlotStop({ id: 'uiSlot1', callback: slotMCallback });
            $plugins.uiSlotStop({ id: 'uiSlot2', callback: slotMCallback });
            $plugins.uiSlotStop({ id: 'uiSlot3', callback: slotMCallback }); 
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

        $('.box').stop().delay(800).animate({
            opacity: 1
        },700);
        
        $plugins.uiBrickList({ id:'uiListcard', margin:10, response:true });
        //$plugins.uiCardListRow({ id:'uiListcard' });  추가
        


        $plugins.uiSlot({ id: 'wuiSlot1', current:1, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot2', current:9, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot3', current:3, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot4', current:5, auto:true, single:true });
        $plugins.uiSlot({ id: 'wuiSlot5', current:7, auto:true, single:true });

        var n = 1,
            j = 1,
            m = [],
            w = [],
            iulen = 6;
        
        $('#allstop2').on('click',function(){
            if (j === 1) {
                $('body').addClass('on');
                slotstop(j);
            } else {
                $('body').removeClass('on');
                j = 1;
                m = [],
                w = [];
            }
        });
       
        function slotstop(j){
            if (j < iulen) {
                setTimeout(function(){
                    $plugins.uiSlotStop({ id: 'wuiSlot' + j, callback: slotCallback });
                    $('#wuiSlot' + j).closest('.ui-bricklist-item').addClass('ok');
                    $('.ui-bricklist-item.n'+ j).find('strong').stop().animate({
                        opacity: 1
                    },500);
                    $('.ui-bricklist-item.n'+ j).find('p').stop().animate({
                        opacity: 1
                    },500);
                },100);
            }
        }

        function slotCallback(v){
            if (j < iulen && j > 1) {
                var len = w.length;
                for (var i = 0; i < len ; i++) {
                    if (w[i] === v) {
                        slotstop(j);
                        break;
                    } else { 
                        if(i === len - 1){
                            w.push(v);
                            j = j + 1;
                            if (j < iulen) {
                                slotstop(j);
                            }
                        }
                    }
                }
            } else if(j === 1) {
                w.push(v);
                j = j + 1;
                slotstop(j);
            }
        }
    }
    $plugins.page.pageTooltip = function(){
        $plugins.uiTooltip();
    }
    $plugins.page.pageRange = function(){
        //range slider
        
       
    }

    $plugins.page.pageSlide = function(){
        $plugins.uiSlide();
        $plugins.uiSlide({ id:'slide1', current:0, loop:false, dot:true, eff:'slide', speed:300, callback:callback});
        $plugins.uiSlide({ id:'slide2', eff:'fade', dot:true, speed:350 });
        
        $plugins.uiSlide({ id:'slide3', multi:true, margin:10 });
        
        $plugins.uiSlide({ id:'slide4', items:3, margin:10 }); 

        function callback(v){
            console.log(v);
        }
    }

    $plugins.page.pageSelect = function(){
        

    }

    $plugins.page.pageScrollMove = function(){

         
        function callback(n){            
            console.log(n);
        }
    }
    
    
   
    $plugins.page.pageParallax = function(){
        $plugins.uiParallax({
            callback:function(v) {
                console.log(v);
            }
        });
    }

    $plugins.page.pagePopupBook = function(){
        $plugins.uiPopupBook();
    }

    $plugins.page.pageScrollBar = function(){
        $plugins.scrollBar.init({
            infiniteCallback: function(){
                console.log('infiniteCallback')
            }
        });
//$plugins.scrollBar.init({ id:'scrbar1', top:20 });
    }

    $plugins.page.pageJsonCodingList = function(){
        $plugins.uiCodinglist({
            id: 'uiCodinglist',
            url: '/netiveUI/resources/data/codinglist.json',
            type: 'text'
        });
    }

    $plugins.page.pagePopup = function(){
        $('#uiPopupA').on('click', function(e){
            e.preventDefault();
            $plugins.popup.open({ link:$(this).attr('href'), width:200  });
        });
        $('#uiPopupB').on('click', function(e){
            e.preventDefault();
            $plugins.popup.open({ link:$(this).attr('href'), name:'list'  });
        });
    }

    $plugins.page.pageInputFormat = function(){
       
        
        
    }

    $plugins.page.pageInputClear = function(){
        $plugins.form.init();
        
  
    }

    $plugins.page.pageFloatingRange = function(){
        $plugins.uiFloatingRange({ 
            id:'uiflRange01', 
            margin: 20
        });
        $plugins.uiFloatingRange({ 
            id:'uiflRange02', 
            margin: 0
        });
    }

    $plugins.page.pageFloating = function(){
        $plugins.uiFloating({ id:'exeFix12', ps:'top', fix:true });
        $plugins.uiFloating({ id:'exeFix11', ps:'top', add:'exeFix12', fix:true });
        $plugins.uiFloating({ id:'exeFix10', ps:'top', add:'exeFix11', fix:true });

        $plugins.uiFloating({ 
            id:'exeFix1', 
            ps:'top', 
            fix:false, 
            callback:function(v){
                console.log(v);
            } 
        });
        $plugins.uiFloating({ id:'exeFix2', ps:'top', add:'exeFix1', fix:false });
        $plugins.uiFloating({ id:'exeFix3', ps:'top', add:'exeFix2', fix:false });
        
        
        $plugins.uiFloating({ id:'exeFix6', ps:'bottom', fix:true});
        $plugins.uiFloating({ id:'exeFix5', ps:'bottom', add:'exeFix6', fix:true});
        $plugins.uiFloating({ id:'exeFix4', ps:'bottom', add:'exeFix5', fix:true });

        $plugins.uiFloating({ id:'exeFix7', ps:'bottom', fix:false});
        $plugins.uiFloating({ id:'exeFix8', ps:'bottom', add:'exeFix7', fix:false});
        $plugins.uiFloating({ id:'exeFix9', ps:'bottom', add:'exeFix8', fix:false });


    }

    $plugins.page.pageCountNumber = function(){
        $plugins.uiCountStep({ id:'exeCount1', value: 504025 });
        $plugins.uiCountSlot({ id:'exeCount2', value: 1965040.25 });
    }

    $plugins.page.pageDropdown = function(){
        $('.drop-ps-change').on('change', function(){
            $(this).closest('.mgt-s').find('.ui-drop').attr('data-ps', $(this).val());
        });

        $plugins.uiDropdown({ 
            id:'uiDrop1', 
            ps:'BL',
            dropSrc:'/netiveUI/html/components/dropdown_ajax.html',
            dropOffset: true,
            dropExpanded: true,
            openback: function(){
                $plugins.uiTab({ id: 'exeTab1', current:0 });
            }
        });
        $plugins.uiDropdown({ 
            id:'uiDrop2', 
            ps:'RT',
            dim :true
        });
        $plugins.uiDropdown({ 
            id:'uiDrop5', 
            ps:'RB'
        });

        
    }

    $plugins.page.pageTab = function(){
        $plugins.uiTab({ 
            id:'exeTab1', 
            current:0, 
            effect: 'eff-fade',
            callback:tabCallback 
        });
        $plugins.uiTab({ 
            id:'exeTab12', 
            current:0, 
            callback:tabCallback 
        });
        $plugins.uiTab({ 
            id:'exeTab2', 
            current:2, 
            onePanel:true, 
            callback: tabCallback2 
        });

        $plugins.uiTab({ 
            id:'exeTab4', 
            current:0, 
            callback: tabCallback2 
        });
        
        function tabCallback(v){
            //console.log(v);
        }
        function tabCallback2(v){
            $('#'+ v.id).find('.ui-tab-tit').text($('#'+ v.id).find('.ui-tab-btn').eq(v.current).text());
            //console.log(v);
        }
        $plugins.scrollBar.init();
        $('.ui-tab-btns').on('scroll', function(){
            //console.log($(this).scrollLeft());
        });
    }

    $plugins.page.pageTable = function(){
       
    }

    $plugins.page.pageDraggable = function(){
        $plugins.uiDraggable({
            id:'drag1'
        });
        $plugins.uiDraggable({
            id:'drag2'
        });
        $plugins.uiDraggable({
            id:'drag3'
        });
        $plugins.uiDraggable({
            id:'drag4'
        });
        $plugins.uiDraggable({
            id:'drag5',
            line: true
        });
    }

    

    $plugins.page.pageAccordion = function(){
        console.log('page.js-acco');
        $plugins.accordion.init({ id:'exeAcco1', current:[0,2], callback:function(v){console.log(v)} });
        $plugins.accordion.init({ id:'exeAcco3', current:null, autoclose:false });
        $plugins.accordion.init({ id:'exeAcco5', current:'all', autoclose:false });

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

            $plugins.accordion.init({ 
                id: 'exeAcco1', 
                add: true,
                callback: function(v){console.log(v)} 
            });
        });
    }
    
    $plugins.page.pageDatePicker = function(){
        //$plugins.datepicker.init();

        
    }













    


    $plugins.page.capture = function(){
        $('#uiCaptureBtn').on('click',function(){
            $plugins.uiCapture({ id: 'capSct' });
        });
    }

    $plugins.page.countNumber = function(){
        $plugins.uiCountStep({ id:'exeCount1', value: 504025 });
        $plugins.uiCountSlide({ id:'exeCount2', value: 5040.25 });
    }

    
    $plugins.page.fileupload = function(){

        /* 파일 업로드 */
        $plugins.uiFileUpload(); 
 
    }

    
    $plugins.page.slide = function(){
        $plugins.uiSlide();
        $plugins.uiSlide({ id:'slide1', current:0, loop:false, dot:true, eff:'slide', speed:300, callback:callback});
        $plugins.uiSlide({ id:'slide2', eff:'fade', dot:true, speed:350 });
        
        $plugins.uiSlide({ id:'slide3', multi:true, margin:10 });
        
        $plugins.uiSlide({ id:'slide4', items:3, margin:10 }); 

        function callback(v){
            console.log(v);
        }
    }

    
        



})(jQuery, window, document);