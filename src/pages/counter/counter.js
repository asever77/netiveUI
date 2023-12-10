import Toggle from '../../../assets/js/components/toggle.js';
import { CounterUpSlotResult, CounterUpSlotLive } from '../../../assets/js/components/counterUp.js';

//current page script

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

UI.exe.countSlide = new CounterUpSlotResult({
    id :'counter1',
    value: 98765.43210,
    callback: () => {
        console.log('end ㅎㅎㅎ');
    }
});
UI.exe.counterUpLive = new CounterUpSlotLive({
    id :'counter2',
    value: 10,
    callback: () => {
        console.log('end');
    }
});

//CALLBACK
UI.callback.toggle_a = (result) => {
    console.log('callback', result);
    UI.exe.countSlide.act();
}

UI.callback.toggle_b = (result) => {
    console.log('callback', result);
    UI.exe.counterUpLive.add(15);
}
UI.callback.toggle_c = (result) => {
    console.log('callback', result);
    UI.exe.counterUpLive.add(-10.4);
}