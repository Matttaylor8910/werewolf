(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, $ionicScrollDelegate, $ionicPopup, $ionicActionSheet, localStorage, nightState) {
    // only for local dev use
    var DEBUG = true;

    var service = {
      allPlayerNames            : localStorage.getArray('allPlayerNames'),
      playerNames               : localStorage.getArray('playerNames'),
      roles                     : DEBUG ? localStorage.getArray('roles') : [],

      players                   : DEBUG ? localStorage.getArray('players') : [],
      round                     : 0,
      daytime                   : false,
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
      lynchPlayer               : lynchPlayer,
      confirmKill               : confirmKill,
      killPlayer                : killPlayer,
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
      service.playerNames = localStorage.getArray('playerNames');
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
     * The villagers lynch a player and handle that logic here
     * @param player
     */
    function lynchPlayer(player) {
      $ionicActionSheet.show({
        destructiveText: 'Lynch',
        titleText: 'Are you sure the village wanna lynch ' + player.name + '?',
        cancelText: 'Cancel',
        cancel: function() {},
        destructiveButtonClicked: function() {
          // prince doesn't die when lynched
          if (player.role.name === 'Prince') {
            simpleAlert(player.name + ' lives!', 'The Prince is not allowed to be lynched by the village.');
          } else {
            killPlayer(player);
          }
          return true;
        }
      });
    }

    /**
     * Confirm killing a player before passing them along
     * @param player
     */
    function confirmKill(player) {
      $ionicActionSheet.show({
        destructiveText: 'Kill',
        titleText: 'Are you sure you wanna kill ' + player.name + '?',
        cancelText: 'Cancel',
        cancel: function() {},
        destructiveButtonClicked: function() {
          killPlayer(player);
          return true;
        }
      });
    }

    /**
     * Player should lose their life (or lose the life the priest gave them)
     * @param player
     */
    function killPlayer(player) {

      // if player is blessed, they don't die
      if (player.blessed) {
        player.blessed = false;

        // if they were killed during the daytime alert the moderator as to why they don't die
        if (service.daytime) {
          simpleAlert(player.name + ' lives!', player.name + ' was blessed by the priest, so they live to die another day.');
        }
      }

      // they're dead if they weren't saved by a role such as bodyguard
      else if (!player.shouldSave) {
        // first off, now they're dead
        player.alive = false;

        killedForReal(player);

        if (!service.daytime) {
          addEventToRecap(player.name, 'died last night.')
        }
      }
    }

    /**
     * They player is now no longer alive, so set some game conditions for
     * special roles that affect future rounds or take out additional players
     * @param player
     */
    function killedForReal(player) {

      // werewolves are PIST and get an extra kill
      if (player.role.name === 'Wolf Cub') {
        nightState.setProperty('thisRoundKills', nightState.thisRoundKills + 1);
      }

      // werewolves no longer get the bonus kill the Big Bad Wolf gives
      if (player.role.name === 'Big Bad Wolf') {
        nightState.setProperty('thisRoundKills', nightState.thisRoundKills - 1);
      }

      // werewolves are diseased now and don't feed next round
      if (player.role.name === 'Diseased' && player.eaten) {
        nightState.setProperty('diseased', true);
      }

      // iterate through the players for some conditions
      _.each(service.players, function(thisPlayer) {

        if (thisPlayer.alive && thisPlayer !== player) {

          // check to kill cupid's soul mate
          if (player.inLove && thisPlayer.inLove) {
            killPlayer(thisPlayer);
          }

          // check to kill dire wolf if companion dies
          if (player.direCompanion && thisPlayer.alive && thisPlayer.role.name === 'Dire Wolf') {
            killPlayer(thisPlayer);
          }
        }
      });
    }

    /**
     * Wrapper for $ionicPopup taking a title and template
     * @param title
     * @param template
     */
    function simpleAlert(title, template) {
      $ionicPopup.alert({
        title: title,
        template: template,
        buttons: [
          { text: 'Sounds Good' }
        ]
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
