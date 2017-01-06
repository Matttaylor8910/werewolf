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
    $ctrl.allDone = false;

    $ctrl.next = next;

    if ($ctrl.allDone || !gameState.rolePlaying('Mason')) {
      gameState.transition($ctrl.nextRole);
    }

    function next() {
      $ctrl.allDone = true;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
