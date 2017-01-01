(function() {
  angular
    .module('werewolf.choosePlayers')
    .config(choosePlayersConfig);

  choosePlayersConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function choosePlayersConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('choose-players', {
        url: '/choose-players',
        templateUrl: 'js/components/choose-players/choose-players.tpl.html',
        controller: 'ChoosePlayersController'
      });

    // If no other routes are matched always default to fruit-list
    $urlRouterProvider.otherwise('/choose-players');
  }
})();
