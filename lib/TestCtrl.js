import countryCellRenderer from './grid/services/renderers/CountryCellRenderer';
import SkillsCellRenderer from './grid/services/renderers/SkillsCellRenderer';
import ProficiencyCellRenderer from './grid/services/renderers/ProficiencyCellRenderer';
import SkillsFilter from './grid/services/filters/SkillsFilter';
import ProficiencyFilter from './grid/services/filters/ProficiencyFilter';
import { reactCellRendererFactory, reactFilterFactory } from  'ag-grid-react';
import RowDataFactory from './grid/factories/RowDataFactory';
import DataSourceFactory from './grid/factories/DataSourceFactory';

export default class TestCtrl {
    constructor($scope, $http, targetUser) {
        $scope.datasource = DataSourceFactory();
        $http.get('resources/olympicWinners.json').then(function(result) {
            $scope.rowData = result.data;
        });
    }
}

TestCtrl.$inject = ['$scope', '$http', 'targetUser'];
