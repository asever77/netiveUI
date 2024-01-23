## 선언적 렌더링?
자동차의 자동기어와 수동기어의 차이정도  
컨텐츠가 들어갈 부분에 변수를 삽입해서 정의하면 라이브러리가 그위치에 값을 대입하여 렌더링  

대표적인 Declarative 언어 : SQL, HTML등  
선언형 프로그래밍은 예측가능, 쉬운 디버깅  
프로그램이 어떤 방법으로 해야 하는지를 나타내기보다 무엇과 같은지를 설명하는 경우에 "선언형"이라고 한다.   
예를 들어, 웹 페이지는 선언형인데 웹페이지는 제목, 글꼴, 본문, 그림과 같이 "무엇"이 나타나야하는지를 묘사하는 것이지 "어떤 방법으로" 컴퓨터 화면에 페이지를 나타내야 하는지를 묘사하는 것이 아니기 때문이다.   
명령형 프로그래밍 언어: 알고리즘을 명시, 목표 비명시 (방법)   
선언형 프로그래밍 언어: 목표 명시, 알고리즘을 비명시 (설명)

## JavaScript proxy() :대리
- 특정 객체를 감싸 프로퍼티 읽기, 쓰기와 같은 객체에 가해지는 작업을 중간에서 가로채는 객체로, 가로채진 작업은 Proxy 자체에서 처리되기도 하고, 원래 객체가 처리하도록 그대로 전달되기도 한다.
- 다양한 라이브러리와 몇몇 브라우저 프레임워크에서 사용
    ```
    let proxy = new Proxy(target, {handler})
    ```
    - target – 감싸게 될 객체로, 함수를 포함한 모든 객체가 가능
    - handler – 동작을 가로채는 메서드인 '트랩(trap)'이 담긴 객체로, 여기서 프락시를 설정
        - get 트랩은 target의 프로퍼티를 읽을 때, set 트랩은 target의 프로퍼티를 쓸 때 활성화됨
- 트랩이 없으면 proxy는 target을 둘러싸는 투명한 래퍼 
- 특수 객체(exotic object)   
- 객체 작업시 내부 메서드(internal method)'가 깊숙한 곳에서 관여 프로퍼티 읽을때 Get, 쓸때 Set 으로 명세서에만 정의된 메서드. 호출사용할수 없음.  
- 프락시 트랩은 내부 메서드의 호출을 가로챔  
- 성공시 [[Set]]은 반드시 true를 반환해야 합니다. 그렇지 않은 경우는 false를 반환
- 성공시 [[Delete]]는 반드시 true를 반환해야 합니다. 그렇지 않은 경우는 false를 반환
- JavaScript에서 속성 접근을 가로채는 방법에는 getter / setters 및 프락시의 두 가지   
https://ko.javascript.info/proxy

## reactive() :반응성
- = Vue.observable 이전버전
- 반응형상태 선언
- 객체 (배열, Map, Set 과 같은 빌트인 타입 포함)에서만 작동, object, array
- 객체, 배열 그리고 Map이나 Set과 같은 컬렉션 유형에만 작동
- reactive()의 반환 값은 원본 객체와 같지 않고 원본 객체를 재정의한 프락시(Proxy)라는 점을 유의하는 것이 중요
- 장점
    - 자바스크립트와 템플릿 사이에 일관성이 있음
    - 반응형 변수를 많이 선언할 때 간단하게 사용 가능
    - Vue2의 data()와 비슷함
### shallowReactive()
- reactive()의 얕은 버전입니다.


## ref()
- reactive reference(:반응적 참조)
- ref는 새로운 기능이 추가되어 이전 버전의 ref와는 조금 다릅니다.
- 모든타입의 값
- 최상위 속성의 ref를 템플릿에서 접근하면 자동으로 "언래핑"되므로 .value를 사용할 필요가 없습니다.
- .value 속성으로 내부값 노출하는 객체생성
- .value 속성은 반응형
- .value 객체유형을 가지고 있으면 자동으로 reactive()로 변환   
- 분해 할당 : 이 기능은 컴포저블 함수로 로직 추출할때 자주 사용
```
const obj = {
    foo: ref(1),
    bar: ref(2)
}
```

- ref의 언래핑은 깊은 반응형 객체 내부에 중첩된 경우에만 발생
- 간편한 변수 선언, 반응성 데이터 제공, ref 속성을 통한 변수 접근, 컴포넌트 레퍼런스 제공
- 장점
    - 타입 제한 없이 사용 가능함
    - 템플릿에서 단일 변수로 사용할 수 있음

### Mustache(:수염) 이중 중괄호 문법
- 식별자나 경로에만 국한되지 않습니다. 유효한 JavaScript 표현식을 사용할 수 있음
- 텍스트 삽입에만 사용
```
{{ ... }}
```

### 컴포저블 함수
- 상태 저장 로직를 캡슐화하고 재사용하는 함수, 시간이 지남에 따라 변경되는 상태 관리가 포함
- 관례상, 컴포저블 함수 이름은 "use"로 시작합니다 예) useMouse, useAct
```
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 관례상, 컴포저블 함수 이름은 "use"로 시작합니다.
export function useMouse() {
    // 컴포저블로 캡슐화된 내부에서 관리되는 상태
    const x = ref(0)
    const y = ref(0)

    // 컴포저블은 시간이 지남에 따라 관리되는 상태를 업데이트할 수 있습니다.
    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }

    // 컴포저블은 또한 이것을 사용하는 컴포넌트의 생명주기에 연결되어
    // 사이드 이펙트를 설정 및 해제할 수 있습니다.
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    // 관리 상태를 반환 값으로 노출
    return { x, y }
}

<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>마우스 위치: {{ x }}, {{ y }}</template>
```
#### 구조 분해 할당
- 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식
- 객체 및 배열 리터럴 표현식을 사용하면 즉석에서 쉽게 데이터 뭉치
```
const { a, b } = { a: 10, b: 20 };
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
```

### 빌트인 타입?
자바스크립트 객체의 분류
1. 표준빌트인 객체 - ECMAScript 사양에 정의된 객체
 - 인스턴스(instance: 사례)를 생성할 수 있는 생성자 함수 객체
    - 인스턴스: 객체 지향 프로그래밍(Object Oriented Programming)에서 class에 소속된 개별적인 객체를 말한다.  
        객체를 소프트웨어에 실체화 하면 그것을 ‘인스턴스’라고 부른다. 실체화된 인스턴스는 메모리에 할당.   
        OOP적 관점 - 객체는 선언, 인스턴스는 실체, 클래스는 일종의 설계도 > 클래스를 사용해 구체적인 제품을 만드는게 인스턴스화
        ```
        const dog = new Animal();
        ```
    
2. 호스트 객체 - 자바스크립트 실행 환경에서 추가로 제공하는 객체
3. 사용자 정의 객체 - 사용자가 직접 정의한 객체

# 속성바이딩
속성을 동적값에 바인딩 v-bind (디레티브)
디렉티브
- v-test



