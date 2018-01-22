(function () {
  'use strict';

  var msCardConstant = {
    templateUrl: {
      msCardTemplate: 'components/msCard/template/msCard.template.html'
    }
  };

  angular.module('songApp')
    .constant('msCardConstant', msCardConstant);
})();
