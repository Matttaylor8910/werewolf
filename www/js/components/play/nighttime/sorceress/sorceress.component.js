(function() {
  angular
    .module('werewolf.play.nighttime.sorceress', [])
    .component('sorceress', {
      templateUrl: 'js/components/play/nighttime/sorceress/sorceress.tpl.html',
      controller: SorceressController,
      bindings: {
        nextRole    : '@'
      }
    });

  function SorceressController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.dead = gameState.isDead('Sorceress');

    $ctrl.next = next;

    // find seer
    $ctrl.seer = _.filter(gameState.players, function(player) { return player.role.name === 'Seer'; })[0];

    if (!gameState.rolePlaying('Sorceress')) {
      gameState.transition($ctrl.nextRole);
    }

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
