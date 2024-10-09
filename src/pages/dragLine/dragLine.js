import Toggle from '../../../assets/js/components/toggle.js';
import DragLine from '../../../assets/js/components/dragLine.js';

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

const data = {
    quizID: 'test',
    sumAnswer: 3,
    isAnswer: false,
    lastAnswer: null
    // lastAnswer: [
    //     {key_0: '1', key_3: '1', "label": "응용 소프트웨어1와 문제 키워드1, 문제 키워드2 연결됨",},
    //     {key_1: '3', key_4: '2'},
    //     {key_2: '2', key_5: '3'}
    // ],
}
UI.exe.dragline = new DragLine({
    id: data.quizID,
    answer: data.sumAnswer,
    lastAnswer: data.lastAnswer,
    callback: (v) => {
        //개별 이벤트 완료 시
        console.log('callback', v);
    },
});

const data2 = {
    quizID: 'test2',
    sumAnswer: 5,
    isAnswer: false,
    lastAnswer: null
    // lastAnswer: [
    //     {
    //         "key_0": "1,2",
    //         "key_3": "1",
    //         "label": "응용 소프트웨어1와 문제 키워드1, 문제 키워드2 연결됨",
    //     },
    //     {
    //         "key_0": "1,2",
    //         "key_4": "2",
    //         "label": "응용 소프트웨어1와 문제 키워드1, 문제 키워드2 연결됨",
    //     },
    //     {
    //         "key_1": "2,3",
    //         "key_5": "3",
    //         "label": "응용 소프트웨어2와 문제 키워드2, 문제 키워드3 연결됨",
    //     },
    //     {
    //         "key_1": "2,3",
    //         "key_4": "2",
    //         "label": "응용 소프트웨어2와 문제 키워드2, 문제 키워드3 연결됨",
    //     }
    // ],
}
UI.exe.dragline2 = new DragLine({
    id: data2.quizID,
    answer: data2.sumAnswer,
    lastAnswer: data2.lastAnswer,
    callback: (v) => {
        //개별 이벤트 완료 시
        console.log('callback', v);
    }, 
});
