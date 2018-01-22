/**
 * Created by vtkhoi on 3/29/2017.
 */
(function () {
  'use strict';
  angular
    .module('songApp')
    .factory('PlaylistEditService', ['PlayListFactory', 'commonConstant', 'PlaylistEditInforTabService', 'PlaylistEditAddSongService',
      function (PlayListFactory, commonConstant, PlaylistEditInforTabService, PlaylistEditAddSongService) {

        var injectedVm;

        function decorate(vm) {
          injectedVm = vm;
          initService();
          PlaylistEditInforTabService.decorate(injectedVm);
          PlaylistEditAddSongService.decorate(injectedVm);
        }

        function initService() {
          injectedVm.editPlaylistView = {
            showInfoTab: true,
            function: {
              displayTab: displayTab
            }
          };
        }

        function displayTab(tagName) {
          if ('infor' === tagName) {
            injectedVm.cache.editPlaylistView.currentTab = commonConstant.SHOW_TAB.INFORMATION;
          }
          else if ('addsong' === tagName) {
            injectedVm.cache.editPlaylistView.currentTab = commonConstant.SHOW_TAB.ADDSONG;
          }
        }

        return {
          decorate: decorate
        };

      }]);
})();
