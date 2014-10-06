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

templateapp.session = (function () {
    // simple in-memory session data
    // the advantage as opposed to local storage, is that this content is not converted to json string
    var _content = {};
    
    // the keys used by the app
    var _cached_templates_base_key = "cached_templates_";

    // private
    var _set_value = function(key, value) {
        _content[key] = value;
    };

    var _get_value = function(key) {
        var value = false;

        if(typeof(_content[key]) != "undefined") {
            value = _content[key];
        }
        
        return value;

    };

    var _delete_value = function(key) {
        delete _content[key];
    };

    var get_template_key = function(name) {
        return _cached_templates_base_key + name;
    }

    // public
    var set_cached_template = function(name, template) {
        _set_value(get_template_key(name), template);
    }

    var get_cached_template = function(name) {
        return _get_value(get_template_key(name));
    }

    return {
        set_cached_template: set_cached_template,
        get_cached_template: get_cached_template
    };
})();