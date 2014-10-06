templateapp.native = templateapp.native || {};

templateapp.native.ble = (function () {

    var start_scan = function() {
        // for desktop
        if(typeof(evothings) == "undefined") {
            return;
        }

        stop_scan();

        evothings.ble.startScan(
            function(device) {
                // Report success. Sometimes an RSSI of +127 is reported.
                // We filter out these values here.
                if (device.rssi <= 0)
                {
                    // callbackFun(device, null);
                    console.log("ble - found device ");
                    console.log(device);

                    templateapp.trigger("new_device", {device: device});
                }
            },
            function(errorCode) {
                // Report error.
                // callbackFun(null, errorCode);
                console.log("error: " + errorCode);
            }
        );
    }

    var stop_scan = function() {
        // for desktop
        if(typeof(evothings) == "undefined") {
            return;
        }

        evothings.ble.stopScan();
    }

    return {
        start_scan: start_scan,
        stop_scan: stop_scan
    };
})();