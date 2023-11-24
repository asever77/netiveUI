/**
 * common.js 일반적인 유틸 및 공통함수

 * - index -  
 * 1. Mcore
 * 2. Common tools 
 * 3. 공통 팝업 및 이동 : 우편번호, 이메일, 휴대폰 앞자리 스피너 
 * 4. String , Number Formatting tool 	
 * 5. 날짜 계산
 * 6. MsgUtil
 * 7. 검증 관련
 * 8. os 정보 체크
 * 9. 문자열 유틸
 * */

/****************************************************************************
 * 1. MCore        															*
 * *************************************************************************/
var chkdup0 = false; // pause 중복 호출 방지
var chkdup1 = false; // resume 중복 호출 방지

(function(window, undefined) {
	M.onReady(function(event) { // 화면 로딩이 최종 완료시 한번만 호출
		$("a").removeAttr("href"); //a태그 href 삭제

        // 월간 흔들기 이벤트
		if(MPage.info('filename') != 'NMOK_1_1V.html'){
            M.execute("exWNShakeStop")
        }else if(MPage.info('filename') == 'NMOK_1_1V.html' && MData.storage("shakeSetValue") == "del"){
            M.execute("exWNShakeSetVibrate","N");
            M.execute("exWNShakeStart","shakeCb");
        }else{
			M.execute("exWNShakeSetVibrate","Y");
            M.execute("exWNShakeStart","shakeCb");
		}
        //header 그리기
        headerDraw();

		// 이벤트 헤더 그리기
		fn_eventHeader();

        if (MPage.info('filename') == 'NMOK_1_1V.html' || MPage.info('filename') == 'NMDP_1_167V.html' || MPage.info('filename') == 'NMMC_1_1V.html' || MPage.info('filename') == 'NMPD_2_1V.html' || MPage.info('filename') == 'NEVE_9_1V.html' || MPage.info('filename') == 'NMCM_26_1P.html'){

                var footer = '<div class="ocr-footer-wrap">';
                footer += '    <div class="ocr-nav">';
                if(MPage.info('filename') == 'NMDP_1_167V.html'){
                    footer += '        <button type="button" class="ocr-nav-btn myhealth selected" data-nav="health">';
                }else{
                    footer += '        <button type="button" class="ocr-nav-btn myhealth" data-nav="health">';
                }
                footer += '            <span>마이헬스</span>';
                footer += '        </button>';
                if(MPage.info('filename') == 'NMMC_1_1V.html'){
                    footer += '        <button type="button" class="ocr-nav-btn kypwr  selected" data-nav="test">';
                }else {
                    footer += '        <button type="button" class="ocr-nav-btn kypwr" data-nav="test">';
                }
                footer += '            <span>마인드</span>';
                footer += '        </button>';
                if(MPage.info('filename') == 'NMOK_1_1V.html'){
                    footer += '        <button type="button" class="ocr-nav-btn ocare selected" data-nav="ocare" aria-label="오케어">';
                }else{
                    footer += '        <button type="button" class="ocr-nav-btn ocare" data-nav="ocare" aria-label="오케어">';
                }
                footer += '            <span class="icon"></span>';
                footer += '        </button>';
                if(MPage.info('filename') == 'NMPD_2_1V.html'){
                    footer += '        <button type="button" class="ocr-nav-btn store selected" data-nav="store">';
                }else{
                    footer += '        <button type="button" class="ocr-nav-btn store" data-nav="store">';
                }
                footer += '            <span>스토어</span>';
                footer += '        </button>';
                if(MPage.info('filename') == 'NEVE_9_1V.html'){
                    footer += '        <button type="button" class="ocr-nav-btn event selected" data-nav="event">';
                }else{
                    footer += '        <button type="button" class="ocr-nav-btn event" data-nav="event">';
                }
                footer += '            <span>이벤트</span>';
                footer += '        </button>' ;
                footer += '    </div>' ;
                footer += '</div>';
              $('footer').html(footer);
              OcareUI.page.current();
        };

        // ocare메인 홈 흔들기 시작
        if(MPage.info('filename') == 'NMOK_1_1V.html'){
            var shakePopup = `<div class="popup-wrap" id="shakePopup1"><!-- popup show : ui.js > popupShow() 참고 -->
                               	<div class="popup-bg"></div>
                               	<div class="popup popup-mid">
                               		<div class="popup-box">
                               			<div class="pop-body">
                               				<h3 class="noti-ttl black fs18">흔들기를 설정해주세요</h3>
                               				<p class="sub">자주 쓰는 기능 한 가지를<br> 편리하게 꺼내 쓸 수 있어요.</p>
                               			</div>
                               			<div class="pop-foot">
                               				<p class="btn-wrap pt10">
                               					<button type="button" class="btn-txt gray popup-close" id="shakeCloseBtn1">다음에</button>
                               					<button type="button" class="btn-txt popup-close" id ="shakeSetting" >설정하기</button>
                               				</p>
                               			</div>
                               		</div>
                               	</div>
                               </div>
                                <script type="text/javascript" src='../../js/libs/jquery-barcode.js'></script>
                                <div class="popup-wrap" id="spoBarCodePopup"><!-- popup show : ui.js > popupShow() 참고 -->
                                    <div class="popup-bg"></div>
                                    <div class="popup popup-btm">
                                        <div class="popup-box">
                                            <div class="pop-head">
                                                <p class="title">입장체크용 바코드</p>
                                                <button type="button" class="btn-close popup-close" id="spoanyclose3">팝업닫기</button>
                                            </div>
                                            <div class="pop-body" data-pop-body>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              <link rel="stylesheet" type="text/css" href="../../css/mpd.css">
                              <div class="popup-wrap" id="noUse" ><!-- popup show : ui.js > popupShow() 참고 -->
                                   <div class="popup-bg"></div>
                                   <div class="popup popup-btm">
                                       <div class="popup-box">
                                           <div class="pop-head">
                                               <p class="title">입장체크용 바코드</p>
                                               <button type="button" class="btn-close popup-close" id="spoanyclose">팝업닫기</button>
                                           </div>
                                           <div class="pop-body">
                                               <div class="nodata">
                                                   상품 구매 후 서비스 이용이 가능합니다.
                                               </div>
                                               <p class="btn-wrap mt15">
                                                   <button type="button" class="btn-txt" id="viewSpoany1" >프로그램 보러가기</button>
                                               </p>
                                           </div>
                                       </div>
                                   </div>
                              </div>`;
                  $('body').append(shakePopup);
        }

        if(MPage.info('filename') == 'NMOK_1_1V.html'){
            var renewOcareNotice = `<div class="popup-wrap" id="renewOcareNoticePop"><!-- popup show : ui.js > popupShow() 참고 -->
                            <div class="popup-bg"></div>
                            <div class="popup popup-btm">
                                  <div class="popup-box">
                                        <div class="pop-head">
                                            <p class="title">KB 오케어 소식지<br>지금 보러갈까요?</p>
                                            <button type="button" class="btn-close popup-close">팝업닫기</button>
                                        </div>
                                        <div class="pop-body center">
                                            <p class="lineh147 left">오케어의 주요 업데이트 내용 함께 알아봐요</p>
                                            <div class="img-box mt20 mb20">
                                                <img src="https://kbidpkrcimgst001.blob.core.windows.net/imgstorage/upload/imgUpload/2023/04/21/2762a026-b5fa-45c0-8c19-cda4f05e68eb.png" alt="">
                                            </div>
                                        </div>
                                        <div class="pop-foot">
                                            <p class="btn-wrap">
                                                <button type="button" class="btn-txt fs18" id="renewNotiAlarm">지금 보러가기</button>
                                            </p>
                                            <p class="btn-wrap block">
                                                <button type="button" class="btn-link" id="renewOcareNoticeNeverShow" onclick="((event) => {
                                                    MData.storage('renewOcareNoticeNeverShow2' ,'Y');
                                                    $(event.target).closest('.popup-wrap').fadeOut(() => showContent.next()).addClass('close').removeClass('show');
                                                })(event)">다시 보지 않기</button>
                                            </p>
                                        </div>
                                  </div>
                            </div>
                        </div>    `;
            $('body').append(renewOcareNotice);

            /*var b2cPop = `<div class="popup-wrap" id="b2cPopup">
                                <div class="popup-bg"></div>
                                <div class="popup popup-btm">
                                    <div class="popup-box">
                                        <div class="pop-head">
                                            <p class="title fs18">소속 정보를 인증하고 20만 스타<br> 받아가세요!</p>
                                            <button type="button" class="btn-close popup-close">팝업닫기</button>
                                        </div>
                                        <div class="pop-body center">
                                            <div class="img-box pop-img-box" style="margin: 0 auto; width:20.6rem;">
                                                <img src="../../img/content/img_kbstar.svg" alt="">
                                            </div>
                                        </div>
                                        <div class="pop-foot">
                                            <p class="btn-wrap">
                                                <button type="button" class="btn-txt" onclick="(function(){
                                                    MData.global('DO_NOT_SHOW_B2C', 'Y');

                                                    MPage.html({
                                                        url : '../MME/NMME_1_21V.html',
                                                        param : {
                                                            type : 'store',
                                                        }
                                                    });

                                                    setTimeout(function(){ // 홈 화면으로 되돌아 올 것을 대비해서 페이지 이동 후에 조용히 팝업을 닫아둠
                                                        $('#b2cPopup').fadeOut().removeClass('show');
                                                    }, 500);
                                                }).call(this)">이메일 인증하기</button>
                                            </p>
                                            <p class="btn-wrap block">
                                                <button type="button" class="btn-link next" id="b2cPopupNeverShowBtn">다시 보지 않기</button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                               </div>`;

            $('body').append(b2cPop);*/

            var starMal = `<div class="popup-wrap show" id="ocareMalPop"><!-- popup show : ui.js > popupShow() 참고 -->
                            <div class="popup-bg"></div>
                            <div class="popup popup-btm" data-ver="2">
                                  <div class="popup-box">

                                        <div class="pop-head">
                                            <p class="title">오케어몰 스타 사용 제한 해제 안내</p>
                                            <button type="button" class="btn-close popup-close">팝업닫기</button>
                                        </div>

                                        <div class="pop-body center">
                                            <p class="lineh147 left">
                                                7월 한달동안 오케어몰에서 스타를 제한없이 사용해보세요!<br>
                                                <b>기간 : ~ 7월 31일(월) 23:59 </b>
                                            </p>
                                            <div class="img-circle">
                                                <img src="../../img/content/img_mcm_16_5.png" alt="">
                                            </div>
                                        </div>
                                        <div class="pop-foot">
                                            <p class="btn-wrap">
                                                <button type="button" class="btn-txt fs18" id="ocareMal" >오케어몰 바로가기</button>
                                            </p>
                                            <p class="btn-wrap block">
                                                <button type="button" class="btn-link" id="removeOcareMalShow" onclick="((event) => {
                                                   MData.storage('removeOcareMalShow2' ,'Y');
                                                   $(event.target).closest('.popup-wrap').fadeOut(() => showContent.next()).addClass('close').removeClass('show');
                                                })(event)">다시 보지 않기</button>
                                            </p>
                                        </div>
                                  </div>
                            </div>
                           </div>`;

            $('body').append(starMal);

			var seoulEvt = `
								<div class="popup-wrap show" id="seoulEvtPop"><!-- popup show : ui.js > popupShow() 참고 -->
									<div class="popup-bg"></div>
									<div class="popup popup-btm">
										<div class="popup-box">
												<div class="pop-head">
													<p class="title">KB오케어 가입 경품 받고, 건강검진<br> 조회로 추가 경품도 받아가세요!</p>
													<button type="button" class="btn-close popup-close">팝업닫기</button>
												</div>
												<div class="pop-body center pop-event">
													<p class="lineh147 left">기간 : ~10월 31일(화) 까지</p>
													<div class="img-box mt20 mb20">
														<img src="https://kbidpkrcimgst001.blob.core.windows.net/imgstorage/upload/imgUpload/2023/09/06/2567cc6d-9b5c-4f46-8699-0e1e73bd7854.png" alt="">
														<ul class="sponsor">
															<li>
																<img src=" https://kbidpkrcimgst001.blob.core.windows.net/imgstorage/upload/imgUpload/2023/09/06/6b4415f7-384a-4921-a94e-09eebf9e4805.png" alt="서울교통공사"/>
															</li>
															<li>
																<img src="https://kbidpkrcimgst001.blob.core.windows.net/imgstorage/upload/imgUpload/2023/09/06/cf6893b1-31f5-4563-9b49-c1e5b31ef6dc.png" alt="kb헬스케어"/>
															</li>
														</ul>
													</div>
												</div>
												<div class="pop-foot">
													<p class="btn-wrap">
														<button type="button" class="btn-txt fs18" id="seoulEvt">바로가기</button>
													</p>
													<p class="btn-wrap block">
														<button type="button" class="btn-link" id="seoulEvtPopShow" onclick="((event) => {
															MData.storage('seoulEvtPopShow2' ,'Y');
															$(event.target).closest('.popup-wrap').fadeOut(() => showContent.next()).addClass('close').removeClass('show');
														 })(event)">다시 보지 않기</button>
													</p>
												</div>
										</div>
									</div>
								</div> `;

            $('body').append(seoulEvt);

			var hyundaiEvt = `
								<div class="popup-wrap show" id="hyundaiEvtPop"><!-- popup show : ui.js > popupShow() 참고 -->
									<div class="popup-bg"></div>
									<div class="popup popup-btm">
										<div class="popup-box">
												<div class="pop-head">
													<p class="title">매일 출석체크 포인트 받고, 건강검진<br> 조회로 추가 경품도 받아가세요!</p>
													<button type="button" class="btn-close popup-close">팝업닫기</button>
												</div>
												<div class="pop-body center pop-event">
													<p class="lineh147 left">기간 :  11월 06일(월) ~11월 30일(목) 까지</p>
													<div class="img-box mt20 mb20">
														<img src="https://kbidpkrcimgst001.blob.core.windows.net/imgstorage/upload/imgUpload/2023/09/06/2567cc6d-9b5c-4f46-8699-0e1e73bd7854.png" alt="">
														<ul class="sponsor">
															<li>
																<img class="hgf" src="https://kbidpkrcimgst001.blob.core.windows.net/imgstorage/upload/imgUpload/2023/10/04/b9ebdd6e-27f7-46ea-978e-4dd097ab9185.png" alt="현대그린푸드"/>
															</li>
															<li>
																<img class="kbhc" src="https://kbidpkrcimgst001.blob.core.windows.net/imgstorage/upload/imgUpload/2023/09/06/cf6893b1-31f5-4563-9b49-c1e5b31ef6dc.png" alt="kb헬스케어"/>
															</li>
														</ul>
													</div>
												</div>
												<div class="pop-foot">
													<p class="btn-wrap">
														<button type="button" class="btn-txt fs18" id="hyundaiEvt">바로가기</button>
													</p>
													<p class="btn-wrap block">
														<button type="button" class="btn-link" id="hyundaiEvtPopShow" onclick="((event) => {
															MData.storage('hyundaiEvtPopShow2' ,'Y');
															$(event.target).closest('.popup-wrap').fadeOut(() => showContent.next()).addClass('close').removeClass('show');
														 })(event)">다시 보지 않기</button>
													</p>
												</div>
										</div>
									</div>
								</div> 
			`
			$('body').append(hyundaiEvt);


        }
        if (MPage.info('filename') == 'NMOK_1_1V.html' || MPage.info('filename') == 'NMDP_1_167V.html' || MPage.info('filename') == 'NMMC_1_1V.html' || MPage.info('filename') == 'NMPD_2_1V.html' || MPage.info('filename') == 'NEVE_9_1V.html'){
            //B2C 회원 이메일 인증
            var b2cEmail = `<div class="popup-wrap" id ="b2cEmailAthnt">
                        <div class="popup-bg"></div>
                        <div class="popup popup-btm">
                            <div class="popup-box">
                                <div class="pop-head">
                                    <h2 class="title fs18">소속회사를 인증해주세요</h2>
                                    <button type="button" class="btn-close popup-close" id ="b2cEmailClose">팝업닫기</button>
                                </div>

                                <div class="pop-body">
                                    <p>
                                        KB 오케어의 전체 기능을 정상적으로 사용하기 위해서는 소속회사 이메일 인증이 필요해요.
                                    </p>

                                    <div class="form-wrap mt20">
                                        <div>
                                            <div class="ipt-wrap">
                                                <div class="ipt-line-box">
                                                    <label for="ipt03">이메일</label>
                                                    <div class="ipt-item">
                                                        <input type="text" placeholder="이메일 입력" value="" id="ipt03">
                                                        <button type="button" class="btn-ipt-delete none"><span class="txt-blind">삭제</span></button>
                                                    </div>
                                                </div>

                                            </div>

                                            <!-- 오류 발생시 class error 추가 -->
                                            <div class="ipt-wrap mt20" id="b2cCodeBox">
                                                <div class="ipt-line-box">
                                                    <label for="ipt04">인증코드</label>
                                                    <div class="ipt-item">
                                                        <input type="text" placeholder="인증코드 6자리 입력" id="ipt04">
                                                        <button type="button" class="btn-ipt-delete none"><span class="txt-blind">삭제</span></button>
                                                    </div>
                                                </div>
                                                <p class="error-txt">올바른 인증코드를 입력해 주세요</p>
                                            </div>
                                            <div class="btn-wrap block mt20 mb30">
                                                <!-- 인증 -->
                                                <button type="button" class="btn-sub" id="b2cEmailSend">인증코드 발송</button>
                                                <!-- 재인증 -->
                                                <!-- <button type="button" class="btn-sub" id="b2cEmailReBtn">다시 보내기</button> -->
                                            </div>
                                            <p class="tip-recom mb20">
                                                퇴사, 소속 변경 등의 사유로 소속회사 이메일 인증이 어려운 경우, 고객센터로 문의해주세요.<br>
                                                 KB 오케어 고객센터 : 1544-3677
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="pop-foot">
                                    <p class="btn-wrap">
                                        <button type="button" class="btn-txt" disabled id="b2cVerificationBtn">인증완료</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`;

            $('body').append(b2cEmail);
        }
        if(MPage.info('filename') == 'NMOK_1_1V.html'){
            pageInitAPICall();
        }

        var b2cEmailAuth = '';
        let b2cSeq = 0;

        $("#b2cEmailClose").click(function(){
            $("#b2cEmailAthnt").fadeOut().addClass('close').removeClass('show');
        });

        //이메일 인증 이메일 입력
        $(document).on("input keyup", "#ipt03", function(){
            var chkEmail = ValidateUtil.checkEmail($("#ipt03").val());
            if(!chkEmail){
                $('#b2cEmailSend').attr('disabled',true);
                return false;
            } else {
                $('#b2cEmailSend').attr('disabled',false);
            }
        });

        // 이메일 인증 코드
        $(document).on("input keyup", "#ipt04", function(){
            if($("#ipt04").val().length == '6'){
                $("#b2cCodeBox").removeClass("error");
                $("#b2cVerificationBtn").attr('disabled',false)
            }else{
                $("#b2cVerificationBtn").attr('disabled',true)
            }
        });

        //이메일 전송
        $(document).on("click","#b2cEmailSend, #b2cEmailReBtn", function(){
            $("#ipt04").val("");
            $("#b2cCodeBox").removeClass("error");
            var tempEmail = $("#ipt03").val();
            var userNm;
            var kbB2C = /^1100000006|1100000016$/;

            if(!kbB2C.test(MData.storage("COMPANY_CD"))) {
                Popup.alert({
                    message: "이메일 재인증 대상자가 아닙니다.",
                }, function() {
                    $("#b2cEmailAthnt").fadeOut().addClass('close').removeClass('show');
                });

                return;
            }

            tempEmail = tempEmail;
            type = 0;
            companyCd = '';
            userNm = MData.storage("USER_NM");
            b2cSendData = {email: tempEmail,
                           companyCd : companyCd,
                           type : type};

            MNet.httpSend({
                path: '/mail/auth',
                data: b2cSendData,
                callback: function (receivedData) {
                    if (receivedData.rtnCd == '0000') {
                        if(receivedData.domainRtnCd != '0100' && receivedData.domainRtnCd != '0101' && receivedData.domainRtnCd != '0105'){
                            //$("#emailSend").text("인증완료");
                            //$("#emailSend").attr('id','emailCertiBtn');
                            b2cEmailAuth = tempEmail;
                            compCd = receivedData.companyCd || MData.storage("COMPANY_CD");
                            b2cSeq = receivedData.seq;
                            $("input[type='radio']").attr("onclick", "return(false);");
                            $("#b2cCodeBox").show();
                            Popup.alert({
                                message: '입력 해 주신 이메일로<br />인증코드를 발송하였어요',
                                callback : function(index) {
                                    $(".emailWds").hide();
                                    $("#b2cEmailSend").addClass("none");
                                    $("#b2cEmailReBtn").removeClass("none");
                                    $("#b2cEmailReBtn").prop("disabled", true);
                                    setTimeout(function(){
                                        $("#b2cEmailReBtn").prop("disabled", false);
                                    }, 30000);
                                }
                            });
                        } else {
                            Popup.alert(receivedData.domainRtnMsg);
                            if(receivedData.domainRtnCd == '0101'){
                                //Popup.alert(receivedData.domainRtnMsg);
                            } else if(receivedData.domainRtnCd == '0105'){ //이미 가입된 이메일
                                //Popup.alert(receivedData.domainRtnMsg);
                            } else {
                                $("#emailBox").addClass("error");
                            }
                        }
                    }
                }
            });
        });

        // 인증 완료 확인
        $(document).on("click","#b2cVerificationBtn", function(){

            var code = $("#ipt04").val();
            if(b2cEmailAuth != $("#ipt03").val()){
                Popup.alert({
                    message : "인증받은 이메일과</br>입력한 이메일이 일치하지 않습니다.",
                    button  : "확인",
                    callback : function(index) {
                        return;
                    }
                });

                return;
            } else {
                MNet.httpSend({
                    path: "/mail/verify",
                    data: {
                        userNo: userNo,
                        email: b2cEmailAuth,
                        code,
                        seq : b2cSeq
                    },
                    callback: function (receivedData) {
                        if(receivedData.status == 'Y'){
                            $("#b2cCodeBox").removeClass("error");
                            MNet.httpSend({
                                path: "/v1/setting/updateCompany",
                                data: {
                                    userNo: userNo,
                                    email: b2cEmailAuth,
                                },
                                callback: function (receivedData) {
                                    if (receivedData.rtnCd == '0000') {
                                        let message = "";

                                        if(receivedData.status == '0000') { // 전환 성공
                                            MData.storage("COMPANY_CD", receivedData.companyCd);
                                            MData.storage("COMPANY_NM", receivedData.companyNm);
                                            MData.global("FORCE_HARD_REFRESH", "Y");
                                            message = "재인증에 성공하였습니다.";
                                        } else { // 전환 대상 아님
                                            message = "재인증 대상자가 아닙니다.";
                                        }
                                        Popup.alert({
                                            message : message,
                                            button  : "확인",
                                            callback : function(index) {
                                               $("#b2cEmailAthnt").fadeOut().addClass('close').removeClass('show');
                                            }
                                        });
                                    } else {
                                        Popup.alert('인증에 실패하였습니다.');
                                    }
                                }
                            });
                        }else{
                            $("#b2cCodeBox").addClass("error");
                        }
                    }
                })
            }
        });

        $(document).on('click', '#shakeBtn', function() {

            if(MData.storage("shakeSetValue") == ""){
                $("#shakePopup1").fadeIn().addClass('show').removeClass('close');
            }else{
                MPage.html("../MCM/NMCM_7_15V.html");
                MData.storage("shakePopupYn", "Y");
            }
        });

        $("#shakeCloseBtn1").click(function() {
            $("#shakePopup1").fadeOut().addClass('close').removeClass('show');
        });

        $("#shakeSetting").click(function(){
            $("#shakePopup1").fadeOut().addClass('close').removeClass('show');
            MPage.html("../MCM/NMCM_7_15V.html");
        })

        $("#shakeNextBtn").click(function(){
           appInsights.trackEvent({
               name : 'shake_btn_stamp',
               properties : {
                   viewPage : document.title,
                   eventType : 'click'
               }
           })
           $("#shakePopup1").fadeOut().addClass('close').removeClass('show');
           $(".progress").removeClass("on");

        });

        $("#spoanyclose").click(function(){
            $("#noUse").fadeOut().addClass('close').removeClass('show');
        });
        $("#spoanyclose3").click(function(){
            $("#spoBarCodePopup").fadeOut().addClass('close').removeClass('show');
        });

        $("#viewSpoany1").click(function(){
            $("#noUse").fadeOut().addClass('close').removeClass('show');
            MPage.html("../MPD/NMPD_9_259T.html");
        });

       //menu페이지로 이동
        $(document).on('click', '#menu', function() {
            MPage.html('../MCM/NMCM_26_1P.html');
        })

	    if(MPage.info('filename') != 'NMCM_4_1V.html') { // 인트로 페이지는 로딩바 제외
            $("body").append(`<div class="loading-wrap" style="display: none; z-index: 99999;"><div class="loading-bar"><span class="txt-blind">로딩중</span></div></div>`);
        }

        if(MData.global('start_push_info') != ''){
            onReceiveNotification(MData.global('start_push_info'));
//            MData.removeGlobal('start_push_info');
        }

		if (typeof MStatus == "object" && typeof MStatus.onReady == "function") {
			// M.onReady 공통 처리
			MStatus.onReady();

			//iamtheman
			//HURAY 페이지에서 건강기록 관련 페이지로 다이렉트 랜딩한경우를 구분하기위한 용도
			if(MData.param("isPrevHurayPageCallYn") == "Y" && M.page.stack().length > 2){
				var pageData = M.page.stack()[M.page.stack().length-2];
				if(pageData && (pageData.key || "").toLocaleLowerCase().indexOf("nmpd_9_239t.html") > 0){
					// isPrevHurayPage = true;
					MData.storage("isPrevHurayPage", "Y");
				}else{
					// isPrevHurayPage = false;
					MData.storage("isPrevHurayPage", null);
				}
			}else{
				// isPrevHurayPage = false;
				MData.storage("isPrevHurayPage", null);
			}

			// 알람 안 읽은 알람이 있으면 뱃지 갱신
			if($(".btn-head.alarm").length){
				notiCheck();
			}

			// 타임라인 갱신
			let $timeline = $(".btn-head.timeline");
			if($timeline.length){
				selectTimelineCnt();
			}

			// 전체 화면중에 있는 공통 이벤트
			$(".btn-head.back").on('click', function(){
				if (typeof MStatus == "object" && typeof MStatus.onBack == "function") {
					MStatus.onBack();
				} else {
					MPage.back();
				}
			});

			$(".btn-head.timeline").on('click', function(){
				if(isEmpty($(".btn-head.timeline").attr("id"))){
					MPage.html({
						url: '../MCM/NMCM_13_1V.html', //타임라인
						action : "NO_HISTORY"
					});
				}
			});

			$(".btn-head.share").on('click', function(){
				MPage.html({
                    url : "../MCM/NMCM_7_6V.html", // 건강정보연동
                    action : "NO_HISTORY"
                });
			});

			$(document).on('click', '.ocr-hbtn.alarm', function() { // 알림 버튼
                stackRemove("NMCM_8_1V.html");
                MPage.html({
                    url : "../MCM/NMCM_8_1V.html", // 알림함
                    action : "NO_HISTORY"
                });
			});

			// IOS active 의사클래스가 활성화 되지 않는 현상 수정
			$(document).on("touchstart", function(){});

			//네비게이션 탭 링크
			const mainFooter = document.querySelector("footer .ocr-footer-wrap .ocr-nav");
			if(mainFooter instanceof HTMLDivElement){
				const mainFooterChild = mainFooter.children;

				const getMappingURL = (el) => {
					const className = el.classList.value;
					if(/myhealth/.test(className)) return `MDP/NMDP_1_167V`;
					else if(/kypwr/.test(className)) return `MMC/NMMC_1_1V`;
					else if(/ocare/.test(className)) return `MOK/NMOK_1_1V`;
					else if(/store/.test(className)) return `MPD/NMPD_2_1V`;
					else if(/event/.test(className)) return `EVE/NEVE_9_1V`;
				}

				const mainFooterHandler = async (event) => {
					const $target = event.currentTarget;

					let url = getMappingURL($target);
					try{
						if(/NMDP_4_1V/.test(url)) await providerWorking.check(Definition.PROVIDER_MALL_ID);
					}catch{
						return;
					}
					setEventListener("removeEventListener");
					MNet.httpSend = function(){}; // 이건 도대체 뭐하자는 소스인지 모르지만 그대로 넣어둠
					MPage.html({
						url: "../" + url + ".html",
						param: {},
						action: "CLEAR_TOP",
						animation: "NONE"
					});
				}

				const setEventListener = (listenerName) => {
					for(let i=0, size=mainFooter.childElementCount; i<size; i++){
						const $footerBtn = mainFooterChild[i];
						if($footerBtn.classList.contains("selected") == false) $footerBtn[listenerName]("click", mainFooterHandler);
					}
				}

				setEventListener("addEventListener");
			}

            // 검진 메뉴 추가
            var EX_currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf(".")); // 현재 페이지 체크

            if(EX_currentPage == 'MDP/NMDP_1_1V' || EX_currentPage == 'MDP/NMDP_2_1T' || EX_currentPage == "MME/NMME_4_10V") {
                EX_appendHtml();
            }

			if (isDev) {
				DisplayHtmlName();
			}

            // 앱이 꺼져 있던 상태에서 kbocare:로 호출했을 때처리
			var currPg = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf(".")); // 현재 페이지 체크

			if(MData.storage('USER_NO') != '' && (currPg == 'MOK/NMOK_1_1V'|| currPg == 'MDP/NMDP_1_167V' || currPg == 'MMC/NMMC_1_1V'|| currPg == 'MPD/NMPD_2_1V' || currPg == 'EVE/NEVE_9_1V') && MData.global('ON_OPEN_BY_OCARE_SCHEME') != '') { // 로그인이 됨(USER_NO 있고 && 홈) && ON_OPEN_BY_OCARE_SCHEME 있음
                onOpenByOcareSchme(MData.global('ON_OPEN_BY_OCARE_SCHEME'));
			} else if(currPg != 'MME/NMME_1_7V' && currPg != 'MME/NMME_1_11V' && currPg != 'MME/NMME_1_13P'
                          && currPg != 'MME/NMME_2_1V' && currPg != 'MME/NMME_2_3V' && currPg != 'MME/NMME_2_4V'
                          && currPg != 'MOK/NMOK_1_1V' && currPg != 'MCM/NMCM_4_1V' && MData.global('ON_OPEN_BY_OCARE_SCHEME') != '') {
			    // 그외의 경우(다음과 같은 상황 방지: 로그인 정보 변경 등의 이유로 로그인 인증 중 앱 호출 -> 이동 보류 -> 홈 화면 외 다른 페이지 이동 -> 잊어 버리고 앱 이용 -> 홈 화면에 돌아옴 -> 갑자기 앱 호출 이벤트 실행 )
			    MData.global('ON_OPEN_BY_OCARE_SCHEME', ''); // 초기화
			}
		}
	});
	M.onHide(function(event) {  //stack 의 대기열로 전환될때
		if (typeof MStatus == "object" && typeof MStatus.onHide == "function") {
			MStatus.onHide();
		}
		if(Medin.isPageMove){
			exIndicator.hide();
			Medin.isPageMove = false;
		}
	});
	M.onRestore(function(event) {  //stack 의 전면에 노출될때, 해당 화면으로 다시 돌아왔을 때 호출
		if (typeof MStatus == "object" && typeof MStatus.onRestore == "function") {
		    if(MData.global('start_push_info') != '') { // start_push_info에 object가 담겨 있으면 푸시 안 읽은 것으로 보고 처리
				onReceiveNotification(MData.global('start_push_info'));
			} else {
				if(MData.global("hasWebViewOpened") != "Y") { // (안드로이드)웹뷰를 열었다가 닫은 경우가 아니면 onRestore 등이 작동하게 함(iOS는 무조건 이쪽을 태움)
					if($(".btn-head.alarm").length){
						notiCheck();
					}

					let $timeline = $(".btn-head.timeline");
					if($timeline.length){
						selectTimelineCnt();
					}

					MStatus.onRestore();
				} else { // (안드로이드)웹뷰를 열었다가 닫혔을 때는 onRestore 등이 작동 안 되게 함
					MData.removeGlobal("hasWebViewOpened"); // 원상 복구
				}
			}

			if(typeof AM_pageInit != 'undefined' && typeof AM_pageInit.load == 'function') { // 전체 메뉴가 로딩돼 있을 경우 포인트/스타/쿠폰 및 새 소식 다시 체크
				AM_pageInit.load();
			}

			resumeScanWait();
		}
		// 월간 흔들기 이벤트
		if(MPage.info('filename') != 'NMOK_1_1V.html'){
            M.execute("exWNShakeStop")
        }else if (MPage.info('filename') == 'NMOK_1_1V.html' && MData.storage("shakeSetValue") == 'del'){
            M.execute("exWNShakeSetVibrate","N");
            M.execute("exWNShakeStart","shakeCb");
        }else{
			M.execute("exWNShakeSetVibrate","Y");
            M.execute("exWNShakeStart","shakeCb");
		}
	});

	M.onBack(function(event) {  // 뒤로가기 버튼 이벤트가 들어 왔을때(안드로이드)
		if($("#alertPopup").hasClass("show") || $("#confirmPopup").hasClass("show")) { // alert이나 confirm 창이 열려 있을 경우 아무 동작 하지 않음
			return;
		}

		var popupOpened = false;

		var $popup = $('.popup-wrap').not(".popupNeverClose");

		$popup.each(function(){
			if($(this).css('display') != 'none') {
				popupOpened = true;
				return false;
			}
		});

		var currPg = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));

		if((currPg != 'MCM/NMCM_5_1V' && currPg != 'MPD/NMPD_6_2T')&& ($('.floating-wrap.on').length > 0 || popupOpened)) { // 팝업이 열려 있을 경우(권한 체크 화면의 팝업은 제외) 팝업만 닫기
			if($('.floating-wrap.on').length > 0) {
				$('.mfb-component__button--main').trigger('click');
			}

			if(popupOpened) {
				$popup.fadeOut().addClass('close').removeClass('show');
			}
		} else { // 팝업이 닫혀 있거나 권한 체크 화면일 경우 뒤로 가기
			if (typeof MStatus == "object" && typeof MStatus.onBack == "function") {
				MStatus.onBack();
			} else {
				MPage.back();
			}
		}
	});

	M.onDestroy(function(event) { // 화면이 메모리에서 제거될때 ( 앱의 종료시에는 호출되지 않음 )
		if (typeof MStatus == "object" && typeof MStatus.onDestroy == "function") {
			MStatus.onDestroy();
		}
		stopAllScanWait();
	});
	M.onPause(function(event) {  // 앱이 백그라운드로 갈때
		if(!chkdup0) {
			onNativePause();
		} else {
			chkdup0 = false;
		}
	});
	M.onResume(function(event) {  // 앱이 포그라운드로 나올때
		if(!chkdup1) {
			var ret = onNativeResume();
			if(!ret) return;
		} else {
			chkdup1 = false;
		}
	});
})(window);

var onNativePause = function() {
	chkdup0 = true; // 중복 실행 방지

	MData.global("time", moment().format("YYYY.MM.DD HH.mm.ss"));
	stopAllScanWait();

	if (typeof MStatus == "object" && typeof MStatus.onPause == "function") {
		MStatus.onPause();
	}

	setTimeout(function(){
		chkdup0 = false;
	}, 500);
}

var onNativeResume = function() {
	chkdup1 = true; // 중복 실행 방지

	MData.global("time2", moment().format("YYYY.MM.DD HH.mm.ss"));
	var duration = moment.duration(moment(MData.global("time2"),"YYYY.MM.DD HH.mm.ss").diff(moment(MData.global("time"),"YYYY.MM.DD HH.mm.ss")));
	var seconds = duration.asSeconds();

	if(!(MPage.info('filename') == 'NMDP_9_7V.html') && seconds > 60 * 60){ //1시간 초과
		M.data.removeGlobal(); // 모든 global 값 제거(초기화)

		MPage.html({ // 인트로 이동
			url: "../MCM/NMCM_4_1V.html",
			action: "CLEAR_TOP",
		});

		return false;
	}else if(MPage.info('filename') == 'NMDP_9_7V.html'){
        M.data.removeGlobal(); // 모든 global 값 제거(초기화)
    }
	resumeScanWait();

	if (typeof MStatus == "object" && typeof MStatus.onResume == "function") {
		MStatus.onResume();
	}

	setTimeout(function(){
		chkdup1 = false;
	}, 500);

	return true;
}

var _clickFlag = false;
var frontFunctionFlag = false;
(function($){
	/**
	 * 더블클릭 방지
	 */
	var $originalFnOn = jQuery.fn.on;
	jQuery.fn.on = function() {

		if( arguments[0] == "click"){
			if(typeof arguments[1] == "function"){
				var callback = arguments[1];
				arguments[1] = function(e) {
					if(_clickFlag) {
						return;
					}else{
						_clickFlag = true;
						callback.call(this, e);
					}
					setTimeout(function() {
						_clickFlag = false;
					},500);
				}
			}else if(typeof arguments[2] == "function"){
				var callback = arguments[2];
				arguments[2] = function(e) {
					if(_clickFlag) {
						return;
					}else{
						_clickFlag = true;
						callback.call(this, e);

					}
					setTimeout(function() {
						_clickFlag = false;
					},500);
				}
			}

		}
		return $originalFnOn.apply(this, arguments);
	}
})(jQuery);

var sysExitConfirm = function(){
    Popup.confirm({
    	 message : "O’CARE앱을 종료하시겠습니까?",
    	 button:[ "확인","취소"],
    	 callback: function(btnIdx) {
    	  if(btnIdx == 0) {
          	M.execute("exWNEfilScaleDeviceRelease", ""); //체성분 디바이스 연결 해제
        	M.execute("exWNStopV3MobilePlus", "");  // Added by chkim 210917 V3 연동 (종료시 V3도 종료한다.)
            M.sys.exit();
    	  }else {
    	  }
    	 }
    });
}

/**
 * 화면 상단에 html명 표시
 */
var DisplayHtmlName = function() {
	if (isDev) {
		var tmp = document.createElement("div");
		tmp.setAttribute("id", "tmpPageNameId");
		tmp.style.cssText = "position:absolute;left:0;top:0px;font-size:1rem;color:blue;opacity:0.5;z-index:9999";
		tmp.innerText = getHtmlName();
		document.body.insertBefore(tmp, document.body.firstChild);
		document.querySelector("#tmpPageNameId").style.left = document.body.clientWidth/ 2	- document.querySelector("#tmpPageNameId").clientWidth/ 2+ "px";
	}
};

/****************************************************************************
 * 2. Common tools 															*
 * *************************************************************************/

/**
 * 화면 상단에 html명 표시
 */
var getHtmlName = function() {
	var _strIdx = window.location.href.indexOf('/html');
	var _endIdx = window.location.href.indexOf(".html");
	var _pageName = window.location.href.substring(_strIdx + 6, _endIdx);
	return _pageName;
};

/****************************************************************************
 * 4. String , Number,  Formatting tool 									*
 * *************************************************************************/

// 컴마
var comma = {
	set : function(str) { // 컴마 넣기
		if ( isNaN(str) || !str ) {
			return String(str);
		}
		function commify(strNo) {
			strNo = String(strNo);
			var reg = /(^[+-]?\d+)(\d{3})/;
			while (reg.test(strNo)) {
				strNo = strNo.replace(reg, '$1' + ',' + '$2');
			}
			return strNo;
		}
		try {
			//return String(str).replace(/(\d)(?<!\.[\d]+)(?=(?:\d{3})+(?!\d))/g, '$1,'); //??safari 에서 오류나서 변경함.
			return commify(str);
		} catch (e) {
			return str;
		}
	},//@Test:comma.set(1234567.123456); // "1,234,567.123456"

	remove : function(str) { // 컴마 제거
		try {
			return String(str).split(',').join('');
		} catch (e) {
			return str;
		}
	}//@Test: comma.remove("1,234,567.123456"); //"1234567.123456"
};

/**
 * 숫자유틸
 * */
var numUtil = {
	round:function(str, num){//반올림
		num = num||0;
		var input = Number(str)||0;
		return input.toFixed(num);
		//@Test:numUtil.round(2.45,1); //2.5
	},
	roundup:function(str, num){//올림
		num = num||0;
		var input = Number(str)||0;
		var div = Math.pow(10,num);
		return Math.ceil(input * div)/div;
		//@Test:numUtil.roundup(2.42,1); //2.5
	},
	rounddown:function(str, num){//버림
		num = num||0;
		var input = Number(str)||0;
		var div = Math.pow(10,num);
		return Math.floor(input * div)/div;
		//@Test:numUtil.rounddown(2.48,1) // 2.4
	},
	random:function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};

//날짜포맷 및 계산 : moment() 라이브러리 필수
//모든 기본 데이트 포맷은 'YYYY.MM.DD' 이다.(중요)
var DateUtil = (function(){
	var BASE_DATE_FORMAT      = "YYYY.MM.DD";
	var BASE_TIME_FORMAT      = "HH:mm:ss";
	var BASE_DATE_TIME_FORMAT = BASE_DATE_FORMAT + " " + BASE_TIME_FORMAT;

	var today = function(type, formatTxt) {
		var formatTxt = formatTxt||BASE_DATE_FORMAT;
		return moment().format(formatTxt);
	}

	var dateFormat = function(strDate, toFormat, fromFormat) { //dateFormat("2019/12/31","YYYY/MM/DD","YYYY.MM.DD")  //"2019.12.31"
		fromFormat = fromFormat || 'YYYYMMDD';
		toFormat = toFormat || BASE_DATE_FORMAT;
		return moment(strDate, fromFormat).format(toFormat);
	}

	var dateRange = function(fromStr, toStr) {
		var fromDt = moment(fromStr, BASE_DATE_FORMAT);
		var toDt = moment(toStr, BASE_DATE_FORMAT);

		var fromFormat = moment(fromDt).format(BASE_DATE_FORMAT);
		var toFormat;

		if ( fromDt.year() != toDt.year() ) {
			toFormat = moment(toDt).format('YYYY.MM.DD');
		} else if ( fromDt.month() != toDt.month() ) {
			toFormat = moment(toDt).format('MM.DD');
		} else {
			toFormat = moment(toDt).format('DD');
		}
		return fromFormat + ' ~ ' + toFormat;
	}
	//@Test: DateUtil.dateRange('2019.11.23', '2019.11.30') // "2019.11.23 ~ 30"
	//@Test: DateUtil.dateRange('2019.11.23', '2019.12.30') // "2019.11.23 ~ 12.30"
	//@Test: DateUtil.dateRange('2019.12.30', '2020.01.03') // "2019.12.30 ~ 2020.01.03"

	//strDateTime 은 "YYYY.MM.DD HH.mm.ss" 또는 "HH.mm.ss" 을 입력한다.
	var timeFormat = function(strDateTime) {
		var mmt = moment(strDateTime, BASE_DATE_TIME_FORMAT);
		if ( !mmt.isValid() ) {
			mmt = moment(strDateTime, BASE_TIME_FORMAT);
		}
		return (mmt.format('a')=="am" ? "오전 " : "오후 ") + mmt.format('hh:mm');
	};
	//@Test: //timeFormat('12:34:59')  //"오후 12:34"

	// "YYYY.MM.DD HH.mm.ss" 형식으로 보내야 한다. 날짜가 달라야 차이를 구하는데 문제가 없다.
	var timeRange = function(fromStr, toStr) {
		var fromDt = moment(fromStr, BASE_DATE_TIME_FORMAT);
		var toDt = moment(toStr, BASE_DATE_TIME_FORMAT);

		var hour = moment.duration(toDt.diff(fromDt)).hours();
		var minute = moment.duration(toDt.diff(fromDt)).minutes();

		return hour+"시간 "+minute+"분";
	}
	//@Test timeRange("2019.11.23 23:34:50", "2019.11.24 07:17:44"); //"7시간 42분"

	//@Test DateUtil.freeFormat('hh')	//"10"
	var freeFormat = function(formatTxt) {
		return moment().format(formatTxt);
	}

	// !! 입력 받은 moment 값을 직접 변경시켜 dateRange 값을 리턴합니다.
	// 따라서 전역변수를 넣어 사용하시면 값을 유지 하며 사용가능합니다.
	// @Test var PAGE_DATA.selectedDay = moment(); DateUtil.makeRange(PAGE_DATA.selectedDay, 'week')	// 'day/week/month'
	// DateUtil.makeRange(PAGE_DATA.selectedDay, 'week', 1); //한주 더하고 포맷str 얻기.
	// termNo 에 int 값을 넣으면 1
	// var ma = moment();console.log(ma.format());function makeRange(ma,typeStr){return ma.day(0);}; var rd=makeRange(ma, 'week');console.log(rd.format());
	var makeRange = function(momentObj, typeStr, termNo) {
		var start = momentObj;
		var end;

		if (typeStr == undefined) {
			typeStr = 'day';
		}

		switch (typeStr) {
		case 'month':
			if (termNo != undefined) {
				start.add('month', termNo);
			}
			start.date(1);
			end = moment(start);
			end.add('month',1).add('day',-1);
			//var start = moment();start.date(1);var end = moment(start);end.add('month',1).add('day',-1);console.log(start.format(), end.format());
			break;
		case 'week':
			if (termNo != undefined) {
				start.add('week', termNo);
			}
			start.day(0);
			end = moment(start);
			end.day(6);
			//var start = moment();start.day(0);var end = moment(start);end.day(6);console.log(start.format(), end.format());
			break;
		default :
			return start.format(BASE_DATE_FORMAT);
		}

		return dateRange(start.format(), end.format());
	}

	// makeRange 의 변형으로 Moment 객체를 배열로 직접 받는다. index 0 은 start , 1은 end 이다.
	var makeRangeMoment = function(momentObj, typeStr, termNo) {
		var start = momentObj;
		var end;

		if (typeStr == undefined) {
			typeStr = 'day';
		}

		switch (typeStr) {
		case 'month':
			if (termNo != undefined) {
				start.add('month', termNo);
			}
			start.date(1);
			end = moment(start);
			end.add('month',1).add('day',-1);
			//var start = moment();start.date(1);var end = moment(start);end.add('month',1).add('day',-1);console.log(start.format(), end.format());
			break;
		case 'week':
			if (termNo != undefined) {
				start.add('week', termNo);
			}
			start.day(0);
			end = moment(start);
			end.day(6);
			//var start = moment();start.day(0);var end = moment(start);end.day(6);console.log(start.format(), end.format());
			break;
		default :
			end = moment(start);
			break;
		}
		var returnArr = [];
		returnArr[0] = ( moment(start) );
		returnArr[1] = ( moment(end) );
		return returnArr;
	}

	var formatMinToHour = (min) =>{
		var hours = Math.floor(min / 60);
		var minutes = numUtil.rounddown(min % 60);
		if(hours > 0){
			return hours + '시간 ' + minutes + '분';
		}else{
			return minutes + '분';
		}
	}

	//요일 구하기
	var getDayOfWeek = (YYYYMMDD) =>{
		var day = moment(YYYYMMDD,"YYYYMMDD").format('d');
		var weekArray = ["일", "월", "화", "수", "목", "금", "토"];

		return weekArray[day];
	}

	return {
		"today"          : today,
		"dateFormat"     : dateFormat,
		"dateRange"      : dateRange,
		"timeFormat"     : timeFormat,
		"timeRange"      : timeRange,
		"freeFormat"	 : freeFormat,
		"makeRange"      : makeRange,
		"makeRangeMoment"      : makeRangeMoment,
		"formatMinToHour" : formatMinToHour,
		"getDayOfWeek" : getDayOfWeek
	}
})();

/****************************************************************************
 * 5. 날짜 계산
 * *************************************************************************/
//선택날짜에 해당하는 주 시작일~종료일 날짜 계산
//@Test getWeekByDate('2019.06.13')
//@Return {endDate: "20190615", fullText: "2019.06.09 ~ 15", startDate: "20190609", searchDate : "2019.06.13"}
var getWeekByDate = function(dateFormat){
		//해당일자 요일 확인
		var _day = moment(dateFormat,"YYYY.MM.DD").format('d'); //0~6 : 일요일~토요일
		var startDate;
		var endDate;
		var fullText;

		//주의 시작은 월요일, 종료는 일요일 기준

		//시작일 구하기
		if(_day == 0){
			//일요일인 경우
			startDate = moment(dateFormat,"YYYY.MM.DD").subtract(_day+6,'days').format('YYYY.MM.DD');
		}else{
			startDate = moment(dateFormat,"YYYY.MM.DD").subtract(_day-1,'days').format('YYYY.MM.DD');
		}

		//종료일 구하기
		endDate = moment(startDate,"YYYY.MM.DD").subtract(-6,'days').format('YYYY.MM.DD');

		// 날짜 포멧 정리
		fullText =DateUtil.dateRange(startDate, endDate);

		var weekObj = {
			searchDate : dateFormat,
			startDate : moment(startDate,"YYYY.MM.DD").format('YYYYMMDD'),
			endDate : moment(endDate,"YYYY.MM.DD").format('YYYYMMDD'),
			fullText : fullText
		}
		return weekObj;
	}

//선택날짜 다음주에 해당하는 주 시작일~종료일 날짜 계산
//@Test getWeekNext('2019.06.13')
//@Return {endDate: "20190615", fullText: "2019.06.09 ~ 15", startDate: "20190609", searchDate : "2019.06.13"}
var getWeekNext = function(dateFormat){
	var nextDate = moment(dateFormat,"YYYY.MM.DD").add(7,'days').format('YYYY.MM.DD');
	return getWeekByDate(nextDate);
}

//선택날짜 이전주에 해당하는 주 시작일~종료일 날짜 계산
//@Test getWeekPrev('2019.06.13')
//@Return {endDate: "20190615", fullText: "2019.06.09 ~ 15", startDate: "20190609", searchDate : "2019.06.13"}
var getWeekPrev = function(dateFormat){
	var prevDate = moment(dateFormat,"YYYY.MM.DD").subtract(7,'days').format('YYYY.MM.DD');
	return getWeekByDate(prevDate);
}

//선택날짜에 해당하는 월 시작일~종료일 계산
//@Test getWeekPrev('2019.07.05')
//@Return {searchDate: "2019.07.05", startDate: "20190701", endDate: "20190731"}
var getMonthByDate = function(dateFormat){
	var startDate = moment(dateFormat,"YYYYMM");
	var endDate = moment(dateFormat,"YYYYMM").endOf('month');
	var monthObj = {
		searchDate : dateFormat,
		startDate : startDate.format('YYYYMMDD'),
		endDate : endDate.format('YYYYMMDD')
	}
	return monthObj;
}

// ACT 날짜 변경 함수
// 전역변수에 var searchDate, startDate, endDate; 선언 필수
//@Test dateSet();
var dateSet = function(){
	var dateText;
	var today = moment().format('YYYY.MM.DD');

	// 검색 기준일자 확인 후 오늘보다 미래인 경우 기준일자 오늘로 변경
	if(moment().isBefore(moment(searchDate,"YYYY.MM.DD"))){
		searchDate = today;
	}
	if($('#tab-day').hasClass('tab__item--on')){ // 일 탭
		//오늘인 경우 오늘 표시, next버튼 disabled
		if(moment(searchDate,"YYYY.MM.DD").format('YYYY.MM.DD') == moment(today,"YYYY.MM.DD").format('YYYY.MM.DD')){
			dateText = moment(searchDate,"YYYY.MM.DD").format('YYYY.MM.DD');
			$('.right-icon.only-icon').hide();
		}else{
			dateText = moment(searchDate,"YYYY.MM.DD").format('YYYY.MM.DD');
			$('.right-icon.only-icon').show();
		}
		startDate = moment(searchDate,"YYYY.MM.DD").format("YYYY-MM-DD");
		endDate = moment(searchDate,"YYYY.MM.DD").format("YYYY-MM-DD");
		$('#date').text(dateText);
	}else if($('#tab-week').hasClass('tab__item--on')){ //주 탭
		var todayWeekObj = getWeekByDate(today);
		var weekDateObj = getWeekByDate(searchDate);
		dateText = moment(weekDateObj.startDate,"YYYYMMDD").format('YYYY.MM.DD')+"~"+moment(weekDateObj.endDate,"YYYYMMDD").format('YYYY.MM.DD');
		//이번주인 경우 next 버튼 disabled
		if(todayWeekObj.startDate == weekDateObj.startDate){
			$('.right-icon.only-icon').hide();
		}else{
			$('.right-icon.only-icon').show();
		}
		startDate = weekDateObj.startDate;
		endDate = weekDateObj.endDate;
		$('#week').text(dateText);
	}else if($('#tab-month').hasClass('tab__item--on')){ //월 탭
		dateText = moment(searchDate,"YYYY.MM.DD").format('YYYY.MM');
		//이번달인 경우 next 버튼 disabled
		if(moment(searchDate,"YYYY.MM.DD").format('YYYY.MM') == moment(today,"YYYY.MM.DD").format('YYYY.MM')){
			$('.right-icon.only-icon').hide();
		}else{
			$('.right-icon.only-icon').show();
		}
		var monthDateObj = getMonthByDate(searchDate);
		startDate = monthDateObj.startDate;
		endDate = monthDateObj.endDate;
		$('#month').text(dateText);
	}else{ //년 탭
		dateText = moment(searchDate,"YYYY.MM.DD").format('YYYY');
		//올해인 경우 next버튼 disabled
		if(moment(searchDate,"YYYY.MM.DD").format('YYYY') == moment(today,"YYYY.MM.DD").format('YYYY')){
			$('.right-icon.only-icon').hide();
		}else{
			$('.right-icon.only-icon').show();
		}
		startDate = moment(searchDate,"YYYY").format("YYYYMMDD");
		endDate = moment(searchDate,"YYYY").endOf('year').format("YYYYMMDD");
		$('#year').text(dateText);
	}
}

/****************************************************************************
 * 7. 검증 관련      															*
 * *************************************************************************/

var ValidateUtil;
(function(){
	var checkEmail = function(emailText) {
		/***************************************************************************
		 * 체크사항 -
		 *
		 * '@'가 2개이상일 경우 - .이 붙어서 나오는 경우 -
		 * '@.' 나 '.@'이 존재하는 경우 - 맨처음이.인 경우 -
		 * '@'이전에 하나이상의 문자가 있어야 함 -
		 * '@'가 하나있어야 함 - Domain명에 .이 하나 이상 있어야 함 - Domain명의 마지막 문자는 영문자 2~4개이어야 함
		 **************************************************************************/
		if ( emailText == undefined ) return false;
		if ( isEmpty(emailText) ) return false;

		var check1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;

		var check2 = /^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4})$/;

		if (!check1.test(emailText) && check2.test(emailText)) {
			return true;
		} else {
			return false;
		}
	}
	ValidateUtil = {
		"checkEmail" : checkEmail
	}
})();

/**
 * 값의 존재 여부 확인
 */
var isEmpty = function(obj) {
	if (typeof obj == "number")
		obj = obj + "";

	if (obj == null)
		return true;

	if (obj.length > 0)
		return false;
	if (obj.length === 0)
		return true;

	for ( var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key))
			return false;
	}

	return true;
};

/****************************************************************************
 * 9. 문자열 유틸														*
 * *************************************************************************/

/**
 * 문자열 유틸
 * */
var strTemplate = {// TO-DO 알림 팝업
		filter : function(val) {// 영문, 숮자, 특수문자만 입력 가능
			try {
				var _val = val.toString();
				var pattern = "";

				// pattern = /[^A-Za-z0-9]/g; // 영문 숫자 체크
				pattern = /[^A-Za-z0-9_\!\@\#\$\%\^\&\*\_\=\+\[\]\\\?]/g; // 영문 숫자
																			// 특수문자(!,@,#,$,%,^,&,*,_,=,+,[,],\,?)
																			// 체크

				if (pattern.test(_val)) {
					MPopup.alert("영문, 숫자, 특수문자만 입력 가능합니다.");
				}

				return _val.replace(pattern, "");
			} catch (e) {
				return val;
			}
		},
		extractNumber : function(str) { // 숫자만 추출
			try {
				return str.replace(/[^0-9]/g, '');
			} catch (e) {
				return str;
			}
		},
		onKeyupEnglow : function(id) { // 소문자만 입력
			var this_id = document.getElementById(id);

			this_id.onkeyup = function(event) {
				event = event || window.event;
				var _val = this.value.trim();
				this.value = _val.toLowerCase();
			}
		},
		onKeyupNum : function(id) { // 숫자만 입력
			var this_id = document.getElementById(id);

			this_id.onkeyup = function(event) {
				event = event || window.event;
				var _val = this.value.trim();
				this.value = strTemplate.extractNumber(_val);
			}
		},
		onKeyupFilter : function(id) { // 특수문자 입력 방지
			var this_id = document.getElementById(id);

			this_id.onkeyup = function(event) {
				event = event || window.event;
				var _val = this.value.trim();
				this.value = _val.replace(
						/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi, '');
			}
		},
		onKeyupFilterForMail : function(id) { // 특수문자,한글 입력 방지
			var this_id = document.getElementById(id);

			this_id.onkeyup = function(event) {
				event = event || window.event;
				var _val = this.value.trim();
				this.value = _val.replace(
						/[ ㄱ-ㅎㅏ-ㅣ가-힣\{\}\[\]\/?,;:|\)*~`!^\+┼<>@\#$%&\'\"\\\(\=]/gi, '');
			}
		},
		onKeyupComma : function(id) { // 숫자 세자리당 컴마
			var this_id = document.getElementById(id);

			this_id.onkeyup = function(event) {
				event = event || window.event;
				var _val = this.value.trim();
				_val = _val.replace(/(^0+)/,"");
				this.value = (strTemplate.extractNumber(_val)).replace(
						/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

			}
		},
		strFmt : function(obj) {
			var _obj = obj;
			var _str = _obj.str;
			var _args = _obj.arguments;
			var pattern = /{(\d+)}/;
			for (var idx = 0; idx < _args.length; idx++) {
				_str = _str.replace(pattern, _args[idx]);
			}
			return _str;

		},
		numLen : function(id, limit, cb) {
			// 숫자 자리수(number only)
			var this_id = document.getElementById(id);
			var p = /[^0-9]/g;
			this_id.onkeyup = function(event) {
				event = event || window.event;
				var numVal = this_id.value;
				if (p.test(numVal)) {//숫자가 아닐때
					this.value = strTemplate.extractNumber(numVal);
					if (cb) {
						cb(0);
					}
				} else {
					var len = (parseUtil.toStr(numVal)).length;
					if (len > limit) {//길이가 제한을 넘길 때
						this.value = numVal.substr(0, limit);
						if (cb) {
							cb(1);
						}
					}
					if (len == limit) {//길이가 제한을 넘길 때
						this.value = numVal.substr(0, limit);
						if (cb) {
							cb(2);
						}
					}
				}
			}
		},
		onKeyupCheckLen : function(id, limit, cb) {
			// 글자수 세기
			var this_id = document.getElementById(id);
			this_id.onkeyup = function(event) {
				event = event || window.event;
				var strVal = this_id.value;
				var strLen = strVal.length;

				if (strLen > limit) {
					this.value = strVal.substr(0, limit);
					if (cb) {
						cb();
					}
				}
			}
		},
		masking : function(str, m, s, e){
			//param : str-원문자열, m-마스킹문자, s-시작문자 인덱스(0~) ,e-끝문자 인덱스
			//s,e가 없으면 전체 마스킹, 끝문자 인덱스가 없으면 문자열 끝까지.
			var _s,_e,ret;
			var oLen = str.length;
			if(arguments.length<1){
				return '';
			}
			else if(arguments.length<2){
				return str;
			}
			else if(arguments.length==2)s=0,e=oLen;
			else if(arguments.length==3)e=oLen;
				_s = s;
				_e=e+1;
			if(_s>_e)_e=oLen;
			return str.substring(0,_s)+(str.substring(_s, _e)).replace(/[a-zA-Z가-힇0-9]/gi, m)+str.substring(_e);
		}
	};


/**
 *  특정 스택을 제거
 *  @param _url : html 파일명
 */
var stackRemove =function(_url){
	var stackInfo = MInfo.stack();
	for(var i=0; i<stackInfo.length; i++){
		var path = ""
		if(M.navigator.device("android") || M.navigator.device("ios")){
			path =  stackInfo[i].path;
		}else{
			path =  stackInfo[i].key;
		}
		if(path.indexOf(_url) > -1){
			MPage.remove(path);
		}
	}
}

/**
 * 일정공간 스택을 지운다.
 * @param {String} startUrl 스택을 비울 첫번째 URL(필수)
 * @param {String} endUrl 스택을 비울 마지막 URL(값이 없으면 마지막 전 스택까지 삭제)
 */
var stackSpaceRemove = function(startUrl, endUrl){
	if(startUrl){
		let stackInfo = MInfo.stack();
		let keyName = (M.navigator.device("ios") || M.navigator.device("android")) ? "path" : "key";
		let firstIndex = stackInfo.findIndex(stack => stack[keyName].indexOf(startUrl) >= 0);
		if(firstIndex >= 0){
			let lastIndex = stackInfo.findIndex(stack => stack[keyName].indexOf(endUrl) >= 0);
			for(let stack of stackInfo.slice(firstIndex, lastIndex >= 0 ? lastIndex + 1 : -1)){
				MPage.remove(stack[keyName]);
			}
		}
	}
};

var enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];
    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');

    dates.push(moment(currDate).format("YYYY-MM-DD"));
    while(currDate.add(1, 'days').diff(lastDate) <= 0) {
        dates.push(moment(currDate.clone()).format("YYYY-MM-DD"));
    }
    return dates;
};

//주차정보 데이터 수집 콜백
var getWeekInfoListCb = (receiveData) => {
	var stats = receiveData.result.stats;

	//날짜가 주차의 시작일~종료일 사이에 있는 경우 주차정보에 평균 세팅
	if(!isEmpty(stats)){
		for(var i in monthWeekInfoArray){
			if(!isEmpty(stats.sum[0])){
				if(moment(stats.sum[0].date).isBetween(monthWeekInfoArray[i].weekStartDate, monthWeekInfoArray[i].weekEndDate, null, '[]')){
					monthWeekInfoArray[i].average = stats.average;
					if(!isEmpty(stats.average.avgSteps)){
						stepList.push(stats.average.avgSteps);
					}
				}
			}
		}
	}
}

//주차정보 구하기
var searchPeriodCalculation = function() {

	cYear = moment(searchDate, "YYYYMMDD").format("YYYY")
	cMonth = moment(searchDate, "YYYYMMDD").format("MM")

	// 날짜형으로 데이트 포맷
	var date = new Date(cYear, cMonth-1);

	// 월요일을 중심으로한 주차 구하기( JS기준 : 일요일 0 월요일 1 ~ 토요일 6 )
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	var weekObj = null;
	var weekObjArray = new Array();
	var weekStand = 8;  // 월요일 고정
	var firstWeekEndDate = true;
	var thisMonthFirstWeek = firstDay.getDay();

	for(var num = 1; num <= 6; num++) {
		// 마지막월과 첫번째월이 다른경우 빠져나온다.
		if(lastDay.getMonth() != firstDay.getMonth()) {
			break;
		}

		weekObj = new Object();

		// 한주의 시작일은 월의 첫번째 월요일로 설정
		if(firstDay.getDay() <= 1) {

			// 한주의 시작일이 일요일이라면 날짜값을 하루 더해준다.
			if(firstDay.getDay() == 0) { firstDay.setDate(firstDay.getDate() + 1); }
			weekObj.weekStartDate =
				  firstDay.getFullYear().toString()
				+ "-"
				+ _pad((firstDay.getMonth() + 1).toString(), 2)
				+ "-"
				+ _pad(firstDay.getDate().toString() , 2);
		}

		if(weekStand > thisMonthFirstWeek) {
			if(firstWeekEndDate) {
				if((weekStand - firstDay.getDay()) == 1) {
					firstDay.setDate(firstDay.getDate() + (weekStand - firstDay.getDay()) - 1);
				}
				if((weekStand - firstDay.getDay()) > 1) {
					firstDay.setDate(firstDay.getDate() + (weekStand - firstDay.getDay()) - 1)
				}
				firstWeekEndDate = false;
			} else {
				firstDay.setDate(firstDay.getDate() + 6);
			}
		} else {
			firstDay.setDate(firstDay.getDate() + (6 - firstDay.getDay()) + weekStand);
		}

		// 월요일로 지정한 데이터가 존재하는 경우에만 마지막 일의 데이터를 담는다.
		if(typeof weekObj.weekStartDate !== "undefined") {
			weekObj.weekEndDate =
				  firstDay.getFullYear().toString()
				+ "-"
				+ _pad((firstDay.getMonth() + 1).toString(), 2)
				+ "-"
				+ _pad(firstDay.getDate().toString(), 2);
			weekObjArray.push(weekObj);
		}
		firstDay.setDate(firstDay.getDate() + 1);
	}

	return weekObjArray;
}

/****************************************************************************
 * 8. 기기 연동 체크														*
 * *************************************************************************/

/**
 * 기기 연동 체크 - 삼성헬스, 구글피트, 헬스키트
 */
var deviceLinkCheck = function (){
	var linkInfo = MData.storage("USE_PLATFORM");
	var linkCheck = false;

	if(linkInfo == "SAMSUNG_HEALTH") {
		linkCheck = true;
	} else if(linkInfo == "GOOGLE_FIT") {
		linkCheck = true;
	} else if(linkInfo == "HEALTH_KIT") {
		linkCheck = true;
	}

	return linkCheck;
}


/****************************************************************************
 * 10. 푸시 관련 														*
 * *************************************************************************/

/*
* 예외적으로 푸시 읽음 처리할 대상자(아워홈 이벤트)
*/
// TODO: 아워홈 이벤트 끝나면 수정할 것
var pushChkList = ["2000000046", "2000001024", "2000000744", "2000000149", "2000000506", "2000001013",
	"2000000094", "2000000343", "2000000370", "2000000786", "2000000393", "2000009672", "2000004175",
	"2000000633", "2000000324", "2000000174", "2000000947", "2000008067", "2000000384"];

var saveNoticeChk = function(seqNo, indicator) {
	return new Promise((resolve, reject) => {
		MNet.httpSend({
		    path: "/push/saveNoticeChk", // 푸시 읽음 저장
		    data: {
		        seqno : seqNo,
		        userNo : MData.storage("USER_NO")
		    },
			indicator: indicator,
		    callback: function (receivedData) {
				console.log(receivedData);
				resolve();
			},
			errorCallback: function() {
				Popup.alert({
					message: "시스템 오류",
				});
				reject();
			}
		});
	});
}

/**
 * 메인 페이지 여부 반환
 * @param {string} url
 */
const IS_MAIN_PAGE = (url) => {
	return /string/i.test(typeof url) && url.length && /NMOK_1_1V|NMDP_1_167V|NMMC_1_1V|NMPD_2_1V|NEVE_9_1V/.test(url);
}

/*
* andord & IOS 에서 인디게이트의 push 노티 아이콘을 클릭한 경우 호출되는 콜백 함수
*/
var onReceiveNotification = async function(obj){
	var locHrefs = location.href.split("/");
    var currentPage = locHrefs[locHrefs.length - 1];

    console.log("onReceiveNotification ::: ", obj, " ::: currentPage ::: ", currentPage);

	if(currentPage != "NMCM_4_1V.html" && currentPage != "NMME_2_1V.html"
                && currentPage != "NMME_2_2L.html" && currentPage != "NMME_2_3V.html" && currentPage != "MME_2_4V.html") { // 앱이 실행중일때 && 로그인화면이 아닐때

        // 푸시 JSON의 형태가 상황에 따라 제각각이어서 정확한 값을 골라내기 위해 이렇게 조치함
        var pObj = '';

        if(typeof obj == 'string') {
            pObj = JSON.parse(obj);
        } else {
            pObj = obj;
        }

        var alertData = '';

        if(typeof pObj.mps != 'undefined') {
            alertData = pObj.mps;
        } else {
            alertData = pObj.payload;
        }

        if(typeof alertData == 'string') {
            alertData = JSON.parse(alertData);
        }

        if(typeof alertData.mps != 'undefined') {
            alertData = alertData.mps;
        }

        if(typeof alertData == 'string') {
            alertData = JSON.parse(alertData);
        }

		let userNo = MData.storage("USER_NO");
		let isChkPush = new RegExp(`^(${pushChkList.join("|")})$`);
		let isProd = Definition.SERVER_TYPE == "PROD";

		// TODO: 아워홈 이벤트 끝나면 수정할 것
		if((isProd && isChkPush.test(userNo))) {
			let seqNo = alertData.SEQNO || alertData.seqno;
			await saveNoticeChk(seqNo, /(NMDP_1_1V|NMDP_2_1T|NMDP_3_1T|NMDP_4_1V|NMCM_10_1V)\.html/.test(currentPage) ? false : true);
		}

		let theExt = alertData.EXT || alertData.ext || null;

		if(typeof theExt === "string") {
			theExt = JSON.parse(theExt.replace(/6\|/g, '').replace(/\|/g, '')); // UMS에서 푸시를 발송하면 ext가 6\{..}| 같은 이상한 형태로 넘어와서 replace 조치함
		}

		let page = (theExt || {}).page || "../MOK/NMOK_1_1V.html";
		let fileAndFolderNames = page.split('/');
		let pageName = fileAndFolderNames[fileAndFolderNames.length - 1]; // 예: NMDP_1_1V.html
		console.log("aaaa: ", currentPage, fileAndFolderNames, fileAndFolderNames.length, pageName);

        //23.09.19 에이슬립 AOS 노티 관련 추가
        if(theExt.pushType == 'sleepTracking'){
            return
        }

		//23-03-09 KEK 김재성 프로 요청으로 18시 루틴 푸시 클릭시 동작 추가
		if(pageName == "NMDP_2_1T.html"){
            appInsights.trackEvent({
                name: 'appPush',
                properties: {
                viewPage: document.title,
                eventType: 'push',
                moveToPage : 'main'
                }
            });
        }
		if(currentPage === "NMOK_1_1V.html" && pageName !== "NMOK_1_1V.html") {
			// 풀 팝업 자동 이동 기능이 있는 페이지에 풀 팝업 자동 이동을 하지 않도록 조치. 단 홈에서 홈을 호출한 경우는 풀 팝업 이동할 수 있음
			MData.global("isCalledByPush", 'Y');
		}

        // MNet.httpSend({
        //     path: "/push/saveNoticeChk", // 푸시 읽음 저장
        //     data: {
        //         seqno : alertData.SEQNO || alertData.seqno,
        //         userNo : MData.storage("USER_NO")
        //     },
        //     callback: function (receivedData) {
				// TODO: 아래 로직을 수정할 경우 NMCM_8_1V.js의 #notiList li 클릭 이벤트도 수정할 것

                // 푸시 정보에 이동할 페이지가 있으면 해당 페이지로 이동, 없으면 홈으로 이동
                if(theExt === null) {
					if(currentPage === pageName && pageName === "NMOK_1_1V.html") { // 홈 화면을 홈에서 호출하는 경우 이동하지 않음
						expire();
						return;
					}

                    MPage.html({
                        url : "../MOK/NMOK_1_1V.html"
                    });

                    expire();
                } else {
                    var param = {};

                    if(!isEmpty(theExt)) {
						// 종건 읽음 처리
						if(theExt.recvDt) {
							await new Promise((resolve, reject) => {
								MNet.httpSend({
								    path: "/gc/updateGcExamAlarm",
								    data: {
										recvDt : theExt.recvDt,
								        userNo : MData.storage("USER_NO"),
								    },
								    callback: function(rd) {
										resolve();
									},
									errorCallback: function() {
										resolve();
									}
								});
							});
						}

						// 서버 데이터로 공통 처리
						if(theExt instanceof Object && theExt.type == "COMMON" && theExt.paramater instanceof Object){
							expire();
							// 페이지 이동 푸시
							if(/string/i.test(typeof theExt.page)){
								currentPage = location.href.replace(/(?:.*html)(.*)(\.html)$/, "..$1$2");
								// 같은 페이지가 아닐때만 이동
								if(new RegExp(currentPage).test(theExt.page) == false){
									MPage.html({
										url: theExt.page,
										param: theExt.paramater,
										action: IS_MAIN_PAGE(theExt.page) ? "CLEAR_TOP" : "NEW_SCR"
									});
								}
							}
						} else if(typeof theExt.type !== "undefined" && theExt.type === "ocaremall") { // 오케어몰 웹뷰 호출
							expire();
							providerWorking.check(Definition.PROVIDER_MALL_ID).then(async () => {
								await getInKeyByProvId(Definition.PROVIDER_MALL_ID, true);
								let ocareMallInKey = MData.storage("OcareMallInKey");
								const url = Definition.PROVIDER_OCAREMALL_URL;

								let bytes = `inKey=${encodeURIComponent(ocareMallInKey)}`;

								if(typeof theExt.url !== "undefined") {
									bytes += `&redirectUrl=${encodeURIComponent(theExt.url)}`;
								}

								M.execute("exWNPostWebViewBrowser", "오케어몰", url, "Y", "ocareMallCalledByPushOrIntent", bytes);
							});
						} else if(typeof theExt.type !== "undefined" && theExt.type === "news" && typeof theExt.url !== "undefined") { // 건강뉴스
							expire();

							MPage.html({
								url: "../MDP/NMDP_1_15V.html",
								param: {
									isPushNews: "Y",
									params: {
										id: theExt.ID,
										classifiedType: theExt.CLASSIFIED_TYPE,
										viewUrl: theExt.url,
									},
								}
							});
						} else if(typeof theExt.page ==="undefined" && typeof theExt.providerId !== "undefined") { // 이동할 페이지가 기재돼 있지 않고 providerId가 있으면 웹뷰 호출로 간주
							if(theExt.providerId == Definition.PROVIDER_HURAY_ID) {
								let {typeKey, ... params} = theExt;

								expire();

								MPage.html({
									url: "../MPD/NMPD_9_239T.html",
									param: {
										isPushHuray: "Y",
										typeKey: typeKey,
										params: params,
									}
								});
							}
						} else { // 푸시 정보에 이동할 페이지가 있으면 해당 페이지로 이동, 없으면 알림함으로 이동
							if(currentPage === pageName && pageName === "NMOK_1_1V.html") { // 홈 화면을 홈에서 호출하는 경우 이동하지 않음
								expire();
								return;
							}

							//마이헬스 이동시 루틴 탭 표시 처리
							if(/NMDP_2_1T/.test(page)){
								let message = alertData.MESSAGE || alertData.message;
								let message2 = '';
								let message3 = '';

								try {
									message2 = JSON.stringify(JSON.parse(pObj.payload).aps.alert);
								} catch(err) {

								}

								try {
									message3 = JSON.stringify(pObj.aps.alert.title);
								} catch(err) {

								}

								if(typeof message == "object") message = JSON.stringify(message);
								if(/루틴/.test(message) || /루틴/.test(message2) || /루틴/.test(message3)){
									param.pageType = "routin";
								}
							}

							let options = {
								url : page,
								param: param,
							};

							for(let key in theExt) {
								if(key === "tab") {
									let tab = parseInt(theExt.tab);

									if(!isNaN(tab)) options.param.tab = tab;
									else options.param.tab = theExt.param.tab;
								} else if(key !== "page") {
									options.param[key] = theExt[key];
								}
							}

							MPage.html(options);

							expire();
						}
                    } else {
						if(currentPage === pageName && pageName === "NMOK_1_1V.html") { // 홈 화면을 홈에서 호출하는 경우 이동하지 않음
							expire();
							return;
						}

                        MPage.html({
                            url : "../MOK/NMOK_1_1V.html",
                            param: param,
                        });

                        expire();
                    }
                }
            // }
        // });
    } else { // 인트로이거나 로그인 화면일 경우 다음 페이지에서 이 함수를 다시 띄우기 위해 obj 값을 global로 저장
        MData.global('start_push_info', obj);
    }

	// start_push_info, isCalledByPush 값 초기화
	function expire() {
		MData.removeGlobal('start_push_info');
		setTimeout(function(){MData.removeGlobal("isCalledByPush");},500); // 풀 팝업 자동 이동 기능이 있는 페이지에 풀 팝업 자동 이동을 할지 여부를 판단할 시간을 주기 위해 timeout 지정
	}
}

// 오케어몰이 푸시나 intent(앱 호출)로 열렸을 경우 실행할 콜백 함수
function ocareMallCalledByPushOrIntent(result) {
    console.log(result);
    var changePage;
    if(M.navigator.device("ios")) {
        changePage = result.data.page
    } else {
        changePage = result.data.nameValuePairs.page
    }

    if(currentPage === "NMPD_2_1V.html") { // 스토어 화면일 경우
        OcareUI.exe.loadComplete(); // 스와이퍼 작동
    }

    if(changePage != "" && typeof changePage != "undefined") {
        MPage.html ({
            url : '../'+changePage
        })
        return;
    }

   var currentPage = M.page.info().filename;

	if(currentPage === "NMOK_1_1V.html") { // 홈 화면일 경우
		MStatus.onRestore(); // onRestore 호출해서 덜 그린 화면 그리기 완성
	}
}

// 알림함 목록 중 안읽은게있으면 true, 다 읽었으면 false
var notiCheck = function() {
    /*if(!isEmpty(MData.storage("USER_NO"))) { // 가입 전 최초진입 시에 전화권한 물어보는 오류로 추가
        MNet.httpSend({
            path: "/push/selectNoticeList",
            indicator: false,
            data: {
                userNo : MData.storage("USER_NO")
            },
            callback: function (receivedData) {
                var hasBadge = false;
                var $alarm = $('.header .btn-head.alarm');

                if(receivedData.noticeList.length != 0) {
                    if($alarm.length > 0) {
                        var list = receivedData.noticeList;

                        for(var i in list) { // 안읽은게 있는지 체크
                            if(list[i].STATUS == 2 || list[i].STATUS == 1) { // STATUS : 2 안읽은거, 3 읽은거

                                hasBadge = true;
                                break;
                            }
                        }
                    }
                }

                var $badge = $alarm.find('em.badge');
                if(hasBadge) {
                    if($badge.length < 1) {
                        $alarm.append('<em class="badge">new</em>');
                    }

                    $alarm.find('em.badge').show();
                } else {
                    $badge.hide();
                }
            }
        });
    }*/

}

/****************************************************************************
 * 11. 건강 정보 연동 관련      												*
 * *************************************************************************/

var clickPlatform = ""; // 사용자가 선택한 플랫폼 정보
var saveVal = "";
var errFlag = 0; // 삼성헬스 연동시 재시도 한번 추가
var callBackNm;
var syncType = "";
var shouldWaitServerPS = true; // (신규 API 전용) 플랫폼 연동 시 서버 저장 후 결과 기다릴지 여부(기본값은 기다림)
var savedPlatformSyncData = 0; // 서버로 저장한 데이터 수
var savedNewData0 = []; // 혈당/혈압 신규 데이터 중 가장 마지막 데이터(플랫폼 연동)
var savedNewData1 = []; // 혈당/혈압 신규 데이터 중 가장 마지막 데이터(혈당계/혈압계 연동)
var psSaveVal = ""; // 건강정보연동 전용: 특정 saveVal을 지정해서 psSavedNewData0 값 세팅
var psSavedNewData0 = []; // 건강정보연동 전용

// 2022년 하반기 수정된 플랫폼 연동 신규 API 적용 여부 판단
var newSyncYn = function(platform) {
	const isRealApp = Definition.SERVER_TYPE == "PROD";
	let isNewSync = false;

	if(platform == "" || platform == "GOOGLE_FIT") { // 구글 피트니스는 무조건 적용 안 함
		isNewSync = false;
	} else if(!isRealApp) { // DEV/QA이면 허용
		isNewSync = true;
	} else {
		const appVers = MInfo.app("app.version").toString().split(".");

		if(M.navigator.device("android")) { // 안드로이드 앱 1.1.6부터 적용
			if(appVers[0] > 1) {
				isNewSync = true;
			} else if(appVers[0] == 1) {
				if(appVers[1] > 1) {
					isNewSync = true;
				} else if(appVers[1] == 1) {
					if(appVers[2] > 5) {
						isNewSync = true;
					} else {
						isNewSync = false;
					}
				} else {
					isNewSync = false;
				}
			} else {
				isNewSync = false;
			}
		} else if(M.navigator.device("ios")) { // iOS 앱 1.2.2부터 적용
			if(appVers[0] > 1) {
				isNewSync = true;
			} else if(appVers[0] == 1) {
				if(appVers[1] > 2) {
					isNewSync = true;
				} else if(appVers[1] == 2) {
					if(appVers[2] > 1) {
						isNewSync = true;
					} else {
						isNewSync = false;
					}
				} else {
					isNewSync = false;
				}
			} else {
				isNewSync = false;
			}
		} else {
			isNewSync = false;
		}
	}

	return isNewSync;
}

// 2023년 상반기 수정된 기기 연동 프로세스 적용 여부
var isRenewedDeviceConnect = function() {
	const isRealApp = Definition.SERVER_TYPE == "PROD";
	let isNewSync = false;

	if(!isRealApp) { // DEV/QA이면 무조건 적용
		isNewSync = true;
	} else {
		const appVers = MInfo.app("app.version").toString().split(".");

		if(M.navigator.device("android")) { // 안드로이드 앱 1.1.8부터 적용
			if(appVers[0] > 1) {
				isNewSync = true;
			} else if(appVers[0] == 1) {
				if(appVers[1] > 1) {
					isNewSync = true;
				} else if(appVers[1] == 1) {
					if(appVers[2] > 7) {
						isNewSync = true;
					} else {
						isNewSync = false;
					}
				} else {
					isNewSync = false;
				}
			} else {
				isNewSync = false;
			}
		} else if(M.navigator.device("ios")) { // iOS 앱 1.2.5부터 적용
			if(appVers[0] > 1) {
				isNewSync = true;
			} else if(appVers[0] == 1) {
				if(appVers[1] > 2) {
					isNewSync = true;
				} else if(appVers[1] == 2) {
					if(appVers[2] > 4) {
						isNewSync = true;
					} else {
						isNewSync = false;
					}
				} else {
					isNewSync = false;
				}
			} else {
				isNewSync = false;
			}
		} else {
			isNewSync = false;
		}
	}

	return isNewSync;
}

// 서버에 기록할 식별자
var getPlatformSep = function(key) {
	let sep;
	const usePlatform = clickPlatform;

	if(usePlatform == "SAMSUNG_HEALTH") {
		sep = "SH"; // Samsung Health
	} else if(usePlatform == "GOOGLE_FIT") {
		sep = "GF"; // Google Fit
	} else if(usePlatform == "HEALTH_KIT") {
		sep = "AH"; // Apple Health
	} else {
		return "";
	}

	if(typeof key != "undefined") sep += "_" + key;

	return sep;
}

var timeData = {}; // 플랫폼 연동 시 각 항목별 조회 시작 시간 기억
var mEndDatePS = null; // 플랫폼 연동 시 조회 끝 시간 기억

// 플랫폼 연동 시 각 항목별 조회 시작 시간 판단
var checkPlatformDatetime = function(allItems) {
    return new Promise(async (resolve, reject) => {
		let sep = getPlatformSep();

		if(sep == "") {
			resolve();
			return;
		}

		let shouldCheck = false;

		for(let i in allItems) {
			const a = allItems[i];
			const sepKey = sep + "_" + a;
			const time = MData.storage(sepKey);
			if(time == "") { // 없는 시간대가 있을 경우
				shouldCheck = true;
			} else {
				timeData[sepKey] = time;
			}
		}

		if(shouldCheck) { // 없는 시간대가 하나라도 있을 경우 서버 조회
			timeData = await new Promise((resolve1, reject1) => {
				MNet.httpSend({
					path : '/cmm/selectHealthPlatform',
					data: {
						userNo: MData.storage('USER_NO'),
					},
					indicator: false,
					noErrMsg: true,
					callback :function(rd){
						console.log(rd);

						if (rd.rtnCd == '0000') {
							if(typeof rd.data != "undefined" && Array.isArray(rd.data)) {
								for(let i in rd.data) {
									let d = rd.data[i];
									if(d.SEP.indexOf(sep) != -1) {
										let time = d.MOD_DT + " +0900";
										MData.storage(d.SEP, time);
										timeData[d.SEP] = time;
									}
								}

								resolve1(timeData);
							} else {
								resolve1(timeData);
							}
						} else {
							resolve1(timeData);
						}
					},
				});
			});

			const dtFmt = "YYYY-MM-DD HH:mm:ss ZZ";

			for(let i in allItems) {
				let td = timeData[sep + "_" + allItems[i]];
				let mCurr = moment();

				if(typeof td == "undefined" || mCurr.diff(moment(td, dtFmt), 'months', true) > 1) {
					timeData[sep + "_" + allItems[i]] = mCurr.clone().add(-1, 'months').format(dtFmt);
				}
			}

			resolve();
		} else {
			resolve();
		}
    });
}

//플랫폼 연동 시작
function platformSync(cb, type, val, waitServer){
	callBackNm = cb; //콜백
	syncType = type; //"ALL"(전체) / "ALL2"(추가 운동을 제외한 나머지) / "EX"(기존 운동 + 추가 운동만) / ""(특정 하나만)
	saveVal = val;
	savedPlatformSyncData = 0; // 서버로 저장한 데이터 수 초기화
	savedNewData0 = [];

	if(typeof waitServer == "boolean") {
		shouldWaitServerPS = waitServer;
	} else {
		shouldWaitServerPS = true;
	}

    if(MData.storage("USE_PLATFORM") != "" && MData.storage("USE_PLATFORM") != undefined) {
    	if(MData.storage("USE_PLATFORM") == "GOOGLE_FIT" || MData.storage("USE_PLATFORM") == "HEALTH_KIT") {
            clickPlatform = MData.storage("USE_PLATFORM");
            setTimeout(function() { // 페이지 로드하자마자 네이티브 함수 실행 시 간헐적으로 안되는 현상 있어 타임아웃 추가
                // 헬스킷 사용 가능여부 체크
                M.execute("exWNOnChkHealthKit", clickPlatform, "chkHealthKitCb");
            },500);
        }else if(MData.storage("USE_PLATFORM") == "SAMSUNG_HEALTH"){
            clickPlatform = MData.storage("USE_PLATFORM");
            setTimeout(function(){
                M.execute("exWNCheckSamsungPermission", "checkSamsungCb");
            },500);
        }else{
            if(typeof callBackNm == "function") callBackNm();
        }
    } else {
    	if(typeof callBackNm == "function") callBackNm();
    }
}

var checkSamsungCb = function(result){
    if(result instanceof Object && result.code == "success"){
        if(syncType.startsWith("ALL")){
            // 헬스킷 읽기 데이터 요청 - 전체 -> 체중 부터 시작
            saveVal = "weight";
        } else if(syncType == "EX") {
            saveVal = "steps";
        }
        getHealthRecord();
    }else{
        MData.storage("USE_PLATFORM", "");
        if(typeof callBackNm == "function") callBackNm();
    }
}

var chkHealthKitCb = function(result) {
    if(result instanceof Object && result.code == "failed" && errFlag == 0)  { // 연동 실패 시에 한번 재시도
        errFlag++;
        M.execute("exWNOnChkHealthKit", clickPlatform, "chkHealthKitCb");
    } else {
        //헬스킷 사용 권한 요청
        M.execute("exWNOnReqHealthKit", clickPlatform, "reqHealthKitCb");
    }
}

var reqHealthKitCb = function(result) {
    if(result instanceof Object && result.code == "success") {
    	if(syncType.startsWith("ALL")){
    		// 헬스킷 읽기 데이터 요청 - 전체 -> 체중 부터 시작
    		saveVal = "weight";
    	} else if(syncType == "EX") {
			saveVal = "steps";
		}
		getHealthRecord();
    } else {
    	if(typeof callBackNm == "function") callBackNm();
    }
}

var PLATFORM_SYNC_TIMEOUT = 1000 * 60 * 3; // 플랫폼 연동 시 최대 3분까지만 대기
var IS_PLATFORM_SYNC_FINISHED = false; // 플랫폼 연동이 끝났는지 여부 체크
var healthRecordTypes = 0; // 플랫폼 연동 시 받아야 하는 전체 항목 수
var addExRes = null; // 데이터를 받는 데 성공한 항목 수
var unknownEx = 0; // 잘못 들어온 이상한 항목 수
var allExSuccess = true; // 모든 항목을 성공적으로 받아왔는지 여부 체크(하나라도 이상이 있으면 false)
var allExData = {}; // 서버로 전송할 데이터를 한데 모으는 변수
var tempDateTime = "";
var IS_OLD_STEPS_API = true; // 걸음 수 구 API 사용 강제 여부

// 연동 시작
var getHealthRecord = async function() {
	tempDateTime = "";
	savedPlatformSyncData = 0;
	savedNewData0 = [];
	savedNewData1 = [];
	IS_PLATFORM_SYNC_FINISHED = false;
	addExRes = new Map();
	unknownEx = 0;
	allExData = {};

	if(!newSyncYn(clickPlatform)) { // 구 API 적용
		M.execute("exWNGetHealthRecords", clickPlatform, saveVal, "getHealthRecordsCb"); // 각 항목 순차 조회
	} else { // 신규 API 적용
		setTimeout(function(){
			if(!IS_PLATFORM_SYNC_FINISHED) {
				IS_PLATFORM_SYNC_FINISHED = true;

				if(typeof callBackNm == "function") {
					callBackNm();
				}
			}
		}, PLATFORM_SYNC_TIMEOUT);

		let ws = []; // 기존 건강+운동 정보 중 조회할 항목들
		let works = {works:[]};
		const cb = "getHealthRecordsCb"; // 콜백 함수 이름(성공, 에러 모두 해당)
		const isSaveValForWs = /^(weight|steps|running|cycling|hiking|glucose|blood_pressure|heart_rate|sleep)$/; // 기존 건강+운동 정보 조회 모드인지 여부 판단을 위한 정규식

		if(syncType.startsWith("ALL")) { // 전체 조회 시
			IS_OLD_STEPS_API = true;
			ws = ["weight", /*"steps",*/ "running", "cycling", "hiking", "glucose", "blood_pressure", "heart_rate", "sleep"];
		} else if(syncType == "EX") { // 운동만 조회 시
			IS_OLD_STEPS_API = true;
			ws = [/*"steps",*/ "running", "cycling", "hiking"];
		} else if(isSaveValForWs.test(saveVal)) { // 특정 한 항목만 조회 시
			if(saveVal == "steps") {
				IS_OLD_STEPS_API = true;
				ws = [];
			} else {
				IS_OLD_STEPS_API = false;
				ws = [saveVal];
			}
		}

		let exerciseArray = []; // 추가 운동 정보 중 조회할 항목들

		if(syncType == "ALL" || syncType == "EX") { // 전체(ALL2는 제외) 또는 운동만 조회 시
			if(clickPlatform == "SAMSUNG_HEALTH") { // 삼성 헬스
				exerciseArray = ["golf", "basketball", "climbing", "badminton", "bowling", "swimming", "baseball", "aerobic", "jumprope",  "soccer",
					"tabletennis", "tennis", "boxing", "squash", "yoga", "pilates", "treadmill"];
			} else if(clickPlatform == "HEALTH_KIT") { // 애플 건강
				exerciseArray = ["stairs", "golf", "strengthtraining", "basketball", "climbing", "badminton", "swimming", "baseball", "jumprope",
					"soccer", "tabletennis", "tennis", "boxing", "squash", "yoga", "pilates"];
			} else { // 기타의 경우 잘못된 경우이므로 스톱
				$(".loading-wrap").hide();
				return;
			}
		} else if(!isSaveValForWs.test(saveVal)) { // 특정 한 항목만 조회 시
			if(clickPlatform == "SAMSUNG_HEALTH" || clickPlatform == "HEALTH_KIT") {
				exerciseArray = [saveVal];
			}
		}

		let allItems = [...ws, ...exerciseArray]; // 모든 항목
		if(IS_OLD_STEPS_API) {
			allItems.push("steps_old");
		}

		await checkPlatformDatetime(allItems); // 항목별 시작 시간 가져옴
		mEndDatePS = moment().utcOffset(540); // 현재 시각(한국 표준시 UTC+9)을 조회 끝 시간으로
		endDateTZ = mEndDatePS.format("YYYY-MM-DD HH:mm:ss ZZ"); // 네이티브 호출 시 사용할 포맷으로 표기
		const sep = getPlatformSep(); // 서버에 저장할 식별자 조회

		for(let i in ws) {
			works.works.push({ // 기존 건강+운동 정보 중 조회할 항목들
				type: ws[i], // 조회할 항목
				startDate: timeData[sep + "_" + ws[i]], // 조회 시작 시간
				endDate: endDateTZ, // 조회 끝 시간
				callback: cb, // 해당 항목 조회 성공 시 호출할 콜백 함수 이름
			});

			if(syncType == "" && ((saveVal == "blood_pressure" && ws[i] == "blood_pressure") || (saveVal == "glucose" && ws[i] == "glucose"))) {
				tempDateTime = timeData[sep + "_" + ws[i]];
			}
		}

		let works2 = {works: []};

		for(let i in exerciseArray) { // 추가 운동 중 조회할 항목들
			const key = exerciseArray[i];

			works2.works.push({
				type: key, // 조회할 항목
				startDate: timeData[sep + "_" + key], // 조회 시작 시간
				endDate: endDateTZ, // 조회 끝 시간
				callback: cb, // 해당 항목 조회 성공 시 호출할 콜백 함수 이름
			});
		}

		healthRecordTypes = ws.length + exerciseArray.length; // 플랫폼 연동 시 받아야 하는 전체 항목 수

		if(IS_OLD_STEPS_API) {
			healthRecordTypes += 1; // 걸음 수 구 API 사용 시 항목 수를 1개(걸음 수) 더 추가
			M.execute("exWNGetHealthRecords", clickPlatform, "steps", cb);
		}

		if(ws.length > 0) {
			M.execute("exWNGetHealthRecords", JSON.stringify(works), cb); // 기존 건강+운동 데이터 조회. cb는 조회 자체가 에러 났을 때 호출하는 콜백 함수
		}

		if(exerciseArray.length > 0) {
			M.execute("exWNWorkout", JSON.stringify(works2), cb); // 추가 운동 데이터 조회(기존 건강+운동 조회와 동시에 처리). cb는 조회 자체가 에러 났을 때 호출하는 콜백 함수
		}
	}
}

// 체중 bmi 계산을 위해서 키 정보 가져옴
function selectWHData(cb, errorCallback) {
	var resultData = {
		recordKey : MData.storage("RECORD_KEY"),
		userNo : MData.storage("USER_NO")
	};

	var options = {
		path : "/survey/selectSurveyAndClinicsInfo",
		data : resultData,
		indicator : false,
		callback : function(rd) {
			if (rd.rtnCd == "0000") {
				if (cb == undefined) {
					resData = rd;
				} else {
					resData = cb(rd);
				}
			}
		}
	};

	if(typeof errorCallback == "function") {
		options.errorCallback = errorCallback;
	}

	MNet.httpSend(options);
}

// 구 API로 순차 조회
var getHealthRecordAgain = async function() {
	M.execute("exWNGetHealthRecords", clickPlatform, saveVal, "getHealthRecordsCb");
}

// 콜백 함수
var getHealthRecordsCb = function(result) {
	console.log(">>>>getHealthRecordsCb: ");
	console.log(result);

	let newSync = newSyncYn(clickPlatform);
	const sep = getPlatformSep();

	if((newSync && !IS_PLATFORM_SYNC_FINISHED) || !newSync) {
		if(result instanceof Object && result.code == "success") {
			var infoType = ""; // 항목명

			if(newSync) {
				infoType = result.type;
				addExRes.set(infoType, true); // 성공한 항목으로 기억함
			} else {
				infoType = saveVal;
			}

			result = result.data;
			// 가져온 데이터 서버로 저장
			var weight = Number(MData.storage("WEIGHT"));

			if(infoType == "weight") { // 체중
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0
						&& typeof result.entries[0].weight == "object" && typeof result.entries[0].weight.value != "undefined") {

					weight = result.entries[0].weight.value;
					MData.storage("WEIGHT", weight);

					selectWHData(function(cb){ // 키 정보 가져오기
						var setHeight = cb.surveyData.QESTN2_1;

						// 검진에 키 정보가 있으면 최신 키 정보 사용
						try {
							if(typeof cb.clinicData != 'undefined' && !isEmpty(cb.clinicData)
								&& typeof cb.clinicData.entities != 'undefined' && Array.isArray(cb.clinicData.entities)
								&& cb.clinicData.entities.length > 0
								&& typeof cb.clinicData.entities[0].sections != 'undefined' && Array.isArray(cb.clinicData.entities[0].sections)
								&& cb.clinicData.entities[0].sections.length > 0){

								var sections = cb.clinicData.entities[0].sections;

								for(var i in sections) {
									var s = sections[i];
									if(s.category.displayName == '기타') {
										var results = s.results;
										for(var j in results) {
											var r = results[j];
											if(r.result.code == 'resHeight') {
												var h = Number(r.result.text);

												if(!isNaN(h)) setHeight = h;

												break;
											}
										}
										break;
									}
								}
							}
						} catch(err) {
							console.log(err);
						}

						for(let i in result.entries) {
							let bmiWeight = result.entries[i].weight.value;
							let bmiValue = (Number(bmiWeight) / (Number(setHeight) * Number(setHeight) / 10000)).toFixed(1); // 체중/키*키 (kg/m2)
							result.entries[i].bmi = {}
							result.entries[i].bmi.value = Number(bmiValue);
							result.entries[i].bmi.unit = "kg/m2";

							addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
						}

						saveLiferecordProc("comp", API_MODEL.COMP, infoType, result);
					});
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL")){
							saveVal = "steps";
							getHealthRecordAgain();
						} else {
							if(typeof callBackNm == "function") callBackNm();
						}
					}
				}
			} else if(infoType == "steps") { // 걷기
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
					let lastTime;

					if(IS_OLD_STEPS_API) {
						lastTime = timeData[sep + "_" + infoType + "_old"]; // 구 API 사용 시
					} else {
						lastTime = timeData[sep + "_" + infoType]; // 기존 API 사용 시
					}

					for(var i in result.entries) {
						var stepKcal = 0;
						stepKcal = result.entries[i].steps * 0.04; //걸음수 칼로리 공식 = 걸음수*0.04
						result.entries[i].calories.value = stepKcal;

						addResultData(infoType, lastTime, result.entries[i]);
					}

					saveLiferecordProc("activity", API_MODEL.ACTIVITY, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL") || syncType == "EX"){
							saveVal = "running";
							getHealthRecordAgain();
						} else {
							if(typeof callBackNm == "function") callBackNm();
						}
					}
				}
			} else if(infoType == "running") { // 달리기
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
					for(var i in result.entries) {
						try {
							var runningKcal = 0, diffMin = 0;
							diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
							runningKcal = [12.9 * (0.0035 * weight * diffMin)] * 5;
							result.entries[i].calories.value = runningKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5

							addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
						} catch(e) {
							console.log(e);
							continue;
						}
					}

					saveLiferecordProc("run", API_MODEL.RUN, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL") || syncType == "EX"){
							saveVal = "cycling";
							getHealthRecordAgain();
						} else {
							if(typeof callBackNm == "function") callBackNm();
						}
					}
				}
			} else if(infoType == "cycling") { // 자전거
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
					for(var i in result.entries) {
						var cyclingKcal = 0, diffMin = 0;
						diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
						cyclingKcal = [7.1 * (0.0035 * weight * diffMin)] * 5;
						result.entries[i].calories.value = cyclingKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5

						addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
					}

					saveLiferecordProc("bike", API_MODEL.BIKE, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL") || syncType == "EX"){
							saveVal = "hiking";
							getHealthRecordAgain();
						} else {
							if(typeof callBackNm == "function") callBackNm();
						}
					}
				}
			} else if(infoType == "hiking") { // 하이킹
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
					for(var i in result.entries) {
						var hikingKcal = 0, diffMin = 0;
						diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
						hikingKcal = [11.6 * (0.0035 * weight * diffMin)] * 5;
						result.entries[i].calories.value = hikingKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5

						addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
					}

					saveLiferecordProc("hiking", API_MODEL.HIKING, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL")){
							saveVal = "glucose";
							getHealthRecordAgain();
						} else {
							afterFinished();
						}
					}
				}
			} else if(infoType == "glucose") { // 혈당
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
					for(var i in result.entries) {
						if(clickPlatform == "SAMSUNG_HEALTH") { // 삼성헬스 혈당 when - 공복:80001, 평상시:80012, 취침전:80013, 식후:80002, 식전:80011
							if(result.entries[i].timing.when == "80001") {
								result.entries[i].timing.when = "AC"; // 공복
							} else if(result.entries[i].timing.when == "80012") {
								result.entries[i].timing.when = "HS"; // 평상시는 선택안함으로 해서 직접 입력하도록 함
							} else if(result.entries[i].timing.when == "80013") {
								result.entries[i].timing.when = "HS"; // 취침전은 선택안함으로 해서 직접 입력하도록 함
							} else if(result.entries[i].timing.when == "80002") {
								result.entries[i].timing.when = "PCM"; // 식후
							} else if(result.entries[i].timing.when == "80011") {
								result.entries[i].timing.when = "ACM"; // 식전
							}
						}

						addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
					}

					saveLiferecordProc("glucose", API_MODEL.GLUCOSE, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL")){
							saveVal = "blood_pressure";
							getHealthRecordAgain();
						} else {
							if(typeof callBackNm == "function") callBackNm();
						}
					}
				}
			} else if(infoType == "blood_pressure") { // 혈압
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) { // 수축기, 이완기, 맥박 데이터가 말도안되는 값이면 라이프쪽에 저장되지않음.
					for(var i in result.entries) {
						if(result.entries[i].pulseRate.value < 30) {
							result.entries[i].pulseRate.value = 30;
						}

						addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
					}

					saveLiferecordProc("blood", API_MODEL.BLOODPRESSURE, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL")){
							saveVal = "heart_rate";
							getHealthRecordAgain();
						} else {
							if(typeof callBackNm == "function") callBackNm();
						}
					}
				}
			} else if(infoType == "heart_rate") { // 심박수
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
					// 심박수 안정시(1), 평상시(0)
					// 안정시 거르고 평상시만 넣음
					for(var i in result.entries) {
						if(result.entries[i].kind == 1) {
							result.entries.splice(i, 1);
						}

						addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
					}

					saveLiferecordProc("pulse", API_MODEL.PULSE, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						if(syncType.startsWith("ALL")){
							saveVal = "sleep";
							getHealthRecordAgain();
						} else {
							if(typeof callBackNm == "function") callBackNm();
						}
					}
				}
			} else if(infoType == "sleep") { // 수면 (sleep)
				if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
					// 수면 등록 시 만족감(safety)은 3점으로 등록
					for(var i in result.entries) {
						if(result.entries[i].safety == 0) {
							result.entries[i].safety = 3;
						}

						addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
					}

					saveLiferecordProc("sleep", API_MODEL.SLEEP, infoType, result);
				} else {
					if(newSync) {
						pushDatetime(infoType);
						afterFinished();
					} else {
						afterFinished();
					}
				}
			} else if(infoType == "golf") { // 골프
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var golfKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								golfKcal = [4 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = golfKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "stairs") { // 계단
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var stairsKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								stairsKcal = [6 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = stairsKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "strengthtraining") { // 근력운동
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var strengthtrainingKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								strengthtrainingKcal = [2.5 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = strengthtrainingKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "basketball") { // 농구
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var basketballKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								basketballKcal = [8 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = basketballKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "climbing") { // 등산
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var climbingKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								climbingKcal = [11.6 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = climbingKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "badminton") { // 배드민턴
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var badmintonKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								badmintonKcal = [4 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = badmintonKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "bowling") { // 볼링
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var bowlingKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								bowlingKcal = [2.5 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = bowlingKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "swimming") { // 수영
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var swimmingKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								swimmingKcal = [8.9 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = swimmingKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "baseball") { // 야구
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var baseballKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								baseballKcal = [4 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = baseballKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "aerobic") { // 에어로빅
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var aerobicKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								aerobicKcal = [6 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = aerobicKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "yoga") { // 요가
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var yogaKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								yogaKcal = [3.2 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = yogaKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "jumprope") { // 줄넘기
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var jumpropeKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								jumpropeKcal = [11.4 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = jumpropeKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "soccer") { // 축구
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var soccerKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								soccerKcal = [7 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = soccerKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "tabletennis") { // 탁구
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var tabletennisKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								tabletennisKcal = [6 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = tabletennisKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "tennis") { // 테니스
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var tennisKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								tennisKcal = [7 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = tennisKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "boxing") { // 복싱
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var boxingKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								boxingKcal = [7.8 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = boxingKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "squash") { // 스쿼시
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var squashKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								squashKcal = [12 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = squashKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "pilates") { // 필라테스
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var pilatesKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								pilatesKcal = [3 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = pilatesKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}
						console.log(result);

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else if(infoType == "treadmill") { // 런닝머신
				if(newSync) {
					if(result instanceof Object && typeof result.entries != "undefined" && result.entries.length != 0) {
						for(let i in result.entries) {
							try {
								var treadmillKcal = 0, diffMin = 0;
								diffMin = moment(result.entries[i].period.to).diff(moment(result.entries[i].period.from), 'minutes');
								treadmillKcal = [9 * (0.0035 * userData.weight * diffMin)] * 5;
								result.entries[i].calories.value = treadmillKcal; // 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
								console.log(result);

								addResultData(infoType, timeData[sep + "_" + infoType], result.entries[i]);
							} catch(e) {
								console.log(e);
								continue;
							}
						}

						saveMotionRecord(infoType, result);
					} else {
						pushDatetime(infoType);
						afterFinished();
					}
				} else {
					afterFinished();
				}
			} else {
				afterFinished();
			}
		} else { // 오류
			errorHandler(result);
			afterFinished();
		}
	} else {
		afterFinished();
	}

	// 에러 뒤처리
	function errorHandler(result) {
		if(newSync) {
			if(result instanceof Object && typeof result.type != "undefined") {
				addExRes.set(result.type, false);
				allExSuccess = false;
			} else {
				unknownEx++;
				allExSuccess = false;
			}
		}
	}

	// 저장된 데이터 기억
	function addResultData(infoType, tempDt, entry) {
		if(typeof tempDt == "undefined") tempDt = "";
		console.log("addResultData > entry: ", entry);
		const entryDate = typeof entry.date != "undefined" ? entry.date : (entry.period instanceof Object ? entry.period.to : "");

		if((tempDt != "" && (!moment(entryDate + " +0900", "YYYY-MM-DD HH:mm:ss ZZ").isBefore(moment(tempDt, "YYYY-MM-DD HH:mm:ss ZZ")) // 삼성 헬스
				|| !moment(entryDate, "YYYY-MM-DDTHH:mm:ssZZ").isBefore(moment(tempDt, "YYYY-MM-DD HH:mm:ss ZZ")) // 애플 건강
			)) || tempDt == "" || entryDate == "") {
			// tempDt가 있을 경우(조회 시작 시간 지정이 돼 있을 경우) 그 시간 이후의 데이터만 체크
			// tempDt가 없을 경우 구 API(구글 피트니스 등)를 탔으므로 모든 데이터를 체크

			if(psSaveVal == infoType) { // 플랫폼 연동 페이지 전용
				psSavedNewData0.push(entry);
			}

			if(syncType == "") { // 특정 데이터만 조회할 경우 savedNewData0에 데이터 담음
				savedNewData0.push(entry);
			}

			savedPlatformSyncData++;
		}
	}

	// 개별 항목 조회 완료 후 처리
	async function afterFinished() {
		if(newSync) { // 신규 API
			if(addExRes.size + unknownEx >= healthRecordTypes && !IS_PLATFORM_SYNC_FINISHED) { // 조회한 항목 수가 전체 항목 수 && 아직 연동 완료 처리 안 됨
				IS_PLATFORM_SYNC_FINISHED = true; // 완료 처리

				await saveLifercordAll(); // 서버 전송

				if(typeof callBackNm == "function") {
					callBackNm(); // 미리 지정한 추가 콜백 함수 실행
				}
			}
		} else { // 구 API
			if(typeof callBackNm == "function") {
				callBackNm(); // 미리 지정한 추가 콜백 함수 실행
			}
		}
	}

	// 이번에 조회 끝 시간 = 다음 번에 조회할 시작 시간 기억
	function pushDatetime(key) {
		if(key == "steps" && IS_OLD_STEPS_API) {
			// 걸음 수이고 구 API 사용 강제 시 key 값 뒤에 _old 추가
			key += "_old";
		}

		if(typeof allExData.healthPlatform == "undefined") {
			allExData.healthPlatform = [];
		}

		const sep = getPlatformSep() + "_" + key;
		const dt = mEndDatePS.format("YYYY-MM-DD HH:mm:ss");

		let healthPlatform = {
			sep: sep, // 식별자 및 항목명
			userNo: MData.storage("USER_NO"),
			datetime: dt, // 시간
		}

		allExData.healthPlatform.push(healthPlatform);
		MData.storage(sep, dt + " +0900");
	}

	// 서버에 저장할 항목 기억(기존 건강+운동)
	function saveLiferecordProc(type, oldType, key, result) {
		if(newSync) { // 신규 API
			if(typeof allExData[type] == "undefined") {
				allExData[type] = [];
			}

			pushDatetime(key); // 시간 저장

			allExData[type].push(result);
			afterFinished();
		} else { // 구 API
			saveLiferecordData2(oldType, result);
			saveDataCb();
		}
	}

	// 서버에 저장할 항목 기억(추가 운동 - 신규 API 실행 시에만 사용)
	function saveMotionRecord(key, result) {
		if(typeof allExData.motionRecord == "undefined") {
			allExData.motionRecord = [];
		}

		pushDatetime(key); // 시간 기억

		allExData.motionRecord.push(result);
		afterFinished();
	}

	// 서버에 저장
	function saveLifercordAll() {
		return new Promise((resolve, reject) => {
			const data = {
				userNo: MData.storage("USER_NO"),
				recordKey: MData.storage("RECORD_KEY"),
				data: allExData,
			};

			MNet.httpSend({
				path : "/cmm/asyncRecord",
				data : data,
				noErrMsg: true,
				indicator: false,
				callback : function(rd) {
					console.log(rd);

					if(rd.rtnCd != "0000") {
						savedPlatformSyncData = 0; // 저장 실패 시 저장 값 초기화
						savedNewData0 = [];
						savedNewData1 = [];
					}

					allExData = {};
					if(shouldWaitServerPS) { // 서버 응답을 기다려야 할 경우
						resolve();
					}
				},
			});

			if(!shouldWaitServerPS) { // 서버 응답을 기다리지 않을 경우
				resolve();
			}
		});
	}
}

// 구 API 한 항목 조회 후 다음 항목 순차 조회
var saveDataCb = function() {
	console.log(">>>>saveDataCb:", saveVal);

	let newSync = newSyncYn(clickPlatform);

	// 순서대로 호출
	if(saveVal == "weight") { // 체중
		if(syncType.startsWith("ALL")){
			saveVal = "steps";
			getHealthRecordAgain();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else if(saveVal == "steps") { // 걷기
		if(!newSync && (syncType.startsWith("ALL") || syncType == "EX")){
			saveVal = "running";
			getHealthRecordAgain();
		} else if(newSync) {
			pushDatetime("steps");
			afterFinished();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else if(saveVal == "running") { // 달리기
		if(syncType.startsWith("ALL") || syncType == "EX"){
			saveVal = "cycling";
			getHealthRecordAgain();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else if(saveVal == "cycling") { // 자전거
		if(syncType.startsWith("ALL") || syncType == "EX"){
			saveVal = "hiking";
			getHealthRecordAgain();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else if(saveVal == "hiking") { // 하이킹
		if(syncType.startsWith("ALL")){
			saveVal = "glucose";
			getHealthRecordAgain();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else if(saveVal == "glucose") { // 혈당
		if(syncType.startsWith("ALL")){
			saveVal = "blood_pressure";
			getHealthRecordAgain();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else if(saveVal == "blood_pressure") { // 혈압
		if(syncType.startsWith("ALL")){
			saveVal = "heart_rate";
			getHealthRecordAgain();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else if(saveVal == "heart_rate") { // 심박수
		if(syncType.startsWith("ALL")){
			saveVal = "sleep";
			getHealthRecordAgain();
		} else {
			if(typeof callBackNm == "function") callBackNm();
		}
	} else { // 수면 (sleep)
		if(typeof callBackNm == "function") callBackNm();
	}
}

// 사전에 블루투스 권한 체크해야 하는지 여부 확인(안드로이드 SDK 31 적용 관련) - 2022년 하반기 추가
var shouldCheckBleAuth = function() {
	let shouldCheck = false;

	if(M.navigator.device("android")) { // 안드로이드 일 경우
		shouldCheck = true;
	} else { // iOS일 때는 권한 체크 안 함
		shouldCheck = false;
	}

	return shouldCheck;
}

var chkBlePermission = function() {
    M.execute("exWNCheckPermissionAndS", "chkBlePermissionCb");
}

var chkBlePermissionCbSuccess = null;
var chkBlePermissionCbFailed = null;

var chkBlePermissionCb = function(result) {
    console.log(result);
    const code = result.code;

    if(typeof code !== 'undefined' && code === 'success') {
        if(typeof chkBlePermissionCbSuccess == "function") {
			chkBlePermissionCbSuccess();
		}
    } else {
		if(typeof chkBlePermissionCbFailed == "function") {
			chkBlePermissionCbFailed();
		}
	}
}

// 혈당계 반복 검색 후 해당 기기가 발견되면 연동하기
var chkdupBS = false; // 중복 실행 체크
var connectBloodGlucoseBleCbWithNewData = null; // 연동해서 가져온 데이터가 있을 경우 최종적으로 실행할 콜백 함수 등록용 변수
var connectBloodGlucoseBleCbWithoutNewData = null; // 연동해서 가져온 데이터가 없을 경우 최종적으로 실행할 콜백 함수 등록용 변수

var setTimeoutChkdupBS = function(){
	chkdupBS = true;
	setTimeout(function(){
		chkdupBS = false;
	}, 30000);
}

var checkAndConnectBloodGlucoseBle = function(isCheck) { // isCheck: 시퀀스와 UUID(또는 MAC어드레스)를 DB에서 받아 올지 여부를 지정(true/false)
	if(chkdupBS) return;

	let shouldCheck = shouldCheckBleAuth();
	let currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	let isBSPage = currentPage == "MPD/NMPD_7_3T"; // 혈당

    if(shouldCheck) {
        chkBlePermissionCbSuccess = function(){
            checkAndConnectBloodGlucoseBle2(isCheck);
        };

        chkBlePermissionCbFailed = function() { // 현재 연동 상태가 아니면 30초 후 재실행
			setTimeoutChkdupBS();
			setTimeout(function(){
				if(isBSPage) checkAndConnectBloodGlucoseBle(isCheck);
			}, 30000);
        };

        chkBlePermission();
    } else {
        checkAndConnectBloodGlucoseBle2(isCheck);
    }
}

var checkAndConnectBloodGlucoseBle2 = function(isCheck) {
	let cb = "checkAndConnectBloodGlucoseBleCb0";

	if(isCheck) cb += "_check";
	else cb += "_noCheck";

	M.execute("exWNGlucoseChk", cb);
}

var checkAndConnectBloodGlucoseBleCb0_check = function(result) {
	checkAndConnectBloodGlucoseBleCb0(result, true);
}

var checkAndConnectBloodGlucoseBleCb0_noCheck = function(result) {
	checkAndConnectBloodGlucoseBleCb0(result, false);
}

var checkAndConnectBloodGlucoseBleCb0 = function(result, shouldCheck) {
	console.log(result);
	let code = result.code;
	let currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	let isBSPage = currentPage == "MPD/NMPD_7_3T"; // 혈당

	if(typeof code === "string" && code === "success") { // 현재 연동 상태
		setTimeout(async function() {
			if(shouldCheck) await checkBloodGlucoseSeq();
			M.execute("exWNGlucoseWait", MData.storage("CareSensSerNo").toString(), MData.storage("CareSensSeq").toString(), "checkAndConnectBloodGlucoseBleCb1");
		}, 500);
	} else { // 현재 연동 상태가 아니면 30초 후 재실행
		setTimeout(function(){
			if(isBSPage) checkAndConnectBloodGlucoseBle(false);
		}, 30000);
	}
}

var checkAndConnectBloodGlucoseBleCb1 = async function(result) {
	console.log(result);
	let currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	let isBSPage = currentPage == "MPD/NMPD_7_3T"; // 혈당

	if(result.code != "success" && result.code != "connectFail") {
		setTimeout(function() {
            if(isBSPage) checkAndConnectBloodGlucoseBle(false);
        }, 500);
	} else if(result.code == "connectFail") {
		/*Popup.confirm({
            message: "기기를 찾았지만 연동에 실패했습니다.<br />재시도할까요?",
            button: ['확인', '취소'],
        }, function(index) {
            if(index == 0) {*/
			setTimeout(function() {
				if(isBSPage) checkAndConnectBloodGlucoseBle(false);
			}, 500);
		/*}
	});*/
	} else {
		let newData = {entries:[]};

		if(typeof result.data != "undefined" && typeof result.data.entries != "undefined") {
			newData = JSON.parse(JSON.stringify(result.data));
			newData.entries = [];

            let dtFmt = "YYYY-MM-DD";
			let mCurDt = moment(moment().format(dtFmt), dtFmt);

			result.data.entries.forEach(function(item, i){
				const iDate = item.date.split(" ")[0];
				const mDate = moment(iDate, dtFmt);

				if(!mDate.isAfter(mCurDt)) {
					newData.entries.push(item);
				}
            });
        }

		if(typeof result.data != "undefined" && typeof result.data.entries != "undefined" && newData.entries.length != 0) {
            MData.storage("USE_PLATFORM_Omron_DATE", moment().format('YYYY.MM.DD'));

			if(isBSPage) $(".loading-wrap").show();

			saveLiferecordData(API_MODEL.GLUCOSE, newData, async function() {
				if(typeof result.seq != 'undefined' && typeof result.deviceInfo != 'undefined') {
					MData.storage("CareSensSeq", result.seq.toString());
					MData.storage("CareSensSerNo", result.deviceInfo.toString());

					await saveBloodGlucoseSeq();
				}

				savedNewData1 = newData.entries;

                $('.loading-wrap').hide();
                if(isBSPage) Popup.toast(newData.entries.length + "개 기록이 저장되었습니다.");

				setTimeout(function() {
					if(typeof connectBloodGlucoseBleCbWithNewData == 'function') connectBloodGlucoseBleCbWithNewData();

					setTimeout(function() {
						if(isBSPage) checkAndConnectBloodGlucoseBle(false);
					}, 3000);
				}, 1000);
            }, false, function(){
				$(".loading-wrap").hide();
			});
        } else {
            $('.loading-wrap').hide();
//            Popup.toast(ble + "에 데이터가 없습니다. 측정 후 재시도해 주십시오.");

            if(typeof connectBloodGlucoseBleCbWithoutNewData == 'function') connectBloodGlucoseBleCbWithoutNewData();

            setTimeout(function() {
                if(isBSPage) checkAndConnectBloodGlucoseBle(false);
            }, 3000);
        }
	}
}

// 혈압계 반복 검색 후 해당 기기가 발견되면 연동하기
var chkdupBP = false; // 중복 실행 방지
var connectBloodPressureBleCbWithNewData = null; // 연동해서 가져온 데이터가 있을 경우 최종적으로 실행할 콜백 함수 등록용 변수
var connectBloodPressureBleCbWithoutNewData = null; // 연동해서 가져온 데이터가 없을 경우 최종적으로 실행할 콜백 함수 등록용 변수

var setTimeoutChkdupBP = function(){
	chkdupBP = true;
	setTimeout(function(){
		chkdupBP = false;
	}, 30000);
}

var checkAndConnectBloodPressureBle = function() {
	if(chkdupBP) return;

	let shouldCheck = shouldCheckBleAuth();
	let currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	let isBPPage = currentPage == "MPD/NMPD_7_12T";

    if(shouldCheck) {
        chkBlePermissionCbSuccess = function(){
            checkAndConnectBloodPressureBle2();
        };

        chkBlePermissionCbFailed = function(){ // 현재 연동 상태가 아니면 30초 후 재실행
			setTimeoutChkdupBP();
			setTimeout(function(){
				if(isBPPage) checkAndConnectBloodPressureBle();
			}, 30000);
		};

        chkBlePermission();
    } else {
        checkAndConnectBloodPressureBle2();
    }
}

var checkAndConnectBloodPressureBle2 = function() {
	// M.execute("exWNStopBloodPressure");
	M.execute("exWNChkBloodPressure", "checkAndConnectBloodPressureBleCb0");
}

var checkAndConnectBloodPressureBleCb0 = function(result) {
	console.log(result);
	let code = result.code;
	let currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	let isBPPage = currentPage == "MPD/NMPD_7_12T";


	if(typeof code === "string" && code === "success") { // 현재 연동 상태
		setTimeout(function() {
			M.execute("exWNWaitBloodPressure", "checkAndConnectBloodPressureBleCb1");
		}, 500);
	} else { // 현재 연동 상태가 아니면 30초 후 재실행
		setTimeout(function(){
			if(isBPPage) checkAndConnectBloodPressureBle();
		}, 30000);
	}
}

var checkAndConnectBloodPressureBleCb1 = function(result) {
	console.log(result);
	let currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	let isBPPage = currentPage == "MPD/NMPD_7_12T";

	if(result.code != "success" && result.code != "connectFail") {
		setTimeout(function() {
            if(isBPPage) checkAndConnectBloodPressureBle();
        }, 500);
	} else if(result.code == "connectFail") {
		/*Popup.confirm({
            message: "기기를 찾았지만 연동에 실패했습니다.<br />재시도할까요?",
            button: ['확인', '취소'],
        }, function(index) {
            if(index == 0) {*/
			setTimeout(function() {
				if(isBPPage) checkAndConnectBloodPressureBle();
			}, 500);
		/*}
	});*/
	} else {
		if(typeof result.data != "undefined" && typeof result.data.entries != "undefined" && result.data.entries.length != 0) {
            MData.storage("USE_PLATFORM_Omron_DATE", moment().format('YYYY.MM.DD'));

			if(isBPPage) $(".loading-wrap").show();

			// 수축기, 이완기, 맥박 데이터가 말도안되는 값이면 라이프쪽에 저장되지않음.
            for(var i in result.data.entries) {
                if(result.data.entries[i].pulseRate.value < 30) {
                    result.data.entries[i].pulseRate.value = 30;
                }
            }

            saveLiferecordData(API_MODEL.BLOODPRESSURE, result.data, function() {
                $('.loading-wrap').hide();

				savedNewData1 = result.data.entries;

                if(isBPPage) Popup.toast(result.data.entries.length + "개 기록이 저장되었습니다.");

				setTimeout(function() {
					if(typeof connectBloodPressureBleCbWithNewData == 'function') connectBloodPressureBleCbWithNewData();

					setTimeout(function() {
						if(isBPPage) checkAndConnectBloodPressureBle();
					}, 3000);
				}, 1000);
            }, false, function(){
				$('.loading-wrap').hide();
			});
        } else {
            $('.loading-wrap').hide();
//            Popup.toast(ble + "에 데이터가 없습니다. 측정 후 재시도해 주십시오.");

            if(typeof connectBloodPressureBleCbWithoutNewData == 'function') connectBloodPressureBleCbWithoutNewData();

            setTimeout(function() {
                if(isBPPage) checkAndConnectBloodPressureBle();
            }, 3000);
        }
	}
}

var getStorageName = function(num) {
    var storageName = "";

    if(num == "1") { // 혈압기
        storageName = "Omron";
    } else if(num == "2") { // 혈당기
        storageName = "CareSens";
    }

    return storageName;
}

var checkBloodGlucoseSeq = function() {
    return new Promise((resolve, reject) => {
		MNet.httpSend({
			path : '/cmm/selectHealthPlatform',
			data: {
				sep: "BS",
				userNo: MData.storage('USER_NO'),
			},
			indicator: false,
			noErrMsg: true,
			callback :function(rd){
				console.log(rd);

				if (rd.rtnCd == '0000') {
					MData.storage("CareSensSeq", rd.GLUCOSE_SEQUENCE);
					MData.storage("CareSensSerNo", rd.UUID);

					resolve();
				} else {
					resolve();
				}
			}
		});
    });
}

var saveBloodGlucoseSeq = function() {
    return new Promise((resolve, reject) => {
        MNet.httpSend({
            path : '/cmm/saveHealthPlatform',
            data: {
				sep: "BS",
                userNo: MData.storage('USER_NO'),
                sequence: MData.storage("CareSensSeq"),
                uuid: MData.storage("CareSensSerNo"),
            },
            indicator: false,
            noErrMsg: true,
            callback :function(rd){
                if (rd.rtnCd == '0000') {
                    resolve();
                } else {
                    resolve();
                }
            }
        });
    });
}

var stopAllScanWait = function() {
	// 최신 버전이고 혈압 or 혈당/마이헬스인지 체크
	const currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	const isBPPage = currentPage == "MPD/NMPD_7_12T";
	const isBSPage = currentPage == "MPD/NMPD_7_3T";
	const isRenewed2023 = isRenewedDeviceConnect(); // 2023년에 수정된 연동 절차를 따를지 여부(true/false)

	if(isBPPage && !isRenewed2023) {
		setTimeout(function(){
			M.execute("exWNStopBloodPressure");
		}, 500);
	} else if(isBSPage && !isRenewed2023) {
		setTimeout(function(){
			M.execute("exWNGlucoseStop");
		}, 500);
	}
}

var resumeScanWait = function() {
	// 최신 버전이고 혈압 or 혈당/마이헬스인지 체크
	const currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));
	const isBPPage = currentPage == "MPD/NMPD_7_12T";
	const isBSPage = currentPage == "MPD/NMPD_7_3T";
	const isRenewed2023 = isRenewedDeviceConnect(); // 2023년에 수정된 연동 절차를 따를지 여부(true/false)

	if(isBPPage && !isRenewed2023) {
		setTimeout(function(){
			checkAndConnectBloodPressureBle();
		}, 500);
	} else if(isBSPage && !isRenewed2023) {
		setTimeout(function(){
			checkAndConnectBloodGlucoseBle();
		}, 500);
	}
}

/****************************************************************************
 * 12. 일반 메세지 API
 * *************************************************************************/

var generalMsg = function(cb, category, period, time, step) {
	MNet.httpSend({
		path : '/cmm/selectGeneralMsgInfo',
		data: {
			categoryCd : category,
			periodCd : period,
			timeCd : time,
			stepCd : step
		},
		indicator: false,
		callback :function(receivedData){
			if (receivedData.rtnCd == '0000') {
				cb(receivedData.generalMsgInfo);
			}
		}
	});
}
/****************************************************************************
 * 14. 타임라인 실시간 미확인 조회 API
 * *************************************************************************/

var selectTimelineCnt = function() {
    MNet.httpSend({
        path: "/cmm/selectTimeReadNotCnt",
        indicator: false,
        data: {
            userNo : MData.storage("USER_NO")
        },
        callback: function (receivedData) {
        	var timebadge = "";
            if(receivedData.timeReadNotCnt.CNT != 0) {
            	timebadge += '<em class="badge">' + receivedData.timeReadNotCnt.CNT + '</em>타임라인보기';
            	$(".btn-head.timeline").html(timebadge);
            } else {
            	$(".btn-head.timeline").empty();
            }
        }
    });
}

/****************************************************************************
 * 15. 앱 호출(intent) 관련      												*
 * *************************************************************************/

var _onOpenByOcareSchmeFlag = false;
var onOpenByOcareSchme = async function(urlString) {

     console.info("### _onOpenByOcareSchmeFlag: " + _onOpenByOcareSchmeFlag);
    // 2023-06-07_KJG - android 앱 실행상태에서 indent 호출 시, onResume -> onPause -> onResume 처리되는 이슈로 인해 function 이중 호출중.. 임시로 이중 호출 방지
    if (_onOpenByOcareSchmeFlag) {
         console.error("$$$ _onOpenByOcareSchmeFlag: " + _onOpenByOcareSchmeFlag);
        return;
    }
    _onOpenByOcareSchmeFlag = true;
    setTimeout(() => {_onOpenByOcareSchmeFlag = false;}, 500);

    var currPg = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf("."));

    if(MData.storage('USER_NO') == '') { // 회원 정보가 기록돼 있지 않으면 가입/재가입을 해야 하므로 호출을 무효화
        MData.global('ON_OPEN_BY_OCARE_SCHEME', '');
        return;
    } else if(currPg == 'MME/NMME_1_7V' || currPg == 'MME/NMME_1_11V' || currPg == 'MME/NMME_1_13P'
        || currPg == 'MME/NMME_2_1V' || currPg == 'MME/NMME_2_3V' || currPg == 'MME/NMME_2_4V') { // 로그인 화면일 경우, 호출 보류
        return;
    } else if(currPg == 'MCM/NMCM_14_1V' || currPg == 'MCM/NMCM_14_1V') { // 결제 관련 화면이면 호출 무효화
        MData.global('ON_OPEN_BY_OCARE_SCHEME', '');
        return;
    }

    console.log('onOpenByOcareSchme > urlString: ', urlString);

    var paramAndValues;

	try {
		var params = urlString.split('?')[1];
		if(params.indexOf("&") != -1) {
			paramAndValues = params.split("&");
		} else {
			paramAndValues = [params];
		}
	} catch(e) {
		return; // 에러나면 페이지 이동 처리가 필요 없으므로 함수 종료
	}

    var uid = '';
    var indentParam = {};
    for(var i in paramAndValues) {
        var paramOrValue = [];

		if(paramAndValues[i].indexOf("=") != -1) {
			paramOrValue = paramAndValues[i].split('=');
		} else {
			paramOrValue.push(paramAndValues[i]);
			paramOrValue.push("");
		}

        if(paramOrValue[0] == 'uid') {
            uid = paramOrValue[1];
        }
        try {
            indentParam[decodeURI(paramOrValue[0])] = decodeURI(paramOrValue[1]);
        } catch(e) {
            console.error("indentParam put error: " + e);
        }
    }

    console.log('onOpenByOcareSchme > uid: ', uid);

    // uid 값이 있으면 해당 페이지로 이동
    if(uid != '') {
        var param = {calledByScheme: 'Y', "indentParam" : indentParam};

        uid = decodeURI(uid);//.replace(/\%7C/g, '|'); // 퍼센트 인코딩 %7C을 |로 치환

        console.log('onOpenByOcareSchme > uid: ', uid);

        // 실제 페이지명|탭 번호|delCd|trackId|주소1|주소2
        var uidSubParams;

		if(uid.indexOf("|") != -1) {
			uidSubParams = uid.split('|'); // |을 경계로 나눔
		} else {
			uidSubParams = [uid];
		}

		if(uidSubParams[0] == 'OCAREMALL') { // 오케어몰 웹뷰 호출
			providerWorking.check(Definition.PROVIDER_MALL_ID).then(async () => {
				await getInKeyByProvId(Definition.PROVIDER_MALL_ID, true);
				let ocareMallInKey = MData.storage("OcareMallInKey");
				const url = Definition.PROVIDER_OCAREMALL_URL;

				let bytes = `inKey=${encodeURIComponent(ocareMallInKey)}`;

				if(typeof uidSubParams[1] !== "undefined") {
					bytes += `&redirectUrl=${encodeURIComponent(uidSubParams[1])}`;
				}

				M.execute("exWNPostWebViewBrowser", "오케어몰", url, "Y", "ocareMallCalledByPushOrIntent", bytes);

				MData.removeGlobal('ON_OPEN_BY_OCARE_SCHEME');
			});
			return; // 페이지 이동은 없음
		} else if(uidSubParams[0] == 'NMPD_9_16T') { // 휴노 메인
			if(uidSubParams.length > 1 && uidSubParams[1] != '') {
                param.tab = uidSubParams[1];
            }
        } else if(uidSubParams[0] == 'NMPD_9_128V') { // 휴노 상담 예약
            if(uidSubParams.length > 1 && uidSubParams[1] != '') {
                param.type = uidSubParams[1];
            }

            if(uidSubParams.length > 2 && uidSubParams[2] != '') {
                param.pymtId = uidSubParams[2];
            }

            if(uidSubParams.length > 3 && uidSubParams[3] != '') {
                param.prodId = uidSubParams[3];
            }

            if(uidSubParams.length > 4 && uidSubParams[4] != '') {
                param.week = uidSubParams[4];
            }

            if(uidSubParams.length > 5 && uidSubParams[5] != '') {
                param.programWeekStartDate = uidSubParams[5];
            }

            if(uidSubParams.length > 6 && uidSubParams[6] != '') {
                param.programSelectedDate = uidSubParams[6];
            }

            if(uidSubParams.length > 7 && uidSubParams[7] != '') {
                param.startTm = uidSubParams[7];
            }

            if(uidSubParams.length > 8 && uidSubParams[8] != '') {
                param.endTm = uidSubParams[8];
            }
		} else if(uidSubParams[0] == "NMCM_14_10P") { // 배송 조회
			if(uidSubParams.length > 1 && uidSubParams[1] != '') {
				param.pymtId = uidSubParams[1];
			}

			if(uidSubParams.length > 2 && uidSubParams[2] != '') {
				param.delCd = uidSubParams[2];
			}

			if(uidSubParams.length > 3 && uidSubParams[3] != '') {
				param.trackId = uidSubParams[3];
			}

			if(uidSubParams.length > 4 && uidSubParams[4] != '') {
				param.reqUserNo = uidSubParams[4];
			}

			if(uidSubParams.length > 5 && uidSubParams[5] != '') {
				param.reqCompCd = uidSubParams[5];
			}
		} else if(uidSubParams[0] == "NMCM_22_2V") { // 공지사항 페이지를 열기 위한 용도
			if(uidSubParams.length > 1 && uidSubParams[1] != '') { // NMCM_22_2V 공지사항 페이지를 열기 위한 용도
				param.ntcNo = uidSubParams[1].toString();
			}
		} else if(uidSubParams[0] == "NMPD_9_255T") { // 비컨 앱에서 호출
			var prdCodes = [];

			var temp = "";

			if(uidSubParams[1].indexOf("#") != -1) {
				temp = uidSubParams[1].split("#")[0];
			} else {
				temp = uidSubParams[1];
			}

			try {
				let tempObj = JSON.parse(decodeURIComponent(temp));
				prdCodes = tempObj.prd_code;
			} catch(e) {
				console.error(e);
			}

			if(currPg == "MPD/NMPD_9_255T") { // 현재 페이지가 비컨이면 비컨 페이지 내 함수 호출
				resultCon({
					data: {
						prd_code: prdCodes,
					},
				});

				MData.removeGlobal('ON_OPEN_BY_OCARE_SCHEME');
				return; // 페이지 이동은 없음
			} else { // 현재 페이지가 비컨 페이지가 아니면 비컨 페이지로 이동
				param.isCalledByBecon = 'Y';
				param.prdCodes = prdCodes;
			}
		} else if (uidSubParams[0] == "NMMC_2_14V") {
            MPage.html({
                url: '../MMC/NMMC_2_14V.html',
                param:{
                    indentParam : indentParam
                }
            });
            return;
		} else if (uidSubParams[0] == "NEVE_7_24P")  {
		    if(typeof indentParam.evtUrl == "undefined" || indentParam.evtUrl == "") {
		        MPage.html({
                    url: '../EVE/NEVE_7_24P.html'
                });
		    } else {
		        MPage.html({
                    url: '../EVE/NEVE_7_24P.html',
                    param:{
                        evtUrl : indentParam.evtUrl
                    }
                });
		    }
		    return;
		} else {
			if(uidSubParams.length > 1 && uidSubParams[1] != '') {
				var tabTemp = Number(uidSubParams[1]);

				if(isNaN(tabTemp)) tabTemp = uidSubParams[1];

				param.tab = tabTemp; // 탭 번호 추출
				param.tabNo = tabTemp; // 탭 번호 추출
				param.programSelectedDate = tabTemp; // 탭 번호 추출
			}

			if(uidSubParams.length > 2 && uidSubParams[2] != '') {
				param.delCd = uidSubParams[2];
			}

			if(uidSubParams.length > 3 && uidSubParams[3] != '') {
				param.trackId = uidSubParams[3];
			}

			if(uidSubParams.length > 4 && uidSubParams[4] != '') {
				param.address1 = uidSubParams[4];
			}

			if(uidSubParams.length > 5 && uidSubParams[5] != '') {
				param.address2 = uidSubParams[5];
			}
			//2023.05.17 KEK 기존 소스 매번 수정필요 없게 값설정 추가
			//기존 발송되었던 알림톡이 있어 기존 소스에서 추가하는 방식으로 작업
			// 기존값 형식 ex)NMCM_4_1V|param1|param2
			// 바뀐값 형식 NMCM_4_1V|tabNo|2 - 보내줄 키값도 같이 보내줌
			for(let i=1;i<uidSubParams.length;i++){
				param[uidSubParams[i]] = uidSubParams[i+1]
				i++;
			}
        }

        var folder = uidSubParams[0].split('_')[0].replace(/^N([A-Z]{3})/g, '$1'); // 해당 페이지가 속한 폴더 이름 추출
        var url = '../' + folder + '/' + uidSubParams[0] + '.html';

        MPage.html({
            url: url,
            param: param,
        })
    }

    MData.removeGlobal('ON_OPEN_BY_OCARE_SCHEME');
}

/****************************************************************************
 * 16. 건강검진 관련            												*
 * *************************************************************************/

var EX_mission0CbFunc = null; // 일반검진 1회성 미션 달성 메시지 '확인' 클릭 후 실행할 함수
var EX_anim0 = null; // 1회성 미션 애니메이션 처리
var EX_anim1 = null;

// 건강검진 메뉴 처리 관련 HTML 추가 및 이벤트 걸기
var EX_appendHtml = function() {
    $('body').append(`<div class="popup-wrap" id="EX_popupMenu0">
						<div class="popup-bg"></div>
						<div class="popup popup-btm ">
							<div class="popup-box">
								<div class="pop-head">
									<p class="title">KB국민인증서 또는 PASS인증으로  <br/>일반건강검진을 빠르게 조회하세요</p>
									<button type="button" class="btn-close popup-close EX_popupClose">팝업닫기</button>
								</div>
								<div class="pop-body health-check">
									<div class="btn-wrap">
										<button type="button" class="btn-txt EX_gen">일반검진기록 가져오기</button>
									</div>
									<div class="center mt25">
										<button type="button" class="btn-next EX_gc_read">GC녹십자 종합검진 조회</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="popup-wrap" id="EX_popupMission0">
						<div class="popup-bg"></div>
						<div class="popup popup-mid">
							<div class="popup-box mission">
								<div class="pop-body">
									<div class="ani-box" id="EX_lottie0">
									</div>
									<p><strong class="bold">미션 Complete!</strong></p>
									<p class="sub"></p>
								</div>
								<div class="pop-foot">
									<p class="btn-wrap">
										<button type="button" class="btn-txt" id="EX_popupMission0_ok">확인</button>
									</p>
								</div>
							</div>
						</div>
					</div>`);

    // 검진 방식 선택 메뉴 띄우기
    $(document).on("click", ".EX_showMenu", function () {
//        if(appId != prodId) {
            $('#EX_popupMenu0').fadeIn().addClass('show').removeClass('close');
//        } else {
//            MPage.html({ // 스크래핑
//                url: '../MDP/NMDP_1_3V.html',
//            });
//        }
    });

    $(document).on('click', '.EX_popupClose', function() {
        $(this).closest('.popup-wrap').fadeOut().addClass('close').removeClass('show');
    });

    // 일반검진
    $(document).on("click", ".EX_gen", function () {
        if($('#EX_popupMenu0').hasClass('show')) {
            $('#EX_popupMenu0').fadeOut().addClass('close').removeClass('show');
        }

        MPage.html({ // 스크래핑
            url: '../MDP/NMDP_1_3V.html',
        });
    });

     // 종합검진 예약
	$(document).on("click", ".EX_gc_reserve", function () {
        if($('#EX_popupMenu0').length > 0 && $('#EX_popupMenu0').hasClass('show')) {
            $('#EX_popupMenu0').fadeOut().addClass('close').removeClass('show');
        }
		const compCd = MData.storage("COMPANY_CD");
		let curDt = moment();
        const isAimmed = Definition.AIMMED_REG.test(compCd) && curDt.isAfter(moment("20230503 000000", "YYYYMMDD HHmmss"));
		if(isAimmed) Medin.goWebviewPage("M2A_0011");
		else EX_gcWebViewProc(1, 'before');
	});

     // 종합검진 조회
	$(document).on("click", ".EX_gc_read", function () {
        if($('#EX_popupMenu0').length > 0 && $('#EX_popupMenu0').hasClass('show')) {
            $('#EX_popupMenu0').fadeOut().addClass('close').removeClass('show');
        }
		const compCd = MData.storage("COMPANY_CD");
		if(false) Medin.goWebviewPage("");
		else EX_gcWebViewProc(2, 'before');
	});

    $('#EX_popupMission0_ok').click(function(){
		$('#EX_popupMission0').fadeOut().removeClass('show').addClass('close');

        if(typeof EX_mission0CbFunc == 'function') {
            EX_mission0CbFunc();
        }
    });
}

// GC 녹십자 웹뷰 닫은 뒤 실행할 콜백 함수
var EX_gcWebViewCb = function(result) {
    console.log('EX_gcWebViewCb > result :::', result);

    EX_gcWebViewProc(null, 'after');
}

// 일반검진 1회성 미션 처리용 함수
var EX_mission0Func = function() { // MData.param('scrap') == 'Y'일 때 실행할 것
    var EX_userNo = MData.storage('USER_NO');

	MNet.httpSend({
		path : "/main/saveIssuPoint",
		data : {
			userNo: EX_userNo,
			pointCd: "R4",
		},
		noErrMsg: true,
		callback: function (rd){
			console.log(rd);
			if(typeof rd.rtnCd != "undefined" && rd.rtnCd == "0000" && typeof rd.missionRtnCd == "undefined" && typeof rd.resultMap != "undefined" && typeof rd.resultMap.pntAmt != "undefined" && rd.resultMap.pntAmt != 0) {
				$(".loading-wrap").hide();

				/* 1회성 미션 애니메이션 */
				if(EX_anim0 == null) {
					var animationData = {"v":"5.9.6","fr":30,"ip":0,"op":90,"w":300,"h":300,"nm":"point-default","ddd":0,"assets":[],"fonts":{"list":[{"fName":"OpenSans-Bold","fFamily":"Open Sans","fStyle":"Bold","ascent":75.9994506835938}]},"layers":[{"ddd":0,"ind":1,"ty":5,"nm":"P ","parent":12,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0]},{"t":6,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[54.158,56.158,0],"ix":2,"l":2},"a":{"a":0,"k":[20,-21.2,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"t":{"d":{"k":[{"s":{"s":63,"f":"OpenSans-Bold","t":"P","ca":0,"j":0,"tr":0,"lh":75.6000061035156,"ls":0,"fc":[0.957,0.682,0]},"t":0}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":0,"op":90,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"모양 레이어 5","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[61,132,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,-7,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0.5,0],[0.5,-14.562]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":35,"s":[0]},{"t":43,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.716],"y":[-0.109]},"o":{"x":[0.542],"y":[0]},"t":40,"s":[0]},{"t":44,"s":[30]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rp","c":{"a":0,"k":4,"ix":1},"o":{"a":0,"k":0,"ix":2},"m":1,"ix":5,"tr":{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":90,"ix":4},"so":{"a":0,"k":100,"ix":5},"eo":{"a":0,"k":100,"ix":6},"nm":"변형"},"nm":"반복 1","mn":"ADBE Vector Filter - Repeater","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":35,"op":125,"st":35,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"모양 레이어 4","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[61,132,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,-7,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0.5,0],[0.5,-14.562]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":22,"s":[0]},{"t":30,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":27,"s":[0]},{"t":35,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rp","c":{"a":0,"k":4,"ix":1},"o":{"a":0,"k":0,"ix":2},"m":1,"ix":5,"tr":{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":90,"ix":4},"so":{"a":0,"k":100,"ix":5},"eo":{"a":0,"k":100,"ix":6},"nm":"변형"},"nm":"반복 1","mn":"ADBE Vector Filter - Repeater","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":22,"op":35,"st":22,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"모양 레이어 9","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[210.5,41.5,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,-7,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0.5,0],[0.5,-14.562]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":31,"s":[0]},{"t":39,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.716],"y":[0.445]},"o":{"x":[0.542],"y":[0]},"t":36,"s":[0]},{"t":40,"s":[60]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rp","c":{"a":0,"k":4,"ix":1},"o":{"a":0,"k":0,"ix":2},"m":1,"ix":5,"tr":{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":90,"ix":4},"so":{"a":0,"k":100,"ix":5},"eo":{"a":0,"k":100,"ix":6},"nm":"변형"},"nm":"반복 1","mn":"ADBE Vector Filter - Repeater","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":31,"op":121,"st":31,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"모양 레이어 8","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[210.5,41.5,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,-7,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0.5,0],[0.5,-14.562]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":18,"s":[0]},{"t":26,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":23,"s":[0]},{"t":31,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rp","c":{"a":0,"k":4,"ix":1},"o":{"a":0,"k":0,"ix":2},"m":1,"ix":5,"tr":{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":90,"ix":4},"so":{"a":0,"k":100,"ix":5},"eo":{"a":0,"k":100,"ix":6},"nm":"변형"},"nm":"반복 1","mn":"ADBE Vector Filter - Repeater","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":18,"op":31,"st":18,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"모양 레이어 3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[248,173,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,-7,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0.5,0],[0.5,-14.562]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":27,"s":[0]},{"t":35,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.716],"y":[-0.109]},"o":{"x":[0.542],"y":[0]},"t":32,"s":[0]},{"t":36,"s":[30]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rp","c":{"a":0,"k":4,"ix":1},"o":{"a":0,"k":0,"ix":2},"m":1,"ix":5,"tr":{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":90,"ix":4},"so":{"a":0,"k":100,"ix":5},"eo":{"a":0,"k":100,"ix":6},"nm":"변형"},"nm":"반복 1","mn":"ADBE Vector Filter - Repeater","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":27,"op":117,"st":27,"ct":1,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"모양 레이어 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[248,173,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,-7,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0.5,0],[0.5,-14.562]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":14,"s":[0]},{"t":22,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.261],"y":[1]},"o":{"x":[0.407],"y":[0]},"t":19,"s":[0]},{"t":27,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"rp","c":{"a":0,"k":4,"ix":1},"o":{"a":0,"k":0,"ix":2},"m":1,"ix":5,"tr":{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":90,"ix":4},"so":{"a":0,"k":100,"ix":5},"eo":{"a":0,"k":100,"ix":6},"nm":"변형"},"nm":"반복 1","mn":"ADBE Vector Filter - Repeater","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":14,"op":27,"st":14,"ct":1,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"선 3","parent":10,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[3.75,3,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,40,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-0.25,28],[0.5,96]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":29,"s":[100]},{"t":32,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":21,"s":[100]},{"t":28,"s":[0]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":14,"op":120,"st":14,"ct":1,"bm":0},{"ddd":0,"ind":9,"ty":4,"nm":"선 2","parent":10,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[16,16.5,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,40,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,33.5],[0.5,96]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[0.423]},"o":{"x":[0.333],"y":[0]},"t":17,"s":[100]},{"t":22,"s":[39.359]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":10,"s":[100]},{"t":16,"s":[0]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":3,"op":101,"st":3,"ct":1,"bm":0},{"ddd":0,"ind":10,"ty":4,"nm":"선","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[143.5,241,0],"ix":2,"l":2},"a":{"a":0,"k":[0.5,40,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0.5,0],[0.5,75]],"c":false},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":11,"s":[100]},{"t":18,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":4,"s":[100]},{"t":10,"s":[0]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"패스 다듬어 자르기 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[0.960784313725,0.847058823529,0.278431372549,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":4,"ix":5},"lc":2,"lj":1,"ml":4,"bm":0,"nm":"선 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"모양 1","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":-3,"op":18,"st":-3,"ct":1,"bm":0},{"ddd":0,"ind":11,"ty":4,"nm":"빛","parent":12,"sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":4,"s":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":21,"s":[50]},{"t":71,"s":[50]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":2,"s":[54.658,142.658,0],"to":[0,-19.667,0],"ti":[0,11.683,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":11,"s":[54.658,24.658,0],"to":[0,-11.683,0],"ti":[0,-3.517,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":15,"s":[54.658,72.558,0],"to":[0,3.517,0],"ti":[0,2.983,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":18,"s":[54.658,45.758,0],"to":[0,-2.983,0],"ti":[0,-1.483,0]},{"t":20,"s":[54.658,54.658,0]}],"ix":2,"l":2},"a":{"a":0,"k":[54.658,54.658,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":2,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":11,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":15,"s":[100,86.4,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":18,"s":[100,105,100]},{"t":20,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.333,"y":0},"t":34,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[44.775,-43.602],[5.658,-43.602],[-159.342,163.359],[-120.225,163.359]],"c":true}]},{"t":68,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[249.775,-44.399],[210.658,-44.399],[45.658,162.562],[84.775,162.562]],"c":true}]}],"ix":1},"o":{"a":0,"k":100,"ix":3},"x":{"a":0,"k":0,"ix":4},"nm":"마스크 1"}],"ef":[{"ty":21,"nm":"칠","np":9,"mn":"ADBE Fill","ix":1,"en":1,"ef":[{"ty":10,"nm":"칠 마스크","mn":"ADBE Fill-0001","ix":1,"v":{"a":0,"k":0,"ix":1}},{"ty":7,"nm":"모든 마스크","mn":"ADBE Fill-0007","ix":2,"v":{"a":0,"k":0,"ix":2}},{"ty":2,"nm":"색상","mn":"ADBE Fill-0002","ix":3,"v":{"a":0,"k":[1,1,1,1],"ix":3}},{"ty":7,"nm":"반전","mn":"ADBE Fill-0006","ix":4,"v":{"a":0,"k":0,"ix":4}},{"ty":0,"nm":"가로 페더","mn":"ADBE Fill-0003","ix":5,"v":{"a":0,"k":0,"ix":5}},{"ty":0,"nm":"세로 페더","mn":"ADBE Fill-0004","ix":6,"v":{"a":0,"k":0,"ix":6}},{"ty":0,"nm":"불투명도","mn":"ADBE Fill-0005","ix":7,"v":{"a":0,"k":1,"ix":7}}]}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-2.029],[-0.147,-1.358],[-0.413,-0.678],[-0.77,0],[-0.406,0.68],[-0.155,1.351],[0,2.016],[0.153,1.358],[0.406,0.692],[0.77,0],[0.413,-0.693],[0.147,-1.357]],"o":[[0,2.002],[0.147,1.358],[0.413,0.68],[0.77,0],[0.406,-0.678],[0.153,-1.35],[0,-2.029],[-0.155,-1.357],[-0.406,-0.693],[-0.77,0],[-0.413,0.692],[-0.147,1.358]],"v":[[-2.834,0.053],[-2.614,5.092],[-1.774,8.146],[0,9.165],[1.764,8.146],[2.604,5.101],[2.834,0.053],[2.604,-5.029],[1.764,-8.104],[0,-9.144],[-1.774,-8.104],[-2.614,-5.029]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[0,-3.331],[0.391,-1.939],[0.86,-1.357],[1.413,-0.714],[2.058,0],[1.637,1.253],[0.777,2.345],[0,3.289],[-0.707,2.358],[-1.624,1.259],[-2.729,0],[-1.63,-1.252],[-0.784,-2.359]],"o":[[0,2.464],[-0.392,1.939],[-0.861,1.358],[-1.414,0.714],[-2.561,0],[-1.638,-1.252],[-0.777,-2.344],[0,-3.317],[0.707,-2.359],[1.623,-1.26],[2.562,0],[1.631,1.253],[0.783,2.358]],"v":[[11.085,0.053],[10.498,6.656],[8.619,11.6],[5.207,14.707],[0,15.778],[-6.298,13.898],[-9.92,8.503],[-11.085,0.053],[-10.025,-8.461],[-6.529,-13.888],[0,-15.778],[6.288,-13.899],[9.91,-8.482]],"c":true},"ix":2},"nm":"패스 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"mm","mm":1,"nm":"패스 병합 1","mn":"ADBE Vector Filter - Merge","hd":false},{"ty":"fl","c":{"a":0,"k":[0.956862804936,0.682352941176,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[66.957,54.658],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 1","np":4,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-1.022,0],[-1.4,-0.77],[-0.84,-1.47],[0,-2.114],[0.917,-1.589],[1.841,-0.819],[2.799,0],[1.462,0.273],[1.148,0.56],[0,0],[-1.519,-0.399],[-1.274,0],[-0.714,0.293],[-0.371,0.574],[0,0.839],[0.84,0.665],[1.708,0],[0.741,-0.154],[0.56,-0.181],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[-0.469,0.084]],"o":[[1.707,0],[1.399,0.77],[0.84,1.47],[0,2.281],[-0.916,1.588],[-1.84,0.818],[-1.778,0],[-1.463,-0.272],[0,0],[1.078,0.49],[1.518,0.399],[1.022,0],[0.714,-0.294],[0.371,-0.574],[0,-1.162],[-0.84,-0.665],[-0.77,0],[-0.742,0.155],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0.448,-0.084],[0.469,-0.084]],"v":[[1.343,-4.976],[6.005,-3.821],[9.364,-0.462],[10.624,4.913],[9.248,10.718],[5.112,14.329],[-1.848,15.557],[-6.708,15.147],[-10.624,13.898],[-10.624,7.096],[-6.729,8.429],[-2.541,9.027],[0.062,8.587],[1.689,7.285],[2.247,5.165],[0.987,2.425],[-2.835,1.427],[-5.102,1.658],[-7.055,2.162],[-10.099,0.651],[-8.944,-15.557],[8.566,-15.557],[8.566,-8.65],[-1.89,-8.65],[-2.268,-4.598],[-0.893,-4.85]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.956862804936,0.682352941176,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[41.764,54.879],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,8.379],[20.895,0],[5.716,-6.062],[0.408,-9.156],[0,-0.572],[-20.896,0],[-5.882,7.784]],"o":[[0,-20.895],[-8.097,0],[-6.269,6.65],[-0.026,0.571],[0,20.895],[9.527,0],[5.046,-6.677]],"v":[[35.567,1.717],[-2.267,-36.117],[-25.054,-27.878],[-35.529,-3.432],[-35.567,-1.717],[2.267,36.117],[27.605,24.943]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.84313731474,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[52.391,56.375],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-20.895],[20.895,0],[0,20.895],[-20.896,0]],"o":[[0,20.895],[-20.896,0],[0,-20.895],[20.895,0]],"v":[[37.835,0],[0.001,37.834],[-37.835,0],[0.001,-37.834]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411824544,0.705882352941,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[54.658,54.658],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 4","np":2,"cix":2,"bm":0,"ix":4,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-30.049],[30.049,0],[0,30.049],[-30.049,0]],"o":[[0,30.049],[-30.049,0],[0,-30.049],[30.049,0]],"v":[[54.408,0],[0,54.408],[-54.408,0],[0,-54.408]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.898039275525,0.400000029919,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[54.658,54.658],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 5","np":2,"cix":2,"bm":0,"ix":5,"mn":"ADBE Vector Group","hd":false}],"ip":34,"op":90,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":12,"ty":4,"nm":"코인","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":2,"s":[0]},{"t":6,"s":[100]}],"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":2,"s":[150,233.5,0],"to":[0,-23.7,0],"ti":[0,15.717,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":11,"s":[150,91.3,0],"to":[0,-15.717,0],"ti":[0,-3.517,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":15,"s":[150,139.2,0],"to":[0,3.517,0],"ti":[0,2.983,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":19,"s":[150,112.4,0],"to":[0,-2.983,0],"ti":[0,-1.483,0]},{"t":22,"s":[150,121.3,0]}],"ix":2,"l":2},"a":{"a":0,"k":[54.658,54.658,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":2,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":11,"s":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":15,"s":[100,86.4,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":19,"s":[100,105,100]},{"t":22,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,8.379],[20.895,0],[5.716,-6.062],[0.408,-9.156],[0,-0.572],[-20.896,0],[-5.882,7.784]],"o":[[0,-20.895],[-8.097,0],[-6.269,6.65],[-0.026,0.571],[0,20.895],[9.527,0],[5.046,-6.677]],"v":[[35.567,1.717],[-2.267,-36.117],[-25.054,-27.878],[-35.529,-3.432],[-35.567,-1.717],[2.267,36.117],[27.605,24.943]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.84313731474,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[51.791,56.875],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[120,120],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 3","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-20.895],[20.895,0],[0,20.895],[-20.896,0]],"o":[[0,20.895],[-20.896,0],[0,-20.895],[20.895,0]],"v":[[37.835,0],[0.001,37.834],[-37.835,0],[0.001,-37.834]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411824544,0.705882352941,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[54.658,54.658],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[120,120],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 4","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-30.049],[30.049,0],[0,30.049],[-30.049,0]],"o":[[0,30.049],[-30.049,0],[0,-30.049],[30.049,0]],"v":[[54.408,0],[0,54.408],[-54.408,0],[0,-54.408]],"c":true},"ix":2},"nm":"패스 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.898039275525,0.400000029919,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"칠 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[54.658,54.658],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"변형"}],"nm":"그룹 5","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":90,"st":0,"ct":1,"bm":0}],"markers":[],"chars":[{"ch":"P","size":63,"style":"Bold","w":62.79,"data":{"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[-3.548,1.286],[-2.132,2.214],[-0.945,2.849],[0,3.125],[4.231,3.955],[9.212,0]],"o":[[0,0],[0,0],[0,0],[0,0],[5.208,0],[3.548,-1.286],[2.132,-2.213],[0.944,-2.848],[0,-6.934],[-4.232,-3.955],[0,0]],"v":[[8.984,-71.387],[8.984,0],[24.121,0],[24.121,-25.391],[30.615,-25.391],[43.75,-27.319],[52.271,-32.568],[56.885,-40.161],[58.301,-49.121],[51.953,-65.454],[31.787,-71.387]],"c":true},"ix":2},"nm":"P","mn":"ADBE Vector Shape - Group","hd":false},{"ind":1,"ty":"sh","ix":2,"ks":{"a":0,"k":{"i":[[-1.953,-1.709],[0,-3.516],[1.139,-1.595],[2.083,-0.748],[2.832,0],[0,0],[0,0],[0,0]],"o":[[1.953,1.709],[0,2.507],[-1.14,1.595],[-2.084,0.749],[0,0],[0,0],[0,0],[4.102,0]],"v":[[40.088,-56.421],[43.018,-48.584],[41.309,-42.432],[36.475,-38.916],[29.102,-37.793],[24.121,-37.793],[24.121,-58.984],[31.006,-58.984]],"c":true},"ix":2},"nm":"P","mn":"ADBE Vector Shape - Group","hd":false}],"nm":"P","np":5,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}]},"fFamily":"Open Sans"}]};
					var params = {
						container: document.getElementById('EX_lottie0'),
						renderer: 'svg',
						loop: true,
						autoplay: true,
						animationData: animationData
					};

					EX_anim0 = lottie.loadAnimation(params);
				}

				$("#EX_popupMission0 .sub").text(`1회성 미션 달성으로 ${comma.set(rd.resultMap.pntAmt)}포인트 받았습니다.`);
				$('#EX_popupMission0').fadeIn().addClass('show').removeClass('close');
			} else {
				if(typeof EX_mission0CbFunc == 'function') {
					EX_mission0CbFunc();
				}
			}
		},
	});
}

/**
 * 약관에 따라 페이지 이동 처리
 * @param {0|1|2} goTo 이동 화면(0: 검진 메인, 1: 예약, 2: 결과)
 * @param {'before' | 'after'} mode before => 웹뷰 open 시 사용, after 웹뷰 close 시 사용
 */
var EX_gcWebViewProc = function(goTo, mode) {
    var temp_userNo = MData.storage('USER_NO');
	const {isRsrvtChk} = genRsrvtChk();
	if(isRsrvtChk){
		EX_checkCompany(function(rd){
            MNet.httpSend({
                path: "/gc/selectTerms",
                data: {
                    userNo : temp_userNo,
                },
                callback: function(rd2) {
                    console.log(rd2);

                    if(rd2.rtnCd == '0000') {
						// 필수약관 동의
						let isRequiredAgree = rd2.TERM_HISTORY_YN == "Y";
						// 선택약관 전체 동의
						let isOptionalAgree = false;

						let param = {
							TERM_HISTORY_YN: rd2.TERM_HISTORY_YN,
							TERM1_AGREE_YN: typeof rd2.TERMS == 'undefined' ? 'N' : rd2.TERMS.TERM1_AGREE_YN,
							TERM2_AGREE_YN: typeof rd2.TERMS == 'undefined' ? 'N' : rd2.TERMS.TERM2_AGREE_YN,
							TERM3_AGREE_YN: typeof rd2.TERMS == 'undefined' ? 'N' : rd2.TERMS.TERM3_AGREE_YN,
							TERM4_AGREE_YN: typeof rd2.TERMS == 'undefined' ? 'N' : rd2.TERMS.TERM4_AGREE_YN,
							TERM5_AGREE_YN: typeof rd2.TERMS == 'undefined' ? 'N' : rd2.TERMS.TERM5_AGREE_YN,
							goTo
						}

                        if(isRequiredAgree == false) {
                            MPage.html({
                                url: '../MDP/NMDP_2_67V.html',
                                param,
								action: "NO_HISTORY"
                            });
                        } else {
                            if(mode == 'before') {
                                EX_checkCompany(function(rd2) {
                                    EX_gcOpenWebView(goTo, temp_userNo);
                                }, temp_userNo);
                            } else {
								with(rd2.TERMS) isOptionalAgree = TERM2_AGREE_YN == "Y" && TERM3_AGREE_YN == "Y" && TERM4_AGREE_YN == "Y" && TERM5_AGREE_YN == "Y";
								// 선택약관을 하나라도 선택하지 않았을 때
								if(isOptionalAgree == false){
									MPage.html({
										url: '../MDP/NMDP_2_68V.html',
										param
									});
									stackRemove("NMDP_2_94V");
								}else{
									EX_gcAfterClose(true);
								}
                            }
                        }
                    }
                },
            });
        }, temp_userNo);
	}else{
		EX_invalidUser(false);
	}
}

var EX_checkCompany = function(cb, temp_userNo) {
    MNet.httpSend({
        path: "/gc/chnl/check-company",
        data: {
            userNo : temp_userNo,
        },
        callback: function(rd) {
            console.log(rd);

            if(typeof rd.rtnCd != 'undefined' && rd.rtnCd == '0000') {
                if(typeof rd.STATUS != 'undefined' && rd.STATUS == 'Y') {
                    if(typeof cb == 'function') cb(rd);
                } else {
                    EX_invalidUser();
                }
            }
        },
    });
}

var EX_gcOpenWebView = function(goTo, temp_userNo) {
	//2023.05.02 건강검진 카운트
	appInsights.trackEvent({
		name: 'btn_medical_checkup_gchc',
		  properties: {
		  viewPage: document.title,
		  eventType: 'medical_checkup',
		  moveToPage : 'gchc'
		}
	});

    var url = Definition.FILEUPLOAD_URL + '/api/gc/chnl/login?userNo=' + temp_userNo + '&goTo=' + goTo;

    var cb = 'EX_gcWebViewCb';

    M.execute('exWNOnWebBrowser', '', url, 'N', cb);

    if($('#EX_popupMenu0').length > 0 && $('#EX_popupMenu0').hasClass('show')) {
        $('#EX_popupMenu0').fadeOut().addClass('close').removeClass('show');
    }
}

/**
 * @param {boolean | undefined} isGcWebview true => GC 녹십자 웹뷰를 보고온 상태
 */
var EX_gcAfterClose = function(isGcWebview) {
    if(typeof back == 'boolean' && back) {
        MPage.back({
			param: { isGcWebview }
		});
    } else {
        var currentPage = location.href.substring(location.href.lastIndexOf("/")-3 ,location.href.lastIndexOf(".")); // 현재 페이지 체크

        if(/NMDP_(2_91T|1_1V|2_1T)/.test(currentPage) == false) {
            MPage.html({
                url: '../MDP/NMDP_2_91T.html',
                param: {
                    tab: '2',
                }
            });
        }
    }
}

var EX_invalidUser = function(mode) { // mode == false이면 EX_gcAfterClose() 실행 안 함
	//2023.05.02 건강검진 카운트
	appInsights.trackEvent({
		name: 'btn_medical_checkup_unable',
		  properties: {
		  viewPage: document.title,
		  eventType: 'medical_checkup',
		  moveToPage : 'none'
		}
	});
	let companyCode = MData.storage("COMPANY_CD");
    Popup.alert({
        message: /1100000006/.test(companyCode) ? '현재 소속회사와 KB오케어 계약이 완료되지 않아, 종합건강검진 예약 및 조회 대상자가 아닙니다. 계약 완료 후 건강검진결과 조회 및 이벤트 포인트가 지급 될 예정입니다.' : '종합건강검진 예약 및 조회 대상자가 아닙니다.',
    }, function(){
        if(typeof mode == 'undefined') EX_gcAfterClose();
    });
}

// 회사 코드로 종건 오픈 예정일이 됐는지 여부 확인함
// 오픈 예정일이거나 그 이후 날짜이고 cb(콜백 함수)가 있으면 cb를 실행하고 오픈 예정일 이전이면 접근 불가 alert을 띄움
// cb가 없으면 회사 코드로 오픈 예정일이 됐는지 여부를 true/false로 return
var EX_checkOpen = function(cb) {
    var result = false;
    var compCd = MData.storage('COMPANY_CD');

    // 회사 코드에 대응되는 오픈 예정일(예정일부터 접근 허용. false 는 미정이라 무조건 불허)
    var compObj = {
		'1000000013': '2022-03-28', // KB금융지주
		'1000000009': '2022-03-14', // KB국민은행
		'1000000011': '2022-03-28', // KB증권
		'1000000002': '2022-05-03', // KB손해보험
		'1000000010': '2022-03-28', // KB국민카드
		'1000000014': '2022-03-31', // 푸르덴셜생명
		'1000000018': '2022-04-25', // KB자산운용
		'1000000012': false, // KB캐피탈
		'1000000021': '2022-03-31', // KB생명보험
		'1000000019': false, // KB부동산신탁
		'1000000015': false, // KB저축은행
		'1000000017': false, // KB인베스트먼트
		'1000000016': '2022-04-27', // KB데이타시스템
		'1000000020': false, // KB신용정보
		'1000000001': '2022-03-17', // KB헬스케어
	};

    var openDate = compObj[compCd.toString()];

    if(typeof openDate == 'undefined') {
        result = false;
    } else if(!openDate) {
        result = false;
    } else {
        var dateFormat = 'YYYY-MM-DD';
        var mOpenDate = moment(openDate, dateFormat);
        var mCurrDate = moment(moment().format(dateFormat), dateFormat);

        if(mCurrDate.isBefore(mOpenDate)) {
            result = false;
        } else {
            result = true;
        }
    }

    if(typeof cb != 'undefined') {
        if(result) {
            if(typeof cb == 'function') {
                cb();
            }
        } else {
            EX_invalidUser(false);
        }
    } else {
        return result;
    }
}

/**
 * 종합건강검진 open 조건
 */
const genRsrvtChk = (compCd = MData.storage("COMPANY_CD")) => {
	const reservations = Object.freeze({
		'1000000009': '2023.03.02', // KB국민은행
		'1000000011': '2023.03.15', // KB증권
		'1000000001': '2023.05.11', // KB헬스케어 - 에임메드
		'1000000013': '2023.03.27', // KB금융지주
		'1000000019': '2023.03.27', // KB부동산신탁
		'1000000016': '2023.04.10', // KB데이타시스템
		'1000000018': '2023-04-12', // KB자산운용
		'1100000007': '2023-04-28', // KB라이프
		'1000000002': '2023.05.03', // KB손해보험 - 에임메드
		'1000000010': '2023.03.17', // KB카드
		'1100000015': '2023.05.03' // KB손해보험 건강검진
	});

	const selectItem = reservations[compCd];
	return {isRsrvtChk: /string/i.test(typeof selectItem) && moment().isAfter(moment(selectItem, "YYYY.MM.DD")), openDate: /string/i.test(typeof selectItem) ? selectItem.substring(2) : selectItem}
}

/**
 * 조각 HTML/JS 삽입하기
 * @param {String} targetDom append할 DOM 객체의 명칭(예: #allMenu)
 * @param {String} fragPath 조각 HTML/JS 경로(예: "MCM/NMCM_10_1V")
 * @param {Function} callback 조각 JS 로딩 성공 시 마지막으로 실행할 함수
 * * @param {Function} errorCallback 조각 JS 로딩 실패 시 마지막으로 실행할 함수
 */
var addFrags = function(targetDom, fragPath, callback, errorCallback) {
	$(targetDom).append(`<div id="popupWrapper"></div>`);

	$("#popupWrapper").load('../' + fragPath + '.html', function(){
		if(callback === undefined || callback === null) callback = function() {

		};

		$.getScript('../../js/ui/' + fragPath + '.js')
			.done(callback)
			.fail(errorCallback);
	});
}

/**
 * 프로필 이미지 변경 팝업 추가하기
 */
var addProfilePopup = function() {
	return new Promise((resolve, reject) => {
		addFrags("body", "MCM/NMCM_11_2L", function(){
			PP_pageInit.load();
			PP_pageInit.setEvent();
			resolve();
		}, function(){
			reject();
		});
	});
}

/**
 * 프로필 이미지 다운로드 받아서 storage에 세팅하기
 */
var downloadProfileImg = function(img, tycd) {
    return new Promise((resolve, reject) => {
        const defImg = '';//'../../img/content/img-noimg-circle.svg'; // 디폴트 이미지
        const defTycd = '';

        M.net.http.download({
            url: img,
            directory: '/profile',
            indicator: false,
            overwrite: true,
            finish: function(statusCode, header, fileInfo, status, error) {
                console.log(statusCode, header, fileInfo, status, error);

                if(status == 'SUCCESS') {
                    let img = fileInfo.source;
                    MData.storage("setProfileImg", img);
                    MData.storage("setProfileTycd", tycd);

                    resolve({
                        result: true,
                        img: img,
                    });
                } else { // 다운로드 실패 시
                    MData.storage("setProfileImg", defImg);
                    MData.storage("setProfileTycd", defTycd);

                    resolve({
                        result: false,
                        img: defImg,
                    });
                }
            },
        });
    });
}

/**
 * 운영서버를 판별하여 프로세스를 적용할 때 사용한다.
 * @param {string} type 업무 약어
 * @param {string} compCd 회사코드
 */
var realAppNotService = function(type, compCd = MData.storage("COMPANY_CD")){
	const isRealApp = Definition.SERVER_TYPE == "PROD" || Definition.SERVER_TYPE == "QA";
	switch(type){
		case "ourHome" : // 오늘의 식단(아워홈)
			return !isRealApp || (isRealApp && MData.storage("TODAY_MEAL_OURHOME") == "Y"); // KB헬스케어, KB손해보험, KB국민은행, KB국민카드, 파트너스
		case "greenFood" : 
			return !isRealApp || (isRealApp && MData.storage("TODAY_MEAL_GREEN") == "Y")
		case "isKbMember" : // KB금융그룹 임직원 여부(운영 아니면 임직원인 것처럼 처리)
			return !isRealApp || (isRealApp && /^(10000000(01|02|09|10|11|12|13|14|15|16|17|18|19|20|21)|1100000007)$/.test(compCd));
		case "mediN2" : // 오케어M(메디앤) 부속의원 표시 여부
			return !isRealApp || (isRealApp && /^1000000009$/.test(compCd)); // KB국민은행만 노출
	}
};

/**
 * 공통 코드(군 소속 등)에 대응되는 명칭을 얻을 때 사용한다.
 * @param {String} code 공통 코드
 */
var getCommonCodeName = function(code) {
	const CODE_NAMES = {
		'400181': '육군',
		'400182': '해군',
		'400183': '공군',
		'400184': '해병대',
		'400185': '기타',
	};

	if(CODE_NAMES[code] == undefined) return "";

	return CODE_NAMES[code];
}

/**
 * 갤럭시 워치 구매 허용 여부 확인
 */
var checkGalaxyWatchPurchase = (indicator) => {
    return new Promise((resolve, reject) => {
		resolve(false);
    });
}

/**
 * 사운드짐 콘텐츠 네이티브 콜백 실행이 어디서든 가능하게 공통으로 코드 이전
 */
//사운드짐 코드 시작
var contentInfo;

//단건데이터 - 네이티브 플레이어 조회후 콜백 처리를 위한 함수
//스케쥴 리스트에서 ROW 클릭시 호출됨
var showPlayer = (cntsId ,day , weeks , param , show) => {

	var usePgmScheduleList = usePgmInfo.usePgmScheduleList; //프로그램 목록 중 수행한 컨텐츠 목록
	var pgmScheduleList = programInfo.pgmScheduleList; //프로그램의 전체 컨텐츠 목록
	let IOS = M.info.device('os').name.indexOf('iOS') != -1
	let versionChk = false;
	let isProd = Definition.SERVER_TYPE === "PROD";

	//전체 컨텐츠 목록에서 현재 컨텐츠 추출
	for(var i in pgmScheduleList){
		if(pgmScheduleList[i].WEEKS == weeks && pgmScheduleList[i].DAYS == day && pgmScheduleList[i].CNTS_ID == cntsId){
			contentInfo = pgmScheduleList[i]
		}
	}

	contentInfo.isYn = "N"; //컨텐츠 수행 현황 여부
	contentInfo.availYn = "Y" //이 함수는 스케쥴 탭이 클릭될때 호출되므로, 무조건 Y (사용가능)
	contentInfo.sgmNo = usePgmInfo.usePgm.SGM_NO; //사운드짐번호(프로그램 변경 시 새로 채번되는 번호)
	contentInfo.pgmId = programInfo.pgmInfo.PGM_ID; //프로그램 아이디
	contentInfo.chkPgmCb = chkPgmCb;
	//현재 컨텐츠의 수행 현황 확인
	for(var i in usePgmScheduleList){

	    console.log(i ,usePgmScheduleList[i].WEEKS , usePgmScheduleList[i].DAYS , usePgmScheduleList[i].CONTS_ID );
	    console.log(i ,weeks , day , cntsId );

		if(usePgmScheduleList[i].WEEKS == parseInt(weeks) && usePgmScheduleList[i].DAYS == parseInt(day) && usePgmScheduleList[i].CONTS_ID == parseInt(cntsId) ){
			contentInfo.isYn = "Y";
		}
	}

	MData.storage("SygmContentInfo",contentInfo);

	if(isProd){
		if(IOS && getIsVersionCompare(undefined, ['1','2','7'])){
			param.contents_url = param.streamcontents_url+'(format=m3u8-cmaf)';
			contentInfo.contents_url = param.streamcontents_url+'(format=m3u8-cmaf)';
		}else if(getIsVersionCompare(undefined, ['1','2','0'])){
			param.contents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
			param.streamcontents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
			contentInfo.streamcontents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
			contentInfo.contents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
			if(show){
				contentInfo.playFrom = moment().format("YYYY-MM-DD HH:mm:ss"); //컨텐츠 플레이 시작 시간
				M.execute("exWNOnSoundGymPlayerStream", JSON.stringify(param), "soundGymMediaCb");
			}
			return
		}
		param.contents_url = param.contents_url.replace(/([ㄱ-ㅎ]|[가-힣])*/g, (full, sub) => {
			return encodeURIComponent(full);
		})
		if(show){
			contentInfo.playFrom = moment().format("YYYY-MM-DD HH:mm:ss"); //컨텐츠 플레이 시작 시간
			M.execute("exWNOnSoundGymPlayer", JSON.stringify(param), "soundGymMediaCb");
		}
		return;
	}else{
		if(IOS){
			param.contents_url = param.streamcontents_url+'(format=m3u8-cmaf)';
			contentInfo.contents_url = param.streamcontents_url+'(format=m3u8-cmaf)';
		}else{
			param.contents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
			param.streamcontents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
			contentInfo.streamcontents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
			contentInfo.contents_url = param.streamcontents_url+'(format=mpd-time-cmaf)';
		}
	}
	if(IOS && show){
		param.contents_url = param.contents_url.replace(/([ㄱ-ㅎ]|[가-힣])*/g, (full, sub) => {
			return encodeURIComponent(full);
		})
		contentInfo.playFrom = moment().format("YYYY-MM-DD HH:mm:ss"); //컨텐츠 플레이 시작 시간
		M.execute("exWNOnSoundGymPlayer", JSON.stringify(param), "soundGymMediaCb");
	}else if(show){
		contentInfo.playFrom = moment().format("YYYY-MM-DD HH:mm:ss"); //컨텐츠 플레이 시작 시간
		M.execute("exWNOnSoundGymPlayerStream", JSON.stringify(param), "soundGymMediaCb");
	}


};
//사운드짐 미디어 호출 콜백
var soundGymMediaCb = function(result) {
	var contentInfo = MData.storage("SygmContentInfo");
	console.log("*사운드짐 미디어 호출 콜백 - contentInfo : ", JSON.stringify(contentInfo, undefined, 2));
	if(result.code == "success"){
		/* 1. 해당 컨텐츠에 대한 평가가 이루어지지 않은 경우(isYn=="N"), 운동완료 화면에서 평가 수행
		 * 2. 이용 가능 여부가 N이면 영상은 실행 가능하되, 콜백에서 운동완료 화면으로 이동은 불가
		 * 3. chkPgmCb 미래일자일 경우 false 오늘과 과거일자일 경우  true
		*/

		if(contentInfo.isYn == "N" && contentInfo.availYn == "Y" && contentInfo.chkPgmCb == true){
			contentInfo.playTo = moment().format("YYYY-MM-DD HH:mm:ss"); //컨텐츠 플레이 종료 시간

			MPage.html({
				url : "../MPD/NMPD_9_13V.html",
				param : {
					contentInfo : contentInfo
				}
			});
		}
	}
};

//사운드짐 코드 끝

/**
 * 식단(두잉랩) 네이티브 종료시 페이지 잘못 랜딩되는 결함이 있어 공통으로 코드 이전
 *
 */
//식단 조회 함수
var selectMeal = null;
//두잉랩 콜백
var doingLabCb = function(result) {
	if(result === null || result === undefined ){
		Popup.alert("식단 등록에 실패하였습니다. 다시 시도해주세요.")
		return;
	}
	// iamtheman
	//휴레이 서비스에서 해당 페이지를 호출하였을때 이야기 맞게 back 처리하기위함
	if(result && result.code == "failed"){
		if(!isEmpty(MData.storage("isPrevHurayPage"))){
			MPage.back();
		}
	}else{
		if( result.data === undefined || result.data === null || result.data == "ServerNotWork"){
			Popup.alert("식단 등록에 실패하였습니다. 다시 시도해주세요.")
			return;
		}
		if(!result.hasOwnProperty("data")){
			Popup.alert("식단 등록에 실패하였습니다. 다시 시도해주세요.")
			return;
		}

		var resultToJson = JSON.parse(result.data);
		console.log(">>>>doingLabCb result data:", resultToJson);
		console.log("두잉랩콜백값입니다");
		console.log(result);
		console.log(resultToJson);
		var todayTime = moment().format("YYYY.MM.DD HH:mm:ss");
		if(moment.duration(moment(resultToJson.eatDate,"YYYY-MM-DD HH:mm:ss").diff(moment(todayTime,"YYYY.MM.DD HH:mm:ss"))).asMinutes() > 0){
			$(".toast-box .toast-text").text("미래 일자의 시간은 입력 불가능합니다.");
			showToast();
			return false;
		}
		// 이미지가 없을 경우 기본이미지로 세팅해서 저장
		if(resultToJson.predictedImagePath == undefined || resultToJson.predictedImagePath == "") {
			M.net.http.download({
				url: Definition.FILEUPLOAD_URL + "/http/down/file/1000000001",
				indicator: false,
				overwrite: false,
				useCookie: false,
				directory : "foodlensStore/default",
				progress: function(total, current) {
					//console.log(total, current);
				},
				finish: function( statusCode, header, fileInfo, status, error ) {
					if (status == "SUCCESS") {
						console.log("두잉랩 카메라 이후 콜백입니다.");
						console.log(resultToJson);
						resultToJson.predictedImagePath = fileInfo.source;
						uploadImage(resultToJson);
					}
				}
			});

		} else { // 이미지가 있을 경우
			uploadImage(resultToJson);
		}
	}
}
//두잉랩 업로드 이미지
var uploadImage = function(resultToJson) {
	console.log("업로드 이미지 펑션입니다.");
	console.log(resultToJson);
  if(!resultToJson) {
  	 Popup.alert({
       });
  } else {
      var photo = { //첨부 이미지 파일
          type: "FILE",
          content: resultToJson.predictedImagePath,
          name: "img"
      };

      resultToJson.recordKey = MData.storage("RECORD_KEY");
      //MInfo.device("os.name").toLowerCase()
      if(MPage.info('os') == "ios" && photo.content.indexOf("file://") != -1){
          photo.content = photo.content.substring(7);
      }

      //두잉랩 이미지 업로드
      MNet.upload({
          path : '/api/cmm/fileupload/doing',
          sendData : {},
          files : [photo],
          indicator : false,
          callback : function(receivedData){
              console.log(">>> upload:", receivedData);
              var data = JSON.parse(receivedData).body;
              //첨부파일 업로드 성공 시
              if(data.rtnCd == "0000"){
                  resultToJson.fileGrpId = data.attachFiles[0].fileGrpid;
                  console.log(">>> savelMeal 실행직전 resultToJson값");
                  console.log(resultToJson);
                  // 두잉랩 데이터 저장
                  MNet.httpSend({
                      path : "/liferecord/doi/saveMeal",
                      data : resultToJson,
                      callback: function (receivedData) {
                      	console.log(">>> saveMeal 실행 콜백");
                          console.log(receivedData);
                          if (receivedData.rtnCd == '0000') {
                            if(typeof selectMeal == 'function') {
                                isPopup = true;
                                mealType = resultToJson.mealType;
                                selectMeal();
                            }

							  // iamtheman
							  //휴레이 서비스에서 해당 페이지를 호출하였을때 이야기 맞게 back 처리하기위함
							  if(!isEmpty(MData.storage("isPrevHurayPage"))){
								  MPage.back();
							  }

                              // 월간오케어 콜백
                              if(!isEmpty(MData.storage("monthlyOcarePage9"))){
                                 MData.removeStorage("monthlyOcarePage9")
                                  MPage.replace({
                                     url:"../MOK/NMOK_9_3P.html",
                                  });
                              }

                          } else {
                              // 데이터 저장 실패
                          	 Popup.alert({
                                   message: '식단 데이터 저장을 실패했습니다.',
                               });
                          }
                      }
                  });
              }else{
              	 Popup.alert({
                       message: '식단 데이터 저장을 실패했습니다.',
                   });
              }
          }
      });
  }
}




/**
 * 처음 홈(메인) 페이지 분기 처리 여부 체크
 */
var willShowSelection = () => {
	// let isRealApp = Definition.SERVER_TYPE == "PROD";
	// let checkUser = ['1000000030', '1000000001']; // 파트너스, 헬스케어
    // let compCd = MData.storage("COMPANY_CD");
	// let reg = new RegExp(`^(${checkUser.join("|")})$`);

	// return !isRealApp || (isRealApp && (reg.test(compCd) || !moment().isBefore("20220517 07", "YYYYMMDD HH")));
	// return isRealApp; // 운영일 때만 분기 페이지 보임
	return false; // 분기 페이지 없앤 뒤 적용
}

/**
 * 처음 홈(메인) 페이지 분기 처리 여부 체크해서 URL 리턴
 */
var getHomeUrl = () => {
	// let showSelection = willShowSelection();

	// return showSelection ? "../MCM/NMCM_4_2V.html" : "../MOK/NMOK_1_1V.html";
	return "../MOK/NMOK_1_1V.html"; // 분기 페이지 없앤 뒤 적용
}

/**
 * 마지막 종료 시점의 페이지 적용
 */
var getLastPage = () => {
     var lastPageExit = MData.storage("LAST_PAGE");
     if (lastPageExit != ""){
        return lastPageExit;
     }else{
        return getHomeUrl();
     }
}
/**
 * 로그 수집 서버 저장용
 * @param {String} desc 서버에 저장할 로그 내용
 */
var saveLog = (desc) => {
	MNet.httpSend({
		path: "/cmm/printLog",
		indicator: false,
		data: {
			userNo: MData.storage("USER_NO"), // 회원 번호
			cliDt: moment().format(), // 클라이언트 날짜 및 시간(타임존 포함) "2022-05-31T11:07:08+09:00"
			os: M.info.device("os.name"), // OS명
			osVer: M.info.device("os.version"), // OS 버전
			appVer: MInfo.app("app.version") + "/" + MInfo.app("app.build"), // 앱 버전 및 빌드 넘버(버전 코드)
			desc: desc, // 로그 내용
		},
		noErrMsg: true,
		callback: function(rd) {
			console.log(rd);
		},
	});
}

/**
 * JS단의 오류 로그를 서버에 저장
 * @param {String} desc0 서버에 전송할 기본적인 내용(회원 번호, 시간 등은 제외)
 */
var saveLogFromJS = (desc0) => {
	let pageUrl = location.href;
	let pageName = pageUrl.substring(pageUrl.lastIndexOf("/") + 1, pageUrl.lastIndexOf("."));
	let desc = `[${pageName}] `;

	if(typeof desc0 === "object") {
		if(typeof desc0.name !== "undefined" && typeof desc0.message !== "undefined") { // try ... catch(error) 문의 error 객체일 경우
			desc += `${desc0.name}: ${desc0.message}`;
		} else { // try ... catch(error) 문의 error 객체가 아닐 경우
			try {
				let addDesc = JSON.stringify(desc0);
				desc += addDesc;
			} catch(err) {
				desc += desc0.toString(); // JSON.stringify() 실패 시 toString()
			}
		}
	} else { // 객체가 아닐 경우 문자열로 단순 변환
		desc += desc0.toString();
	}

	saveLog(desc);
}

/** 프로바이더 서비스 연결 시 사용할 inKey 받는 함수
 * @param {string} providerId: 프로바이더ID
 * @param {boolean} indicator: 로딩 아이콘 띄울지 여부(없으면 false로 해석됨)
 */
 var getInKeyByProvId = function(providerId, indicator, srvcFg) {
	return new Promise((resolve, reject) => {
		const serverType = Definition.SERVER_TYPE;
		const isProd = serverType === "PROD";
		const isQa = serverType === "QA";
		const isDev = serverType === "DEV";
		let isAvailable = false; // 어느 앱(DEV/QA/PROD)에서 사용 가능한지 체크
		let provider = "";
		let providerNm = "";
		let inKeyNm = "";
		let inKey = "";
		let mustProc = false; // true일 경우 캐싱을 무시하고 무조건 매번 inkey를 서버에서 생성해 옴

		if(providerId == Definition.PROVIDER_MALL_ID) {
			provider = "ocareMall";
			providerNm = "오케어몰";
			inKeyNm = "OcareMallInKey";
			isAvailable = isProd || isQa;//<20230803:jhw> 오케어몰 QA환경 오픈(OC-769)
			mustProc = true; // TODO: 캐싱 없애면 삭제
		} else if(providerId == Definition.PROVIDER_HURAY_ID) {
			provider = "huray";
			providerNm = "휴레이";
			inKeyNm = "HurayInKey";
			isAvailable = isProd || isQa;
		} else if(providerId == Definition.PROVIDER_SPOANY_ID) {
			provider = "spoany";
			providerNm = "스포애니";
			inKeyNm = "SpoanyInKey";
			isAvailable = isProd || isQa;
		} else if(providerId == Definition.PROVIDER_WITHBECON_ID) {
			provider = "withbecon";
			providerNm = "비컨";
			inKeyNm = "WithbeconInKey";
			isAvailable = isProd || isQa;
		} else if(providerId == Definition.PROVIDER_CAREDOC_ID) {
			provider = "caredoc";
			providerNm = "케어닥";
			inKeyNm = "CaredocInKey";
			isAvailable = isProd || isQa;
		} else if(providerId == Definition.PROVIDER_MEDI_N) {
			provider = "medin";
			providerNm = "메디앤";
			inKeyNm = "MediNInKey";
			isAvailable = isProd || isQa || isDev;
		} else if(providerId == Definition.PROVIDER_TANGRAM_ID) {
			provider = "tangram";
			providerNm = "탱그램";
			inKeyNm = "TangramInKey";
			isAvailable = isProd || isQa
		} else if(providerId == Definition.PROVIDER_HGF_ID && srvcFg == "451") {
			provider = "hgfood";
			providerNm = "현대그린푸드";
			inKeyNm = "HgfInKey";
			isAvailable = isProd || isQa || isDev;
		} else if(providerId == Definition.PROVIDER_HGF_ID && srvcFg == "452") {
			provider = "hgfood";
			providerNm = "현대그린푸드";
			inKeyNm = "HgfInKey2";
			isAvailable = isProd || isQa || isDev;
		} else {
			reject();
		}

		let dataParam = {}
		if(srvcFg != ""){
			dataParam = {
				userNo : MData.storage("USER_NO"),
				providerId: providerId,
				srvcFg : srvcFg
			}
		}else{
			dataParam = {
				userNo : MData.storage("USER_NO"),
				providerId: providerId,
			}
		}

		if(isAvailable) {
			if(mustProc || MData.storage(inKeyNm) == "") {
				MNet.httpSend({
					path: "/mall/userInfo",
					data: dataParam,
					indicator: indicator || false,
					callback: function(rd) {
						console.log(rd);

						if(typeof rd.result.data === "undefined" || typeof rd.result.data.output === "undefined") {
							inKey = rd.result.output;
						} else {
							inKey = rd.result.data.output;
						}

						MData.storage(inKeyNm, inKey);

						resolve();
					},
					errorCallback: function() {
						Popup.alert(`${providerNm} 연동에 실패하였습니다.`);
						reject();
					}
				});
			} else {
				resolve(); // 캐시된 문자열 사용 시 그냥 성공 처리
			}
		} else {
			// 테스트를 위해 QA 또는 운영으로 연결 시도 시 운영의 특정 사용자 정보 사용
			if(providerId == Definition.PROVIDER_MALL_ID) {
				inKeyNm = "OcareMallInKey";
			} else if(providerId == Definition.PROVIDER_HURAY_ID) {
				inKeyNm = "HurayInKey";
			} else if(providerId == Definition.PROVIDER_SPOANY_ID) {
				inKeyNm = "SpoanyInKey";
			} else if(providerId == Definition.PROVIDER_WITHBECON_ID) {
				inKeyNm = "WithbeconInKey";
			} else if(providerId == Definition.PROVIDER_CAREDOC_ID) {
				inKeyNm = "CaredocInKey";
			} else if(providerId == Definition.PROVIDER_TANGRAM_ID) {
				inKeyNm = "TangramInKey";
			} else {
				Popup.alert("잘못된 API 호출입니다.");
				reject();
			}

			MData.storage(inKeyNm, Definition.TEST_INKEYS[inKeyNm]);
			resolve();
		}
	});
}

/** 휴레이 일부 서비스(건강뉴스 등) 호출 시 사용할 토큰 받는 함수
 * @param {boolean} indicator: 로딩 아이콘 표시 여부(true/false). 없으면 false.
 */
var getHurayToken = function(indicator) {
	return new Promise((resolve, reject) => {
		let mFormat = "YYYY-MM-DD HH:mm:ss";
		let tTime = MData.storage("HurayTokenTime");
		let mTTime = moment(tTime, mFormat);
		let mCurr = moment();
		let durMin = moment.duration(mCurr.diff(mTTime)).asMinutes();

		// 캐시된 토큰 정보가 없거나 발급 후 55분이 넘었으면 서버에서 새로 받아옴
		if(MData.storage("HurayToken") == "" || MData.storage("HurayTokenTime") == "" || durMin > 55) {
			MNet.httpSend({
				path: "/huray/selectToken",
				data: {
					dvdFg: "cargo",
				},
				indicator: indicator || false,
				callback: function(rd) {
					console.log(rd);
					MData.storage("HurayToken", rd.token);
					MData.storage("HurayTokenTime", moment().format(mFormat));
					resolve(rd.token);
				},
				errorCallback: function() {
					Popup.alert(`시스템 오류입니다.`);
					reject();
				}
			});
		} else { // 캐시된 지 55분 이내일 경우 캐시된 값을 반환함
			resolve(MData.storage("HurayToken"));
		}
	});
}

/** 인트로로 강제로 이동하는 함수
 *
 */
var goToIntro = function() {
	M.data.removeGlobal(); // 모든 global 값 제거(초기화)

	MPage.html({ // 인트로 이동
		url: "../MCM/NMCM_4_1V.html",
		action: "CLEAR_TOP",
	});
}

/** 오케어몰 추천상품 캐시용 함수
 *
 */
// 카테고리 정보 및 순서
var categoryModel = [
	{functionality: "all", name: "전체"},
	{functionality: "1900", name: "BMI"},
	{functionality: "2200", name: "혈당"},
	{functionality: "2300", name: "혈압"},
	{functionality: "2400", name: "콜레스테롤"},
	{functionality: "1800", name: "중성지방"},
	{functionality: "0101", name: "간 수치"},
];

var categoryModel2 = {
	"all": "전체",
	"1900": "BMI",
	"2200": "혈당",
	"2300": "혈압",
	"2400": "콜레스테롤",
	"1800": "중성지방",
	"0101": "간 수치",
};

 var ocareMallRecommend = function(indicator){
	return new Promise((resolve, reject) => {
		// MData.removeStorage("OCARE_MALL_INFO"); // 구 API에 따른 캐시 삭제
		// let ocareMallCache = MData.storage("OCARE_MALL_CACHE");

		// TODO: 오케어몰 추천상품 이미지 변경으로 인해 캐싱 일시 해제, 이후 주석 풀 것
		// if(!ocareMallCache || !ocareMallCache.setDate || moment().diff(ocareMallCache.setDate, "day") >= 7){
			MNet.httpSend({
				path : "/mall/recommandGoods",
				data : { recordKey : MData.storage("RECORD_KEY"), pageSize: 5  },
				indicator : indicator && true,
				callback : function(receiveData){
					const goodsList = receiveData.goodsList;
					const goodsLists = goodsList.goodsLists;
					// 23.06.05 서버단 수정
                    const admRcmndGoodsList = receiveData.admRcmndGoodsList;
					let codeMap = "";
					//23.07.19 건강점수관련 분기코드(11:연동 O 이상없음 , 21:건강점수O(설문) 연동X , 31:설문X 연동X , 01:연동O 이상있음
					let rcmndStaCd = receiveData.rcmndStaCd;


					let cache = {
						functionality_all: goodsList.functionality_all,
						functionality_checkup: goodsList.functionality_checkup,
						allGoodsCount: goodsList.allGoodsCount,
						goodsListsFunctionalities: ["all"], // 캐시 리스트 기억용.
						setDate: moment().startOf("day"),
						goodsStr: "",
						codeMap : goodsList.functionCodeMap,
						rcmndStaCd,


					};

					// 이전에 캐시된 리스트들이 있으면 전부 삭제
					for(let i in categoryModel) {
						const model = categoryModel[i];
						const functionality = model.functionality;
						const cacheListNm = `OCARE_MALL_CACHE_LIST_${functionality}`;
						MData.removeStorage(cacheListNm);
					}

					let allGoods = {};


					// 새 캐시 리스트 생성(캐시된 내용이 많아지면 저장에 문제가 생길 수 있어서 리스트를 여러 개로 나눔)
					for(let i in goodsLists) {
						let goods = goodsLists[i];

						if(goods.functionality != "all") { // 전체 목록이 아닐 경우
							cache.goodsListsFunctionalities.push(goods.functionality);
						} else { // 전체 목록일 경우
							allGoods = goods;

							// 오케어몰 메인을 열 때 전송할 추천 상품 목록
							let goodsStr = "";

							const maxItems = 10; // 최대 개수
							let count = maxItems;

							if(goods.goodsList.length < maxItems) {
								count = goods.goodsList.length;
							}

							for(let j = 0; j < count; j++) {
								let g = goods.goodsList[j];
								if(j != 0) goodsStr += "^";
								goodsStr += g.goods;
							}

							cache.goodsStr = goodsStr;
						}
						allGoods.rcmndStaCd = rcmndStaCd;

						const cacheListNm = `OCARE_MALL_CACHE_LIST_${goods.functionality}`;

						MData.storage(cacheListNm, goods);
					}

					MData.storage("OCARE_MALL_CACHE", cache);
                    resolve({cache, allGoods, admRcmndGoodsList});
				},
				errorCallback: function() {
					Popup.alert("오케어몰 추천 상품 조회에 실패하였습니다.");
					reject();
				}
			});
		// }else{
		// 	resolve({cache: MData.storage("OCARE_MALL_CACHE"), allGoods: MData.storage("OCARE_MALL_CACHE_LIST_all")});
		// }
	});
};

// 키보드 사이즈
var KEYBOARD_HEIGHT = 0;
var HAS_KEYBOARD = "N";
var getKeyboardSizeCb = null;

/** 네이티브에서 키보드가 보이는지 여부와 사이즈를 알려 주는 함수(iOS 전용: 챗봇에서 사용)
 * @param {number} kbdHeight 현재 화면 내 키보드의 높이(픽셀)
 * @param {string} hasKbd 현재 키보드가 올라와 있는지 여부("Y"/"N")
 */
function getKeyboardSize(kbdHeight, hasKbd) {
	KEYBOARD_HEIGHT = kbdHeight;
	HAS_KEYBOARD = hasKbd;

	if(typeof getKeyboardSizeCb === "function") {
		getKeyboardSizeCb();
	}
}

const ROUTINE_PROCESS = {
	/** @type {boolean} 루틴 추가성공여부 */
	isInsertSuccess: false,
	/** @type {Object[]} 추가할 루틴 데이터 */
	insertRoutineData: null,
	/** @type {string|nuill} 건강관심목록 리스트 스트링 */
	myLifeList: null,
	/**
	 * 루틴 추가 프로세스
	 * @param {Object[]} routines 추가 루틴 리스트
	 * @param {string} userNo 유저번호
	 * @returns {PromiseFulfilledResult<{number}> | PromiseRejectedResult<{errorCode: object|string, errMsg: string, customMessage: string}>}
	 */
	insertRoutine(routines, userNo = MData.storage("USER_NO")){
		return new Promise((resolve, reject) => {
			if(routines instanceof Array && routines.length){
				this.insertRoutineData = routines;
			}else{
				console.error("추가할 루틴 정보를 입력");
				return;
			}

			const ROUTINE_ADD_PROCESS = [];
			if(this.isInsertSuccess == false) ROUTINE_ADD_PROCESS.push(this.sendInsert(userNo));
			if(/string/i.test(typeof this.myLifeList) == false) ROUTINE_ADD_PROCESS.push(this.getMyLifeList(userNo));

			Promise.all(ROUTINE_ADD_PROCESS)
			.then((result) => {
				// 건강기록 관심목록 수정
				let updateString = "";
				if(this.myLifeList){
					updateString = this.myLifeList;
					const copyString = this.myLifeList;
					for(let item of this.insertRoutineData){
						if(item.lifeRecYn == "Y"){
							switch(item.lifeRecType){
								case "ACTIVITY" :           // 걷기
									if(!/WK/.test(updateString)) updateString += `WK&1&chk01&ico ico-walk,`;      // 걸음
									else updateString = updateString.replace(/(.*)(WK\&)(0)(.*)/, "$1$21$4");
								break;
								case "BIKE" :               // 자전거
									if(!/EX/.test(updateString)) updateString += `EX&1&chk04&ico ico-exercise,`;  // 운동
									else updateString = updateString.replace(/(.*)(EX\&)(0)(.*)/, "$1$21$4");
								break;
								case "HIKING" :             // 하이킹
									if(!/EX/.test(updateString)) updateString += `EX&1&chk04&ico ico-exercise,`;  // 운동
									else updateString = updateString.replace(/(.*)(EX\&)(0)(.*)/, "$1$21$4");
								break;
								case "DRUG" :               // 복약 기록하기
									if(!/MC/.test(updateString)) updateString += `MC&1&chk10&ico ico-tablet,`;    // 복약
									else updateString = updateString.replace(/(.*)(MC\&)(0)(.*)/, "$1$21$4");
								break;
								case "MEAL" :               // 식단 기록하기
									if(!/ML/.test(updateString))updateString += `ML&1&chk02&ico ico-diet,`;       // 식사
									else updateString = updateString.replace(/(.*)(ML\&)(0)(.*)/, "$1$21$4");
								break;
								case "PULSE" :              // 심박수 확인하기
									if(!/PS/.test(updateString)) updateString += `PS&1&chk08&ico ico-bpm,`;       // 심박
									else updateString = updateString.replace(/(.*)(PS\&)(0)(.*)/, "$1$21$4");
								break;
								case "WEIGHT" :             // 몸무게 재기
									if(!/WT/.test(updateString)) updateString += `WT&1&chk03&ico ico-weight,`;    // 체중
									else updateString = updateString.replace(/(.*)(WT\&)(0)(.*)/, "$1$21$4");
								break;
								case "WAIST" :              // 허리둘레 재기
									if(!/WS/.test(updateString)) updateString += `WS&1&chk07&ico ico-waist,`;     // 허리둘레
									else updateString = updateString.replace(/(.*)(WS\&)(0)(.*)/, "$1$21$4");
								break;
								case "GLUCOSE" :            // 혈당 재기
									if(!/BS/.test(updateString)) updateString += `BS&1&chk05&ico ico-sugar,`;     // 혈당
									else updateString = updateString.replace(/(.*)(BS\&)(0)(.*)/, "$1$21$4");
								break;
								case "BLOODPRS" :           // 혈압재기
									if(!/BP/.test(updateString)) updateString += `BP&1&chk06&ico ico-pressure,`;  // 혈압
									else updateString = updateString.replace(/(.*)(BP\&)(0)(.*)/, "$1$21$4");
								break;
								case "SLEEP" :              // 수면
									if(!/SL/.test(updateString)) updateString += `SL&1&chk09&ico ico-sleep,`;     // 수면
									else updateString = updateString.replace(/(.*)(SL\&)(0)(.*)/, "$1$21$4");
								break;
							}
						}
					}

					// 아무것도 변동되지 않았을 때
					if(updateString !== copyString) updateString = "";
				}
				// 루틴 추가 완료 후 라이프레코드 루틴의 레코드를 건강관심목록 리스트에 밀어넣는다.
				Promise.allSettled([ this.updateMyLifeList(updateString, userNo),  SET_POINT_POCY("1002", userNo) ])
				.then((result) => {
					const [, {value: pointAmt = 0}] = result;
					resolve({pointAmt});
				})
			})
			.catch((error) => {
				console.error("insertRoutine", error);
				reject(error);
			});
		})
	},
	/** 루틴 추가 */
	sendInsert(userNo){
		return new Promise((resolve, reject) => {
			MNet.httpSend({
				path: "/routin/insertUserRoutin",
				data: { userNo, routins: this.insertRoutineData },
				indicator: false,
				callback: () => resolve(this.isInsertSuccess = true),
				errorCallback: (errorCode, errorMsg) => reject({errorCode, errorMsg, customMessage : "루틴 추가 중 오류가 발생하였습니다."})
			});
		});
	},
	/** 건강관심목록 조회 */
	getMyLifeList(userNo){
		return new Promise((resolve, reject) => {
			if(this.myLifeList == null){
				MNet.httpSend({
					path : '/main/selectDailyRecordInfo',
					data : { userNo },
					indicator : false,
					callback: (receivedData) => resolve(this.myLifeList = (receivedData.resultInfo || {}).USE_RECORD || ""),
					errorCallback: (errorCode, errorMsg) => reject({errorCode, errorMsg, customMessage : "건강관심 목록 조회 중 오류가 발생하였습니다."})
				});
			}else{
				resolve();
			}
		});
	},
	/** 건강관심목록 업데이트 */
	updateMyLifeList(recordString, userNo){
		return new Promise((resolve, reject) => {
            if(recordString.length == 0) resolve();
            else{
                MNet.httpSend({
                    path : "/main/updateDailyRecord",
                    data : { userNo, useRecord: recordString },
					indicator: false,
                    callback: resolve,
                    errorCallback: (errorCode, errorMsg) => reject({errorCode, errorMsg, customMessage : "건강관심 목록 수정 중 오류가 발생하였습니다."})
                });
            }
        });
	},
}

/**
 * 포인트 발급 요청
 * @param {string} pointCd
 * @param {string} userNo
 * @returns {PromiseFulfilledResult<number>} 포인트 지급량
 */
const SET_POINT_POCY = (pointCd, userNo) => {
	//TODO: 루틴 포인트 지급으로 온보딩 미션달성 히스토리 갱신으로 무조건 실행
	if(false && MData.storage("FIRST_ROUTIN_INSERT") == "true") return Promise.resolve(0);
	/**
	 * 포인트 지급 성공 여부 체크
	 * @param {Object} receiveData 포인트 지급 요청 결과 데이터
	 * @param {Boolean} isShowPopup 즉시 팝업 여부 false 면 에러메세지 receiveData.errMsg 에 실어드림
	 * @param {String} defaultErrMsg 기본 에러메세지
	 * @returns {Boolean} true면 receiveData.pntAmt 포인트 지급 금액 떨궈드림
	 */
	const responseUpdate = (receiveData, isShowPopup = true, defaultErrMsg = "포인트 지급에 실패하였습니다.") => {
		// 서버결과 정상
		if(receiveData instanceof Object){
			let {rtnCd, rtnMsg, resultMap = {}, missionRtnCd, missionRtnMsg, pntPocyCdYn} = receiveData;
			let errMsg;

			const ENUM_ERR_MSG = Object.freeze({
				"9011" : "포인트 지급 대상이 아닙니다.",
				"9013" : "이미 지급된 포인트 이력이 있습니다.",
				"9014" : "CPS 포인트 지급 오류.",
				"9015" : "포인트 지급 정보 등록 오류."
			});

			if(/^0{4}$/.test(rtnCd)){
				let {pntAmt, resultCode} = resultMap;
				// 정상지급
				if(/^200$/.test(resultCode) || /Y/.test(pntPocyCdYn)){
					receiveData.pntAmt = pntAmt;
					return true;
				}else{
					errMsg = ENUM_ERR_MSG[resultCode] || rtnMsg || defaultErrMsg;
					isShowPopup ? Popup.alert(errMsg) : receiveData["errMsg"] = errMsg;
				}
			}else{
				errMsg = missionRtnMsg ? missionRtnMsg : ENUM_ERR_MSG[missionRtnCd] || rtnMsg || defaultErrMsg;
				isShowPopup ? Popup.alert(errMsg) : receiveData["errMsg"] = errMsg;
			}
		}else{
			isShowPopup ? Popup.alert(defaultErrMsg) : undefined;
		}

		return false;
	}
	return new Promise(resolve => {
		const response = (receiveData) => {
			if(/^1002$/.test(pointCd)) MData.storage("FIRST_ROUTIN_INSERT", "true");
			responseUpdate(receiveData, false);
			resolve(receiveData.pntAmt || 0);
		}

		MNet.httpSend({
			path : /^1002$/.test(pointCd) ? '/routin/insertRoutinIssuPoint' : '/main/saveIssuPoint',
			data : { userNo, pointCd, pointDt : moment().format("YYYYMMDD") },
			callback : response,
			errorCallback : response
		});
	})
}

/**
 * 캐싱 데이터 불러옴
 * @param {string} name 스토리지 데이터 키 네임
 * @returns {any|PromiseFulfilledResult<any>}
 */
const getCacheData = (name, {userNo = MData.storage("USER_NO"), recordKey, compCd}) => {
	const storageData = MData.storage(name);
	if(storageData){
		return storageData;
	}else{
		return new Promise((resolve, reject) => {
			switch(name){
				case "TARGETSTEP":
					const initTargetSteps = () => {
						let targetSteps = 0;
						const age = Number(MData.storage("AGE_CD"));
						if(age < 60) MData.storage("TARGETSTEP", targetSteps = 7500);
						else if(age < 70) MData.storage("TARGETSTEP", targetSteps = 5000);
						else MData.storage("TARGETSTEP", targetSteps = 3000);
						resolve(targetSteps);
					}

					MNet.httpSend({
						path: "/routin/selectRoutinMain",
						data: {userNo, recordKey: MData.storage("RECORD_KEY"), routinDt: moment().format("YYYYYMMDD"), companyCd: MData.storage("COMPANY_CD")},
						callback: (receiveData) => {
							const userRoutineList = receiveData.userRoutinList || [];
							const strgth = (userRoutineList.find(item => item == "100002") || {}).strgth;
							if(/string/i.test(typeof strgth)) resolve(strgth);
							else initTargetSteps();
						},
						errorCallback: initTargetSteps
					});
				break;
				case "MYRECORD":
					MNet.httpSend({
						path : '/main/selectDailyRecordInfo',
						data : { userNo },
						indicator : false,
						callback: (receivedData) => resolve((receivedData.resultInfo || {}).USE_RECORD || ""),
						errorCallback: () => resolve("")
					});
				break;
				default:
					resolve();
				break;
			}
		});
	}
}

/**
 * 현재 버전과 목표 버전 이상인지 체크
 * @param {string[]} currentVersion ex: ['1', '2', '1'] -> [메이저 버전 넘버, 마이너 버전 넘버, 패치 버전 넘버]
 * @param {string[]} targetVersion ex: ['1', '2', '12'] -> [메이저 버전 넘버, 마이너 버전 넘버, 패치 버전 넘버]
 */
const getIsVersionCompare = (currentVersion = MInfo.app("app.version").split(/\./), targetVersion) => {
	if((currentVersion instanceof Array && targetVersion instanceof Array) == false){
		console.error("타입 에러");
		return false;
	}

	const maxLength = Math.max(currentVersion[0].length, targetVersion[0].length);
	const sqr = maxLength * 10 ** (maxLength - 1);
	const curValue = currentVersion[0] * sqr;
	const targetValue = targetVersion[0] * sqr;

	// 상위 버전이 높으면 true, 같으면 하위 버전 체크를 위한 재귀호출
	return curValue > targetValue || curValue == targetValue && (targetVersion[1] == undefined || currentVersion[1] !== undefined && getIsVersionCompare(currentVersion.slice(1), targetVersion.slice(1)));
}

const PLATFORMS = {
	connectCnt: 0,
	/** @type {boolean} 연동 상태 값 */isConnect: true,
	userNo: null, recordKey: null,
	/** @type {"SAMSUNG_HEALTH" | "HEALTH_KIT" | "GOOGLE_FIT" | ""} */
	USE_PLATFORM: null,
	/** @type { {resolve: function, reject: function}[] } 프로미스 응답 함수 저장 */
	syncPromiseArray: [],
	/** @type {number|null} */
	weight: null,
	/**
	 * 앱 연동 권한 체크 후 앱 데이터 send ex: PLATFORMS.allProcess("ALL");
	 * @param {string} type "ALL"(전체) / "ALL2"(기존 연동) / "EX"(기존 연동 운동만 + 추가 운동) / 그 외 ex: "steps" (특정 하나만 단 기존 연동만 가져온다.)
	 * @param {boolean} [isWait = true] 서버 전송까지 기다릴지 여부 true 연동정보 서버 전송 콜백까지 기다림, false 서버에는 전송하고 콜백은 따로 안기다림
	 * @param {string} USE_PLATFORM 미연동 상태시 체킹을 위함 안넣으면 Android(SAMSUNG_HEALTH), IOS(HEALTH_KIT) 으로 간주함 GOOGLE_FIT 이면 필수로 넣을 것
	 * @param {string?} userNo 스토리지 덜 쓰려면 넣기
	 * @param {string?} recordKey 스토리지 덜 쓰려면 넣기
	 */
	allProcess(type, isWait = true, USE_PLATFORM = MData.storage("USE_PLATFORM"), userNo = MData.storage("USER_NO"), recordKey = MData.storage("RECORD_KEY")){
		this.USE_PLATFORM = this.USE_PLATFORM || USE_PLATFORM;
		if(Boolean(this.USE_PLATFORM) == false){
			this.USE_PLATFORM = /android/i.test(M.info.device("os.name")) ? "SAMSUNG_HEALTH" : "HEALTH_KIT";
			this.isConnect = false;
		}

		if(this.USE_PLATFORM){
			return new Promise((resolve, reject) => {
				this.plathformCheck()
				.then(() => this.permissionChk())
				.then(() => this.platformDataSend(type, isWait, this.USE_PLATFORM, userNo, recordKey))
				.then(resolve)
				.catch(function(){
					reject(...arguments);
				});
			});
		}else{
			return Promise.reject({customErrMsg: "플랫폼 미연동"});
		}
	},
	/**
	 * 연동 앱 체크 -> 연동 앱 상태 체크
	 * @returns {PromiseFulfilledResult<> | PromiseRejectedResult<{customErrMsg: string}>}
	 */
	plathformCheck(){
		return new Promise((resolve, reject) => {
			M.execute("exWNOnChkHealthKit", this.USE_PLATFORM, M.response.on((result) => {
				if(result instanceof Object){
					const connectCnt = this.connectCnt;
					this.connectCnt = 0;
					if(result instanceof Object && result.code == "success"){ // 커넥트 가능여부
						resolve();
					}else if(result.code == "not_available"){ // 연동 앱 미설치
						let confirmMsg;
						let alertMsg;
						let packageName;
						if(clickPlatform == "GOOGLE_FIT") {
							confirmMsg = "Google 피트니스 앱 설치가 필요합니다. 설치하시겠습니까?";
							packageName = 'com.google.android.apps.fitness';
							alertMsg = "Google 피트니스 앱 설치 후 연동이 가능합니다.";
						} else {
							confirmMsg = "Samsung Health 앱 설치가 필요합니다. 설치하시겠습니까?";
							packageName = "com.sec.android.app.shealth";
							alertMsg = "Samsung Health 앱 설치 후 연동이 가능합니다.";
						}

						Popup.confirm({
							message: confirmMsg,
							callback: (idx) => {
								if(idx == 0) MApps.store(packageName);
								else Popup.alert(alertMsg);
							}
						});
						reject({customErrMsg: "연동 앱 미설치"});
					}else if(connectCnt == 0){ // 1회 한해서 재연결 시도
						this.connectCnt++;
						this.plathformCheck().then(resolve).catch(reject);
					}else{
						reject({customErrMsg: "연동 불가"});
					}
				}else{
					reject({customErrMsg: `데이터 에러`});
				}
			}));
		});
	},
	/**
	 * 앱 퍼미션 요청
	 * @returns {PromiseFulfilledResult<> | PromiseRejectedResult<{customErrMsg:string}>}
	 */
	permissionChk(){
		return new Promise((resolve, reject) => {
			M.execute("exWNOnReqHealthKit", this.USE_PLATFORM, M.response.on((result) => {
				if(result instanceof Object && result.code == "success") resolve();
				else reject({customErrMsg: "권한 미부여"});
			}).toString());
		});
	},
	/**
	 * @param {string} type "ALL"(전체) / "ALL2"(기존 연동) / "EX"(기존 연동 운동만 + 추가 운동) / 그 외 ex: "steps" (특정 하나만 단 기존 연동만 가져온다.)
	 * @param {boolean} [isWait = true] 서버 전송까지 기다릴지 여부 true 연동정보 서버 전송 콜백까지 기다림, false 서버에는 전송하고 콜백은 따로 안기다림
	 * @param {string} USE_PLATFORM 미연동 상태시 체킹을 위함 안넣으면 Android(SAMSUNG_HEALTH), IOS(HEALTH_KIT) 으로 간주함 GOOGLE_FIT 이면 필수로 넣을 것
	 * @param {string?} userNo 스토리지 덜 쓰려면 넣기
	 * @param {string?} recordKey 스토리지 덜 쓰려면 넣기
	 * @returns {PromiseFulfilledResult|PromiseRejectedResult<{customMessage: string}>}
	 */
	async platformDataSend(type, isWait = true, USE_PLATFORM = MData.storage("USE_PLATFORM"), userNo, recordKey){
		const isRealApp = Definition.SERVER_TYPE == "PROD";

		if(Boolean(userNo) == false) userNo = this.userNo = this.userNo ? this.userNo : MData.storage("USER_NO");
		if(Boolean(recordKey) == false) recordKey = this.recordKey = this.recordKey ? this.recordKey : MData.storage("RECORD_KEY");

		let osName = M.info.device("os.name");
		let appVersion = MInfo.app("app.version").split(/\./); // 현재 앱 버전
		let targetVersion = (/android/i.test(osName) ? "1.1.6" : "1.2.2").split(/\./); // 비교 대상 버전

		/** @type {boolean} 운영앱이 아니거나 운영앱에 특정버전 이상이면 async 방식으로 연동정보를 가져옴 */
		const isNewSync = !isRealApp || getIsVersionCompare(appVersion, targetVersion);
		this.USE_PLATFORM = this.USE_PLATFORM || USE_PLATFORM || (/android/i.test(osName) ? "SAMSUNG_HEALTH" : "HEALTH_KIT");

		const nomalRecrodReg = /^(weight|steps|running|cycling|hiking|glucose|blood_pressure|heart_rate|sleep)$/;
		const motionSamsungReg = /golf|basketball|climbing|badminton|bowling|swimming|baseball|aerobic|jumprope|soccer|tabletennis|tennis|boxing|squash|yoga|pilates|treadmill/;
		const motionAppleReg = /stairs|golf|strengthtraining|basketball|climbing|badminton|swimming|baseball|jumprope|soccer|tabletennis|tennis|boxing|squash|yoga|pilates/;
		const motionAllReg = new RegExp(motionSamsungReg.source + motionAppleReg.source);

		/**
		 * 연동 키 배열 반환
		 * @param {"NOMAL_ALL" | "NOMAL_EX" | "EX_SAMSUNG" | "EX_APPLE"} name
		 */
		const getSyncKeys = (name) => {
			switch(name){
				case "NOMAL_ALL": return ["steps", "weight", "running", "cycling", "hiking", "glucose", "blood_pressure", "heart_rate", "sleep"];
				case "NOMAL_EX": return ["steps", "running", "cycling", "hiking"];
				case "EX_SAMSUNG": return ["golf", "basketball", "climbing", "badminton", "bowling", "swimming", "baseball", "aerobic", "jumprope",  "soccer",
				"tabletennis", "tennis", "boxing", "squash", "yoga", "pilates", "treadmill"];
				case "EX_APPLE": return ["stairs", "golf", "strengthtraining", "basketball", "climbing", "badminton", "swimming", "baseball", "jumprope",
				"soccer", "tabletennis", "tennis", "boxing", "squash", "yoga", "pilates"];
				default: return [];
			}
		}

		if(isNewSync == false && new RegExp("EX|" + motionAllReg.source).test(type)) return Promise.reject({customErrMsg: "과거 버전은 추가 운동 연동이 없습니다."});

		let /** @type {string[]} 기본 연동 키 */syncKeyArray = [], /** @type {string[]} 추가운동 연동 키 */exerciseArray = [];
		if(/^all\d?$/i.test(type)){ // 전체 조회
			syncKeyArray = getSyncKeys("NOMAL_ALL");
			if(/^all2$/i.test(type) == false){ // ALL2 운동 제외
				if(/SAMSUNG_HEALTH/.test(this.USE_PLATFORM)) exerciseArray = getSyncKeys("EX_SAMSUNG");
				else if(/HEALTH_KIT/.test(this.USE_PLATFORM)) exerciseArray = getSyncKeys("EX_APPLE");
				else return Promise.reject({customErrMsg: "추가 운동 연동 가능한 플랫폼이 아닙니다"});
			}
		}else if(/^ex$/i.test(type)){ // 운동만 조회
			syncKeyArray = getSyncKeys("NOMAL_EX");
			if(/SAMSUNG_HEALTH/.test(this.USE_PLATFORM)) exerciseArray = getSyncKeys("EX_SAMSUNG");
			else if(/HEALTH_KIT/.test(this.USE_PLATFORM)) exerciseArray = getSyncKeys("EX_APPLE");
			else return Promise.reject({customErrMsg: "추가 운동 연동 가능한 플랫폼이 아닙니다"});
		}else if(/string/i.test(typeof type) && type.length){ // 개별 조회
			// 기존 연동일 경우
			if(nomalRecrodReg.test(type)) syncKeyArray = [type];
			// 삼성헬스 운동인 경우
			else if(/SAMSUNG_HEALTH/.test(this.USE_PLATFORM) && motionSamsungReg.test(type)) exerciseArray = [type];
			// 애플건강 운동인 경우
			else if(/HEALTH_KIT/.test(this.USE_PLATFORM) && motionAppleReg.test(type)) exerciseArray = [type];
			else return Promise.reject({customErrMsg: "입력한 키가 매칭되지 않습니다."});
		}else return Promise.reject({customErrMsg: "입력한 키가 매칭되지 않습니다."});

		/** @type {string[]} 모든 연동 키 */
		const syncAllArray = [...syncKeyArray, ...exerciseArray];

		/** 네이티브 함수에서 Task Queue로 올려받을 함수명 */
		const callbackName = "PLATFORMS.nativeCallback";

		/** @type { PromiseSettledResult[] } 네이티브 연동 콜백 함수가 전부 올라왔는지 확인하는 프로미스 배열 */
		const process = [];

		/** @type {object} 마지막 연동 날짜 syncDate["SH|AH|GF" + type] = Date("YYYY-MM-DD HH:mm:ss +0900") */
		let syncDate = MData.storage("PLAT_SYNC_DATE");

		const dateFormat = "YYYY-MM-DD HH:mm:ss ZZ"; // 네이티브에 전송할 연동 시작 시간 포멧

		const curDt = moment();
		/** @type {string} 오늘로 부터 한달 전 날짜 */
		const onePrevMonthDt = curDt.clone().subtract(1, "month").format(dateFormat);
		/** @type {string} 연동 시도 날짜 */
		const endDate = moment().utcOffset(540).format(dateFormat);

		const ENUM_SEP = { SAMSUNG_HEALTH: "SH", GOOGLE_FIT: "GF", HEALTH_KIT: "AH" };
		const SEP = ENUM_SEP[this.USE_PLATFORM] + "_";

		/** @type {boolean} 해당 기록이 클라이언트에 없는 경우 서버에서 가져온다. */
		let isServerSync = false;

		// 과거 버전이면 날짜 캐싱 안돌림
		if(isNewSync){
			// storage에 저장되있는 연동 날짜가 있으면 그대로 사용, 스토리지에 연동할려는 정보가 없으면 서버 연결 시도
			if(syncDate instanceof Object){
				for(let i=0, size=syncAllArray.length; i<size; i++){
					let key = SEP + syncAllArray[i];
					if(syncDate.hasOwnProperty(key) == false){
						isServerSync = true;
						break;
					}
				}
			}else{
				syncDate = {};
				isServerSync = true;
			}
			// 서버에서 마지막 연동 날짜를 가져온다.
			if(isServerSync){
				const result = await this.getHealthPlatformTime(userNo);
				let sepReg = new RegExp(SEP);
				result.forEach(item => {
					if(sepReg.test(item.SEP) && syncDate.hasOwnProperty(item.SEP) == false) syncDate[item.SEP] = `${item.MOD_DT} +0900`;
				});
			}
			// 연동 마지막 날짜가 없거나, 한 달이 지났으면 한 달로 초기화 하여 한 달전부터 시작한다.
			for(let i=0, size=syncAllArray.length; i<size; i++){
				let timeItem = syncDate[SEP + syncAllArray[i]];
				if(timeItem === undefined || curDt.diff(moment(timeItem, dateFormat), "months", true) > 1) syncDate[SEP + syncAllArray[i]] = onePrevMonthDt;
			}
		}

		const syncTotalCnt = syncKeyArray.length + exerciseArray.length;
		if(syncTotalCnt == 0) return Promise.reject({customErrMsg: "연동할 데이터가 없습니다."});

		if(this.weight === null && new RegExp("ALL|EX|running|cycling|hiking" + motionAllReg.source, "i").test(type)) this.weight = Number(MData.storage("WEIGHT"));

		this.syncPromiseArray.splice(0);
		if(isNewSync == false){
			// targetVersion 이전 과거 버전일 때 exWNGetHealthRecords(JSONString, callbackName)과 exWNWorkout 확장함수가 없단 마인드, 동기식 연속 호출
			for(let i = 0, size = syncKeyArray.length; i < size; i++){
				process.push( new Promise((resolve, reject) => this.syncPromiseArray.push({resolve, reject})) );
				M.execute("exWNGetHealthRecords", this.USE_PLATFORM, syncKeyArray[i], callbackName);
			}
		}else{
			for(let i=0; i < syncTotalCnt; i++) process.push(new Promise((resolve, reject) => this.syncPromiseArray.push({resolve, reject})));

			// 기존 연동 GET async
			if(syncKeyArray.length){
				M.execute("exWNGetHealthRecords", JSON.stringify({works: syncKeyArray.map(key => {
					return {
						type: key,
						startDate: syncDate[SEP + key],
						endDate,
						callback: callbackName
					}
				})}), callbackName);
			}
			// 운동 연동 GET sync
			if(exerciseArray.length){
				M.execute("exWNWorkout", JSON.stringify({works: exerciseArray.map(key => {
					return {
						type: key,
						startDate: syncDate[SEP + key],
						endDate,
						callback: callbackName
					}
				})}), callbackName);
			}
		}

		/** @type {number} 앱 연동 타임아웃 콜스택 넘버 */
		let callStackNumber;
		// 네이티브에서 받은 모든 연동 데이터 서버에 집어던진다.
		return new Promise((resolve, reject) => {
			callStackNumber = setTimeout(() => reject({customErrMsg: "앱 연동 타임아웃"}), 30000);
			Promise.allSettled(process)
			.then((result) => {
				/** 네이티브 키, 라이프 서버 키 매칭 */
				const nKeyTosKey = {"weight": "comp", "steps": "activity", "running": "run", "cycling": "bike", "hiking": "hiking", "glucose": "glucose", "blood_pressure": "blood", "heart_rate": "pulse", "sleep": "sleep"};

				// 앱 연동정보를 서버 전송 규격에 맞춤
				const {nomalRecord, motionRecord} = result.reduce((obj, {value, status, reason}) => {
					if(status == "rejected"){
						console.error("exWNGetHealthRecords Data Error:", reason);
						return obj;
					}
					else{
						const {type, data: sendRecord = {}} = value;
						const {entries = []} = sendRecord;
						if(entries.length == 0) return obj;
						else{
							const serverKey = nKeyTosKey[type];
							if(nomalRecrodReg.test(type)) obj.nomalRecord[serverKey] = [sendRecord]; // 기존연동
							else obj.motionRecord.push(sendRecord); // 운동
							return obj;
						}
					}
				}, {nomalRecord: {}, motionRecord: []});

				// 서버에 전송할 마지막 날짜 데이터 규격 생성, 스토리지에 저장할 규격 생성
				const serverEndDate = moment(endDate, dateFormat).format("YYYY-MM-DD HH:mm:ss");
				const {saveHalthPlatformTimes, healthPlatform} = syncAllArray.reduce((obj, item) => {
					const key = SEP + item;
					obj.saveHalthPlatformTimes[key] = endDate;
					obj.healthPlatform.push({ sep: key, userNo, datetime: serverEndDate });
					return obj;
				}, {saveHalthPlatformTimes: {}, healthPlatform: []});

				const options = {
					path: "/cmm/asyncRecord",
					data: { userNo, recordKey, data: {healthPlatform, ...nomalRecord} },
					indicator: false
				}

				if(motionRecord.length) options.data.motionRecord = motionRecord;

				const lastProcess = (promise, args) => {
					clearTimeout(callStackNumber);
					MData.storage("PLAT_SYNC_DATE", Object.assign(syncDate, saveHalthPlatformTimes)); // 마지막 연동 시간 캐싱
					// 미연동 상태였으면 연동처리
					if(this.isConnect === false){
						this.isConnect = true;
						MData.storage("HAS_PLATFORM_CONN", "Y");
						MData.storage("USE_PLATFORM", this.USE_PLATFORM);
						MData.storage("USE_PLATFORM_DATE", moment().format("YYYY.MM.DD"));
						//SET_POINT_POCY("R11", userNo).then((pntAmt) => promise(pntAmt)); 앱 연동 포인트 발급 요청 각 화면마다 팝업 조건 같은게 다르니 주석처리 해놓음
						promise(args);
					}else{
						promise(args);
					}
				}

				if(isWait == true) Object.assign(options, {callback: function(){ lastProcess(resolve); }, errorCallback: function(){ lastProcess(reject, arguments);}});
				MNet.httpSend(options);
				if(isWait == false) lastProcess(resolve);
			})
			.catch((error) => {
				console.error("ALL FAILED:", error);
				clearTimeout(callStackNumber);
				reject({customErrMsg: error.toString()});
			});
		});
	},
	/**
	 * 네이티브 콜백 함수
	 */
	async nativeCallback(result){
		const _this = PLATFORMS;
		if(_this.syncPromiseArray.length == 0) return;

		const {resolve, reject} = _this.syncPromiseArray.pop();
		if(result instanceof Object == false){
			reject("데이터 오류");
			return;
		}

		const {code, type, data: {entries = []} = {}} = result;
		if(code != "success"){
			reject(result);
			return;
		}

		let resolveBlock = false;
		if(entries.length){
			let minute = 1000 * 60;
			let weight = _this.weight;
			// 소모 칼로리 공식 = [MET * (0.0035 * 체중 * 운동시간)] * 5
			switch(type){
				case "steps": // 걸음 -> 걸음수 칼로리 공식 = 걸음수 * 0.04
					entries.forEach((item) => { item.calories.value = item.steps * 0.04;  });
				break;
				case "running": // 달리기
					entries.forEach(item => { item.calories.value = (12.9 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "cycling": // 자전거
					entries.forEach(item => { item.calories.value = (7.1 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "hiking": // 하이킹
					entries.forEach(item => { item.calories.value = (11.6 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "glucose": // 혈당
					const USE_PLATFORM = _this.USE_PLATFORM = _this.USE_PLATFORM ? _this.USE_PLATFORM : MData.storage("USE_PLATFORM");
					if(USE_PLATFORM == "SAMSUNG_HEALTH"){
						entries.forEach(item => {
							if(item.timing.when == "80001"){
								item.timing.when = "AC"; // 공복
							}else if(item.timing.when == "80012"){
								item.timing.when = "HS"; // 평상시는 선택안함으로 해서 직접 입력하도록 함
							}else if(item.timing.when == "80013") {
								item.timing.when = "HS"; // 취침전은 선택안함으로 해서 직접 입력하도록 함
							}else if(item.timing.when == "80002"){
								item.timing.when = "PCM"; // 식후
							}else if(item.timing.when == "80011"){
								item.timing.when = "ACM"; // 식전
							}
						});
					}
				break;
				case "blood_pressure": // 혈압
					entries.forEach(item => { item.pulseRate.value = Math.max(30, item.pulseRate.value); });
				break;
				case "heart_rate": // 심박수
					// 안정시(1), 평상시(0) -> 안정시 거르고 평상시만 넣음
					result.data.entries = entries.filter(item => item.kind == 0);
				break;
				case "sleep": // 수면
					// 수면 등록 시 만족감(safety)은 3점으로 등록
					entries.forEach(item => { if(item.safety == 0) item.safety = 3; });
				break;
				case "weight": // 몸무게
					// BMI: 몸무게 / (키 * 키 / 10000)
					const userNo = _this.userNo = _this.userNo ? _this.userNo : MData.storage("USER_NO");
					const recordKey = _this.recordKey = _this.recordKey ? _this.recordKey : MData.storage("RECORD_KEY");
					resolveBlock = true;
					MNet.httpSend({
						path: "/survey/selectSurveyAndClinicsInfo",
						data: {userNo, recordKey},
						indicator: false,
						callback: receivedData => {
							let height = (receivedData.surveyData || {}).QESTN2_1;
							const {entities} = receivedData.clinicData || {};
							if(entities instanceof Array){
								if(entities[0] instanceof Object && entities[0].sections instanceof Array){
									const section = entities[0].sections.find(item => item instanceof Object && item.category instanceof Object && item.category.displayName == "기타");
									if(section instanceof Object && section.results instanceof Array){
										for(let i=0, size=section.results.length; i<size; i++){
											let item = section.results[i];
											if(item instanceof Object && item.result instanceof Object && item.result.code == "resHeight"){
												height = item.result.text;
												break;
											}
										}
									}
								}
							}
							MData.storage("weight", _this.weight = Number(entries[0].weight.value));
							entries.forEach(item => {
								item.bmi = { value: (item.weight.value / (height ** 2 / 10000)).toFixed(1), unit: "kg/m2" };
							});
							resolve(result);
						},
						errorCallback: reject
					});
				break;
				case "golf": // 골프
					entries.forEach(item => { item.calories.value = (4 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "stairs": // 계단
					entries.forEach(item => { item.calories.value = (6 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "strengthtraining": // 근력운동
					entries.forEach(item => { item.calories.value = (2.5 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "basketball": // 농구
					entries.forEach(item => { item.calories.value = (8 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "climbing": // 등산
					entries.forEach(item => { item.calories.value = (11.6 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "badminton": // 배드민턴
					entries.forEach(item => { item.calories.value = (4 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "bowling": // 볼링
					entries.forEach(item => { item.calories.value = (2.5 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "swimming": // 수영
					entries.forEach(item => { item.calories.value = (8.9 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "baseball": // 야구
					entries.forEach(item => { item.calories.value = (4 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "aerobic": // 에어로빅
					entries.forEach(item => { item.calories.value = (6 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "yoga": // 요가
					entries.forEach(item => { item.calories.value = (3.2 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "jumprope": // 줄넘기
					entries.forEach(item => { item.calories.value = (11.4 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "soccer": // 축구
					entries.forEach(item => { item.calories.value = (7 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "tabletennis": // 탁구
					entries.forEach(item => { item.calories.value = (6 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "tennis": // 테니스
					entries.forEach(item => { item.calories.value = (7 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "boxing": // 복싱
					entries.forEach(item => { item.calories.value = (7.8 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "squash": // 스쿼시
					entries.forEach(item => { item.calories.value = (12 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "pilates": // 필라테스
					entries.forEach(item => { item.calories.value = (3 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
				case "treadmill": // 런닝머신
					entries.forEach(item => { item.calories.value = (9 * (0.0035 * weight * Math.floor( (new Date(item.period.to) - new Date(item.period.from)) / minute ) )) * 5; });
				break;
			}
		}
		if(resolveBlock == false) resolve(result);
	},
	/**
	 * 서버에 저장되있는 연동 날짜 가져옴
	 * @returns {PromiseFulfilledResult<{MOD_DT: string, SEP: string}[]>}
	 */
	getHealthPlatformTime(userNo = MData.storage("USER_NO")){
		return new Promise((resolve) => {
			MNet.httpSend({
				path : '/cmm/selectHealthPlatform',
				data: { userNo },
				indicator: false,
				callback: (receiveData) => {
					resolve(receiveData.data || []);
				},
				errorCallback: () => resolve([])
			});
		});
	}
}

/**
 * 메디엔 웹뷰 접근 공통
 */
const Medin = {
	/** @type {string?} 오케어앱 버전 */
	appVersion: null,
	/** @type {string?} 메디엔 웹뷰 접근 키 */
	inKey: null,
	/** @type {boolean} 페이지 이동 여부 M.onHide 에서 인디케이터 hide */
	isPageMove: false,
	/**
	 * 메디엔 웹뷰 모피어스 웹으로 이동
	 * @param {string} id 메디엔 접근 경로 id
	 * @param {string?} userNo 메모리에 있으면 스토리지 미사용
	 */
	async goWebviewPage(id, userNo){
		if(id === ""){
			Popup.alert("메디엔 서비스 개발중입니다.");
			return;
		}

		exIndicator.show();
		if(this.inKey === null){
			this.inKey = MData.storage("MediNInKey");
			try{
				if(Boolean(this.inKey) == false){
					MData.storage("MediNInKey", this.inKey = await this.getInKey(userNo || MData.storage("USER_NO")));
					exIndicator.hide();
				}
			}catch(error){
				exIndicator.hide();
				console.error(error);
				Popup.alert("메디앤 페이지 정보 조회에 실패하였습니다.");
				return;
			}
		}
		this.isPageMove = true;
		//2023.05.02 에임매드 애저인사이트 로그 추가
		appInsights.trackEvent({
			name: 'btn_medical_checkup_aimmed',
			  properties: {
			  viewPage: document.title,
			  eventType: 'medical_checkup',
			  moveToPage : 'aimmed'
			}
		});
		providerWorking.check(Definition.PROVIDER_MEDI_N).then(async () => {
            MPage.html(`${Definition.MEDIN_PAGE_URL}?inKey=${encodeURIComponent(this.inKey)}&to=${id}&by=ocare&ver=${this.appVersion = this.appVersion || MInfo.app("app.version")}&msg=&ext=`);
        });

	},
	/**
	 * 메디엔 접근 키 가져오기
	 * @param {string} userNo
	 * @returns {PromiseFulfilledResult<string> | PromiseRejectedResult<any>}
	 */
	getInKey(userNo = MData.storage("USER_NO")){
		return new Promise((resolve, reject) => {
			MNet.httpSend({
				path: '/mall/userInfo',
				data: { userNo, providerId: Definition.PROVIDER_MEDI_N },
				indicator: false,
				callback: (receiveData) => {
					if(receiveData.result instanceof Object && receiveData.result.data instanceof Object && typeof receiveData.result.data.output == 'string'){
						resolve(receiveData.result.data.output);
					}else{
						reject(receiveData);
					}
				},
				errorCallback: (response, message) => {
					if(response instanceof Object){
						reject(response);
					}else{
						reject({response, message});
					}
				}
			});
		});
	}
}

/**
 * 타 서비스 시스템 점검 확인
 */
const providerWorking = {
	/**
	 * 서비스 점검상태 확인 리턴 값이 true면 정상서비스, false면 점검 혹은 에러
	 * @async
	 * @param {string} providerId
	 * @param {boolean} isFullPopup
	 * @param {object} providerParam
	 * @returns {Promise<boolean>}
	 */
	check(providerId, providerParam = {}, isFullPopup = true){
		return new Promise((resolve, reject) => {
			this.getPrvWorkingData(providerId, providerParam).then((resultList) => {
				if(resultList instanceof Array){
					const selectItem = resultList.find(item => item.providerId === providerId);
					if(selectItem instanceof Object){
						if(isFullPopup){
							MPage.html({
								url: "../MCM/NMCM_3_2V.html",
								param: { params: selectItem, providerParam : providerParam}
							});
						}
						reject(providerId + ", not working"); // 시스템 점검중
					}else{
						resolve(true); // 이쪽만 정상 서비스 진행중
					}
				}else{
					Popup.alert("시스템 오류입니다.");
					reject("resultList TypeError");
				}
			})
			.catch((reason) => {
				Popup.alert("시스템 오류입니다.");
				reject("통신 에러");
			});
		});
	},
	/**
	 * 프로바이더 ID기준으로 프로바이더의 해당 서비스가 지원중인지 체크
	 * @async
	 * @param {string} providerId
	 * @returns {Promise<object[] | undefined>}
	 */
	getPrvWorkingData(providerId, providerParam){
		let noticeTypeCd = typeof providerParam?.noticeTypeCd == "undefined" ? null : providerParam?.noticeTypeCd;
		return new Promise((resolve, reject) => {
			MNet.httpSend({
				path: "/prvcmm/workingSchedule",
				data: { providerId , noticeTypeCd},
				callback: (receiveData) => resolve(receiveData.resultList),
				errorCallback: () => reject("통신 에러")
			});
		});
	}
};

function mvFoodPage(dataPge){
	MPage.html({
        url : dataPge,
        param : {
            modifyYn : "N"
        }
    });
}

function shakeCb() {
    $(".progress").removeClass("on");
	let keyName = (M.navigator.device("ios") || M.navigator.device("android")) ? "path" : "key"

    if (MPage.info('filename') == 'NMOK_1_1V.html'){
        if(MData.storage("shakeSetValue") == '') {

            appInsights.trackEvent({
                name: 'shake_on',
                properties: {
                    viewPage : document.title,
                    eventType : 'popup'
                }
            });
            $("#shakePopup1").fadeIn().addClass('show').removeClass('close');

        }else if(MData.storage("shakeSetValue") == 'spoany') {
			providerWorking.check(Definition.PROVIDER_SPOANY_ID).then(async () => {
				SPO_ANI.popup();
		   });    
		}else if (MData.storage("shakeSetValue") == 'stamp'){
			let pageYn = MInfo.stack().findIndex(stack => stack[keyName].indexOf("NEVE_OC_02_13P.html") >= 0) == -1;
			if (pageYn){
				MPage.html("../EVE/NEVE_OC_02_13P.html");
			}

        }else if (MData.storage("shakeSetValue") == 'nowmenu'){
            MNet.httpSend({
				path : "/todayMeals/selectTermInfo",
				data : {},
				callback : function(receiveData){
					console.log("todayMeals TermInfo :: ", receiveData);
					let {termInfo} = receiveData;
					let termChkParam = "";
					let pageUrl = "../FDP/NFDP_2_1P.html"
					let chkUrl = 'NFDP_2_1P.html';
					if(termInfo == null || termInfo == ""){ // TODO : CASE1 약관 X, 지점 X
					}else if((termInfo || {}).TERM_AGREE_YN == "Y" && (termInfo || {}).BUSIPL_YN == "N"){ // TODO : CASE2 약관 O, 지점 X (기존 서비스 이용자들을 위한 것(?), 추후 삭제 가능)
					}else if((termInfo || {}).TERM_AGREE_YN == "N" && (termInfo || {}).BUSIPL_YN == "Y"){ // TODO : CASE3 약관 X, 지점 O
					}else if((termInfo || {}).TERM_AGREE_YN == "Y" && (termInfo || {}).BUSIPL_YN == "Y"){ // TODO : CASE4 약관 O, 지점 O
						pageUrl = "../FDP/NFDP_3_1V.html";
						chkUrl = "NFDP_3_1V.html"
					}

					let pageYn = MInfo.stack().findIndex(stack => stack[keyName].indexOf(chkUrl) >= 0) == -1;
					if(!pageYn){
						return;
					}
					mvFoodPage(pageUrl);
				}
			});
            stackRemove("NFDP_2_1P.html");
        }else if (MData.storage("shakeSetValue") == "program"){
           let pageYn = MInfo.stack().findIndex(stack => stack[keyName].indexOf("NMDP_3_3T.html") >= 0)== -1;
           if( pageYn){
                MPage.html("../MDP/NMDP_3_3T.html");
           }
        }
    }
};

function shakeBtnCb() {
    M.execute("exWNShakeStop")
    MPage.html({
        url : "../MOK/NMOK_3_1V.html",
    })
};
/**
 * 2023.05.22 탱그램 관련 콜백 추가
 */


//exWNStartSmartRopeGuide 호출 이후의 콜백
function tangramGuideCB(result){
	console.log("tangramGuideCB :::")
	console.log(result)
	stackRemove("NMPD_9_306V.html")
	if(result.result) result =result.result;
    if(result.code == "success" && result.jumpCount != undefined){

        Promise.allSettled([
            guideSaveTangram(result),
            saveExecGuide(result)
        ]).then((result2)=>{
			//가이드 결과 화면으로 이동
            MPage.html({
                url: "../MPD/NMPD_9_322P.html",
                param:{
                    guideData : result,
					type : "nativeCb"
                }
            });
        });
    }
}


/**
 * 가이드 종료시에 탱그램 기록을 저장해줄 함수
 * @param {Object} data
 * @returns
 */
function guideSaveTangram(data){
	console.log("guideSaveTangram :::")
	console.log(data)
    let rawData = {
        "entries":[{
            "period": {
                "from": data.from,
                "to": data.to

            },
            "calories": {
                "value": data.calories,
                "unit": "kcal"
            },
            "distance": {
                "value": 0,
                "unit": "km"
            },
            "activity": {
                "type": "jumprope"
            },
            "count" : Number(data.jumpCount)
        }],
        "memo": "memo",
        "source": {
            "mode": 8,
            "product": {
                "name": "Rookie",
                "vender": "TANGRAM FACTORY, INC."
            },
            "name": "Rookie",
            "type": ""

        }
    };
    return new Promise((resolve, reject) => {
        MNet.httpSend({
            path : '/tangram/saveJumprope',
            data: {
                userNo,
                recordKey,
                rawData,
            },
            indicator : false,
            callback :function(rd){
                resolve(rd);
            }
        });
    });
}


/**
 * 운동 가이드 수행이력 저장
 * @returns
 */
function saveExecGuide(data){
	console.log("saveExecGuide :::")
	console.log(data)
    let guideStartTime = moment(data.from,"YYYY-MM-DD HH:mm:ss");
    let guideEndTime = moment(data.to,"YYYY-MM-DD HH:mm:ss");
    let diffSecond = guideEndTime.diff(guideStartTime,'seconds');

    let totalTime =  moment("00:00:00","HH:mm:ss").add(diffSecond,"s").format("HH:mm:ss")
	let targetParam;
	if(typeof data.targetParam == "object"){
		targetParam = data.targetParam
	}else{
		targetParam = JSON.parse(data.targetParam);
	}
    return new Promise((resolve, reject) => {
        //레코드키 from to는 라이프레코드 조회시에만 쓰이지만 코드를 줄이기 위해 합쳐서 씀
        let param = {
            userNo,
            "level":targetParam.setsLevel,
            "count":targetParam.targetJumpCount,
            "set":targetParam.targetSets,
            "isSuccess": data.setSucces,
            "jump":data.jumpCount,
            "calory":data.calories,
            "time":totalTime
        }
        MNet.httpSend({
            path: '/tangram/saveExecGuide',
            data: param,
            indicator : false,
            callback : function (rd) {
                resolve(rd);
            },
            errorCallback : function() {
                resolve({});
            },
        });

    });
}

// 약관 관련 공통 코드 추가 23.07.05(KEK)


/**
 * 약관 내용 상세 조회 페이지 이동
 * @param {String} termsTp 조회할 약관 코드-ex) "300137"
 * @returns
 */
function moveTermsDetail(termsTp, url='' , htmlParam='') {
    MPage.html({
          "url": "../MDP/NMDP_2_97P.html"
        , "animation": "NONE"
        , "param": { termsTp , url, htmlParam}
    });
}

/**
 * 약관 타이틀명 조회용 함수
 * @param {String|Number} userNo 유저번호
 * @param {Array[String]} termsList 조회할 약관 코드 배열값 -ex) ["300137","300138"]
 * @returns
 */
function selectTermsList(userNo, termsList){
    return new Promise((resolve, reject) => {
        let termsParam = {
            userNo,
            termsList,
        }
        MNet.httpSend({
            path: '/cmm/selectTermsTitle',
            data: termsParam,
            indicator : false,
            callback : function (rd) {
                resolve(rd);
            },
            errorCallback : function() {
                resolve({});
            },
        });

    });
}

/**
 * 약관 동의여부 저장 함수
 * @param {String|Number} userNo 유저번호
 * @param {Array[Object]} termsList 동의 이력 저장할 함수 ex[{termsTp : 300000 , agreeYn : "Y"},{termsTp : 300001 , agreeYn : "N"}]
 * @returns
 */
 function saveTermsList(userNo, termsList){
    return new Promise((resolve, reject) => {
        let termsParam = {
            userNo,
            termsList,
        }
        MNet.httpSend({
            path: '/cmm/saveTerms',
            data: termsParam,
            indicator : false,
            callback : function (rd) {
                resolve(rd);
            },
            errorCallback : function() {
                resolve({});
            },
        });

    });
}
/**
 * 페이지 전체 로드
 */
const pageInitAPICall = () => {
    // 푸시/앱 호출 처리 중에는 API 호출하지 않음
    const {isCalledByPush, ON_OPEN_BY_OCARE_SCHEME = "", noticeIds: noticeIds_global = [] } = MData.global();
    if(isCalledByPush != 'Y' && ON_OPEN_BY_OCARE_SCHEME == "") {
//        exIndicator.show(); // 메인 인디게이터 삭제 요청
        Promise.allSettled([
            getNotiPopInfo(noticeIds_global)
        ])
        .then((result) => {
            let [ {value: isGoPopPage} = {}] = result;
            if(isGoPopPage === true){
                exIndicator.hide();
            }else{
	            bottom();
            }
        })
        .catch(() => exIndicator.hide());
    } else {
        // 푸시 처리했으니 global 값 삭제(단 ON_OPEN_BY_OCARE_SCHEME은 common.js에서 처리 후 값 삭제)
        MData.removeGlobal('isCalledByPush');
    }
}

/**
 * 공지사항 팝업 조회
 * @param {number[]} noticeIds_global 공지사항 팝업 id 앱 기동 후 보여진 적이 있는 것들이 쌓임
 */
const getNotiPopInfo = (noticeIds_global) => {
    return new Promise(async (resolve) => {
        let {isGoPopPage, popupList} = await new Promise((resolve1) => {
            MNet.httpSend({
                path : '/main/selectPopup',
                data : {},
                indicator : false,
                callback : function(receiveData){
                    /** @type {Number[]} 다시보지 않기에 등록된 공지사항 목록 */
                    let noticeIds_storage = MData.storage('noticeIds') || [];
                    let filterList = new Set([...noticeIds_storage, ...noticeIds_global]);

                    let popupList = (receiveData.popupList || []).filter(item => filterList.has(item.POP_ID) == false);

                    let isGoPopPage = Boolean(popupList.length);
                    resolve1({isGoPopPage, popupList});
                },
                errorCallback : function(){
                    resolve1({isGoPopPage: false, popupList: []});
                }
            });
        });

        // 띄워야할 공지 팝업이 있을 때 페이지 이동
        if(isGoPopPage){
            MPage.html({
                url : '../MCM/NMCM_25_1P.html',
                param : {
                    noticeList : popupList
                }
            });
        }

        resolve(isGoPopPage);
    });
}

var bottom = function(){

        let isFirstRun = MData.storage("FIRST_RUN") != "Y";
        let isPushPopup = isFirstRun;
        // 팝업 제어 함수 순서대로 팝업을 띄워야 한다.
        showContent = showContentManager({isPushPopup, isFirstRun});
        showContent.next();

        MDate.storage("FIRST_RUN", isFirstRun = "Y");

};

/**
 * 오케어 홈 페이지 진입시 바텀시트 호출
 */
function* showContentManager(params = {}){
    /**
    * @property {boolean} isPushPopup 앱 푸시 유도 팝업 여부
    * @property {boolean} isFirstRun 재설치여부
    */
    let { isPushPopup, isFirstRun } = params;
    let isRealApp = Definition.SERVER_TYPE == "PROD";
    let curDt = moment();
    let isPopUp = false; // 월간 오케어 타이머시작 타이밍 -> 새로 생성될 팝업에도 팝업열릴 때 isPopup = true 넣어주세요.
    let {DO_NOT_SHOW_B2C} = MData.global();


    // 23.04.25 오케어 소식지 -- 최우선 순위
    let isOcareNoticePop = false;/*!isRealApp || curDt.isAfter(moment("20230425 000000", "YYYYMMDD HHmmss"));*/
    let isOcareNoticeShowYN = MData.global("renewOcareNoticeShowYN") == "";
    let isOcareNoticeNeverShow = MData.storage("renewOcareNoticeNeverShow2") != "Y";
    if(isOcareNoticePop && isOcareNoticeShowYN && isOcareNoticeNeverShow){
      isPopUp = true;
      $('#renewOcareNoticePop').fadeIn().addClass('show').removeClass("close");

      $("#renewNotiAlarm")[0].onclick = function(){
          appInsights.trackEvent({
              name: 'news_btn_details',
              properties: {
                  viewPage : document.title,
                  eventType : 'click'
              }
          });
          MPage.html({
              url : '../EVE/NEVE_8_1V.html',
          });
          $("#renewOcareNoticePop").fadeOut().addClass('close').removeClass('show');
      };
      $('#renewOcareNoticePop .btn-close.popup-close')[0].onclick = function(){
          $('#renewOcareNoticePop').fadeOut().removeClass('show');
          MData.global("renewOcareNoticeShowYN", "Y");
          showContent.next();
      };
      yield;
    };

    // 임시 B2C 회원 재인증 안내 팝업
    /*if((!isRealApp || isRealApp && !curDt.isBefore(moment("20230302 000000", "YYYYMMDD HHmmss")) && /^1100000006$/.test(compCd))
        && MData.storage("DO_NOT_SHOW_B2C") != "Y" && DO_NOT_SHOW_B2C != "Y") {
        isPopUp = true;
        $('#b2cPopup').fadeIn().addClass('show');

        $('#b2cPopup .btn-close.popup-close')[0].onclick = function(){
            MData.global('DO_NOT_SHOW_B2C', 'Y');
            $('#b2cPopup').fadeOut().removeClass('show');
            showContent.next();
        };

        $('#b2cPopupNeverShowBtn')[0].onclick = function() {
            MData.storage('DO_NOT_SHOW_B2C', 'Y');
            $('#b2cPopup').fadeOut().removeClass('show');
            showContent.next();
        };

        $('#b2cPopup')[0].onclick = function() {
            MData.global('DO_NOT_SHOW_B2C', 'Y');
            $('#b2cPopup').fadeOut().removeClass('show');
            showContent.next();
        };

        yield;
    };*/

    // 2023.07월 오케어 몰 스타 사용해제 안내 바텀 시트
    let isStarMall = /^100000001(5|6|7|8|9)$/.test(compCd);
    let isStarMall2 = /^1000000020$/.test(compCd);
    let isStarMall3 = /^1100000007$/.test(compCd);
    let isStarMalPopupData = curDt.isBetween(moment("20230630 235959","YYYYMMDD HHmmss" ), moment("20230731 235959", "YYYYMMDD HHmmss"))
    let isStarMallNeverShow = MData.storage("removeOcareMalShow2") != "Y";
    let isStarMallShowYN = MData.global("reStarMallShowYN") == "";

    if((isStarMall || isStarMall2 || isStarMall3) &&  (isStarMallNeverShow  && isStarMallShowYN && isStarMalPopupData)){

       $('#ocareMalPop').fadeIn().addClass('show').removeClass("close");
        MData.global("reStarMallShowYN", "Y");
       $("#ocareMal")[0].onclick = function(){
            providerWorking.check(Definition.PROVIDER_MALL_ID).then(async () => {
                let ocareMallCache = MData.storage("OCARE_MALL_CACHE");

                if(ocareMallCache == "") {
                    await ocareMallRecommend();
                }

                ocareMallCache = MData.storage("OCARE_MALL_CACHE");
                let goods = ocareMallCache.goodsStr;

                let ocareMallInKey = MData.storage("OcareMallInKey");

                let url = Definition.PROVIDER_OCAREMALL_URL;
                let bytes = `inKey=${encodeURIComponent(ocareMallInKey)}&goods=${goods}`;
                M.execute("exWNPostWebViewBrowser", "오케어몰", url, "Y", 'ocareMallCalledByPushOrIntent', bytes);
            });
            $("#ocareMalPop").fadeOut().addClass('close').removeClass('show');
       };
     $('#ocareMalPop .btn-close.popup-close')[0].onclick = function(){
         $('#ocareMalPop').fadeOut().removeClass('show');

         showContent.next();
     };
       yield;
    }

	// 23.09 서울교통공사 관련 이벤트 (가입 후 이벤트)
	let isSeoulEvt = /^1100000013$/.test(compCd); 
	let isSeoulEvtDate = curDt.isBefore(moment("20231031 235959", "YYYYMMDD HHmmss")); 
	let isSeoulEvtNeverShow = MData.storage("seoulEvtPopShow2") != "Y";
    let isSeoulEvtYN = MData.global("reSeoulEvtShowYN") == "";
	let isSeoulEvtFlag = isSeoulEvtDate ? "진행중" : "종료"; // 이벤트 링크 복사로 인한 파라미터 추가 
	let isSeoulEvtSn = ""; // 이벤트 아이디  

	if(isSeoulEvt && isSeoulEvtDate && isSeoulEvtNeverShow && isSeoulEvtYN){
		$('#seoulEvtPop').fadeIn().addClass('show').removeClass("close");
        MData.global("reSeoulEvtShowYN", "Y");
		if(Definition.SERVER_TYPE == "DEV"){
			isSeoulEvtSn = "82"
		}else if (Definition.SERVER_TYPE == "QA"){
			isSeoulEvtSn = "71"
		}else{
			isSeoulEvtSn = "63"
		}
		$("#seoulEvt")[0].onclick = function(){ // 이벤트 페이지 이동 
				MPage.html({
					url: "../EVE/NEVE_7_39V.html", // 건강검진 
					param : { // 이벤트 복사를 위해 넘겨줘야 하는 파라미터 
						dataFlag : isSeoulEvtFlag, 
						evtSn : isSeoulEvtSn,
						evtPage : "NEVE_9_1V"
					}
				});
		};
		$('#seoulEvtPop .btn-close.popup-close')[0].onclick = function(){
			$('#seoulEvtPop').fadeOut().removeClass('show');
			showContent.next();
		};
		yield;
	}

		// 23.11 현대그린푸드 관련 이벤트 (가입 후 이벤트)
		let isHyndaiEvt = /^1100000030$/.test(compCd);
		let isHyndaiEvtDate = isDev || curDt.isBetween(moment("20231106 000000","YYYYMMDD HHmmss" ), moment("20231130 235959", "YYYYMMDD HHmmss"))
		let isHyndaiEvtNeverShow = MData.storage("hyundaiEvtPopShow2") != "Y";
		let isHyndaiEvtYN = MData.global("reHyundaiEvtShowYN") == "";
		let isHyndaiEvtFlag = isHyndaiEvtDate ? "진행중" : "종료"; // 이벤트 링크 복사로 인한 파라미터 추가 
		let isHyndaiEvtSn = ""; // 이벤트 아이디  
	
		if(isHyndaiEvt && isHyndaiEvtDate && isHyndaiEvtNeverShow && isHyndaiEvtYN){
			$('#hyundaiEvtPop').fadeIn().addClass('show').removeClass("close");
			MData.global("reHyundaiEvtShowYN", "Y");
			if(Definition.SERVER_TYPE == "DEV"){
				isHyndaiEvtSn = "92"
			}else if (Definition.SERVER_TYPE == "QA"){
				isHyndaiEvtSn = "78"
			}else{
				isHyndaiEvtSn = "68"
			}
			$("#hyundaiEvt")[0].onclick = function(){ // 이벤트 페이지 이동 
					MPage.html({
						url: "../EVE/NEVE_7_52V.html", // 건강검진 
						param : { // 이벤트 복사를 위해 넘겨줘야 하는 파라미터 
							dataFlag : isHyndaiEvtFlag, 
							evtSn : isHyndaiEvtSn,
							evtPage : "NEVE_9_1V"
						}
					});
			};
			$('#hyundaiEvtPop .btn-close.popup-close')[0].onclick = function(){
				$('#hyundaiEvtPop').fadeOut().removeClass('show');
				showContent.next();
			};
			yield;
		}

    if(isPopUp == false) {
      OcareUI.mOcare6Timer.init();
      MData.global("ocare5Timer", "Y")
      M.execute("exWNShakeSetVibrate","N");
      M.execute("exWNShakeStart","shakeCb");
      yield;
    }

};

let showContent = showContentManager();


const SPO_ANI = {
    /** @type {String|null} 검증 토큰 */
    token : null,
    /** @type {String|Date|null} 토큰 만료 시간 */
    expiredTime : null,
    /** @type {String|null} 회원 여부 값 */
    memberYn : null,
    /** @type {String|null} 유저 아이디 */
    memberId : null,
    /** @type {Boolean|null} 스포애니 이용중 여부 */
    isSchedule : null,
    /** @type {Integer | null} 새로고침 타임아웃 아이디 */
    timeout : null,
    /** @type {String | null} 스포애니 진행중인 종료 날짜 */
    endDt: null,
    /**
     * 바코드 팝업 호출
     */
    popup(){
        clearInterval(this.timeout);
        this.getToken()
        .then(() => this.getMemberInfo())
        .then(() => this.getBarCode())
        .then( result => {
            let {code, msg, data} = result;
            let {resultCode, Qrdata} = data;
            //스포에니 바코드 바텀시트
            let $popup = $("#spoBarCodePopup")
            let $popupBody = $popup.find("[data-pop-body]");
            let curSecond = 15;
            
            //정상회원 케이스
            if(code == 200 && resultCode == 100){
                $popupBody.html(`<div>
                                    <div class="spoani-barcode img-box mt10" id="barCodeDiv"><span></span></div>

                                    <p class="sub-txt-gray mt10 center" data-time>남은시간 : 15초</p>
                                    </div>
                                 </div>`);
                $popupBody.find("span").barcode(Qrdata, "code128", {barWidth:2, barHeight:70, addQuietZone:false, bgColor : "transparent"}).css({
                    "overflow" : "", "display" : "inline-block"
                });
                let $time = $popupBody.find("[data-time]");
                // 새로고침
                this.timeout = setInterval(() => {
                    $time.text(`남은시간 : ${--curSecond}초`);
                    if($popup.hasClass("show") == false){
                        clearInterval(this.timeout);
                    }else if(curSecond == 0){
                        $popupBody.html(`<div class="barcode">
                                           <div>
                                           	<div class="roundbox no-bor mt10">
                                           		<p class="black">
                                           			<strong class="black bold">스포애니 이용가능한 시간이 아닙니다.</strong> <br>자주 이용하시는 지점을 통해 <br>이용가능한 날짜, 시간을 확인해주세요
                                           		</p>
                                           	</div>
                                           </div>
                                        </div>`);
                    }
                }, 1000);
				$popup.fadeIn().addClass("show").removeClass("close");
            }else{
                if(/^(200|300|400)$/.test(resultCode) && MPage.info('filename') == 'NMOK_1_1V.html'){
                     $('#noUse').fadeIn().addClass('show').removeClass("close");
                }else{
                    $('#noUse').fadeIn().addClass('show').removeClass("close");
                }
            }
        })
        .catch(error => {
               console.error("SPO_ANI.popup()", error);
               $('#noUse').fadeIn().addClass('show').removeClass("close");
           });
    },
    /**
     * 메인 바코드 아이콘 표시 여부_바로 뿌릴까...
     * @return {Promise<Boolean>}
     */
    isIcon(){
        return new Promise((resolve, reject) => {
            this.getToken()
            .then(() => this.getMemberInfo())
            .then(() => this.getScheduleList())
            .then((bool) => resolve(bool))
            .catch((error) => {
                console.error("SPO_ANI.isIcon()", error);
                reject(error);
            });
        });
    },
    /**
     * 토큰 조회
     * @returns {Promise<Object>}
     */
    getToken(){
        return new Promise((resolve, reject) => {
            if(this.token && moment().isBefore(moment(this.expiredTime, "YYYYMMDDHHmmss"))){
                resolve(this.token);
            }else{
                MNet.httpSend({
                    path : "/spoany/token",
                    data : {
                        userNo : userNo
                    },
                    indicator : false,
                    callback : receiveData => {
                        let result = (receiveData.result || {}).data || {};
                        resolve({token : this.token = result.token, expiredTime : this.expiredTime = result.expiredTime });
                    },
                    errorCallback : function(){
                        let errInfo = errorHandler.apply(null, arguments);
                        console.error("SPO_ANI.getToken()", errInfo);
                        reject(errInfo);
                    }
                });
            }
        });
    },
    /**
     * 가입납부, 회원여부 조회
     * @returns {Promise<Object>}
     */
    getMemberInfo(){
        return new Promise((resolve, reject) => {
            if(/^Y$/i.test(this.memberYn)) resolve();
            else if(/^N$/i.test(this.memberYn)) reject("스포 애니 회원이 아닙니다.")
            else{
                MNet.httpSend({
                    path : "/spoany/selectMembershipPaymentInfo",
                    data : {
                        USER_NO : userNo,
                        Token : this.token
                    },
                    indicator : false,
                    callback : receiveData => {
                        let result = (receiveData.result || {}).data || {};
                        if(result.MemberYN == 'Y'){
                            resolve({ memberYn : this.memberYn = result.MemberYN, memberYn : this.memberId = M.sec.encrypt(result.MemberID).result });
                        }else{
                            this.memberYn = "N";
                            resolve({ memberYn : this.memberYn = result.MemberYN, memberYn : this.memberId = M.sec.encrypt(result.MemberID).result });
                            //reject("스포 애니 회원이 아닙니다.");
                        }
                    },
                    errorCallback : receiveData => {
                        let result = (receiveData.rtnCd || {}).data || {};
                        resolve(result);
                        $('#noUse').fadeIn().addClass('show').removeClass("close");
                    }
                });
            }
        });
    },
    /**
     * 스포애니 스케줄 조회
     * @param {String} userId 유저아이디 이메일형식
     * @param {String} token 토큰
     * @returns {Promise<Boolean>}
     */
    getScheduleList(){
        return new Promise((resolve, reject) => {
            if(this.isSchedule == null){
                MNet.httpSend({
                    path : "/spoany/selectMyScheduleList",
                    data : {
                        USER_ID : M.sec.decrypt(this.memberId).result,
                        Token : this.token
                    },
                    indicator : false,
                    callback : receiveData => {
                        let mySchedule = (receiveData.myScheduleList || []).find(item => item.SCHEDULE_TYPE == "1");
                        this.endDt = mySchedule && /object/i.test(mySchedule.constructor.name) ? mySchedule.SVC_END_DATE : null;
                        resolve(this.isSchedule = Boolean(mySchedule));
                    },
                    errorCallback : function(){
                        let errInfo = errorHandler.apply(null, arguments);
                        console.error("SPO_ANI.getScheduleList()", errInfo);
                        reject(errInfo);
                    }
                });
            }else{
                resolve(this.isSchedule);
            }
        });
    },
    /**
     * 바코드 조회
     * @param {String} userId 유저아이디 이메일형식
     * @param {String} token 토큰
     */
    getBarCode(){
        return new Promise((resolve, reject) => {
            MNet.httpSend({
                path : "/spoany/selectBarcode",
                data : {
                    userID : M.sec.decrypt(this.memberId).result,
                    Token : this.token
                },
                indicator : false,
                callback : function(receiveData){
                    let result = receiveData.result || {};
                    resolve(result);
                },
                errorCallback : function(receiveData){
                    let result = receiveData.rtnCd || {};
                    resolve(result);
                }
            });
        });
    }
};

const fn_getContentsDetail = (cntnsId) => {
    console.log("cntnsId : " + cntnsId);
    MNet.httpSend({
        path: '/cts/getDetail',
        data : {
            userNo : userNo,
            cntnsId : cntnsId,
        },
        callback : function (rcvData){
            if(rcvData.rtnCd == "0000"){
                let linkType = rcvData.data.linkType;
                if(typeof linkType != "undefined" && linkType == "2"){
                    let magaCnts = rcvData.data.cntns;
                    let canGoBack = "N";
                    M.execute("exWNOnWebBrowser", "메거진", magaCnts, canGoBack, "");
                }else if(typeof linkType != "undefined" && linkType == "1"){
                    let magaCnts = rcvData.data.cntns;
                    if(magaCnts.indexOf("http") >= 0){
                        console.log("HTTP :: FAIL");
                    }else{
                        let pgRegExp = htmlRegExp(magaCnts);
                        let magazineDate = rcvData.data.frDt.split(" ")[0]
                        MPage.html({
                            url : pgRegExp,
                            param : {
                                year : magazineDate.split("-")[0],
                                month : magazineDate.split("-")[1],
                                seq : rcvData.data.weekNo
                            }
                        });
                    }
                }else if(typeof linkType != "undefined" && linkType == "4") {
                    let magaCnts = rcvData.data.cntns;
                    console.log(magaCnts);
                    $("#webtoonDetailList").html(htmlRegExp(magaCnts))
                }
            }
        }
    })
};
var htmlRegExp = function(str) {
    var retStr = str.replace(/ /g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&apos;/g, '\'')
                    .replace(/<br?\/>/g, '<br />').replace(/<br>/g, '<br />').replace(/<br \/>/g, '<br /><br />').replace(/(<.*style\=.*)(font\-size)/g, '$1not-font-size');
    console.log(retStr);
    return retStr;
};

function headerDraw(){
    if (MPage.info('filename') == 'NMOK_1_1V.html' || MPage.info('filename') == 'NMDP_1_167V.html' || MPage.info('filename') == 'NMMC_1_1V.html' || MPage.info('filename') == 'NMPD_2_1V.html' || MPage.info('filename') == 'NEVE_9_1V.html'){

        var header = '<div class="ocr-header-wrap">';
        header += '    <button type="button" class="ocr-hbtn" data-icon="back" aria-label="이전화면"></button>';
        if(MPage.info('filename') == 'NMOK_1_1V.html') { // 월간오케어 12월 이벤트로 오케어 로고 변경
            header += '<h1 class="ocr-header-tit" aria-label="new_ocare">'
            header += '<span class="htit tit-a"></span>'
            header += '<span class="htit tit-b"></span>'
            header += '<span class="htit tit-c"></span>'
            header += '</h1>'
        }else {
            header += '    <h1 class="ocr-header-tit" aria-label="ocare"></h1>';
        }
        header += '    <div class="ocr-header-group">';
        if((MPage.info('filename') == 'NMOK_1_1V.html') &&  MData.storage("shakeSetValue") != "del"){
        header += '       <button type="button" class="ocr-hbtn" data-icon="shake" aria-label="흔들어보세요! 스템프 릴레이 혜택확인" id="shakeBtn">';
        header += '           <span class="ocr-shaketooltip"></span>';
        header += '       </button>'
        }
        header += '       <button type="button" class="ocr-hbtn alarm" data-icon="alarm" aria-label="알림"/>';
    /*	header += '           <em class="ocr-badge"><span class="a11y-hidden">신규</span></em>';*/
    /*	header += '       </button>';*/
        header += '       <button type="button" id="menu" class="ocr-hbtn" data-icon="menu" aria-label="메뉴"></button>';
        header += '    </div>';
        header += '</div>';

        $('header').html(header);
    };
}

/**
 * 프로바이더 추천 루틴 공통화
 * -건강기록과는 다르게 각 프로바이더별로 별도의 노출 기준을 가지고 있음 
 * ex)프로그램 구매후 한번 노출후 추후 노출 X
 * 호출시 프로세스에 맞게 팝업 호출
 * PROVIDER_RECOMMEND_ROUTINE.popup(type,providerNm)
 */
const PROVIDER_RECOMMEND_ROUTINE = {
	/** @type {Number|0} 내 루틴 갯수 */
	todayRountineCnt : 0,
	/** @type {String|YYYYMMDD} 추천루틴 저장일을 비교하기 위한 날짜 */
	today : moment().format("YYYYMMDD"),
	/** @type {String|null} 조회할 프로바이더 */
	providerType : null,
	/** @type {String} 카테고리 그룹 시퀀스 검색을 위한 변수 */
	providerFilterNm : '',
	/** @type {Boolean} 저장되어있는 날짜 비교 필요한지 ex)상품 구매하게 되면 다시 띄어야하는지 */
	dateChkYn : false,
	//각 프로바이더 루틴 전체보기 클릭시 필요한 값
	routinParam : {},
	/** @type {String} 기준일 입력 받았을때 저장해줄 스토리지에 저장해줄 날짜 */
	routinDate : '',
	/**
	 * 추천 루틴 팝업 호출
	 * @param {String} type 그려줄 추천루틴 타입값(서버조회시 사욛되는 약어사용)
	 * @param {String} providerNm 프로바이더 이름
	 * @param {String} providerNm2 groupSeq filter 용
	 * @param {String} date YYYYMMDD 루틴 팝업 호출하는 기준일(기준일 없을 경우에는 한번이라도 띄운 이력있으면 팝업X)
	 * @param {boolean} failed 프로세스 에러시 실패 팝업 여부(true시 팝업 호출)
	 * @returns 
	 */
	popup(type=null,providerNm='',providerNm2 = '',date=false,failed=false){

		this.providerType = type;
		if(providerNm2 == ''){
			this.providerFilterNm = providerNm;
		}else{
			this.providerFilterNm = providerNm2;
		}
		
		if(date){
			dateChkYn = true;
			this.routinDate = date
		}
		
		if(type == null && failed){
			Popup.alert("추천루틴 조회에 실패했습니다.")
			return
		}
		//프로바이더 기준일 ex)프로그램 구매일 - 날짜 체크
		if(MData.storage(this.providerType + "_APPSERVICE_DATE") != '' && !dateChkYn){
			return
		}
		//기준일 날짜와 저장되어있는 날짜가 같다면 팝업 X
		if(MData.storage(this.providerType + "_APPSERVICE_DATE") == date){
			return
		}

		//팝업 요소가 있는지 체크하여 추가로 그려줄지 판단
		let popupMain = $("#popup_routine").length > 0;
		//팝업 요소가 없을 경우에만 추가로 그려줌
		if(!popupMain){
			$('body').append(`<div class="popup-wrap" id="popup_routine">
				<div class="popup-bg"></div>
				<div class="popup popup-btm">
					<div class="popup-box">
						<div class="pop-head">
							<p class="title">${providerNm} 전용 루틴</p>
							<button type="button" class="btn-close popup-close" id="popupClose">팝업닫기</button>
						</div>
						<div class="pop-body">
							<p class="gray-7 mt10">프로그램과 함께 수행하면 더 건강해지는 루틴을 추천드려요.</p>
							<ul class="list-shadow-box routine mt20" id="popRecommendList">
								
							</ul>
							<p class="btn-wrap block">
								<button type="button" class="btn-link" id="appserviceBtn">${providerNm} 전체 보기</button>
							</p>
						</div>
					</div>
				</div>
			</div>`)
			//팝업 요소 추가되었을 경우 이벤트도 등록 
			$(document).on("click", ".addRecommendRoutin", function(){
				let addData = $(this).data('routindata')
				let clickRoutineIndex = $(this).data('recommandroutineindex');
				//delete addData.dateType;
				addData["alarms"] = [];
				if(PROVIDER_RECOMMEND_ROUTINE.todayRountineCnt >= 20){
					Popup.confirm({
						message : "루틴 최대 개수 20개를 초과하여 더 이상 루틴을 추가할 수 없어요.<br> 지금 루틴을 정리해 볼까요?",
						button:[ "확인","취소"],
						callback: function(btnIdx) {
							if(btnIdx == 0) {
								MPage.html({
									url: "../MDP/NMDP_2_1T.html",
									param: {
										pageType: "routin",
									},
								});
							}else {
							}
						}
					});
				}else{
					PROVIDER_RECOMMEND_ROUTINE.insertRoutines(addData,clickRoutineIndex);
				}
			});
	
			$(document).on("click", "#popupClose", function(){
				$("#popup_routine").removeClass("show").addClass("close").fadeOut();
			});
	
			//루틴 추가 카테고리로 이동
			$(document).on("click", "#appserviceBtn", function() {
				MPage.html({
					url: '../MDP/NMDP_2_60V.html',
					param : {
						params:PROVIDER_RECOMMEND_ROUTINE.routinParam
					}
				});
			});
		}
		//
		Promise.allSettled([
			this.getRecommendRoutinProd(),
			this.selectUserRoutine(),
			this.selectRoutinCategory()
		]).then((result)=>{
			let myRoutinData = result[1].value//내 루틴 조회
			let groupRoutinList = result[2].value.filter(item => { return item.routinCatg == '25' && item.routinGrpTag.indexOf(this.providerFilterNm) > -1})//정상 데이터는 루틴 목록 x
			this.routinParam = groupRoutinList[0];
			this.routinParam.seqList = myRoutinData.map((item) => item.routinSeq);
			this.routinParam.savedRoutineList = myRoutinData;
			this.routinParam.routinTitle = groupRoutinList[0].routinGrpNm
			this.routinParam.routinNm = groupRoutinList[0].routinGrpNm
			this.routinParam.groupType = "group"
		}).catch((result2)=>{
			if(failed){
				console.log(result2);
				Popup.alert("추천루틴 조회에 실패했습니다.")
				return
			}
		}).finally((result3)=>{
			console.log("finally========")
			console.log(result3);
			$("#popup_routine").addClass("show").removeClass("close").fadeIn();
		})

	},
	//루틴 추천 리스트 조회
	getRecommendRoutinProd(indicator=false){
		return new Promise((resolve, reject) => {
			MNet.httpSend({
				path : "/routin/selectRoutinRcmndByHealth",
				data : {
					rcnmdType : this.providerType,
					userNo : MData.storage("USER_NO")
				},
				indicator : indicator,
				callback : function(rd){
					let recommendArrAll = rd.routinRcmndByHealth;
					//프로바이더 추천루틴 갯수 3개로 일단 무조건 그려줌 전부다 등록일 경우만 노출 x
					let recommendArr = recommendArrAll.filter(item=> item.userRoutinYn != "Y");
					if(recommendArr.length == 0){
						return
					}else{
						PROVIDER_RECOMMEND_ROUTINE.drawRecommendRoutinPopList(recommendArr);
					}
					
					PROVIDER_RECOMMEND_ROUTINE.todayRountineCnt = rd.routinCount.routinCnt;
					
					resolve(rd);
				},
				errorCallback : reject
			});
		});
	},
	/**
	 * 추천루틴 팝업 내용을 그려줄 함수
	 * @param {object} data 추천 루틴 팝업을 그려줄 데이터 
	 * @param {String} date 종료일자 등록하여 종료일로 비교
	 */
	drawRecommendRoutinPopList(data,date) {
		let drawHtml = '';
		$("#popRecommendList").html('');
		data = data.sort(function(a, b)  {
			if(a.userRoutinYn > b.userRoutinYn ) return -1;
			if(a.userRoutinYn === b.userRoutinYn) return 0;
			if(a.userRoutinYn < b.userRoutinYn) return 1;
		})
		for(let i=0;i<data.length;i++){
			if(i>2) break;
			drawHtml += `<li>
			<button type="button" class="btn-make-routine">
				<span class="icon-routine">${data[i].iconTag}</span>
				<span class="">${data[i].routinNm}</span>
			</button>
			<button type="button" class="btn-add addRecommendRoutin" data-routindata="${PROVIDER_RECOMMEND_ROUTINE.escapeHtml(JSON.stringify(data[i]))}" data-recommandroutineindex="${i}" ${data[i].userRoutinYn == "Y" ? 'disabled' : ''}>루틴 추가</button>
		</li>`
		}
		$("#popRecommendList").html(drawHtml);
		MData.storage( this.providerType+"_APPSERVICE_DATE",this.routinDate);
		$("#popup_routine").addClass("show").removeClass("close").fadeIn();
	},
	//루틴 추가 후 데이터 업데이트
	insertRoutines(data='',routineIndex=''){
		ROUTINE_PROCESS.insertRoutine([data]).then((result)=>{
			Popup.toast(`${data.routinNm} 루틴을 추가하였습니다`);
			$(`[data-recommandroutineindex="${routineIndex}"]`).attr("disabled",true);
			this.todayRountineCnt++;
			this.selectUserRoutine().then((result2)=>{
				PROVIDER_RECOMMEND_ROUTINE.routinParam.savedRoutineList = result2
				ROUTINE_PROCESS.isInsertSuccess = false;
			})
		})
	},
	//내가 보유한 루틴 조회(카테고리 더보기 이동시 필요)
	selectUserRoutine(indicator=false) {
		return new Promise((resolve, reject) => {
			MNet.httpSend({
				path : "/routin/selectUsrRoutinList",
				data : {
					userNo : MData.storage("USER_NO"),
					recordKey : MData.storage("RECORD_KEY"),
					examDt : this.today,
				},
				indicator : indicator,
				callback : function(rd){
					resolve(rd.data);
				},
				errorCallback : reject
			});
		});
	},
	//루틴 카테고리 조회(카테고리 더보기 이동시 필요)
	selectRoutinCategory(indicator=false){
		return new Promise((resolve, reject) => {
			MNet.httpSend({
				path : "/routin/selectRoutinCategory",
				data : {
					userNo : MData.storage("USER_NO"),
					routinCatg : "25"
				},
				indicator : indicator,
				callback : function(rd){
					resolve(rd.data);
				},
				errorCallback : reject
			});
		});
	},
	/**
	 * 이스케이프 문자 매칭 변수
	 */
	entityMap : {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'/': '&#x2F;',
		'`': '&#x60;',
		'=': '&#x3D;'
	},
	/**
	 * 이스케이프 문자열로 변환
	 */
	escapeHtml(data){
		return data.replace(/[&<>"'`=\/]/g, function (s) {
			return PROVIDER_RECOMMEND_ROUTINE.entityMap[s];
		});
	}
}

/**
 * 이벤트 헤더 세팅 
 */
const fn_eventHeader = () =>{
	if(MPage.info("path").indexOf("EVE") > -1 &&  MData.param("dataFlag") != ""){
		let chkEvtDataFlag = MData.param("dataFlag");
		if(chkEvtDataFlag != "종료"){
			var evtHeader = `
			<button type="button" class="btn-head back" id="backBtn">이전화면</button>
			<h1 class="title">이벤트</h1>
			<button type="button" class="btn-head share-event" data-js-urlcopy="">공유하기</button>
			`
			var s = document.createElement("link");
			s.rel = "stylesheet";
			s.type = "text/css";
			s.href = "../../assets/css/main.css";
			$("head").append(s);
			$('.header').html(evtHeader);
			$("[data-js-urlcopy]").data("js-urlcopy", JSON.stringify(MData.param()));

			fn_eventCopyUrl();
		}
	}
}

/**
 * 이벤트 url 복사 공통화 
 * 활용되는 예시 데이터 : linkType = 1(내부경로) (ex../EVE/NEVE_6_1V.html), dataFlag가 종료가 아닐 경우 
 */
const fn_eventCopyUrl = () => {
	$(document).on("click", "[data-js-urlcopy]", function(){
		let _thisData = JSON.parse($(this).data("js-urlcopy"));
		console.log("EVT COPY DATA : ", _thisData);
		console.log("EVT COPY DATA PG : ", _thisData.evtPage);
		let evtUrlData; 
		if (Definition.SERVER_TYPE == "DEV") {
			evtUrlData = `/app/appRunservice.jsp?mod=DEV&uid=${_thisData.evtPage}&evtSnReChk=${_thisData.evtSn}&dataFlag=${_thisData.dataFlag}&callerType=extLink`
		} else if (Definition.SERVER_TYPE == "QA") {
			evtUrlData = `/app/appRunservice.jsp?mod=QA1&uid=${_thisData.evtPage}&evtSnReChk=${_thisData.evtSn}&dataFlag=${_thisData.dataFlag}&callerType=extLink`
		} else {
			evtUrlData = `/app/appRunservice.jsp?mod=PROD&uid=${_thisData.evtPage}&evtSnReChk=${_thisData.evtSn}&dataFlag=${_thisData.dataFlag}&callerType=extLink`
		}
		MNet.httpSend({
			path: "/v1/short-url",
			data: {
				userNo: MData.storage("USER_NO"),
				orgUrl: evtUrlData,
				urlTypeCd: "F"
			},
			indicator : false,
			callback: function (receiveData) {
				if (receiveData.rtnCd == "0000") {
					let iosVerChk =  String(M.info.device("os.version"));
					let chkVer = iosVerChk.split(".");
					let chkSecondVer = typeof chkVer[1] != "undefined" ? chkVer[1] : 0; 
					let chkVer2 = Number(chkVer[0]) == 13 ? Number(chkSecondVer) >= 4 : true; // 13.4 미만 버전은 else 로직을 따라야함 
					if(M.navigator.device("ios") && Number(chkVer[0]) >= 13 && chkVer2){						
						navigator.clipboard.writeText(receiveData.shortUrl)
								.then(function(){
									Popup.toast('URL이 복사되었습니다.');
								})	
					}else{
						let $tempTextArea = document.createElement("textArea");
						$("body").append($tempTextArea);
						$tempTextArea.value = receiveData.shortUrl;
						$tempTextArea.select();
						document.execCommand("copy");
						$("body").find($tempTextArea).remove();
						//토스트 팝업
						Popup.toast('URL이 복사되었습니다.');
					}
				}
			}
		});
	});
}
 // 수면 측정 중 호출
function chkAsleepTrackingCb(result){
    try {
        console.log(result)
        //IOS 개발자에게 규격을 전달 하였으나 지켜지지 않아 별도의 조건 처리 정상규격(code:Success)
        if(result.code == 'success' || result.code == 'Success'){
            if($("#popupSleepGoods").length > 0){
                OcareUI.modal.show('popupSleepGoods');
            }else{
                $(".ocr-body").append(`<section class="mdl-modal" data-id="popupSleepGoods" data-type="alert" id="popupSleepGoods">
                <div class="mdl-modal-wrap">
                    <div class="mdl-modal-body" data-align="center">
                        <h1 class="mdl-modal-tit mb-x1 ">수면 측정 기록을 종료하시겠어요?</h1>
                        <p class="mb-x2">현재 측정 중인 수면이 있어요.</p>

                        <div class="mdl-btn-wrap pd-x0">
                            <button type="button" class="mdl-btn" data-style="primary-gray" id="goSleep">
                                <span>계속하기</span>
                            </button>
                            <button type="button" class="mdl-btn" data-style="primary" id="stopSleep">
                                <span>종료하기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>`)
                OcareUI.modal.show('popupSleepGoods')
            }

            $(document).on('click', '#goSleep', function() {
                OcareUI.modal.hide('popupSleepGoods')
                MPage.html({
                    url:"../MDP/NMDP_9_7V.html",
                    param :{
                        intro : 'Y',
                    }
                })
            });

            $(document).on('click', '#stopSleep', function() {
                OcareUI.modal.hide('popupSleepGoods')
                MPage.html({
                    url:"../MDP/NMDP_9_7V.html",
                    param :{
                        stopSleep : 'Y',
                        intro : 'Y'
                    }
                })
            });

        }
    } catch (error) {
        console.log(error);
    }
}
