(function () {
  'use strict';
  angular
    .module('songApp')
    .factory('PlaylistViewService', ['PlayListFactory', 'CommonService',
      'commonConstant', 'PlaylistCreateService', 'PlaylistEditService',
      function (PlayListFactory, commonService, commonConstant, PlaylistCreateService, PlaylistEditService) {

        var injectedVm;

        function decorate(vm) {
          injectedVm = vm;
          injectedVm.cache = PlayListFactory.cache;
          injectedVm.initViewPage = initViewPage;
        }

        function initViewPage() {
          initService();
          loadPlaylist();
        }

        function initService() {

          injectedVm.showPlaylistView = {
            playlists: [],
            searchText: {text: ''},// set the default search/filter
            isCheckedHeaderChkbox: {status: false},
            isDisabledDeleteBtn: {status: true},
            function: {
              isShowMode: isShowMode,
              switchAddMode: switchAddMode,
              removeByIndex: removeByIndex,
              deletePlayLists: deletePlayLists,
              loadPlaylist: loadPlaylist// user for create and edit reload playlist
            }
          };

          initConfigPlaylistTable();

        }

        function initConfigPlaylistTable() {
          injectedVm.configDataPlaylistTable = {
            items: [],
            titleColumns: [],
            rowData: [],
            isCheckedHeaderChkbox: injectedVm.showPlaylistView.isCheckedHeaderChkbox,
            disableCheckedAll: injectedVm.showPlaylistView.isDisabledDeleteBtn,
            listCheckedChkBox: injectedVm.cache.showPlaylistView.listCheckedChkBox,
            searchText: injectedVm.showPlaylistView.searchText,
            multipleSelect: true
          };

          injectedVm.configFuncPlaylistTable = {
            formatData: PlayListFactory.function.formatRowTableData,
            onDirectToEditPage: switchEditMode,
            onRemoveItemByIndex: removeByIndex
          };

          injectedVm.mainObject = injectedVm.configDataPlaylistTable;
          injectedVm.mainObject.titleColumns.push(
            {//Cols 1
              mapdata: 'id', colname: 'app.table.playlist.id', width: '50px'
            },
            {//Cols 2
              mapdata: 'name', colname: 'app.table.playlist.name', width: '280px'
            },
            {//Cols 3
              mapdata: 'description', colname: 'app.table.playlist.description', width: '270px'
            },
            {//Cols 3
              mapdata: '', colname: 'app.table.playlist.action', width: '200px'
            }
          );

          injectedVm.configDataPlaylistTable.rowData.push(
            {mapdata: 'id'},
            {mapdata: 'name'},
            {mapdata: 'description'},
            {mapdata: '', templateUrl: 'scripts/playlist/template/action-column.html'} // lỗi trong table view
            // {mapdata: '', templateUrl: ''}
          );
        }

        function switchAddMode() {
          PlayListFactory.function.switchAddMode();
          PlaylistCreateService.decorate(injectedVm);
        }

        function isShowMode() {
          return injectedVm.cache.currentView.name === commonConstant.VIEW_MODE.SHOW;
        }

        /*** SWITCH EDIT PAGE ***/
        function switchEditMode(selectedPlaylist) {

          injectedVm.cache.common.playlistModel = selectedPlaylist;
          injectedVm.cache.editPlaylistView.currentPlaylist = angular.copy(selectedPlaylist);
          injectedVm.cache.currentView = PlayListFactory.views.edit;
          injectedVm.cache.editPlaylistView.currentTab = commonConstant.SHOW_TAB.INFORMATION;
          injectedVm.cache.editPlaylistView.addSongTab.isDisabledApplyRevertBtn.status = true;
          injectedVm.cache.common.isDisabledCreateOrApplyBtn.status = true;
          PlaylistEditService.decorate(injectedVm);

        }

        function loadPlaylist() {
          commonService.getData(commonConstant.API.PLAYLIST).then(function (reponse) {
            injectedVm.showPlaylistView.playlists.length = 0;
            injectedVm.showPlaylistView.playlists.push(reponse.data);
            injectedVm.configDataPlaylistTable.items = reponse.data;// bo cho nay
            if (isShowMode()) {
              setCheckBoxsModelPlaylist();
            }
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
              injectedVm.loadingState = false;
            }
          );
        }

        /*** Dua vao Table-view ***/
        function setCheckBoxsModelPlaylist() {
          var listCheckBoxPlaylist = injectedVm.cache.showPlaylistView.listCheckedChkBox;
          if (listCheckBoxPlaylist.length > 0) {
            for (var index = injectedVm.showPlaylistView.playlists.length; index--;) {
              var playlist = injectedVm.showPlaylistView.playlists[index];
              if (listCheckBoxPlaylist.indexOf(playlist.id) > -1) {
                playlist.isChecked = true;
              }
            }// end for
            if (listCheckBoxPlaylist.length === injectedVm.showPlaylistView.playlists.length) {
              injectedVm.showPlaylistView.isCheckedHeaderChkbox.status = true;
            }
            injectedVm.showPlaylistView.isDisabledDeleteBtn.status = false;
          }
        }

        /******* delete ********/
        function removeByIndex(index) {
          var playlist = {id: [injectedVm.showPlaylistView.playlists[index]]};//fix
          commonService.deleteData(commonConstant.API.PLAYLIST, playlist).then(function () {
            loadPlaylist();//reload playlist table after delete element
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
            }
          );
        }

        function deletePlayLists() {
          if (injectedVm.showPlaylistView.isCheckedHeaderChkbox.status) {
            injectedVm.showPlaylistView.playlists.length = 0;
            injectedVm.showPlaylistView.isCheckedHeaderChkbox.status = false;
            injectedVm.showPlaylistView.isDisabledDeleteBtn.status = true;
          }
          else {
            if (injectedVm.cache.showPlaylistView.listCheckedChkBox.length === injectedVm.showPlaylistView.playlists.length) {
              injectedVm.showPlaylistView.isCheckedHeaderChkbox.status = false;
            }
            deletePlayListOf(injectedVm.cache.showPlaylistView.listCheckedChkBox);
            injectedVm.cache.showPlaylistView.listCheckedChkBox.length = 0;
            injectedVm.showPlaylistView.isDisabledDeleteBtn.status = true;
          }
        }

        function deletePlayListOf(lstSongId) {
          for (var index = lstSongId.length; index--;) {
            for (var indexSong = injectedVm.showPlaylistView.playlists.length; indexSong--;) {
              if (lstSongId[index] === injectedVm.showPlaylistView.playlists[indexSong].id) {
                injectedVm.showPlaylistView.playlists.splice(indexSong, 1);
              }
            }
          }
        }

        return {
          decorate: decorate
        };
      }]);
})();
