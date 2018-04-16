

/*
 * Create a list that holds all of your cards
 */
let cards = [
 'fa-paper-plane-o', 'fa-paper-plane-o',    'fa-anchor', 'fa-anchor', 
 'fa-bolt', 'fa-bolt', 
 'fa-cube', 'fa-cube', 
 'fa-leaf', 'fa-leaf', 
 'fa-bicycle', 'fa-bicycle', 
 'fa-bomb', 'fa-bomb', 
 'fa-diamond', 'fa-diamond'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let openCard = [];
let startGame = false;
let starts = 3;
let moves = 0;
let matchFound = 0;
let starRating = "3";
let timer;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// If a card is clicked display the card's symbol (put this functionality in another function that you call from this one)

function createCard() {
  let myCards = shuffle(cards);
 
  myCards.forEach(function(card) {
    $('.deck').append('<li><i class="card fa ' + card + '"></i></li>');
  })
}

// add the card to a *list* of "open" cards 
// if the list already has another card, check to see if the two cards match 
// if the cards do match, lock the cards in the open position 
// if the cards do not match, remove the cards from the list and hide the card's symbol 
function findMatch() {
  $('.card').on('click', function() {
    if ($(this).hasClass('open show')) { return; }
    $(this).toggleClass('flipInY open show');
    openCard.push($(this));
    startGame = true;

    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add('shake', 'match');
      openCard[1][0].classList.add('shake', 'match');
      $(openCard[0]).off('click');
      $(openCard[1]).off('click');
      matchFound += 1;
      moves++;
      removeOpenCards();
      getWinner();
      } else {

      openCard[0][0].classList.add('bounceIn', 'wrong');
      openCard[1][0].classList.add('bounceIn', 'wrong');
      
      setTimeout(removeClasses, 500);
      
      setTimeout(removeOpenCards, 500);
      moves++;
      }
    }
  updateMoves();
  })
}

// increment the move counter and display it on the page
function updateMoves() {
  if (moves === 1) {
    $('#movesText').text(' Move');
  } else {
    $('#movesText').text(' Moves');
  }
  $('#moves').text(moves.toString());

  if (moves > 0 && moves < 14) {
    starRating = starRating;
  } else if (moves >= 14 && moves <= 22) {
    $('#starOne').removeClass('fa-star');
    starRating = '2';
  } else if (moves > 22) {
    $('#starTwo').removeClass('fa-star');
    starRating = '1';
  }
}

// if all cards have matched, display a message with the final score

function getWinner() {

  if (matchFound === 8) {

    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName('close')[0];

    $('#total-stars').text(starRating);
    
    $('#total-moves').text(moves);
   
    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

   $('#again-btn').on('click', function() {
       location.reload()
   });

    
   clearInterval(timer);
 }
}

function removeOpenCards() {
  openCard = [];
}

function removeClasses() {
  $('.card').removeClass('show open flipInY  shake bounceIn wrong');
  removeOpenCards();
}

function disableClick() {
 openCard.forEach(function (card) {
   card.off('click');
  })
}

function startTimer() {
  let clicks = 0;
  $('.card').on('click', function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : '0' + val; }
      timer = setInterval( function(){
        $('.sec').html(time(++sec % 60));
        $('.min').html(time(parseInt(sec / 60, 10)));
      }, 500);
    }
  })
 }

createCard();

startTimer();

shuffle(cards);

findMatch();



restartGame.on('click', function () {
  location.reload();
});

function restartGame() {
document.getElementById('restart').reset(); 
}
