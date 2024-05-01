import Datepicker from '../../../assets/js/components/datepicker.js';

UI.exe.datepicker1 = new Datepicker({
    id: 'datepicker1',
    val: '2024-03-15',
    min: '2000-01-01',
    max: '2050-05-10',
    title: '시작일',
});
UI.exe.datepicker2 = new Datepicker({
    id: 'datepicker2',
    val: '2024-05-15',
    min: '2002-01-01',
    max: '2070-05-10',
    title: '시작일',
});