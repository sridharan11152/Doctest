
var fs = require('fs');


var input = fs.readFileSync('file.txt','UTF-8');
var input1 = fs.readFileSync('file10.txt','UTF-8');
//console.log(input);
var natural = require('natural');
natural.PorterStemmer.attach();
var stem1 =input.tokenizeAndStem();
console.log(stem1);
var stem2 =input.tokenizeAndStem();
console.log(stem2);

//var textract = require('textract');

/*var tokenizer = new natural.WordTokenizer();

var text_array = tokenizer.tokenize(input);
//var file1 = textract path/to/example.docx;8);
console.log(text_array);


//var fs= require('fs')
var dict= fs.readFileSync('dict.txt', 'utf8');
//var dict_token= new natural.WordTokenizer();
var dict_arr= tokenizer.tokenize(dict);
//console.log("dictionary is: "+dict_arr);


var spellcheck=new natural.Spellcheck(dict_arr);

var mistakes=0;

for (var i = text_array.length - 1; i >= 0; i--) {
	if(!spellcheck.isCorrect(text_array[i]))
	{
		mistakes++;
	}
}
nouns={};

console.log("number of mistakes are:"+mistakes);*/
//Extracting keywords from the document\nouns={};
nouns=[];
count1=0;
var WordPOS = require('wordpos');
wordpos = new WordPOS();
res=wordpos.getNouns(stem1, function(result){
 //nouns[0]=result[0]; 
 //var count1=0;
//console.log(result);
.then( result => {
      return result;
    }
//return result;
/*for (var i = result.length - 1; i >= 0; i--) {
	for (var j = stem2.length - 1; j >= 0; j--)
	{
		if (nouns[i]===stem2[j])
			count1++;

	}}*/
//console.log(count/result.length);



});
console.log(res);
//nouns= wordpos.getNouns.result;
//console.log(nouns);
//var nouns;
