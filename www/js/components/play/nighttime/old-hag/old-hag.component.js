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
    $ctrl.players = [];
    $ctrl.dead = gameState.isDead('Old Hag');

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Old Hag')) {
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
        nightState.setLast('oldHag',$ctrl.players[0].name);
        $ctrl.players[0].banished = true;
        $ctrl.players = [];
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
