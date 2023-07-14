function start(lengthsetting, timesetting) {
  const apiUrl = `https://random-word-api.vercel.app/api?words=${lengthsetting}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(words => {
      const str = words.join(' ');
      const text = document.querySelector(".text");
      const input = document.querySelector(".input");
      const progressBar = document.querySelector(".progress-bar");

      var time = str.length / timesetting;
      var totalTime = Math.round(time);
      var css = time + "s animate linear";
      var javatime = time * 1000;

      let timer = null;

      const charEls = [];

      function populateText(str) {
        str.split(" ").map(word => {
          const capitalizeFirstLetter = Math.random() < 0.4;
          if (capitalizeFirstLetter) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
          }
          word.split("").map(letter => {
            const span = document.createElement("span");
            span.innerText = letter;
            text.appendChild(span);
            charEls.push(span);
          });
          const space = document.createElement("span");
          space.innerText = " ";
          text.appendChild(space);
        });
      }
      
      populateText(str);

      function resetCharEls() {
        charEls.map(charEl => {
          charEl.classList.remove("correct");
          charEl.classList.remove("wrong");
        });
      }

      input.addEventListener("input", () => {
        if (!timer) {
          progressBar.classList.add("active");
          document.getElementById('progress-bar').style.animation = css;
          timer = setTimeout(() => {
            if (confirm("You ran out of time! You can close this notification to continue typing or press OK to retry.") === true) {
              location.reload()
            } else {
              //nothing
            }
          }, javatime);
        }
        const val = input.value;
        resetCharEls();
        let errorCount = 0;
        let correctCount = 0;
        val.split("").map((letter, i) => {
          if (letter === str[i]) {
            charEls[i].classList.add("correct");
            correctCount = correctCount + 1
          } else {
            charEls[i].classList.add("wrong");
            errorCount = errorCount + 1
          };
        });
        if (val.length >= str.length || val.length === str.length) {
          if (errorCount === 1) {
            var resultText = "Well Done! You completed the test within the time limit of " + totalTime + " seconds with " + errorCount + " error!\n\nPress OK to restart and reload the page."
          } else {
            var resultText = "Well Done! You completed the test within the time limit of " + totalTime + " seconds with " + errorCount + " errors!\n\nPress OK to restart and reload the page."
          }
          if (confirm(resultText) === true) {
            location.reload()
          } else {
            //nothing
          }
          clearTimeout(timer);
        }
      });
    })
    .catch(error => {
      console.error("Error fetching words:", error);
      alert("An error occurred while fetching words. Please try again later.");
    });
}

function updateSettings() {
  if (document.getElementById("timeInput").value.length == 0 || document.getElementById("lengthInput").value.length == 0) {
    window.alert('Please input values in the setting boxes before generating a level.')
  } else {
    var settingLength = document.getElementById("lengthInput").value;
    var settingTime = document.getElementById("timeInput").value;
    start(settingLength, settingTime);
  }
}
