(function() {
  angular
    .module('werewolf.randomRoles')
    .controller('RandomRolesController', RandomRolesController);

  function RandomRolesController($scope, $state, gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $ctrl.next = next;

    $scope.$on("$ionicView.beforeEnter", function(){
      $ctrl.index = 0;
      $ctrl.players = [];
      $ctrl.player = undefined;
      randomlyAssign();
    });

    /**
     * Randomly assign players to the roles
     */
    function randomlyAssign() {
      var roles = _.cloneDeep(gameState.roles);
      _.each(gameState.playerNames, function(playerName) {
        var role = roles.splice(_.random(roles.length - 1), 1)[0];

        var player = {
          alive: true,
          name: playerName,
          role: role
        };

        // Add the player to the game with their role
        $ctrl.players.push(player);
      });
      showRole();
      gameState.setProperty('players', $ctrl.players);
    }

    /**
     * Move on to the next role
     */
    function next() {
      $ctrl.index++;

      // Move on if all players have been shown
      if ($ctrl.index === $ctrl.players.length) {
        $state.go('play');
      }
      // Otherwise show next role
      else {
        showRole();
      }
    }

    /**
     * Select the role to show given the index
     */
    function showRole() {
      $ctrl.player = $ctrl.players[$ctrl.index];
    }
  }
})();
