(function () {

memory.router.route('memory/lose', loseController);

function loseController() {
  $(".game-container").removeClass("game-container--new game-container--game game-container--win").addClass("game-container--lose");
  memory.show('js-lose');
}

})();
