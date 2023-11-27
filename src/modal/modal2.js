import Toggle from '../../assets/js/components/toggle.js';

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="modal2"]')
});


//CALLBACK
UI.callback.modal2_a = (result) => {
    console.log('callback2', result);
}

