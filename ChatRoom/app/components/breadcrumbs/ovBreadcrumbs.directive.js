(function () {
  'use strict';

  angular.module('songApp').directive('ovBreadcrumbs', breadcrumbs);

  function breadcrumbs() {
    return {
      restrict: 'E',
      templateUrl: 'components/breadcrumbs/ovBreadcrumbsDirective.html',
      scope: {
        config: '='
      },
      controller: 'BreadCrumbsCtrl',
      controllerAs: 'vm',
      bindToController: true
    };
  };

})();
