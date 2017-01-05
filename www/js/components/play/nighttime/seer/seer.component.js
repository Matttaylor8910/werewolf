(function() {
  angular
    .module('werewolf.play.nighttime.seer', [])
    .component('seer', {
      templateUrl: 'js/components/play/nighttime/seer/seer.tpl.html',
      controller: SeerController,
      bindings: {
        thisRole    : '@',
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function SeerController(gameState) {
    var $ctrl = this;

    var wolves = ['Werewolf', 'Wolf Cub', 'Lone Wolf', 'Lycan'];

    $ctrl.gameState = gameState;
    $ctrl.dead = false;

    $ctrl.next = next;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        // find seer
        $ctrl.wolves = _.map(_.filter(gameState.players, function(player) {
          return _.includes(wolves, player.role.name);
        }), 'name');

        if (!gameState.rolePlaying('Seer')) {
          gameState.transition($ctrl.nextRole);
        }
        if (gameState.isDead('Seer')) {
          $ctrl.dead = true;
        }
      }
    };

    function next() {
      gameState.transition($ctrl.nextRole);
    }
  }
})();
