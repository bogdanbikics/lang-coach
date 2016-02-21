
function WordModel(style, value) {
	var self = this;
	self.style = ko.observable(style);
	self.value = value;
	self.points = value.length;
}

function PointsModel(words) {
	var self = this;
	self.totalPoints = ko.computed(function() {
		var sum = 0;
		$.each(words(), function(pos, word) {
			sum += word.points;
		});
		return sum;
	}, self);
	self.pointsAchieved = ko.observable(0);
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

function ViewModel(text) {
	var self = this;
	//var text = "Российская Федерация Lorem Ipsum is simply dummy text, of the printing and typesetting industry. Lorem Ipsum: has been the industry's \"standard\" dummy text ever since the 1500's, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

	self.words = ko.observableArray(new TextConverter().textConverter(text, new Array()));
	self.wrongWords = ko.observableArray();
	self.checkWord = ko.observable("");
	self.pointsModel = new PointsModel(self.words);
	self.pointStatus = ko.computed(function() {
		return self.pointsModel.pointsAchieved() + " / " + self.pointsModel.totalPoints();
	})
	self.progress = ko.computed(function() {
		return self.pointsModel.pointsAchieved()/self.pointsModel.totalPoints()*100;
	})
	
	self.unique = function (list) {
    	var result = [];
    	$.each(list, function(i, e) {
        	if ($.inArray(e, result) == -1) result.push(e);
    	});
    	return result;
	}
	
	self.check = function () {
		var hit = false;
		$.each(self.words(), function (p, w) {
			if (self.checkWord().toLowerCase() === w.value.toLowerCase()) {
				if (w.style() != "word visible-word ") {
                    w.style("word visible-word ");
				    self.pointsModel.pointsAchieved(self.pointsModel.pointsAchieved() + w.points);
                }
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
}

$(document).ready(function () {
    $.getJSON("/admin/actions/read", function(data) {
       console.log("Hey" + data);
       var text = data[0].text;
	   ko.applyBindings(new ViewModel(text));
    });       
});
