class DataSource {

    constructor(ColDefService) {
        this.pageSize = 100;
        this.rowCount = -1;
        this.rawData = [];
        this.cds = ColDefService;
        this.slowMode = false;
    };
    setSlowMode(slow) {
        this.slowMode = slow;
    }
    setRowCount(count) {
        this.rowCount = count;
    }
    getRows (params) {
        var startRow = params.startRow,
            endRow = params.endRow,
            successCallback = params.successCallback,
            failCallback = params.failCallback;
        if (this.rawData) {
            if (!this.slowMode) {
                this.rowCount = this.rawData.length;
            }
            var rowSlice = this.rawData.slice(startRow, endRow);
            successCallback(rowSlice, this.rowCount);
        } else {
            failCallback();
        }
    };
    setRawData(rawData) {
        this.rawData = rawData;
        this.cds.setColDefsForRows(this.rawData);
    };
    getRowData() {
        //;-) cleanup rawData
        return this.rawData;
    }
}

export default function DataSourceFactory(ColDefService) {
    return new DataSource(ColDefService);
}

DataSourceFactory.$inject = ['ColDefService'];
