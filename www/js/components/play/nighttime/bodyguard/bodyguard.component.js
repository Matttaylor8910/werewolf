(function() {
  angular
    .module('werewolf.play.nighttime.bodyguard', [])
    .component('bodyguard', {
      templateUrl: 'js/components/play/nighttime/bodyguard/bodyguard.tpl.html',
      controller: BodyguardController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function BodyguardController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.player = undefined;
    $ctrl.dead = gameState.isDead('Bodyguard');

    $ctrl.select = select;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Bodyguard')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player) {
      $ctrl.player = player;
    }

    function next() {
      if ($ctrl.player) {
        nightState.setLast('bodyguard', $ctrl.player.name);
        $ctrl.player.shouldSave = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
