(function() {
  angular
    .module('werewolf.play')
    .controller('PlayController', PlayController);

  function PlayController($scope, gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    // Start in the sleeping state
    $scope.$on('$ionicView.enter', sleep);

    /**
     * Set the play state to the nighttime phase
     */
    function sleep() {
      gameState.nextRound();
      gameState.setProperty('daytime', false);
      $ctrl.nextAction = wake;

      // clear the night recap
      gameState.setProperty('nightRecap', []);

      // reset player indicators
      _.each($ctrl.gameState.players, function(player) {
        player.silenced = false;
        player.banished = false;
        player.shouldDie = false;
        player.shouldSave = false;
        player.eaten = false;
      });
    }

    /**
     * Set the play state to the daytime phase
     */
    function wake() {
      // Logic for what happens after the night
      _.each($ctrl.gameState.players, function(player){

        // if player was marked to die, kill em
        if (player.alive && player.shouldDie) {
          gameState.killPlayer(player);
        }

        // check if player was banished
        if (player.banished && player.alive) {
          gameState.addEventToRecap(player.name, 'is banished for the day. They must leave the room until tomorrow.');
        }

        // check if player was silenced
        if (player.silenced && player.alive) {
          gameState.addEventToRecap(player.name, 'is silenced for the day. They must not talk until tomorrow.');
        }

      });

      // Keep a reminder about the Masons if they're playing
      if (gameState.rolePlaying('Mason')) {
        gameState.addEventToRecap('Reminder:', 'The Masons are in play, kill anyone who says \'Mason\'')
      }

      // Set to daytime here so that the above functions
      // know that these actions happened at night
      gameState.setProperty('daytime', true);
      $ctrl.nextAction = sleep;
    }
  }
})();
