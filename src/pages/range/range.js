import Range from '../../../assets/js/components/range.js';

UI.exe.range1 = new Range({
    id: 'range1',
    step: 1,
    min: 0,
    max: 10,
    value: [3, 7],
    title: '위험도',
    text: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    tickmark: ['lv0', 'lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'l8', 'lv9', 'lv10'],
    callback: (v) => {
        console.log(v);
    }
});
UI.exe.range2 = new Range({
     id: 'range2',
    step: 1,
    min:0,
    max:100,
    value: [1],
    title: '위험도',
    text: ['1', '2', '3', '4'],
    tickmark: ['1단계', '2단계', '3단계', '4단계'],
    callback: (v) => {
        console.log(v);
    }
});

