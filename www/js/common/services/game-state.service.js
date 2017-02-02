(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, $ionicScrollDelegate, $ionicPopup, localStorage, nightState) {
    // only for local dev use
    var DEBUG = false;

    var service = {
      allPlayerNames            : localStorage.getArray('allPlayerNames'),
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
      transition                : transition,
      killPlayer                : killPlayer,
      lynchPlayer               : lynchPlayer,
      addEventToRecap           : addEventToRecap
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

    /**
     * Player should lose their life (or lose the life the priest gave them)
     * @param player The player that is about to die
     */
    function killPlayer(player) {
      // they're dead if they should have been saved
      player.alive = !!player.shouldSave;

      // if player is blessed, they don't die
      if (player.blessed) {
        player.blessed = false;
        player.alive = true;
      }

      // if the player is actually dead have some work to do
      if (!player.alive) {

        // werewolves are PIST and get an extra kill
        if (player.role.name === 'Wolf Cub') {
          nightState.setProperty('thisRoundKills', nightState.thisRoundKills + 1);
        }

        // werewolves are diseased now and don't feed next round
        if (player.role.name === 'Diseased' && player.eaten) {
          nightState.setProperty('diseased', true);
        }

        // check to kill cupid's soul mate
        if (player.inLove) {
          _.each(service.players, function(potentialSoulMate) {
            if (potentialSoulMate !== player && potentialSoulMate.inLove && potentialSoulMate.alive) {
              killPlayer(potentialSoulMate);
            }
          });
        }

        addEventToRecap(player.name, 'died last night.')
      }
    }

    /**
     * The villagers lynch a player and handle that logic here
     * @param player
     */
    function lynchPlayer(player) {
      // make sure they really wanna kill them
      $ionicPopup.confirm({
        title: 'Lynch ' + player.name,
        template: 'Are you sure the village really wants to lynch ' + player.name + '?'
      }).then(function(res) {
        // they chose yes
        if(res) {
          // prince doesn't die when lynched
          if (player.role.name === 'Prince') {
            simpleAlert(player.name + ' lives!', 'The Prince is not allowed to be lynched by the village.');
          }
          // if the player is blessed, just make them lose a life
          else if (player.blessed) {
            player.blessed = false;
            simpleAlert(player.name + ' lives!', player.name + ' was blessed by the priest, so they live to die another day.');
          }
          // everyone else can though
          else {
            // werewolves are PIST and get an extra kill
            if (player.role.name === 'Wolf Cub') {
              nightState.setProperty('thisRoundKills', nightState.thisRoundKills + 1);
            }

            // werewolves no longer get the bonus kill the Big Bad Wolf gives
            if (player.role.name === 'Big Bad Wolf') {
              nightState.setProperty('thisRoundKills', nightState.thisRoundKills - 1);
            }

            player.alive = false;
          }
        }
      });
    }

    /**
     * Wrapper for $ionicPopu taking a title and template
     * @param title
     * @param template
     */
    function simpleAlert(title, template) {
      $ionicPopup.alert({
        title: title,
        template: template
      });
    }

    /**
     * The text to be in the recap
     * @param name
     * @param eventText
     */
    function addEventToRecap(name, eventText) {
      service.nightRecap = _.union(service.nightRecap, [{
        name      : name,
        eventText : eventText
      }]);
    }
  }
})();
