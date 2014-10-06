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

templateapp.controllers.beacons = (function () {
    var _screen = "ble_list";

    var _found_devices = {};

    var index = function() {
        var cntx = this;

        // activates the screen and the callback is called when the screen is available
        var back_active = templateapp.view_manager.activate_screen(cntx, _screen);
        if(back_active) {
            return;
        }

        templateapp.native.ble.start_scan();
    };

    var on_new_device = function(event, data) {
        var device_uuid = data.device.address;

        // also save the time the device was found
        data.device.time_stamp = Date.now();

        // if device was aleady found only update its data (mainly for the timestamp and RSSI)
        if(typeof(_found_devices[device_uuid]) != "undefined") {
            // update device data
            _found_devices[device_uuid] = data.device;

            return;
        }

        this.send(function(next_callback) {
            templateapp.api.get_beacons_data(device_uuid, next_callback);
        }).then(function(beacon_data) {

            var previously_found_devices_count = Object.keys(_found_devices).length;

            // save device data
            _found_devices[device_uuid] = data.device;

            this.render("templates/beacons/item._", {data: beacon_data.data, previously_found_devices_count: previously_found_devices_count})
                .then(function(item) { 

                    if(previously_found_devices_count != 0) {
                        templateapp.view_manager.add_to_element(_screen, "beacons", item);
                    } else {
                        templateapp.view_manager.set_screen_content(_screen, item);
                    }
                }
            );
        });
    };
    
    return {
        index: index,
        on_new_device: on_new_device
    }
})();
