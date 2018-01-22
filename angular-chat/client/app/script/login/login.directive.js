(function () {
  'use strict';
  angular.module('chat.app')
    .directive('LoginForm', LoginCtrl);

  function LoginCtrl() {
    return {
      restrict: 'AE',
      controller: 'LoginCtrl',
      templateUrl: 'script/login/login.template.html'
    };
  }
})();
