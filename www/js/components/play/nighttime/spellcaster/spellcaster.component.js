(function() {
  angular
    .module('werewolf.play.nighttime.spellcaster', [])
    .component('spellcaster', {
      templateUrl: 'js/components/play/nighttime/spellcaster/spellcaster.tpl.html',
      controller: SpellcasterController,
      bindings: {
        nextRole    : '@'
      }
    });

  function SpellcasterController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
    $ctrl.players = [];
    $ctrl.dead = gameState.isDead('Spellcaster');

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Spellcaster')) {
      gameState.transition($ctrl.nextRole);
    }

    function isSelected(player){
      return !!_.find($ctrl.players, ['name', player.name]);
    }

    function select(player) {
      $ctrl.players = _.xor($ctrl.players, [player]);
    }

    function next() {
      if ($ctrl.players.length) {
        nightState.setLast('spellcaster', $ctrl.players[0].name);
        $ctrl.players[0].silenced = true;
        $ctrl.players = [];
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
