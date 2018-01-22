(function () {
  'use strict';
  angular.module('chat.app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope'];
  function LoginCtrl($scope) {

    var vm = this;

    initCtrl();
    function initCtrl() {

    }
  }
})();
