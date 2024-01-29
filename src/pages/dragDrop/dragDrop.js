import Toggle from '../../../assets/js/components/toggle.js';
import DragDrop from '../../../assets/js/components/dragDrop.js';
        
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.dragdrop = new DragDrop({
    id: 'test',
    answer: 3,
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
    }, 
    callbackComplete: (v) => {
        console.log('callbackComplete', v);
    }
});