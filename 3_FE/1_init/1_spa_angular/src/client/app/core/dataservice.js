/**
 * @fileOverview dataservice
 * @desc
 * @author bian17888 17/1/13 16:47
 */
(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];

  /* @ngInject */
  function dataservice($http, $location, $q, exception, logger) {

    var isPrimed = false;
    var primePromise;

    var service = {
      ready: ready,
      getAvengers: getAvengers,
      getFilms: getFilms
    };

    return service;

    ////////////////

    /**
     * @func _commonAjax
     * @desc 通用方法
     */
    function _commonAjax(config) {
      var _config = {
        method: config.method || 'GET',
        url: config.url || '/',
        params: config.params || {},
        data: config.data || {}
      };
      var errInfo = 'XHR Failed for api ' + config.url;

      return $http(_config)
        .then(commonAjaxComplete)
        .catch(function(message) {
          exception.catcher(errInfo)(message);
        });

      function commonAjaxComplete(data) {
        // data.data = { code : 0, data : data }
        return data.data;
      }
    }

    function _prime() {
      // This function can only be called once.
      if (isPrimed) {
        return primePromise;
      }
      primePromise = $q.when(true).then(success);
      return primePromise;

      function success() {
        isPrimed = true;
        logger.info('Primed data');
      }
    }

    function ready(nextPromises) {
      var readyPromise = primePromise || _prime();

      return readyPromise
        .then(function() {
          return $q.all(nextPromises);
        })
        .catch(exception.catcher(' ready function failed '));
    }

    /**
     * @func getAvengers
     * @desc
     */
    function getAvengers() {
      var _config = {
        url: '/api/avengers'
      };

      return _commonAjax(_config);
    }

    /**
     * @func getFilms
     * @desc
     */
    function getFilms() {
      var _config = {
        url: '/api/films'
      };

      return _commonAjax(_config);
    }

  }

})();

