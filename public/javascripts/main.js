
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

        function ViewModel(text) {
            var self = this;

            self.words = ko.observableArray(new TextConverter().textConverter(text, new Array()));

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

                var viewModel = new ViewModel(data[0].text);
                ko.applyBindings(viewModel);
            });

        });
    });