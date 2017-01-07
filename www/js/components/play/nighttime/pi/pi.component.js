(function() {
  angular
    .module('werewolf.play.nighttime.pi', [])
    .component('pi', {
      templateUrl: 'js/components/play/nighttime/pi/pi.tpl.html',
      controller: PIController,
      bindings: {
        nextRole    : '@'
      }
    });

  function PIController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.weBeSeekin = false;
    $ctrl.dead = gameState.isDead('P.I.');

    $ctrl.next = next;

    if (!gameState.rolePlaying('P.I.')) {
      gameState.transition($ctrl.nextRole);
    } else {
      // find positives for P.I.
      $ctrl.wolves = _.map(_.filter(gameState.players, function(player) {
        return _.includes(nightState.lookLikeWolves, player.role.name);
      }), 'name');
    }

    function next() {
      if ($ctrl.weBeSeekin) {
        $ctrl.nightState.once.pi = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
