// const { ModelBuildPage } = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");

//Timer for when order is made

$(() => {
  const startingMinutes = 20;
  let time = startingMinutes * 60;

  const countdownElement = document.getElementById('countdown-timer');

  const updateCountdown = () => {
    console.log("look here")
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownElement.innerHTML = `${minutes}:${seconds}`;

    time--;
    time = time < 0 ? 0 : time;
  };

  setInterval(updateCountdown, 1000);


});


