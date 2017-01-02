(function() {
  angular
    .module('werewolf.setRoles')
    .controller('SetRolesController', SetRolesController);

  function SetRolesController($state, gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $ctrl.selectRole = selectRole;
    $ctrl.next = next;

    // Init this state in a function so we can reset if we have to
    init();

    /**
     * Set up the state with all players and roles
     */
    function init() {
      $ctrl.playerNames = gameState.playerNames;
      $ctrl.roles = gameState.roles;
      $ctrl.playerName = $ctrl.playerNames.shift();
      $ctrl.role = undefined;
    }

    /**
     * Select a role from the list and store that index
     * @param index
     */
    function selectRole(index) {
      $ctrl.role = index;
    }

    /**
     * Tie the selected player to the selected role and
     * then pop off the next player.
     *
     * Move to the play state when finished with all players
     */
    function next() {
      var player = {
        alive: true,
        name: $ctrl.playerName,
        role: $ctrl.roles.splice($ctrl.role, 1)[0]
      };

      // Add the player to the game with their role
      gameState.addPlayerToGame(player);

      // Move on if all players have been selected
      if ($ctrl.playerNames.length === 0) {
        $state.go('play');
      }

      // Else set up for the next player
      else {
        $ctrl.playerName = $ctrl.playerNames.shift();
        $ctrl.role = undefined;
      }
    }
  }
})();
