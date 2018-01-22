(function () {
  'use strict';
  angular.module('songApp')
    .controller('BreadCrumbsCtrl', ['$scope',
      function () {
        var vm = this;

        var defaultConfig = {
          titles: ['a', 'b'] // required
        };

        vm.titles = vm.config.titles || defaultConfig.titles;
      }]);
})();
