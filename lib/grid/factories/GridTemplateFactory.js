import ReactDOM from 'react-dom';
import React from 'react';
import ColDefService from '../services/ColDefService';
import { AgGridReact } from 'ag-grid-react';
import _ from 'lodash';

// take this line out if you do not want to use ag-Grid-Enterprise
import 'ag-grid-enterprise';

class GridTemplate extends React.Component {
    propTypes: {
        datasource: React.PropTypes.object.isRequired,
        rows: React.PropTypes.array.isRequired
    };
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

        // the grid options are optional, because you can provide every property
        // to the grid via standard React properties. however, the react interface
        // doesn't block you from using the standard JavaScript interface if you
        // wish. Maybe you have the gridOptions stored as JSON on your server? If
        // you do, the providing the gridOptions as a standalone object is just
        // what you want!
        this.gridOptions = {
            // this is how you listen for events using gridOptions
            onModelUpdated: function() {
                console.log('event onModelUpdated received');
            },
            // this is a simple property
            rowBuffer: 10, // no need to set this, the default is fine for almost all scenarios
            rowModelType: "pagination"
        };
//        _.extend(this.gridOptions, gridOptions);
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
        this.setState({colDefs: ColDefService.columnDefs});
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if (this.api && newProps.datasource) {
            newProps.datasource.setRawData(newProps.rows);
            if (newProps.rows) {
                this.setState({rowData: newProps.rows});
            }
            this.api.setDatasource(newProps.datasource);
        }
    }

    render() {
        var gridTemplate;
        gridTemplate = (
            <div style={{height: 400}} className="ag-fresh">
                <AgGridReact
                    // gridOptions is optional - it's possible to provide
                    // all values as React props
                    gridOptions={this.gridOptions}

                    // listening for events
                    onGridReady={this.onGridReady.bind(this)}
                    onRowSelected={this.onRowSelected.bind(this)}
                    onCellClicked={this.onCellClicked.bind(this)}

                    // binding to simple properties
                    showToolPanel={this.state.showToolPanel}
                    quickFilterText={this.state.quickFilterText}

                    // binding to an object property
                    icons={this.state.icons}

                    // binding to array properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}

                    // no binding, just providing harde coded strings for the properties
                    rowSelection="multiple"
                    enableColResize="true"
                    enableSorting="true"
                    enableFilter="true"
                    groupHeaders="true"
                    rowHeight="22"
                    debug="true"
                />
            </div>
        )
        return (
            <div style={{width: '800px'}}>
                <div style={{padding: '4px'}}>
                    {gridTemplate}
                </div>
            </div>)
    }

}

export default function GridTemplateFactory() {
    return GridTemplate;
}
