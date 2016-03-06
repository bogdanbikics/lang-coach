
define([
    'jquery',
    'knockout',
    'require-jade!../views/widgets/search',
    'search',
    'text-converter'
    ], function (
        $,
        ko,
        searchJade, 
        searchJs,
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

        function ViewModel(text) {
            var self = this;

            self.words = ko.observableArray(new TextConverter().textConverter(text, new Array()));
            self.pointsModel = new PointsModel(self.words);
            
            self.pointStatus = ko.computed(function () {
                return self.pointsModel.pointsAchieved() + " / " + self.pointsModel.totalPoints();
            });
            self.progress = ko.computed(function () {
                return self.pointsModel.pointsAchieved() / self.pointsModel.totalPoints() * 100;
            });
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
                    viewModel: searchJs,
                    template: searchHtml
                });
                console.log(data[0]);
                var viewModel = new ViewModel(data[0].text);
                ko.applyBindings(viewModel);
            });

        });
    });