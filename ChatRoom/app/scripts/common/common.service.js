/**
 * Created by vtkhoi on 3/16/2017.
 */
(function () {
  'use strict';
  angular.module('songApp')
    .factory('CommonService', ['$http', 'commonConstant',
      function ($http, commonConstant) {
        /**
         *
         * @param url
         * @returns {HttpPromise}
         */
        function getData(url) {
          return $http.get(url);
        }

        /*** add ***/
        function postData(url, clientData) {
          return $http({
            method: commonConstant.HTTP_METHOD.POST,
            url: url,
            data: clientData,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            function successCallback(response) {
              return response;
            }, function errorCallback(response) {
              return response;
            });
        }// end

        /*** update ***/
        function putData(url, clientData) {
          return $http({
            method: commonConstant.HTTP_METHOD.PUT,
            url: url,
            data: clientData,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }// end

        /*** request: [1, 2] ***/
        function deleteData(url, clientData) {
          return $http({
            method: commonConstant.HTTP_METHOD.DELETE,
            url: url,
            data: clientData,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            function successCallback(response) {
              return response;
            }, function errorCallback(response) {
              return response;
            });
        }// end delete

        return {
          getData: getData,
          postData: postData,
          putData: putData,
          deleteData: deleteData
        };
      }
    ])
  ;
})();
