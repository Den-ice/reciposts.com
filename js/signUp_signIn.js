


function SignUpClick() {
    document.getElementById("signUpBox").style.display = 'block';
    document.getElementById("signInBox").style.display = 'none';
}
function SignInClick(){
    document.getElementById("signUpBox").style.display = 'none';
    document.getElementById("signInBox").style.display = 'block';
}

var username;
var password;
var personalname;

var userJSON;

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
                                                          console.log(session.getIdToken().getJwtToken())

            console.log('session validity: ' + session.isValid());
            //Set the profile info
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                   console.log(result);
                $.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/user_'+result[0].getValue()+'.json?nocache=' + (new Date()).getTime(),function(data){
                        userJSON = data;

                          document.getElementById("signInUserName").innerHTML = userJSON.displayName;
                          
                          if (userJSON.image != ""){
                            document.getElementById("signInUserImage").src = userJSON.image;
                          }
                          
                }).fail(function(jqXHR, textStatus, errorThrown) {
                        CreateNewUser(result[0].getValue());
                        
                })


                       
                                          
                                          
            });
            
        });
    } else {
        document.getElementById("isSignedIn").style.display = 'none';
     
    }
 });





function registerButton() {
  
  personalname = "name"//document.getElementById("fullName").value;
  username = document.getElementById("email").value;
  
    if (username == "" | document.getElementById("password").value == "" ){
        document.getElementById("signUpInfo").innerHTML = "Please fill all fields"
        throw "Please fill all fields"
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!username.match(mailformat))
    {
        document.getElementById("signUpInfo").innerHTML = "invalid email"
        document.getElementById("signUpInfo").style.color = "red";

        throw "invalid email"

    }
  if (document.getElementById("password").value != document.getElementById("confirmationpassword").value) {
       document.getElementById("signUpInfo").innerHTML = "Passwords Do Not Match!"
      throw "Passwords Do Not Match!"
  } else {
      password =  document.getElementById("password").value;
  }

    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/;
    if(!password.match(passw))
    {
        document.getElementById("signUpInfo").innerHTML = "Password must be &ge; 8 char. With one char upercase, a symbol and a number. "
        document.getElementById("signUpInfo").style.color = "red";

        throw "Password too week"

    }
    
    



  var attributeList = [];
  
  var dataEmail = {
      Name : 'email',
      Value : username, //get from form field
  };
  
  var dataPersonalName = {
      Name : 'name',
      Value : personalname, //get from form field
  };

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);
  
  
  attributeList.push(attributeEmail);
  attributeList.push(attributePersonalName);

  userPool.signUp(username, password, attributeList, null, function(err, result){
      if (err) {
          document.getElementById("signUpInfo").innerHTML =(err.message || JSON.stringify(err));
          document.getElementById("signUpInfo").style.color = "red";
          return;
      }
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      //change elements of page
      document.getElementById("signUpInfo").innerHTML = "Check your email for a verification link. Once varified, please come back and sign in";
      document.getElementById("signUpInfo").style.color = "green";

  });
}

function signInButton() {
  
    if (document.getElementById("signInEmail").value == "" | document.getElementById("signInPassword").value == "" ){
        document.getElementById("signInInfo").innerHTML = "Please fill all fields"
        document.getElementById("signInInfo").style.color = "red";
        throw "Please fill all fields"
    }
    
  var authenticationData = {
      Username : document.getElementById("signInEmail").value,
      Password : document.getElementById("signInPassword").value,
  };
  
    
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
  
  var userData = {
      Username : document.getElementById("signInEmail").value,
      Pool : userPool,
  };
  
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          var accessToken = result.getAccessToken().getJwtToken();
          console.log(accessToken);
                
                console.log(result);
            var idToken = result.getIdToken().getJwtToken();

           document.getElementById("signInInfo").innerHTML = "signed in"
           document.getElementById("signInInfo").style.color = "green";
           location.replace("./index.html")

      },

      onFailure: function(err) {
           document.getElementById("signInInfo").innerHTML = err.message || JSON.stringify(err);
           document.getElementById("signInInfo").style.color = "red";
      },
  });
}


function UserIsSignedIn(){
    document.getElementById("isSignedIn").style.display = 'block';
    
}


function CreateNewUser(id){
    
    
    if (cognitoUser != null) {
        
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            console.log("creat user!")

           var myJSON  = JSON.stringify({
               "image": "",
               "displayName" : ""
           });
                               
                
            console.log(session.getIdToken().getJwtToken())
              $.ajax({
                  type: "POST",
                  url: "https://hgxp26ozo8.execute-api.us-west-2.amazonaws.com/live/User/Create",
                  crossDomain: true,
                  dataType: 'json',
                  headers: {"Content-Type" : "application/json", "Authorization" : session.getIdToken().getJwtToken()},
                  data:myJSON ,
                  success: function(response) {

                     console.log("go to profile.html")
                     //window.location.replace("./profile.html");
                     window.location.href = "./profile.html?userId="+id;
                                          },
                  error: function(response) {
                    console.log(response);
                  },
              });
                               

                               
        })
    }
        
}

function SignOutClick(){
    if (cognitoUser != null) {
      cognitoUser.signOut();
      document.getElementById("isSignedIn").style.display = 'none';

    }
}


