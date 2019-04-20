var dataPath = "http://localhost:8888/Desktop/Uni/CS5044%20Information%20Visualization%20and%20Visual%20Analytics/Practical%203/Part%202/Data/Premier_League_2017-2018.csv"
var uniqueTeams=[];
d3.csv(dataPath)
    .then(function (data) {
        data.forEach(function(d) {
            if(uniqueTeams.indexOf(d["HomeTeam"])==-1){
                uniqueTeams.push(d["HomeTeam"]);
            }
        });
        console.log(uniqueTeams);
    })