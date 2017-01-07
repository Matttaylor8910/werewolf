(function() {
  angular
    .module('werewolf.play.nighttime.witch', [])
    .component('witch', {
      templateUrl: 'js/components/play/nighttime/witch/witch.tpl.html',
      controller: WitchController,
      bindings: {
        nextRole    : '@'
      }
    });

  function WitchController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.dead = gameState.isDead('Witch');
    $ctrl.weBeKillin = false;
    $ctrl.weBeSavin = false;
    $ctrl.players = {};

    $ctrl.select = select;
    $ctrl.canMoveOn = canMoveOn;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Witch')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player, action) {
      $ctrl.players[action] = player;
    }

    function canMoveOn() {
      if ($ctrl.weBeKillin && !$ctrl.players.kill) {
        return false;
      }

      if ($ctrl.weBeSavin && !$ctrl.players.save) {
        return false;
      }

      return true;
    }

    function next() {
      if ($ctrl.weBeKillin) {
        $ctrl.players.kill.shouldDie = true;
        $ctrl.nightState.witchUsed.kill = true;
      }
      if ($ctrl.weBeSavin) {
        $ctrl.players.save.shouldSave = true;
        $ctrl.nightState.witchUsed.save = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
