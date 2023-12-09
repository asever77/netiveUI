import Toggle from '../../assets/js/components/toggle.js';
import { CounterUpSlot, CounterUpSlotLive } from '../../assets/js/components/counterUp.js';

//current page script

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

UI.exe.countSlide = new CounterUpSlot({
    id :'report1',
    value: 98765.43210,
    callback: () => {
        console.log('end ㅎㅎㅎ');
    }
});
UI.exe.countSlide2 = new CounterUpSlotLive({
    id :'report2',
    value: 10.5,
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
    // console.log('callback', result);
    UI.exe.countSlide2.add(1.22);
}
UI.callback.toggle_c = (result) => {
    // console.log('callback', result);
    UI.exe.countSlide2.add(-1.7);
}