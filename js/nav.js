
         document.getElementById("signInBox").style.display = 'none';

         document.getElementById("moveFilter").innerHTML = "<<";

         
         document.getElementById("pageText").value = 1;

        document.getElementById("hour").value = "0";

        document.getElementById("min").value = "00";

     function profileClick() {

         
         if (userJSON.userID != null){
             window.location.href = "./profile.html?userId="+userJSON.userID;
         } else {
             window.location.href = "./profile.html";
         }
     }

     
     function startPageClick() {
         document.getElementById("pageText").value=1;
         goToPage(document.getElementById("pageText").value);

     }
     function leftArowClick() {
         if (document.getElementById("pageText").value != 1){
             document.getElementById("pageText").value -= 1;
             goToPage(document.getElementById("pageText").value);

         }
     }
     function rightArowArowClick() {
         
         if (Math.ceil( document.getElementById("pageText").value < recipostsList.length / 4)){
                document.getElementById("pageText").value = parseInt(document.getElementById("pageText").value) + 1;
                goToPage(document.getElementById("pageText").value);

         }
     }
     function endPageClick() {
         document.getElementById("pageText").value= Math.ceil(recipostsList.length / 4);
         goToPage(document.getElementById("pageText").value);

     }


