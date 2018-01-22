(function () {
  'use strict';
  window.i18next
    .use(window.i18nextXHRBackend)
    .init({
      // debug: true,
      lng: 'en', // If not given, i18n will detect the browser language.
      fallbackLng: 'vi', // Default is dev
      ns: 'translation',
      backend: {
        loadPath: '../locales/{{lng}}/{{ns}}.json'
      },
      useCookie: false,
      useLocalStorage: false
    }, function () {
      angular.element(function () {
        angular.bootstrap(document, ['chap.app']);
      });
    });

  angular
    .module('chap.app')
    .config(['$i18nextProvider', '$routeProvider', function ($i18nextProvider, $routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'client/app/script/login/login.template.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        })//song
        // .when('/room', {
        //   templateUrl: 'scripts/song/songs.html',
        //   controller: 'SongCtrl',
        //   controllerAs: 'vm'
        // })
        .otherwise({
          redirectTo: '/login'
        });
    }]);
})();
