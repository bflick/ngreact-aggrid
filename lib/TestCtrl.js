export default class TestCtrl {
    constructor($scope, $http, targetUser, DataSourceFactory, GridSignallerFactory, ColDefService) {
        var cacheData;
        $scope.datasource = DataSourceFactory;
        $scope.gridSignaller = GridSignallerFactory;
        $http.get('resources/olympicWinners.json').then(function(result) {
            cacheData = result.data;
            $scope.datasource = $scope.gridSignaller.resetDatasource(result.data);
        });
        $scope.$watch('groupByColumn', function(newValue, oldValue) {
            if (newValue && $scope.datasource && $scope.datasource.cds
                && $scope.datasource.cds.columnDefs[0]
                && $scope.datasource.cds.columnDefs[0].children) {
                for (var i in $scope.datasource.cds.columnDefs[0].children) {
                    var colDef = $scope.datasource.cds.columnDefs[0].children[i];
                    console.log(colDef);
                    if (colDef.field == newValue) {
                        colDef.rowGroupIndex = 0;
                        $scope.gridSignaller.setColumnDefs($scope.datasource.cds.columnDefs);
//                        $scope.gridSignaller.resetDatasource(cacheData);
                    }
                }
            }
        });
    }
i};
