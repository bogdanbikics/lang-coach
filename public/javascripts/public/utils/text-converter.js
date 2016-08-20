define(['knockout', 'xregexp', 'word-model'], function (ko, XRegExp, WordModel) {
    function TextConverter() {
        var self = this;

        var searchFirstNonLetter = function (text) {
            XRegExp.install('astral');
            var regex = XRegExp("\\PL");
            var nonLetter = XRegExp.match(text, regex);
            
            return text.indexOf(nonLetter);
        }

        var addWordElements = function (text, array) {
            if (text.length > 0) {
                $.each(text.split(" "), function (pos, word) {
                    array.push(new WordModel("word hidden-word", word, word.length));
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
                array.push(new WordModel("word default-visible-word", text.charAt(index), 0));
                self.textConverter(text.substring(index + 1), array)
            }
            return array;
        }
    }
    
    return TextConverter;
});