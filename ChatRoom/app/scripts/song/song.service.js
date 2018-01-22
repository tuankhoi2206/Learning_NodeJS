/**
 * Created by vtkhoi on 2/21/2017.
 */
(function () {
  'use strict';
  angular.module('songApp')
    .factory('SongFactory', ['$http', 'commonConstant', function ($http, commonConstant) {

      var views = {
        table: {
          title: 'app.common.song',
          name: commonConstant.VIEW_MODE.SHOW,
          templateUrl: 'scripts/song/songTemplate.html'
        },
        add: {
          title: 'app.song.create-title',
          name: commonConstant.VIEW_MODE.ADD,
          templateUrl: 'scripts/song/addOrEditSongTemplate.html'
        },
        edit: {
          title: 'app.song.edit-title',
          name: commonConstant.VIEW_MODE.EDIT,
          templateUrl: 'scripts/song/addOrEditSongTemplate.html'
        }
      };

      var cache = {
        songModel: {id: '', title: '', artists: ''},
        currentSong: {id: '', title: '', artists: ''},
        isDisabledCreateOrApplyBtn: {status: true},
        showSongsView: {listCheckedChkBox: []},
        currentView: views.table
      };

      return {
        views: views,
        cache: cache
      };
    }]);
})();
