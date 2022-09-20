// array of words
const words = [
  "Hat",
  "River",
  "Lucky",
  "Statue",
  "Generate",
  "Stubborn",
  "Cocktail",
  "Runaway",
  "Joke",
  "Developer",
  "Establishment",
  "Hero",
  "Javascript",
  "Nutrition",
  "Revolver",
  "Echo",
  "Siblings",
  "Investigate",
  "Horrendous",
  "Symptom",
  "Laughter",
  "Magic",
  "Master",
  "Space",
  "Definition",
  "Champion",
  "Ghost",
  "Fierce",
  "Html",
  "Css",
];

// setting levels
const lvls = {
  easy: 5,
  normal: 4,
  hard: 3,
};

// selector
const select = document.querySelector(".form-select");
const startButton = document.querySelector(".begin");
const theWord = document.querySelector(".words");
const input = document.querySelector(".form-control");
const btnAgain = document.querySelector(".button-again");
const timeLeftSpan = document.querySelector(".time span");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finishMessage = document.querySelector(".finish");

var LevelSeconds;
// Change Level From Here
select.onchange = function () {
  var LevelName = select.value;
  LevelSeconds = lvls[LevelName];
  timeLeftSpan.innerHTML = LevelSeconds;
  scoreTotal.innerHTML = words.length;
};

// disaple paste event
input.onpaste = function () {
  return false;
};
// start playing
startButton.onclick = function () {
  this.remove();
  input.focus();
  btnAgain.style.display = "block";
  // generate word function
  genWords();
};
function genWords() {
  // get random word from array
  var randomWord = words[Math.floor(Math.random() * words.length)];
  // هنقربه وبعدين نضربه فى عدد عناصر الارى عشان يجبلى كلمه عشوائيه
  // get word index
  var wordIndex = words.indexOf(randomWord);
  // remove word from array عن طريق الانديكس بتاعها
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  //call start play function
  startPlay();
}
// start play function
function startPlay() {
  timeLeftSpan.innerHTML = LevelSeconds;
  var start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      //compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // معناها ان فى كلمات موجوده
          //call generate word function
          genWords();
        } else {
          var span = document.createElement("span");
          span.className = "win";
          var spanText = document.createTextNode("Congratulations");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
        }
      } else {
        var span = document.createElement("span");
        span.className = "lose";
        var spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
btnAgain.onclick = function () {
  window.location.reload();
};
