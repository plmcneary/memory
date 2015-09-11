(function () {

memory.router.route('memory/win', winController);

function winController() {
  $(".game-container").removeClass("game-container--new game-container--game game-container--lose").addClass("game-container--win");
  memory.show('js-win');
  $('.win-time').text(memory.winTime);
  $('.errors').text(memory.errors.toString());
}

})();
