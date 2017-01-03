(function() {
  angular
    .module('werewolf.play.nighttime.cultLeader', [])
    .component('cultLeader', {
      templateUrl: 'js/components/play/nighttime/cult-leader/cult-leader.tpl.html',
      controller: CultLeaderController,
      bindings: {
        nextRole  : '@'
      }
    });

  function CultLeaderController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.ready = false;

    $ctrl.joinCult = joinCult;
    $ctrl.next = next;

    function joinCult(player) {
      player.inCult = true;
      $ctrl.ready = true;
    }

    function next() {
      $ctrl.ready = false;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
