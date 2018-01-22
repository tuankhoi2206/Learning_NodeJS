(function () {
  'use strict';
  angular.module('songApp').directive('ngSparkline', sparkLine);

  function sparkLine() {
    return {
      restrict: 'A',
      require: '^ngModel',
      template: '<div><strong>Name:</strong>{{name}}</div>'
    };
  }
})();
