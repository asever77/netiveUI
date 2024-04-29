import Toggle from '../../../assets/js/components/toggle.js';
import DragLine from '../../../assets/js/components/dragLine.js';
        
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.dragline = new DragLine({
    id: 'test',
    answer: 3,
    callback: (v) => {
        //개별 이벤트 완료 시
        console.log('callback', v);
    }, 
    callbackComplete: (v) => {
        //전체 이벤트 완료 시
        console.log('callbackComplete', v);
    },
    callbackCheck: (v) => {
        //체크 이벤트 실행 시
        console.log('callbackCheck', v);
    }
});
UI.exe.dragline2 = new DragLine({
    id: 'test2',
    answer: 4,
    callback: (v) => {
        //개별 이벤트 완료 시
        console.log('callback', v);
    }, 
    callbackComplete: (v) => {
        //전체 이벤트 완료 시
        console.log('callbackComplete', v);
    },
    callbackCheck: (v) => {
        //체크 이벤트 실행 시
        console.log('callbackCheck', v);
    }
});
setTimeout(() => {
    UI.exe.dragline.init();
    UI.exe.dragline2.init()
}, 100)