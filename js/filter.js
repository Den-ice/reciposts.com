

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

var diff = 1;

document.getElementById("1").onclick = function (e) {
    document.getElementById('1').setAttribute("stroke-width", "3");
    document.getElementById('2').setAttribute("stroke-width", "0");
    document.getElementById('3').setAttribute("stroke-width", "0");
    document.getElementById('4').setAttribute("stroke-width", "0");

    diff1sel = 1;
   
};

document.getElementById("2").onclick = function (e) {
           document.getElementById('1').setAttribute("stroke-width", "0");
           document.getElementById('2').setAttribute("stroke-width", "3");
           document.getElementById('3').setAttribute("stroke-width", "0");
           document.getElementById('4').setAttribute("stroke-width", "0");
    diff1sel = 2;

};
document.getElementById("3").onclick = function (e) {
       document.getElementById('1').setAttribute("stroke-width", "0");
       document.getElementById('2').setAttribute("stroke-width", "0");
       document.getElementById('3').setAttribute("stroke-width", "3");
       document.getElementById('4').setAttribute("stroke-width", "0");
    diff1sel = 3;

};

document.getElementById("4").onclick = function (e) {
           document.getElementById('1').setAttribute("stroke-width", "0");
           document.getElementById('2').setAttribute("stroke-width", "0");
           document.getElementById('3').setAttribute("stroke-width", "0");
           document.getElementById('4').setAttribute("stroke-width", "3");
    diff1sel = 4;
};
