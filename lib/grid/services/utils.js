import ReactDOM from 'react-dom';

export default {
    reactHeaderRendererFactory: (reactComponent) => {
        return (params) => {
            var eCell = document.createElement('span');

            ReactDOM.render(reactComponent({params}), eCell);

            // TODO: maybe there is a better event rather then "columnMoved"
            params.api.eventService.addModalPriorityEventListener('columnMoved', () => {
                ReactDOM.unmountComponentAtNode(eCell);
            });
            return eCell;
        };
    },
    debounceFactory: (debounceCallback, wait, ...args) => {
        var cbScope = {
            ref: null
        };
        return function() {
            var fn = function() {
                cbScope.ref = debounceCallback.apply(null, args);
            };
            clearTimeout(cbScope.ref);
            setTimeout(fn, wait);
        };
    }
};
