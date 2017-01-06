(function() {
  angular
    .module('werewolf.unsupportedRole', [])
    .component('unsupportedRole', {
      templateUrl: 'js/components/choose-roles/unsupported-role/unsupported-role.tpl.html',
      bindings: {
        role: '<'
      }
    });
})();
