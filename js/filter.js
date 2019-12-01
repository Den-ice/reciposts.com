

function moveFilterClick(){
    moveFilter
    if (document.getElementById("moveFilter").style.right == "35%"){
        document.getElementById("moveFilter").style.right = "0%";
        document.getElementById("moveFilter").innerHTML = "<<";
        
        document.getElementById("Filter").style.right = "-35%";

    } else {
        document.getElementById("moveFilter").style.right = "35%";
        document.getElementById("moveFilter").innerHTML = ">>";
        
        document.getElementById("Filter").style.right = "0%";

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

function searchClick() {

    var min = Math.ceil(Number(document.getElementById("hour").value) * 60 +  (Number(document.getElementById("min").value)))
                        
    var myJSON  = JSON.stringify({
        "foodTitle": document.getElementById("searchText").value,
        "tags" : [],
        "difficulty" : difficulty,
        "min" : min,
        "timeCompare" : timeCompare,
        "must": ["Raw Cod"],
        "cannot": ["broccoli"]
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
