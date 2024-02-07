class ReadLine {
    constructor(opt) {
        
        this.id = opt.id;
        this.el_wrap = document.querySelector('.mdl-readline[data-id="'+ opt.id +'"]');
        this.el_items = this.el_wrap.querySelectorAll('.mdl-readline-item');
        this.speed = '1000';
        this.lines = null;
        this.current_item - null;
        setTimeout( this.init(), 3000)
       
    }
    init() {
        for (let item of  this.el_items) {
            const el_txt = item.querySelector('.mdl-readline-txt');
            el_txt.insertAdjacentHTML('afterbegin', '<span class="mdl-readline-s"></span>');
            el_txt.insertAdjacentHTML("beforeend", '<span class="mdl-readline-e"></span>');
            const style = getComputedStyle(item);
            let lineH = style.lineHeight.split('px');
            lineH = Number(lineH[0]);

            const s = item.querySelector('.mdl-readline-s');
            const e = item.querySelector('.mdl-readline-e');
            const rect = item.getBoundingClientRect();
            const rect_s = s.getBoundingClientRect();
            const rect_e = e.getBoundingClientRect();
            item.dataset.line = (rect.height / lineH);
            const max = Math.round((rect_e.left - rect.left) / rect.width * 100) + 1;

            let html = ''
            html += '<div class="mdl-readline-back">';
            
            const aniDuration = 'animation-duration: ' + this.speed + 'ms';
            let cssTrainstion = 'transition: width ' + this.speed + 'ms linear';

            for (let i = 0, len = (rect.height / lineH); i < len; i++) {
                if (i !== (rect.height / lineH) - 1) {
                    html += '<div class="mdl-readline-line" style="height:'+lineH+'px; '+ aniDuration +'" data-state="wait"></div>';
                } else {
                    html += '<div class="mdl-readline-line" style="height:'+lineH+'px; max-width:'+max+'%; '+ aniDuration +'" data-max="'+ max +'" data-state="wait"></div>';
                }
            }

            html += '</div>';

            item.insertAdjacentHTML('beforeend', html);
        }

        this.lines = this.el_wrap.querySelectorAll('.mdl-readline-line[data-state="wait"]');
    }
    auto = () => {
        this.lines = this.el_wrap.querySelectorAll('.mdl-readline-line[data-state="wait"]'); 
        this.lines && this.play();
        
    }
    play = (e) => {
        console.log('paly');
        for (let item of this.lines )  {
            this.current_item = item;
            this.current_item.dataset.state = 'complete';
            this.current_item.addEventListener('animationend', this.auto);
            break;
        }
    }
    pause = (e) => {
        console.log('pause', this.current_item.style.animationPlayState);

        if (this.current_item.style.animationPlayState === 'paused') {
            this.current_item.style.animationPlayState = 'running';
        } else {
            this.current_item.style.animationPlayState = 'paused';
        }
    }
    reset() {
        const backs = this.el_wrap.querySelectorAll('.mdl-readline-back');
        const s = this.el_wrap.querySelectorAll('.mdl-readline-s');
        const e = this.el_wrap.querySelectorAll('.mdl-readline-e');
        for (let item of backs) {
            item.remove();
        }
        for (let item of s) {
            item.remove();
        }
        for (let item of e) {
            item.remove();
        }
        this.init();
    }
}


UI.exe.readline = new ReadLine({
    id: 'test'
});