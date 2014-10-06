templateapp.routes = (function() {
    var _setup_routes = function(app_container) {
        app_container.get('#/', templateapp.controllers.first.index);
        app_container.get('#/second/:name', templateapp.controllers.second.index);

        // app_container.post('#/post_data', templateapp.controllers.first.post_data);
    };

    var _setup_events = function(app_container) {
        // app_container.bind('some_event', templateapp.controllers.first.some_event);
    };

    var _setup = function(app_container) {
        _setup_routes(app_container);
        _setup_events(app_container);
    };

    // the public interface
    return {
        setup: _setup
    }
})();
