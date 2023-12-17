import Range from '../../../assets/js/components/range.js';

UI.exe.srange1 = new Range({
    id: 'range1',
    step: 1,
    min: 0,
    max: 8,
    value: [0,5],
    title: '위험도',
    text: ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'l8', 'lv9'],
    tickmark: ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6', 'lv7', 'l8', 'lv9'],
});
UI.exe.srange2 = new Range({
     id: 'range2',
    step: 1,
    min:0,
    max:3,
    value: [1],
    title: '위험도',
    text: ['1단계', '2단계', '3단계', '4단계'],
    tickmark: ['1단계', '2단계', '3단계', '4단계']
});

