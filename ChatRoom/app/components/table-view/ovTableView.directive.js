/**
 * Created by vtkhoi on 3/10/2017.
 */
(function () {
  'use strict';
  angular.module('songApp').directive('ovTableView', tableView);

  function tableView() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/table-view/ovTableViewDirectiveTest.html',
      scope: {
        configData: '=',
        configFunction: '='
      },
      link: linkFunc,
      controller: 'TableViewCtrl',
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc() {
      var tableViewBody = angular.element('.table-view-body');
      //fix after find by random id
      tableViewBody.bind('scroll', function (e) {
        /*
         * Case : if checkbox is enable
         */
        var firstDiv;
        firstDiv = angular.element('.rawTableView > div:first')[0];
        firstDiv.style.marginLeft = '-' + e.currentTarget.scrollLeft + 'px';
      });
    }
  }
})();
