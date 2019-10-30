document.getElementById("searchText").value = "Search Recipes";
         document.getElementById("email").value = "Email";
         document.getElementById("fullName").value = "Full Name";
         document.getElementById("username").value = "Username";
         document.getElementById("password").value = "Password";

         document.getElementById("signInEmail").value = "Email";
         document.getElementById("signInPassword").value = "Password";
         document.getElementById("signInBox").style.display = 'none';

         document.getElementById("moveFilter").innerHTML = "<<";

         
         document.getElementById("pageText").value = 0;

        document.getElementById("hour").value = 0;

        document.getElementById("min").value = "00";

     function profileClick() {
     }
     function notificationClick() {
     }
     function searchClick() {
     }
     
     function startPageClick() {
         document.getElementById("pageText").value=0;
     }
     function leftArowClick() {
         if (document.getElementById("pageText").value != 0){
             document.getElementById("pageText").value -= 1;
         }
     }
     function rightArowArowClick() {
         document.getElementById("pageText").value = parseInt(document.getElementById("pageText").value) + 1;
     }
     function endPageClick() {
         document.getElementById("pageText").value=10;
     }


