(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, $ionicScrollDelegate, localStorage) {
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
      rolesPlaying              : rolesPlaying,
      isDead                    : isDead,
      areDead                   : areDead,
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
     * Determine if any/all of the roles are playing
     * @param roles
     * @param any
     * @returns {boolean}
     */
    function rolesPlaying(roles, any) {
      var playing = !any;
      _.each(roles, function(role) {
        var thisRole = _.includes(_.map(service.roles, 'name'), role);
        any ? playing |= thisRole : playing &= thisRole;
      });
      return playing;
    }

    /**
     * Determine if a role is dead
     * @param role
     * @returns {boolean}
     */
    function isDead(role) {
      var dead = false;
      _.each(service.players, function(player) {
        if (!player.alive && player.role.name === role) {
          dead = true;
        }
      });
      return dead;
    }

    /**
     * Determine if any/all of the roles are dead
     * @param roles
     * @param any
     */
    function areDead(roles, any) {
      var dead = !any;
      _.each(roles, function(role) {
        var found = _.find(service.players, function(player) {
          return player.role.name = role
        });
        if (found) {
          var isDead = !found.alive;
          any ? dead |= isDead : dead &= isDead;
        }
      });
      return dead;
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
      $ionicScrollDelegate.scrollTop(true);
    }
  }
})();
