(function () {
  'use strict';

  angular.module('chat.app')
    .controller('RoomCtrl', RoomCtrl);

  RoomCtrl.$inject = ['$scope'];

  function RoomCtrl(scope) {

    var vm = this;

    initCtrl();

    function initCtrl() {

      vm.data = {
        config: {
          itemTemplate: 'app/scripts/room/list-view-item/custItem.html'
        },
        group: initGroupChatData()
      }

    }

    /* end initCtrl */

    function initGroupChatData() {
      return [
        {
          title: "Group Chat 1"
        },
        {
          title: "Group Chat 2"
        },
        {
          title: "Group Chat 3"
        },
        {
          title: "Group Chat 4"
        },
        {
          title: "Group Chat 5"
        },
        {
          title: "Group Chat 6"
        },
        {
          title: "Group Chat 7"
        },
        {
          title: "Group Chat 8"
        }
      ];
    }
  }
})();
