(function () {

memory.router.route('memory', newGameController);

memory.router.route('', newGameController);

function newGameController() {
  $(".game-container").removeClass("game-container--game game-container--lose game-container--win").addClass("game-container--new");
  memory.show('js-new');
}

})();
