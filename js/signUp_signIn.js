
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
  var poolData;
      
function registerButton() {
  
  personalnamename =  document.getElementById("fullName").value;
  username = document.getElementById("email").value;
  
    if (personalnamename == "" | username == "" | document.getElementById("password").value == "" ){
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
    
    

  poolData = {
          UserPoolId : _config.cognito.userPoolId, // Your user pool id here
          ClientId : _config.cognito.clientId // Your client id here
      };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

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
  
  var poolData = {
      UserPoolId : _config.cognito.userPoolId, // Your user pool id here
      ClientId : _config.cognito.clientId, // Your client id here
  };
  
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  var userData = {
      Username : document.getElementById("signInEmail").value,
      Pool : userPool,
  };
  
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          var accessToken = result.getAccessToken().getJwtToken();
          console.log(accessToken);
           document.getElementById("signInInfo").innerHTML = "signed in"
           document.getElementById("signInInfo").style.color = "green";
                               
      },

      onFailure: function(err) {
           document.getElementById("signInInfo").innerHTML = err.message || JSON.stringify(err);
           document.getElementById("signInInfo").style.color = "red";
      },
  });
}
