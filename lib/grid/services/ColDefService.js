import {reactCellRendererFactory, reactFilterFactory} from 'ag-grid-react';
import SkillsCellRenderer from './renderers/SkillsCellRenderer';
import SkillsFilter from './filters/SkillsFilter';
import ProficiencyFilter from './filters/ProficiencyFilter';
import 'ag-grid-enterprise';

export default class ColDefService {

    constructor(gridOptions) {
        this.gridOptions = gridOptions;
        this.defaultColWidth = 30;
        this.cellRenderers = {};
        this.columnDefs = [];
    };

    getColDef(name, options) {
        var ret = { headerName: name, field: name.toLowerCase(), width:this.defaultColWidth};
        _.extend(ret, options);
        return ret;
    };

    addColDef(colDef, cellRenderer, options) {
        if(cellRenderer) {
            colDef.children.forEach(function(child) {
                child.cellRenderer = cellRenderer;
            });
        }
        this.columnDefs.push(colDef);
    }

    addCellRenderer(key, renderer) {
        this.cellRenederers[key] = renderer;
    }

    autoSizeCols() {
        this.gridOptions.columnApi.autoSizeColumns();
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
