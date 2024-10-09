"use strict";

var sEduT = sEduT || {};
sEduT.isDataGrade = "03" // grade 03 or 04 : quiz feedback images
sEduT.isEffectAudio = { // effect sound
  click: "./media/effect/event_click",
  correct: "./media/effect/feedback_correct",
  incorrect: "./media/effect/feedback_incorrect",
  dragTrue: "./media/effect/event_drag_true",
  dragFalse: "./media/effect/event_drag_false",
}
sEduT.isAnimateSpriteDelay = "80"; // sprite animate & png loop animate default delay
sEduT.isDTBOOK = true;  // digital text book
sEduT.isPopupOutSizeClose = true; // popup outsize click => popup close
sEduT.isPopupDisableEvent = false; // popup outsize click => disabled btn event
sEduT.isQuizDragSound = true //  quiz drag & draw event effect sound
sEduT.mediaPlayer = {}; // media player array
sEduT.scaleValue = { x: 1, y: 1, zoom: 1 }; // content scale value
//sEduT.isDevMsg = false;  // console log
// sEduT.complete = {
//   tab: function (container) { },
//   slide: function (container) { },
//   showHide: function (container) { },
//   openPopup: function (container, btn) { },
//   closeAllPopup: function() { },
//   turnAudio: function (elements, type, idx) { },
//   animate: function (container) { },
//   quizResult: function (container) { },
//   quizReset: function (container) { },
//   dragDrop: function (elements, start, end) { },
//   drawLine: function (elements, start, end) { },
//   checkList: function (elements, value) { },
//   zoom: function (element) { },
//   sound: function (element) { },
//   mediaPlayer: function (element) { },
// };

document.addEventListener("DOMContentLoaded", function () {
  if (sEduT.isDTBOOK && parent.ZOOMVALUE) {
    setTimeout(function () {
      sEduT.scaleValue.zoom = parent.ZOOMVALUE;
    }, 1500);
  }

  sEduT.ui.createAssist();
  sEduT.ui.checkInputType();
  
  // multiple, essay, draw, drag
  sEduT.quiz.initQuizType({
    feedback: false, // 피드백 제공 여부
    marking: false, // 채점 표기 여부
    hint: false, // 힌트 제공 여부
    totalChance: 1, // 문제 풀이 기회
    controlShowHide: true, // 문제 풀기 전 정답확인-다시풀기 버튼 숨김
    emptyCheck: false, // 문제를 풀어야 정답 확인 가능
  });

  sEduT.view.initViewType();
  sEduT.view.initPopup();
  sEduT.view.initPageMove();
  sEduT.view.initCheckList();
  sEduT.view.initShowHide();
  sEduT.view.initDownload();

  sEduT.view.initZoom({
    rate: 0.2, 
    step: 4, 
    way: 50, 
    border: 1
  });

  sEduT.sound.initAudio();
  sEduT.sound.initMediaPlayer({
    cover: true, 
    close: false
  });

  // btn click sound
  var clickSoundBtns = document.querySelectorAll(".btn");
  clickSoundBtns.forEach(function (e) {
    e.addEventListener("mousedown", function (e) {
      var target = e.currentTarget;
      target.parentNode.classList.contains("thumb--area") ||
      target.parentNode.classList.contains("media--controller") ||
      target.classList.contains("off") ||
      target.classList.contains("btn--off") ||
      target.classList.contains("audio") ||
      target.classList.contains("disabled") ||
      target.dataset.turnBtn ||
      target.dataset.funcAudio ||
      (sEduT.isPopupDisableEvent && document.body.classList.contains("isOnPopup") && !target.closest("[data-layout-type]")) ||
      sEduT.sound.playAudio("click");
    });
  });

  setTimeout(function () {
    sEduT.animate.initAimate(); // animate data
  }, 3000);

  window.addEventListener("resize", function () {
    sEduT.isDTBOOK && parent.ZOOMVALUE && (sEduT.scaleValue.zoom = parent.ZOOMVALUE);
  });

  // #D: 분권 페이지 이동 처리 막음 - 통권 패키징시 삭제
  //var pageMoveBtns = document.querySelectorAll("[data-move-page]");
  //pageMoveBtns.forEach(function (e) {
  //  e.classList.add("disabled");
  //  e.addEventListener("mousedown", function (e) {
  //    alert("페이지 이동은 통권에서만 제공됩니다.(" + e.currentTarget.dataset.movePage + "쪽으로 이동 예정)")
  //  });
  //});

});
