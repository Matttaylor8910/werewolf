(function() {
  angular
    .module('werewolf.play.nighttime.masons', [])
    .component('masons', {
      templateUrl: 'js/components/play/nighttime/masons/masons.tpl.html',
      controller: MasonsController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function MasonsController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $ctrl.next = next;

    if (gameState.round > 1 || !gameState.rolePlaying('Mason')) {
      gameState.transition($ctrl.nextRole);
    }

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
