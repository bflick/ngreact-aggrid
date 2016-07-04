import React from 'react';
import RefData from '../../factories/RefData';

// cell renderer for the proficiency column. this is a very basic cell renderer,
// it is arguable that we should not of used React and just returned a string of
// html as a normal ag-Grid cellRenderer.
export default class ColumnHeaderCellRenderer extends React.Component {
    debounceFactory() {
        var cbScope = {
            ref: null
        };

        return function(debounceCallback, wait,...args) {
            var fn = function() {
                cbScope.ref = setTimeout(debounceCallback.bind(null, args), wait);
            };
            clearTimeout(cbScope.ref);
        };
    }
    handleInput() {
        var debounceCallback = function() {
            //            this.props.datasource.update
            console.log("get services in here");
        };
        var debounce = this.debounceFactory();
        debounce(debounceCallback, 1000);
    }
    render() {
        var params = this.props.params;
        var backgroundColor;
        var signaller = this.props.params.signaller;
        if (params.value < 20) {
            backgroundColor = 'red';
        } else if (params.value < 60) {
            backgroundColor = '#ff9900';
        } else {
            backgroundColor = '#00A000';
        }

        return (
            <div>
                <div className="value">{params.value}%</div>
                <input type="text" onChange={this.handleInput()}/>
            </div>
        );
    }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
ColumnHeaderCellRenderer.propTypes = {
    params: React.PropTypes.object
};
