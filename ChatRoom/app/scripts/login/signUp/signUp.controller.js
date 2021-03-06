(function () {
  'use strict';

  angular.module('chat.app')
    .controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['$scope'];

  function SignUpCtrl($scope) {

    var vm = this;

    initCtrl();

    function initCtrl() {

      vm.user = {
        username: '',
        password: '',
        passwordStrength: {}
      };

      vm.showSpinner = false;
      vm.showAlert = false;
      /* funcs*/
      vm.doLogin = doLogin;
    }

    function doLogin() {
      vm.showSpinner = true;
      AuthenticationService.Login(vm.user).then(function (response) {
        window.location.reload();
        // vm.showSpinner = false;
      }, function (error) {
        vm.showSpinner = false;
      });
    }
  }
})();
