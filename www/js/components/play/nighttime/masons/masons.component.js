(function() {
  angular
    .module('werewolf.play.nighttime.masons', [])
    .component('masons', {
      templateUrl: 'js/components/play/nighttime/masons/masons.tpl.html',
      controller: MasonsController,
      bindings: {
        thisRole    : '@',
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function MasonsController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.allDone = false;

    $ctrl.next = next;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        if (!gameState.rolePlaying('Mason') || $ctrl.allDone) {
          gameState.transition($ctrl.nextRole);
        }
      }
    };

    function next() {
      $ctrl.allDone = true;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
