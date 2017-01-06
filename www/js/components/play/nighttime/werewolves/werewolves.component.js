(function() {
  angular
    .module('werewolf.play.nighttime.werewolves', [])
    .component('werewolves', {
      templateUrl: 'js/components/play/nighttime/werewolves/werewolves.tpl.html',
      controller: WerewolvesController,
      bindings: {
        nextRole    : '@'
      }
    });

  function WerewolvesController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.dead = gameState.areDead(nightState.realWolves, false);

    $ctrl.kill = kill;
    $ctrl.next = next;

    if (!gameState.rolesPlaying(nightState.realWolves, true)) {
      gameState.transition($ctrl.nextRole);
    }

    function kill(player) {
      player.shouldDie = !player.shouldDie;
      nightState.setKills(nightState.thisRoundKills + (player.shouldDie ? -1 : 1));
    }

    function next() {
      nightState.setKills(1);
      gameState.transition($ctrl.nextRole);
    }
  }
})();
