import Toggle from '../../assets/js/components/toggle.js';
import Modal from '../../assets/js/components/modal.js';

//current page script
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.modal_1 = new Modal({
    id :'modal1',
    src: './modal/_modal1'
});
    

//CALLBACK
UI.callback.toggle_a = (result) => {
    console.log('callback', result);
    UI.exe.modal_1.show();
}

