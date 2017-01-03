(function() {
  angular
    .module('werewolf.play.nighttime.werewolves', [])
    .component('nightWerewolves', {
      templateUrl: 'js/components/play/nighttime/werewolves/werewolves.tpl.html',
      controller: NightWerewolvesController,
      bindings: {
        nextRole  : '@'
      }
    });

  function NightWerewolvesController(gameState) {
    var $ctrl = this;

    $ctrl.state = {
      numberToKill: 0
    };

    $ctrl.gameState = gameState;

    $ctrl.kill = kill;
    $ctrl.next = next;

    function kill(player) {
      $ctrl.state.numberToKill--;
      gameState.toggleDead(player);
    }

    function next() {
      $ctrl.state.numberToKill = 1;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
