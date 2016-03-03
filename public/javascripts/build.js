requirejs.config({
    "baseUrl": "javascripts/",
    "paths": {
        "jquery": "../bower_components/jquery/dist/jquery.min",
        "knockout": "../bower_components/knockout/dist/knockout",
        "require-jade": "../bower_components/require-jade/jade",
        "search": "search",
        "text-converter": "text-converter"
    }
});

requirejs(["main"]);