
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

        function ViewModel(excercises) {
            var self = this;

            self.excercises = ko.observableArray(excercises);
            self.excercise = ko.observable(self.excercises()[0]);
            self.title = ko.observable(self.excercise().title);
            self.words = ko.observableArray(new TextConverter().textConverter(self.excercise().text, new Array()));
            self.pointsModel = new PointsModel(self.words);
            
            self.onWordCheck = function (w) {
                if (w.style() != "word visible-word ") {
                    w.style("word visible-word ");
                    self.pointsModel.pointsAchieved(self.pointsModel.pointsAchieved() + w.points);
                }
            };
            
            self.selectExcercise = function(currentExcercise) {
                self.excercise(currentExcercise);
                self.words(new TextConverter().textConverter(self.excercise().text, new Array()));
                self.title(self.excercise().title);
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

                var viewModel = new ViewModel(data);
                ko.applyBindings(viewModel);
            });

        });
    });