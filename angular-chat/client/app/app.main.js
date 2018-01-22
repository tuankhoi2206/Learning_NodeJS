(function () {
  'use strict';
  angular.module('chat.app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$i18next', '$location', '$scope'];

  function MainCtrl(i18next, $location, $scope) {
    var vm = this;

  }
})();
