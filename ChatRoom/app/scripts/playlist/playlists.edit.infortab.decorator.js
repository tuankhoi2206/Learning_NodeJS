(function () {
  'use strict';
  angular
    .module('songApp')
    .factory('PlaylistEditInforTabService', ['PlayListFactory', 'CommonService', 'commonConstant',
      function (PlayListFactory, commonService, commonConstant) {

        var injectedVm;

        function decorate(vm) {
          injectedVm = vm;
          initService();
        }

        function initService() {

          injectedVm.editPlaylistView.inforTab = {
            playlistModel: {id: '', name: '', description: ''},
            isDisabledApplyBtn: injectedVm.cache.common.isDisabledCreateOrApplyBtn,
            function: {
              updatePlaylist: updatePlaylist,
              switchShowMode: PlayListFactory.function.switchShowMode,
              checkInputValue: PlayListFactory.function.checkInputValue,
              isInforTab: isInforTab,
              doCancel: doCancel
            }
          };
        }

        function isInforTab() {
          return injectedVm.cache.editPlaylistView.currentTab === commonConstant.SHOW_TAB.INFORMATION;
        }

        function updatePlaylist() {
          commonService.putData(commonConstant.API.PLAYLIST, injectedVm.cache.common.playlistModel).then(function () {
            PlayListFactory.function.switchShowMode();
            injectedVm.showPlaylistView.function.loadPlaylist();//load data playlist Table
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
              injectedVm.common.loadingState = false;
            }
          );
        }

        function doCancel() {
          injectedVm.common.isInputError = false;// de day hay de ben switch
          PlayListFactory.function.switchShowMode();
        }

        return {
          decorate: decorate
        };
      }]);
})();
