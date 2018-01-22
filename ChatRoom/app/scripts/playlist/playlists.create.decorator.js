(function () {
  'use strict';
  angular
    .module('songApp')
    .factory('PlaylistCreateService', ['PlayListFactory', 'SongFactory', 'CommonService', 'commonConstant',
      function (PlayListFactory, SongFactory, commonService, commonConstant) {

        var injectedVm;

        function decorate(vm) {
          injectedVm = vm;
          initService();
        }

        function initService() {

          injectedVm.addPlaylistView = {
            playlistModel: {id: '', name: '', description: ''},
            isDisabledCreateOrApplyBtn: injectedVm.cache.common.isDisabledCreateOrApplyBtn,
            function: {
              addPlaylist: addPlaylist,
              switchAddMode: PlayListFactory.function.switchAddMode,
              checkInputValue: PlayListFactory.function.checkInputValue,
              doCancel: doCancel
            }
          };
        }

        function addPlaylist() {
          commonService.postData(commonConstant.API.PLAYLIST, angular.copy(injectedVm.cache.common.playlistModel)).then(function () {
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
          PlayListFactory.function.switchShowMode();
        }

        return {
          decorate: decorate
        };
      }]);
})();
