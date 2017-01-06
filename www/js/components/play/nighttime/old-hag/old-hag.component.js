(function() {
  angular
    .module('werewolf.play.nighttime.oldHag', [])
    .component('oldHag', {
      templateUrl: 'js/components/play/nighttime/old-hag/old-hag.tpl.html',
      controller: OldHagController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function OldHagController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.players = [];
    $ctrl.last = undefined;

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;
    $ctrl.dead = false;

    $ctrl.$onChanges = function() {
      if (!gameState.rolePlaying('Old Hag')) {
        gameState.transition($ctrl.nextRole);
      }
      if (gameState.isDead('Old Hag')) {
        $ctrl.dead = true;
      }
    };

    function isSelected(player){
      return !!_.find($ctrl.players, ['name', player.name]);
    }

    function select(player) {
      $ctrl.players = _.xor($ctrl.players, [player]);
    }

    function next() {
      if ($ctrl.players.length) {
        $ctrl.last = $ctrl.players[0].name;
        $ctrl.players[0].banished = true;
        $ctrl.players = [];
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
