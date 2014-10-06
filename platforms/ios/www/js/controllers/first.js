/*
    Copyright (c) 2014 Yuunik UG, netzinkubator.de


    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

templateapp.controllers = templateapp.controllers || {};

templateapp.controllers.first = (function () {
    var _screen = "first";

    var index = function(cntx) {

        // activates the screen and the callback is called when the screen is available
        var back_active = templateapp.view_manager.activate_screen(cntx, _screen);
        if(back_active) {
            return;
        }

        this.send(function(next_callback) {
            templateapp.api.get_first_list(next_callback);
        
        }).then(
            function(items) {
                this.render("templates/first/list._", {items: items})
                    .then(function(content) { 
                        templateapp.view_manager.set_screen_content(_screen, content);
                    
                        templateapp.ui.first.init_screen(_screen);
                    });
            }
        );
    };
    
    return {
        index: index
    }
})();
