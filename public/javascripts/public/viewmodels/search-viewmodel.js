define('search-viewmodel', ['jquery', 'knockout'], function($, ko) {
    
    function PointLabelModel() {
        var self = this;

        self.wordCounter = ko.observable(0);
        self.actualWordPoint = ko.observable(0);

        self.achievedPoints = ko.computed(function () {
            var result = self.wordCounter() + ' X ' + self.actualWordPoint();
            return result;
        });
    };
    
    function SearchViewModel(params) {
        var self = this;

        self.checkWord = ko.observable("");
        self.excercise = params.excercise;
        self.onSubmit = params.onSubmit;
        self.pointLabelModels = params.pointLabelModels;
        
        self.unique = function (list) {
            var result = [];
            $.each(list, function (i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        }

        self.check = function () {
            var hit = false;
            var pointModel = new PointLabelModel();
            $.each(self.excercise().words(), function (p, w) {
                if (self.checkWord().toLowerCase() === w.value.toLowerCase()) {
                    self.onSubmit(w);
                    hit = true;

                    pointModel.wordCounter(pointModel.wordCounter() + 1);
                    pointModel.actualWordPoint(w.points);
                }
            });
            
            if(hit) {
                self.pointLabelModels.push(pointModel);
            }
            else {
                self.excercise().wrongWords.push(self.checkWord().toLowerCase());
                self.excercise().wrongWords(self.unique(self.excercise().wrongWords()));
                self.excercise().wrongWords.sort();
            }
            self.checkWord("");
        }

        self.filteredItems = ko.computed(function () {
            var filter = self.checkWord().toLowerCase();
            if (!filter) {
                return self.excercise().wrongWords();
            } else {
                return ko.utils.arrayFilter(self.excercise().wrongWords(), function (item) {
                    return item.toLowerCase().startsWith(filter);
                });
            }
        }, self);
    };
    
    return SearchViewModel; 
});
