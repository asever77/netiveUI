import Toggle from '../../assets/js/components/toggle.js';
import Modal from '../../assets/js/components/modal.js';

//current page script
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.modal_1 = new Modal({
    id :'modal1',
    src: './modal/modal1'
});
UI.exe.modal_2 = new Modal({
    id :'modal2',
    src: './modal/modal2'
});
        

//CALLBACK
UI.callback.toggle_a = (result) => {
    console.log('callback', result);
    UI.exe.modal_1.show();
}
UI.callback.toggle_b = (result) => {
    console.log('callback', result);
    UI.exe.modal_2.show();
}
