// selecting relevant elements
const circleButton = document.querySelector(".circle-button");

const list = document.querySelector(".list");

// add event listeners

circleButton.addEventListener("click", runSpeechRecognition);

function runSpeechRecognition() {
  const recognition = new webkitSpeechRecognition();

  recognition.onstart = function () {
    circleButton.innerHTML = "<p>Listening...</p>";
    circleButton.classList.add("listening");
  };

  recognition.onspeechend = function () {
    circleButton.innerHTML = "<p>Tap to Speak </p>";
    circleButton.classList.remove("listening");
    recognition.stop();
  };

  recognition.onresult = function (event) {
    console.log(event);
    const transcript = event.results[0][0].transcript;

    try {
      let result = eval(transcript);

      list.innerHTML = `<li>${transcript}  = ${result}</li>` + list.innerHTML;
    } catch (error) {
      console.log(error);
      alert(
        `the expression: "${transcript}"  could not be evaluated. Perhaps it is not a mathematical expression`
      );
    }
  };

  recognition.start();
}
