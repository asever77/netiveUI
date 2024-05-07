import Toggle from '../../../assets/js/components/toggle.js';
import DragDrop from '../../../assets/js/components/dragDrop.js';
        
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.dragdrop = new DragDrop({
    id: 'test',
    callback: (v) => {
        console.log('callback', v);
    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v);
    }
});


UI.exe.dragdrop2 = new DragDrop({
    id: 'test2',
    callback: (v) => {
        console.log('callback', v);
        // const area = document.querySelector('[data-drag-id="test2"] .mdl-drag-area[data-drag-name="'+ v.name +'"]');
        // area.classList.add('answer-on');
    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v);
    }
});

UI.exe.dragdrop3 = new DragDrop({
    id: 'test3',
    callback: (v) => {
        console.log('callback', v);
        // const area = document.querySelector('[data-drag-id="test2"] .mdl-drag-area[data-drag-name="'+ v.name +'"]');
        // area.classList.add('answer-on');
    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v);
    }
});

UI.exe.dragdrop4 = new DragDrop({
    id: 'test4',
    callback: (v) => {
        console.log('callback', v);
        // const area = document.querySelector('[data-drag-id="test2"] .mdl-drag-area[data-drag-name="'+ v.name +'"]');
        // area.classList.add('answer-on');
    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v);
    }
});