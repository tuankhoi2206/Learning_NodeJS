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
      controllerAs: 'vm',
      link: function ($scope, $element, ngModel) {

        initResizeParentTag();

        function initResizeParentTag() {
          // var parentMsCard = angular.element($element.parent());
          // console.log('parentMsCard', parentMsCard);
          $element.bind('onresize', ktest);
        }

        function ktest() {
          console.log('resize', 'aaaaaaaaaaaaaa');
        }

        // resizeWidthCard();

        /**
         * calculated width Card when tag parent change size.
         */
        function resizeWidthCard() {
          var parentMsCard = $($element.parent());
          /* http://api.jquery.com/outerwidth */
          var widthParentMsCard = parentMsCard.outerWidth();
          if (widthParentMsCard) {

          }
        }

        $scope.$watch(function () {
          var parentElement = $($element.parent()) || {};
          console.log('parentElement', parentElement);
          if (angular.isFunction(parentElement.outerWidth)) {
            return parentElement.outerWidth();
          }
        }, function (newValue, oldValue) {
          console.log(($($element.parent())).outerWidth());
        });
      }
    };
  }
})();
