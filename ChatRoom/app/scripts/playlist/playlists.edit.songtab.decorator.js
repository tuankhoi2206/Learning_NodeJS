(function () {
  'use strict';
  angular
    .module('songApp')
    .factory('PlaylistEditAddSongService', ['PlayListFactory', 'SongFactory', 'CommonService', 'commonConstant',
      function (PlayListFactory, SongFactory, commonService, commonConstant) {

        var injectedVm;

        function decorate(vm) {
          injectedVm = vm;
          initService();
          loadSongs();
        }

        function initService() {

          injectedVm.editPlaylistView.addSongTab = {
            songs: [],
            // checkbox in header table
            isCheckedHeaderChkbox: false,
            songsOfPlaylist: [],
            listCheckedChkBoxSong: [],//song table used for addSong Tab},
            function: {
              isSongTab: isSongTab,
              updatePlaylist: updatePlaylist,
              switchShowMode: PlayListFactory.function.switchShowMode,
              revertListSong: revertListSong,
              stageChangeSongHeaderCheckBox: stageChangeSongHeaderCheckBox,
              stageChangeSongCheckBox: stageChangeSongCheckBox,
              addSongOfPlaylist: addSongOfPlaylist,
              doCancel: doCancel
            }
          };
        }

        function isSongTab() {
          return injectedVm.cache.editPlaylistView.currentTab === commonConstant.SHOW_TAB.ADDSONG;
        }

        function doCancel() {
          PlayListFactory.function.switchShowMode();
        }

        /*** Used for Tab Song ***/
        function loadSongs() {
          commonService.getData(commonConstant.API.SONG).then(function (response) {
            injectedVm.editPlaylistView.addSongTab.songs = response.data;
            // injectedVm.configDataPlaylistTable.items = response.data;
            setCheckBoxsModel();
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
              injectedVm.common.loadingState = false;
            }
          );
        }

        function updatePlaylist() {
          commonService.putData(commonConstant.API.PLAYLIST, injectedVm.cache.common.playlistModel).then(function () {
            PlayListFactory.function.switchShowMode();
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
              injectedVm.common.loadingState = false;
            }
          );
        }

        // event change model for checkbox all
        function stageChangeSongHeaderCheckBox() {
          var songs = injectedVm.editPlaylistView.addSongTab.songs;
          if (songs.length > 0) {
            injectedVm.cache.editPlaylistView.addSongTab.isDisabledApplyRevertBtn.status = false;
            var listId = [];
            for (var i = songs.length; i--;) {
              songs[i].songChecked = injectedVm.editPlaylistView.addSongTab.isCheckedHeaderChkbox;
              listId.push(songs[i].id);
            }
            injectedVm.cache.editPlaylistView.currentPlaylist.songs.length = 0;//injectedVm.isCheckedHeaderChkbox is false
            if (injectedVm.editPlaylistView.addSongTab.isCheckedHeaderChkbox) {
              injectedVm.cache.editPlaylistView.currentPlaylist.songs = listId;
            }
            setCheckBoxsModel();
          }
          else {
            injectedVm.editPlaylistView.addSongTab.isCheckedHeaderChkbox = false;
          }
        }

        function stageChangeSongCheckBox(songId) {
          //1. add or remove song id of selectedPlaylist
          var currentPlaylist = injectedVm.cache.editPlaylistView.currentPlaylist;
          if (currentPlaylist.songs.indexOf(songId) > -1) {
            currentPlaylist.songs.splice(currentPlaylist.songs.indexOf(songId), 1);
          }
          else {
            currentPlaylist.songs.push(songId);
          }

          //2. case songs changed song equals currentPlaylist.songs
          //playlistModel.songs []
          //currentPlaylist.songs []
          if (angular.equals(injectedVm.cache.common.playlistModel.songs, currentPlaylist.songs)) {
            injectedVm.cache.editPlaylistView.addSongTab.isDisabledApplyRevertBtn.status = true;
          }
          else {
            injectedVm.cache.editPlaylistView.addSongTab.isDisabledApplyRevertBtn.status = false;
          }

          //3. is select all checkbox
          if (injectedVm.editPlaylistView.addSongTab.songs.length === injectedVm.cache.editPlaylistView.currentPlaylist.songs.length) {
            injectedVm.editPlaylistView.addSongTab.isCheckedHeaderChkbox = true;
          } else {
            injectedVm.editPlaylistView.addSongTab.isCheckedHeaderChkbox = false;
          }
        }

        /*
         *  event of Revert button
         *  Reset currentPlaylist.songs
         */
        function revertListSong() {
          injectedVm.editPlaylistView.addSongTab.isCheckedHeaderChkbox = false;
          resetCacheIsDisabledApplyRevertBtn();
          //reset value vm.cache.common.playlistModel.songs because when clicked will change songs value
          injectedVm.cache.editPlaylistView.currentPlaylist.songs = angular.copy(injectedVm.cache.common.playlistModel.songs);
          loadSongs();
        }

        function addSongOfPlaylist() {

          commonService.putData(commonConstant.API.PLAYLIST, angular.copy(injectedVm.cache.editPlaylistView.currentPlaylist)).then(function () {
            loadSongs();

            //aysn playlistModel and currentPlaylist after save
            injectedVm.cache.common.playlistModel = angular.copy(injectedVm.cache.editPlaylistView.currentPlaylist);
            if (injectedVm.editPlaylistView.addSongTab.songs.length !== injectedVm.cache.editPlaylistView.currentPlaylist.length) {
              injectedVm.isCheckedHeaderChkbox = false;
            }
            resetCacheIsDisabledApplyRevertBtn();
            // vm.switchShowMode();
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
              injectedVm.common.loadingState = false;
            }
          );
        }

        function resetCacheIsDisabledApplyRevertBtn() {
          injectedVm.cache.editPlaylistView.addSongTab.isDisabledApplyRevertBtn.status = true;
        }

        function setCheckBoxsModel() {

          var editPlayListView = injectedVm.editPlaylistView.addSongTab;
          for (var i = editPlayListView.songs.length; i--;) {
            var ssong = editPlayListView.songs[i];
            ssong.isChecked = false;
          }

          if (_.get(injectedVm, 'cache.editPlaylistView.currentPlaylist.songs.length') > 0) {

            var cacheSongs = injectedVm.cache.editPlaylistView.currentPlaylist.songs;

            for (var index = editPlayListView.songs.length; index--;) {
              var song = editPlayListView.songs[index];
              song.isChecked = cacheSongs.indexOf(song.id) > -1;
            }

            if (editPlayListView.songs.length === cacheSongs.length) {
              editPlayListView.isCheckedHeaderChkbox = true;
            }
            else {
              editPlayListView.isCheckedHeaderChkbox = false;
            }
          }
        }

        return {
          decorate: decorate
        };

      }]);
})();
