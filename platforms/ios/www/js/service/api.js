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

templateapp.api = (function () {
    // private
    _callServer = function(uri, params, type, callback) {
        params = params || {};
        // $.extend(params, { lang: templateapp.current_language() });
        // $.extend(params, { api_version: _api_version });

        $.ajax({
            url: templateapp.config.server_url + uri,
            crossDomain:true,
            type: type,
            data: params,
            dataType: 'JSONP',
            contentType: "application/json",
            timeout: 10000,
            success: function(data) {
                callback(data);
            },
            complete: function() {
                // twopapp.activity_indicator.hide();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("error");
                // alert("error: " + textStatus + " - " + errorThrown.message)
                // twopapp.activity_indicator.hide();
            }
        });
    }

    get_first_list = function(callback) {
        // normally a server api would be called like this
        //_callServer('/data/get_first_list', {}, "GET", function(response) { 
        //    callback(response);
        //});

        var dummy_data = [
            {name: "location 1", description: "cool location 1"},
            {name: "location 2", description: "even cooler location 1"}
        ];

        callback(dummy_data);
    }

    return {
        get_first_list: get_first_list
    };
})();
