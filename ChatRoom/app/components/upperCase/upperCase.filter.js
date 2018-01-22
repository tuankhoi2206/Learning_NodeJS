(function () {
  'use strict';
  angular.module('songApp').filter('upperCase', upperCase);
  function upperCase() {
    return function (text) {
      return text.toUpperCase();
    }
  }
})();
