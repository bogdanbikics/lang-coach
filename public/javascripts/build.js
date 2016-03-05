requirejs.config({
    "baseUrl": "javascripts/",
    "paths": {
        "jquery": "../bower_components/jquery/dist/jquery.min",
        "knockout": "../bower_components/knockout/dist/knockout",
        "require-jade": "../bower_components/require-jade/jade",
        "text-converter": "text-converter",
        "search": "search"
    }
});

requirejs(["main"]);