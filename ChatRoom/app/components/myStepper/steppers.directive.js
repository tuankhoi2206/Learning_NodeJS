(function () {
  'use strict';
  angular.module('songApp').directive('myStepper', myStepper);

  function myStepper() {
    return {
      restrict: 'EA',
      scope: {
        config: '='
      },
      templateUrl: 'components/myStepper/template/steppers.template.html',
      controller: 'SteppersCtrl',
      controllerAs: 'vm',
      bindToController: true
    } //end return
  }
})();
