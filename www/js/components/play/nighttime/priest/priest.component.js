(function() {
  angular
    .module('werewolf.play.nighttime.priest', [])
    .component('priest', {
      templateUrl: 'js/components/play/nighttime/priest/priest.tpl.html',
      controller: PriestController,
      bindings: {
        nextRole    : '@'
      }
    });

  function PriestController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.player = undefined;
    $ctrl.weBeBlessin = false;
    $ctrl.dead = gameState.isDead('Priest');

    $ctrl.next = next;
    $ctrl.select = select;

    if (!gameState.rolePlaying('Priest')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player) {
      $ctrl.player = player;
    }

    function next() {
      if ($ctrl.weBeBlessin) {
        $ctrl.player.blessed = true;
        $ctrl.nightState.once.priest = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
