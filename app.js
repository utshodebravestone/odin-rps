const ROCK = "Rock";
const PAPER = "Paper";
const SCISSOR = "Scissor";
const states = [ROCK, PAPER, SCISSOR];

const getComputerState = () =>
  states[Math.floor(Math.random() * states.length)];

const getDrawResult = (playerState, computerState) => {
  if (playerState === computerState)
    return [`${playerState} can't cut, break or wrap ${computerState}`, 0, 0];
  switch (JSON.stringify([playerState, computerState])) {
    case JSON.stringify([ROCK, PAPER]):
      return ["Paper wraps Rock.", 0, 1];
    case JSON.stringify([PAPER, SCISSOR]):
      return ["Scissor cuts Paper.", 0, 1];
    case JSON.stringify([SCISSOR, ROCK]):
      return ["Rock breaks Scissor.", 0, 1];
    case JSON.stringify([PAPER, ROCK]):
      return ["Paper wraps Rock.", 1, 0];
    case JSON.stringify([SCISSOR, PAPER]):
      return ["Scissor cuts Paper.", 1, 0];
    case JSON.stringify([ROCK, SCISSOR]):
      return ["Rock breaks Scissor.", 1, 0];
    default:
      throw new Error(
        `Unknown state. Player state: ${playerState}, Computer state: ${computerState}.`
      );
  }
};

const draw = (playerState, computerState) => {
  playerState = states.find(
    (state) => state.toLowerCase() === playerState.toLowerCase()
  );
  if (playerState === null) {
    return [
      "Input a valid state. Valid states are: Rock, Paper, Scissor.",
      0,
      0,
    ];
  } else {
    return getDrawResult(playerState, computerState);
  }
};

let playerScore = 0;
let computerScore = 0;
let playerScoreEl = document.querySelector("#player-score");
let computerScoreEl = document.querySelector("#computer-score");
let newGame = document.querySelector("#play");
let clickableEls = document.querySelectorAll(".clickable");

const play = (playerState) => {
  let computerState = getComputerState();
  alert(`Computer choose: ${computerState}`);
  const [message, ps, cs] = draw(playerState, computerState);
  playerScore += ps;
  computerScore += cs;
  playerScoreEl.innerHTML = playerScore;
  computerScoreEl.innerHTML = computerScore;
  if (ps > cs) {
    alert(`${message} You got the score.`);
  } else if (cs > ps) {
    alert(`${message} Computer gets the score.`);
  } else {
    alert(`${message}. It's a draw. `);
  }
};

clickableEls.forEach((clickableEl) =>
  clickableEl.addEventListener("click", () => {
    play(clickableEl.innerHTML);
  })
);
newGame.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.innerHTML = playerScore;
  computerScoreEl.innerHTML = computerScore;
});
console.log(clickableEls);
