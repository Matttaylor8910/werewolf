(function() {
  angular
    .module('werewolf')
    .filter('plusMinus', plusMinus);

  function plusMinus() {
    return function (number) {
      return (number < 0 ? '' : '+') + number;
    }
  }
})();
