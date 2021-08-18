
script
```
samWidth = (org, target) => {
	target.forEach(el => el.style.width = org.offsetWidth + 'px');
}
```

실행
```
samWidth(document.querySelector('.aa'), document.querySelectorAll('.bb'));
```

예제
```
<div class="aa" style="width: 200px; height:100px; background-color: lightsalmon;"></div>
<div class="bb" style="width: 40px; height:40px; background-color:lightseagreen;"></div>
<div class="bb" style="width: 40px; height:40px; background-color:lightseagreen;"></div>
<div class="bb" style="width: 40px; height:40px; background-color:lightseagreen;"></div>
```