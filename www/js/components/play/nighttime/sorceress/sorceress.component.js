(function() {
  angular
    .module('werewolf.play.nighttime.sorceress', [])
    .component('sorceress', {
      templateUrl: 'js/components/play/nighttime/sorceress/sorceress.tpl.html',
      controller: SorceressController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function SorceressController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.dead = false;

    $ctrl.next = next;

    $ctrl.$onChanges = function() {
      // find seer
      $ctrl.seer = _.filter(gameState.players, function(player) { return player.role.name === 'Seer'; })[0];

      if (!gameState.rolePlaying('Sorceress')) {
        gameState.transition($ctrl.nextRole);
      }
      if (gameState.isDead('Sorceress')) {
        $ctrl.dead = true;
      }
    };

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
