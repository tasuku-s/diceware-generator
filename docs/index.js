var wordMap = {};

function getKey() {
	var id = '';
	for (var i = 0; i < 5; i++) {
		id += Math.floor(Math.random() * (7 - Number.EPSILON - 1) + 1);
	}
	return id;
}

function generate(wordCount) {
	var ret = [];
	for (var i = 0; i < wordCount; i++) {
		//ret.push(wordMap[getKey()]);
		ret.push(wordMap[getKey()]);
	}
	return ret.join(' ');
}

function fetchWordMap() {
  return fetch('diceware.wordlist.asc.txt')
    .then(function(res) { return res.text() })
	 .then(function(text) {
		 wordMap = text.split('\n')
		 	.filter(function(line) { return line.match(/^[1-6]{5}/) })
			.map(function(line) { return line.split(/\s+/) })
			.reduce(function(r, v) {
				r[v[0]] = v[1];
				return r;
			}, {});
	 });
}

function find(id) {
	return document.getElementById(id);
}

function getInteger(input) {
	var value = parseInt(input.value);
	if (value != value) {
		alert(input.placeholder + 'が数値ではありません');
		throw new Error();
	}
	return value;
}

var totalCountInput = find('total-count');
var wordCountInput = find('word-count');
var generateBtn = find('generate-btn');
var resultOutput = find('result');

fetchWordMap().then(function() {

  generateBtn.addEventListener('click', function(e) {
  	var length = getInteger(totalCountInput);
  	var wordCount = getInteger(wordCountInput);
  
     resultOutput.innerText = '';
  
  	for (var i = 0; i < length; i++) {
  		resultOutput.innerText += generate(wordCount) + '\n';
  	}
  });

});
