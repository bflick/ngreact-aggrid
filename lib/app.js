import 'ngreact';
import 'ag-grid-react';
import angular from 'angular';
import TestCtrl from './TestCtrl';
import ColDefService from './grid/services/ColDefService';
import DataSourceFactory from './grid/factories/DataSourceFactory';
import GridSignallerFactory from './grid/factories/GridSignallerFactory';


angular
    .module('app', ["react"])
    .service('ColDefService', ColDefService)
    .controller('TestCtrl', TestCtrl)
    .factory('DataSourceFactory', DataSourceFactory)
    .factory('GridSignallerFactory', GridSignallerFactory)
    .value('targetUser', 'bflick');

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
