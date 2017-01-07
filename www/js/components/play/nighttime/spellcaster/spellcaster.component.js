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
    $ctrl.player = undefined;
    $ctrl.dead = gameState.isDead('Spellcaster');

    $ctrl.select = select;
    $ctrl.next = next;

    if (!gameState.rolePlaying('Spellcaster')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player) {
      $ctrl.player = player;
    }

    function next() {
      if ($ctrl.player) {
        nightState.setLast('spellcaster', $ctrl.player.name);
        $ctrl.player.silenced = true;
      }
      gameState.transition($ctrl.nextRole);
    }
  }
})();
