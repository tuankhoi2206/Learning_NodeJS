(function () {
  'use strict';
  angular.module('songApp')
    .controller('BookCtrl', ['$scope',
      function () {
        var vm = this;
        vm.titles = vm.config.titles || defaultConfig.titles;
      }]);
})();
