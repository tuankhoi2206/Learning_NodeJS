(function () {
  'use strict';
  angular.module('songApp').directive('item', item);

  function item() {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        scope.name = attrs.name;
      },
      template: '<div><strong>Name:</strong>{{name}}</div>'
    };
  }
})();
