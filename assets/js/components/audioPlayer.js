export default class AudioPlayer {
    constructor(opt) {
        this.players = document.querySelectorAll('.audio-player');
        this.item = null;
        this.current = null;
        this.init();
    }
    init() {
        for (const item of this.players) {
            item.dataset.state = 'stop';
            const _label = item.dataset.label;
            const btn = item.querySelector('.audio-player--btn');
            btn.setAttribute('aria-label',  _label + ' 실행');
            btn.addEventListener('click', this.act)
        }
    }
    allstop = (v) => {         
        for (const item of this.players) {
            const _audio = item.querySelector('audio');
            const _label = item.dataset.label;
            
            if (item.dataset.state === 'play' && (this.current !== _label || v)) {
                item.dataset.state = 'pause';
                item.querySelector('.audio-player--btn').setAttribute('aria-label',  _label + ' 정지');
                _audio.pause();
                _audio.currentTime = 0;
                this.current = null;
            }
        }
    } 
    timer = (v) => {
        const _time = v;
        const getMusicTimeFormat = (_time) => {
            let mm = Math.floor((_time % 3600) / 60).toString().padStart(2, '0');
            let ss = Math.floor(_time % 60).toString().padStart(2, '0');

            return mm + ':' + ss;
        }
        
        setTimeout(() => {
            cur.textContent = getMusicTimeFormat();
        }, 100);
    }
    act = (e) => {
        const _this = e.currentTarget;
        const file = _this.dataset.audio;
        const wrap = _this.closest('.audio-player');
        const _label = wrap.dataset.label;
        const _audio = wrap.querySelector('audio');
        _audio.loop = false;
        _audio.volume = 0.5;

        //초기화세팅
        this.item = wrap;
        this.current = _label;
        this.allstop();

        //실행여부에 따른 조건
        if (_audio?.paused) {
            wrap.dataset.state = 'play';
            _this.setAttribute('aria-label',  _label + ' 정지');
            this.timer(_audio);
            _audio.play();
        } else {
            wrap.dataset.state = 'pause';
            _this.setAttribute('aria-label',  _label + ' 실행');
            _audio?.pause();
        } 
        
        //종료
        _audio.addEventListener('ended', () => {
            console.log('끝');
            wrap.dataset.state = 'pause';
            _this.setAttribute('aria-label',  _label + ' 실행');
            _audio.currentTime = 0;
            this.current = null;
        });

        const cur = this.item.querySelector('.audio-player--time-cur');
        const dur = this.item.querySelector('.audio-player--time-dur');
        dur.textContent = getMusicTimeFormat(_audio.duration);


        wrap.querySelector('.audio-player--time-dur')
        console.log(Math.floor(_audio.duration));
        // const _audio = new Audio();
        
    }
}