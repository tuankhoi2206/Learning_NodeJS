(function () {
  'use strict';
  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$state', '$http', '$localStorage', 'socket', 'commonConstant'];

  function ChatController($state, $http, $localStorage, socket, commonConstant) {

    var vm = this;

    function initCtrl() {
      vm.message = [];
      vm.text = '';
      vm.sendMsg = sendMsg;

      /* default join a room when user connect to page */
      joinChat();
      onNewUser();
    }

    initCtrl();

    /**
     * user join in a room chat
     * @returns {boolean}
     */
    function joinChat() {
      if ($localStorage.currentUser) {
        socket.emit(commonConstant.SOCKET_EVENT.USER_JOIN, $localStorage.currentUser);
      } else {
        return false;
      }
    }//end

    function onNewUser() {
      socket.on(commonConstant.SOCKET_EVENT.NEW_USER_JOIN, function (data) {
        console.log('new_user');
        console.log(data);
      });
    }//end
    
  }
})();
