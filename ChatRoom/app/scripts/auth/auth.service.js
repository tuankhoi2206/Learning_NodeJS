(function () {
  'use strict';

  angular.module('chat.app')
    .service('AuthenticationService', ['$http', '$q', 'commonConstant', AuthenticationService]);

  function AuthenticationService($http, $q, commonConstant) {

    var LOCAL_TOKEN_KEY = 'x-access-token';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }//-- loadUserCredentials

    /**
     * used to login again.
     */
    loadUserCredentials();

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
      // chưa hiểu chỗ này
      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    function Register(user) {
      // return $http.post(apiConstant.API.AUTH.REGISTER, user).;
    }

    /* check user */
    function Login(user) {
      return $q(function (resolve, reject) {
        $http({
          method: commonConstant.HTTP.METHOD.POST,
          url: commonConstant.API.AUTH.LOGIN,
          data: user,
          headers: commonConstant.HTTP.CONTENT_TYPE.JSON
        }).then(function (response) {
          var token = response && response.data.accessToken;
          if (token) {
            storeUserCredentials(token);
            resolve(response.status);
          } else {
            reject(response.status);
          }
        });
      });
    }

    function Logout() {
      destroyUserCredentials();
    }

    return {
      Login: Login,
      Logout: Logout,
      Register: Register,
      isAuthenticated: function () {
        return isAuthenticated;
      }
    };
  }
})();
