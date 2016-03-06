
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
        searchViewModel,
        pointsViewModel,
        TextConverter
        ) {

        function ViewModel(excercise) {
            var self = this;
            
            self.title = ko.observable(excercise.title);
            self.words = ko.observableArray(new TextConverter().textConverter(excercise.text, new Array()));

            self.onWordCheck = function (w) {
                if (w.style() != "word visible-word ") {
                    w.style("word visible-word ");
                    pointsViewModel.pointsModel.pointsAchieved(pointsViewModel.pointsModel.pointsAchieved() + w.points);
                }
            };
        }

        $(document).ready(function () {
            $.getJSON("/admin/actions/read", function (data) {

                var searchHtml = searchJade();
                ko.components.register('search-widget', {
                    viewModel: searchViewModel,
                    template: searchHtml
                });

                var pointsHtml = pointsJade();
                ko.components.register('points-widget', {
                    viewModel: pointsViewModel,
                    template: pointsHtml
                });

                var viewModel = new ViewModel(data[0]);
                ko.applyBindings(viewModel);
            });

        });
    });