/**
 * Created by vtkhoi on 1/11/2018.
 */
(function () {
  'use strict';

  angular.module('chat.app').directive('zxpasswordMeter', zxpasswordMeter);

  zxpasswordMeter.$inject = [];

  function zxpasswordMeter() {
    return {
      restrict: 'AE',
      templateUrl: 'app/components/zxPasswordMeter/zxPasswordMeter.template.html',
      scope: {
        value: "=", /* current Score */
        colorBar: "=?", /* */
        maxScore: "@?"/* score of processBar */
      },
      link: function (scope) {
        var defaultScope = 100;
        scope.type = 'danger';
        scope.maxScore = scope.maxScore || defaultScope;

        scope.$watch('value', function (value) {
          var strenghPercent = value.score / scope.maxScore;
          if (strenghPercent === 0) {
            scope.textScore = 'Risky';
          } else if (strenghPercent <= 0.25) {
            scope.type = 'danger';
            scope.textScore = 'Weak';
          } else if (strenghPercent <= 0.50) {
            scope.type = 'warning';
            scope.textScore = 'Ok';
          } else if (strenghPercent <= 0.75) {
            scope.type = 'warning';
            scope.textScore = 'Good';
          } else {
            scope.type = 'success';
            scope.textScore = 'Strong';
          }
        });
      }
    };
  }
})();
