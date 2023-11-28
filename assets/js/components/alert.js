Global.alert = {
    init(opt) {
        const id = opt.id;
        const title = opt.title;
        const content = opt.content;
        const btn = opt.button;

        let html = '';
        html += '<section class="mdl-modal" data-id="'+ id +'" data-type="alert" aria-hidden="true">';
        html += '<div class="mdl-modal-wrap">';
        html += '    <div class="mdl-modal-body">';

        if (!!title) {
            html += '        <h1 class="mdl-modal-tit">'+ title +'</h1>';
        }
        
        html += content;
        html += '        <div class="mdl-btn-wrap">';
        if (btn.length === 2) {
            html += '            <button type="button" class="mdl-btn" data-state="cancel" data-style="primary-gray">';
            html += '                <span>'+ btn[1].text +'</span>';
            html += '            </button>';
        } 
        html += '            <button type="button" class="mdl-btn" data-state="ok" data-style="primary">';
        html += '                <span>'+ btn[0].text +'</span>';
        html += '            </button>';
        
        html += '        </div>';
        html += '    </div>';
        html += '</div>';
        html += '</section>';

        document.querySelector('body').insertAdjacentHTML('beforeend', html);

        html = null;

        if (!!btn[0]) {
            document.querySelector('.mdl-modal[data-id="'+ id +'"] .mdl-btn[data-state="ok"]').addEventListener('click', btn[0].callback);
        } 
        if (!!btn[1]) {
            document.querySelector('.mdl-modal[data-id="'+ id +'"] .mdl-btn[data-state="cancel"]').addEventListener('click', btn[1].callback);
        } 
    }
}