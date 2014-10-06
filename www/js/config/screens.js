// this defines the screens of the app and the relation between them
templateapp.screens = [
    {
        id: "ble_list",
        top: true,
        title_id: "ble_list_screen_title",
        refresh_on_back: false // not used for now
    },
    {
        id: "chat",
        top: false,
        title_id: "chat_screen_title",
        parent: "ble_list" // not used for now
    }
];
