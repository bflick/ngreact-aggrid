import angular from 'angular';
import GridTemplateFactory from './grid/factories/GridTemplateFactory';
import ngReactGrid from './grid/directives/ngReactGrid';
import TestCtrl from './TestCtrl';
import ColDefService from './grid/services/ColDefService';
import DataSourceFactory from './grid/factories/DataSourceFactory';
import GridSignallerFactory from './grid/factories/GridSignallerFactory';
import 'ag-grid-react';
import 'ngreact';

angular
    .module('app', ["react"])
    .service('ColDefService', ColDefService)
    .controller('TestCtrl', TestCtrl)
    .factory('GridTemplateFactory', GridTemplateFactory)
    .factory('DataSourceFactory', DataSourceFactory)
    .factory('GridSignallerFactory', GridSignallerFactory)
    .directive('ngReactGrid', ngReactGrid)
    .value('targetUser', 'bflick');

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
