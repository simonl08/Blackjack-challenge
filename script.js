const displayPlayerCards = document.getElementById("displayPlayerCards");
const container1 = document.getElementById("container1");
const playButton = document.getElementById("play");
const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");
const dealButton = document.getElementById("deal");
const playerText = document.getElementById("playerText");
const dealerText = document.getElementById("dealerText");
const results = document.getElementById("results");

//Cards
let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

//Hide buttons on start
hitButton.style.display = 'none';
standButton.style.display = 'none';
dealButton.style.display = 'none';
container1.style.display = 'none';

//Global variable
let dealerCards = []
let playerCards = []
let deck = []
let dealerScore = 0
let playerScore = 0

//Click play button
playButton.addEventListener('click', () => {
  displayPlayerCards.innerHTML = "" // clears cards off screen
  playerScore = 0
  dealerScore = 0
  results.innerText = ""
  playerText.innerText = ""
  dealerText.innerText = ""
  deck=createDeck();
  playButton.style.display = 'none';
  dealButton.style.display = 'block';
  hitButton.style.display = 'none';
  standButton.style.display = 'none';
  container1.style.display = 'none';
})

dealButton.addEventListener('click', () => {
    playerText.innerText = playerScore
    dealerText.innerText = dealerScore
    dealCards()
    playButton.style.display = 'none';
    dealButton.style.display = 'none';
    hitButton.style.display = 'block';
    standButton.style.display = 'block';
    container1.style.display = 'block';
})

hitButton.addEventListener('click', () =>{
    playerText.innerText = 'Player: ' + playerScore
    dealerText.innerText = 'Dealer: ' + dealerScore
    playerHit()
  })

standButton.addEventListener('click', () => {
  dealerAI()
  playButton.style.display = 'block';
  hitButton.style.display = 'none';
  standButton.style.display = 'none';
})

//Creating the deck of 52 cards
const createDeck = () => {
  let deck = []
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = {suit: suits[i], value: values[x]};
      deck.push(card);
    }
  }
  return deck;
}

//Check who is drawing card
const drawCard = (whoCards) => {
  let drawRandom = Math.floor(Math.random() * deck.length);
  let card = deck[drawRandom];
  
  if (whoCards == playerCards){
    
    console.log(card.suit)
    console.log(card.value)
    checkPlayerScore(card.value)
    showCards(card.suit, card.value)
  }
  else if (whoCards == dealerCards){
      checkDealerScore(card.value)
  }
}

const checkPlayerScore = (value) => {
    if(value =="A") {
        playerScore += 1
        playerText.innerText = 'Player: ' + playerScore;
        checkplayer21()
    } else if (isNaN(value)) { //if value is not a num
        playerScore += 10;
        playerText.innerText = 'Player: ' + playerScore;
        checkplayer21()
    }else {
        playerScore += value;
        playerText.innerText = 'Player: ' + playerScore;
        checkplayer21()
    }
}

const checkplayer21 = () => {
    if(playerScore > 21) {
        playButton.style.display = 'block';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        results.innerText = "BUST!"
    } else if(playerScore == 21){
        playButton.style.display = 'block';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        results.innerText = "BLACKJACK!"
    }
    return
}

const checkDealerScore = (value) => {
    if(value =="A") {
        dealerScore += 1
        dealerText.innerText = 'Dealer: ' + dealerScore;
        checkdealer21()
    } else if (isNaN(value)) { //if value is not a num
        dealerScore += 10;
        dealerText.innerText = 'Dealer: ' + dealerScore;
        checkdealer21()
    }else {
        dealerScore += value;
        dealerText.innerText = 'Dealer: ' + dealerScore;
        checkdealer21()
    }
}

const checkdealer21 = () => {
    if(dealerScore > 21) {
        playButton.style.display = 'block';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        results.innerText = "DEALER BUST!"
    } else if(dealerScore == 21){
        playButton.style.display = 'block';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
        results.innerText = "DEALER BLACKJACK!"
    }
    return
}

// deal cards at start
const dealCards = () => {
    drawCard(playerCards)
    drawCard(playerCards)
    drawCard(dealerCards)
    drawCard(dealerCards)
}

// player hits
const playerHit = () => {
    drawCard(playerCards)
}

const dealerAI = () => {
  if (dealerScore > playerScore) {
    playButton.style.display = 'block';
    hitButton.style.display = 'none';
    standButton.style.display = 'none';
    results.innerText = "Dealer Wins with most points";
  }else if (dealerScore == playerScore && dealerScore > 16) {
    playButton.style.display = 'block';
    hitButton.style.display = 'none';
    standButton.style.display = 'none';
    results.innerText = "DRAW!";
  }else if (dealerScore == playerScore && dealerScore < 17) {
    drawCard(dealerCards)
      if (dealerScore > playerScore){
        results.innerText = "Dealer Wins with most points"
      } else {
        results.innerText = "Player Wins with most points"}
  }else if (dealerScore < playerScore) {
    drawCard(dealerCards)
      if (dealerScore < playerScore){
        results.innerText = "Player Wins with most points"}
      else if (dealerScore == playerScore){
        results.innerText = "DRAW!"
      }else if (dealerScore > 21){
        results.innerText = "Dealer BUST!"
      }else if (dealerScore == 21){
        results.innerText = "DEALER BLACKJACK!"
      }
      else
        results.innerText = "Dealer Wins with most points"
  }else {
    results.innerText = "PLAYER WINS"
  }
}

showCards = (string, value) => {
  //spades
  if(string == "Spades" && value == "A"){
    displayPlayerCards.innerHTML += "<img src='./img/sa.png'>"
  }
  else if(string == "Spades" && value == 2){
    displayPlayerCards.innerHTML += "<img src='./img/s2.png'>"
  }
  else if(string == "Spades" && value == 3){
    displayPlayerCards.innerHTML += "<img src='./img/s3.png'>"
  }
  else if(string == "Spades" && value == 4){
    displayPlayerCards.innerHTML += "<img src='./img/s4.png'>"
  }
  else if(string == "Spades" && value == 5){
    displayPlayerCards.innerHTML += "<img src='./img/s5.png'>"
  }
  else if(string == "Spades" && value == 6){
    displayPlayerCards.innerHTML += "<img src='./img/s6.png'>"
  }
  else if(string == "Spades" && value == 7){
    displayPlayerCards.innerHTML += "<img src='./img/s7.png'>"
  }
  else if(string == "Spades" && value == 8){
    displayPlayerCards.innerHTML += "<img src='./img/s8.png'>"
  }
  else if(string == "Spades" && value == 9){
    displayPlayerCards.innerHTML += "<img src='./img/s9.png'>"
  }
  else if(string == "Spades" && value == 10){
    displayPlayerCards.innerHTML += "<img src='./img/s10.png'>"
  }
  else if(string == "Spades" && value == "J"){
    displayPlayerCards.innerHTML += "<img src='./img/sj.png'>"
  }
  else if(string == "Spades" && value == "Q"){
    displayPlayerCards.innerHTML += "<img src='./img/sq.png'>"
  }
  else if(string == "Spades" && value == "K"){
    displayPlayerCards.innerHTML += "<img src='./img/sk.png'>"
  }

  //clubs
  else if(string == "Clubs" && value == "A"){
    displayPlayerCards.innerHTML += "<img src='./img/ca.png'>"
  }
  else if(string == "Clubs" && value == 2){
    displayPlayerCards.innerHTML += "<img src='./img/c2.png'>"
  }
  else if(string == "Clubs" && value == 3){
    displayPlayerCards.innerHTML += "<img src='./img/c3.png'>"
  }
  else if(string == "Clubs" && value == 4){
    displayPlayerCards.innerHTML += "<img src='./img/c4.png'>"
  }
  else if(string == "Clubs" && value == 5){
    displayPlayerCards.innerHTML += "<img src='./img/c5.png'>"
  }
  else if(string == "Clubs" && value == 6){
    displayPlayerCards.innerHTML += "<img src='./img/c6.png'>"
  }
  else if(string == "Clubs" && value == 7){
    displayPlayerCards.innerHTML += "<img src='./img/c7.png'>"
  }
  else if(string == "Clubs" && value == 8){
    displayPlayerCards.innerHTML += "<img src='./img/c8.png'>"
  }
  else if(string == "Clubs" && value == 9){
    displayPlayerCards.innerHTML += "<img src='./img/c9.png'>"
  }
  else if(string == "Clubs" && value == 10){
    displayPlayerCards.innerHTML += "<img src='./img/c10.png'>"
  }
  else if(string == "Clubs" && value == "J"){
    displayPlayerCards.innerHTML += "<img src='./img/cj.png'>"
  }
  else if(string == "Clubs" && value == "Q"){
    displayPlayerCards.innerHTML += "<img src='./img/cq.png'>"
  }
  else if(string == "Clubs" && value == "K"){
    displayPlayerCards.innerHTML += "<img src='./img/ck.png'>"
  }
  else if(string == "Hearts" && value == "A"){
    displayPlayerCards.innerHTML += "<img src='./img/ha.png'>"
  }
  else if(string == "Hearts" && value == 2){
    displayPlayerCards.innerHTML += "<img src='./img/h2.png'>"
  }
  else if(string == "Hearts" && value == 3){
    displayPlayerCards.innerHTML += "<img src='./img/h3.png'>"
  }
  else if(string == "Hearts" && value == 4){
    displayPlayerCards.innerHTML += "<img src='./img/h4.png'>"
  }
  else if(string == "Hearts" && value == 5){
    displayPlayerCards.innerHTML += "<img src='./img/h5.png'>"
  }
  else if(string == "Hearts" && value == 6){
    displayPlayerCards.innerHTML += "<img src='./img/h6.png'>"
  }
  else if(string == "Hearts" && value == 7){
    displayPlayerCards.innerHTML += "<img src='./img/h7.png'>"
  }
  else if(string == "Hearts" && value == 8){
    displayPlayerCards.innerHTML += "<img src='./img/h8.png'>"
  }
  else if(string == "Hearts" && value == 9){
    displayPlayerCards.innerHTML += "<img src='./img/h9.png'>"
  }
  else if(string == "Hearts" && value == 10){
    displayPlayerCards.innerHTML += "<img src='./img/h10.png'>"
  }
  else if(string == "Hearts" && value == "J"){
    displayPlayerCards.innerHTML += "<img src='./img/hj.png'>"
  }
  else if(string == "Hearts" && value == "Q"){
    displayPlayerCards.innerHTML += "<img src='./img/hq.png'>"
  }
  else if(string == "Hearts" && value == "K"){
    displayPlayerCards.innerHTML += "<img src='./img/hk.png'>"
  }
  else if(string == "Diamonds" && value == "A"){
    displayPlayerCards.innerHTML += "<img src='./img/da.png'>"
  }
  else if(string == "Diamonds" && value == 2){
    displayPlayerCards.innerHTML += "<img src='./img/d2.png'>"
  }
  else if(string == "Diamonds" && value == 3){
    displayPlayerCards.innerHTML += "<img src='./img/d3.png'>"
  }
  else if(string == "Diamonds" && value == 4){
    displayPlayerCards.innerHTML += "<img src='./img/d4.png'>"
  }
  else if(string == "Diamonds" && value == 5){
    displayPlayerCards.innerHTML += "<img src='./img/d5.png'>"
  }
  else if(string == "Diamonds" && value == 6){
    displayPlayerCards.innerHTML += "<img src='./img/d6.png'>"
  }
  else if(string == "Diamonds" && value == 7){
    displayPlayerCards.innerHTML += "<img src='./img/d7.png'>"
  }
  else if(string == "Diamonds" && value == 8){
    displayPlayerCards.innerHTML += "<img src='./img/d8.png'>"
  }
  else if(string == "Diamonds" && value == 9){
    displayPlayerCards.innerHTML += "<img src='./img/d9.png'>"
  }
  else if(string == "Diamonds" && value == 10){
    displayPlayerCards.innerHTML += "<img src='./img/d10.png'>"
  }
  else if(string == "Diamonds" && value == "J"){
    displayPlayerCards.innerHTML += "<img src='./img/dj.png'>"
  }
  else if(string == "Diamonds" && value == "Q"){
    displayPlayerCards.innerHTML += "<img src='./img/dq.png'>"
  }
  else if(string == "Diamonds" && value == "K"){
    displayPlayerCards.innerHTML += "<img src='./img/dk.png'>"
  }

}

