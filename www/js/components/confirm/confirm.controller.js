(function() {
  angular
    .module('werewolf.confirm')
    .controller('ConfirmController', ConfirmController);

  function ConfirmController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.playerString = gameState.playerNames.join(', ');
    $ctrl.roleString = _.map(gameState.roles, 'name').join(', ');
  }
})();
