
define([
    'jquery',
    'knockout',
    'require-jade!../../views/widgets/search',
    'require-jade!../../views/widgets/points',
    'require-jade!../../views/widgets/excercise-list',
    'search-viewmodel',
    'points-viewmodel',
    'excercise-model'], function (
        $,
        ko,
        searchJade,
        pointsJade,
        excerciseListJade,
        SearchViewModel,
        PointsViewModel,
        ExcerciseModel
        ) {

        function ViewModel(data) {
            var self = this;
            
            self.excercises = ko.observableArray();
            data.forEach(function (e) {
                self.excercises.push(new ExcerciseModel(e));
            });

            self.excercise = ko.observable(self.excercises()[0]);
            
            self.onWordCheck = function (w) {
                if (w.style() != "word visible-word ") {
                    w.style("word visible-word ");
                    // w.addEventListener("animationend", function() { console.log("Hey"); }, false);
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
                ko.components.register('search-widget', {
                    viewModel: SearchViewModel,
                    template: searchJade()
                });
                ko.components.register('points-widget', {
                    viewModel: PointsViewModel,
                    template: pointsJade()
                });
                ko.components.register('excercise-list-widget', {
                    viewModel: ExcerciseListViewModel,
                    template: excerciseListJade()
                });  

                var viewModel = new ViewModel(data);
                ko.applyBindings(viewModel);
            });
        });
    });