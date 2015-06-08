memory.router.route('memory/:difficulty', function(difficulty) {

  $(".game-container").removeClass("game-container--new").addClass("game-container--game");

  var easyArrHalf = ["ion-hammer", "ion-heart-broken", "ion-bonfire", "ion-bowtie", "ion-beer", "ion-ios-infinite", "ion-woman", "ion-waterdrop", "ion-ios-thunderstorm"];
  var easyArr = easyArrHalf.concat(easyArrHalf);
  var hardArrHalf = easyArrHalf.concat(["ion-paper-airplane", "ion-music-note", "ion-ios-wineglass", "ion-ios-rose", "ion-ios-rainy", "ion-ios-pie", "ion-ios-folder"]);
  var hardArr = hardArrHalf.concat(hardArrHalf);
  var hearts=[];

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
    var shuffledEasy = shuffle(easyArr);
    var numLives = 8;
    for(i = 0; i<numLives; ++i){
      hearts.push("ion-heart-broken");
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
    var shuffledHard = shuffle(hardArr);
    var numLives = 16;
    for(i = 0; i<numLives; ++i){
      hearts.push("ion-heart-broken");
    }
    var hardModel = {
      array: shuffledHard,
      lives: hearts
    };
    memory.show('js-game', hardModel);
    $(".game-tile").addClass("game-tile--hard");
  }

  var shown = [];

  $(".game-tile__card").on("click", function() {

//Add Icon to Shown if Checking

    if(!$(this).siblings(".game-tile__check").prop("checked")) {
      shown.push($(this).find(".game-tile__icon").attr("class"));
    }

    if(shown.length === 2) {
      if(shown[0] !== shown[1]){
        $(".game-counter__lives").find(".ion-heart-broken").last().remove();
        shown = [];
        $(".game-board").find(".game-tile__check").prop("checked", false);
      }else if(shown[0] === shown[1]){
        $(".game-board").find(".shown[0]");
        shown = [];
      }
    }

    console.log(shown);
  });

});
