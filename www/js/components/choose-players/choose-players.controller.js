(function() {
  angular
    .module('werewolf.choosePlayers')
    .controller('ChoosePlayersController', ChoosePlayersController);

  function ChoosePlayersController($timeout, gameState, localStorage) {
    var $ctrl = this;

    $ctrl.newPlayer = '';
    $ctrl.players = gameState.playerNames;

    $ctrl.addPlayer = addPlayer;
    $ctrl.togglePlayer = togglePlayer;

    /**
     * Add a new player
     * @param player
     */
    function addPlayer(player) {
      $ctrl.newPlayer = '';

      // if player hasn't already been added and isn't blank
      if (!_.includes($ctrl.players, player) && player !== '') {
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
      $ctrl.players = _.xor($ctrl.players, [player]).sort();
      localStorage.setArray('playerNames', $ctrl.players);
      gameState.setProperty('playerNames', $ctrl.players);
    }
  }
})();
