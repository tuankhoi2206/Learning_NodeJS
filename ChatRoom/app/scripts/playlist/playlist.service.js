(function () {
  'use strict';
  angular.module('songApp')
    .factory('PlayListFactory', ['$http', 'commonConstant', function ($http, commonConstant) {

      var views = {
        table: {
          title: 'app.common.playlists',
          name: commonConstant.VIEW_MODE.SHOW,
          templateUrl: 'scripts/playlist/playlistTemplate.html'
        },
        add: {
          title: 'app.playlist.create-title',
          name: commonConstant.VIEW_MODE.ADD,
          templateUrl: 'scripts/playlist/addPlaylist.html'
        },
        edit: {
          title: 'app.playlist.edit-title',
          name: commonConstant.VIEW_MODE.EDIT,
          templateUrl: 'scripts/playlist/editPlaylist.html'
        }
      };

      var cache = {
        common: {
          playlistModel: {id: '', name: '', description: '', songs: []},
          isDisabledCreateOrApplyBtn: {status: true},// button model of create, apply button in create. edit playlist,
          isInputError: {status: false}
        },
        currentView: views.table,
        editPlaylistView: {
          currentPlaylist: {id: '', name: '', description: '', songs: []},// save playlist selected in playlist table view
          currentTab: commonConstant.SHOW_TAB.INFORMATION,
          addSongTab: {isDisabledApplyRevertBtn: {status: true}}// addsong Tab
        },
        showPlaylistView: {
          listCheckedChkBox: []
        }
      };

      function switchShowMode() {
        cache.currentView = views.table;
      }

      function switchAddMode() {
        cache.currentView = views.add;
        cache.common.isInputError.status = false;
        resetIsDisabledCreateOrApplyBtn();
        clearCachePlaylistModel();
      }

      function checkInputValue() {
        if (cache.common.playlistModel.name === '' ||
          angular.isUndefined(cache.common.playlistModel.name)) {
          cache.common.isInputError.status = true;
          cache.common.isDisabledCreateOrApplyBtn.status = true;
        } else {
          cache.common.isInputError.status = false;
          cache.common.isDisabledCreateOrApplyBtn.status = false;
        }

        if (cache.currentView.name === commonConstant.VIEW_MODE.EDIT) {
          if ((cache.common.playlistModel.name !== cache.editPlaylistView.currentPlaylist.name &&
            cache.common.playlistModel.name.length > 0) ||
            cache.common.playlistModel.description !== cache.editPlaylistView.currentPlaylist.description) {
            cache.common.isDisabledCreateOrApplyBtn.status = false;
          } else {
            cache.common.isDisabledCreateOrApplyBtn.status = true;
          }
        }
      }

      function clearCachePlaylistModel() {
        cache.common.playlistModel = {id: '', name: '', description: '', songs: []};
      }

      function clearCacheCurrentPlaylist() {
        cache.common.editPlaylistView.currentPlaylist = {id: '', name: '', description: '', songs: []};
      }

      function resetIsDisabledCreateOrApplyBtn() {
        cache.common.isDisabledCreateOrApplyBtn.status = true;
      }

      function formatRowTableData(data) {
        return {
          col1: data.id,
          col2: data.name,
          col3: data.description
        };
      }

      return {
        views: views,
        cache: cache,
        function: {
          formatRowTableData: formatRowTableData,
          switchShowMode: switchShowMode,
          switchAddMode: switchAddMode,
          checkInputValue: checkInputValue,
          clearCachePlaylistModel: clearCachePlaylistModel,
          clearCacheCurrentPlaylist: clearCacheCurrentPlaylist,
          resetIsDisabledCreateOrApplyBtn: resetIsDisabledCreateOrApplyBtn
        }
      };
    }]);
})();
