class DataSource {

    constructor(ColDefService) {
        this.pageSize = 100;
        this.rowCount = -1;
        this.rawData = [];
        this.cds = ColDefService;
    };
    getRows (params) {
        var startRow = params.startRow,
            endRow = params.endRow,
            successCallback = params.successCallback,
            failCallback = params.failCallback;
        //call successCallback with [rows...],total_rows
        console.log('getRows');
        if (this.rawData) {
            var rowSlice = this.rawData.slice(startRow, endRow);
            successCallback(rowSlice, rowSlice.length);
        } else {
            failCallback();
        }
    };
    setRawData(rawData) {
        this.rawData = rawData;
        this.cds.setColDefsForRows(this.rawData);
    };
}

export default function DataSourceFactory(ColDefService) {
    return new DataSource(ColDefService);
}

DataSourceFactory.$inject = ['ColDefService'];
