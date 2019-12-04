
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

function moveFilterClick(){
    moveFilter
    if (document.getElementById("moveFilter").style.right == "35%"){
        document.getElementById("moveFilter").style.right = "0%";
        document.getElementById("moveFilter").innerHTML = "<<";
                
        document.getElementById("Filter").style.width = "0%";


    } else {
        document.getElementById("moveFilter").style.right = "35%";
        document.getElementById("moveFilter").innerHTML = ">>";
        
        document.getElementById("Filter").style.right = "0%";

        document.getElementById("Filter").style.width = "35%";

    }
}

var difficulty = [false,false,false,false];

document.getElementById("1").onclick = function (e) {
    console.log(difficulty[0]);

    if (!difficulty[0]){
        document.getElementById('1').setAttribute("stroke-width", "3");
        difficulty[0] = true;
    }else {
        document.getElementById('1').setAttribute("stroke-width", "0");
        difficulty[0] = false;
    }
   
};

document.getElementById("2").onclick = function (e) {
           if (!difficulty[1]){
               document.getElementById('2').setAttribute("stroke-width", "3");
               difficulty[1] = true;
           } else {
               document.getElementById('2').setAttribute("stroke-width", "0");
               difficulty[1] = false;
           }

};
document.getElementById("3").onclick = function (e) {
       if (!difficulty[2]){
           document.getElementById('3').setAttribute("stroke-width", "3");
           difficulty[2] = true;
       } else {
           document.getElementById('3').setAttribute("stroke-width", "0");
           difficulty[2] = false;
       }
};

document.getElementById("4").onclick = function (e) {
           if (!difficulty[3]){
               document.getElementById('4').setAttribute("stroke-width", "3");
               difficulty[3] = true;
           } else {
               document.getElementById('4').setAttribute("stroke-width", "0");
               difficulty[3] = false;
           }
};

$(document).ready(function(){
                  var searchInfo = getUrlVars();
                  if (searchInfo["foodTitle"] != null){
                    document.getElementById("searchText").value = searchInfo["foodTitle"]
                  }
                  if (searchInfo["tags"] != null){
                    filterTags = searchInfo["tags"]
                  }
                  if (searchInfo["difficulty"] != null){
                    difficulty = searchInfo["difficulty"]
                  }
                  if (searchInfo["min"] != null){
                    min = searchInfo["min"]
                  }
                  if (searchInfo["timeCompare"] != null){
                    timeCompare = searchInfo["timeCompare"]
                  }
                  if (searchInfo["must"] != null){
                    filterMUSTHave = searchInfo["must"]
                  }
                  if (searchInfo["cannot"] != null){
                    filterCANNOTHave = searchInfo["cannot"]
                  }
                  searchClick()
                  
});

function searchClick() {

    var min = Math.ceil(Number(document.getElementById("hour").value) * 60 +  (Number(document.getElementById("min").value)))
                        
    var myJSON  = JSON.stringify({
        "foodTitle": document.getElementById("searchText").value,
        "tags" : filterTags,
        "difficulty" : difficulty,
        "min" : min,
        "timeCompare" : timeCompare,
        "must": filterMUSTHave,
        "cannot": filterCANNOTHave
    });
             
            
    $.ajax({
        type: "POST",
        url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Recipost/Search",
        crossDomain: true,
        dataType: 'json',
        headers: {"Content-Type" : "application/json"},
        dataType: 'json',
        data:myJSON ,
        success: function(response) {
          recipostsList = JSON.parse(response.body).reciposts;
           
          goToPage(1);
           
        },
        error: function(response) {
          console.log(response);
        },
    });
    
    
    
}


var filterTags = [];
function addTags() {
    
    if (document.getElementById("addTagTxt").value == ""){
        return;
    }
    
    var index = filterTags.indexOf(document.getElementById("addTagTxt").value.toLowerCase() )
    
    if (index != -1 ){
        return;
    }
    
    
    filterTags.push(document.getElementById("addTagTxt").value.toLowerCase())
    
    document.getElementById("Tagslist").innerHTML = "";
    
    var html = ""
    for (var i =0; i < filterTags.length; i++){
        
        html += '<div id = "tagTxt" style = "top:'+i * 7+'vw;">'+filterTags[i]+'</div>\
        <div id="deleteTagButtion" style = "top:'+i * 7+'vw;" onclick="deleteTags('+i +')">x</div>'
        
    }
    document.getElementById("Tagslist").innerHTML = html;

    
}

function deleteTags(index) {
    filterTags.splice(index, 1);
    var html = ""
       for (var i =0; i < filterTags.length; i++){
           
           html += '<div id = "tagTxt" style = "top:'+i * 7+'vw;">'+filterTags[i]+'</div>\
           <div id="deleteTagButtion" style = "top:'+i * 7+'vw;" onclick="deleteTags('+i +')">x</div>'
           
       }
       document.getElementById("Tagslist").innerHTML = html;

}

var filterCANNOTHave = [];

function addCANNOTHave() {
    
    if (document.getElementById("addCANNOTTxt").value == ""){
        return;
    }
    
    var index1 = filterMUSTHave.indexOf(document.getElementById("addCANNOTTxt").value.toLowerCase() )
    var index2 = filterCANNOTHave.indexOf(document.getElementById("addCANNOTTxt").value.toLowerCase() )
    
    if (index1 != -1 || index2 != -1){
        return;
    }
    
    filterCANNOTHave.push(document.getElementById("addCANNOTTxt").value.toLowerCase() )
    
    document.getElementById("CANNOTList").innerHTML = "";
    
    var html = ""
    for (var i =0; i < filterCANNOTHave.length; i++){
        
        html += '<div id = "IngredientTxt" style = "top:'+ (i * 4 + 1.5)+'vw;">'+filterCANNOTHave[i]+'</div>\
        <div id="deleteIngredientButtion" style = "top:'+i * 4+'vw;" onclick="deleteCANNOTHave('+i +')">x</div>'
        
    }
    document.getElementById("CANNOTList").innerHTML = html;

    
}

function deleteCANNOTHave(index) {
    filterCANNOTHave.splice(index, 1);
    var html = ""
       document.getElementById("CANNOTList").innerHTML = "";
       
       var html = ""
       for (var i =0; i < filterCANNOTHave.length; i++){
           
           html += '<div id = "IngredientTxt" style = "top:'+ (i * 4 + 1.5)+'vw;">'+filterCANNOTHave[i]+'</div>\
           <div id="deleteIngredientButtion" style = "top:'+i * 4+'vw;" onclick="deleteCANNOTHave('+i +')">x</div>'
           
       }
       document.getElementById("CANNOTList").innerHTML = html;

}


var filterMUSTHave = [];

function addMUSTHave() {
    
    if (document.getElementById("addMustHaveTxt").value == ""){
        return;
    }
    
    var index1 = filterMUSTHave.indexOf(document.getElementById("addMustHaveTxt").value.toLowerCase() )
    var index2 = filterCANNOTHave.indexOf(document.getElementById("addMustHaveTxt").value.toLowerCase() )

    if (index1 != -1 || index2 != -1){
        return;
    }
    
    filterMUSTHave.push(document.getElementById("addMustHaveTxt").value.toLowerCase() )
    
    document.getElementById("MustList").innerHTML = "";
    
    var html = ""
    for (var i =0; i < filterMUSTHave.length; i++){
        
        html += '<div id = "IngredientTxt" style = "top:'+ (i * 4 + 1.5)+'vw;">'+filterMUSTHave[i]+'</div>\
        <div id="deleteIngredientButtion" style = "top:'+i * 4+'vw;" onclick="deleteMUSTHave('+i +')">x</div>'
        
    }
    document.getElementById("MustList").innerHTML = html;

    
}

function deleteMUSTHave(index) {
    filterMUSTHave.splice(index, 1);
    var html = ""
       document.getElementById("MustList").innerHTML = "";
       
       var html = ""
       for (var i =0; i < filterMUSTHave.length; i++){
           
           html += '<div id = "IngredientTxt" style = "top:'+ (i * 4 + 1.5)+'vw;">'+filterMUSTHave[i]+'</div>\
           <div id="deleteIngredientButtion" style = "top:'+i * 4+'vw;" onclick="deleteMUSTHave('+i +')">x</div>'
           
       }
       document.getElementById("MustList").innerHTML = html;

}
