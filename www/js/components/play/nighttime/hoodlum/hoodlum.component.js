(function() {
  angular
    .module('werewolf.play.nighttime.hoodlum', [])
    .component('hoodlum', {
      templateUrl: 'js/components/play/nighttime/hoodlum/hoodlum.tpl.html',
      controller: hoodlumController,
      bindings: {
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function hoodlumController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.players = [];

    $ctrl.select = select;
    $ctrl.isSelected = isSelected;
    $ctrl.next = next;

    if (gameState.round > 1 || !gameState.rolePlaying('Hoodlum')) {
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
        player.hoodlum = true;
      });
      gameState.transition($ctrl.nextRole);
    }
  }
})();
