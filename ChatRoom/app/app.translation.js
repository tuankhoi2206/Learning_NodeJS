/**
 * Created by vtkhoi on 6/16/2017.
 */

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
      angular.bootstrap(document, ['chat.app']);
    });
  });
