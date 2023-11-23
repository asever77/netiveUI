import Toggle from '../../assets/js/components/toggle.js';
import { CounterUpSlot } from '../../assets/js/components/counterUp.js';

//current page script

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

UI.exe.countSlide = new CounterUpSlot({
    id :'report1',
    value: 9876543210
});

//CALLBACK
UI.callback.toggle_a = (result) => {
    console.log('callback', result);
    UI.exe.countSlide.act();
}
