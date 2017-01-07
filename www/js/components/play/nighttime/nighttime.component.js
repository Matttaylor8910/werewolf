(function() {
  angular
    .module('werewolf.play.nighttime', [
      'werewolf.play.nighttime.werewolves',
      'werewolf.play.nighttime.cultLeader',
      'werewolf.play.nighttime.cupid',
      'werewolf.play.nighttime.bodyguard',
      'werewolf.play.nighttime.spellcaster',
      'werewolf.play.nighttime.oldHag',
      'werewolf.play.nighttime.sorceress',
      'werewolf.play.nighttime.seer',
      'werewolf.play.nighttime.hoodlum',
      'werewolf.play.nighttime.masons',
      'werewolf.play.nighttime.minion',
      'werewolf.play.nighttime.witch',
      'werewolf.play.nighttime.troublemaker'
    ])
    .component('werewolfNighttime', {
      templateUrl: 'js/components/play/nighttime/nighttime.tpl.html',
      controller: NighttimeController
    });

  function NighttimeController(gameState, nightState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.nightState = nightState;
  }
})();
