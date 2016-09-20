requirejs.config({
    "baseUrl": "javascripts/admin/",
    "paths": {
        "jquery": "../../bower_components/jquery/dist/jquery.min",
        "knockout": "../../bower_components/knockout/dist/knockout",
        "require-jade": "../../../bower_components/require-jade/jade",
        "excercise-model": "../public/models/excercise-model",
        "points-model": "../public/models/points-model",
        "word-model": "../public/models/word-model",
        "text-converter": "../public/utils/text-converter",
        "xregexp": "../../bower_components/xregexp/xregexp-all"
    }
});

requirejs(["main"]);