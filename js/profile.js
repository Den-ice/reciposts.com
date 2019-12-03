
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

var userProfile = false;
var userLogedIn = false;


var poolData = {
        UserPoolId : _config.cognito.userPoolId, // Your user pool id here
        ClientId : _config.cognito.clientId // Your client id here
    };
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var cognitoUser = userPool.getCurrentUser();

var userJSON;
var profileJSON;

$(document).ready(function(){
                  
                  document.getElementById("ToPostPage").style.display = 'none';
                  document.getElementById("imgImport").style.display = 'none';
                  document.getElementById("deleteAcount").style.display = 'none';
                  document.getElementById("newName").style.display = 'none';
                  document.getElementById("saveNewName").style.display = 'none';

                  
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
                            })
                                                       
                            result[0].getValue()
                            if (userId == null || userId == result[0].getValue()){
                                userProfile = true
                                userId = result[0].getValue();
                            }
                            makeProfile(userId)
                             
                          });
                          
                      });
                  } else if (userId != null){
                    makeProfile(userId)
                  }
});
                  
function postClick(){
    window.location.href = "./post.html";
    
}

function profileClick(){
    if (userJSON.userID != null){
               window.location.href = "./profile.html?userId="+userJSON.userID;
           } else {
               window.location.href = "./profile.html";
           }
}

/*

 var user = {
     userID: userID,
     following: [],
     followers: [],
     post: [],
     favorites: [],
     displayName: event.body.displayName,
     image: event.body.image,
     comments: [],
     rating: []
 };
 */

var MypostLength = 0;
var FavoritesLength = 0;
function makeProfile(userId){
    
    console.log("makeProfile");
    console.log(userId);
    console.log(userProfile);
    console.log(userLogedIn);
    
    $.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/user_'+userId+'.json?nocache=' + (new Date()).getTime(),function(data){
            profileJSON = data;

              document.getElementById("username").innerHTML = profileJSON.displayName;
              document.getElementById("followingcount").innerHTML = profileJSON.following.length;
              document.getElementById("followercount").innerHTML = profileJSON.followers.length;
              document.getElementById("postcount").innerHTML = profileJSON.post.length;

              if (profileJSON.image != ""){
                document.getElementById("defaultprofile").src = profileJSON.image;
              }
              
              if (userProfile){
                document.getElementById("ToPostPage").style.display = 'block';
                document.getElementById("imgImport").style.display = 'block';
                document.getElementById("deleteAcount").style.display = 'block';
                document.getElementById("newName").style.display = 'block';
                document.getElementById("saveNewName").style.display = 'block';

                document.getElementById("newName").value = profileJSON.displayName;
              }
              
              document.getElementById("myrecipesList").innerHTML = "";

              var post = profileJSON.post;
              var favorites = profileJSON.favorites;
              
              MypostLength = 0;
              console.log(post);

              for (var i = 0 ; i < post.length; i++){

                $.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/recipost_'+post[i]+'.json?nocache=' + (new Date()).getTime(),function(data){
                          var i = profileJSON.post.indexOf(data.id)

                          var whatToDisplay = "svg/emptyImage.svg";
                          if (data.image != ""){
                                    whatToDisplay = data.image
                          }
                          document.getElementById("myrecipesList").innerHTML += '<img id = "postImage" src="'+whatToDisplay+'" style = "top:'+ MypostLength * 50 + 'vw" onclick="goToRecipe('+i+')">'
                          var id = data.id;
                          if (userProfile){
                            document.getElementById("myrecipesList").innerHTML += '<div id="deleteRecipost" style = "top:'+ MypostLength * 50 + 'vw" onclick="deleteRecipost('+i+')">Delete</div>'
                            document.getElementById("myrecipesList").innerHTML += '<div id="deleteRecipost" style = "top:'+ (MypostLength * 50 + 5 ) + 'vw" onclick="editRecipost('+i+')">Edit</div>'
                          }
                          MypostLength++;
                          document.getElementById("postcount").innerHTML = MypostLength;

                          
                })

              }
              
              FavoritesLength = 0;
              
              console.log(favorites);
              
              for (var i = 0 ; i < favorites.length; i++){
                $.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/recipost_'+favorites[i]+'.json?nocache=' + (new Date()).getTime(),function(data){
                   var i = profileJSON.favorites.indexOf(data.id)

                  if (data.image != ""){
                          document.getElementById("favoritesList").innerHTML += '<img id = "postImage" src="'+data.image+'"style = "top:'+ FavoritesLength * 50 + 'vw" onclick="goToFavRecipe('+i+')">'
                  } else {
                          document.getElementById("favoritesList").innerHTML += '<img id = "postImage" src="svg/emptyImage.svg"style = "top:'+ FavoritesLength * 50 + 'vw" >'
                  }
                FavoritesLength ++;
                          
                })
              }
              
    } )
    
}


function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        var base64Src = reader.result;
        document.getElementById("defaultprofile").src = base64Src;
        userJSON.image =base64Src
        editUser();
    }
    reader.readAsDataURL(file);
}



function editUser(){
    
    
    if (cognitoUser != null) {
        
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            console.log("creat user!")

           var myJSON  = JSON.stringify({
               "image": userJSON.image,
               "displayName" : document.getElementById("newName").value
           });
                     
              $.ajax({
                  type: "POST",
                  url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/User/Edit",
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

function deleteUser(){
    if (confirm('Are you 100% sure? This will erase ALL your data and can never be undone!')) {
        if (cognitoUser != null) {
            
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log("delete user!")

               var myJSON  = JSON.stringify({
                   "displayName" : "bye"
               });
                         
                  $.ajax({
                      type: "POST",
                      url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/User/Delete",
                      crossDomain: true,
                      dataType: 'json',
                      headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                      data:myJSON ,
                      success: function(response) {
                         console.log(response);
                         
                         
                         cognitoUser.deleteUser((err, result) => {
                             if (err) {
                                 console.log(err);
                             } else {
                                 console.log("Successfully deleted the user.");
                                 console.log(result);
                                 cognitoUser.signOut();

                                 location.replace("./index.html")

                             }
                         });
                         
                         

                         },
                      error: function(response) {
                        console.log(response);
                      },
                  });
                                   

                                   
            })
            
            
            
            
        }

        
    }
}


function deleteRecipost(id){
    
    if (confirm('Are you 100% sure? This will erase your Recipost and can never be undone!')) {
        if (cognitoUser != null) {
            
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    alert(err);
                    return;
                }

               var myJSON  = JSON.stringify({    "RecipostId" : profileJSON.post[id]});
                         
                  $.ajax({
                      type: "POST",
                      url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/Recipost/Delete",
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

}

function editRecipost(id){
    window.location.href = "./post.html?RecipostId=" + profileJSON.post[id];

}

function goToRecipe(id){
          window.location.href = "./recipe.html?id="+profileJSON.post[id]+"&";
}

function goToFavRecipe(id){
          window.location.href = "./recipe.html?id="+profileJSON.favorites[id]+"&";
}
