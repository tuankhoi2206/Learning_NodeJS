(function () {
  'use strict';
  angular.module('chat.app')
    .directive('loginForm', LoginCtrl);

  function LoginCtrl() {
    return {
      restrict: 'AE',
      controller: 'RoomCtrl',
      templateUrl: 'app/scripts/login/login.directive.html',
      controllerAs: 'vm'
    };
  }

})();
