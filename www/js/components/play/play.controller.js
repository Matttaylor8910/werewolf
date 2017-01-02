(function() {
  angular
    .module('werewolf.play')
    .controller('PlayController', PlayController);

  function PlayController(gameState) {
    var $ctrl = this;
    
    $ctrl.gameState = gameState;
  }
})();
