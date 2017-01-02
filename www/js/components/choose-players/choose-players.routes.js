(function() {
  angular
    .module('werewolf.choosePlayers')
    .config(choosePlayersConfig);

  function choosePlayersConfig($stateProvider) {
    $stateProvider
      .state('choose-players', {
        url: '/choose-players',
        templateUrl: 'js/components/choose-players/choose-players.tpl.html',
        controller: 'ChoosePlayersController',
        controllerAs: '$ctrl'
      });
  }
})();
