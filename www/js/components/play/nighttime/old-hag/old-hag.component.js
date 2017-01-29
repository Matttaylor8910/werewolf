(function() {
  angular
    .module('werewolf.play.nighttime.oldHag', [])
    .component('oldHag', {
      templateUrl: 'js/components/play/nighttime/old-hag/old-hag.tpl.html',
      controller: OldHagController,
      bindings: {
        nextRole    : '@'
      }
    });

  function OldHagController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.player = undefined;
    $ctrl.dead = gameState.isDead('Old Hag');

    $ctrl.select = select;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Old Hag')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player) {
      $ctrl.player = player;
    }

    function next() {
      if ($ctrl.player) {
        nightState.setLast('oldHag', $ctrl.player.name);
        $ctrl.player.banished = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
