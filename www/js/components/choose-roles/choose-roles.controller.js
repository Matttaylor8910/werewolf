(function() {
  angular
    .module('werewolf.chooseRoles')
    .controller('ChooseRolesController', ChooseRolesController);

  function ChooseRolesController($state, gameState, constants) {
    var $ctrl = this;

    $ctrl.allRoles = _.sortBy(_.filter(constants.roles, 'active'), 'name');
    $ctrl.gameState = gameState;
    $ctrl.selectedRoles = [];
    $ctrl.totalWeight = 0;

    $ctrl.toggleRole = toggleRole;
    $ctrl.next = next;

    /**
     * Toggle a role being selected for the game
     * @param role
     */
    function toggleRole(role) {
      $ctrl.totalWeight += parseInt(role.weight);
      $ctrl.selectedRoles = _.sortBy(_.xor($ctrl.selectedRoles, [role]), 'name');
      $ctrl.allRoles = _.sortBy(_.xor($ctrl.allRoles, [role]), 'name');
    }

    /**
     * Set the roles to game state and move to confirm state
     */
    function next() {
      gameState.setProperty('roles', $ctrl.selectedRoles);
      $state.go('confirm');
    }
  }
})();
