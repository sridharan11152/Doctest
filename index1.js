
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
//console.log(input);
var natural = require('natural');
natural.PorterStemmer.attach();
var stem1 =input.tokenizeAndStem();
doc.base.word_count=stem1.length;
doc.base.mistake_count="NA";
doc.base.keyword_match="NA";
doc.base.string_match="NA";


//console.log(stem1);
var stem2 =input.tokenizeAndStem();
doc.target.word_count=stem2.length;
//console.log(stem2);

//var textract = require('textract');

var tokenizer = new natural.WordTokenizer();

var text_array = tokenizer.tokenize(input);
//var file1 = textract path/to/example.docx;8);
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
	//nouns={};


//Extracting keywords from the document\nouns={};
/*nouns=[];
count1=0;
var WordPOS = require('wordpos');
wordpos = new WordPOS();
res=wordpos.getPOS(stem1, function(result){
 //nouns[0]=result[0]; 
 //var count1=0;
//console.log(result);
//.then( result => {
      //return result;
      console.log(result);
    }
//return result;
/*for (var i = result.length - 1; i >= 0; i--) {
	for (var j = stem2.length - 1; j >= 0; j--)
	{
		if (nouns[i]===stem2[j])
			count1++;

	}}*/
//console.log(count/result.length);



//);
//console.log(res);
//nouns= wordpos.getNouns.result;
//console.log(nouns);
//var nouns;
