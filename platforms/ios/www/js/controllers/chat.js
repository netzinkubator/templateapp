templateapp.controllers = templateapp.controllers || {};

templateapp.controllers.chat = (function () {
    var _screen = "chat";

    var _room = false;
    var _chat_client = false;

    var init_chat_client = function(room) {
        // init the chat
        templateapp.modules.chat.connect();

        if(!_chat_client) {
            _chat_client = templateapp.modules.chat.new_client();
        }

        _chat_client.change_room(room);
    };

    var index = function() {
        _room = this.params.room;
        var cntx = this;

        // activates the screen and the callback is called when the screen is available
        templateapp.view_manager.activate_screen(cntx, _screen);

        cntx.render("templates/chat/main._", {})
            .then(function(content) { 
                templateapp.view_manager.set_screen_content(_screen, content);
            });

            // now get the data and render it
            /*
            cntx.send(function(next_callback) {
                templateapp.api.get_beacons(next_callback);
            }).then(function(data) {

                this.render("templates/beacons/list._", {beacons: data.beacons})
                    .then(function(content) { 
                        templateapp.view_manager.set_screen_content(_screen, content);
                    }
                );
            });
            */
    
        init_chat_client(_room);
    };

    var _add_message_to_chat_list = function(context, message) {
        context.render("templates/chat/message._", {message: message})
            .then(function(content) { 
                templateapp.view_manager.add_to_element("messages", content);
            }
        );
    }

    var post_message = function() {
        var message = this.params["send_message"];
        if(typeof(message) != "string" || message.length == 0) {
            return false;
        }

        console.log("sending  " + message);

        if(_chat_client) {
            _chat_client.send_message(_room, message);
        }

        _add_message_to_chat_list(this, message);

        templateapp.view_manager.empty_input("send_message");

        return false;
    }

    var on_new_message = function(event, data) {
        console.log("received " + data.message + " from " + data.user);

        _add_message_to_chat_list(this, data.user + " -> " + data.message);
    };
    
    return {
        index: index,
        post_message: post_message,
        on_new_message: on_new_message        
    }
})();
