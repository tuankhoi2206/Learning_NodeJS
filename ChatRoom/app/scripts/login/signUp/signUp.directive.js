(function () {
  'use strict';
  angular.module('chat.app')
    .directive('signUp', SignUpCtrl);

  function SignUpCtrl() {
    return {
      restrict: 'AE',
      controller: 'LoginCtrl',
      templateUrl: 'app/scripts/login/signUp/signUp.directive.html',
      controllerAs: 'vm'
    };
  }

})();
