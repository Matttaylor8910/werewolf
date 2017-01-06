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
    $ctrl.allDone = false;
    $ctrl.choices = 2;

    $ctrl.select = select;
    $ctrl.next = next;

    if ($ctrl.allDone || !gameState.rolePlaying('Hoodlum')) {
      gameState.transition($ctrl.nextRole);
    }

    function select(player) {
      player.hoodlum = !player.hoodlum;
      $ctrl.choices += player.hoodlum ? -1 : 1;
    }

    function next() {
      $ctrl.allDone = true;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
