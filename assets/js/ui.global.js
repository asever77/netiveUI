'use strict';

const global = 'UI';

if (!window[global]) {
    window[global] = {};
} 
const Global = window[global];

Global.data = {};
Global.exe = {};
Global.callback = {};
Global.state = {};

