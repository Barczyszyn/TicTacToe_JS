const x = document.querySelector(".x");
const o = document.querySelector(".o");
const boxes = document.querySelectorAll(".box");
const buttons = document.querySelectorAll("#buttons-container button");
const messageContainer = document.querySelector("#message");
const messageText = document.querySelector("#message p");
let secondPlayer;

let player1 = 0;
let player2 = 0;

function handleBoxClick() {
  let elem = checkElem(player1, player2);

  if (this.childNodes.length == 0) {
    let clone = elem.cloneNode(true);

    this.appendChild(clone);

    if (player1 == player2) {
      player1++;

      if (secondPlayer == "ai-player") {
        for (let i = 0; i < boxes.length; i++) {
          boxes[i].removeEventListener("click", handleBoxClick);
        }
        setTimeout(() => {
          if (player1 > 0) {
            computerPlay();
          }
        }, 1000);
      }
    } else {
      player2++;
    }

    checkWinCondition();
  }
}

function handleButtonClick() {
  const scoreboardX = document.querySelector("#scoreboard-1");
  const scoreboardO = document.querySelector("#scoreboard-2");

  scoreboardX.textContent = 0;
  scoreboardO.textContent = 0;

  secondPlayer = this.getAttribute("id");

  if (secondPlayer == "2-players") {
    document.getElementById("2-players").style.border = "3px solid #000";
    document.getElementById("ai-player").style.border = "none";
  } else if (secondPlayer == "ai-player") {
    document.getElementById("ai-player").style.border = "3px solid #000";
    document.getElementById("2-players").style.border = "none";
  }

  player1 = 0;
  player2 = 0;

  const boxesToRemove = document.querySelectorAll(".box div");

  for (let j = 0; j < boxesToRemove.length; j++) {
    boxesToRemove[j].parentNode.removeChild(boxesToRemove[j]);
  }

  setTimeout(() => {
    const container = document.querySelector("#container");
    container.classList.remove("hide");
  }, 500);
}

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", handleBoxClick);
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleButtonClick);
}

function checkElem(player1, player2) {
  let elem;

  if (player1 == player2) {
    elem = x;
  } else {
    elem = o;
  }

  return elem;
}

function checkWinCondition() {
  const b1 = document.getElementById("block-1");
  const b2 = document.getElementById("block-2");
  const b3 = document.getElementById("block-3");
  const b4 = document.getElementById("block-4");
  const b5 = document.getElementById("block-5");
  const b6 = document.getElementById("block-6");
  const b7 = document.getElementById("block-7");
  const b8 = document.getElementById("block-8");
  const b9 = document.getElementById("block-9");

  let winH = checkHorizontal(b1, b2, b3, b4, b5, b6, b7, b8, b9);
  let winV = checkVertical(b1, b2, b3, b4, b5, b6, b7, b8, b9);
  let winD = checkDiagonal(b1, b3, b5, b7, b9);

  let counter = 0;

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].childNodes[0] != undefined) {
      counter++;
    }
  }

  if (winH != "") {
    declareWinner(winH);
  } else if (winV != "") {
    declareWinner(winV);
  } else if (winD != "") {
    declareWinner(winD);
  } else if (winH == "" && winV == "" && winD == "" && counter == 9) {
    declareWinner("y");
  }
}

function checkHorizontal(b1, b2, b3, b4, b5, b6, b7, b8, b9) {
  let winner = "";

  if (
    b1.childNodes.length > 0 &&
    b2.childNodes.length > 0 &&
    b3.childNodes.length > 0
  ) {
    if (
      b1.childNodes[0].className == "x" &&
      b2.childNodes[0].className == "x" &&
      b3.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b1.childNodes[0].className == "o" &&
      b2.childNodes[0].className == "o" &&
      b3.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  if (
    b4.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b6.childNodes.length > 0
  ) {
    if (
      b4.childNodes[0].className == "x" &&
      b5.childNodes[0].className == "x" &&
      b6.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b4.childNodes[0].className == "o" &&
      b5.childNodes[0].className == "o" &&
      b6.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  if (
    b7.childNodes.length > 0 &&
    b8.childNodes.length > 0 &&
    b9.childNodes.length > 0
  ) {
    if (
      b7.childNodes[0].className == "x" &&
      b8.childNodes[0].className == "x" &&
      b9.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b7.childNodes[0].className == "o" &&
      b8.childNodes[0].className == "o" &&
      b9.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  return winner;
}

function checkVertical(b1, b2, b3, b4, b5, b6, b7, b8, b9) {
  let winner = "";

  if (
    b1.childNodes.length > 0 &&
    b4.childNodes.length > 0 &&
    b7.childNodes.length > 0
  ) {
    if (
      b1.childNodes[0].className == "x" &&
      b4.childNodes[0].className == "x" &&
      b7.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b1.childNodes[0].className == "o" &&
      b4.childNodes[0].className == "o" &&
      b7.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  if (
    b2.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b8.childNodes.length > 0
  ) {
    if (
      b2.childNodes[0].className == "x" &&
      b5.childNodes[0].className == "x" &&
      b8.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b2.childNodes[0].className == "o" &&
      b5.childNodes[0].className == "o" &&
      b8.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  if (
    b3.childNodes.length > 0 &&
    b6.childNodes.length > 0 &&
    b9.childNodes.length > 0
  ) {
    if (
      b3.childNodes[0].className == "x" &&
      b6.childNodes[0].className == "x" &&
      b9.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b3.childNodes[0].className == "o" &&
      b6.childNodes[0].className == "o" &&
      b9.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  return winner;
}

function checkDiagonal(b1, b3, b5, b7, b9) {
  let winner = "";

  if (
    b1.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b9.childNodes.length > 0
  ) {
    if (
      b1.childNodes[0].className == "x" &&
      b5.childNodes[0].className == "x" &&
      b9.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b1.childNodes[0].className == "o" &&
      b5.childNodes[0].className == "o" &&
      b9.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  if (
    b3.childNodes.length > 0 &&
    b5.childNodes.length > 0 &&
    b7.childNodes.length > 0
  ) {
    if (
      b3.childNodes[0].className == "x" &&
      b5.childNodes[0].className == "x" &&
      b7.childNodes[0].className == "x"
    ) {
      winner = "x";
    } else if (
      b3.childNodes[0].className == "o" &&
      b5.childNodes[0].className == "o" &&
      b7.childNodes[0].className == "o"
    ) {
      winner = "o";
    }
  }

  return winner;
}

async function declareWinner(winner) {
  const scoreboardX = document.querySelector("#scoreboard-1");
  const scoreboardO = document.querySelector("#scoreboard-2");
  let msg = "";

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", handleBoxClick);
  }

  await sleep(1000);

  if (winner == "x") {
    scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
    msg = "Player 1 wins!";
  } else if (winner == "o") {
    scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
    if (secondPlayer == "ai-player") {
      msg = "Computer wins!";
    } else {
      msg = "Player 2 wins!";
    }
  } else {
    msg = "It's a draw!";
  }

  messageText.innerHTML = msg;
  messageContainer.classList.remove("hide");

  setTimeout(function () {
    messageContainer.classList.add("hide");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener("click", handleBoxClick);
    }
  }, 2000);

  player1 = 0;
  player2 = 0;

  const boxesToRemove = document.querySelectorAll(".box div");

  for (let i = 0; i < boxesToRemove.length; i++) {
    boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
  }
}

function computerPlay() {
  const bestMove = minimax("o", 0, -Infinity, Infinity);
  const cloneO = o.cloneNode(true);
  boxes[bestMove.index].appendChild(cloneO);
  player2++;

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleBoxClick);
  }

  checkWinCondition();
}

function minimax(player, depth, alpha, beta) {
  const availableSpots = getEmptyBoxes();
  const cloneO = o.cloneNode(true);
  const cloneX = x.cloneNode(true);

  if (checkWinConditionForPlayer("o")) {
    return { score: 10 - depth };
  } else if (checkWinConditionForPlayer("x")) {
    return { score: depth - 10 };
  } else if (availableSpots.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < availableSpots.length; i++) {
    const move = {};
    move.index = availableSpots[i];
    boxes[availableSpots[i]].appendChild(player === "o" ? cloneO : cloneX);

    if (player === "o") {
      const result = minimax("x", depth + 1, alpha, beta);
      move.score = result.score;
      alpha = Math.max(alpha, move.score);
    } else {
      const result = minimax("o", depth + 1, alpha, beta);
      move.score = result.score;
      beta = Math.min(beta, move.score);
    }

    boxes[availableSpots[i]].removeChild(
      boxes[availableSpots[i]].childNodes[0]
    );
    moves.push(move);

    if (beta <= alpha) {
      break;
    }
  }

  let bestMove;
  if (player === "o") {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function getEmptyBoxes() {
  const empty = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].childNodes.length === 0) {
      empty.push(i);
    }
  }
  return empty;
}

function checkWinConditionForPlayer(playerClass) {
  const checkClass = (node, playerClass) =>
    node.childNodes.length > 0 && node.childNodes[0].className === playerClass;

  const b1 = document.getElementById("block-1");
  const b2 = document.getElementById("block-2");
  const b3 = document.getElementById("block-3");
  const b4 = document.getElementById("block-4");
  const b5 = document.getElementById("block-5");
  const b6 = document.getElementById("block-6");
  const b7 = document.getElementById("block-7");
  const b8 = document.getElementById("block-8");
  const b9 = document.getElementById("block-9");

  return (
    (checkClass(b1, playerClass) &&
      checkClass(b2, playerClass) &&
      checkClass(b3, playerClass)) ||
    (checkClass(b4, playerClass) &&
      checkClass(b5, playerClass) &&
      checkClass(b6, playerClass)) ||
    (checkClass(b7, playerClass) &&
      checkClass(b8, playerClass) &&
      checkClass(b9, playerClass)) ||
    (checkClass(b1, playerClass) &&
      checkClass(b4, playerClass) &&
      checkClass(b7, playerClass)) ||
    (checkClass(b2, playerClass) &&
      checkClass(b5, playerClass) &&
      checkClass(b8, playerClass)) ||
    (checkClass(b3, playerClass) &&
      checkClass(b6, playerClass) &&
      checkClass(b9, playerClass)) ||
    (checkClass(b1, playerClass) &&
      checkClass(b5, playerClass) &&
      checkClass(b9, playerClass)) ||
    (checkClass(b3, playerClass) &&
      checkClass(b5, playerClass) &&
      checkClass(b7, playerClass))
  );
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
