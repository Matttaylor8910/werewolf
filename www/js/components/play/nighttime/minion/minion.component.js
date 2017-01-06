(function() {
  angular
    .module('werewolf.play.nighttime.minion', [])
    .component('minion', {
      templateUrl: 'js/components/play/nighttime/minion/minion.tpl.html',
      controller: MinionController,
      bindings: {
        nextRole    : '@'
      }
    });

  function MinionController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.dead = gameState.isDead('Minion');

    $ctrl.next = next;

    if (gameState.round > 1 || !gameState.rolePlaying('Minion')) {
      gameState.transition($ctrl.nextRole);
    } else {
      // find positives for minion
      $ctrl.wolves = _.map(_.filter(gameState.players, function(player) {
        return _.includes(nightState.realWolves, player.role.name);
      }), 'name');
    }

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
