define('points-model', ['jquery', 'knockout'], function ($, ko) {

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

    return PointsModel;
});