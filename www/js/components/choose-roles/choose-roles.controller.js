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
      return _.sortBy(_.filter(constants.roles, 'active'), 'name');
    }

    /**
     * Add a role
     * @param role
     * @param index
     */
    function addRole(role, index) {
      // no more of that card to play
      if (role.max === 0) return;

      _.find($ctrl.allRoles, ['name', role.name]).max--;
      $ctrl.totalWeight += parseInt(role.weight);
      $ctrl.selectedRoles.unshift($ctrl.allRoles[index]);
      gameState.setProperty('roles', $ctrl.selectedRoles);
    }

    /**
     * Remove a role
     * @param role
     * @param index
     */
    function removeRole(role, index) {
      _.find($ctrl.allRoles, ['name', role.name]).max++;
      $ctrl.totalWeight -= parseInt(role.weight);
      $ctrl.selectedRoles.splice(index, 1);
      gameState.setProperty('roles', $ctrl.selectedRoles);
    }
  }
})();
