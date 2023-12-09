import Toggle from '../../assets/js/components/toggle.js';
import Accordion from '../../assets/js/components/accordion.js';

//current page script

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

UI.exe.accordion = new Accordion({
    id :'acco1',
    current: 0,
    callback: (v) => {
        console.log('callback:', v);
    }
});
UI.exe.accordion2 = new Accordion({
    id :'acco2',
    current: null,
    callback: (v) => {
        console.log('callback:', v);
    }
});

//CALLBACK
UI.callback.toggle_a = (result) => {
    console.log('callback', result);
    UI.exe.countSlide.act();
}
