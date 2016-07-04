import angular from 'angular';
import GridTemplateFactory from './grid/factories/GridTemplateFactory';
import ngReactGrid from './grid/directives/ngReactGrid';
import TestCtrl from './TestCtrl';
import DataSourceFactory from './grid/factories/DataSourceFactory';
import 'ag-grid-react';

import 'ngreact';

angular
    .module('app', ['react'])
//    .service('ActivityService', ActivityService) DataSourceService
    .controller('TestCtrl', TestCtrl)
    .factory('GridTemplateFactory', GridTemplateFactory)
    .factory('DataSourceFactory', DataSourceFactory)
    .directive('ngReactGrid', ngReactGrid)
    .value('targetUser', 'bflick');

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
