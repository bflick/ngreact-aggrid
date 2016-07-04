export default function myGrid() {
    return {
        require: '^^ag-grid',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function(scope, element, attrs, gridCtrl) {
            console.log(gridCtrl);
        }
    };
}
