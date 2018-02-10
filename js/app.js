/*
 * Create a list that holds all of your cards
 */
//let cards = document.getElementsByClassName("card");
let cards = $(".card");
let deck = document.getElementById("deck");
let displayed_cards = [];
//console.log(cards);
$("#restart").click(reset);

//flip on click
$("#deck").on("click", "li", function() {
  display_symbol(this);
  add_displayed_symbol(this);
  //in case there is anything to compare:
  if (displayed_cards.length == 2) {
    card1_symbol = displayed_cards[0].children[0].className;
    card2_symbol = displayed_cards[1].children[0].className;
    //alert(card1_symbol + " " + card2_symbol);
    //problem je, že když se resetuje, tak už tam není tenhle event listener - opravit, a nebo ne, je tam, chyba je jinde
    if (card1_symbol !== card2_symbol) {
      alert("pasuje");
    }
  }
});

function display_symbol(card) {
  $(card).toggleClass("show");
  $(card).toggleClass("open");
}

function add_displayed_symbol(card) {
  //adds a card to the array only in case it isnt already there
  if (!displayed_cards.includes(card)) {
    displayed_cards.push(card);
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function reset() {
  shuffle(cards);
  cards.remove();
  for (var i = 0; i < cards.length; i++) {
    console.log(cards[i]);
    deck.appendChild(cards[i]);
  }
  hide();
}

function hide() {
  $(".card").each(function() {
    $(this).toggleClass("open", false);
    $(this).toggleClass("match", false);
    $(this).toggleClass("show", false);
  });
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
