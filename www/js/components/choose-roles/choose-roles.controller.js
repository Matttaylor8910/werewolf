(function() {
  angular
    .module('werewolf.chooseRoles')
    .controller('ChooseRolesController', ChooseRolesController);

  function ChooseRolesController($scope, constants, gameState, settings) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $ctrl.addRole = addRole;
    $ctrl.removeRole = removeRole;
    $ctrl.toggleView = toggleView;

    $scope.$on("$ionicView.beforeEnter", function(){
      $ctrl.allRoles = allRoles();
      $ctrl.selectedRoles = gameState.roles;
      $ctrl.totalWeight = 0;
      $ctrl.grid = settings.chooseRolesGrid;
    });

    /**
     * Get all selectable roles
     * @returns {*}
     */
    function allRoles() {
      return _.cloneDeep(_.sortBy(constants.roles, 'name'));
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

    /**
     * Toggle between grid vies and horizontal view
     */
    function toggleView() {
      $ctrl.grid = !$ctrl.grid;
      settings.setProperty('chooseRolesGrid', $ctrl.grid);
    }
  }
})();
