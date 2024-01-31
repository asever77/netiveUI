import Toggle from '../../../assets/js/components/toggle.js';
import DragDrop from '../../../assets/js/components/dragDrop.js';
        
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.dragdrop = new DragDrop({
    id: 'test',
    answer: [
        { name: 1, sum: 3, move: true, limit: 5, copy: true, state: false},
        { name: 2, sum: 1, move: true, align: 'center', limit: 1, state: false },
        { name: 3, sum: 2, move: true, align: 'center', limit: 'infinite', copy: true, state: false },
    ],
    callback: (v) => {
        console.log('callback', v);
    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v);
    }
});


UI.exe.dragdrop2 = new DragDrop({
    id: 'test2',
    answer: [
        { name: 1, sum: 1, move: true, align: 'center', limit: 1, state: false },
        { name: 2, sum: 1, move: true, align: 'center', limit: 1, state: false },
        { name: 3, sum: 1, move: true, align: 'center', limit: 1, state: false },
        { name: 4, sum: 1, move: true, align: 'center', limit: 1, state: false },
    ],
    callback: (v) => {
        console.log('callback', v);

        // const area = document.querySelector('[data-drag-id="test2"] .mdl-drag-area[data-drag-name="'+ v.name +'"]');

        // area.classList.add('answer-on');

    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v.answer);

    }
});