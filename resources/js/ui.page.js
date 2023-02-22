;(function(win, doc, undefined) {
    // console.log('page.js');

    'use strict';

    // console.log('page ready after');
    netive.common.init();  
    
    //PAGE
    netive.page.pageA11y = () => {
        const swiperName = 'test'
        const el_sw = document.querySelector('.mySwiper[data-id="test"]');
        const el_sw_items = el_sw.querySelectorAll('.swiper-slide');
        const el_stop = el_sw.querySelector('.swiper-button-switch');

        
        el_sw.setAttribute('aria-label', '테스트 슬라이드 배너');
        el_sw.setAttribute('tabindex', '0');
        const swiper = new Swiper('.mySwiper[data-id="test"]', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                slideChange: function () {
                   
                }
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
              },
        });
        const switchPlayStop = (e) => {
            const that = e.currentTarget;
            const id = that.dataset.id;
            const state = that.dataset.state;
            console.log(that);
            if (state === 'stop') {
                swiper.autoplay.stop();
                that.dataset.state = 'play';
                that.dataset.material = 'play_arrow';
                that.setAttribute('aria-label','slide 재생');
            } else if (state === 'play') {
                swiper.autoplay.start();
                that.dataset.state = 'stop';
                that.dataset.material = 'stop';
                that.setAttribute('aria-label','slide 중지');
            }
        }
        // for (let item of el_sw_items) {
        //     item.addEventListener('mouseover', swiper.autoplay.stop);
        //     item.addEventListener('mouseleave', swiper.autoplay.start);
        // }
        el_sw.addEventListener('focus', swiper.autoplay.stop);
        el_stop.addEventListener('click', switchPlayStop);
    };
    netive.page.pageA11y1 = () => {};
    netive.page.pageA11y2 = () => {
        
        const swiperName = 'test'
        const el_sw = document.querySelector('.mySwiper[data-id="test"]');
        const el_sw_items = el_sw.querySelectorAll('.swiper-slide');
        const el_stop = el_sw.querySelector('.swiper-button-switch');

        el_sw.setAttribute('aria-label', '테스트 슬라이드 배너');
        el_sw.setAttribute('tabindex', '0');
        const swiper = new Swiper('.mySwiper[data-id="test"]', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                slideChange: function () {
                   
                }
            },
            a11y: {
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
              },
        });
        const switchPlayStop = (e) => {
            const that = e.currentTarget;
            const id = that.dataset.id;
            const state = that.dataset.state;
            console.log(that);
            if (state === 'stop') {
                swiper.autoplay.stop();
                that.dataset.state = 'play';
                that.dataset.material = 'play_arrow';
                that.setAttribute('aria-label','slide 재생');
            } else if (state === 'play') {
                swiper.autoplay.start();
                that.dataset.state = 'stop';
                that.dataset.material = 'stop';
                that.setAttribute('aria-label','slide 중지');
            }
        }
        // for (let item of el_sw_items) {
        //     item.addEventListener('mouseover', swiper.autoplay.stop);
        //     item.addEventListener('mouseleave', swiper.autoplay.start);
        // }
        el_sw.addEventListener('focus', swiper.autoplay.stop);
        el_stop.addEventListener('click', switchPlayStop);

    };
    netive.page.pageA11y3 = () => {};
    netive.page.pageA11y4 = () => {};

    netive.page.pageIntroduction = () => {};
    netive.page.pageNaming = () => {};
    netive.page.pageTypography = () => {};
    netive.page.pageColor = () => {};
    netive.page.pageGap = () => {};
    netive.page.pageUnits = () => {};
    netive.page.pageBulletList = () => {};
    netive.page.pageButton = () => {};
    netive.page.pageIcon = () => {};
    netive.page.pageLayout = () => {};
    netive.page.pageTable = () => {};
    netive.page.pageList = () => {};
   
    netive.page.pageLoading = () => {
        netive.loading.show();
        netive.loading.show();
        netive.loading.hide();
        netive.loading.show();
        netive.loading.hide();
    };
    netive.page.pageScrollBar = () => {
        netive.scrollBar.init();
        netive.scrollBar.init({
            selector: 'scrollCallbackTest',
            infiniteCallback: function(){
                console.log('end act!!!!!!!!!!');
                alert('끝까지 왔죠');
            }
        });

    };
    netive.page.pageScrollMove = () => {
        netive.scrollBar.init();
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
    };
    netive.page.pageTableScroll = () => {
        netive.table.scroll({
            callback:function(){
                netive.scrollBar.init();
                netive.scrollBar.init({
                    selector: 'tblScrollTest1'
                });
            }
        });
    };
    netive.page.pagePopup = function(){
        const popupA = doc.querySelector('#uiPopupA');
        const popupB = doc.querySelector('#uiPopupB');

        popupA.addEventListener('click', function(e){
            e.preventDefault();
            netive.popup.open({ link:this.href, width:200  });
        });
        popupB.addEventListener('click', function(e){
            e.preventDefault();
            netive.popup.open({ link:this.href, name:'list'  });
        });
    }

    netive.page.pageFormLayout = () => {
        netive.tooltip.init();
    };
    netive.page.pageInput = () => {
        netive.form.init();
    }
    netive.page.pageDatePicker = () => {
        netive.datepicker.week = ['일', '월', '화', '수', '목', '금', '토', '년', '월', '일'];
        netive.datepicker.isFooter = false;
        netive.datepicker.init();

        

       
        netive.callback.uiDate_1 = (v) => {
            console.log('callback', v);
        }
        netive.callback.uiDate_2 = (v) => {
            console.log('callback', v);
        }
        netive.callback.uiDate_view = (v) => {
            console.log('callback', v);
        }
        netive.callback.uiDate_view2 = (v) => {
            console.log('callback', v);
        }

    };
    netive.page.pageTime = () => {
        console.log('time')
        netive.inputTime.init();


    };
    netive.page.pageRange = () => {
        netive.rangeSlider.init({
            id: 'range1',
            step: 500,
            min:1000,
            max:5000,
            text: ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'l8', 'lv9'],
            tickmark: ['1000', '2000', '3000', '4000', '5000'],
        });
    
        netive.rangeSlider.init({
            id: 'range2',
            text: ['1단계', '2단계', '3단계', '4단계'],
            min:1,
            max:4,
            step: 1,
            tickmark: ['1단계', '2단계', '3단계', '4단계']
        });
    
        netive.rangeSlider.init({
            id: 'range3',
        });
    
        netive.rangeSlider.init({
            id: 'range4',
            step: 1000,
        });

         netive.rangeSlider.init({
            id: 'range22',
            step: 10,
        });
    }
    netive.page.pageFileUpload = function(){
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
    }
    netive.page.pageSelection = () => {}
    netive.page.pageSelect = () => {
        netive.select.init();
        netive.select.init();
        netive.select.init();
        netive.select.init({
            id: 'forSelLocal',
            current: 0,
            callback: function (v) {
                console.log(v);
            }
        });

        let opttxt = 5;
        doc.querySelector('#changeOption').addEventListener('click', function () {
            doc.querySelector('#uiSel2').insertAdjacentHTML('beforeend', '<option value="' + opttxt + '">' + opttxt + '</option>');
            opttxt = opttxt + 1;
            netive.select.init({
                id: 'uiSel2'
            });

        });
    }

    netive.page.pageAccordion = () => {
        netive.accordion.init({ 
            id:'exeAcco2', 
            current: [0], 
            autoclose: true,
            callback: function(v){
                console.log('callback2: ', v);
            } 
        });
        netive.accordion.init({ 
            id:'exeAcco1', 
            current: [0,2], 
            autoclose:false,
            callback:function(v){
                console.log('callback1: ', v);
            } 
        });

        let add_html = '';

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

        const add = doc.querySelector('#uiAccoAdd');
        
        add.addEventListener('click', function(){
            const exe = doc.querySelector('.ui-acco[data-id="exeAcco1"]');

            exe.insertAdjacentHTML('beforeend', add_html);

            netive.accordion.init({ 
                id: 'exeAcco1', 
                callback: function(){console.log('callback3')} 
            });
        });
    }
    netive.page.pageDropdown = () => {
        const dropchanges = doc.querySelectorAll('input[name="dropPs"]');
        const drop = doc.querySelector('#uiDrop1');

        dropchanges.forEach(function(element) {
            element.addEventListener('change', function(){

                netive.dropdown.data.uiDrop1.ps = this.value;
                drop.textContent = 'dropdown (' + this.value + ')'; 
                console.log(this.value)
            });
        });
        netive.dropdown.init();
    }
    netive.page.pageFloating = function(){
        netive.floating.init();
    }
    netive.page.pageFloatingRange = function(){
        netive.floating.range();
    }
    netive.page.pageModal = () => {
        const test = doc.querySelector('.test-modal');
        const btns = test.querySelectorAll('.btn-base');

        for (let i = 0, len = btns.length; i < len; i++) {
            const that = btns[i];
            that.addEventListener('click', modalShow);
        }

        function modalShow() {
            const btn = this;

            console.log(btn.getAttribute('modal-scroll'));

            netive.modal.show({ 
                id: btn.getAttribute('modal-id'), 
                ps: !btn.getAttribute('modal-ps') ? 'center' : btn.getAttribute('modal-ps'), 
                src: !btn.getAttribute('modal-src') ? false : btn.getAttribute('modal-src'), 
                full: !btn.getAttribute('modal-full') ? false : btn.getAttribute('modal-full'), 
                width: !btn.getAttribute('modal-width') ? false : btn.getAttribute('modal-width'), 
                height: !btn.getAttribute('modal-height') ? false : btn.getAttribute('modal-height'), 
                scroll : !btn.getAttribute('modal-scroll') ? 'inner' : btn.getAttribute('modal-scroll'), 

                callbackClose: function(v) { 
                    console.log('close callback', v); 
                },
                callback: function(v) { 
                    // netive.scrollBar({
                    //     selector: doc.querySelector('#' + btn.getAttribute('modal-id') + ' .ui-scrollbar')
                    // });
                    
                    // netive.scrollBar.init({
                    //     selector: doc.querySelector('#' + btn.getAttribute('modal-id') + ' .ui-scrollbar')
                    // })
                    console.log('callback', v); 
                }
            });
        }
    }
    netive.page.pageToast = function(){
        console.log('toast start');
    }
    netive.page.pageParallax = function(){
        netive.parallax.init({
            callback:function(v) {
               console.log(v);
            }
        });

        netive.callback.parallax01 = function(opt){
            if (document.querySelector('#uiJsName').value !== 'pageParallax') {
                return false;
            }
            document.querySelector('#parallax1-1').textContent = opt.per_s;
            document.querySelector('#parallax1-3').textContent = opt.per_e;
            document.querySelector('#parallax1-2').textContent = opt.px;
           
            if (opt.per_e > 0) {
                opt.el.querySelector('b').style.transform = 'translate(-'+ opt.per_e +'vw, 0)';
            } else {
                opt.el.querySelector('b').style.transform = 'translate('+ (100 - opt.per_s) +'vw, 0)';
            }
        }

        netive.callback.parallax02 = function(opt){
            if (document.querySelector('#uiJsName').value !== 'pageParallax') {
                return false;
            }
            document.querySelector('#parallax2-1').textContent = opt.per_s;
            document.querySelector('#parallax2-3').textContent = opt.per_e;
            document.querySelector('#parallax2-2').textContent = opt.px;
            
            if (opt.per_e > 0) {
                opt.el.querySelector('b').style.transform = 'translate(-'+ opt.per_e +'vw, '+ opt.per_e +'vh)';
            } else {
                opt.el.querySelector('b').style.transform = 'translate('+ (100 - opt.per_s) +'vw, -'+ (100 - opt.per_s) +'vh)';
            }
        }
        netive.callback.parallax03 = function(opt){
            if (document.querySelector('#uiJsName').value !== 'pageParallax') {
                return false;
            }
            document.querySelector('#parallax3-1').textContent = opt.per_s;
            document.querySelector('#parallax3-3').textContent = opt.per_e;
            document.querySelector('#parallax3-2').textContent = opt.px;
        }
        netive.callback.parallax04 = function(opt){
            if (document.querySelector('#uiJsName').value !== 'pageParallax') {
                return false;
            }
            document.querySelector('#parallax4-1').textContent = opt.per_s;
            document.querySelector('#parallax4-3').textContent = opt.per_e;
            document.querySelector('#parallax4-2').textContent = opt.px;
        }
        netive.callback.parallax05 = function(opt){
            if (document.querySelector('#uiJsName').value !== 'pageParallax') {
                return false;
            }
            document.querySelector('#parallax5-1').textContent = opt.per_s;
            document.querySelector('#parallax5-3').textContent = opt.per_e;
            document.querySelector('#parallax5-2').textContent = opt.px;
        }
    }
    netive.page.pageTab = () => {
        netive.tab.init({ 
            id:'exeTab1', 
            current: 0, 
            callback: tabCallback 
        });

        function tabCallback(v){
            console.log(v);
        }
    }
    netive.page.pageTooltip = function(){
        netive.tooltip.init();
    }

    netive.page.pageJsonCodingList = function(){
        netive.project.list({
            id: 'projectList',
            url: '../resources/data/codinglist.json',
            type: 'text'
        });
    }

    netive.page.pageIssue = () => {
        const srchCode = doc.querySelector('#uiIssueSearch');
        const srchBtn = doc.querySelector('#uiIssueSearchBtn');
        
        srchBtn.addEventListener('click', srchAct);
        srchCode.addEventListener('keyup', function(){
            if (win.event.keyCode === 13) {
                srchAct();
            }
        });

        function srchAct(){
            const k = srchCode.value;
            const el = doc.querySelector('.bul-hyphen');
            const el_tag = el.querySelectorAll('.list-memory-tag');
            const el_tr = el.querySelectorAll(':scope > div');

            for (let i = 0, len = el_tr.length; i < len; i++) {
                const that = el_tr[i];
                that.classList.add('srch-hidden');
            }

            for (let i = 0, len = el_tag.length; i < len; i++) {
                const that = el_tag[i];
                const text = that.textContent;
                const el_tr2 = that.closest('.srch-hidden');

                if (text.indexOf(k) >= 0) {
                    el_tr2.classList.remove('srch-hidden');
                } 
            }
        }

        // if ($('#uiIssueSearch').val() !== '') {
        //     var temp = $('.bul-hyphen > div *:contains('+ $('#uiIssueSearch').val() +')');

        //     $('.bul-hyphen > div').addClass('disabled').hide();
        //     $(temp).closest('.bul-hyphen > div').removeClass('disabled').show();
        // }
        // $.expr[":"].contains = $.expr.createPseudo(function(arg){
        //     return function(elem) {
        //         return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        //     }
        // });
        // $('#uiIssueSearchBtn').on('click', function(){
        //     searchAct();
        // });
        // $('#uiIssueSearch').on('keydown', function(e){
        //     if (e.keyCode === netive.state.keys.enter) {
        //         searchAct();
        //     }
        // });

        // function searchAct(){
        //     var k = $('#uiIssueSearch').val(),
        //         temp = $('.bul-hyphen > div *:contains('+ k +')');

        //     $('.bul-hyphen > div').addClass('disabled').hide();
        //     $(temp).closest('.bul-hyphen > div').removeClass('disabled').show();

        // }
    }
    

    //CALLBACK
    netive.callback.callbackTab1 = (v) => {
        console.log('tab1 : ', v);
        netive.tab.init({ 
            id:'exeTab4', 
            current:5, 
            dynamic:true,
            callback:tabCallback2 
        });
        function tabCallback2(v){
            const tab = doc.querySelector('.ui-tab[data-id="'+ v.id +'"]');
            const btns = tab.querySelectorAll('.ui-tab-btn');
            const tit = tab.querySelector('.ui-tab-tit');

            tit.textContent = btns[v.current].textContent;
            console.log(v);
        }
    }
    netive.callback.callbackTab2 = (v) => {
        console.log('tab2 : ', v);
    }
    netive.callback.callbackTab3 = (v) => {
        console.log('tab3 : ', v);
    }
    netive.callback.selectedCallback1 = (v) => {
        console.log('select : ', v);
    }
    netive.callback.dropTabAct = () => {
        console.log('callback');
        netive.tab.init({ 
            id: 'exeTab1', 
            current:0 
        });

        netive.dropdown.init({ 
            id:'uiDrop5', 
            ps:'RB',
            src:'../html/components/contents/dropdown_ajax2.html',
        });
    }
    netive.callback.dropClose = () => {
        // console.log('closeback');
    }
    netive.callback.dropTabAct2 = () => {
        console.log('callback2');
        netive.tab.init({ 
            id: 'exeTab2', 
            current:0 
        });
    }
})(window, document);
