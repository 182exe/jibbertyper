const vowels = 'aeiou';
const consonents = 'bcdfghjklmnprstvw';
const rares = 'qxzy';

var settingLength = 15;
var settingTime = 3;

function generateRandWords(length) {
    const vowels = 'aeiou';
    const consonents = 'bcdfghjklmnprstvw';
    const rares = 'qxzy';
    const Vowels = 'AEIOU';
    const Consonents = 'BCDFGHJKLMNPRSTVW';
    const Rares = 'QXZY';
    const wordFormats = ['vcccv', 'rcvvcc', 'ccvcc', 'vvc', 'vc', 'v', 'ccvcvvc', 'rvvcccv', 'cvc', 'vccvc', 'vvccvcc', 'ccvvcc', 'ccvc', 'cvvcc', 'crvvcc', 'vcv', 'cvvcr', 'ccvccvvc', 'vcvv', 'rvcvvc', 'cv', 'cvr']
    let result
    let isFirstWord = 1
    let completionState = 0
    for (let i = 0; i < length; i++) {
        let currentWordFormat = wordFormats[Math.floor(Math.random() * wordFormats.length)]
        let currentWordStep = 0
        let currentStringAddition = ''
        for (let i = 0; i < currentWordFormat.length; i++) {
            if (currentWordFormat.charAt(currentWordStep) === 'v') {
                if (isFirstWord===1) {
                    currentStringAddition += Vowels[Math.floor(Math.random() * Vowels.length)]
                } else {
                    currentStringAddition += vowels[Math.floor(Math.random() * vowels.length)]
                }
            }
            if (currentWordFormat.charAt(currentWordStep) === 'c') {
                if (isFirstWord===1) {
                    currentStringAddition += Consonents[Math.floor(Math.random() * Consonents.length)]
                } else {
                    currentStringAddition += consonents[Math.floor(Math.random() * consonents.length)]
                }
            }
            if (currentWordFormat.charAt(currentWordStep) === 'r') {
                if (isFirstWord===1) {
                    currentStringAddition += Rares[Math.floor(Math.random() * Rares.length)]
                } else {
                    currentStringAddition += rares[Math.floor(Math.random() * rares.length)]
                }
            }
            currentWordStep = currentWordStep + 1
            isFirstWord = 0
        }
        if (Math.floor(Math.random() * 7) === 0) {
            let randWordSeparationSeed = Math.floor(Math.random() * 13)
            if (randWordSeparationSeed === 0) {
                currentStringAddition += ','
                isFirstWord = 0
            }
            if (randWordSeparationSeed === 1) {
                currentStringAddition += ','
                isFirstWord = 0
            }
            if (randWordSeparationSeed === 2) {
                currentStringAddition += ','
                isFirstWord = 0
            }
            if (randWordSeparationSeed === 3) {
                currentStringAddition += ','
                isFirstWord = 0
            }
            if (randWordSeparationSeed === 4) {
                isFirstWord = 0
            }
            if (randWordSeparationSeed === 5) {
                currentStringAddition += '?'
                isFirstWord = 1
            }
            if (randWordSeparationSeed === 6) {
                currentStringAddition += '.'
                isFirstWord = 1
            }
            if (randWordSeparationSeed === 7) {
                currentStringAddition += '.'
                isFirstWord = 1
            }
            if (randWordSeparationSeed === 8) {
                currentStringAddition += '!'
                isFirstWord = 1
            }
            if (randWordSeparationSeed === 9) {
                currentStringAddition += '!?'
                isFirstWord = 1
            }
            if (randWordSeparationSeed === 10) {
                currentStringAddition += '!!'
                isFirstWord = 1
            }
            if (randWordSeparationSeed === 11) {
                currentStringAddition += '...'
                isFirstWord = 0
            }
            if (randWordSeparationSeed === 12) {
                currentStringAddition += '.'
                isFirstWord = 1
            }
        }
        currentStringAddition += ' '
        result += currentStringAddition
        completionState = completionState+1
    }
    result = result.substring(9)
    if (Math.floor(Math.random() * 3) === 1) {
        result += emoticons[Math.floor(Math.random() * emoticons.length)];
    } else {
        let randWordSeparationSeed = Math.floor(Math.random() * 8)
        result = result.slice(0, -1)
        if (randWordSeparationSeed === 0) {
            result += '?'
            isFirstWord = 1
        }
        if (randWordSeparationSeed === 1) {
            result += '.'
            isFirstWord = 1
        }
        if (randWordSeparationSeed === 2) {
            result += '.'
            isFirstWord = 1
        }
        if (randWordSeparationSeed === 3) {
            result += '!'
            isFirstWord = 1
        }
        if (randWordSeparationSeed === 4) {
            result += '!?'
            isFirstWord = 1
        }
        if (randWordSeparationSeed === 5) {
            result += '!!'
            isFirstWord = 1
        }
        if (randWordSeparationSeed === 6) {
            result += '...'
            isFirstWord = 0
        }
        if (randWordSeparationSeed === 7) {
            result += '.'
            isFirstWord = 1
        }
    }
    return result
}

function start(lengthsetting,timesetting) {
  const raw = (generateRandWords(lengthsetting));
  const raw2 = raw.trim();
  const raw3 = raw2 + '.'
  const str = raw3.charAt(0).toUpperCase() + raw3.slice(1);
  const text = document.querySelector(".text");
  const input = document.querySelector(".input");
  const progressBar = document.querySelector(".progress-bar");
  
  var time = str.length / timesetting;
  var totalTime = Math.round(time);
  var css = time+"s animate linear";
  var javatime = time*1000;
  
  let timer = null;
  
  const charEls = [];
  
  function populateText(str) {
    str.split("").map(letter => {
      const span = document.createElement("span");
      span.innerText = letter;
      text.appendChild(span);
      charEls.push(span);
    });
  }
  populateText(str);
  
  function resetCharEls() {
    charEls.map(charEl => {
      charEl.classList.remove("correct");
      charEl.classList.remove("wrong");
    });
  };
  
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
      if (letter === str[i]){
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
}

function updateSettings() {
  if (document.getElementById("timeInput").value.length == 0 || document.getElementById("lengthInput").value.length == 0) {
    window.alert('Please input values in the setting boxes before generating a level.')
  } else {
    var settingLength = document.getElementById("lengthInput").value;
    var settingTime = document.getElementById("timeInput").value;
    start(settingLength,settingTime);
  }
}

//ok no more functions lol
