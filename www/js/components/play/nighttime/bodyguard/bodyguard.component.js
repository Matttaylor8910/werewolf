(function() {
  angular
    .module('werewolf.play.nighttime.bodyguard', [])
    .component('bodyguard', {
      templateUrl: 'js/components/play/nighttime/bodyguard/bodyguard.tpl.html',
      controller: BodyguardController,
      bindings: {
        thisRole    : '@',
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function BodyguardController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.players = [];
    $ctrl.last = undefined;

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;
    $ctrl.dead = false;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        if (!gameState.rolePlaying('Bodyguard')) {
          gameState.transition($ctrl.nextRole);
        }
        if (gameState.isDead('Bodyguard')) {
          $ctrl.dead = true;
        }
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
        $ctrl.players[0].shouldDie = false;
        $ctrl.players = [];
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
