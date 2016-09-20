define([
    'jquery',
    'knockout',
    'excercise-model',
    'require-jade!../../views/widgets/excercise-list'],
    function ($, ko, ExcerciseModel, excerciseListJade) {

        function ViewModel(data) {
            self = this;
            self.excercises = ko.observableArray();
            if (data.length == 0) {
                self.addNewElement();
            }
            else {
                $.each(data, function (i, d) {
                    self.excercises.push(new ExcerciseModel(d));
                });
            }
            self.excercise = ko.observable(self.excercises()[0]);

            self.addNewElement = function () {
                var newExcerciseData = { id: '', text: '', title: 'New Excercise' };
                var newExcercise = new ExcerciseModel(newExcerciseData);
                self.excercises.push(newExcercise);
                $.post("admin/actions/insert", newExcercise, function (returnedData) {
                    var data = JSON.parse(returnedData);
                    newExcercise.id = data.id;
                });
            };

            self.updateExcercise = function () {
                $.post("admin/actions/update", self.excercise(), function(returnedData) {
                    console.log(returnedData);
                });
            };



            self.selectExcercise = function (currentExcercise) {
                self.excercise(currentExcercise);
            };

            self.deleteExcercise = function () {
                $.post("admin/actions/delete", self.excercise(), function(returnedData) {
                    self.excercises.remove(self.excercise());
                    console.log(returnedData);
                });
            }
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