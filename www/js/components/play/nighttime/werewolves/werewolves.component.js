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

    var wolves = ['Werewolf', 'Wolf Cub', 'Wolf Man', 'Fruit Brute', 'Dire Wolf', 'Big Bad Wolf', 'Lone Wolf'];

    $ctrl.state = {
      numberToKill: 0
    };
    $ctrl.disabled = true;
    $ctrl.gameState = gameState;
    $ctrl.dead = false;

    $ctrl.kill = kill;
    $ctrl.next = next;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        if (!gameState.rolesPlaying(wolves, true)) {
          gameState.transition($ctrl.nextRole);
        }
        $ctrl.dead = gameState.areDead(wolves, false);
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
