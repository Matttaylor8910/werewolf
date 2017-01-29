(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, $ionicScrollDelegate, localStorage, nightState) {
    // only for local dev use
    var DEBUG = false;

    var service = {
      playerNames               : localStorage.getArray('playerNames'),
      roles                     : DEBUG ? localStorage.getArray('roles') : [],

      players                   : DEBUG ? localStorage.getArray('players') : [],
      round                     : 0,
      role                      : undefined,

      // An array of string about what happened last night
      nightRecap                : [],

      setProperty               : setProperty,
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
      localStorage.setArray(property, value);
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
     * Undefined if that role isn't playing
     * @param role
     * @returns {boolean}
     */
    function isDead(role) {
      var found = _.map(_.filter(service.players, function(player) {
        return player.role.name === role;
      }), 'alive');
      if (DEBUG) console.log('Looking up ' + role + ': ' + (found.length > 0 ? (_.includes(found, true) ? 'alive' : 'dead') : 'not found'));
      return found.length > 0 ? !_.includes(found, true) : undefined;
    }

    /**
     * Determine if any/all of the roles are dead
     * @param roles
     * @param any
     */
    function areDead(roles, any) {
      var dead = !any;
      _.each(roles, function(role) {
        var isDead = service.isDead(role);
        if (!_.isUndefined(isDead)) {
          any ? dead |= isDead : dead &= isDead;
        }
      });
      return dead;
    }

    /**
     * Return to the beginning
     */
    function startOver() {
      service.playerNames =localStorage.getArray('playerNames');
      service.roles = [];
      service.players = [];
      service.round = 0;
      service.role = undefined;

      // clean up the night state too
      nightState.clear();

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
      service.role = {};
      service.role[role] = true;
      $ionicScrollDelegate.scrollTop(true);
    }
  }
})();
