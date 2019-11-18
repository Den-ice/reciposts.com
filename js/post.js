document.getElementById("searchText").value = "Search Recipes";

//This Function encodes the submitted data as base64 for upload through JSON object
function encodeImageFileAsURL(element) {
	var file = element.files[0];
	var reader = new FileReader();
	reader.onloadend = function() {
	var base64Src = reader.result;
	document.getElementById("imgImport").src = base64Src;
	document.getElementById("postImage").src = base64Src;
	}
  reader.readAsDataURL(file);
}

//Global variables used to track the amount of tag and Ingredients and update the html id accordingly 
var countTag = 0;
var countIngred = 0;

function appendFunc(elem) {
	var origElem = elem.parentElement;
	if(origElem.id.includes("appendIngredContainer"))
		{origElem = elem.parentElement.parentElement;}

    var patt1 = /[0-9][0-9]?[0-9]?/g;
	var nums = origElem.id.match(patt1);
    var modElem = origElem.id.replace(nums, '');
	var clnElem = origElem.cloneNode(true);
	if(modElem == "tagContainer"){
		clnElem.id = modTag + ++countTag;
	}
	else{
		clnElem.id = modElem + ++countIngred;
	}
	$(clnElem).insertAfter(origElem);
}
//Holds JSON object data
var json = [];

//Converts input data into a JSON string and sends it to the server
const subJSON = (ev)=>{
	ev.preventDefault();//Stop default submit event
		
	var jsonTag = [];
	var jsonIngred =[];
	var diffsel;
    var date = new Date();
    var ID = Date.parse(date);

    //Gather values for all tag inputs
    for(var i=0; i<document.getElementById("tagRepeat").children.length; i++) {
		var temp = document.getElementById("tagContainer" + i);
		jsonTag.push(temp.children[1].value);
	}

    //Gather values for all Ingredient and Amount inputs and place them in an array. Aggregate smaller arrays into one large array 
	for(var i=0; i<document.getElementById("ingredAmtRepeat").children.length; i++) {
		var tempAr = [];
		var temp = document.getElementById("ingredAmtContainer" + i);
		tempAr.push(temp.children[0].children[0].children[1].value);
		tempAr.push(temp.children[0].children[1].children[1].value);
		jsonIngred.push(tempAr);
    }

    //Get difficulty section and place it in a variable.
	for(var i=1; i<4; i++) {
		var temp = document.getElementById(i).getAttribute("stroke-width");
		if(temp != 0)
		{diffsel = i;}
    }

    //Build JSON object
	let obj = {
		postID: ID,
		imageFile: document.getElementById("imgImport").src,
		description: document.getElementById("desc").value,
		directions: document.getElementById("Instruc").value,
		foodtitle: document.getElementById("recititle").value,
		tags: jsonTag,
		hours : document.getElementById("hour1").value,
		min : document.getElementById("min1").value,
		difficulty: diffsel,
		ingredients: jsonIngred,
    }
	json.push(obj);

    //Reset form
	document.forms[0].reset();
	document.getElementById("postImage").src = "svg/emptyImage.svg";
	alert("Your form has been successfully submitted.");
	//localStorage.setItem("MyPostList", JSON.stringify(json));

    //Send data to the server
	const xhr = new XMLHttpRequest();
		
	xhr.open("POST" , "JSON/" +ID+".json");
	xhr.setRequestHeader("Content-Type" , "application/json");
	xhr.send(JSON.stringify(json));
}

//Execute event listner on buttonPost	
document.addEventListener('DOMContentLoaded',()=>{
	document.getElementById('buttonPost').addEventListener('click',subJSON);
});
			
