requirejs.config({
    "baseUrl": "javascripts/public",
    "paths": {
        "jquery": "../../../bower_components/jquery/dist/jquery.min",
        "knockout": "../../../bower_components/knockout/dist/knockout",
        "require-jade": "../../../bower_components/require-jade/jade",
        "xregexp": "../../../bower_components/xregexp/xregexp-all",
        "text-converter": "./utils/text-converter",
        "search-viewmodel": "./viewmodels/search-viewmodel",
        "points-viewmodel": "./viewmodels/points-viewmodel",
        "points-model": "./models/points-model",
        "excercise-model": "./models/excercise-model",
        "word-model": "./models/word-model"
    }
});

requirejs(["main"]);