(function () {
  'use strict';

  angular.module('component.app').directive('alert', alert);

  alert.$inject = ['AlertConstant'];

  function alert(AlertConstant) {
    return {
      restrict: 'AE',
      scope: {
        id: '@',
        type: '=?',
        message: '=',
        showAlert: '=',
        showClose: '@',
        onClose: '&onClose'
      },
      templateUrl: '/app/components/alert/alert.template.html',
      link: linkFn,
    };

    function linkFn(scope, element, attrs) {

      scope.type = scope.type || AlertConstant.TYPE_ALERT.DANGER;
      scope.showAlert = scope.showAlert === undefined ? true : false;
      scope.showClose = scope.showClose || true;
      scope.id = scope.id || 'alertID';

      if (!attrs.hasOwnProperty('message')) {
        throw new Error('The \'type\' attribute is require.');
      }

      if (attrs.onClose && typeof attrs.onClose === "function") {
        throw new Error('The \'onClose\' must be function.');
      }

      var alertElement = element.find('#'.concat(scope.id));

      var alert_element = angular.element('#alertID');

      // alertElement.bind("click", "[data-hide-closest]", function (e) {
      //   e.preventDefault();
      //   var $this = element.find(this);
      //   $this.closest($this.attr("data-hide-closest")).hide();
      // });

      // var closeElement = element.find('#'.concat(scope.id));
      // closeElement.on('close.bs.alert', function (e) {
      //   e.preventDefault();
      //   closeElement.addClass('hidden');
      // });
    }
  }
})();
