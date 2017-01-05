(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, localStorage) {
    // only for local dev use
    var DEBUG = false;

    var service = {
      playerNames               : localStorage.getArray('playerNames'),
      roles                     : DEBUG ? localStorage.getArray('roles') : [],
      players                   : DEBUG ? localStorage.getArray('players') : [],
      round                     : 0,
      role                      : undefined,

      setProperty               : setProperty,
      addPlayerToGame           : addPlayerToGame,
      rolePlaying               : rolePlaying,
      startOver                 : startOver,
      nextRound                 : nextRound,
      transition                : transition
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
      localStorage.setArray('players', service.players);
    }

    /**
     * Go back to the choose players screen if we're missing info
     */
    function goHomeIfBlank() {
      if ((service.playerNames.length < 1 ||
          service.roles.length  < 1) &&
          $state.current.name !== 'choose-players') {
        startOver();
      }
    }

    /**
     * Determine if a role is in the game and living
     * @param role
     * @returns {boolean}
     */
    function rolePlaying(role) {
      return _.includes(_.map(service.roles, 'name'), role);
    }

    /**
     * Return to the beginning
     */
    function startOver() {
      service.round = 0;
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      });
      $state.go('choose-players');
    }

    /**
     * Move to the next round
     */
    function nextRound() {
      service.round++;
      transition('wolves');
    }

    /**
     * Transition to another role
     * @param role
     */
    function transition(role) {
      service.role = role;
    }
  }
})();
