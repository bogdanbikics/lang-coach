requirejs.config({
    "baseUrl": "javascripts/admin/",
    "paths": {
        "jquery": "../../bower_components/jquery/dist/jquery.min",
        "knockout": "../../bower_components/knockout/dist/knockout",
    }
});

requirejs(["main"]);