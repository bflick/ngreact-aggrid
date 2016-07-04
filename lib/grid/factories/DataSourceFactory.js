import ColDefService from '../services/ColDefService';

class DataSource {

    constructor() {
        this.pageSize = 100;
        this.rowCount = -1;
        this.rawData = [];
        this.cds = new ColDefService;
    };
    getRows (params) {
        var startRow = params.startRow,
            endRow = params.endRow,
            successCallback = params.successCallback,
            failCallback = params.failCallback;
        //call successCallback with [rows...],total_rows
        console.log('getRows');
        if (this.rawData) {
            this.cds.setColDefsForRows(this.rawData);
            var rowSlice = this.rawData.slice(startRow, endRow);
            successCallback(rowSlice, rowSlice.length);
        }
        failCallback();
    };
    setRawData(rawData) {
        this.rawData = rawData;
    }
}

export default function DataSourceFactory() {
    return new DataSource;
}
