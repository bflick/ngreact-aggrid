class GridSignaller {
    constructor(DataSourceFactory) {
        this.grid = null;
        this.startupTasks = [];
        this.datasource = DataSourceFactory;
    };
/** If slow mode, then get count via worklist service. Set rowCount, then */
    resetDatasource(rowData, rowCount) {
        this.datasource.setRawData(rowData);
        if (this.grid) {
            if (rowCount) {
                this.datasource.setRowCount(rowCount);
            }
            this.grid.api.setDatasource(this.datasource);
            this.grid.api.setColumnDefs(this.datasource.cds.columnDefs);
            this.grid.api.sizeColumnsToFit();
        } else {
            this.startupTasks.push(function(){this.grid.api.setDatasource(this.datasource);});
            this.startupTasks.push(function(){this.grid.api.setColumnDefs(this.datasource.cds.columnDefs);});
            this.startupTasks.push(function(){this.grid.api.sizeColumnsToFit();});
        }
        return this.datasource;
    }
    showGrid(show) {
        if (this.grid) {
            this.grid.setState({
                showGrid: show
            });
        } else {
            console.log('show grid called, no grid set on datasource');
        }
    }
    setGrid(grid) {
        this.grid = grid;
        if (this.startupTasks) {
            for(var i in this.startupTasks) {
                var task = this.startupTasks.shift();
                task.apply(this);
            }
        }
    }
}

export default function GridSignallerFactory(DataSourceFactory) {
    return new GridSignaller(DataSourceFactory);
}

GridSignallerFactory.$inject = ['DataSourceFactory'];
