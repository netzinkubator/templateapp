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

    get_beacons_data = function(beacon_uuid, callback) {
        // normally a server api would be called like this
        //_callServer('/data/get_contacts', {}, "GET", function(response) { 
        //    callback(response);
        //});

        var dummy_data = {
            "32BD683B-1028-976E-D4DD-0F0171405018": {name: "location 1", description: "cool location 1"},
            "E7D99318-2624-3478-8561-320E3F8DED1F": {name: "location 2", description: "even cooler location 1"}
        };

        var data = dummy_data[beacon_uuid];

        if(typeof(data) != "undefined") {
            // use dummy data
            callback({
                data: data
            });
        } else {
            console.log("beacond description not found");
        }
    }

    return {
        get_beacons_data: get_beacons_data
    };
})();
