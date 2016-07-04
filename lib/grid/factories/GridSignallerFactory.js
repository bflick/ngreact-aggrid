class GridSignaller {
    grid;
    constructor(DataSourceFactory) {
        this.datasource = DataSourceFactory;
    };
    resetDatasource(rowData) {
        this.datasource.setRawData(rowData);
        if (this.grid) {
            this.grid.api.setRowData(rowData);
            this.grid.api.setColumnDefs(this.datasource.cds.columnDefs);
            this.grid.columnApi.sizeColumnsToFit();
        }
        return this.datasource;
    }
    showGrid(show) {
        if (this.grid) {
            console.log("Hey stupid");
            //this.grid.setState({
              //  showGrid: show
            //});
        } else {
            console.log('show grid called, no grid set on datasource');
        }
    }
    setGrid(grid) {
        this.grid = grid;
    }
}

export default function GridSignallerFactory(DataSourceFactory) {
    return new GridSignaller(DataSourceFactory);
}

GridSignallerFactory.$inject = ['DataSourceFactory'];
