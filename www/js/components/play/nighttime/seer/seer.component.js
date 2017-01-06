(function() {
  angular
    .module('werewolf.play.nighttime.seer', [])
    .component('seer', {
      templateUrl: 'js/components/play/nighttime/seer/seer.tpl.html',
      controller: SeerController,
      bindings: {
        nextRole    : '@'
      }
    });

  function SeerController(gameState) {
    var $ctrl = this;

    var wolves = ['Werewolf', 'Wolf Cub', 'Lone Wolf', 'Lycan'];

    $ctrl.gameState = gameState;
    $ctrl.dead = gameState.isDead('Seer');

    $ctrl.next = next;

    if (!gameState.rolePlaying('Seer')) {
      gameState.transition($ctrl.nextRole);
    } else {
      // find positives for seer
      $ctrl.wolves = _.map(_.filter(gameState.players, function(player) {
        return _.includes(wolves, player.role.name);
      }), 'name');
    }

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
