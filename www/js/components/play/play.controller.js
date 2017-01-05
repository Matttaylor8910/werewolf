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
        title: 'Night',
        nextActionText: 'Wake',
        nextAction: wake
      };

      // Logic for what happens after the day
      _.each($ctrl.gameState.players, function(player) {
        //make sure no one is silenced
        player.silenced = false;
      });
    }

    /**
     * Set the play state to the daytime phase
     */
    function wake() {
      $ctrl.phase = {
        title: 'Day',
        nextActionText: 'Sleep',
        nextAction: sleep
      };

      // Logic for what happens after the night
      _.each($ctrl.gameState.players, function(player){

        // if player was marked to die, kill em
        if (player.alive && player.shouldDie) {
          player.alive = false;
          player.shouldDie = false;
        }

      });
    }
  }
})();
