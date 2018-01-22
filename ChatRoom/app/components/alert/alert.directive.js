/**
 * Created by vtkhoi on 1/11/2018.
 */
(function () {
  'use strict';

  angular.module('songApp').directive('msCard', msCard);

  msCard.$inject = ['msCardConstant'];

  function msCard(msCardConstant) {
    return {
      restrict: 'AE',
      templateUrl: msCardConstant.templateUrl.msCardTemplate,
      require: '^ngModel',
      scope: {
        config: '='
      },
      controller: 'msCardCtrl',
      controllerAs: 'vm'
    };
  }
})();
