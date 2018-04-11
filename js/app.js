var myDeck = document.getElementsByTagName("ul")[1];
var myArray;
var moveCount = document.getElementsByClassName('moves')[0];
var totalMoves = moveCount.innerText;
var stars =document.getElementsByClassName('fa-star');
var reset = document.getElementsByClassName('restart')[0];
const successMessage = "Congratulations! You won the game.";


 const classNamesArray = [
     "fa fa-diamond", "fa fa-paper-plane-0",
     "fa fa-anchor", "fa fa-bolt",
     "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"
 ]

 function createCard() {
     var li =document.createElement('li');
     var icon = document.createElement("i");
     li.classList.add('card');
     deck.appendChild(li);
     li.appendChild(icon);
     icon.classList.add("fa");
 }

function popList() {
for (var i=0; i<8; i++) {

        for (var y=0; y<2; y++) {
            var iCard=createCard();
            iCard.classList.add(classNamesArray[y]);
            console.log(iCard);
        }
}
}
popList();
var myCards = document.getElementsByClassName('card');
var unMatchedCards = myCards.length;


reset.addEventListener('click', resetMatchingGame);
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
function resetMatchingGame() {
    shuffle(myCards);
    hideAll(myCards);
    resetCount();
    resetStars();
}

function hideAll(myArray) {
    for (var i = 0; i<myArray.length; i++){
        myArray[i].style.backgroundColor="#efff77";
        myArray[i].style.color="#efff77";
    }
}

function resetCount() {
    moveCount.innerText = 0;
}

function resetStars() {
    for (var i=0; i<stars.length ; i++){
        stars[i].classList.remove('outline');
    }
}

myDeck.addEventListener("click", flipCard);

function flipPair(a,b) {
    var first = flipCard(a);
    var second = flipCard(b);
    console.log(first, second);
     if (first === second) {
        first.classList.add('match');

          second.classList.add('match');

       first.stopPropagation();
           second.stopPropagation();

       unMatchedCards = unMatchedCards -2;
   }
                if (unMatchedCards = 0) {
                    success();
                }

  totalMoves +=1;
   }
function flipCard(evt) {
    console.log("flipcard started", evt);
    var className = evt.target.classList;

    evt.target.classList.add('open');
    evt.target.classList.add('show');

    console.log(className);
    return className;
}

function stars(numMoves) {
    if (8< numMoves && numMoves <=10) {

    }
    else if (10<numMoves && numMoves<=11) {

    }
    else if (11<numMoves) {
       
    }
}

function success() {
 
    var stars =document.getElementsByClassName("fa-star");
    for (var i = 0; i<stars.length; i++) {
        stars[i].classList.remove('outline');
        console.log("outline "+i);
    }
    resetMatchingGame();
    var successDiv = document.createElement('div');
    var successP = document.createElement('p');
    successP.textContent = "Well done! You're awesome! Do you want to play again?";
    successDiv.style.width = "960px";
    successDiv.style.height = "500px";
    successDiv.style.background = "#fcdede";
    successDiv.style.color = "#ce1010";
    successDiv.style.zIndex = "10";

    successDiv.appendChild(successP);
    myDeck.appendChild(successDiv);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
