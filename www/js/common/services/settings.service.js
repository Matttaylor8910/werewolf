(function () {
  angular
    .module('werewolf')
    .factory('settings', settings);

  function settings(localStorage) {
    var service = {
      // default to using production when not on localhost
      chooseRolesGrid : setting('chooseRolesGrid', true),
      darkMode: setting('darkMode', true),

      setProperty     : setProperty
    };

    return service;

    /**
     * Set a property in the service and to localStorage
     * @param property
     * @param value
     */
    function setProperty(property, value)
    {
      service[property] = value;
      localStorage.setObject(property, value);
    }

    /**
     * Get the setting from localStorage or default to defaultValue
     * @param property
     * @param defaultValue
     * @returns {*}
     */
    function setting(property, defaultValue)
    {
      var setValue = localStorage.getObject(property);
      return _.isBoolean(setValue) ? setValue : defaultValue;
    }
  }
})();
