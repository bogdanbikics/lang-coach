define([
    'jquery',
    'knockout',
    'require-jade!../../views/widgets/excercise-list'],
    function ($, ko, excerciseListJade) {

        function ViewModel(data) {
            self = this;
            self.excercises = ko.observableArray();

            self.updateExcercises = function(jsonData) {
                self.excercises([]);
                $.each(jsonData, function (i, d) {
                    self.excercises.push(d);
                });
            }
            
            self.updateExcercises(data);
            self.excercise = ko.observable(self.excercises()[0]);

            self.selectExcercise = function(currentExcercise) {
                self.excercise(currentExcercise);
            };

            self.addNewElement = function () {
                var newExcercise = { id: '', text: '', title: 'New Excercise' };
                $.post("admin/actions/insert", newExcercise, function (returnedData) {
                    $.getJSON("admin/actions/read", function (data) {
                        self.updateExcercises(data);
                        self.excercise(newExcercise);
                    });
                });
            };
        }

        function ExcerciseListViewModel(params) {
            var self = this;
            self.excerciseList = params.excerciseList;
            self.onSelect = params.onSelect;
        }

        $(document).ready(function () {
            ko.components.register('excercise-list-widget', {
                viewModel: ExcerciseListViewModel,
                template: excerciseListJade()
            });

            $.getJSON("admin/actions/read", function (data) {
                console.log(data);
                var viewModel = new ViewModel(data);
                ko.applyBindings(viewModel);
            });
        });
    });