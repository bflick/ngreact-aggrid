import 'ag-grid-react';

export default function ngReactGrid(JsGridBase, reactDirective) {
    return reactDirective(JsGridBase, ['datasource', 'signaller'], {restrict: 'E'});
}

ngReactGrid.$inject = ['GridTemplateFactory', 'reactDirective'];
