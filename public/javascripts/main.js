
define([
    'jquery',
    'knockout',
    'require-jade!../views/widgets/search',
    'require-jade!../views/widgets/points',
    'require-jade!../views/widgets/excercise-list',
    'search-viewmodel',
    'points-viewmodel',
    'text-converter'], function (
        $,
        ko,
        searchJade,
        pointsJade,
        excerciseListJade,
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

        function ExcerciseModel(data) {
            var self = this;
            self.title = data.title;
            console.log(data.text);
            self.words = ko.observableArray(new TextConverter().textConverter(data.text, new Array()));
            self.wrongWords = ko.observableArray();
            self.pointsModel = new PointsModel(self.words);
        }

        function ViewModel(data) {
            var self = this;
            
            self.excercises = ko.observableArray();
            data.forEach(function (e) {
                console.log('pushing data');
                self.excercises.push(new ExcerciseModel(e));
            });

            self.excercise = ko.observable(self.excercises()[0]);
            
            self.onWordCheck = function (w) {
                if (w.style() != "word visible-word ") {
                    w.style("word visible-word ");
                    self.excercise().pointsModel.pointsAchieved(self.excercise().pointsModel.pointsAchieved() + w.points);
                }
            };
            
            self.selectExcercise = function(currentExcercise) {
                self.excercise(currentExcercise);
            };
        }

        function ExcerciseListViewModel(params) {
            var self = this;
            self.excerciseList = params.excerciseList;
            self.onSelect = params.onSelect;
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

                var excerciseListHtml = excerciseListJade();
                ko.components.register('excercise-list-widget', {
                    viewModel: ExcerciseListViewModel,
                    template: excerciseListHtml
                });  

                var viewModel = new ViewModel(data);
                ko.applyBindings(viewModel);
            });
        });
    });