1. abstracts
실제 스타일은 없고, 그저 다른 폴더에 정의된 스타일을 도와는 역할을 한다. 글로벌 변수, 함수는 _variables 파일에,  mixins은 _mixins에 작성한다. 
_minxins.scss : 반응형을 위한 @media only 등
_variables.scss : 변수명 지정 (색상, 폰트사이즈, 그리드 사이즈 )

2. vendors
프로젝트에서 사용하는 외부 스타일을 이 폴더에 넣으면 된다. 예를들어 부트스트랩을 커스터마이징 하고 싶다면 부트스트랩 stylesheet을 다운받아 이 폴더에 넣으면 된다.

3. base
사이트 전반에 걸쳐서 재사용되는 스타일을 여기에 정의한다. 사이트 전반에 사용될 폰트, 디폴트 스타일이 여기에 해당된다.
_animations.scss : transform (@keyfroames)
_base.scss : 디폴트에 대한 사항 (html, body, ::selection 등)
typography : 폰트
utilites

4. layout
사이트 구조에 해당하는 레이아웃을 여기서 정의한다. nav bars, headers, footers 와 같은 것이 여기에 해당된다.
_header.scss : 헤더 레이아웃
_navigation.scss : 네이게이션 바 레이아웃
_grid.scss : 그리드 레이아웃
_footer.scss :  푸터 레이아웃

5. components
컴포넌트는 "소형" 레이아웃 같은 것이다. 사이트 내에서 재사용가능한 작은 부분들을 여기에 정의한다. buttons, forms, profile pictures와 같은 것이 여기에 해당된다. 
_card.scss 
_button.scss 
_composition.scss 
_popup .scss
_story.scss
_feature-box.scss

6. pages
모든 페이지가 같은 스타일을 사용할 수는 없기 때문에 각 페이지에서 사용될 구체적인 스타일을 여기에 넣으면 된다. 예를들어, "Contact Us"에서만 사용될 스타일이 있다면 __contact.scss와 같이 네이밍한 후 이 폴더에 넣으면 된다. 
_home : 메인 페이지

7. themes
사이트가 다른 종류의 모드를 지원할 때 사용된다. 예를들어 관리자모드와 디폴트모드가 있는 사이트라던가, 다크모드(야간모드)와 라이트모드가 있는 사이트가 있을 수 있다. 각 모드에 따라서 각기 다른 스타일이 지정되기 때문이다. 

main.scss
이제 위와같이 각 폴더에 기준에 따라 scss파일들을 분류했다면, 이 파일을 한데 모을 허브가 필요하다. 그럼 main.scsss 라는 파일을 생성해서 모든 파일들을 import를 해주면된다. main.scss는 다른 파일들과는 달리 앞에 _표시가 없다. 해당 파일에는 직접 스타일을 정의하지 않고 "import"만을 담당하는 폴더이다.