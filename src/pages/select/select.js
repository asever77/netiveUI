import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

const code1 = `//스크립트 적용 전
<div class="mdl-select" data-id="select1">
    <select title="년도 선택" id="select1">
        <option value="1" selected="">2024</option>
        <option value="2">2023</option>
        <option value="3">2022</option>
        <option value="4">2021</option>
        <option value="5">2020</option>
    </select>
</div>

//스크립트 적용 후
<div class="mdl-select" data-id="select1">
    <select title="년도 선택" id="select1">
        <option value="1" selected="">2024</option>
        <option value="2">2023</option>
        <option value="3">2022</option>
        <option value="4">2021</option>
        <option value="5">2020</option>
    </select>
    <button type="button" class="mdl-select-btn" data-select-id="select1_select" value="1" tabindex="-1">
        <span>2024</span>
    </button>
</div>

//클릭 시 자동생성되는 select layer
<section class="mdl-layer" data-id="select1_select" data-type="select" data-layer-current="true" data-state="show" data-layer-n="1">
    <div class="mdl-layer-wrap">
        <div class="mdl-layer-header">
            <h2>년도 선택</h2>
            <button type="button" class="mdl-layer-close" data-material="close" aria-label="닫기"></button>
        </div>
        <div class="mdl-layer-body">
            <ul class="mdl-select-wrap">
                <li>
                    <input type="radio" id="select1_r0" value="1" name="select1_r" checked="">
                    <label for="select1_r0" class="mdl-select-option" data-type="radio" data-value="1">
                        <span>2024</span>
                    </label>
                </li>
                <li>
                    <input type="radio" id="select1_r1" value="2" name="select1_r" false="">
                    <label for="select1_r1" class="mdl-select-option" data-type="radio" data-value="2">
                        <span>2023</span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
    <div class="mdl-layer-dim"></div>
</section>`;
document.querySelector('[data-code="code1"]').textContent = code1;
const code2 = `//스크립트 
UI.form.setSelect();
UI.exe.{{개별아이디명}}.resetSelect();`;
document.querySelector('[data-code="code2"]').textContent = code2;
hljs.highlightAll();




UI.form.setSelect();
UI.exe.addSelectTest = () => {
    const html = '<div class="mdl-select"><select title="년도 선택"><option value="1" selected="">선택</option><option value="2">가나다라마바사</option><option value="3">가나다라</option><option value="4">가나다라마바사가나다라마바사</option><option value="5">가나다라마바사</option></select></div>';

    document.querySelector('#add').insertAdjacentHTML('beforebegin', html);
    UI.form.setSelect();
}
UI.exe.addOptionTest = () => {
    const html = '<option value="2">추가옵션</option>';

    document.querySelector('#select1').insertAdjacentHTML('beforeend', html);
    UI.exe.select1.resetSelect();
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