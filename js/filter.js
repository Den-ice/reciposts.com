

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

var diff1sel = false;
var diff2sel = false;
var diff3sel = false;
var diff4sel = false;

document.getElementById("1").onclick = function (e) {
    if (diff1sel == false){
        document.getElementById('1').setAttribute("stroke-width", "3");
        diff1sel = true
    } else {
        document.getElementById('1').setAttribute("stroke-width", "0");
        diff1sel = false
    }
};

document.getElementById("2").onclick = function (e) {
           if (diff2sel == false){
               document.getElementById('2').setAttribute("stroke-width", "3");
               diff2sel = true
           } else {
               document.getElementById('2').setAttribute("stroke-width", "0");
               diff2sel = false
           }
};
document.getElementById("3").onclick = function (e) {
           if (diff3sel == false){
               document.getElementById('3').setAttribute("stroke-width", "3");
               diff3sel = true
           } else {
               document.getElementById('3').setAttribute("stroke-width", "0");
               diff3sel = false
           }
};

document.getElementById("4").onclick = function (e) {
           if (diff4sel == false){
               document.getElementById('4').setAttribute("stroke-width", "3");
               diff4sel = true
           } else {
               document.getElementById('4').setAttribute("stroke-width", "0");
               diff4sel = false
           }
};
