'use strict';

//slecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting codition

let scores, currentScore, activePlayer, playing;

init();

function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = activePlayer = 0;
  playing = true;
}
// Rolling dice fuctionalty
btnRoll.addEventListener('click', RollingDiceHandler);

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
function RollingDiceHandler() {
  if (playing) {
    diceEl.classList.remove('hidden');
    // 1.gerating random random
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display it
    diceEl.src = `dice-${dice}.png`;

    // 3 . check for rolled is not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.querySelector(`.player--winner`).classList.remove('player--winner');
  init();
});
