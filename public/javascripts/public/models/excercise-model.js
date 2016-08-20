define('excercise-model', ['jquery', 'knockout', 'points-model', 'text-converter'], 
    function ($, ko, PointsModel, TextConverter) {

        function ExcerciseModel(data) {
            var self = this;
            self.title = data.title;
            console.log(data.text);
            self.words = ko.observableArray(new TextConverter().textConverter(data.text, new Array()));
            self.wrongWords = ko.observableArray();
            self.pointsModel = new PointsModel(self.words);
        }

        return ExcerciseModel;
});