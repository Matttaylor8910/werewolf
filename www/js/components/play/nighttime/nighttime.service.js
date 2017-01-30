(function() {
  angular
    .module('werewolf.play.nighttime')
    .factory('nightState', werewolfService);

  function werewolfService() {
    var service = {
      realWolves    : ['Werewolf', 'Wolf Cub', 'Wolf Man', 'Fruit Brute', 'Dire Wolf', 'Big Bad Wolf', 'Lone Wolf'],
      lookLikeWolves: ['Werewolf', 'Wolf Cub', 'Lycan', 'Fruit Brute', 'Dire Wolf', 'Big Bad Wolf', 'Lone Wolf'],
      thisRoundKills: 0,
      diseased      : false,
      last          : {},
      once          : {},

      setProperty   : setProperty,
      setLast       : setLast,
      clear         : clear
    };

    return service;

    /**
     * Set the number of kills to be used in the night
     * @param property
     * @param value
     */
    function setProperty(property, value) {
      service[property] = value;
    }

    /**
     * Set the last name for a property
     * @param property
     * @param name
     */
    function setLast(property, name) {
      service.last[property] = name;
    }

    /**
     * Clear out the night game state
     */
    function clear() {
      service.thisRoundKills = 0;
      service.diseased = false;
      service.last = {};
      service.once = {};
    }
  }
})();
