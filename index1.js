
var fs = require('fs');
// OBJECT CREATION
let obj =["base","target","dictionary"];
let doc ={};
obj.map(state=>{
	doc[state]={
		word_count : 10,
		mistake_count : 10,
		keyword_match : 10,
		string_match  : 10,
	} 
});
// READING BASE DOCUMENT
var input = fs.readFileSync('file.txt','UTF-8');
// READING TARGET DOCUMENT
var input1 = fs.readFileSync('file10.txt','UTF-8');

var natural = require('natural');
natural.PorterStemmer.attach();
var stem1 =input.tokenizeAndStem();
doc.base.word_count=stem1.length;
doc.base.mistake_count="NA";
doc.base.keyword_match="NA";
doc.base.string_match="NA";
var stem2 =input.tokenizeAndStem();
doc.target.word_count=stem2.length;
var tokenizer = new natural.WordTokenizer();
var text_array = tokenizer.tokenize(input);
console.log(text_array);

//READING DICTIONARY FILE
var dict= fs.readFileSync('dict.txt', 'utf8');

//TOKENISING THE DICTIONARY FILE
var dict_arr= tokenizer.tokenize(dict);
doc.dictionary.word_count=dict_arr.length;
doc.dictionary.mistake_count="NA";
doc.dictionary.keyword_match="NA";
doc.dictionary.string_match="NA";

//PERFORMING SPELLCHECK OF THE BASE DOCUMENT BY COMPARING WITH THE DICTIONARY FILE
var spellcheck=new natural.Spellcheck(dict_arr);
var mistakes=0;
for (var i = text_array.length - 1; i >= 0; i--) {
	if(!spellcheck.isCorrect(text_array[i]))
	{
		mistakes++;
	}
}
doc.target.mistake_count=mistakes;
console.log("number of mistakes are:"+mistakes);

//Extracting keywords
var stopword =require('stopword');
var keyword = stopword.removeStopwords(text_array);
console.log(keyword);

//KEYWORD MATCHING BETWEEN THE TWO DOCUMENTS
var count1=0;
for (var i = keyword.length - 1; i >= 0; i--) {
	for (var j = stem2.length - 1; j >= 0; j--)
	{
		if (keyword[i]===stem2[j])
			count1++;

	}};
console.log("Matching of keywords in the target document is (in percentage):"+((count1/keyword.length)*100));
doc.target.keyword_match=(count1/keyword.length)*100;
var string_match= natural.LevenshteinDistance(input,input1);
var percent =100-(string_match*100);
console.log("The string matching of the target document (in percent) is"+percent);
doc.target.string_match=percent;
let json = JSON.stringify(doc,null,2);
fs.writeFile('data.json',json,'utf8',(err)=>{
	if(error){
		console.log("error");
		return;
	}
console.log('success')
})
	
