templateapp.controllers = templateapp.controllers || {};

templateapp.controllers.second = (function () {
    var _screen = "second";

    var index = function(cntx) {
        var name = this.params.name;

        // activates the screen and the callback is called when the screen is available
        templateapp.view_manager.activate_screen(cntx, _screen);

        cntx.render("templates/second/main._", {name: name})
            .then(function(content) { 
                templateapp.view_manager.set_screen_content(_screen, content);
            });
    };

    return {
        index: index
    }
})();
