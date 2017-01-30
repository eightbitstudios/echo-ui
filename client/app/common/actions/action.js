angular.module('echo.action', [])
  .factory('action$', function(Rx) {
    return new Rx.Subject();
  }).constant('userActions', {
    GET_USER: 'GET_USER'
  }).constant('loadCountsActions', {
    FETCH_LOAD_COUNTS: 'FETCH_LOAD_COUNTS',
    LOAD_COUNTS_LOADED: 'LOAD_COUNTS_LOADED',
    CLEAR_LOAD_COUNTS: 'CLEAR_LOAD_COUNTS'
  }).constant('carrierActions', {
    SET_CARRIER: 'SET_CARRIER'
  }).constant('repActions', {
    SET_REP: 'SET_REP'
  });