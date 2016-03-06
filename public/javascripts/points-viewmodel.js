define('points-viewmodel', ['jquery', 'knockout'], function ($, ko) {

    function PointsViewModel(params) {
        var self = this;
        self.pointsModel = params.pointsModel;

        self.pointStatus = ko.computed(function () {
            return self.pointsModel.pointsAchieved() + " / " + self.pointsModel.totalPoints();
        });
        self.progress = ko.computed(function () {
            return self.pointsModel.pointsAchieved() / self.pointsModel.totalPoints() * 100;
        });
    }

    return PointsViewModel;
});