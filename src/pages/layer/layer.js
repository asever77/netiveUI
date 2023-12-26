import Toggle from '../../../assets/js/components/toggle.js';
import Layer from '../../../assets/js/components/layer.js';

//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});

//LAYER Module
//modal
UI.exe.modal_1 = new Layer({
    id :'modal1',
    type: 'modal',
    src: './modal/modal1'
});
UI.callback.toggle_a = (result) => {
    console.log('callback', result);
    UI.exe.modal_1.show();
}
UI.exe.modal_2 = new Layer({
    id :'modal2',
    type: 'modal',
    src: './modal/modal2'
});
UI.callback.toggle_b = (result) => {
    console.log('callback', result);
    UI.exe.modal_2.show();
}

//system
const alertCallbackOk = (e) => {
    UI.exe.alert_1.hide();
    console.log('확인이죠')
}
const alertCallbackCancel = (e) => {
    UI.exe.alert_1.hide();
    console.log('취소에요')
}
UI.exe.alert_1 = new Layer({
    id :'alert1',
    type: 'system',
    title: 'alert title',
    content: '안녕하세요<br> 저장이 완료되었습니다.',
    button: [
        {text: '확인', callback: alertCallbackOk},
        {text: '취소', callback: alertCallbackCancel}
    ]
});
UI.callback.toggle_c = (result) => {
    console.log('callback', result);
    UI.exe.alert_1.show();
}

//drop down
UI.exe.dropdown1 = new Layer({
    id :'dropdown1',
    type: 'dropdown',
    ps : 'BL', //bottom Left
    src: './dropdown/dropdown1'
});
UI.callback.toggle_d = (result) => {
    console.log('callback', result);
    UI.exe.dropdown1.show();
}

//bottom sheet
UI.exe.bottom_1 = new Layer({
    id :'bottom1',
    type: 'bottom',
    src: './modal/bottom1'
});
UI.callback.toggle_e = (result) => {
    console.log('callback bottom sheet', result);
    UI.exe.bottom_1.show();
}

//toast
UI.exe.toast_1 = new Layer({
    id :'toast1',
    type: 'toast',
    content: '안녕하세요<br> 저장이 완료되었습니다.'
});
UI.callback.toggle_f = (result) => {
    console.log('callback', result);
    UI.exe.toast_1.show();
}
UI.callback.toggle_g = (result) => {
    console.log('callback', result);
    UI.exe.toast_1.hide();
}

//tooltip
UI.exe.tooltip = new Layer({
    type: 'tooltip'
});

