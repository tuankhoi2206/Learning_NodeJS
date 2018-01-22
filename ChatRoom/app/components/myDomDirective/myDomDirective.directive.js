(function () {
  'use strict';
  angular.module('songApp').directive('myDomDirective', myDomDirective);

  function myDomDirective() {
    return {
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          element.html('You click me!');
        });

        element.bind('mouseenter', function () {
          element.css('background-color', 'blue');
        });

        element.bind('mouseleave', function () {
          element.css('background-color', 'gray');
        });
      }
    };
  }
})();
