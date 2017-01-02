(function() {
  angular
    .module('werewolf.confirm')
    .config(confirmConfig);

  function confirmConfig($stateProvider) {
    $stateProvider
      .state('confirm', {
        url: '/confirm',
        templateUrl: 'js/components/confirm/confirm.tpl.html',
        controller: 'ConfirmController',
        controllerAs: '$ctrl'
      });
  }
})();
