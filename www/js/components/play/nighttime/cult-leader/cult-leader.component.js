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
    $ctrl.players = [];

    $ctrl.isSelected = isSelected;
    $ctrl.select = select;
    $ctrl.next = next;
    $ctrl.dead = gameState.isDead('Cult Leader');

    if (!gameState.rolePlaying('Cult Leader')) {
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
        $ctrl.players[0].inCult = true;
        $ctrl.players = [];
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
