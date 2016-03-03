define('search', ['jquery', 'knockout'], function($, ko) {
    function SearchViewModel(params) {
        var self = this;

        self.checkWord = ko.observable("");
        self.wrongWords = ko.observableArray();
        
        self.onSubmit = params.onSubmit;
        self.words = params.correctWords;
        
        self.unique = function (list) {
            var result = [];
            $.each(list, function (i, e) {
                if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        }

        self.check = function () {
            var hit = false;
            $.each(self.words(), function (p, w) {
                if (self.checkWord().toLowerCase() === w.value.toLowerCase()) {
                    console.log(self.onSubmit)
                    self.onSubmit(w);
                    hit = true;
                }
            });
            if (!hit) {
                self.wrongWords.push(self.checkWord().toLowerCase());
                self.wrongWords(self.unique(self.wrongWords()));
                self.wrongWords.sort();
            }
            self.checkWord("");
        }

        self.filteredItems = ko.computed(function () {
            var filter = self.checkWord().toLowerCase();
            if (!filter) {
                return self.wrongWords();
            } else {
                return ko.utils.arrayFilter(self.wrongWords(), function (item) {
                    return item.toLowerCase().startsWith(filter);
                });
            }
        }, self);
    };
    
    return SearchViewModel; 
});