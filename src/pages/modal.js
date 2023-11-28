import Toggle from '../../assets/js/components/toggle.js';
import Modal from '../../assets/js/components/modal.js';

//current page script
const alertCallbackOk = (e) => {
    UI.exe.alert_1.hide();
    console.log('확인이죠')
}
const alertCallbackCancel = (e) => {
    UI.exe.alert_1.hide();
    console.log('취소에요')
}


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
UI.exe.alert_1 = new Modal({
    id :'alert1',
    type: 'system',
    title: 'alert title',
    content: '안녕하세요<br> 저장이 완료되었습니다.',
    button: [
        {text: '확인', callback: alertCallbackOk},
        {text: '취소', callback: alertCallbackCancel}
    ]
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
UI.callback.toggle_c = (result) => {
    console.log('callback', result);
    UI.exe.alert_1.show();
}
