(function() {
  angular
    .module('werewolf.play')
    .controller('PlayController', PlayController);

  function PlayController($scope, gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    // Start in the sleeping state
    $scope.$on("$ionicView.beforeEnter", sleep);

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

      // clear the night recap
      gameState.setProperty('nightRecap', []);

      // reset player indicators
      _.each($ctrl.gameState.players, function(player) {
        player.silenced = false;
        player.banished = false;
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
          killPlayer(player);
        }

        // check if player was banished
        if (player.banished && player.alive) {
          addEventToRecap(player.name, 'is banished for the day. They must leave the room until tomorrow.');
        }

        // check if player was silenced
        if (player.silenced && player.alive) {
          addEventToRecap(player.name, 'is silenced for the day. They must not talk until tomorrow.');
        }

      });
    }

    /**
     * Player should lose their life (or lose the life the priest gave them
     * @param eventTeplayerxt The player that is about to die
     */
    function killPlayer(player) {
      // they're dead if they should have been saved
      player.alive = !!player.shouldSave;
      // reset some properties
      player.shouldDie = false;
      player.shouldSave = false;

      // if the player is actually dead, add to night recap
      if (!player.alive) {
        addEventToRecap(player.name, 'died last night.')
      }
    }

    /**
     * The text to be in the recap
     * @param name
     * @param eventText
     */
    function addEventToRecap(name, eventText) {
      gameState.setProperty('nightRecap', _.union(gameState.nightRecap, [{
        name      : name,
        eventText : eventText
      }]));
    }
  }
})();
