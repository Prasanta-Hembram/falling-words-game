// HTTP GET LEVEL FROM index.html
const params = new URLSearchParams(window.location.search);
const LEVEL = params.get('lvl');

// DOM ELEMENTS
const buttonElementID = document.getElementById('StartButton');
const gameContentID = document.getElementById('GameContent');
const gameContentClass = document.getElementsByClassName('game-content');
const inputElementID = document.getElementById('InputWord');
const scoreElementID = document.getElementById('Score');
const scoreElementClass = document.getElementsByClassName('score');
const levelElementID = document.getElementById('Level');

// VARIABLES
const currentLevel = LEVEL;
const gameWidth = gameContentID.clientWidth;
const gameHeight = gameContentID.clientHeight;
let score = 0;
let gameOver = false;
let arrWords = [];
let arrWordsDiv = [];
let topVal = 0;

// SOUNDS
const startGameSound = document.getElementById('StartGameSound');
const gameoverSound = document.getElementById('GameoverSound');
const pointSound = document.getElementById('PointSound');
const notPointSound = document.getElementById('NotPointSound');

// DEFAULT VOLUME (was too high)
startGameSound.style.zIndex = 1;
startGameSound.volume = 0.5;
gameoverSound.volume = 0.5;
pointSound.volume = 0.2;

// DICTIONARY WORDS
const DICTIONARY = [
 'ᱟᱨᱚᱱ',
'ᱟᱨᱚᱱ',
'ᱟᱵᱟ',
'ᱟᱵᱰ',
'ᱟᱞᱚᱢ',
'ᱟᱹᱵᱰᱟᱹ',
'ᱟᱵᱰᱮᱞ',
'ᱟᱹᱵᱰᱤ',
'ᱟᱹᱰᱤ',
'ᱟᱵᱰᱚ',
'ᱟᱵᱚᱱ',
'ᱟᱹᱵᱫᱩ',
'ᱟᱹᱵᱫᱩᱞ',
'ᱟᱹᱵᱫᱩᱞ',
'ᱟᱹᱵᱫᱩ',
'ᱟᱫᱮᱨ',
'ᱟᱢ',
'ᱤᱧᱟᱜ',
'ᱟᱹᱵᱮᱞ',
'ᱟᱹᱵᱮᱞ',
'ᱟᱹᱵᱮᱞ',
'ᱟᱡᱟᱜ',
'ᱟᱹᱵᱮᱱ',
'ᱟᱹᱵᱮᱨ',
'ᱟᱹᱵᱮᱨ',
'ᱟᱹᱵᱮᱨ',
'ᱟᱠᱟ',
'ᱟᱹᱣᱨᱤ',
'ᱟᱹᱵᱽᱨᱟ',
'ᱟᱹᱨᱟ',
'ᱟᱹᱵᱟ',
'ᱟᱹᱵᱥᱟᱹᱞᱚᱱ',
'ᱟᱹᱵᱥᱚᱞᱚᱱ',
'ᱟᱹᱵᱩ',
'ᱟᱹᱵᱩᱤᱥᱟ',
'ᱟᱹᱵᱩ',
'ᱟᱹᱵᱩᱫ',
'ᱟᱰᱚᱢ',
'ᱟᱫᱚᱱ',
'ᱟᱫᱚᱱ',
'ᱟᱫᱚᱤᱨ',
'ᱟᱫᱚᱩᱠᱳ',
'ᱟᱫᱤᱥᱳᱱ',
'ᱟᱰᱮ',
'ᱟᱰᱮᱞᱵ',
'ᱟᱰᱮᱞ',
'ᱟᱰᱮᱞᱤ',
'ᱟᱰᱮᱞ',
'ᱟᱰᱮᱞᱢᱚ',
'ᱟᱰᱮᱞᱠᱤ',
'ᱟᱰᱮᱢ',
'ᱟᱰᱮᱢᱟᱨ',
'ᱟᱰᱮᱢᱟᱨᱚ',
'ᱟᱰᱮᱱ',
'ᱟᱰᱮᱨᱦᱚ',
'ᱟᱰᱮᱨᱤᱴ',
'ᱟᱰᱜᱟ',
'ᱟᱰᱷᱮ',
'ᱟᱰᱤᱵ',
'ᱟᱰᱤᱵᱮ',
'ᱟᱰᱤᱮᱞ',
'ᱟᱰᱤᱨ',
'ᱟᱫᱤ',
'ᱟᱰᱚ',
'ᱟᱹᱰᱚᱱ',
'ᱟᱹᱰᱚᱱᱤᱥ',
'ᱮᱰᱨᱤᱭᱟ',
'ᱮᱰᱨᱤᱭᱟ',
'ᱮᱰᱨᱤᱭᱟ',
'ᱮᱰᱨᱤᱭᱟ',
'ᱮᱰᱨᱤᱭᱟᱱ',
'ᱮᱰᱨᱤᱭᱟᱱᱚ',
'ᱮᱰᱨᱤᱭᱮᱞ',
'ᱮᱰᱨᱤᱭᱮᱞ',
'ᱟᱜᱟᱯᱮᱴᱚ',
'ᱟᱜᱟᱯᱤᱭᱚ',
'ᱟᱜᱟᱯᱤᱴᱚ',
'ᱟᱜᱟᱴᱚᱱ',
'ᱟᱜᱮᱱᱚᱨ',
'ᱟᱜᱮᱭᱚ',
'ᱚᱜᱚᱥᱴᱤᱱ',
'ᱚᱜᱚᱥᱴᱤᱱ',
'ᱚᱜᱩᱥᱴᱤᱱ',
'ᱟᱹᱦᱢᱟᱹᱫ',
'ᱟᱹᱦᱢᱮᱫ',
'ᱮᱭᱠᱟᱨᱰᱚ',
'ᱮᱭᱰᱟᱱ',
'ᱮᱭᱰᱟᱱᱚ',
'ᱮᱭᱰᱮᱱ',
'ᱮᱭᱠᱣᱮ',
'ᱮᱭᱢᱮ',
'ᱮᱭᱢᱚᱱ',
'ᱮᱭᱱᱜᱮᱨᱩ',
'ᱮᱭᱛᱚᱨ',
'ᱟᱡᱢᱮᱴ',
'ᱟᱠᱷᱮᱱ',
'ᱟᱹᱠᱤᱨᱚ',
'ᱟᱠᱡᱟᱱ',
'ᱟᱞ',
'ᱟᱞ ᱜᱚᱨᱮ',
'ᱟᱞᱟᱫᱤ',
'ᱟᱞᱟᱤᱱ',
'ᱟᱞᱟᱱ',
'ᱟᱞᱟᱱ',
'ᱟᱞᱟᱱᱚ',
'ᱟᱞᱟᱚᱨ',
'ᱟᱞᱟᱨᱤ',
'ᱟᱞᱵᱟᱱ',
'ᱟᱞᱵᱟᱱᱚ',
'ᱟᱞᱵᱟᱨ',
'ᱟᱞᱵᱟᱨ',
'ᱟᱞᱵᱮᱨᱤ',
'ᱟᱹᱞᱵᱟᱹᱨᱴ',
'ᱟᱹᱵᱟᱹᱨᱴ',
'ᱟᱹᱞᱵᱟᱹᱨᱴ',
'ᱟᱹᱞᱵᱟᱹᱨᱴ',
'ᱟᱹᱞᱵᱟᱹᱨᱴ',
'ᱟᱹᱞᱵᱟᱹᱨᱴ',
'ᱟᱹᱞᱵᱤᱠᱚ',
'ᱟᱹᱞᱵᱤᱰᱚ',
'ᱟᱹᱞᱵᱤᱱ',
'ᱟᱹᱵᱨᱮᱠᱴ',
'ᱟᱞᱵᱩᱥ',
'ᱟᱞᱥᱤᱰᱮᱥ',
'ᱟᱞᱠᱣᱤᱱᱚ',
'ᱟᱹᱞᱰᱟᱭᱟᱹᱨ',
'ᱟᱞᱰᱮᱵᱟᱨ',
'ᱟᱞᱰᱮᱢᱟᱨ',
'ᱟᱞᱰᱮᱱ',
'ᱟᱞᱰᱮᱨᱤᱠᱚ',
'ᱟᱞᱰᱚ',
'ᱟᱞᱰᱚᱣᱩᱥ',
'ᱟᱞᱮ',
'ᱟᱞᱮᱟᱨᱰᱚ',
'ᱟᱞᱮᱠ',
'ᱟᱞᱮᱰ',
'ᱟᱞᱮᱥᱴᱟᱹᱨ',
'ᱟᱞᱮᱡᱟᱱ',
'ᱟᱞᱮᱡᱟᱱ',
'ᱟᱞᱮᱡᱟᱱᱰᱨᱚ',
'ᱟᱞᱮᱡᱚ',
'ᱟᱞᱮᱠ',
'ᱟᱞᱮᱠᱥᱟᱱ',
'ᱚᱞᱮᱱ',
'ᱟᱞᱮᱯᱤᱭᱚ',
'ᱟᱞᱮᱥᱤᱭᱚ',
'ᱟᱞᱮᱥᱤᱥ',
'ᱟᱞᱮᱥᱟᱱᱰᱨᱚ',
'ᱟᱞᱮᱠᱥ',
'ᱟᱞᱮᱠᱥ',
'ᱟᱞᱮᱠᱥ',
];

// GAME START
function init() {
  showLevel();
  setInterval(() => {
    if (!gameOver) {
      drawWord();
    }
  }, currentLevel);
  updateWordPosition();
}

// CREATE WORD, STORES IT IN AN ARRAY & GET POSITION WHERE IT STARTS TO FALLLS
function drawWord() {
  const word = generateRandomWord(DICTIONARY);
  arrWords.push(word);
  let wordDiv = document.createElement('div');
  wordDiv.innerHTML = `<p>${word}</p>`;
  wordDiv.classList.add('word');
  wordDiv.style.top = '-2px';
  wordDiv.style.zIndex = '1';
  wordDiv.style.left = (Math.random() * (gameWidth - 150)).toString() + 'px';
  arrWordsDiv.push(wordDiv);
  gameContentClass[0].appendChild(wordDiv);
}

// GET RANDOM WORD FROM DICTIONARY
function generateRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

// GET VALUE FROM INPUT
function getWord() {
  let inputValue = inputElementID.value.toLowerCase();
  inputElementID.value = '';
  if (arrWords.includes(inputValue)) {
    updateScore();
    let indexWord = arrWords.indexOf(inputValue);
    let wordDivIndex = arrWordsDiv[indexWord];
    arrWords.splice(indexWord, 1);
    arrWordsDiv.splice(indexWord, 1);
    wordDivIndex.parentNode.removeChild(wordDivIndex);
    playSound(pointSound, 0, notPointSound);
  } else {
    playSound(notPointSound, 0, pointSound);
  }
}

// FALLING WORD LOGIC + GAMEOVER
function updateWordPosition() {
  setInterval(() => {
    if (!gameOver) {
      let wordText = document.getElementsByClassName('word');
      for (let i = 0; i < arrWords.length; i++) {
        if (parseInt(topVal) + 15 > gameHeight) {
          gameOver = true;
          gameContentID.innerHTML = modalGameOver();
          playSound(gameoverSound, 8, startGameSound);
          gameoverSound.style.zIndex = 1;
          inputElementID.setAttribute('disabled', true);
        } else {
          topVal = wordText[i].style.top;
          topVal.replace('px', '');
          wordText[i].style.top = (parseInt(topVal) + 1).toString() + 'px';
        }
      }
    }
  }, 20);
}

// UPDATE SCORE
function updateScore() {
  score += 10;
  scoreElementID.innerHTML = `<p>ᱥᱠᱳᱨ ${score}</p>`;
}

// HELPERS
// PLAY SOUND
function playSound(sound, time, stopSound) {
  let playPromise = sound.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        stopSound.pause();
        sound.pause();
        stopSound.currentTime = 0;
      })
      .then(() => {
        sound.currentTime = time;
      })
      .then(() => {
        sound.play();
      });
  }
}

// SHOWS CURRENT PLAYING LEVEL
function showLevel() {
  if (LEVEL === '3000') {
    levelElementID.innerHTML = `<p>ᱞᱮᱣᱮᱞ : ᱟᱞᱜᱟ</p>`;
  } else if (LEVEL === '2000') {
    levelElementID.innerHTML = `<p>ᱞᱮᱣᱮᱞ : ᱢᱤᱰᱤᱭᱟᱹᱢ</p>`;
  } else {
    levelElementID.innerHTML = `<p>ᱞᱮᱣᱮᱞ : ᱟᱸᱴ</p>`;
  }
}

// GAMEOVER MODAL
function modalGameOver() {
  return `
    <div class="modal-gameover col-8">
      <h1> ᱠᱷᱮᱞ ᱠᱷᱚᱛᱚᱢ </h2>
      <h2> ᱥᱠᱳᱨ: ${score} </h2>
      <button id="Restart" class="my-2 btn-modal">
        <a href="game.html?lvl=${currentLevel}">
          <h6>ᱫᱩᱦᱲᱟᱹᱮᱛᱷᱚᱵ</h6>
        </a>
      </button>
      <button id="Menu" class="my-2 btn-modal">
        <a href="index.html">
          <h6>ᱢᱮᱱᱩ ᱛᱮ ᱨᱩᱣᱟᱹᱲ</h6>
        </a>
      </button>
    </div>
  `;
}

init();
