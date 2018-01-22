/**
 * Created by vtkhoi on 3/3/2017.
 */
(function () {
  'use strict';
  angular.module('songApp')
    .controller('TableViewCtrl', TableViewCtrl);

  TableViewCtrl.$inject = [];

  function TableViewCtrl() {

    var vm = this;
    vm.sortType = 'col1'; // set the default sort type
    vm.sortReverse = false;  // set the default sort order
    vm.elementFormat = {};
    vm.configData.isCheckedHeaderChkbox.status = false;
    vm.configData.disableCheckedAll.status = true; //set is enable allDelete Button

    vm.setElementFormat = function (data) {
      vm.elementFormat.col1 = data.col1;//id
      vm.elementFormat.col2 = data.col2;//title
      vm.elementFormat.col3 = data.col3;//artists
    };

    vm.hasData = function () {
      return vm.configData.items.length > 0;
    };

    vm.defaultConfigData = {
      templateUrl: 'components/table-view/default-config/col1Template.html'
    };

    vm.getTemplateUrl = function (column) {
      if (!angular.isDefined(column.templateUrl) || column.templateUrl === '') {
        column.templateUrl = vm.defaultConfigData.templateUrl;
      }
      return column.templateUrl;
    };

    vm.getColumnIndex = function (mapdata, column) {

      for (var index = 0; index < column.length; index++) {
        if (column[index] === mapdata) {
          return index;
        }
      }
    };

    vm.stageChangeHeaderCheckbox = function () {

      if (vm.configData.items.length > 0) {

        var listId = [];
        for (var i = 0; i < vm.configData.items.length; i++) {
          vm.configData.items[i].isChecked = vm.configData.isCheckedHeaderChkbox.status;
          listId.push(vm.configData.items[i].id);// false
        }

        vm.configData.listCheckedChkBox.length = 0;// save list item checked.
        if (vm.configData.isCheckedHeaderChkbox.status) {
          //must be improve(
          for (var index = 0; index < listId.length; index++) {
            vm.configData.listCheckedChkBox.push(listId[index]);
          }
        }

      }
      else {
        vm.configData.isCheckedHeaderChkbox.status = false;
      }
      // enable AllDeleteBtn
      vm.configData.disableCheckedAll.status = !vm.configData.isCheckedHeaderChkbox.status;
    };

    vm.stageChangeChkBox = function stageChangeChkBox(songId) {
      /* exist songId*/
      if (vm.configData.listCheckedChkBox.indexOf(songId) > -1) {
        vm.configData.listCheckedChkBox.splice(vm.configData.listCheckedChkBox.indexOf(songId), 1);
      }
      else {
        vm.configData.listCheckedChkBox.push(songId);
      }
      /* display checkbox and AllDelete Button */
      if (vm.configData.listCheckedChkBox.length === 0) {
        vm.configData.disableCheckedAll.status = true;
      }
      else {
        vm.configData.disableCheckedAll.status = false;
      }
      //is check all checkbox
      if (vm.configData.listCheckedChkBox.length === vm.configData.items.length) {
        vm.configData.isCheckedHeaderChkbox.status = true;
      } else {
        vm.configData.isCheckedHeaderChkbox.status = false;
      }
    };
    //used for Remove Button
    vm.indexSelectedItem = 0;
    vm.saveIndex = function (index) {
      vm.indexSelectedItem = index;
    };
  }
})();
