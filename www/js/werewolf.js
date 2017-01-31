(function() {
  angular
    .module('werewolf', [
      'ionic',
      'ionic.utils',

      'werewolf.choosePlayers',
      'werewolf.chooseRoles',
      'werewolf.confirm',
      'werewolf.randomRoles',
      'werewolf.setRoles',
      'werewolf.play',
      'werewolf.unsupportedRole'
    ])
    .config(config)
    .run(run);

  /**
   * Default to choosing players
   * @param $urlRouterProvider
   */
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/choose-players');
  }

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();
