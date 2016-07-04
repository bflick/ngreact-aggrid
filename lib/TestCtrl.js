export default class TestCtrl {
    constructor($scope, $http, targetUser, DataSourceFactory, GridSignallerFactory, ColDefService) {
        $scope.datasource = DataSourceFactory;
        $scope.gridSignaller = GridSignallerFactory;
        $http.get('resources/olympicWinners.json').then(function(result) {
            $scope.datasource = $scope.gridSignaller.resetDatasource(result.data);
        });
    }
};
