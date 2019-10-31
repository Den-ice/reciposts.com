
var postCount = 0

function JSONtoPostList(id) {

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
          
var html = '        <div id="post"  style = "top:'+ (5 + postCount*50) + 'vw">                                      \
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
    html += '<div id="description">'+data.description+'</div> </div>';
    document.getElementById("post_list").innerHTML += html;
                            
    postCount += 1;
                            
})

}

JSONtoPostList(1)
JSONtoPostList(2)
JSONtoPostList(3)
JSONtoPostList(4)
