(function() {
  angular
    .module('werewolf.setRoles')
    .config(setRolesConfig);

  function setRolesConfig($stateProvider) {
    $stateProvider
      .state('set-roles', {
        url: '/set-roles',
        templateUrl: 'js/components/set-roles/set-roles.tpl.html',
        controller: 'SetRolesController',
        controllerAs: '$ctrl'
      });
  }
})();
