templateapp.modules = templateapp.modules || {};

// this.socket.emit('nameAttempt', name);

templateapp.modules.chat = (function() {
    var _socket = false;

    // the chat client
    var Client = function(socket) {
        this.socket = socket;
    };

    Client.prototype.send_message = function(room, text) {
        var message = {
            room: room,
            text: text
        };

        this.socket.emit('message', message);
    };

    Client.prototype.change_room = function(room) {
        this.socket.emit('join', {
            newRoom: room
        });
    };

    var on_new_message = function(message) {
        console.log("new message: " + message);

        templateapp.trigger("new_message", {user: message.user, message: message.text});
    };

    var register_handlers = function() {
        _socket.on('message', function (message) {
            on_new_message(message);
        });
    };

    var connect = function() {
        if(!_socket) {
            // todo: handle error
            _socket = io.connect(templateapp.config.chat_server_url);

            register_handlers();
        }
    };

    var new_client = function() {
        if(_socket == false) {
            return false;
        }

        return new Client(_socket);
    }

    // the public interface
    return {
        Client: Client,
        connect: connect,
        new_client: new_client
    }
})();
