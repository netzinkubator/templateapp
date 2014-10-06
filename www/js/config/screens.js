// this defines the screens of the app and the relation between them
templateapp.screens = [
    {
        id: "first",
        top_screen: true,
        title_id: "first_screen_title",
        no_header: false,
        refresh_on_back: false // not used for now
    },
    {
        id: "second",
        top_screen: false,
        title_id: "second_screen_title",
        no_header: false,
        parent_id: "first" // not used for now
    }
];
