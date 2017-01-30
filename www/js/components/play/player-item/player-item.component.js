(function() {
  angular
    .module('werewolf.play.playerItem', [])
    .component('playerItem', {
      templateUrl: 'js/components/play/player-item/player-item.tpl.html',
      controller: PlayerItemController,
      bindings: {
        player  : '<',
        canLynch: '<'
      }
    });

  function PlayerItemController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;

    $ctrl.lynchPlayer = lynchPlayer;

    /**
     * Function to allow lynching players that can be lynched
     */
    function lynchPlayer() {
      if ($ctrl.canLynch) {
        gameState.lynchPlayer($ctrl.player);
      }
    }
  }
})();
