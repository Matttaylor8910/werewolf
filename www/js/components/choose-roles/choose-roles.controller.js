(function() {
  angular
    .module('werewolf.chooseRoles')
    .controller('ChooseRolesController', ChooseRolesController);

  function ChooseRolesController(constants, gameState) {
    var $ctrl = this;

    $ctrl.allRoles = allRoles();
    $ctrl.gameState = gameState;
    $ctrl.selectedRoles = gameState.roles;
    $ctrl.totalWeight = 0;

    $ctrl.addRole = addRole;
    $ctrl.removeRole = removeRole;

    /**
     * Get all selectable roles
     * @returns {*}
     */
    function allRoles() {
      var roles = _.sortBy(_.filter(constants.roles, 'active'), 'name');

      // remove the selected roles from the list of all roles
      return _.xor(roles, gameState.roles);
    }

    /**
     * Add a role
     * @param role
     */
    function addRole(role) {
      $ctrl.totalWeight += parseInt(role.weight);
      toggleRole(role);
    }

    /**
     * Remove a role
     * @param role
     */
    function removeRole(role) {
      $ctrl.totalWeight -= parseInt(role.weight);
      toggleRole(role);
    }

    /**
     * Toggle a role being selected for the game
     * @param role
     */
    function toggleRole(role) {
      $ctrl.selectedRoles = _.sortBy(_.xor($ctrl.selectedRoles, [role]), 'name');
      $ctrl.allRoles = _.sortBy(_.xor($ctrl.allRoles, [role]), 'name');
      gameState.setProperty('roles', $ctrl.selectedRoles);
    }
  }
})();
