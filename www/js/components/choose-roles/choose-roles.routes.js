(function() {
  angular
    .module('werewolf.chooseRoles')
    .config(chooseRolesConfig);

  function chooseRolesConfig($stateProvider) {
    $stateProvider
      .state('choose-roles', {
        url: '/choose-roles',
        templateUrl: 'js/components/choose-roles/choose-roles.tpl.html',
        controller: 'ChooseRolesController',
        controllerAs: '$ctrl'
      });
  }
})();
