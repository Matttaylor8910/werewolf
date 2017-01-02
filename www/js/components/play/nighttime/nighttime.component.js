(function() {
  angular
    .module('werewolf.play.nighttime', [])
    .component('werewolfNighttime', {
      templateUrl: 'js/components/play/nighttime/nighttime.tpl.html',
      controller: NighttimeController
    });

  function NighttimeController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
  }
})();
