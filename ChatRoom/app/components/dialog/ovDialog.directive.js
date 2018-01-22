/**
 * Created by vtkhoi on 3/7/2017.
 */
angular.module('songApp').directive('ovDialog', function () {
  return {
    restrict: 'E',
    templateUrl: 'components/dialog/ovDialogDirective.html',
    scope: {
      idDialog: '@',
      titleDialog: '@',
      messageDialog: '@',
      titleLeftBtn: '@',
      titleRightBtn: '@',
      onLeftBtn: '=?',
      onRightBtn: '=?'
    },
    controller: 'DialogCtrl',
    controllerAs: 'vm',
    bindToController: true
  };
});
