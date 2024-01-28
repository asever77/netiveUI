export default class DrawDrop {
    constructor(opt) {
        this.id = opt.id;
        this.doc = document.documentElement;
        this.wrap = document.querySelector('.ui-drag[data-id="' + this.id + '"]');

        this.drops = this.wrap.querySelectorAll('.ui-drag-drop');
        this.area;

        this.wrap_t = this.wrap.getBoundingClientRect().top;
        this.wrap_l = this.wrap.getBoundingClientRect().left;
        this.wrap_w = this.wrap.offsetWidth;
        this.wrap_h = this.wrap.offsetHeight;
   

        this.init();
    }

    init() {
        const actStart = (e) => {
            e.preventDefault();
            const _this = e.currentTarget;
            const _name = _this.dataset.name;

            this.area = document.querySelector('.ui-drag-area[data-name="'+ _name +'"]');

            console.log(_name)

        }
         
        for (let item of this.drops) {
            item.addEventListener('mousedown', actStart);
            item.addEventListener('touchstart', actStart, {
                passive: true
            });
        }
    }
    


}