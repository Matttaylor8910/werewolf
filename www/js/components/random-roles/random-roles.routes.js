(function() {
  angular
    .module('werewolf.randomRoles')
    .config(randomRolesConfig);

  function randomRolesConfig($stateProvider) {
    $stateProvider
      .state('random-roles', {
        url: '/random-roles',
        templateUrl: 'js/components/random-roles/random-roles.tpl.html',
        controller: 'RandomRolesController',
        controllerAs: '$ctrl'
      });
  }
})();
