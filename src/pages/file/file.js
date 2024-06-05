import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

const code1 = `<div class="mdl-file"">;
    <input type="file" class="mdl-file-inp " id="file_test" multiple title="file upload"">;
    <div class="mdl-button"">;file upload</div">;
</div">;
<div class="mdl-file-list" data-id="file_test" aria-labelledby="file_test"">;</div">;`;
document.querySelector('[data-code="code1"]').textContent = code1;
const code2 = `UI.form.fileUpload();`;
document.querySelector('[data-code="code2"]').textContent = code2;
hljs.highlightAll();

UI.form.fileUpload();