templateapp.routes = (function() {
    var _setup_routes = function(app_container) {
        app_container.get('#/', templateapp.controllers.beacons.index);
        app_container.get('#/chat/:room', templateapp.controllers.chat.index);

        app_container.post('#/post_message', templateapp.controllers.chat.post_message);
    };

    var _setup_events = function(app_container) {
        app_container.bind('new_message', templateapp.controllers.chat.on_new_message);

        app_container.bind('new_device', templateapp.controllers.beacons.on_new_device);
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
