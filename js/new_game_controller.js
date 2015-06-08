(function () {

memory.router.route('memory', newGameController);

memory.router.route('', newGameController);

function newGameController() {
  $(".game-container").removeClass("game-container--game").addClass("game-container--new");
  memory.show('js-new');
}

})();
