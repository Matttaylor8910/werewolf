(function() {
  angular
    .module('werewolf.play.nighttime.troublemaker', [])
    .component('troublemaker', {
      templateUrl: 'js/components/play/nighttime/troublemaker/troublemaker.tpl.html',
      controller: troublemakerController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function troublemakerController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.players = [];
    $ctrl.weBeKillin = false;
    $ctrl.dead = gameState.isDead('Spellcaster');

    $ctrl.canMoveOn = canMoveOn;
    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Troublemaker')) {
      gameState.transition($ctrl.nextRole);
    }

    function canMoveOn() {
      if ($ctrl.weBeKillin && $ctrl.players.length !== 2) {
        return false;
      }

      return true;
    }

    function isSelected(player){
      return !!_.find($ctrl.players, ['name', player.name]);
    }

    function select(player) {
      $ctrl.players = _.concat(_.takeRight($ctrl.players), [player]);
    }

    function next() {
      if ($ctrl.weBeKillin) {
        _.each($ctrl.players, function (player) {
          player.shouldDie = true;
        });
        $ctrl.nightState.once.troublemaker = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
