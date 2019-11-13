
function JSONtoRecipeDisplay(id) {
    
$.getJSON('JSON/'+id+'.json',function(data){
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
          
var html = '        <div id="post"  style = "top:'+ (5) + 'vw">                                      \
    <img id = "postImage" src="postImage/'+data.imageID+'.jpg" >                            \
    <img id = "userImage" src="svg/defualt.svg" onclick="profileClick()">                   \
    <div id="userName">'+data.userName+'</div>                                              \
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
                            
    html +='</div></div>';
                            
    document.getElementById("recipe").innerHTML += html;
                                                        
})

}

JSONtoRecipeDisplay(5)

