(function() {
  angular
    .module('werewolf.play.nighttime.bodyguard', [])
    .component('bodyguard', {
      templateUrl: 'js/components/play/nighttime/bodyguard/bodyguard.tpl.html',
      controller: BodyguardController,
      bindings: {
        thisRole    : '@',
        nextRole    : '@',
        currentRole : '<'
      }
    });

  function BodyguardController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.playersToSave = [];
    $ctrl.savedLast = undefined;

    $ctrl.save = save;
    $ctrl.isSaved = isSaved;
    $ctrl.next = next;

    $ctrl.$onChanges = function(changes) {
      if (changes.currentRole.currentValue === $ctrl.thisRole) {
        if (!gameState.isLiving('Bodyguard')) {
          gameState.transition($ctrl.nextRole);
        }
      }
    };

    function isSaved(player){
      return !!_.find($ctrl.playersToSave, ['name', player.name]);
    }

    function save(player) {
      $ctrl.playersToSave = _.xor($ctrl.playersToSave, [player]);
    }

    function next() {
      $ctrl.savedLast = $ctrl.playersToSave[0].name;
      $ctrl.playersToSave[0].shouldDie = false;
      $ctrl.playersToSave = [];
      gameState.transition($ctrl.nextRole);
    }
  }
})();
