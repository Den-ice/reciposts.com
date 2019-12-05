function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}


var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId // Your client id here
    };
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var cognitoUser = userPool.getCurrentUser();




$(document).ready(function(){
                  
      if (cognitoUser != null) {
              
          cognitoUser.getSession(function(err, session) {
              if (err) {
                  alert(err);
                  return;
              }
              
          });
      }
     var RecipostId;

      RecipostId = getUrlVars()["RecipostId"];

      if (RecipostId != null){
          $.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/recipost_'+RecipostId+'.json?nocache=' + (new Date()).getTime(),function(data){

                    document.getElementById("recititleTXT").value = data.foodTitle ;
                    document.getElementById("hour").value = data.hours;
                    document.getElementById("min").value = data.min;
                    document.getElementById("descTXT").value = data.description.replace('<br />', '\n');
                    document.getElementById("Instruc").value = data.instructions.replace(/<br\s*\/?>/gi, '\n');
                    
                    diffsel = data.difficulty + 1;
                    
                    if (diffsel == 1){
                        click1();
                    } else if (diffsel == 2){
                        click2();
                    }else if (diffsel == 3){
                        click3();
                    }else if (diffsel == 4){
                        click4();
                    }
                    
                    
                    jsonTags = data.tags;
                    jsonIngreds = data.ingredients;
                    refreshTags();
                    console.log("good")
                    refreshTags();
                    refreshIng();
                    
                    document.getElementById("postImage").src = data.image;

                    
          })
      } else {
        console.log("regular post");
      }
});


document.getElementById("min").value = "00"
document.getElementById("hour").value = "0"

var diffsel = 1;


//This Function encodes the submitted data as base64 for upload through JSON object
function encodeImageFileAsURL(element) {
	var file = element.files[0];
	var reader = new FileReader();
	reader.onloadend = function() {
	var base64Src = reader.result;
	document.getElementById("imgImport").src = base64Src;
	document.getElementById("postImage").src = base64Src;
    //formatUserImage();
	}
  reader.readAsDataURL(file);
}
function formatUserImage() {
    var canvas = document.createElement("canvas");
     var ctx = canvas.getContext("2d");
     var img = document.getElementById("postImage");

    ctx.canvas.width  = 200;
    ctx.canvas.height = 200;
    ctx.drawImage(img, 0, 0, 200, 200);
    document.getElementById("postImage").src = canvas.toDataURL()
    document.getElementById("imgImport").src = canvas.toDataURL()

}




//Holds JSON object data
var json = [];

var jsonTags = [];
var jsonIngreds =[];

//Converts input data into a JSON string and sends it to the server
function postRecipost(){
    var RecId = getUrlVars()["RecipostId"];

    if (cognitoUser != null && RecId == null) {
                 
             cognitoUser.getSession(function(err, session) {
                 if (err) {
                     alert(err);
                     return;
                 }
                                    
                let myJSON = JSON.stringify({
                    tags :              jsonTags,
                    ingredients :       jsonIngreds,
                    foodTitle :         document.getElementById("recititleTXT").value,
                    difficulty:         diffsel - 1,// <-dynamo
                    hours :             document.getElementById("hour").value,
                    min :               document.getElementById("min").value,
                    description:        document.getElementById("descTXT").value.replace(/\r?\n/g, '<br />'),
                    instructions:       document.getElementById("Instruc").value.replace(/\r?\n/g, '<br />'),
                    image:              document.getElementById("postImage").src
                })
                $.ajax({
                    type: "POST",
                    url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Recipost/Create",
                    crossDomain: true,
                    dataType: 'json',
                    headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                    data:myJSON ,
                    success: function(response) {
                       console.log(response);
                       window.location.href = "./profile.html";

                       },
                    error: function(response) {
                      console.log(response);
                    },
                });
        
                 
             });
    } else if (cognitoUser != null && RecId != null){

                cognitoUser.getSession(function(err, session) {
                 if (err) {
                     alert(err);
                     return;
                 }
                                    
                let myJSON = JSON.stringify({
                    RecipostId : RecId,
                    tags :              jsonTags,
                    ingredients :       jsonIngreds,
                    foodTitle :         document.getElementById("recititleTXT").value,
                    difficulty:         diffsel - 1,// <-dynamo
                    hours :             document.getElementById("hour").value,
                    min :               document.getElementById("min").value,
                    description:        document.getElementById("descTXT").value.replace(/\r?\n/g, '<br />'),
                    instructions:       document.getElementById("Instruc").value.replace(/\r?\n/g, '<br />'),
                    image:              document.getElementById("postImage").src
                })
                $.ajax({
                    type: "POST",
                    url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Recipost/Edit",
                    crossDomain: true,
                    dataType: 'json',
                    headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                    data:myJSON ,
                    success: function(response) {
                       if (response.body != null){
                           postRecipost()
                           console.log("try again")
                       
                       } else {
                            window.location.href = "./profile.html";
                            console.log("good")
                       }
                       
                       },
                    error: function(response) {
                      console.log(response.body);
                    },
                });
        
                 
             });
        
    }
    

     
}


function click1(){
    document.getElementById('1').setAttribute("stroke-width", "3");
    document.getElementById('2').setAttribute("stroke-width", "0");
    document.getElementById('3').setAttribute("stroke-width", "0");
    document.getElementById('4').setAttribute("stroke-width", "0");

    diffsel = 1;
   
};

function click2(){
    document.getElementById('1').setAttribute("stroke-width", "0");
    document.getElementById('2').setAttribute("stroke-width", "3");
    document.getElementById('3').setAttribute("stroke-width", "0");
    document.getElementById('4').setAttribute("stroke-width", "0");
    diffsel = 2;
    

};
function click3(){
    document.getElementById('1').setAttribute("stroke-width", "0");
    document.getElementById('2').setAttribute("stroke-width", "0");
    document.getElementById('3').setAttribute("stroke-width", "3");
    document.getElementById('4').setAttribute("stroke-width", "0");
    diffsel = 3;

};

function click4(){
    document.getElementById('1').setAttribute("stroke-width", "0");
    document.getElementById('2').setAttribute("stroke-width", "0");
    document.getElementById('3').setAttribute("stroke-width", "0");
    document.getElementById('4').setAttribute("stroke-width", "3");
    diffsel = 4;

};


function addTags() {
    
    if (document.getElementById("addTagTxt").value == ""){
        return;
    }
    
    var index = jsonTags.indexOf(document.getElementById("addTagTxt").value.toLowerCase() )
    
    if (index != -1 ){
        return;
    }
    
    
    jsonTags.push(document.getElementById("addTagTxt").value.toLowerCase())
    
    document.getElementById("Tagslist").innerHTML = "";
    
    var html = ""
    for (var i =0; i < jsonTags.length; i++){
        
        html += '<div id = "tagTxt" style = "top:'+i * 7+'vw;">'+jsonTags[i]+'</div>\
        <div id="deleteTagButtion" style = "top:'+i * 7+'vw;" onclick="deleteTags('+i +')">x</div>'
        
    }
    document.getElementById("Tagslist").innerHTML = html;
         
}

function refreshTags(){
    document.getElementById("Tagslist").innerHTML = "";
    
    var html = ""
    for (var i =0; i < jsonTags.length; i++){
        
        html += '<div id = "tagTxt" style = "top:'+i * 7+'vw;">'+jsonTags[i]+'</div>\
        <div id="deleteTagButtion" style = "top:'+i * 7+'vw;" onclick="deleteTags('+i +')">x</div>'
        
    }
    document.getElementById("Tagslist").innerHTML = html;
    
}


function deleteTags(index) {
    jsonTags.splice(index, 1);
    var html = ""
       for (var i =0; i < jsonTags.length; i++){
           
           html += '<div id = "tagTxt" style = "top:'+i * 7+'vw;">'+jsonTags[i]+'</div>\
           <div id="deleteTagButtion" style = "top:'+i * 7+'vw;" onclick="deleteTags('+i +')">x</div>'
           
       }
       document.getElementById("Tagslist").innerHTML = html;

}







function addIngreds() {
    
    if (document.getElementById("addIngredsTxt").value == ""){
        return;
    }
    
    var index = -1;

    for (var i =0; i < jsonIngreds.length; i++){

        if (document.getElementById("addIngredsTxt").value.toLowerCase() == jsonIngreds[i][0]){
            index = i;
            break;
        }
    }
    
    
    if (index != -1 ){
        return;
    }
    
    
    jsonIngreds.push([document.getElementById("addIngredsTxt").value.toLowerCase(),document.getElementById("addAmountTxt").value])
    
    document.getElementById("Ingredslist").innerHTML = "";
    
    var html = ""
    for (var i =0; i < jsonIngreds.length; i++){
        
        html += '<div id = "IngredsTxt" style = "top:'+i * 7+'vw;">'+jsonIngreds[i][0]+'</div>\
        <div id = "AmountTxt" style = "top:'+i * 7+'vw;">'+jsonIngreds[i][1]+'</div>\
        <div id="deleteIngredsButtion" style = "top:'+i * 7+'vw;" onclick="deleteIngreds('+i +')">x</div>'
        
    }
    document.getElementById("Ingredslist").innerHTML = html;
         
}

function refreshIng(){
    document.getElementById("Ingredslist").innerHTML = "";
    
    var html = ""
    for (var i =0; i < jsonIngreds.length; i++){
        
        html += '<div id = "IngredsTxt" style = "top:'+i * 7+'vw;">'+jsonIngreds[i][0]+'</div>\
        <div id = "AmountTxt" style = "top:'+i * 7+'vw;">'+jsonIngreds[i][1]+'</div>\
        <div id="deleteIngredsButtion" style = "top:'+i * 7+'vw;" onclick="deleteIngreds('+i +')">x</div>'
        
    }
    document.getElementById("Ingredslist").innerHTML = html;
    
}

function deleteIngreds(index) {
    jsonIngreds.splice(index, 1);
    var html = ""
       for (var i =0; i < jsonIngreds.length; i++){
           
           html += '<div id = "IngredsTxt" style = "top:'+i * 7+'vw;">'+jsonIngreds[i][0]+'</div>\
           <div id = "AmountTxt" style = "top:'+i * 7+'vw;">'+jsonIngreds[i][1]+'</div>\
           <div id="deleteIngredsButtion" style = "top:'+i * 7+'vw;" onclick="deleteIngreds('+i +')">x</div>'
           
       }
       document.getElementById("Ingredslist").innerHTML = html;

}


function profileClick() {
    window.location.href = "./profile.html";
}

function searchClick() {
          
    window.location.href = "./index.html?foodTitle=" + document.getElementById("searchText").value;
}
