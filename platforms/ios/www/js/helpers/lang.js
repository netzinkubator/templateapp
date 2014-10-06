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

templateapp.lang = (function() {
    var _language_data;

    var load_lang = function(language, callback) {
        $.ajax({
            dataType: "json",
            url: 'l10n/' + language +'.json',

            success: function(langData) {
                _language_data = langData[language];

                callback();                
            },

            error: function(jqXHR, textStatus, errorThrown) {
                alert("Unable to locate: '" + language + "' language file");

                console.log(textStatus + " -> " + errorThrown.message);
            }
        });
    };

    var text = function(item) {
        return (_language_data[item]) ? _language_data[item] : item;
    };

    return {
        load_lang: load_lang,
        text: text
    };
})();