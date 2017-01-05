(function() {
  angular
    .module('werewolf.play.daytime', [])
    .component('werewolfDaytime', {
      templateUrl: 'js/components/play/daytime/daytime.tpl.html',
      controller: DaytimeController
    });

  function DaytimeController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $ctrl.unsupportedRoles = _.filter($ctrl.gameState.roles, ['supported', false]);
    console.log($ctrl.unsupportedRoles);
  }
})();
