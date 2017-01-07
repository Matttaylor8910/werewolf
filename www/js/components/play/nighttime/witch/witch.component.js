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
    $ctrl.dead = gameState.isDead('Witch');
    $ctrl.weBeKillin = false;
    $ctrl.weBeSavin = false;
    $ctrl.players = {};

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.canMoveOn = canMoveOn;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Witch')) {
      gameState.transition($ctrl.nextRole);
    }

    function isSelected(player, action){
      return !!_.find($ctrl.players[action], ['name', player.name]);
    }

    function select(player, action) {
      $ctrl.players[action] = _.xor($ctrl.players[action], [player]);
    }

    function canMoveOn() {
      if ($ctrl.weBeKillin && (!$ctrl.players.kill || $ctrl.players.kill.length !== 1)) {
        return false;
      }

      if ($ctrl.weBeSavin && (!$ctrl.players.save || $ctrl.players.save.length !== 1)) {
        return false;
      }

      return true;
    }

    function next() {
      if ($ctrl.weBeKillin) {
        $ctrl.players.kill[0].shouldDie = true;
      }
      if ($ctrl.weBeSavin) {
        $ctrl.players.save[0].shouldSave = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
