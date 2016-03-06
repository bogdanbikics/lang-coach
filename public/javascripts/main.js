
define([
    'jquery',
    'knockout',
    'require-jade!../views/widgets/search',
    'require-jade!../views/widgets/points',
    'search-viewmodel',
    "points-viewmodel",
    'text-converter'], function (
        $,
        ko,
        searchJade,
        pointsJade,
        SearchViewModel,
        PointsViewModel,
        TextConverter
        ) {

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

        function ViewModel(excercise) {
            var self = this;

            self.title = ko.observable(excercise.title);
            self.words = ko.observableArray(new TextConverter().textConverter(excercise.text, new Array()));
            self.pointsModel = new PointsModel(self.words);

            self.onWordCheck = function (w) {
                if (w.style() != "word visible-word ") {
                    w.style("word visible-word ");
                    self.pointsModel.pointsAchieved(self.pointsModel.pointsAchieved() + w.points);
                }
            };
        }

        $(document).ready(function () {
            $.getJSON("/admin/actions/read", function (data) {

                var searchHtml = searchJade();
                ko.components.register('search-widget', {
                    viewModel: SearchViewModel,
                    template: searchHtml
                });

                var pointsHtml = pointsJade();
                ko.components.register('points-widget', {
                    viewModel: PointsViewModel,
                    template: pointsHtml
                });

                var viewModel = new ViewModel(data[0]);
                ko.applyBindings(viewModel);
            });

        });
    });