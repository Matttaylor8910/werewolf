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
    $ctrl.players = [];

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;
    $ctrl.dead = gameState.isDead('Bodyguard');

    if (!gameState.rolePlaying('Bodyguard')) {
      gameState.transition($ctrl.nextRole);
    }

    function isSelected(player){
      return !!_.find($ctrl.players, ['name', player.name]);
    }

    function select(player) {
      $ctrl.players = _.xor($ctrl.players, [player]);
    }

    function next() {
      if ($ctrl.players.length) {
        nightState.setLast('bodyguard', $ctrl.players[0].name);
        $ctrl.players[0].shouldSave = true;
        $ctrl.players = [];
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
