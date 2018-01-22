(function () {
  'use strict';
  angular.module('songApp')
    .controller('PlaylistCtrl', ['PlayListFactory',
      'PlaylistViewService', 'PlaylistCreateService', 'PlaylistEditService', 'commonConstant',
      function (PlayListFactory, PlaylistViewService, PlaylistCreateService, PlaylistEditService, commonConstant) {

        var vm = this;
        vm.cache = PlayListFactory.cache;

        function init() {
          vm.common = {
            configBreadcrumb: {titles: ['app.common.home', 'app.common.playlists']}//title Breadcrumb
          };
          //decorate necessary functions from PlaylistViewService
          PlaylistViewService.decorate(vm);
          PlaylistCreateService.decorate(vm);
          PlaylistEditService.decorate(vm);

        }

        init();
        // get all playlists

        // $scope.$watch(vm.cache.currentView.name, function(newV, oldV){
          //do something
        // });

        if (vm.cache.currentView.name === commonConstant.VIEW_MODE.SHOW) {
          vm.initViewPage();
        } if (vm.cache.currentView.name === commonConstant.VIEW_MODE.ADD) {
          // vm.showPlaylistView.function.loadPlaylist();
        } else {
          // vm.showPlaylistView.function.loadPlaylist();
        }
     }])
  ;
})();
