const cardContainer = document.getElementById('card-container');
const totalClick = document.getElementById('total-click');
const cards = [
  "A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", 
  "A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", 
]
let clickCount = 0;
let card1 = null;
let card2 = null;
let matched = 0;
let paused = false;

shuffleCards();
dealCards();

function shuffleCards(){
  for (let i = 0; i < cards.length; i++){
    let j = Math.floor(Math.random() * cards.length);
    let copy = cards[i];
    cards[i] = cards[j];
    cards[j] = copy;
  }
}

function dealCards(){
  for (let card of cards){
    let div = document.createElement('div');
    div.classList.add(card);
    div.addEventListener('click', checkIfSelectedCardsMatch);
    cardContainer.append(div);
  }
}

function checkIfSelectedCardsMatch(e){
  if (paused || e.target.innerText != '') return;
  totalClick.innerText = ++clickCount;

  e.target.innerText = e.target.className;
  if (!card1 && (card1 = e.target)) return;
  card2 = e.target;

  if (card1.className === card2.className) {
    matched += 2;
    card1 = card2 = null;
  } else {
    paused = true;
    setTimeout(() => {
      card1.innerText = card2.innerText = '';
      card1 = card2 = null;
      paused = false;
    }, 1000);
  }

  if (matched === cards.length) setTimeout(showScores, 1000);
}

function showScores() {
  let bestScore = localStorage.getItem("bestScore") || Infinity;
  if (clickCount < bestScore) bestScore = clickCount;
  localStorage.setItem("bestScore", bestScore);
  document.getElementById("best-score").innerText = bestScore;
  document.getElementById("final-score").innerText = clickCount;
  document.getElementById("score").style.display = "block";
}
