(function() {
  angular
    .module('werewolf.play')
    .controller('PlayController', PlayController);

  function PlayController(gameState) {
    var $ctrl = this;

    $ctrl.phase = { title: 'Werewolf' };

    $ctrl.gameState = gameState;

    sleep();

    /**
     * Set the play state to the nighttime phase
     */
    function sleep() {
      gameState.nextRound();
      $ctrl.phase = {
        title: 'Night Time',
        nextActionText: 'Wake',
        nextAction: wake
      };
    }

    /**
     * Set the play state to the daytime phase
     */
    function wake() {
      $ctrl.phase = {
        title: 'Day Time',
        nextActionText: 'Sleep',
        nextAction: sleep
      };
    }
  }
})();
