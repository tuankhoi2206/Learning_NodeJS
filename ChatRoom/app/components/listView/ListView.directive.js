(function () {
  'use strict';
  angular.module('chat.app').directive('listView', ListView);

  function ListView() {

    return {
      restrict: 'E',
      templateUrl: '/app/components/listView/ListView.directive.html',
      scope: {
        listViewId: '@',
        config: '=?',
        items: '=',
        itemTemplate: '=',
        searchItem: '='
      },
      link: linkFn,
      controller: 'ListViewCtrl',
      controllerAs: 'vm',
      bindToController: true
    };

    function linkFn(scope, attrs) {
      attrs.itemTemplate = attrs.itemTemplate || 'app/components/listView/list-view-item/ListViewItem.html';
      scope.config = scope.config || {
        width: '100%',
        height: '100%'
      }
    }

    /* end linkFn */
  }
})();
