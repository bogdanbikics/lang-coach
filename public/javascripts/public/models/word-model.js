define(['knockout'], function (ko) {   
    function WordModel(style, value) {
        var self = this;
        self.style = ko.observable(style);
        self.value = value;
        self.points = value.length;
    }

    return WordModel;
});