import Tab from '../../../assets/js/components/tab.js';

UI.exe.tab = new Tab({
    id: 'tab1',
    current: 'b',
    callback: (v) => {
        console.log(v);
    }
});


