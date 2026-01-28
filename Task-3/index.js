// Memory Card Game Logic

const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

let cards = [];
let flippedCards = [];
let matchedCards = [];

// Card symbols (pairs)
const symbols = ["🍎","🍌","🍇","🍓","🍒","🥝","🍍","🥥"];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize game
function initGame() {
  board.innerHTML = "";
  flippedCards = [];
  matchedCards = [];

  // Duplicate symbols to create pairs
  cards = shuffle([...symbols, ...symbols]);

  // Create card elements
  cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${symbol}</div>
        <div class="card-back">?</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

// Flip card
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check for match
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedCards.push(card1, card2);
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Restart game
restartBtn.addEventListener("click", initGame);

// Start game on load
initGame();