import Toggle from '../../../assets/js/components/toggle.js';
import Layer from '../../../assets/js/components/layer.js';
import Select from '../../../assets/js/components/select.js';

UI.exe.select1 = new Select({
    id: 'select1',
    callback: (v) => {
        console.log(v);
    }
});
