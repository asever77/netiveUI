import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

const code1 = `//checkbox data-type="checkbox"
<input type="checkbox" id="check1">
<label for="check1" class="mdl-selection" data-type="checkbox">
    <span>checkbox</span>
</label>

//checkbox data-type="switch"
<input type="checkbox" id="check2">
<label for="check2" class="mdl-selection" data-type="switch">
    <span>switch</span>
</label>

//radio data-type="radio"
<input type="radio" id="radio1" name="rd1">
<label for="radio1" class="mdl-selection" data-type="radio">
    <span>radio1</span>
</label>`;

document.querySelector('[data-code="code1"]').textContent = code1;

hljs.highlightAll();