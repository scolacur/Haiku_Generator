/*This program will parse the
CMU Dictionary file and randomly 
generate a haiku*/

/*This program will parse the
CMU Dictionary file and randomly 
generate a haiku*/

var fs = require ('fs');

/*This array organizes our words by syllable count.
It contains 8 elements so that the index
corresponds to the syllable count, eg. sylArr[3] 
contains all the words with 3 syllables.
sylArr[0] will remain empty.*/
var sylArr = [["0 syllables"],[],[],[],[],[],[],[]];

// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')
fs.readFile('cmudict.txt', function(err, data) {
    if(err) {
    	return console.log(err);
    }

    var lines = data.toString().split("\n")
    lines.pop(); //gets rid of the blank line in the document

    lines.forEach(function(line) {
    	getSylCount(line);
  	});
    ;
  	//generateHaiku(sylArr);
    generateForm();
});


/*This function accepts an arpabet-formatted line of text,
figures out its syllable count, and adds the word to the 
appropriate sub-array of sylArray*/
function getSylCount(line){
    var line_split = line.split("  ");
    var word = line_split[0];
  	var containsNum = line_split[1].match(/\d/g);
  
    if (containsNum){
    	var sylCount = containsNum.length;

	    if (sylCount<8){  
          word = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
	        sylArr[sylCount].push(word);
	    }
	    //we don't care about words with more than 7 syllables
    }
}

/*gRE = getRandomElement. This function takes 
an array (a subarray of sylArr)
and returns a random element in that array*/
function gRE(arr) {
    var e = Math.floor(Math.random() * arr.length);
    //console.log("Index selected: " + e);
    //console.log("Random word: " + arr[e]);
    return arr[e];
}

//This function accepts an array of arrays
//and generates a haiku
function generateHaiku(a){
   var haiku = [gRE(a[5]), gRE(a[7]), gRE(a[5])];
   haiku = haiku.join("\n");
   console.log(haiku);
   return haiku;
}


function gREPlus(sylArray, num){
  var e = Math.floor(Math.random() * sylArr[num].length);
  return sylArr[num][e];
}

/*This function accepts the syllable array and an array which 
dictates the haiku form and generates a haiku of that form*/
function generateHaikuPlus(sylArray, formArray){
  //for each element of the formArray (there will always be 3)
  var haiku = [[],[],[]];

    for (var i = 0; i<3; i++){
      //for each element of that sub-array (this # will change)
  
        for (var j=0; j<formArray[i].length; j++){
          //This is the line that makes it all happen
            haiku[i].push(gREPlus(sylArray, formArray[i][j]));
        }

      haiku[i] = haiku[i].join(" ").capitalize();
    }
    haiku = haiku.join("\n");
    console.log(haiku);
    return haiku;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/*This function generates a 2x3 array, formArr, where 
the elements of formArr[i] always add up to a particular sum, eg.
formArr[0].sum() = 5;
formArr[1].sum() = 7;
formArr[2].sum() = 5; assuming we defined a sum function.

Pros: In theory, this algorithm allows for the greatest possible 
variety within the traditional 5-7-5 haiku format.

Cons: In practice, I learned that this method generates a lot of
forms that are almost guaranteed to not make sense. For example if
the form of the second line is [5,1,1]. Perhaps maximizing syllabic
variety is not the best way to generate good poetry.

We could build in some code that re-runs this function
if it finds any forms that are likely to be nonsensical, 
but for now this is fine.*/

function generateForm(){
  var formArr = [[],[],[]]; //This array will determine the form of our haiku

  formArr[0][0] = Math.floor(Math.random() * 5) + 1;
  if (formArr[0][0] !=5){
    formArr[0][1] = 5 - formArr[0][0];
  }
  
  formArr[1][0] = Math.floor(Math.random() * 7 + 1);
  if (formArr[1][0] != 7){
     formArr[1][1] = Math.floor(Math.random() * (7-formArr[1][0]) + 1);

     if (formArr[1][0] + formArr[1][1] !=7){
      formArr[1][2] = 7 - (formArr[1][0] + formArr[1][1]);
     }
  }
 
  formArr[2][0] = Math.floor(Math.random() * 5) + 1;
  if (formArr[2][0] !=5){
    formArr[2][1] = 5 - formArr[2][0];
  }
  generateHaikuPlus(sylArr, formArr);
}


/*This line was initially in my getSylCount function because
I thought that the last 4 lines in the file were causing an error,
 so i had built this test. keeping it here only cause it took me 
 so long to make this regex work. 
var startsWithLetter = (/^\w/.test(line_split[0]));*/

