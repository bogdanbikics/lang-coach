define(['knockout'], function (ko) {   
    function WordModel(style, value, points) {
        var self = this;
        self.style = ko.observable(style);
        self.value = value;
        self.points = points;
    }

    return WordModel;
});