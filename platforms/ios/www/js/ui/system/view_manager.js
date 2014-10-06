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

templateapp.view_manager = (function () {
    var click_event = "click";

    var _back_active = false;

    var show_screen = function(screen_id) {
        $(".screen").removeClass("active");
        $("#"+screen_id).addClass("active");
    };

    // for now the app initializes on start the screens
    // the commented code should be adapted when we need screens that are created on demand
    var activate_screen = function(context, screen_id /*, options, screen_available_callback */) {
        
        if(!_back_active) {
            $("#" + screen_id + "-container").empty();
        }

        show_screen(screen_id);
        
        var was_back = _back_active;

        _back_active = false;

        return was_back;

        // check if screen is already there
        /*
        if($("#"+screen_id).length == 0) {
            // get the header
            context.render("templates/system/screen_template._", {screen_id: screen_id, options: options})
                .appendTo("#app_content")
                .then(function() {
                    show_screen(screen_id);
                    screen_available_callback(_back_active);

                    _back_active = false;
                });
        } else {
            if(!_back_active) {
                $("#" + screen_id + "-container").empty();
            }

            show_screen(screen_id);
            screen_available_callback(_back_active);

            _back_active = false;
        }
        */
    };

    var init_back_buttons = function() {
        $(document).on(click_event, ".btn-back", function(e) {
            e.preventDefault();

            _back_active = true;
            
            console.log("back on");

            window.history.back();

            return false;
        });
    };

    var init = function() {
        init_back_buttons();
    };

    var set_screen_content = function(screen, content) {
        $("#" + screen + "-container").html(content);
    }

    var add_to_element = function(screen, element_id, content) {
        $("#" + screen + "-container #" + element_id).append(content);
    }

    var set_input_value = function(input_id, value) {
        $("#" + input_id).val(value);
    }

    var empty_input = function(input_id) {
        set_input_value(input_id, "");
    }

    // creates the screens
    var init_screens = function() {
        var i;
        var $app_content = $("#app_content");

        for(i = 0; i < templateapp.screens.length; i++) {
            var screen_info = templateapp.screens[i];

            var screen_template = templateapp.render("system/screen_template._", screen_info);

            $app_content.append(screen_template);

        }
    }

    return {
        init: init,
        activate_screen: activate_screen,
        set_screen_content: set_screen_content,
        add_to_element: add_to_element,
        set_input_value: set_input_value,
        empty_input: empty_input,
        init_screens: init_screens
    };
})();