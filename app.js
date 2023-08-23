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

const draw = () => {
  let playerState = prompt("Chose a state between Rock, Paper and Scissor: ");
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
    let computerState = getComputerState();
    return getDrawResult(playerState, computerState);
  }
};

let playerScore = 0;
let computerScore = 0;
let playerScoreEl = document.querySelector("#player-score");
let computerScoreEl = document.querySelector("#computer-score");

const play = () => {
  const [message, ps, cs] = draw();
  playerScore += ps;
  computerScore += cs;
  playerScoreEl.innerHTML = playerScore;
  computerScoreEl.innerHTML = computerScore;
  if (ps > cs) {
    alert(`You got the score. ${message}`);
  } else if (cs > ps) {
    alert(`Computer gets the score. ${message}`);
  } else {
    alert(`It's a draw. ${message}`);
  }
};

document.querySelector("#play").addEventListener("click", play);
