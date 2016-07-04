import _ from 'lodash';
import utils from './utils';

export default class ColDefService {
    constructor() {
        this.defaultColWidth = 30;
        this.columnDefs = [];
    };

    getColDef(name, options) {
        options = options || {};
        var ret = {
            headerName: name,
            field: name.toLowerCase(),
            width:this.defaultColWidth,
            headerCellTemplate: this.headerCellTemplate
        };
        _.extend(ret, options);
        return ret;
    };

    headerCellTemplate() {
        var debouncer = utils.debounceFactory(()=>console.log('stopped typing'), 800);

        var eCell = document.createElement('span');
        eCell.innerHTML =
            '<div style="text-align: left;height:40px;">' +
            '  <div id="agResizeBar" style="width: 4px; height: 100%; float: right; cursor: col-resize;"></div>' +
            '  <div style="padding: 4px; overflow: hidden; text-overflow: ellipsis;">' +
            '<span id="agMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
            // everything inside agHeaderCellLabel gets actioned when the user clicks
            '    <span id="agHeaderCellLabel">' +
            '      <span id="agText"></span>' +
            '      <span id="agSortAsc"><i class="fa fa-long-arrow-down"></i></span>' +
            '      <span id="agSortDesc"><i class="fa fa-long-arrow-up"></i></span>' +
            '      <span id="agNoSort"></span>' +
            '      <span id="agFilter"><i class="fa fa-filter"></i></span>' +
            //            '     <br/> <input type="text" class="myFilterInput"/>' +
            '    </span>' +
            '  </div>' +
            '</div>';

        // var filterInput = eCell.querySelector('.myFilterInput');
        // filterInput.addEventListener('change', function() {
        //     debouncer();
        // });

        // put logic in to catch context menu click
        eCell.addEventListener('contextmenu', function(event) {
            //gridOptions.api.showColumnMenuAfterMouseClick('athlete', event);
            event.preventDefault();
        });

        return eCell;

    }

    addColDef(colDef, cellRenderer, options) {
        if(cellRenderer) {
            colDef.children.forEach(function(child) {
                child.cellRenderer = cellRenderer;
            });
        }
        this.columnDefs.push(colDef);
    }

    setColDefsForRows(rows) {
        var columnNames = [];
        var row = rows ? rows[0] : false;
        if (row) {
            for (var col in row) {
                columnNames.push(col);
            }
        }
        this.createColDefs(columnNames);
        return this;
    }

    createColDefs(nameList) {
        var that = this;
        var parent = this.getColDef('root', {headerClass: 'blank', children: []});
        nameList.forEach(function(name) {
            parent.children.push(that.getColDef(name));
        });
        this.addColDef(parent);
        return this.columnDefs;
    }
}
