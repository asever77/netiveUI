import Toggle from '../../../assets/js/components/toggle.js';
import DragDrop from '../../../assets/js/components/dragDrop.js';
        
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

const data2 = {
    quizID: 'test2',
    answerLen: 4,
    isAnswer: false,
    a11y: 'true',
    lastAnswer: [
        {target: '1', object: '1'},
    ],
}
UI.exe.dragdrop2 = new DragDrop({
    id: data2.quizID,
    answerLen: data2.answerLen,
    lastAnswer: data2.lastAnswer,
    a11y: data2.a11y,
    callback: (v) => {
        console.log('callback', v);
    }
});


const data3 = {
    quizID: 'test3',
    answerLen: 2,
    isAnswer: false,
    a11y: 'true',
    lastAnswer: [
        {target: '1,2', object: '1'},
    ],
}
UI.exe.dragdrop3 = new DragDrop({
    id: data3.quizID,
    answerLen: data3.answerLen,
    lastAnswer: data3.lastAnswer,
    a11y: data3.a11y,
    callback: (v) => {
        console.log('callback', v);
    }
});



const data4 = {
    quizID: 'test4',
    answerLen: 4,
    isAnswer: false,
    a11y: 'true',
    lastAnswer: [
        {
            "target": "4",
            "object": "4"
        },
        {
            "target": "3",
            "object": "3"
        },
        {
            "target": "2",
            "object": "2"
        },
        {
            "target": "1",
            "object": "1"
        }
    ],
}
UI.exe.dragdrop4 = new DragDrop({
    id: data4.quizID,
    answerLen: data4.answerLen,
    lastAnswer: data4.lastAnswer,
    a11y: data4.a11y,
    callback: (v) => {
        console.log('callback', v);
    }
});

const data = {
    quizID: 'test',
    answerLen: null,
    isAnswer: false,
    a11y: 'false',
    lastAnswer: null
}

UI.exe.dragdrop = new DragDrop({
    id: data.quizID,
    answerLen: 4,
    isAnswer: false,
    lastAnswer: null,
    a11y: data.a11y,
    callback: (v) => {
        console.log('callback', v);
    }
});