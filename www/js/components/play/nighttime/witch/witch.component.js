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
    $ctrl.disableMoveOn = disableMoveOn;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Witch')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player, action) {
      $ctrl.players[action] = player;
    }

    function disableMoveOn() {
      if ($ctrl.weBeKillin && !$ctrl.players.kill) {
        return true;
      }

      if ($ctrl.weBeSavin && !$ctrl.players.save) {
        return true;
      }

      return false;
    }

    function next() {
      if ($ctrl.weBeKillin) {
        $ctrl.players.kill.shouldDie = true;
        $ctrl.nightState.once.witchKill = true;
      }
      if ($ctrl.weBeSavin) {
        $ctrl.players.save.shouldSave = true;
        $ctrl.nightState.once.witchSave = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
