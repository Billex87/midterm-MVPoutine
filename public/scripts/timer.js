// const { ModelBuildPage } = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");

//Timer for when order is made

$(() => {
  const startingMinutes = 20;
  let time = startingMinutes * 60;

  const countdownElement = document.getElementById('countdown-timer');

  const updateCountdown = () => {
    if ($(countdownElement).attr('data-status') === 'Done'){
      clearInterval(intervalID)
      return
    }
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownElement.innerHTML = `${minutes}:${seconds}`;
    time--;
    time = time < 0 ? 0 : time;
  };

  let intervalID = setInterval(updateCountdown, 1000);
});


