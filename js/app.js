/*
 * Create a list that holds all of your cards
 */
//TODO - fixnout toceni prvni kartičky při wrong guess

// global variables
let cards = $(".card");
let deck = document.getElementById("deck");
let displayed_cards = [];
let counter_element = $("#moves");
let counter_matched_cards = 0;
counter_element.text(0);
let counter = 0;
let counter_stars = 3;
let date = new Date().getTime();
let seconds_since_start = 0;

// start with reseted game
reset();

timer();

// button to reset the game
$("#restart").click(reset);

// card on click
$("#deck").on("click", "li", function() {
  // this function applies only to cards which arent already matched

  if (!$(this).hasClass("match")) {
    display_symbol(this);
    add_displayed_symbol(this);

    // wrongly guessed cards flipped back
    $(".wrongGuess").toggleClass("wrongGuess");

    // in case there is anything to compare:
    if (displayed_cards.length == 2) {
      card1_symbol = displayed_cards[0].children[0].className;
      card2_symbol = displayed_cards[1].children[0].className;

      // do the symbols match?
      if (card1_symbol == card2_symbol) {
        for (i = 0; i < 2; i++) {
          lock_in_open_position(displayed_cards[i]);
        }
        //how many matched cards are there
        counter_matched_cards = $(".match").length;

        if (counter_matched_cards === 16) {
          // not a nice way how to postpone the execution of the functon
          setTimeout("winning_the_game()", 3000);
        }
        displayed_cards = [];
        plus_one_move();
      } else {
        for (i = 0; i < 2; i++) {
          unsuccessful_guess(displayed_cards[i]);
        }
        displayed_cards = [];
        plus_one_move();
      }
    }
  }
});

function winning_the_game() {
  $("ul").css("display", "none");
  $("h1").text("Congrats! You won!");
  $("footer").css("display", "none");
  $("body").append(
    "<h2>You won with " +
      counter +
      " moves and with " +
      counter_stars +
      " stars in " +
      seconds_since_start +
      " seconds.</h2>"
  );
  $("body").append('<button id="play_again">Play again</button>');
  $(".score-panel").css("display", "none");
  $("#play_again").click(function() {
    $("ul").css("display", "");
    $("footer").css("display", "");
    $("h1").text("Matching Game");
    $("h2").remove();
    $("button").remove();
    $(".score-panel").css("display", "");
    $(".fa").toggleClass("fa-star-o", false);
    $(".fa").toggleClass("fa-star", true);
    reset();
  });
}

function plus_one_move() {
  counter++;
  counter_element.text(counter);
  if (counter === 10) {
    $("#third_star").toggleClass("fa-star", false);
    $("#third_star").toggleClass("fa-star-o", true);
    counter_stars = 2;
  }
  if (counter === 15) {
    $("#second_star").toggleClass("fa-star", false);
    $("#second_star").toggleClass("fa-star-o", true);
    counter_stars = 1;
  }
  if (counter === 20) {
    $("#first_star").toggleClass("fa-star", false);
    $("#first_star").toggleClass("fa-star-o", true);
    counter_stars = 0;
  }
}

function lock_in_open_position(card) {
  $(card).toggleClass("match");
}

function unsuccessful_guess(card) {
  $(card).toggleClass("show");
  $(card).toggleClass("open");
  $(card).toggleClass("wrongGuess");
}

function display_symbol(card) {
  $(card).toggleClass("show");
  $(card).toggleClass("open");
}

//adds a card to the array only in case it isnt already there
function add_displayed_symbol(card) {
  if (!displayed_cards.includes(card)) {
    displayed_cards.push(card);
  }
}

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
  // hides all symbols
  hide();
  displayed_cards = [];
  // counter to zero
  counter = 0;
  counter_element.text(counter);
  date = new Date().getTime();
  $(".fa").toggleClass("fa-star-o", false);
  $(".fa").toggleClass("fa-star", true);
}
// hides all cards
function hide() {
  $(".card").each(function() {
    $(this).toggleClass("open", false);
    $(this).toggleClass("match", false);
    $(this).toggleClass("show", false);
    $(this).toggleClass("wrongGuess", false);
  });
}

function timer() {
  // Update the count every 1 second
  let x = setInterval(function() {
    // Get time "now"
    let now = new Date().getTime();

    // Find the distance between now and starting time
    let distance = now - date;

    seconds_since_start = Math.round(distance / 1000);

    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = seconds_since_start;
  }, 1000);
}
