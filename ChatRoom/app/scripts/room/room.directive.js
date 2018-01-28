(function () {
  'use strict';
  angular.module('chat.app')
    .directive('room', roomDirective);

  function roomDirective() {
    return {
      restrict: 'AE',
      controller: 'RoomCtrl',
      templateUrl: '/app/scripts/room/room.directive.html',
      controllerAs: 'vm'
    };
  }

})();
