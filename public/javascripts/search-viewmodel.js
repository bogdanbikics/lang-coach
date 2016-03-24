define('search-viewmodel', ['jquery', 'knockout'], function($, ko) {
    function SearchViewModel(params) {
        var self = this;

        self.checkWord = ko.observable("");
        self.excercise = params.excercise;
        self.onSubmit = params.onSubmit;
        
        self.unique = function (list) {
            var result = [];
            $.each(list, function (i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        }

        self.check = function () {
            var hit = false;
            $.each(self.excercise().words(), function (p, w) {
                if (self.checkWord().toLowerCase() === w.value.toLowerCase()) {
                    self.onSubmit(w);
                    hit = true;
                }
            });
            if (!hit) {
                self.excercise().wrongWords.push(self.checkWord().toLowerCase());
                self.excercise().wrongWords(self.unique(self.wrongWords()));
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
