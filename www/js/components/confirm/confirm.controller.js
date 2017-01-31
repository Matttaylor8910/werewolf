(function() {
  angular
    .module('werewolf.confirm')
    .controller('ConfirmController', ConfirmController);

  function ConfirmController($scope, $state, localStorage, gameState) {
    var $ctrl = this;

    $ctrl.noDeckMode = localStorage.getObject('noDeckMode');
    $ctrl.gameState = gameState;

    $ctrl.setRoles = setRoles;
    $ctrl.toggleNoDeckMode = toggleNoDeckMode;

    $scope.$on("$ionicView.beforeEnter", function(){
      $ctrl.playerString = gameState.playerNames.join(', ');
      $ctrl.roleString = _.map(gameState.roles, 'name').join(', ');
    });

    /**
     * Keep our setting for no deck mode saved to localStorage
     */
    function toggleNoDeckMode() {
      localStorage.setObject('noDeckMode', $ctrl.noDeckMode);
    }

    /**
     * Either set roles manually if you have a deck or
     * Assign roles randomly and show people their roles
     */
    function setRoles() {
      if ($ctrl.noDeckMode) {
        $state.go('random-roles');
      } else {
        $state.go('set-roles');
      }
    }
  }
})();
