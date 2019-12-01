
var recipostsList = [];


function JSONtoPostList(id, index, postCount) {

    $.getJSON('https://s3-us-west-2.amazonaws.com/recipost.json/recipost_'+id+'.json',function(data){
             console.log('success');

    var foodDiff = "red"
              
    switch(data.difficulty) {
        case 0:
            foodDiff = "Chartreuse";
            break;
        case 1:
            foodDiff = "yellow";
            break;
        case 2:
            foodDiff = "orange";
            break;
        default:
              foodDiff = "red";
    }
              
    var html = '        <div id="post"  style = "top:'+ (5 + postCount*50) + 'vw"   onclick="goToRecipe('+index+')">                                      \
        <img id = "postImage" src="'+data.image+'" >                            \
        <img id = "userImage" src="svg/defualt.svg">                   \
        <div id="userName">'+data.displayName+'</div>                                              \
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
                                
                                
    })

}

function goToRecipe(id){
          window.location.href = "./recipe.html?id="+recipostsList[id]+"&";
}

          
var myJSON  = JSON.stringify({
    "foodTitle": "",
    "tags" : [],
    "difficulty" : [false,false,false,false],
    "min" : 0,
    "timeCompare" : 0,
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

function goToPage(page){
    document.getElementById("post_list").innerHTML = "";
    var postCount = 0

    for (var i = (page - 1) * 4; i < recipostsList.length && i < 4 * page; i++){
        console.log(recipostsList[i]);

        JSONtoPostList(recipostsList[i],i,postCount);
        postCount += 1;

    }
    console.log(recipostsList.length);
    console.log(Math.ceil(recipostsList.length / 4));

}
