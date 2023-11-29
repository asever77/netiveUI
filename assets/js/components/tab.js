export default class Tab {
    constructor(opt) {
        this.current = opt.current ? opt.current : false;
        this.id = opt.id;
        this.callback = opt.callback;
        this.tab = document.querySelector('.mdl-tab[data-tab-id="'+ this.id +'"]');
        this.tab_btns = this.tab.querySelectorAll('.mdl-tab-btn');
        this.pnl = document.querySelector('.mdl-tab-pnl[data-tab-id="'+ this.id +'"]');
        this.items = this.pnl.querySelectorAll('.mdl-tab-item');

        this.init();
    }
    init() {
        for (let item of this.tab_btns) {
            item.addEventListener('click', this.act);
        }

        !!sessionStorage.getItem(this.id) ? 
        this.selected(sessionStorage.getItem(this.id)) : (this.current === false) ? 
        this.selected(his.tab_btns[0].dataset.tab) : this.selected(this.current);
    }
    act = (e) => {
        const _this = e.currentTarget;
        const tab = _this.dataset.tab;
        this.selected(tab);
    }
    selected(tab) {
        const btn = this.tab.querySelector('.mdl-tab-btn[data-tab="'+ tab +'"]');
        const _selected = this.tab.querySelector('.mdl-tab-btn[data-selected="true"]');
        const item = this.pnl.querySelector('.mdl-tab-item[data-tab="'+ tab +'"]');
        const _selected_pnl = this.pnl.querySelector('.mdl-tab-item[data-selected="true"]');

        sessionStorage.setItem(this.id, tab);

        _selected ? _selected.dataset.selected = false : '';
        _selected_pnl ? _selected_pnl.dataset.selected = false : '';
        this.callback && this.callback({
            id: this.id,
            current: tab
        });

        btn.dataset.selected = true;
        item.dataset.selected = true;
    }
}
