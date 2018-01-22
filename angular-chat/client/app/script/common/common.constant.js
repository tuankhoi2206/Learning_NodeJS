angular.module('app.chat')
  .constant('commonConstant', {
    /** SOCKET EVENT **/
    SOCKET_EVENT: {
      USER_JOIN: 'user_join',
      NEW_USER_JOIN: 'new_user_join'
    },
    /*** API ***/
    API: {
      PLAYLIST: 'api/playlist',
      SONG: 'api/song'
    },
    LANG: {
      EN: 'en',
      VI: 'vi'
    }
  });
