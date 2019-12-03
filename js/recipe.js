
var userProfile = false;
var userLogedIn = false;


var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId // Your client id here
    };
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var cognitoUser = userPool.getCurrentUser();

var userJSON;
var recipostJSON;

$(document).ready(function(){
 var number = getUrlVars()["id"];

  document.getElementById("followButtion").style.display = 'none';

  var userId = getUrlVars()["userId"];

  if (cognitoUser != null) {
          
      cognitoUser.getSession(function(err, session) {
          if (err) {
              alert(err);
              return;
          }
          userLogedIn = true;
                             
          cognitoUser.getUserAttributes(function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
        $.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/user_'+result[0].getValue()+'.json?nocache=' + (new Date()).getTime(),function(data){
                userJSON = data;
                  console.log(userJSON)

                if (userId == null || userId == result[0].getValue()){
                    userProfile = true
                    userId = result[0].getValue();
                }

                JSONtoRecipeDisplay(number)

            })
                                       

                                        
          });
          
      });
  } else if (userId != null){
    JSONtoRecipeDisplay(number)
  }
});
      



function profileClick() {
    window.location.href = "./profile.html";
}
function JSONtoRecipeDisplay(id) {
    
//add logic to chnage recipost id
$.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/recipost_'+id+'.json?nocache=' + (new Date()).getTime(),function(data){
         console.log('success');
recipostJSON = data;
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
       console.log(data.rating);
  for( var i = 0; i < data.rating.length; i++ ){
      sum += parseInt( data.rating[i].rated, 10 ); //don't forget to add the base
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

        if (userJSON!= null && data.comment[i].userID == userJSON.userID){
            html += '<button id="buttonPostReviewDelete" onclick="UserDeleteComment('+i+')">Delete</button>'
        }
                            
        html += '<div id="reviewTextName" >&nbsp;' +data.comment[i].displayName + ": </div>";
        html += '<div id="reviewText" >&nbsp;' +data.comment[i].comment + " </div>" + "</div>";
            
       
    }
    html += '<div id="reviewPost" style = "top:'+ ((data.comment.length)*25 + 5) + '%">'
    html += '<div id="reviewTextName" >&nbsp;' +  userJSON.displayName + ": </div>";
    html += '<button id="buttonPostReview" onclick="UserCreateComment()">Post</button>'
    html += '<input id="createReviewText" type="text" placeholder="write your review here!">'+ "</div>";
    
    document.getElementById("review").innerHTML += html;
    if (data.image != ""){
        document.getElementById("postImage").src = data.image;
    } else {
        document.getElementById("postImage").src = "svg/emptyImage.svg";
    }
           
    if (userLogedIn == true){
        var index = userJSON.favorites.indexOf(recipostJSON.id)
        document.getElementById("followButtion").style.display = 'block';
        document.getElementById("reviewTextName").innerHTML = userJSON.displayName;
                            
        if (index == -1 ){
            document.getElementById("followButtion").innerHTML = "add to fav";
        }
    }
                            
            
})

}


var starRating = 0;
          
document.getElementById("starPick1").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/star.svg";
    document.getElementById('starPick3').src = "svg/star.svg";
    document.getElementById('starPick4').src = "svg/star.svg";
    document.getElementById('starPick5').src = "svg/star.svg";
    starRating = 1;
    userGiveRating();

};
document.getElementById("starPick2").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/star.svg";
    document.getElementById('starPick4').src = "svg/star.svg";
    document.getElementById('starPick5').src = "svg/star.svg";
    starRating = 2;
    userGiveRating();

};
document.getElementById("starPick3").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/starGreen.svg";
    document.getElementById('starPick4').src = "svg/star.svg";
    document.getElementById('starPick5').src = "svg/star.svg";
    starRating = 3;
    userGiveRating();
};
document.getElementById("starPick4").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/starGreen.svg";
    document.getElementById('starPick4').src = "svg/starGreen.svg";
    document.getElementById('starPick5').src = "svg/star.svg";
          
    starRating = 4;
    userGiveRating();

};
document.getElementById("starPick5").onclick = function (e) {
    document.getElementById('starPick1').src = "svg/starGreen.svg";
    document.getElementById('starPick2').src = "svg/starGreen.svg";
    document.getElementById('starPick3').src = "svg/starGreen.svg";
    document.getElementById('starPick4').src = "svg/starGreen.svg";
    document.getElementById('starPick5').src = "svg/starGreen.svg";
    starRating = 5;
    userGiveRating();
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


function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}


function favButtion(){
                    
          var index = userJSON.favorites.indexOf(recipostJSON.id)
          
          if (index == -1 ){
            console.log("add")
            console.log(userJSON.userID)
            if (cognitoUser != null) {
                
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        alert(err);
                        return;
                    }

                   var myJSON  = JSON.stringify({    "RecipostId" : recipostJSON.id});
                             
                      $.ajax({
                          type: "POST",
                          url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Favorite/Add",
                          crossDomain: true,
                          dataType: 'json',
                          headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                          data:myJSON ,
                          success: function(response) {
                             location.reload();

                             console.log(response);
                             },
                          error: function(response) {
                            console.log(response);
                          },
                      });
                })
            }
          } else {
                console.log("un")
                if (cognitoUser != null) {
                  
                  cognitoUser.getSession(function(err, session) {
                      if (err) {
                          alert(err);
                          return;
                      }

                     var myJSON  = JSON.stringify({    "RecipostId" : recipostJSON.id});
                               
                        $.ajax({
                            type: "POST",
                            url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Favorite/Delete",
                            crossDomain: true,
                            dataType: 'json',
                            headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                            data:myJSON ,
                            success: function(response) {
                               console.log(response);
                               location.reload();

                               },
                            error: function(response) {
                              console.log(response);
                            },
                        });
                  })
                }
          }
          console.log(index);

          console.log(userJSON.favorites);
          console.log(recipostJSON.id);

          recipostJSON
}



function userGiveRating(){


        if (cognitoUser != null) {
            
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }

               var myJSON  = JSON.stringify({    "RecipostId" : recipostJSON.id, "rating" : starRating});
                         
                  $.ajax({
                      type: "POST",
                      url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Rating/Give",
                      crossDomain: true,
                      dataType: 'json',
                      headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                      data:myJSON ,
                      success: function(response) {
                         location.reload();

                         console.log(response);
                         },
                      error: function(response) {
                        console.log(response);
                      },
                  });
            })
        }
          
}


function createComment() {

}

function UserCreateComment() {
          if (document.getElementById("createReviewText").value == ""){
            return;
          }
          
          if (cognitoUser != null) {
              
              cognitoUser.getSession(function(err, session) {
                  if (err) {
                      alert(err);
                      return;
                  }

                 var myJSON  = JSON.stringify({    "RecipostId" : recipostJSON.id, "comment" : document.getElementById("createReviewText").value});
                           
                    $.ajax({
                        type: "POST",
                        url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Comment/Create",
                        crossDomain: true,
                        dataType: 'json',
                        headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                        data:myJSON ,
                        success: function(response) {
                           location.reload();

                           console.log(response);
                           },
                        error: function(response) {
                          console.log(response);
                        },
                    });
              })
          }
}


function UserDeleteComment(index) {
 
          if (cognitoUser != null) {
              
              cognitoUser.getSession(function(err, session) {
                  if (err) {
                      alert(err);
                      return;
                  }

                 var myJSON  = JSON.stringify({    "RecipostId" : recipostJSON.id, "cID" : recipostJSON.comment[index].cID});
                           
                    $.ajax({
                        type: "POST",
                        url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Comment/Delete",
                        crossDomain: true,
                        dataType: 'json',
                        headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                        data:myJSON ,
                        success: function(response) {
                           location.reload();

                           console.log(response);
                           },
                        error: function(response) {
                          console.log(response);
                        },
                    });
              })
          }
}
