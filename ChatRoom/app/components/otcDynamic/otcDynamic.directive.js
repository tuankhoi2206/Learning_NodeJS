(function () {
  'use strict';
  angular.module('songApp').directive('otcDynamic', otcDynamic);

  function otcDynamic($compile) {

    var template = "<button ng-click='doSomething()'>K test</button>";

    return {

      link: function(scope, element){
        element.html("<button ng-click='doSomething()'>{{label}}</button>");
      }

      // link: function (scope, element) {
      //   element.on("click", function () {
      //     scope.$apply(function () {
      //       var content = $compile(template)(scope);
      //       element.append(content);
      //     })
      //   });
      // }
    }
    /* end return */
  }
})();
