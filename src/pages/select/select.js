import Layer from '../../../assets/js/components/layer.js';

UI.exe.select1 = new Layer({
    id: 'select1',
    type: 'select',
    callback: (v) => {
        console.log(v);
    }
});
