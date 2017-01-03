(function() {
  angular
    .module('werewolf.play.nighttime.werewolves', [])
    .component('werewolves', {
      templateUrl: 'js/components/play/nighttime/werewolves/werewolves.tpl.html',
      controller: WerewolvesController,
      bindings: {
        nextRole  : '@'
      }
    });

  function WerewolvesController(gameState) {
    var $ctrl = this;

    $ctrl.state = {
      numberToKill: 0
    };

    $ctrl.gameState = gameState;

    $ctrl.kill = kill;
    $ctrl.next = next;

    function kill(player) {
      $ctrl.state.numberToKill--;
      player.shouldDie = true;
    }

    function next() {
      $ctrl.state.numberToKill = 1;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
