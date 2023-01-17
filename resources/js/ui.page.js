;(function(win, doc, undefined) {
    // console.log('page.js');

    'use strict';

    // console.log('page ready after');
    netive.common.init();  
    netive.page.pageGuide1 = function(){};
    netive.page.pageInputPlaceholder = function(){};
    netive.page.pageInnerLabel = function(){
        // netive.form.init();
        // netive.select.init();
        // netive.form.init();
        netive.tooltip.init();
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
    netive.page.pagePrint = function(){};
    netive.page.pageTableCaption = function(){};
    netive.page.pageTableCellFix = function(){
        netive.table.fixTd();
    };
    netive.page.pageTableScroll = function(){
        netive.table.scroll({
            callback:function(){
                netive.scrollBar.init();
                netive.scrollBar.init({
                    selector: 'tblScrollTest1'
                });
            }
        });
    };
    netive.page.pageTime = function(){
        console.log('time')
        netive.inputTime.init();


    };
    netive.page.pageBrickList = function(){};
    netive.page.pageIcon = function(){};
    netive.page.pageModal = function(){
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

    netive.page.pageFileUpload = function(){
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
        netive.form.fileUpload(); 
    }

    netive.page.pageIssue = function(){
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

    netive.page.pageSlot = function(){
        //삭제
    }

    netive.page.pageTooltip = function(){
        netive.tooltip.init();

  
        

    }

    netive.page.pageToast = function(){
        console.log('toast start');
    }

    netive.page.pageRange = function(){
        netive.rangeSlider.init({
            id: 'range1'
        });
    
        netive.rangeSlider.init({
            id: 'range2',
            tickmark: 25
        });
    
        netive.rangeSlider.init({
            id: 'range3'
        });
    
        netive.rangeSlider.init({
            id: 'range4'
        });

         netive.rangeSlider.init({
            id: 'range22',
            tickmark: 10
        });
    }

    netive.page.pageSlide = function(){
        //삭제
    }

    netive.page.pageSelect = function(){
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

    netive.page.pagePopupBook = function(){
        //netive.uiPopupBook();
    }

    netive.page.pageScrollBar = function(){
        // netive.scrollBar.init({
        //     infiniteCallback: function(){
        //         console.log('infiniteCallback')
        //     }
        // });

        netive.scrollBar.init();

        netive.scrollBar.init({
            selector: 'scrollCallbackTest',
            infiniteCallback: function(){
                console.log('end act!!!!!!!!!!');
                alert('끝까지 왔죠');
            }
        });

    }

    netive.page.pageJsonCodingList = function(){
        netive.project.list({
            id: 'projectList',
            url: '../resources/data/codinglist.json',
            type: 'text'
        });
    }

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

    netive.page.pageInputFormat = function(){
  
    }

    netive.page.pageInputClear = function(){
        netive.form.init();
    }

    netive.page.pageFloatingRange = function(){
        netive.floating.range();
    }

    netive.page.pageFloating = function(){
        netive.floating.init();
    }

    netive.page.pageCountNumber = function(){
        // netive.count.step({ id:'exeCount1', value: 12345.678 });
        // netive.count.slot({ id:'exeCount2', value: 12345.678 });
    }
    netive.page.pageButton = function(){
        console.log('button')
  

    }
    netive.page.pageDropdown = function(){
        const dropchanges = doc.querySelectorAll('input[name="dropPs"]');
        const drop = doc.querySelector('#uiDrop1');

        // dropchanges.forEach(element => {
        //     element.addEventListener('change', function(){
        //         drop.dataset.ps = this.value;
        //         drop.textContent = 'dropdown (' + this.value + ')'; 
        //         console.log(this.value)
        //     });
        // });

        dropchanges.forEach(function(element) {
            element.addEventListener('change', function(){
                drop.dataset.ps = this.value;
                drop.textContent = 'dropdown (' + this.value + ')'; 
                console.log(this.value)
            });
        });

      
    
        netive.dropdown.init({ 
            id:'uiDrop1', 
            ps:'BL',
            src:'../html/components/dropdown_ajax.html',
            dropExpanded: true,
            callback: function(){

                netive.tab.init({ 
                    id: 'exeTab1', 
                    current:0 
                });

                netive.dropdown.init({ 
                    id:'uiDrop5', 
                    ps:'RB',
                    src:'../html/components/dropdown_ajax2.html',
                });
            }
        });
    }

    netive.page.pageTab = function(){
        netive.tab.init({ 
            id:'exeTab1', 
            current: 0, 
            callback:tabCallback 
        });

        function tabCallback(v){
            console.log(v);

            if (v.current === 0) {
                
                netive.tab.init({ 
                    id:'exeTab4', 
                    current:5, 
                    dynamic:true,
                    callback:tabCallback2 
                });
            }
        }
        function tabCallback2(v){
            const tab = doc.querySelector('.ui-tab[data-id="'+ v.id +'"]');
            const btns = tab.querySelectorAll('.ui-tab-btn');
            const tit = tab.querySelector('.ui-tab-tit');

            tit.textContent = btns[v.current].textContent;
            console.log(v);
        }
    }

    netive.page.pageTable = function(){
       
    }

    netive.page.pageSelection = function(){
        //netive.table.caption();
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
        // console.log('page.js-acco');
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
    
    netive.page.pageDatePicker = function(){
        // id="uiDate_view" 
		// value="2021-11-05" 
		// min="2020-12-05" 
		// max="2022-05-20" 
		// title="시작일"
        netive.datepicker.week = ['일', '월', '화', '수', '목', '금', '토', '년', '월', '일'];
        netive.datepicker.isFooter = false;
        netive.datepicker.init();
        // const datepickerView1 = document.querySelector('#uiDate_view');
        // netive.datepicker.init({
        //     id: datepickerView1.id,
        //     area: datepickerView1.closest('.ui-datepicker'),
        //     date: datepickerView1.value,
        //     min: datepickerView1.min,
        //     max: datepickerView1.max,
        //     title: datepickerView1.title,
        //     visible: true,
        //     callback: function(){
        //         console.log('callback init')
        //     }
        // });
    };

    netive.page.capture = function(){
        //삭제
    };

    netive.page.countNumber = function(){
        netive.count.step({ id:'exeCount1', value: 504025 });
        netive.uiCountSlide({ id:'exeCount2', value: 5040.25 });
    };

    netive.page.fileupload = function(){
        netive.uiFileUpload(); 
    };

})(window, document);
