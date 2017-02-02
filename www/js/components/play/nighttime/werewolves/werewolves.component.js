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
    $ctrl.kills = _.clone(nightState.thisRoundKills);
    $ctrl.toast = $ctrl.dead ? 'The Werewolves are dead, just waking up for appearances.' :
                  nightState.diseased ? 'The Werewolves are diseased, they don\'t get to feed tonight' :
                  $ctrl.kills > 1 ? 'Note: the Werewolves kill ' + $ctrl.kills + ' people tonight.' : '';

    $ctrl.kill = kill;
    $ctrl.next = next;

    if (!gameState.rolesPlaying(nightState.realWolves, true)) {
      gameState.transition($ctrl.nextRole);
    }

    function kill(player) {
      player.eaten     = !player.eaten;
      player.shouldDie = !player.shouldDie;
      nightState.setProperty('thisRoundKills', nightState.thisRoundKills + (player.shouldDie ? -1 : 1));
    }

    function next() {
      var bigBadAlive = gameState.rolePlaying('Big Bad Wolf') && !gameState.isDead('Big Bad Wolf');
      nightState.setProperty('thisRoundKills', bigBadAlive ? 2 : 1);
      nightState.setProperty('diseased', false);
      gameState.transition($ctrl.nextRole);
    }
  }
})();
