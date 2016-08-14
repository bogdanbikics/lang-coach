requirejs.config({
    "baseUrl": "javascripts/",
    "paths": {
        "jquery": "../bower_components/jquery/dist/jquery.min",
        "knockout": "../bower_components/knockout/dist/knockout",
        "require-jade": "../bower_components/require-jade/jade",
        "xregexp": "../bower_components/xregexp/xregexp-all",
        "text-converter": "text-converter",
        "search-viewmodel": "search-viewmodel",
        "points-viewmodel": "points-viewmodel"
    }
});

requirejs(["main"]);