import Toggle from '../../assets/js/components/toggle.js';

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

//CALLBACK
UI.callback.toggle_a = (result) => {
    console.log('callback', result);
    const spans = document.querySelectorAll('code span');
    for (let item of spans) {
        item.textContent = result.state;
    }
}

