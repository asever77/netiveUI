;(function(win, doc, undefined) {
    console.log('page.js');

    'use strict';

    console.log('page ready after');
    netive.common.init();  

    netive.page.pageInputPlaceholder = function(){};
    
    netive.page.pageInnerLabel = function(){
        netive.form.init();
        netive.select.init();
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
        //삭제
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
                netive.scrollBar();
                netive.scrollBar({
                    selector: doc.querySelector('.ui-scrollbar[data-scroll-id="tblScrollTest1"]')
                });

                const wrap = doc.querySelector('.ui-scrollbar[data-scroll-id="tblScrollTest1"]').closest('.ui-tablescroll');
                wrap.querySelector('.ui-tablescroll-clone').classList.add('aa')
            }
        });
    };

    netive.page.pageBrickList = function(){
        //삭제
    };

    netive.page.pageModal = function(){
        const test = doc.querySelector('.test-modal');
        const btns = test.querySelectorAll('.btn-base');

        for (let that of btns) {
            that.addEventListener('click', modalShow);
        }

        function modalShow() {
            const btn = this;

            netive.modal.show({ 
                id: btn.getAttribute('modal-id'), 
                ps: btn.getAttribute('modal-ps') === undefined ? 'center' : btn.getAttribute('modal-ps'), 
                src: btn.getAttribute('modal-src') === undefined ? false : btn.getAttribute('modal-src'), 
                full: btn.getAttribute('modal-mobilefull') === undefined ? false : btn.getAttribute('modal-mobilefull') === 'true' && true, 
                width: btn.getAttribute('modal-width') === undefined ? false : btn.getAttribute('modal-width'), 
                height: btn.getAttribute('modal-height') === undefined ? false : btn.getAttribute('modal-height'), 
                innerScroll : btn.getAttribute('modal-scroll') === undefined ? false : btn.getAttribute('modal-scroll') === 'true' && true, 
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

            for (let that of el_tr) {
                that.classList.add('srch-hidden');
            }

            for (let that of el_tag) {
                const text = that.textContent;
                const el_tr2 = that.closest('.srch-hidden');

                console.log(text.indexOf(k), text, k);

                if (text.indexOf(k) >= 0) {
                    console.log(1111);
                    
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
        netive.scroll.parallax({
            callback:function(v) {
               console.log(v);
            }
        });

        netive.callback.parallax01 = function(opt){
            const el = opt.el;
            const n = opt.n;
            
            el.style.opacity = n;
            el.style.transform = 'translate('+ ((100 - n * 100).toFixed(2)) +'% ,0)'
        }
        netive.callback.parallax02 = function(opt){
            const el = opt.el;
            const n = opt.n;
            
            el.style.opacity = n;
            el.style.transform = 'translate('+ ((100 - n * 100).toFixed(2) * -1) +'% ,0)'
        }
        netive.callback.parallax03 = function(opt){
            const el = opt.el;
            const n = opt.n;
            
            el.style.opacity = n;
        }
        netive.callback.parallax04 = function(opt){
            const el = opt.el;
            const n = opt.n;
            
            el.style.opacity = n;
            el.style.transform = 'translate('+ ((100 - n * 100).toFixed(2)) +'% ,0)'
        }
        netive.callback.parallax05 = function(opt){
            const el = opt.el;
            const n = opt.n;
            
            el.style.opacity = n;
        }
        netive.callback.parallax06 = function(opt){
            const el = opt.el;
            const n = opt.n;
            
            el.style.opacity = n;
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

        netive.scrollBar();
    }

    netive.page.pageJsonCodingList = function(){
        netive.project.list({
            id: 'projectList',
            url: '/netiveUI/resources/data/codinglist.json',
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

    netive.page.pageDropdown = function(){
        const dropchange = doc.querySelector('.drop-ps-change');

        dropchange.addEventListener('change', function(){
            const wrap = this.closest('.box-guide');
            const drop = wrap.querySelector('.ui-drop');

            drop.dataset.ps = this.value;
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
            current: 0, 
            effect: 'eff-fade',
            callback:tabCallback 
        });

        function tabCallback(v){
            if (v.current === 0) {
                netive.tab.init({ 
                    id:'exeTab4', 
                    current:5, 
                    onePanel:true,
                    callback:tabCallback2 
                });
            }
        }
        function tabCallback2(v){
            const tab = doc.querySelector('#'+ v.id);
            const btns = tab.querySelectorAll('.ui-tab-btn');
            const tit = tab.querySelector('.ui-tab-tit');

            tit.textContent = btns[v.current].textContent;
            console.log(v);
        }
    }

    netive.page.pageTable = function(){
        netive.table.caption();
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
            const exe = doc.querySelector('#exeAcco1');

            exe.insertAdjacentHTML('beforeend', add_html);

            netive.accordion.init({ 
                id: 'exeAcco1', 
                add: true,
                callback: function(){console.log('callback')} 
            });
        });

    }
    
    netive.page.pageDatePicker = function(){};

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
