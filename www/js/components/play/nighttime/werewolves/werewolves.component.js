(function() {
  angular
    .module('werewolf.play.nighttime.werewolves', [])
    .component('werewolves', {
      templateUrl: 'js/components/play/nighttime/werewolves/werewolves.tpl.html',
      controller: WerewolvesController,
      bindings: {
        thisRole    : '@',
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function WerewolvesController(gameState) {
    var $ctrl = this;

    $ctrl.state = {
      numberToKill: 0
    };
    $ctrl.disabled = true;

    $ctrl.gameState = gameState;

    $ctrl.kill = kill;
    $ctrl.next = next;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        if (!gameState.rolePlaying('Werewolf')) {
          gameState.transition($ctrl.nextRole);
        }
      }
    };

    function kill(player) {
      player.shouldDie = !player.shouldDie;
      $ctrl.state.numberToKill += player.shouldDie ? -1 : 1;
    }

    function next() {
      $ctrl.state.numberToKill = 1;
      $ctrl.disabled = false;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
