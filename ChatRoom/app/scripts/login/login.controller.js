(function () {
  'use strict';

  angular.module('chat.app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'AuthenticationService'];

  function LoginCtrl($scope, AuthenticationService) {

    var vm = this;

    initCtrl();

    function initCtrl() {

      vm.user = {
        username: '',
        password: ''
      };
      vm.msgAlert = '';
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
        vm.showAlert = true;
        vm.msgAlert = error.data.message;
      });
    }
  }
})();
