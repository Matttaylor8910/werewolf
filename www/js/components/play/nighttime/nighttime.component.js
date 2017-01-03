(function() {
  angular
    .module('werewolf.play.nighttime', [
      'werewolf.play.nighttime.werewolves'
    ])
    .component('werewolfNighttime', {
      templateUrl: 'js/components/play/nighttime/nighttime.tpl.html',
      controller: NighttimeController
    });

  function NighttimeController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
  }
})();
