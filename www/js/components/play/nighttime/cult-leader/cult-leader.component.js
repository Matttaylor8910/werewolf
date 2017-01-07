(function() {
  angular
    .module('werewolf.play.nighttime.cultLeader', [])
    .component('cultLeader', {
      templateUrl: 'js/components/play/nighttime/cult-leader/cult-leader.tpl.html',
      controller: CultLeaderController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function CultLeaderController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.player = undefined;
    $ctrl.dead = gameState.isDead('Cult Leader');

    $ctrl.select = select;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Cult Leader')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player) {
      $ctrl.player = player;
    }

    function next() {
      if ($ctrl.player) {
        $ctrl.player.inCult = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
