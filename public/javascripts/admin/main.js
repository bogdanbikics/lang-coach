define([
    'jquery',
    'knockout',
    'require-jade!../../views/widgets/excercise-list'],
    function ($, ko, excerciseListJade) {

        function ViewModel(data) {
            self = this;
            self.excercises = ko.observableArray();

            self.addNewElement = function () {
                var newExcercise = { id: '', text: '', title: 'New Excercise' };
                self.excercises.push(newExcercise);
                $.post("admin/actions/insert", newExcercise, function (returnedData) {
                    var data = JSON.parse(returnedData);
                    newExcercise.id = data.id;
                });
            };

            self.updateExcercise = function () {
                console.log(ko.toJSON(self.excercise()));
                $.post("admin/actions/update", self.excercise(), function(returnedData) {
                    console.log(returnedData);
                });
            };

            if (data.length == 0) {
                self.addNewElement();
            }
            else {
                $.each(data, function (i, d) {
                    self.excercises.push(d);
                });
            }

            self.excercise = ko.observable(self.excercises()[0]);

            self.selectExcercise = function (currentExcercise) {
                self.excercise(currentExcercise);
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