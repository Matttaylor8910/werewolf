(function() {
  angular
    .module('werewolf.play.nighttime.apprenticeSeer', [])
    .component('apprenticeSeer', {
      templateUrl: 'js/components/play/nighttime/apprentice-seer/apprentice-seer.tpl.html',
      controller: ApprenticeSeerController,
      bindings: {
        nextRole    : '@'
      }
    });

  function ApprenticeSeerController(gameState, nightState) {
    var $ctrl = this;
    var seerDead = gameState.isDead('Seer');

    $ctrl.gameState = gameState;
    $ctrl.dead = gameState.isDead('Apprentice Seer');
    $ctrl.seerDead = _.isUndefined(seerDead) ? true : seerDead;

    $ctrl.next = next;

    if (!gameState.rolePlaying('Apprentice Seer')) {
      gameState.transition($ctrl.nextRole);
    } else {
      // find positives for seer
      $ctrl.wolves = _.map(_.filter(gameState.players, function(player) {
        return _.includes(nightState.lookLikeWolves, player.role.name);
      }), 'name');
    }

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
