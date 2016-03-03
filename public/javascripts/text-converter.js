define(['knockout'], function (ko) {
    function WordModel(style, value) {
        var self = this;
        self.style = ko.observable(style);
        self.value = value;
        self.points = value.length;
    }


    function TextConverter() {
        var self = this;

        var searchFirstNonLetter = function (text) {
            return text.search(/[\d|[^\u0000-\uFFFF]]/g);
        }

        var addWordElements = function (text, array) {
            if (text.length > 0) {
                $.each(text.split(" "), function (pos, word) {
                    array.push(new WordModel("word hidden-word", word));
                });
            }
        }

        self.textConverter = function (text, array) {
            var index = searchFirstNonLetter(text);
            if (index == -1) {
                addWordElements(text, array);
            }
            else {
                addWordElements(text.substring(0, index), array);
                array.push(new WordModel("word default-visible-word", text.charAt(index)));
                self.textConverter(text.substring(index + 1), array)
            }
            return array;
        }
    }
    
    return TextConverter;
});