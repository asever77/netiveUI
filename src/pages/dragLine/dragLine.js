import Toggle from '../../../assets/js/components/toggle.js';
import DragLine from '../../../assets/js/components/dragLine.js';
        
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.dragline = new DragLine({
    id: 'test',
    answer: 3, //정답 총 갯수
    callback: (v) => {
        console.log('callback', v);
    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v);
    },
    callbackCheck: (v) => {
        console.log('callbackCheck', v);
    }
});
setTimeout(UI.exe.dragline.init(), 2000)