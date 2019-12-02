function profileClick() {
    window.location.href = "./profile.html";
}
function JSONtoRecipeDisplay(id) {
    
//add logic to chnage recipost id
$.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/recipost_'+id+'.json',function(data){
         console.log('success');

var foodDiff = "red"
          
switch(data.difficulty) {
    case 1:
        foodDiff = "Chartreuse";
        break;
    case 2:
        foodDiff = "yellow";
        break;
    case 3:
        foodDiff = "orange";
        break;
    default:
          foodDiff = "red";
}
          
var html = '        <div id="post"  style = "top:'+ (5) + 'vw">                             \
    <img id = "postImage"  >                                                                \
    <img id = "userImage" src="svg/defualt.svg" onclick="profileClick()">                   \
    <div id="userName">'+data.displayName+'</div>                                           \
    <div id="foodTitle">'+data.foodTitle+'</div>                                            \
    <svg id="foodDifficulty">                                                               \
        <circle cx="50%" cy="50%" r="30%" fill="'+foodDiff+'"/>                             \
    </svg>                                                                                  \
    <img id = "clock" src="svg/clock.svg" >                                                 \
    <div id="time">'+data.hours+'h '+data.min+'m</div>'
        
          var sum = 0;
          
  for( var i = 0; i < data.rating.length; i++ ){
      sum += parseInt( data.rating[i], 10 ); //don't forget to add the base
  }
    var rating = Math.round(sum /data.rating.length)

      for (i = 1; i <= 5; i++) {
        var star = "star"
          if (i <= rating){
                star += "Green"
          }
            
        html += '<img id = "star'+i+'" src="svg/'+star+'.svg">'
      }
    html += '<div id="description">'+data.description+'</div>';
    
    var instructions = data.instructions;
                                    
    instructions = instructions.replace(/\n/g, "<br>");
                            
    
    html += '<div id="recipe_steps"> <h3>Instructions</h3>'+instructions+'</div>';
    html += '<div id="ingredients"> <h3>Ingredients</h3>  ' ;
                            
    ingridents = data.ingredients;
      
    for( var i = 0; i < ingridents.length; i++ ){
        html += data.ingredients[i][0];
        html +=   "&nbsp;";
       
        html += data.ingredients[i][1] + "<br>"; //don't forget to add the base
    }
                            
    html +='</div> </div>    </div>';
                            
    document.getElementById("recipe").innerHTML += html;
                            
    html = "";
    
    for( var i = 0; i < data.comment.length; i++ ){
        html += '<div id="reviewPost" style = "top:'+ (i*25 + 5) + '%">'
        html += '<div id="reviewTextName" >&nbsp;' +data.comment[i][1] + ": </div>";
        html += '<div id="reviewText" >&nbsp;' +data.comment[i][2] + " </div>" + "</div>";
       
    }
    html += '<div id="reviewPost" style = "top:'+ ((data.comment.length)*25 + 5) + '%">'
                            html += '<button id="buttonPostReview">Post</button>'
    html += '<div id="reviewTextName" >&nbsp;' +  "your user name" + ": </div>";
                            

    html += '<input id="createReviewText" type="text" placeholder="write your review here!">'+ "</div>";
    
    document.getElementById("review").innerHTML += html;
    document.getElementById("postImage").src = data.image
            
})

}


document.getElementById("starPick1").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/star.svg";
    document.getElementById('starPick3').src = "svg/star.svg";
    document.getElementById('starPick4').src = "svg/star.svg";
    document.getElementById('starPick5').src = "svg/star.svg";

};
document.getElementById("starPick2").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/star.svg";
    document.getElementById('starPick4').src = "svg/star.svg";
    document.getElementById('starPick5').src = "svg/star.svg";

};
document.getElementById("starPick3").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/starGreen.svg";
    document.getElementById('starPick4').src = "svg/star.svg";
    document.getElementById('starPick5').src = "svg/star.svg";

};
document.getElementById("starPick4").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/starGreen.svg";
    document.getElementById('starPick4').src = "svg/starGreen.svg";
    document.getElementById('starPick5').src = "svg/star.svg";

};
document.getElementById("starPick5").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/starGreen.svg";
    document.getElementById('starPick4').src = "svg/starGreen.svg";
    document.getElementById('starPick5').src = "svg/starGreen.svg";

};


function moveReviewClick(){
    if (document.getElementById("reviewUpDown").style.bottom == "50%"){
        document.getElementById("reviewUpDown").style.bottom = "0%";
        document.getElementById("reviewUpDown").innerHTML = "&#x2912;";
        
        document.getElementById("userInput").style.bottom = "-50%";

    } else {
        document.getElementById("reviewUpDown").style.bottom = "50%";
        document.getElementById("reviewUpDown").innerHTML = "&#x2913;";
        
        document.getElementById("userInput").style.bottom = "0%";

    }
}

$(document).ready(function(){
                  var number = getUrlVars()["id"];
                  JSONtoRecipeDisplay(number)
}
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
