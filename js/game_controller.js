memory.router.route('memory/:difficulty', function(difficulty) {

  $(".game-container").removeClass("game-container--new game-container--win game-container--lose").addClass("game-container--game");

  var easyArrHalf = ["ion-hammer", "ion-heart-broken", "ion-bonfire", "ion-bowtie", "ion-beer", "ion-gear-b", "ion-laptop", "ion-waterdrop", "ion-beaker"];
  var easyArr = easyArrHalf.concat(easyArrHalf);
  var hardArrHalf = easyArrHalf.concat(["ion-paper-airplane", "ion-music-note", "ion-pizza", "ion-wrench", "ion-leaf", "ion-power", "ion-thumbsup"]);
  var hardArr = hardArrHalf.concat(hardArrHalf);
  var hearts = [];

  //Shuffle Function

  var shuffle = function(arr) {

    var num = arr.length;
    var rem = num;
    var shuffled = [];

    for(i=0; i<num; ++i) {
      var index = Math.floor(Math.random()*rem);
      shuffled.push(arr[index]);
      arr.splice(index, 1);
      rem --;
    }

    return(shuffled);
  };


  //Display Easy


  if(difficulty === "easy") {
    var numTiles = easyArr.length;
    var shuffledEasy = shuffle(easyArr);
    var numLives = 10;
    for(i = 0; i<numLives; ++i){
      hearts.push("ion-heart");
    }
    var easyModel = {
      array: shuffledEasy,
      lives: hearts
    };
    memory.show('js-game', easyModel);
    $(".game-tile").addClass("game-tile--easy");
  }

  //Display Hard

  if(difficulty === "hard") {
    var numTiles = hardArr.length;
    var shuffledHard = shuffle(hardArr);
    var numLives = 16;
    for(i = 0; i<numLives; ++i){
      hearts.push("ion-heart");
    }
    var hardModel = {
      array: shuffledHard,
      lives: hearts
    };
    memory.show('js-game', hardModel);
    $(".game-tile").addClass("game-tile--hard");
  }

  var shown = [];

  function isValidMove(tile) {
    return !$(tile).find('input').prop('checked');
  }

  function rememberMove(tile) {
    $(tile).removeClass('flipback').addClass('flip');
    $(tile).find('.game-tile__icon').addClass('visible');

    shown.push(tile);
  }

  function tilesAreEqual(a, b) {
    return a.find('.game-tile__icon').attr('class') === b.find('.game-tile__icon').attr('class');
  }

  function markTilesAsGood(a, b) {
    $(a).add(b).addClass('good');

    if ($('.good').length === numTiles) {
      memory.winTime = $('.game-counter__timer').text();
      location.hash = '#memory/win';
    };

    shown.shift();
    shown.shift();
  }

  function flipBack(a, b) {
    $(".game-counter__lives").find(".ion-heart").last().remove();

    ++ memory.errors;

    if($(".game-counter__lives").children().length === 0) {
      setTimeout(function() {
        location.hash = '#memory/lose';
      }, 400);
    }

    setTimeout(function () {
      $(a).add(b).find('input').prop('checked', false);
      $(a).add(b).find('.game-tile__icon').removeClass('visible');
      $(a).add(b).removeClass('flip').addClass('flipback');
    }, 1000);

    shown.shift();
    shown.shift();
  }

  $(".game-tile__card").on("click", function() {

    var gameTile = $(this).closest('.game-tile');

    if (!isValidMove(gameTile)) {
      return false;
    }

    rememberMove(gameTile);

    if (shown.length >= 2) {
      if (tilesAreEqual(shown[0], shown[1])) {
        markTilesAsGood(shown[0], shown[1]);
      } else {
        flipBack(shown[0], shown[1]);
      }
    }

  });





//Timer

  var gameTimer = $(".game-counter__timer")[0],
      seconds = 0, minutes = 0, hours = 0,
      t;

  function add() {

      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
              minutes = 0;
              hours++;
          }
      }

      $(gameTimer).text(
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)
      );

      timer();
  }

  function timer() {
      t = setTimeout(add, 1000);
  }

  timer();

});
