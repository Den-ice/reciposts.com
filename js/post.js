document.getElementById("searchText").value = "Search Recipes";

function appendFunc() {
var origTag = document.getElementById("tagContainer");
var clnTag = origTag.cloneNode(true);

var col = document.getElementById("col2");
  col.insertBefore(clnTag, col.childNodes[10]);
 
}

let json = [];

	const subJSON = (ev)=>{
		ev.preventDefault();
		let obj = {
			imageFile: document.getElementById("imgImport").value,
			foodtitle: document.getElementById("recititle").value,
			hours : document.getElementById("hour1").value,
			min : document.getElementById("min1").value,
			description: document.getElementById("desc").value,
			directions: document.getElementById("Instruc").value,
			tags: document.getElementsByName("tag").value,
			ingredients: document.getElementsByName("ingredients").value
		}
		json.push(obj);
		document.forms[0].reset();
		
		localStorage.setItem("MyPostList", JSON.stringify(json))
	}
	document.addEventListener('DOMContentLoaded',()=>{
		document.getElementById('buttonPost').addEventListener('click',subJSON);
	});
			