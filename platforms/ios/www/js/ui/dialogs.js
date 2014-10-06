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

templateapp.ui = templateapp.ui || {};

templateapp.ui.dialogs = (function () {
    var _alert = function(text, title) {
        if(templateapp.device_info.is_on_device()) {
            navigator.notification.alert(text, null, title);
        } else {
            window.alert(text);
        }
    };
    
    var _confirm = function (text, title, callback, callback_cancel, ok_button_text){
        if(!is_on_device) {
            var res = confirm(text)
            callback(res);
            return;
        }

        navigator.notification.confirm(text,
            function(index) {
                // cancel is 1 ... ok is 2
                if(index == 2) {
                    callback();
                } else if(index == 1) {
                    if(typeof(callback_cancel) != "undefined") {
                        callback_cancel();
                    }
                }
            },
            title, [templateapp.lang.text("btn_cancel"), typeof(ok_button_text) != "undefined" ? ok_button_text : "Ok"]);
    }

    return {
        alert: _alert,
        confirm: _confirm
    };
})();