setInterval(setClock, 1000)
const hourHandIsrael = document.querySelector('[data-hour-hand-Israel]')
const minuteHandIsrael = document.querySelector('[data-minute-hand-Israel]')
const secondHandIsrael = document.querySelector('[data-second-hand-Israel]')

const hourHandGermany = document.querySelector('[data-hour-hand-Germany]')
const minuteHandGermany = document.querySelector('[data-minute-hand-Germany]')
const secondHandGermany = document.querySelector('[data-second-hand-Germany]')

const hourHandEngland = document.querySelector('[data-hour-hand-England]')
const minuteHandEngland = document.querySelector('[data-minute-hand-England]')
const secondHandEngland = document.querySelector('[data-second-hand-England]')

async function setClock() {
  
  const response = await fetch("/", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: ""
  });
  const clock=await response.json();

  const currentDate = new Date()
  
  for (let i=0;i<clock.length;i++)
  {
    //set analog clock
    const secondsRatio = (currentDate.getSeconds()+clock[i].second) / 60
    const minutesRatio = (secondsRatio + (currentDate.getMinutes())+clock[i].minute) / 60
    const hoursRatio = (minutesRatio + (currentDate.getHours())+clock[i].hour) / 12

    setRotation(clock[i].countryName+"Second", secondsRatio)
    setRotation(clock[i].countryName+"Minute", minutesRatio)
    setRotation(clock[i].countryName+"Hour", hoursRatio)

    //set digital clocks
    let hh = currentDate.getHours()+clock[i].hour;
    let mm = currentDate.getMinutes()+clock[i].minute;
    let ss = currentDate.getSeconds()+clock[i].second;
    let session = "AM";
    if(hh > 12){
      session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
    let time = hh + ":" + mm + ":" + ss + " " + session;
    document.getElementById("digital_clock_"+clock[i].countryName).innerText = time; 

    
  
  }
  
}

function setRotation(id, rotationRatio) {
  const element=document.getElementById(id);
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()


  
  
  
  