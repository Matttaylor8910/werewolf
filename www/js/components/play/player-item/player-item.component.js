(function() {
  angular
    .module('werewolf.play.playerItem', [])
    .component('playerItem', {
      templateUrl: 'js/components/play/player-item/player-item.tpl.html',
      bindings: {
        player: '<'
      }
    });
})();
