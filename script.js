let b = document.getElementById("break");
let s = document.getElementById("session");

let dec1 = document.getElementsByClassName("dec")[0];
let dec2 = document.getElementsByClassName("dec")[1];

let inc1 = document.getElementsByClassName("inc")[0];
let inc2 = document.getElementsByClassName("inc")[1];

let reset = document.getElementById("reset");
let pp = document.getElementById("play-pause");

let min = document.getElementById("s-min");
let sec = document.getElementById("s-sec");
let timerText = document.getElementById("s-b");

let breaktime = 5;
let sessiontime = 25;
let seconds = 0;

const ST = sessiontime;
const BT = breaktime;

let isSession = true;
let paused = true;

var interval = null;

b.innerHTML = breaktime;
s.innerHTML = sessiontime;
pp.innerHTML = paused ? "&#9658;" : "&#10074;&#10074;";

var audio = new Audio('https://freesound.org/data/previews/66/66136_606715-lq.mp3');

dec1.onclick = () => {
  if(breaktime > 1) {
    --breaktime;
    b.innerHTML = breaktime;
    min.innerHTML = isSession ? sessiontime : breaktime;
  }
}

dec2.onclick = () => {
  if(sessiontime > 1) {
    --sessiontime;
    s.innerHTML = sessiontime;
    min.innerHTML = isSession ? sessiontime : breaktime;
  }
}

inc1.onclick = () => {
  if(breaktime < 60) {
    ++breaktime;
    b.innerHTML = breaktime;
    min.innerHTML = isSession ? sessiontime : breaktime;
  }
}

inc2.onclick = () => {
  if(sessiontime < 60) {
    ++sessiontime;
    s.innerHTML = sessiontime;
    min.innerHTML = isSession ? sessiontime : breaktime;
  }
}

timerText.innerHTML = isSession ? "Session" : "Break";
min.innerHTML = isSession ? sessiontime : breaktime;
min.innerHTML = min.innerHTML < 10 ? "0" + min.innerHTML : min.innerHTML;
sec.innerHTML = seconds < 10 ? "0" + seconds : seconds;

reset.onclick = () => {
  breaktime = 5;
  sessiontime = 25;
  seconds = 0;
  paused = true;
  isSession = true;
  pp.innerHTML = paused ? "&#9658;" : "&#10074;&#10074;";
  
  s.innerHTML = sessiontime;
  b.innerHTML = breaktime;
  timerText.innerHTML = isSession ? "Session" : "Break";
  min.innerHTML = isSession ? sessiontime : breaktime;
  min.innerHTML = min.innerHTML < 10 ? "0" + min.innerHTML : min.innerHTML;
  sec.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("timer").style.color = "black";
  
  dec1.disabled = false;
  dec2.disabled = false;
  inc1.disabled = false;
  inc2.disabled = false;
  clearInterval(interval);
}

pp.onclick = () => {
  paused = !paused;
  pp.innerHTML = paused ? "&#9658;" : "&#10074;&#10074;";
  if (!paused) {
    dec1.disabled = true;
    dec2.disabled = true;
    inc1.disabled = true;
    inc2.disabled = true;
    interval = setInterval(()=>{
      if (seconds === 0) {
        if (isSession) {
          --sessiontime;
          seconds = 59;
        } else {
          --breaktime;
          seconds = 59;
        }
      } else {
        --seconds;
      }
      if (isSession && sessiontime == 0 && seconds == 0) {
        audio.play();
        isSession = !isSession;
        sessiontime = ST;
      }
      if (!isSession && breaktime == 0 && seconds == 0) {
        audio.play();
        isSession = !isSession;
        breaktime = BT;
      }
      timerText.innerHTML = isSession ? "Session" : "Break";
      min.innerHTML = isSession ? sessiontime : breaktime;
      min.innerHTML = min.innerHTML < 10 ? "0" + min.innerHTML : min.innerHTML;
      sec.innerHTML = seconds < 10 ? "0" + seconds : seconds;
      if (sessiontime < 1 || breaktime < 1) {
        document.getElementById("timer").style.color = "crimson";
      } else {
        document.getElementById("timer").style.color = "black";
      }
    }, 1000);
  } else {
    dec1.disabled = false;
    dec2.disabled = false;
    inc1.disabled = false;
    inc2.disabled = false;
    clearInterval(interval);
  }
}