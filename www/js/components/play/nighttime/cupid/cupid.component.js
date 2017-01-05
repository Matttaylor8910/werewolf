(function() {
  angular
    .module('werewolf.play.nighttime.cupid', [])
    .component('cupid', {
      templateUrl: 'js/components/play/nighttime/cupid/cupid.tpl.html',
      controller: CupidController,
      bindings: {
        thisRole    : '@',
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function CupidController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.allDone = false;
    $ctrl.arrows = 2;

    $ctrl.shootArrow = shootArrow;
    $ctrl.next = next;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        if ($ctrl.allDone || !gameState.rolePlaying('Cupid')) {
          gameState.transition($ctrl.nextRole);
        }
      }
    };

    function shootArrow(player) {
      player.inLove = !player.inLove;
      $ctrl.arrows += player.inLove ? -1 : 1;
    }

    function next() {
      $ctrl.allDone = true;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
