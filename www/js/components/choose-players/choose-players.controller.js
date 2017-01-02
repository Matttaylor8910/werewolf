(function() {
  angular
    .module('werewolf.choosePlayers')
    .controller('ChoosePlayersController', ChoosePlayersController);

  function ChoosePlayersController($state, gameState, localStorage) {
    var $ctrl = this;

    $ctrl.newPlayer = '';
    $ctrl.players = gameState.players;

    $ctrl.addPlayer = addPlayer;
    $ctrl.togglePlayer = togglePlayer;
    $ctrl.next = next;

    /**
     * Add a new player
     * @param player
     */
    function addPlayer(player) {
      $ctrl.newPlayer = '';
      $('#new-player').focus();

      // if player hasn't already been added and isn't blank
      if (!_.includes($ctrl.players, player) && player !== '') {
        togglePlayer(player);
      }
    }

    /**
     * Toggle having a player in the players array
     * @param player
     */
    function togglePlayer(player) {
      $ctrl.players = _.xor($ctrl.players, [player]).sort();
      localStorage.setArray('playerNames', $ctrl.players);
    }

    /**
     * Set the players to game state and move to choose roles
     */
    function next() {
      gameState.setProperty('players', $ctrl.players);
      $state.go('choose-roles');
    }
  }
})();
