export default class IABoard {
    constructor(opt) {
        this.file = opt.url;
        this.id = opt.id;
        this.nav = document.querySelector('.nav-tree');
        this.nav_btns = this.nav.querySelectorAll('button');
        this.link = '';
        this.main = document.querySelector('.base-main');
        this.tit = this.main.querySelector('.tit');
        this.items = this.main.querySelectorAll('.item');
        this.selects = this.main.querySelectorAll('select');
        this.a = this.main.querySelectorAll('a');
        this.len = this.items.length;
        this.treeInfo = null;

        this.init();
    }
    iframe() {
        setTimeout(() => {
            let _link = document.createElement('link');
            _link.rel = 'stylesheet';
            _link.href = '../../assets/css/iframe.css';
            iframe.contentWindow.document.head.appendChild(_link);
        },300);
    }
    init() {
        const loadItems = () => {
            return fetch(this.file).then((response) => response.json()).then((json) => json.list);
        }

        loadItems().then((item) => {
            const ia = (item) => {
                const dataExecel = item;
                let today = new Date();
                const getFormatDate = (date) => {
                    const year = date.getFullYear();
                    let month = (1 + date.getMonth());
                    let day = date.getDate();

                    month = month >= 10 ? month : '0' + month;
                    day = day >= 10 ? day : '0' + day;

                    return year + '-' + month + '-' + day;
                }
                const changeFormatDate = (date) => {
                    const year = date.substring(0, 4);
                    let month = date.substring(4, 6);
                    let day = date.substring(6, 8);
                    month = month >= 10 ? month : '0' + month;
                    day = day >= 10 ? day : '0' + day;

                    return year + '-' + month + '-' + day;
                }
                const dateDiff = (...arg) => {
                    const _date1 = arg[0];
                    const _date2 = arg[1];

                    let diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
                    let diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

                    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
                    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());

                    const gt1 = diffDate_1.getTime();
                    const gt2 = diffDate_2.getTime();

                    return gt2 - gt1 < 0 ? '' : '-' + Math.ceil(Math.abs(gt2 - gt1) / (1000 * 3600 * 24));
                }

                today = getFormatDate(today);

                let state, date, wdate, mod, pub, pln, des, dev, id, name, type, memo, overl;
                let d1, d2, d3, d4, d5, d6, d7, d8, d9, d10;
                let r1, r2, r3, r4;
                let d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_, d9_, d10_;
                let endsum = 0,
                    delsum = 0,
                    watsum = 0,
                    num = -1,
                    ctg_state = [],
                    ctg_pub = [],
                    ctg_dev = [],
                    ctg_date = [],
                    ctg_wdate = [],
                    ctg_menu = [],
                    cls2 = '',
                    cls = '',
                    root = '',
                    table = '';

                const dataExecelList = dataExecel;
                const len = dataExecelList.length;

                for (let i = 0; i < len; i++) {
                    const dataCurrent = dataExecelList[i];

                    state = dataCurrent.state || '';
                    date = dataCurrent.date || '';
                    wdate = dataCurrent.wdate || '';
                    mod = dataCurrent.mod || '';
                    pub = dataCurrent.pub || '';
                    pln = dataCurrent.pln || '';
                    des = dataCurrent.des || '';
                    dev = dataCurrent.dev || '';
                    type = dataCurrent.type || '';
                    id = dataCurrent.id || '';
                    name = dataCurrent.name || '';
                    memo = dataCurrent.memo || '';

                    d1 = dataCurrent.d1 || '';
                    d2 = dataCurrent.d2 || '';
                    d3 = dataCurrent.d3 || '';
                    d4 = dataCurrent.d4 || '';
                    d5 = dataCurrent.d5 || '';
                    d6 = dataCurrent.d6 || '';
                    d7 = dataCurrent.d7 || '';
                    d8 = dataCurrent.d8 || '';
                    d9 = dataCurrent.d9 || '';
                    d10 = dataCurrent.d10 || '';

                    r1 = dataCurrent.r1 || '';
                    r2 = dataCurrent.r2 || '';
                    r3 = dataCurrent.r3 || '';
                    r4 = dataCurrent.r4 || '';
                    overl = dataCurrent.overlap || '';
                    root = dataCurrent.root || '';

                    let list_n = (i - 1 < 0) ? 0 : i;

                    (d1 !== '') ? d1_ = dataExecelList[list_n].d1 : d1 = d1_;

                    if (dataCurrent.d1 === '') {
                        (d2 !== '') ? d2_ = dataExecelList[list_n].d2 : d2 = d2_;

                        if (dataCurrent.d2 === '') {
                            (d3 !== '') ? d3_ = dataExecelList[list_n].d3 : d3 = d3_;

                            if (dataCurrent.d3 === '') {
                                (d4 !== '') ? d4_ = dataExecelList[list_n].d4 : d4 = d4_;

                                if (dataCurrent.d4 === '') {
                                    (d5 !== '') ? d5_ = dataExecelList[list_n].d5 : d5 = d5_;

                                    if (dataCurrent.d5 === '') {
                                        (d6 !== '') ? d6_ = dataExecelList[list_n].d6 : d6 = d6_;

                                        if (dataCurrent.d6 === '') {
                                            (d7 !== '') ? d7_ = dataExecelList[list_n].d7 : d7 = d7_;

                                            if (dataCurrent.d7 === '') {
                                                (d8 !== '') ? d8_ = dataExecelList[list_n].d8 : d8 = d8_;

                                                if (dataCurrent.d8 === '') {
                                                    (d9 !== '') ? d9_ = dataExecelList[list_n].d9 : d9 = d9_;

                                                    if (dataCurrent.d9 === '') {
                                                        (d10 !== '') ? d10_ = dataExecelList[list_n].d10 : d10 = d10_;
                                                    } else {
                                                        (!!dataExecelList[list_n].d10) ? d10_ = dataExecelList[list_n].d10 : d10_ = '';
                                                    }

                                                } else {
                                                    (!!dataExecelList[list_n].d9) ? d9_ = dataExecelList[list_n].d9 : d9_ = '';
                                                }
                                            } else {
                                                (!!dataExecelList[list_n].d8) ? d8_ = dataExecelList[list_n].d8 : d8_ = '';
                                            }
                                        } else {
                                            (!!dataExecelList[list_n].d7) ? d7_ = dataExecelList[list_n].d7 : d7_ = '';
                                        }
                                    } else {
                                        (!!dataExecelList[list_n].d6) ? d6_ = dataExecelList[list_n].d6 : d6_ = '';
                                    }
                                } else {
                                    (!!dataExecelList[list_n].d5) ? d5_ = dataExecelList[list_n].d5 : d5_ = '';
                                }
                            } else {
                                (!!dataExecelList[list_n].d4) ? d4_ = dataExecelList[list_n].d4 : d4_ = '';
                            }
                        } else {
                            (!!dataExecelList[list_n].d3) ? d3_ = dataExecelList[list_n].d3 : d3_ = '';
                        }
                    } else {
                        (!!dataExecelList[list_n].d2) ? d2_ = dataExecelList[list_n].d2 : d2_ = '';
                    }

                    !!dataCurrent.d1 ? d1 = dataCurrent.d1 : '';
                    !!dataCurrent.d2 ? d2 = dataCurrent.d2 : '';
                    !!dataCurrent.d3 ? d3 = dataCurrent.d3 : '';
                    !!dataCurrent.d4 ? d4 = dataCurrent.d4 : '';
                    !!dataCurrent.d5 ? d5 = dataCurrent.d5 : '';
                    !!dataCurrent.d6 ? d6 = dataCurrent.d6 : '';
                    !!dataCurrent.d7 ? d7 = dataCurrent.d7 : '';
                    !!dataCurrent.d8 ? d8 = dataCurrent.d8 : '';
                    !!dataCurrent.d9 ? d9 = dataCurrent.d9 : '';
                    !!dataCurrent.d10 ? d10 = dataCurrent.d10 : '';

                    endsum = (state === "완료") ? endsum + 1 : endsum;
                    // tstsum = (state === "검수") ? tstsum + 1 : tstsum;
                    delsum = (state === "제외") ? delsum + 1 : delsum;
                    watsum = (state === "대기") ? watsum + 1 : watsum;

                    const x = (i === 0) ? 0 : i - 1;
                    let depthChange = false;

                    const depthClass = (v) => {
                        if (dataCurrent['d' + v] !== '' && dataCurrent['d' + v] !== dataExecelList[x]['d' + v]) {
                            dataCurrent['c' + v] = ' c' + v
                            depthChange = true;
                        } else {
                            dataCurrent['c' + v] = depthChange ? ' c' + v : '';
                        }
                    }

                    for (let j = 0; j < 10; j++) {
                        depthClass(j + 1);
                    }

                    cls2 =
                        state === '완료' ? 'end' :
                            state === '제외' ? 'del' :
                                state === '약관' ? 'trm' : '';

                    cls = cls2 + dataCurrent.c1 + dataCurrent.c2 + dataCurrent.c3 + dataCurrent.c4 + dataCurrent.c5 + dataCurrent.c6 + dataCurrent.c7 + dataCurrent.c8 + dataCurrent.c9 + dataCurrent.c10;

                    ctg_state.push(dataCurrent.state);
                    ctg_pub.push(dataCurrent.pub);
                    ctg_dev.push(dataCurrent.dev);
                    state !== '제외' ? ctg_date.push(dataCurrent.date) : '';
                    ctg_wdate.push(dataCurrent.wdate);
                    ctg_menu.push(dataCurrent.d2);

                    if (i === 0) {
                        table += '<div class="tbl-base">';
                        table += '<table>';
                        table += '<caption>코딩리스트</caption>';
                        table += '<colgroup><col style="width:120px"><col span="7" style="width:120px"><col style="width:30px"></colgroup>';
                        table += '<thead>';
                        // table += '<th scope="col">' + state + '</th>';
                        // table += '<th scope="col">' + date + '</th>';
                        // table += '<th scope="col">' + wdate + '</th>';
                        // table += '<th scope="col">' + mod + '</th>';
                        // table += '<th scope="col">' + pub + '<button type="button" class="btn-base small icon-only no-line" data-material="last_page" id="nameToggle"></button></th>';
                        // table += '<th scope="col" class="name-tg">' + pln + '</th>';
                        // table += '<th scope="col" class="name-tg">' + des + '</th>';
                        // table += '<th scope="col" class="name-tg">' + dev + '</th>';
                        table += '<th scope="col">' + name + '</th>';
                        table += '<th scope="col">' + d1 + '</th>';
                        table += '<th scope="col">' + d2 + '</th>';
                        table += '<th scope="col">' + d3 + '</th>';
                        table += '<th scope="col">' + d4 + '</th>';
                        table += '<th scope="col">' + d5 + '</th>';
                        table += '<th scope="col">' + d6 + '</th>';
                        table += '<th scope="col">' + d7 + '</th>';

                        table += '<th scope="col">' + type + '</th>';
                        

                        // table += '<th scope="col">' + id + '</th>';

                        // table += '<th scope="col">' + d8 + '</th>';
                        // table += '<th scope="col">' + d9 + '</th>';
                        // table += '<th scope="col">' + d10 + '</th>';
                        // table += '<th scope="col">' + memo + '</th>';
                        table += '</thead>';
                        table += '<tbody>';
                    } else {
                        num = num + 1;

                        if (!(date === '미정' || date === '일정' || date === undefined) && state !== '완료') {
                            let dateStart = date;

                            dateStart = changeFormatDate(dateStart)
                            const care = dateDiff(dateStart, new Date());

                            if (care < 3 && care >= 0) {
                                cls = cls + ' sch_care';//일정경고
                            } else if (care < 0) {
                                cls = cls + ' sch_warn';//일정위험
                            }
                        }

                        if (!(wdate === '미정' || wdate === '작업일' || date === undefined) && state === '완료') {
                            let dateStart = wdate;

                            dateStart = changeFormatDate(dateStart)
                            const todayModify = dateDiff(dateStart, new Date());

                            if (Number(todayModify) === 0) {
                                cls = cls + ' today-mod';
                            }
                        }
                        if (!!dataCurrent.c1) {
                            table += '</tbody>';
                            table += '<tbody>';
                        }
                        table += '<tr class="' + cls + '" data-id="' + name + '" data-pub="' + pub + '" data-state="' + state + '">';
                        // table += '<td class="state" ><span>' + state + '</span></td>';
                        // table += '<td class="date"><span>' + date.substring(4, 10) + '</span></td>';
                        // table += '<td class="date"><span>' + wdate.substring(4, 10) + '</span></td>';
                        // table += '<td class="mod"><span>' + mod + '</span></td>';
                        // table += '<td class="name" ><span>' + pub + '</span></td>';
                        // table += '<td class="name name-tg"><span>' + pln + '</span></td>';
                        // table += '<td class="name name-tg"><span>' + des + '</span></td>';
                        // table += '<td class="name name-tg"><span>' + dev + '</span></td>';

                        const typename = type === 'V' ? 'V' : type === 'P' ? 'P' : type === 'L' ? 'L' : type === 'i' ? 'I' : type === 'W' ? 'M' : type === 'T' ? 'T' : '';

                        
                        table += name !== '' ?
                            '<td class="id ico_pg"><span><a class="ui-coding-link" href="' + (root + name) + '.html" target="coding">' + name + '</a> </td>' :
                            '<td class="id "><span></span></td>';

                        table += '<td class="d d1 ' + (d1 && 'is') + '"><span>' + d1 + '</span></td>';
                        table += '<td class="d d2 ' + (d2 && 'is') + '"><span>' + d2 + '</span></td>';
                        table += '<td class="d d3 ' + (d3 && 'is') + '"><span>' + d3 + '</span></td>';
                        table += '<td class="d d4 ' + (d4 && 'is') + '"><span>' + d4 + '</span></td>';
                        table += '<td class="d d5 ' + (d5 && 'is') + '"><span>' + d5 + '</span></td>';
                        table += '<td class="d d6 ' + (d6 && 'is') + '"><span>' + d6 + '</span></td>';
                        table += '<td class="d d7 ' + (d7 && 'is') + '"><span>' + d7 + '</span></td>';

                        table += '<td class="type-' + type + '" style="text-align:center"><span>' + typename + '</span></td>';
                        
                        // table += '<td class="type-' + type + '"><span>' + id + '</span></td>';

                        // table += '<td class="d d8"><span>' + d8 + '</span></td>';
                        // table += '<td class="d d9"><span>' + d9 + '</span></td>';
                        // table += '<td class="d d10"><span>' + d10 + '</span></td>';
                        // table += '<td class="memo"><span>' + memo + '</span></td>';
                        table += '</tr>';
                        (i === len - 1) ? table += '</tbody>' : '';
                        (i === len - 1) ? table += '</table>' : '';
                    }
                    table += '</div>';
                    root = '';
                }

                const codinglist = document.querySelector('#' + this.id);
                codinglist.innerHTML = table;
                table = '';

                //head
                let info = '<div class="ui-codinglist-header">';
                info += '<div class="ui-codinglist-state"><dl><dt>' + today + '</dt><dd>'
                info += '<ul class="ui-codinglist-info">';
                info += '<li><b class="target">전체</b> 진행율 : <span class="n_all">0</span> / <span class="total">0</span> (<span class="per0">0</span>%)</li>';
                info += '</ul></dd></dl><span class="bar"><span></div>';
                info += '<div class="box-srch mt-x1">';
                info += '<div class="srch-area">';
                info += '<div class="ui-select mr-x1" style="width:290px"><select title="상태" id="arstate">';

                const arstate = Array.from(new Set(ctg_state));
                for (let i = 0; i < arstate.length; i++) {
                    if (i === 0) {
                        info += '<option value="전체">All State</option>';
                    } else {
                        info += '<option value="' + arstate[i] + '">' + arstate[i] + '</option>';
                    }
                }

                info += '</select></div>';
                info += '<div class="ui-select mr-x1" style="width:290px"><select title="작업담당자" id="pubWorker">';

                const pubworker = Array.from(new Set(ctg_pub));
                for (let i = 0; i < pubworker.length; i++) {
                    if (i === 0) {
                        info += '<option value="전체">All Worker</option>';
                    } else {
                        info += '<option value="' + pubworker[i] + '">' + pubworker[i] + '</option>';
                    }
                }

                info += '</select></div>';
                info += '<input type="search" id="projectListSrchCode" class="inp-base ui-inpcancel mr-x1" value="" placeholder="검색어를 입력해주세요.">';
                info += '<button type="button" id="projectListSrchBtn" class="btn-base"><span>검색</span></button>';
                info += '</div>';
                info += '</div>';
                codinglist.insertAdjacentHTML('afterbegin', info);

                const links = document.querySelectorAll('.ui-coding-link');
                for (let i = 0; i < links.length; i++) {
                    links[i].addEventListener('click', (e) => {

                        if (window.outerWidth > 799) {
                            e.preventDefault();
                            const that = e.currentTarget;
                            const parentWrap = that.closest('tr');
                            console.log(that.href, window.outerWidth);
                            sessionStorage.setItem('codinglist', parentWrap.dataset.id);

                            document.querySelector('.ui-codinglist-iframe a').href = that.href;
                            document.querySelector('.ui-codinglist-iframe iframe').src = that.href;
                            document.querySelector('.ui-codinglist-iframe a').textContent = that.href;
                            const sId = sessionStorage.getItem('codinglist');
                            if (!!document.querySelector('.ui-codinglist tr.on')) {
                                document.querySelector('.ui-codinglist tr.on').classList.remove('on');
                            }
                            document.querySelector('[data-id="' + sId + '"]').classList.add('on');
                            setTimeout(()=>{
                                let _link = document.createElement('link');
                                _link.rel = 'stylesheet';
                                _link.href = '../../assets/css/iframe.css';
                                document.querySelector('.ui-codinglist-iframe iframe').contentWindow.document.head.appendChild(_link);
                            },300)
                        }

                    });
                }

                document.querySelector('#pubWorker').addEventListener('change', (e) => {
                    const that = e.currentTarget;

                    if (that.value === '전체') {
                        document.querySelector('.ui-codinglist').removeAttribute('data-pub');
                        perSet(len, endsum, delsum);
                    } else {
                        document.querySelector('.ui-codinglist').dataset.pub = that.value;


                    }

                    const pubs = document.querySelectorAll('tr[data-pub="' + that.value + '"]');
                    const pubs_end = document.querySelectorAll('tr[data-pub="' + that.value + '"][data-state="완료"]');
                    const pubs_del = document.querySelectorAll('tr[data-pub="' + that.value + '"][data-state="제외"]');
                    const trs = document.querySelectorAll('tr');
                    trs.forEach(function (tr) {
                        tr.classList.remove('worker-view');
                    });
                    pubs.forEach(function (pub) {
                        pub.classList.add('worker-view');
                    });

                    document.querySelector('.ui-codinglist-info .target').textContent = that.value;

                    if (that.value === '전체') {
                        perSet(len, endsum, delsum);
                    } else {
                        const target_len = pubs.length;
                        const target_endsum = pubs_end.length;
                        const target_delsum = pubs_del.length;

                        perSet(target_len, target_endsum, target_delsum);
                    }
                });

                document.querySelector('#arstate').addEventListener('change', (e) => {
                    const that = e.currentTarget;

                    if (that.value === '전체') {
                        document.querySelector('.ui-codinglist').removeAttribute('data-state');
                    } else {
                        document.querySelector('.ui-codinglist').dataset.state = that.value;
                    }

                    const pubs = document.querySelectorAll('tr[data-state="' + that.value + '"]');
                    const trs = document.querySelectorAll('tr');

                    trs.forEach((tr) => {
                        tr.classList.remove('state-view');
                    });
                    pubs.forEach((pub) => {
                        pub.classList.add('state-view');
                    });
                });

                // document.querySelector('#nameToggle').addEventListener('click', () => {
                //   document.querySelector('.ui-codinglist').classList.toggle('name-toggle-view');
                // });

                const el_info = document.querySelector('.ui-codinglist-info');
                const el_total = el_info.querySelector('.total');
                const el_all = el_info.querySelector('.n_all');
                const el_per0 = el_info.querySelector('.per0');
                const el_bar = document.querySelector('.ui-codinglist-state .bar');
                const srchCode = document.querySelector('#projectListSrchCode');
                const srchBtn = document.querySelector('#projectListSrchBtn');

                const perSet = (len, endsum, delsum) => {
                    const _len = len;
                    const _endsum = endsum;
                    const _delsum = delsum;

                    el_total.textContent = (_len - _delsum - 1);
                    el_all.textContent = _endsum;
                    el_per0.textContent = (_endsum / (_len - _delsum - 1) * 100).toFixed(0);
                    el_bar.style.width = (_endsum / (_len - _delsum - 1) * 100).toFixed(0) + '%';
                }
                const srchAct = () => {

                    const k = srchCode.value;
                    const el = document.querySelector('.ui-codinglist table');
                    const el_td = el.querySelectorAll('td');
                    const el_tr = el.querySelectorAll('tr');

                    console.log(el)

                    for (let i = 0, len = el_tr.length; i < len; i++) {
                        const that = el_tr[i];
                        that.classList.add('srch-hidden');
                    }

                    for (let i = 0, len = el_td.length; i < len; i++) {
                        const that = el_td[i];
                        const text = that.textContent;
                        const el_tr2 = that.closest('tr');

                        if (text.indexOf(k) >= 0) {
                            el_tr2.classList.remove('srch-hidden');
                        }
                    }
                }

                perSet(len, endsum, delsum);

                if (srchCode.value !== '') {

                    var temp = $('.ui-codinglist tbody tr td *:contains(' + $('#projectListSrchCode').val() + ')');

                    $('.ui-codinglist tbody tr').hide();
                    $(temp).closest('tr').show();
                }

                srchBtn.addEventListener('click', srchAct);
                srchCode.addEventListener('keyup', () => {
                    if (window.event.keyCode === 13) {
                        srchAct();
                    }
                });
            }
           
            ia(item);
        }).then(() => {
            this.nav_btns = this.nav.querySelectorAll('button');
            for (const nav_btn of this.nav_btns) {
                nav_btn.addEventListener('click', this.act.bind(this));
            }
            for (const sel of this.selects) {
                sel.addEventListener('change', this.change.bind(this));
            }
        });
    }
    set(v) {
        const iframes = document.querySelectorAll('iframe');
        const links = document.querySelectorAll('.base-main a[target]');
        for (let that of links) {
            that.href = v;
        }
        for (let iframe of iframes) {
            iframe.src = v;
        }
    }
    change(event) {
        const select = event.currentTarget;
        const v = select.value;
        const id = select.dataset.id;
        const iframe = document.querySelector('iframe[data-id="' + id + '"]');
        iframe.name = v;


    }
    act(event) {
        const _this = this;
        const btn = event.currentTarget;
        const wrap = btn.parentNode;
        const link = btn.dataset.link;
        const childs = wrap.children;
        let isTree = false;

        // document.querySelector('.base-wrap').dataset.type = 'tree';

        for (let i of childs) {
            if (i.classList.contains('ico')) {
                isTree = true;
                break;
            }
        }

        for (let item of this.nav_btns) {
            item.classList.remove('selected');
        }
        btn.classList.add('selected');

        if (!wrap.classList.contains('on')) {
            wrap.classList.add('on');
        } else {
            wrap.classList.remove('on');
        }

        if (!!link) {
            const styleScroll = '';

            for (let i = 0; i < _this.len; i++) {
                const _input = _this.items[i].querySelector('input');
                const _iframe = _this.items[i].querySelector('iframe');
                // const name = _this.items[i].querySelector('select').value;

                // if (_input.checked) {
                    _iframe.src = link;
                    // _iframe.name = name;
                    _this.items[i].querySelector('a').href = link;
                    _this.items[i].querySelector('a').textContent = link;

                    sessionStorage.setItem('tree', link);

                    setTimeout(() => {
                        // const _body = _iframe.contentWindow.document.querySelector('.scrollBox');
                        // _body && _body.classList.add('style-scroll');
                        let _link = document.createElement('link');
                        _link.rel = 'stylesheet';
                        _link.href = '../../assets/css/iframe.css';
                        _iframe.contentWindow.document.head.appendChild(_link);

                    }, 300);
                // }
            }
        }
    }
    all(v) {
        if (v) {
            const uls = document.querySelectorAll('ul');
            for (let ul of uls) {
                const ul_parent = ul.parentNode;
                console.log(ul_parent.tagName);
                ul_parent.tagName === 'LI' && ul_parent.classList.add('on');
            }
        } else {
            const lis = document.querySelectorAll('li.on');
            for (let li of lis) {
                li.classList.remove('on');
            }
        }
    }
   
}
