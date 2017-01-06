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

  function WerewolvesController(gameState, werewolfService) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.werewolfService = werewolfService;
    $ctrl.disabled = true;
    $ctrl.dead = false;

    $ctrl.kill = kill;
    $ctrl.next = next;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        if (!gameState.rolesPlaying(werewolfService.realWolves, true)) {
          gameState.transition($ctrl.nextRole);
        }
        $ctrl.dead = gameState.areDead(werewolfService.realWolves, false);
      }
    };

    function kill(player) {
      player.shouldDie = !player.shouldDie;
      werewolfService.setKills(werewolfService.thisRoundKills + (player.shouldDie ? -1 : 1));
      console.log(werewolfService.thisRoundKills);
    }

    function next() {
      werewolfService.setKills(1);
      console.log(werewolfService.thisRoundKills);
      $ctrl.disabled = false;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
