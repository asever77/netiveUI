import Toggle from '../../../assets/js/components/toggle.js';
import DragLine from '../../../assets/js/components/dragLine.js';
        
const data = {
    quizID: 'test',
    sumAnswer: 3,
    isAnswer: false,
    lastAnswer: [
        // {key_0: '1', key_3: '1'},
        // {key_1: '3', key_4: '2'},
        // {key_2: '2', key_5: '3'}
    ],
}
const data2 = {
    quizID: 'test2',
    sumAnswer: 6,
    isAnswer: false,
    lastAnswer: [
        {
            "key_0": "1,2",
            "key_3": "1"
        },
        {
            "key_0": "1,2",
            "key_4": "2"
        },
        {
            "key_1": "2,3",
            "key_5": "3"
        },
        {
            "key_1": "2,3",
            "key_4": "2"
        }
    ],
}
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.dragline = new DragLine({
    id: data.quizID,
    answer: data.sumAnswer,
    lastAnswer: data.lastAnswer,
    callback: (v) => {
        //개별 이벤트 완료 시
        console.log('callback', v);
    }, 
    callbackComplete: (v) => {
        //전체 이벤트 완료 시
        data.lastAnswer = v.answer_last;
        data.isAnswer = v.answer_all_state;
        console.log('callbackComplete', v, data);
    },
    callbackCheck: (v) => {
        //체크 이벤트 실행 시
        console.log('callbackCheck', v);
    }
});
UI.exe.dragline2 = new DragLine({
    id: data2.quizID,
    answer: data2.sumAnswer,
    lastAnswer: data2.lastAnswer,
    callback: (v) => {
        //개별 이벤트 완료 시
        // console.log('callback', v);
    }, 
    callbackComplete: (v) => {
        //전체 이벤트 완료 시
        data.lastAnswer = v.answer_last;
        data.isAnswer = v.answer_all_state;
        console.log('callbackComplete', v, data);
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