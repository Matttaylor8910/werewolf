(function() {
  angular
    .module('werewolf.play.nighttime')
    .factory('werewolfService', werewolfService);

  function werewolfService() {
    var service = {
      realWolves    : ['Werewolf', 'Wolf Cub', 'Wolf Man', 'Fruit Brute', 'Dire Wolf', 'Big Bad Wolf', 'Lone Wolf'],
      lookLikeWolves: [],
      thisRoundKills: 0,

      setKills      : setKills
    };

    return service;

    /**
     * Set the number of kills to be used in the night
     * @param numKills
     */
    function setKills(numKills) {
      service.thisRoundKills = numKills;
    }
  }
})();
