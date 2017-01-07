(function() {
  angular
    .module('werewolf.setRoles')
    .controller('SetRolesController', SetRolesController);

  function SetRolesController($scope, $state, gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $ctrl.selectRole = selectRole;
    $ctrl.next = next;

    $scope.$on("$ionicView.beforeEnter", function(){
      $ctrl.players = [];
      $ctrl.playerNames = gameState.playerNames;
      $ctrl.roles = _.clone(gameState.roles);
      $ctrl.playerName = $ctrl.playerNames.shift();
      $ctrl.role = undefined;
    });

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
      var role = $ctrl.roles.splice($ctrl.role, 1)[0];

      var player = {
        alive: true,
        name: $ctrl.playerName,
        role: role
      };

      // Add the player to the game with their role
      $ctrl.players.push(player);
      gameState.setProperty('players', $ctrl.players);

      // Move on if all players have been selected
      if ($ctrl.playerNames.length === 0) {
        var players = [];
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
