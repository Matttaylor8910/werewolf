(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, localStorage) {
    var service = {
      playerNames     : localStorage.getArray('playerNames'),
      roles           : [],
      players         : [],

      setProperty     : setProperty,
      addPlayerToGame : addPlayerToGame,
      toggleDead      : toggleDead,
      startOver       : startOver
    };

    // if the application doesn't have an equal number of players to roles,
    // we need to go back to the choose players state, mostly for localhost
    goHomeIfBlank();

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
     * Temporary function to mark someone as dead or alive
     * @param player
     */
    function toggleDead(player) {
      _.each(service.players, function(p) {
        if (p.name === player.name) {
          p.alive = !p.alive;
        }
      });
    }

    /**
     * Start all the way over
     */
    function startOver() {
      service.playerNames = localStorage.getArray('playerNames');
      service.roles = [];
      service.players = [];
      goHomeIfBlank();
    }

    /**
     * Go back to the choose players screen if we're missing info
     */
    function goHomeIfBlank() {
      if ((service.playerNames.length < 1 ||
          service.roles.length  < 1) &&
          $state.current.name !== 'choose-players') {

        $ionicHistory.nextViewOptions({
          disableAnimate: true
        });
        $state.go('choose-players');
      }
    }
  }
})();
