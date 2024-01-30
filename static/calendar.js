transformTask = (taskList, color) => {
  let event = new Array(taskList.length);
  for(let i=0;i<taskList.length;i++){
    event[i] = {
      title : taskList[i].name,
      start : taskList[i].date+"T"+taskList[i].start,
      end : taskList[i].date_end+"T"+taskList[i].end,
      color : color
    }
  };
  console.log("TRANSFORMED ",event);
  return event;
}
transfreeTime = (taskList, color) => {
  let event = new Array(taskList.length);
  for(let i=0;i<taskList.length;i++){
    event[i] = {
      start : taskList[i].date+"T"+taskList[i].start,
      end : taskList[i].date_end+"T"+taskList[i].end,
      color : color
    }
  };
  console.log("TRANSFORMED ",event);
  return event;
}
document.addEventListener('DOMContentLoaded',function() {
    var tasks = transformTask(JSON.parse(document.querySelector("body").getAttribute('tasks')),'#5585b5');
    var freeTimes = transfreeTime(JSON.parse(document.querySelector("body").getAttribute('frTime')),'#9fd3c7');
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      locales : 'fr',
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear'
      },
      firstDay :1,
      buttonText: {
        today: 'Aujourd\'hui',
        month:'Mois',
        'week':'Semaine',
        day : 'Jour',
        list: 'Planning',
      },
      navLinks: true,
      selectable: true,
      nowIndicator: true,
      allDayText : '24h',
      themeSystem: 'Litera',
      events : tasks.concat(freeTimes),
    });
    console.log('jsp');
    console.log('events dans calendarjs',tasks.concat(freeTimes));
    calendar.render();   
})