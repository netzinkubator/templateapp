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

if(typeof(templateapp) == "undefined") { templateapp = {} };

// uses localstorage
templateapp.storage = (function () {
    // private data
    var local_storage = window.localStorage;

    // the keys used by the app
    var _on_device_key = "runs_on_device";
    
    // private
    var _get_item = function(key) {
        return local_storage.getItem(key);
    };
    
    var _set_item = function(key, value) {
        return local_storage.setItem(key, value);
    };

    var _del_item = function(key){
        return localStorage.removeItem(key);
    };
  
    // public
    var set_on_device = function(value) {
        _set_item(_on_device_key, value);
    }

    var get_on_device = function() {
        return _get_item(_on_device_key);
    }

    return {
        set_on_device: set_on_device,
        get_on_device: get_on_device
    };
})();