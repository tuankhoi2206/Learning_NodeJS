(function () {
  'use strict';
  angular.module('chat.app')
    .directive('login', LoginCtrl);

  function LoginCtrl() {
    return {
      restrict: 'AE',
      controller: 'LoginCtrl',
      templateUrl: 'app/scripts/login/login.directive.html',
      controllerAs: 'vm'
    };
  }

})();
