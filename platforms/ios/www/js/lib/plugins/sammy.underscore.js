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

(function($) {

    Sammy = Sammy || {};

    // todo: cache

    Sammy.Underscore = function(app, method_alias) {

        var compile_template = function(name, template) {
            // cache the template
            var compiled = templateapp.session.get_cached_template(name);
            if(!compiled) {
                compiled = _.template(template);

                templateapp.session.set_cached_template(name, compiled);
            }

            return compiled;
        };

    	var template_partial = function(template_name, params) {
            // check the cache first
            var compiled = templateapp.session.get_cached_template(template_name);
            
            var template = "";
            if(compiled === false) {
                // get the template file, sync
        	    $.ajax({
        	        async: false,
                    url: "templates/" + template_name,
                }).done(function(result) {
                    if(typeof(result) != undefined && result != "") {
                        template = result;
                    }
                });
                
                compiled = compile_template(template_name, template);
            }
            
            // give the template the partial function
    	    params.partial = template_partial;
    	    
    	    return compiled(params);
    	};

        if(typeof(templateapp.render) == "undefined") {
            templateapp.render = template_partial;
        }

        // ### Arguments
        //
        // * `template` A String template. '<% %>' tags are evaluated as Javascript and replaced with the elements in data.
        // * `data` An Object containing the replacement values for the template.
        //data is extended with the <tt>EventContext</tt> allowing you to call its methods within the template.
        // * `name` An optional String name to cache the template.
        //
        var template = function(template, data, name) {
            // use name for caching
            if (typeof name == 'undefined') { name = template; }

            var compiled = compile_template(name, template);

            data = data || {};
            data.partial = template_partial;
            data.context = this;

            return compiled(data);
        };

        // set the default method name/extension
        if (!method_alias) { method_alias = '_'; }

        // create the helper at the method alias
        app.helper(method_alias, template);

        // a render function that can be called directly and returns the content
        app.helper("rendersync", template_partial);
    };
})(jQuery);