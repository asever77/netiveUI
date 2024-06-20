import AudioPlayer from '../../../assets/js/components/audioPlayer.js';
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

const code1 = `//data-label 값은 유니크한 값
<div class="audio-player" data-label="제목1" data-align="{ left | right | center }">
    <button type="button" class="audio-player--btn"></button>
    <audio>
        <source src="{ audio file }">
    </audio>
    <div class="audio-player--subtitles">
        <div>
            { 자막텍스트 }
        </div>
    </div>
</div>`;
document.querySelector('[data-code="code1"]').textContent = code1;
const code2 = `//기본실행
UI.exe.audioplayer = new AudioPlayer();
//전체 정지
UI.exe.audioplayer.allstop();`;

document.querySelector('[data-code="code2"]').textContent = code2;

hljs.highlightAll();


UI.exe.audioplayer = new AudioPlayer();


//current page script
 