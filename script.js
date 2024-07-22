"use strict";

let score = 20;
let high_score = 0;
let turns_left = 10;
let guess_number = Math.trunc(Math.random() * 20 + 1);

const resetGlobalVariables = function () {
  document.querySelector(".guess-message").textContent =
    "🤔 Start Guessing..... ";
  document.querySelector(".guess-message").style.color = "white";
  score = 20;
  document.querySelector(".score").textContent = score;
  turns_left = 10;
  document.querySelector(".turns-left").textContent = turns_left;
  guess_number = Math.trunc(Math.random() * 20) + 1;
};

const createNumberOfTurnsMessage = function () {
  const createTurnsLeftSpan = document.createElement("span");
  createTurnsLeftSpan.setAttribute("class", "turns-left");
  const createTurnsLeftTextNode = document.createTextNode(turns_left);
  createTurnsLeftSpan.appendChild(createTurnsLeftTextNode);

  const createTurnsLeftMessage = document.createElement("p");
  createTurnsLeftMessage.setAttribute("class", "turns-left-message");
  const createTurnsLeftMessageTextNode = document.createTextNode(
    "⏳ Number of turns left: "
  );
  createTurnsLeftMessage.appendChild(createTurnsLeftMessageTextNode);
  createTurnsLeftMessage.appendChild(createTurnsLeftSpan);
  return createTurnsLeftMessage;
};

const createRightElement = function () {
  const createRight = document.createElement("div");
  createRight.setAttribute("class", "right");

  const createMessage = document.createElement("p");
  createMessage.setAttribute("class", "guess-message");
  const createTextNode = document.createTextNode("🤔 Start Guessing..... ");
  createMessage.appendChild(createTextNode);
  createRight.appendChild(createMessage);

  const scoreSpan = document.createElement("span");
  scoreSpan.setAttribute("class", "score");
  const scoreTextNode = document.createTextNode(score);
  scoreSpan.appendChild(scoreTextNode);

  const scorePara = document.createElement("p");
  const scoreParaTextNode = document.createTextNode("🎯 Score: ");
  scorePara.appendChild(scoreParaTextNode);
  scorePara.appendChild(scoreSpan);
  createRight.appendChild(scorePara);

  const highScoreSpan = document.createElement("span");
  highScoreSpan.setAttribute("class", "high-score");
  const highScoreTextNode = document.createTextNode(high_score);
  highScoreSpan.appendChild(highScoreTextNode);

  const highScorePara = document.createElement("p");
  const highScoreParaTextNode = document.createTextNode("🏆 High Score:  ");
  highScorePara.appendChild(highScoreParaTextNode);
  highScorePara.appendChild(highScoreSpan);
  createRight.appendChild(highScorePara);

  const turns_left_message = createNumberOfTurnsMessage();
  createRight.appendChild(turns_left_message);

  return createRight;
};

const createLeftElement = function () {
  const createLeft = document.createElement("div");
  createLeft.setAttribute("class", "left");

  const createMessage = document.createElement("p");
  createMessage.setAttribute("class", "enter-message");
  const createTextNode = document.createTextNode("Enter the Number: ✍️");
  createMessage.appendChild(createTextNode);
  createLeft.appendChild(createMessage);

  const createCheckNumberDiv = document.createElement("div");
  createCheckNumberDiv.setAttribute("class", "check-number");

  const createNumberInput = document.createElement("input");
  createNumberInput.setAttribute("type", "number");
  createNumberInput.setAttribute("class", "check-number-input");
  createNumberInput.setAttribute("value", "");
  createCheckNumberDiv.appendChild(createNumberInput);

  const createNumberButton = document.createElement("button");
  createNumberButton.setAttribute("class", "check-btn");
  createNumberButton.addEventListener("click", checkNumberFunction);
  const createCheckButtonTextNode = document.createTextNode("Check");
  createNumberButton.appendChild(createCheckButtonTextNode);
  createCheckNumberDiv.appendChild(createNumberButton);
  createLeft.appendChild(createCheckNumberDiv);
  return createLeft;
};

const addGameWinTryAgainButtonOnClick = function () {
  document.querySelector(".again-button").remove();
  const turns_left_message = createNumberOfTurnsMessage();
  document.querySelector(".right").appendChild(turns_left_message);
  const leftElement = createLeftElement();
  document
    .querySelector("main")
    .insertBefore(leftElement, document.querySelector(".right"));
  resetGlobalVariables();
};

const addGameWinTryAgainButton = function () {
  document.querySelector(".turns-left-message").remove();
  document.querySelector(".left").remove();

  const createTryAgainButton = document.createElement("button");
  createTryAgainButton.setAttribute("class", "again-button");
  const createTryAgainButtonContent =
    document.createTextNode("🔁 Play Again!!");
  createTryAgainButton.appendChild(createTryAgainButtonContent);
  document.querySelector(".right").appendChild(createTryAgainButton);

  document
    .querySelector(".again-button")
    .addEventListener("click", addGameWinTryAgainButtonOnClick);
};

const addGameOverTryAgainButtonOnClick = function () {
  document.querySelector(".game-over").remove();
  const leftElement = createLeftElement();
  document.querySelector("main").appendChild(leftElement);
  const rightElement = createRightElement();
  document.querySelector("main").appendChild(rightElement);
  resetGlobalVariables();
};

const addGameOverTryAgainButton = function () {
  document.querySelector(".left").remove();
  document.querySelector(".right").remove();

  const gameOver = document.createElement("div");
  gameOver.setAttribute("class", "game-over");

  const createGameMessage = document.createElement("p");
  createGameMessage.setAttribute("class", "game-over-message");
  const createGameMessageTextNode = document.createTextNode("🚫 Game Over‼️");
  createGameMessage.appendChild(createGameMessageTextNode);
  gameOver.appendChild(createGameMessage);

  const createTryAgainButton = document.createElement("button");
  createTryAgainButton.setAttribute("class", "again-button");
  const createTryAgainButtonContent =
    document.createTextNode("🔁 Play Again!!");
  createTryAgainButton.appendChild(createTryAgainButtonContent);
  gameOver.appendChild(createTryAgainButton);
  document.querySelector("main").appendChild(gameOver);

  createTryAgainButton.addEventListener(
    "click",
    addGameOverTryAgainButtonOnClick
  );
};

const checkNumberFunction = function () {
  const user_selected_value = Number(
    document.querySelector(".check-number-input").value
  );
  document.querySelector(".check-number-input").value = "";
  turns_left--;
  document.querySelector(".turns-left").textContent = turns_left;

  if (guess_number === user_selected_value) {
    document.querySelector(".guess-message").textContent =
      "🎉Correct Number!!!";
    document.querySelector(".guess-message").style.color = "green";
    document.querySelector(".score").textContent = score;
    high_score = Math.max(high_score, score);
    document.querySelector(".high-score").textContent = high_score;
    addGameWinTryAgainButton();
  } else if (turns_left === 0) {
    addGameOverTryAgainButton();
  } else {
    score--;
    document.querySelector(".score").textContent = score;
    if (
      !user_selected_value ||
      user_selected_value < 1 ||
      user_selected_value > 20
    ) {
      document.querySelector(".guess-message").textContent =
        "Enter a number between 1 and 20";
      document.querySelector(".guess-message").style.color = "red";
    } else if (guess_number > user_selected_value) {
      document.querySelector(".guess-message").textContent = "📉 Too Low!!";
      document.querySelector(".guess-message").style.color = "yellow";
    } else if (guess_number < user_selected_value) {
      document.querySelector(".guess-message").textContent = "📈 Too high!!";
      document.querySelector(".guess-message").style.color = "yellow";
    }
  }
};

document
  .querySelector(".check-btn")
  .addEventListener("click", checkNumberFunction);
