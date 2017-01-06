(function() {
  angular
    .module('werewolf.play.nighttime.werewolves', [])
    .component('werewolves', {
      templateUrl: 'js/components/play/nighttime/werewolves/werewolves.tpl.html',
      controller: WerewolvesController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function WerewolvesController(gameState, werewolfService) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.werewolfService = werewolfService;
    $ctrl.dead = gameState.areDead(werewolfService.realWolves, false);

    $ctrl.kill = kill;
    $ctrl.next = next;

    if (!gameState.rolesPlaying(werewolfService.realWolves, true)) {
      gameState.transition($ctrl.nextRole);
    }

    function kill(player) {
      player.shouldDie = !player.shouldDie;
      werewolfService.setKills(werewolfService.thisRoundKills + (player.shouldDie ? -1 : 1));
    }

    function next() {
      werewolfService.setKills(1);
      gameState.transition($ctrl.nextRole);
    }
  }
})();
