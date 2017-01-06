(function() {
  angular
    .module('werewolf.play.nighttime.cupid', [])
    .component('cupid', {
      templateUrl: 'js/components/play/nighttime/cupid/cupid.tpl.html',
      controller: CupidController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function CupidController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.arrows = 2;

    $ctrl.shootArrow = shootArrow;
    $ctrl.next = next;

    if (gameState.round > 1 || !gameState.rolePlaying('Cupid')) {
      gameState.transition($ctrl.nextRole);
    }

    function shootArrow(player) {
      player.inLove = !player.inLove;
      $ctrl.arrows += player.inLove ? -1 : 1;
    }

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
