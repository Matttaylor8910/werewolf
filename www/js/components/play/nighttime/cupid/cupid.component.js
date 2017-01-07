(function() {
  angular
    .module('werewolf.play.nighttime.cupid', [])
    .component('cupid', {
      templateUrl: 'js/components/play/nighttime/cupid/cupid.tpl.html',
      controller: CupidController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function CupidController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.players = [];

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;

    if (gameState.round > 1 || !gameState.rolePlaying('Cupid')) {
      gameState.transition($ctrl.nextRole);
    }

    function isSelected(player){
      return !!_.find($ctrl.players, ['name', player.name]);
    }

    function select(player) {
      $ctrl.players = _.concat(_.takeRight($ctrl.players), [player]);
    }

    function next() {
      _.each($ctrl.players, function(player) {
        player.inLove = true;
      });
      gameState.transition($ctrl.nextRole);
    }
  }
})();
