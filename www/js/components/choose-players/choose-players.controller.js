(function() {
  angular
    .module('werewolf.choosePlayers')
    .controller('ChoosePlayersController', ChoosePlayersController);

  function ChoosePlayersController($timeout, gameState) {
    var $ctrl = this;

    $ctrl.newPlayer = '';
    $ctrl.editMode = false;
    $ctrl.gameState = gameState;

    $ctrl.addPlayer = addPlayer;
    $ctrl.isSelected = isSelected;
    $ctrl.togglePlayer = togglePlayer;
    $ctrl.toggleEditMode = toggleEditMode;
    $ctrl.toggleSelected = toggleSelected;

    /**
     * Add a new player
     * @param player
     */
    function addPlayer(player) {
      $ctrl.newPlayer = '';

      // if player hasn't already been added and isn't blank
      if (!_.includes(gameState.allPlayerNames, player) && player !== '') {
        togglePlayer(player);
      }

      $timeout(function(){
        $('#new-player').focus();
      }, 0);
    }

    /**
     * Find out if a player is selected
     * @param player
     */
    function isSelected(player) {
      return _.includes(gameState.playerNames, player);
    }

    /**
     * Toggle having a player in the players array
     * @param player
     */
    function toggleSelected(player) {
      gameState.setProperty('playerNames', _.xor(gameState.playerNames, [player]));
    }

    /**
     * Toggle player being listed
     * @param player
     */
    function togglePlayer(player){
      gameState.setProperty('allPlayerNames', _.xor(gameState.allPlayerNames, [player]).sort());
      gameState.setProperty('playerNames', _.reject(gameState.playerNames, function(o) { return o === player}));
    }

    /**
     * Toggle edit mode
     */
    function toggleEditMode() {
      $ctrl.editMode = !$ctrl.editMode;
    }
  }
})();
