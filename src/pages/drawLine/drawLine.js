import Toggle from '../../../assets/js/components/toggle.js';
import DrawLine from '../../../assets/js/components/drawLine.js';
        
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.drawline = new DrawLine({
    id: 'test',
    answer: 3,
    callback: (v) => {
        console.log(v);
    }
});
