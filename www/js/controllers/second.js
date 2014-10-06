templateapp.controllers = templateapp.controllers || {};

templateapp.controllers.second = (function () {
    var _screen = "second";

    var index = function() {
        _room = this.params.room;
        var cntx = this;

        // activates the screen and the callback is called when the screen is available
        templateapp.view_manager.activate_screen(cntx, _screen);

        cntx.render("templates/chat/main._", {})
            .then(function(content) { 
                templateapp.view_manager.set_screen_content(_screen, content);
            });
    };

    return {
        index: index
    }
})();
