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

templateapp.device_info = (function() {
    var is_mobile_browser = function($) {
        return /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    };

    // this function is only called from phone_index.html
    var set_phonegap_info = function() {
        // phonegap.js is not in the main folder, so for normal web it will not be included
        templateapp.storage.set_on_device(typeof(phonegap) != "undefined" || typeof(cordova) != "undefined");
    };

    var is_on_device = function() {
        return templateapp.storage.get_on_device();
    };
    
    // init
    set_phonegap_info();

    // the public interface
    return {
        set_phonegap_info: set_phonegap_info,
        is_on_device: is_on_device
    }
})();
