(function () {
  'use strict';

  angular.module('chat.app')
    .controller('RoomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope'];

  function RoomCtrl($scope) {

    var vm = this;

    initCtrl();

    function initCtrl() {

    }


  }
})();
