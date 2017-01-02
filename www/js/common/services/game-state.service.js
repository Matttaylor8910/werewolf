(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, localStorage) {
    // only for local dev use
    var DEBUG = true;

    var service = {
      playerNames     : localStorage.getArray('playerNames'),
      roles           : DEBUG ? localStorage.getArray('roles') : [],
      players         : [],

      setProperty     : setProperty,
      addPlayerToGame : addPlayerToGame,
      toggleDead      : toggleDead,
      startOver       : goHome
    };

    // if the application doesn't have an equal number of players to roles,
    // we need to go back to the choose players state, mostly for localhost
    if (!DEBUG) goHomeIfBlank();

    return service;

    /**
     * Singular function to set a property on this service
     * @param property
     * @param value
     */
    function setProperty(property, value) {
      service[property] = value;
    }

    /**
     * Add player to the game with their role
     * @param player
     */
    function addPlayerToGame(player) {
      service.players.push(player);
    }

    /**
     * Function to mark someone as dead or alive
     * @param player
     */
    function toggleDead(player) {
      var found = _.find(service.players, ['name', player.name]);
      found.alive = !found.alive;
    }

    /**
     * Go back to the choose players screen if we're missing info
     */
    function goHomeIfBlank() {
      if ((service.playerNames.length < 1 ||
          service.roles.length  < 1) &&
          $state.current.name !== 'choose-players') {
        goHome();
      }
    }

    /**
     * Return to the beginning
     */
    function goHome() {
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      });
      $state.go('choose-players');
    }
  }
})();
