angular.module('chat.app')
  .constant('commonConstant', {
    HTTP: {
      METHOD: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
      },
      CONTENT_TYPE: {
        JSON: {
          'Content-Type': 'application/json'
        }
      }
    },
    /*** API ***/
    API: {
      AUTH: {
        REGISTER: 'api/users/register',
        LOGIN: 'api/users/authenticate',
        PROFILE: 'api/users/profile'
      }
    },
    LANG: {
      EN: 'en',
      VI: 'vi'
    }
  });
