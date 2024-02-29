import Layer from '../../../assets/js/components/layer.js';


UI.form.setSelect();
UI.exe.addSelectTest = () => {
    const html = '<div class="mdl-select"><select title="년도 선택"><option value="1" selected="">선택</option><option value="2">가나다라마바사</option><option value="3">가나다라</option><option value="4">가나다라마바사가나다라마바사</option><option value="5">가나다라마바사</option></select></div>';

    document.querySelector('#add').insertAdjacentHTML('beforebegin', html);
    UI.form.setSelect();
}

// UI.exe.select1 = new Layer({
//     id: 'select1',
//     type: 'select',
//     callback: (v) => {
//         console.log(v);
//     }
// });
// UI.exe.select2 = new Layer({
//     id: 'select2',
//     type: 'select',
//     callback: (v) => {
//         console.log(v);
//     }
// });