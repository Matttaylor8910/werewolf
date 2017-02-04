(function() {
  angular
    .module('werewolf.start')
    .config(startConfig);

  function startConfig($stateProvider) {
    $stateProvider
      .state('start', {
        url: '/start',
        templateUrl: 'js/components/start/start.tpl.html',
        controller: 'StartController',
        controllerAs: '$ctrl'
      });
  }
})();
