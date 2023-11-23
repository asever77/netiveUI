import Toggle from '../../assets/js/components/toggle.js';
import IABoard from '../../assets/js/components/IABoard.js';      
  
//EXE
UI.exe.toggle = new Toggle({
    scope: document.querySelector('[data-id="main"]')
});
UI.exe.IABoard = new IABoard({
    id: 'projectlist',
    url: '../../assets/files/codinglist.json'
});