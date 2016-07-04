import angular from "angular";
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import _ from 'lodash';
import 'ngreact';
import 'ag-grid-enterprise';
import {reactCellRendererFactory, reactFilterFactory} from 'ag-grid-react';

angular.module("app")
    .directive('ngReactGrid', ngReactGrid)
    .factory('GridTemplateFactory', GridTemplate);

function ngReactGrid(reactDirective) {
    return reactDirective(GridTemplate, ['datasource', 'signaller'], {restrict: 'E'});
}

ngReactGrid.$inject = ['reactDirective'];

class GridTemplate extends React.Component {

    constructor() {
        super();
        this.state = {
            quickFilterText: null,
            showGrid: true,
            showToolPanel: false,
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            }
        };
        this.gridOptions = {
            // this is how you listen for events using gridOptions
            onModelUpdated: function() {
                console.log('event onModelUpdated received');
            },
            rowBuffer: 10,
            rowModelType: "pagination",
            enableServerSideFiltering: true,
            enableServerSideSorting: true
        };

    }

    onShowGrid(show) {
        console.log(show);console.log('onGridShow');
        this.setState({
            showGrid: show
        });
    }

    onToggleToolPanel(event) {
        this.setState({showToolPanel: event.target.checked});
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    selectAll() {
        this.api.selectAll();
    }

    deselectAll() {
        this.api.deselectAll();
    }

    setCountryVisible(visible) {
        this.columnApi.setColumnVisible('country', visible);
    }

    onQuickFilterText(event) {
        this.setState({quickFilterText: event.target.value});
    }

    onCellClicked(event) {
        console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
    }

    onRowSelected(event) {
        console.log('onRowSelected: ' + event.node.data.name);
    }

    onRefreshData() {
        console.log('onRefreshData:');
    }

    componentWillReceiveProps(newProps) {
        if (this.api && newProps.signaller) {
            newProps.signaller.setGrid(this);
        }
    }

    render() {
        var gridTemplate;
        gridTemplate = (
            <div style={{height: 400}} className="ag-fresh">
                <AgGridReact
            gridOptions={this.gridOptions}
            onGridReady={this.onGridReady.bind(this)}
                    onRowSelected={this.onRowSelected.bind(this)}
                    onCellClicked={this.onCellClicked.bind(this)}

                    // binding to simple properties
                    showToolPanel={this.state.showToolPanel}
                    quickFilterText={this.state.quickFilterText}

                    // binding to an object property
                    icons={this.state.icons}

                    // binding to array properties
                    columnDefs={this.props.datasource.cds.columnDefs}
                    rowData={this.state.rowData}

                    // no binding, just providing harde coded strings for the properties
                    rowSelection="multiple"
                    enableColResize="true"
                    groupHeaders="true"
                    rowHeight="22"
                    debug="true"
                />
            </div>
        );
        return (
            <div style={{width: '800px'}}>
                <div style={{padding: '4px'}}>
                    {gridTemplate}
                </div>
                </div>);
    }

}
