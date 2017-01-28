(function() {
  angular
    .module('werewolf.choosePlayers')
    .controller('ChoosePlayersController', ChoosePlayersController);

  function ChoosePlayersController($timeout, gameState) {
    var $ctrl = this;

    $ctrl.newPlayer = '';
    $ctrl.gameState = gameState;

    $ctrl.addPlayer = addPlayer;
    $ctrl.togglePlayer = togglePlayer;

    /**
     * Add a new player
     * @param player
     */
    function addPlayer(player) {
      $ctrl.newPlayer = '';

      // if player hasn't already been added and isn't blank
      if (!_.includes(gameState.playerNames, player) && player !== '') {
        togglePlayer(player);
      }

      $timeout(function(){
        $('#new-player').focus();
      }, 0);
    }

    /**
     * Toggle having a player in the players array
     * @param player
     */
    function togglePlayer(player) {
      var players = _.xor(gameState.playerNames, [player]).sort();
      gameState.setProperty('playerNames', players);
    }
  }
})();
