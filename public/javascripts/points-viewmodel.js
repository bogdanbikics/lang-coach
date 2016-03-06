define('points-viewmodel', ['jquery', 'knockout'], function ($, ko) {
    function PointsModel(words) {
        var self = this;
        self.totalPoints = ko.computed(function () {
            var sum = 0;
            $.each(words(), function (pos, word) {
                sum += word.points;
            });
            return sum;
        }, self);
        self.pointsAchieved = ko.observable(0);
    }

    function PointsViewModel(params) {
        var self = this;
        self.words = params.words;
        self.pointsModel = new PointsModel(self.words);

        self.pointStatus = ko.computed(function () {
            return self.pointsModel.pointsAchieved() + " / " + self.pointsModel.totalPoints();
        });
        self.progress = ko.computed(function () {
            return self.pointsModel.pointsAchieved() / self.pointsModel.totalPoints() * 100;
        });
    }

    return PointsViewModel;
});