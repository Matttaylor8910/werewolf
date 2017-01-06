(function() {
  angular
    .module('werewolf.unsupportedRole', [])
    .component('unsupportedRole', {
      templateUrl: 'js/common/components/unsupported-role/unsupported-role.tpl.html',
      bindings: {
        role: '<'
      }
    });
})();
