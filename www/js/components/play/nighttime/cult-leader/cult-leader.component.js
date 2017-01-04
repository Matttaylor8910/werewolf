(function() {
  angular
    .module('werewolf.play.nighttime.cultLeader', [])
    .component('cultLeader', {
      templateUrl: 'js/components/play/nighttime/cult-leader/cult-leader.tpl.html',
      controller: CultLeaderController,
      bindings: {
        thisRole    : '@',
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function CultLeaderController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.playersInCult = [];

    $ctrl.inCult = inCult;
    $ctrl.joinCult = joinCult;
    $ctrl.next = next;

    function inCult(player){
      return !!_.find($ctrl.playersInCult, ['name', player.name]);
    }

    function joinCult(player) {
      $ctrl.playersInCult = _.xor($ctrl.playersInCult, [player]);
    }

    function next() {
      $ctrl.playersInCult[0].inCult = true;
      $ctrl.playersInCult = [];
      gameState.transition($ctrl.nextRole);
    }
  }
})();
