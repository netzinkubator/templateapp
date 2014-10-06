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

templateapp.ui.first = (function () {
    var first_button_on_click = function(some_data) {
        templateapp.ui.dialogs.alert(some_data);

        // if a more complex function is to be done here, then this function should trigger an event
        // which should be handled in the controller
    };

    var init_buttons = function(screen_id) {
        screen_id = "#" + screen_id;

        $(screen_id + " #first_button").on("click", function(e) {
            // any data from the button or event are read here and given to the on_click function
            var $this = $(this);

            var some_data = $this.data("some_data");

            first_button_on_click(some_data);

            return false;
        });

    };

    var init_screen = function(screen_id) {
        init_buttons(screen_id);
    };

    return {
        init_screen: init_screen
    }
})();
