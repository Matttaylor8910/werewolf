(function() {
  angular
    .module('werewolf.play.nighttime.cupid', [])
    .component('cupid', {
      templateUrl: 'js/components/play/nighttime/cupid/cupid.tpl.html',
      controller: CupidController,
      bindings: {
        nextRole  : '@'
      }
    });

  function CupidController(gameState) {
    var $ctrl = this;

    $ctrl.gameState = gameState;
    $ctrl.allDone = false;
    $ctrl.arrows = 2;

    $ctrl.shootArrow = shootArrow;
    $ctrl.next = next;

    function shootArrow(player) {
      player.inLove = !player.inLove;
      player.inLove? $ctrl.arrows-- : $ctrl.arrows++;
    }

    function next() {
      $ctrl.allDone = true;
      gameState.transition($ctrl.nextRole);
    }
  }
})();
