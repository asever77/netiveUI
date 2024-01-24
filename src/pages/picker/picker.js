import Picker from '../../../assets/js/components/picker.js';

  // date logic
function getYears() {
    let currentYear = new Date().getFullYear();
    let years = [];

    for (let i = currentYear - 20; i < currentYear + 20; i++) {
        years.push({
            value: i,
            text: i + '年'
        });
    }
    return years;
}

function getMonths(year) {
    let months = [];
    for (let i = 1; i <= 12; i++) {
        months.push({
            value: i,
            text: i + '月'
        });
    }
    return months;
}

function getDays(year, month) {
    let dayCount = new Date(year,month,0).getDate(); 
    let days = [];

    for (let i = 1; i <= dayCount; i++) {
        days.push({
            value: i,
            text: i + '日'
        });
    }

    return days; 
}

let currentYear = new Date().getFullYear();
let currentMonth = 1;
let currentDay = 1;

let yearSelector;
let monthSelector;
let daySelector;

let yearSource = getYears();
let monthSource = getMonths();
let daySource = getDays(currentYear, currentMonth);

yearSelector = new Picker({
      el: '#year1',
      type: 'infinite',
      source: yearSource,
      count: 20,
      onChange: (selected) => {
          currentYear = selected.value;
          daySource = getDays(currentYear, currentMonth);
          daySelector.updateSource(daySource);
          console.log(yearSelector.value, monthSelector.value, daySelector.value);
      }
  });
  
//   monthSelector = new Picker({
//       el: '#month1',
//       type: 'infinite',
//       source: monthSource,
//       count: 20,
//       onChange: (selected) => {
//           currentMonth = selected.value;
          
//           daySource = getDays(currentYear, currentMonth);
//           daySelector.updateSource(daySource);
//           console.log(yearSelector.value, monthSelector.value, daySelector.value);
//       }
//   });
  
//   daySelector = new Picker({
//       el: '#day1',
//       type: 'infinite',
//       source: [],
//       count: 20,
//       onChange: (selected) => {
//           currentDay = selected.value;
//           console.log(yearSelector.value, monthSelector.value, daySelector.value);
//       }
//   });
  
  
  let now = new Date();
  
  
  setTimeout(function() {
    yearSelector.select(now.getFullYear());
    monthSelector.select(now.getMonth() + 1);
    daySelector.select(now.getDate()); 
  });
  
  
  // // time
  // let hours = new Array(24).fill(1).map((v, i) => {
  //   return { value: i + 1, text: i + 1}
  // });
  // let minutes = new Array(60).fill(1).forEach((v, i) => {
  //   return { value: i + 1, text: i + 1}
  // });
  
  // let hourSelector = new IosSelector({
  // 	el: '#hour',
  // 	type: 'normal',
  // 	source: hours,
  // 	count: 20,
  // 	onChange: (selected) => {
  // 		currentDay = selected.value;
  // 		console.log(yearSelector.value, monthSelector.value, daySelector.value);
  // 	}
  // });
  
  // let minuteSelector = new IosSelector({
  // 	el: '#minute',
  // 	type: 'normal',
  // 	source: minutes,
  // 	count: 20,
  // 	onChange: (selected) => {
  // 		currentDay = selected.value;
  // 		console.log(yearSelector.value, monthSelector.value, daySelector.value);
  // 	}
  // });
  