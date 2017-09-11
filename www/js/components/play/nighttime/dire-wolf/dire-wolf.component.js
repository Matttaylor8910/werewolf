(function() {
  angular
    .module('werewolf.play.nighttime.direWolf', [])
    .component('direWolf', {
      templateUrl: 'js/components/play/nighttime/dire-wolf/dire-wolf.tpl.html',
      controller: DireWolfController,
      bindings: {
        nextRole    : '@'
      }
    });

  function DireWolfController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.player = undefined;

    $ctrl.next = next;
    $ctrl.select = select;

    if (gameState.round > 1 || !gameState.rolePlaying('Dire Wolf')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player) {
      $ctrl.player = player;
    }

    function next() {
      if ($ctrl.player) {
        $ctrl.player.direCompanion = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
