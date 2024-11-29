import Toggle from '../../../assets/js/components/toggle.js';
import DragLine from '../../../assets/js/components/dragLine.js';

//EXE
UI.exe.toggle = new Toggle({
	scope: document.querySelector('[data-id="main"]')
});

//UI.answer[화면아이디_문제아이디]
/**
 * @param {string} 	id: {{data-line-id}}
 * @param {number} 	answer: 전체 정답갯수 
 * @param {boolean} isAnswer: 전체 정답여부 {{ true(정답) | false(오답) }}
 * @param {array(object)} lastAnswer: 마지막 입력 정보 null | 
 * 	[{ 
 * 		key{{data-line-object의 data-name}}: '{{data-line-object 값}}',
 * 		key{{data-line-target의 data-name}}: '{{data-line-target 값}}',
 * 		label : '{{접근성용 라벨내용}}',
 * 	},]
 */
UI.answer.test001 = {
	id: 'test001',
	answer: 3,
	lastAnswer: null,
	isAnswer: false,
}
UI.exe.test001 = new DragLine({
	id: UI.answer.test001.id,
	answer: UI.answer.test001.answer,
	lastAnswer: UI.answer.test001.lastAnswer,
	callback: (v) => {
		/**
		 * 개별 이벤트 완료 시 콜백
		 * answer_last: {{array}} 정답 선택 정보
		 * answer_state: {{true | false}} 전체 정답
		 */
		UI.answer.test001.isAnswer = v.answer_state;
		UI.answer.test001.lastAnswer = v.answer_last;
		console.log('callback', UI.answer.test001);
	},
});


UI.answer.test002 = {
	id: 'test002',
	answer: 5,
	lastAnswer: null,
	isAnswer: false,
}
UI.exe.test002 = new DragLine({
	id: UI.answer.test002.id,
	answer: UI.answer.test002.answer,
	lastAnswer: UI.answer.test002.lastAnswer,
	callback: (v) => {
		/**
		 * 개별 이벤트 완료 시 콜백
		 * answer_last: {{array}} 정답 선택 정보
		 * answer_state: {{true | false}} 전체 정답
		 */
		UI.answer.test002.isAnswer = v.answer_state;
		UI.answer.test002.lastAnswer = v.answer_last;
		console.log('callback', UI.answer.test002);
	},
});
