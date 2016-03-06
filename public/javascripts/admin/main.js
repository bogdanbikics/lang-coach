define([
    'jquery',
    'knockout'],
    function ($, ko) {

        function ViewModel(data) {
            self = this;
            self.excercises = ko.observableArray();
            $.each(data, function(i, d) {
                self.excercises.push(d);
            });
        }

        $(document).ready(function () {
            $.getJSON("/admin/actions/read", function (data) {
                console.log(data);
                var viewModel = new ViewModel(data);
                ko.applyBindings(viewModel);
            });
        });
    });