(function() {
  angular
    .module('werewolf.play')
    .config(playConfig);

  function playConfig($stateProvider) {
    $stateProvider
      .state('play', {
        url: '/play',
        templateUrl: 'js/components/play/play.tpl.html',
        controller: 'ChooseRolesController',
        controllerAs: '$ctrl'
      });
  }
})();
