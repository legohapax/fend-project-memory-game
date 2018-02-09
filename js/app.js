/*
 * Create a list that holds all of your cards
 */
//let cards = document.getElementsByClassName("card");
let cards = $(".card");
let deck = document.getElementById("deck");
let displayed_cards = [];
//console.log(cards);
$("#restart").click(reset);
let opened_cards = [];

//flip on click
$("#deck").on("click", "li", function() {
<<<<<<< HEAD
  $(this).toggleClass("show");
  $(this).toggleClass("open");

  opened_cards.append($(this));
||||||| merged common ancestors
  $(this).toggleClass("show");
  $(this).toggleClass("open");
=======
  display_symbol(this);
>>>>>>> 9d7d4c7037764c75676fedca4d18503f4f33df15
});

function display_symbol(card) {
  $(card).toggleClass("show");
  $(card).toggleClass("open");
}

function add_displayed_symbol(card) {


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

function opened_cards() {}

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
