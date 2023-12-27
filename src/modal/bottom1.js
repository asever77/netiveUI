import Toggle from '../../assets/js/components/toggle.js';

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="bottom1"]')
});
    

//CALLBACK
// UI.callback.bottom1_a = (result) => {
//     console.log('callback', result);
//     UI.exe.modal_2.show();
// }
