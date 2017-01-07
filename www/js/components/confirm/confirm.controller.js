(function() {
  angular
    .module('werewolf.confirm')
    .controller('ConfirmController', ConfirmController);

  function ConfirmController($scope ,gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $scope.$on("$ionicView.beforeEnter", function(){
      $ctrl.playerString = gameState.playerNames.join(', ');
      $ctrl.roleString = _.map(gameState.roles, 'name').join(', ');
    });
  }
})();
