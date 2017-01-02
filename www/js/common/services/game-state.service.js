(function() {
  angular
    .module('werewolf')
    .factory('gameState', gameState);

  function gameState($state, $ionicHistory, localStorage) {
    var service = {
      playerNames : localStorage.getArray('playerNames'),
      roles       : [],

      setProperty : setProperty
    };

    // if the application doesn't have an equal number of players to roles,
    // we need to go back to the choose players state, mostly for localhost
    if (service.playerNames.length !== service.roles.length &&
      $state.current.name !== 'choose-players') {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('choose-players');
    }

    return service;

    /**
     * Singular function to set a property on this service
     * @param property
     * @param value
     */
    function setProperty(property, value) {
      service[property] = value;
    }
  }
})();
