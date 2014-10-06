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

templateapp = (function() {
    var _app = null;

    var _ui_current_language = "en";
    
    var init = function($) {
        _app = $.sammy(function() {
            // use the custom underscore plugin
            this.use(Sammy.Underscore);

            // routes
            templateapp.routes.setup(this);
        });
    };

    var run = function() {
        // generated the defined screens
        templateapp.view_manager.init_screens();

        _app.run('#/');
    };

    var device_ready = function() {
        // phonegap loaded
    };

    var jquery_ready = function() {
        // jquery loaded
        load_lang(templateapp.config.default_language);

        templateapp.view_manager.init();
    };

    var load_lang = function(lang_code){
        _ui_current_language = lang_code;

        templateapp.lang.load_lang(_ui_current_language, function() {
            // make sure we have loaded the language file before booting the app
            run();
        });
    };

    var trigger = function(event, data) {
        _app.trigger(event, data);
    };

    // the public interface
    return {
        init: init,
        jquery_ready: jquery_ready,
        device_ready: device_ready,
        trigger: trigger
    }
})();
