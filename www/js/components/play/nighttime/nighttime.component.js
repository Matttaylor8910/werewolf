(function() {
  angular
    .module('werewolf.play.nighttime', [
      'werewolf.play.nighttime.werewolves',
      'werewolf.play.nighttime.cultLeader',
      'werewolf.play.nighttime.cupid',
      'werewolf.play.nighttime.bodyguard',
      'werewolf.play.nighttime.spellcaster',
      'werewolf.play.nighttime.oldHag'
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
